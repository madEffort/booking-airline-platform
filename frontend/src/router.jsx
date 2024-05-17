import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { motion } from 'framer-motion';
import Profile from './pages/Profile';

const routerData = [
  {
    id: 0,
    path: '/',
    label: 'Home',
    element: (
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
      >
        <Home />
      </motion.div>
    ),
    isAuth: false,
  },
  {
    id: 1,
    path: '/login',
    label: 'Login',
    element: <Login />,
    isAuth: false,
  },
  {
    id: 2,
    path: '/signup',
    label: 'SignUp',
    element: <SignUp />,
    isAuth: false,
  },
  {
    id: 3,
    path: '/profile',
    label: 'profile',
    element: <Profile />,
    isAuth: true,
  },
];

export const routers = createBrowserRouter(
  routerData.map((router) => {
    return {
      path: router.path,
      element: router.element,
      isAuth: router.isAuth,
    };
  })
);
