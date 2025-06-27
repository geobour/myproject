import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import MainLayout from './layouts/MainLayout'
import LoadingSpinner from './components/LoadingSpinner'
import Users from "./pages/Users.jsx";
import DashboardTopView from "./pages/DashboardTopView.jsx";

const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const About = lazy(() => import('./pages/About'))
// const Users = lazy(() => import('./pages/Users'))

function App() {
    return (
        <Router>
            <MainLayout>
                <Suspense fallback={<LoadingSpinner fullScreen />}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/meteodata" element={<DashboardTopView />} />
                    </Routes>
                </Suspense>
            </MainLayout>
        </Router>
    )
}

export default App
