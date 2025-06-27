import { Box, Paper } from '@mui/material'
import DashboardBottomLeftView from "./DashboardBottomLeftView.jsx";
import DashboardBottomRightView from "./DashboardBottomRightView.jsx";

const Dashboard = () => {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '2fr 1fr', // Top: 2/3, Bottom: 1/3
                gap: 2,
                height: '100vh', // Full viewport height
                p: 2,
            }}
        >
            {/* Top Full Width */}
            <Paper elevation={2} sx={{ gridColumn: '1 / 3', p: 2, height: '100%' }}>
                Top Full Width
            </Paper>

            {/* Bottom Left */}
           <DashboardBottomLeftView></DashboardBottomLeftView>

            {/* Bottom Right */}
           <DashboardBottomRightView></DashboardBottomRightView>
        </Box>
    )
}

export default Dashboard
