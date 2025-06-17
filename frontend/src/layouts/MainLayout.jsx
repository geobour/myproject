import { Box, CssBaseline } from '@mui/material'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const MainLayout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flex: 1 }}>
                <NavBar />
                <Box component="main" sx={{ flex: 1, p: 2 }}>
                    {children}
                </Box>
            </Box>
            <Footer />
        </Box>
    )
}

export default MainLayout
