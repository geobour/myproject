import { Box, CircularProgress } from '@mui/material'

const LoadingSpinner = ({ fullScreen = false }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...(fullScreen
                    ? {
                        height: '100vh',
                        width: '100vw',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        zIndex: 1300,
                    }
                    : {
                        width: '100%',
                        height: '100%',
                        p: 2,
                    }),
            }}
        >
            <CircularProgress />
        </Box>
    )
}

export default LoadingSpinner
