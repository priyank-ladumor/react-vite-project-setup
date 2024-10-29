import { lazy, Suspense } from 'react';
import Loading from '../components/loader/loader';

const Home = lazy(() => import("/src/pages/Home/page.jsx"));
const NotFound = lazy(() => import("/src/pages/NotFound/page.jsx"));
const Login = lazy(() => import("/src/pages/login/page.jsx"));

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
