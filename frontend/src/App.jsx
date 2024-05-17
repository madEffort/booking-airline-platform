import './App.css';
import { RouterProvider } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { FlightInfoProvider } from './context/FlightInfoContext';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider, LoadingContext } from './context/LoadingContext';
import Loading from './pages/Loading';
import { useContext, useState, useEffect } from 'react';
import { routers } from './router';

const AppContent = () => {
  const { loading } = useContext(LoadingContext);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const hasSeenLoadingPage = localStorage.getItem('hasSeenLoadingPage');

    if (hasSeenLoadingPage) {
      setIsInitialLoading(false);
    } else {
      if (!loading) {
        setTimeout(() => {
          setIsInitialLoading(false);
          localStorage.setItem('hasSeenLoadingPage', 'true');
        }, 1000);
      }
    }
  }, [loading]);

  return isInitialLoading ? <Loading /> : <RouterProvider router={routers} />;
};

function App() {
  return (
    <AuthProvider>
      <FlightInfoProvider>
        <LoadingProvider>
          <Layout>
            <AppContent />
          </Layout>
        </LoadingProvider>
      </FlightInfoProvider>
    </AuthProvider>
  );
}

export default App;
