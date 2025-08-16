import { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import LoadingSpinner from './components/LoadingSpinner'
import AuthWrapper from './components/AuthWrapper.jsx'
import AdminRoute from "./components/AdminRoute.jsx";

const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Login = lazy(() => import('./components/Login.jsx'))
const Register = lazy(() => import('./components/Register.jsx'))
const Users = lazy(() => import('./pages/Users.jsx'))
const DashboardTopView = lazy(() => import('./pages/DashboardTopView.jsx'))

const router = createBrowserRouter([
    {
        path: '/login',
        element: (
            <Suspense fallback={<LoadingSpinner fullScreen />}>
                <Login />
            </Suspense>
        ),
    },
    {
        path: '/register',
        element: (
            <Suspense fallback={<LoadingSpinner fullScreen />}>
                <Register />
            </Suspense>
        ),
    },
    {
        path: '/',
        element: (
            // <AuthWrapper>
                <MainLayout />
            // </AuthWrapper>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<LoadingSpinner fullScreen />}>
                        <Dashboard />
                    </Suspense>
                ),
            },
            {
                path: 'about',
                element: (
                    <Suspense fallback={<LoadingSpinner fullScreen />}>
                        <About />
                    </Suspense>
                ),
            },
            {
                path: 'meteodata',
                element: (
                    <Suspense fallback={<LoadingSpinner fullScreen />}>
                        <DashboardTopView />
                    </Suspense>
                ),
            },
            {
                path: 'users',
                element: (
                    // <AdminRoute>
                        <Suspense fallback={<LoadingSpinner fullScreen />}>
                            <Users />
                        </Suspense>
                    // </AdminRoute>
                ),
            },
            {
                path: '*',
                element: <Navigate to="/" replace />,
            },
        ],
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
