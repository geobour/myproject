import {Box} from '@mui/material'
import DashboardBottomLeftView from "./DashboardBottomLeftView.jsx";
import DashboardBottomRightView from "./DashboardBottomRightView.jsx";
import DashboardTopView from "./DashboardTopView.jsx";

const Dashboard = () => {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '2fr 1fr',
                gap: 2,
                height: 'auto',
                p: 2,
            }}
        >

            <DashboardTopView></DashboardTopView>
            <DashboardBottomLeftView></DashboardBottomLeftView>
            <DashboardBottomRightView></DashboardBottomRightView>
        </Box>
    )
}

export default Dashboard
