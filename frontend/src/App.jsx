import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import MainLayout from './layouts/MainLayout'
import LoadingSpinner from './components/LoadingSpinner'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))

function App() {
    return (
        <Router>
            <MainLayout>
                <Suspense fallback={<LoadingSpinner fullScreen />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </Suspense>
            </MainLayout>
        </Router>
    )
}

export default App
