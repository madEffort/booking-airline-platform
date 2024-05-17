from rest_framework import generics, views
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer, LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model


User = get_user_model()

class SignUpView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response({"message": "회원가입 성공", "user": serializer.data})
        else:
            return Response(serializer.errors, status=400)

# Create your views here.
class LoginView(views.APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "로그인 성공",
                "token": str(refresh.access_token),
                "user": {
                    "id": user.id,
                    "firstName": user.first_name,
                    "lastName": user.last_name,
                    "email": user.email,
                    "tickets": []
                }
            })
        else:
            return Response(serializer.errors, status=400)
    

# class UserDeleteView():
#     pass