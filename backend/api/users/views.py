from rest_framework import generics, views, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from api.tickets.serializers import TicketSerializer
from .serializers import UserSerializer, LoginSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class SignUpView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response({"message": "회원가입 성공", "user": serializer.data})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(views.APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            tickets_serializer = TicketSerializer(user.ticket_set.all(), many=True)
            return Response({
                "message": "로그인 성공",
                "token": str(refresh.access_token),
                "user": {
                    "id": user.id,
                    "firstName": user.first_name,
                    "lastName": user.last_name,
                    "email": user.email,
                    "tickets": tickets_serializer.data
                }
            })
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    serializer_class = UserSerializer
    
    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        if request.user == user or request.user.is_superuser:
            self.perform_destroy(user)
            return Response({'message':'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'error': 'You do not have permission to delete this user.'}, status=status.HTTP_403_FORBIDDEN)
