import { lazy, Suspense } from 'react';
import Loading from '../components/loader/loader';

const Home = lazy(() => import("/src/pages/Home/home.jsx"));
const NotFound = lazy(() => import("/src/pages/NotFound/not-found.jsx"));
const Login = lazy(() => import("/src/pages/login/login.jsx"));

const routes = [
    {
        path: '/', element: (
            <Suspense fallback={<Loading />} >
                <Home />
            </Suspense>
        ), protected: false,
    },
    {
        path: '/login', element: (
            <Suspense fallback={<Loading />} >
                <Login />
            </Suspense>
        ), protected: true,
    },
    { path: '*', element: <NotFound />, protected: false },
];

export default routes;
