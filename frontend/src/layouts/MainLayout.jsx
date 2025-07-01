import { Box, CssBaseline } from '@mui/material'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const MainLayout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flex: 1 }}>
                <NavBar />
                <Box component="main" sx={{ flex: 1, p: 2 }}>
                    <Outlet />
                </Box>
            </Box>
            <Footer />
        </Box>
    )
}

export default MainLayout
