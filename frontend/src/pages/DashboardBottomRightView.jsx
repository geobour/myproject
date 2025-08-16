import { useQuery } from '@tanstack/react-query';
import { Paper, Typography } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { top10MaxDayQuery } from "../api/queries/meteodata.js";

const DashboardBottomRightView = () => {
    // Hardcoded coordinates and date
    const lat = 50;
    const lon = 10;
    const date = "2025-08-13";

    const { data, isLoading, error } = useQuery(top10MaxDayQuery({ lat, lon, date }));

    if (isLoading) return <Typography>Loading chart...</Typography>;
    if (error) return <Typography color="error">Failed to load chart data</Typography>;

    return (
        <Paper sx={{ p: 2, overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom>
                Min Temperature
            </Typography>
            <LineChart width={500} height={300} data={data}>
                <CartesianGrid stroke="#ccc" />
                <XAxis
                    dataKey="time"
                    tickFormatter={(t) => new Date(t).toLocaleTimeString()}
                />
                <YAxis label={{ value: '°C', angle: -90, position: 'insideLeft' }} />
                <Tooltip labelFormatter={(t) => new Date(t).toLocaleString()} />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="#8884d8"
                    name="Temperature"
                />
            </LineChart>
        </Paper>
    );
};

export default DashboardBottomRightView;
