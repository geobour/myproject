import { Box, Paper } from '@mui/material'

const Home = () => {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: 'auto auto',
                gap: 2,
            }}
        >
            {/* Top Left */}
            <Paper elevation={2} sx={{ p: 2 }}>
                Top Left
            </Paper>

            {/* Top Right */}
            <Paper elevation={2} sx={{ p: 2 }}>
                Top Right
            </Paper>

            {/* Bottom Full Width */}
            <Paper elevation={2} sx={{ gridColumn: '1 / 3', p: 2 }}>
                Bottom Full Width
            </Paper>
        </Box>
    )
}

export default Home
