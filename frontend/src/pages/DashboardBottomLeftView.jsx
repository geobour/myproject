import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { Paper, Typography } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { top10MinDayQuery } from '../api/queries/meteodata';

const DashboardBottomLeftView = () => {
    const { lat, lon, date } = useSelector((state) => state.filters);
    const { data, isLoading, error } = useQuery({
        ...top10MinDayQuery({ lat, lon, date }),
        enabled: !!lat && !!lon && !!date,
    });

    if (isLoading) return <Typography>Loading chart...</Typography>;
    if (error) return <Typography color="error">Failed to load chart data</Typography>;
    if (!data || data.length === 0) return <Typography>No data available for the selected date/location</Typography>;

    return (
        <Paper sx={{ p: 2, overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom>
                Min Temperature
            </Typography>
            <LineChart width={500} height={300} data={data}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="time" tickFormatter={(t) => new Date(t).toLocaleTimeString()} />
                <YAxis label={{ value: '°C', angle: -90, position: 'insideLeft' }} />
                <Tooltip labelFormatter={(t) => new Date(t).toLocaleString()} />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature" />
            </LineChart>
        </Paper>
    );
};

export default DashboardBottomLeftView;
