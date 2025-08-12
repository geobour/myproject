import { useQuery } from '@tanstack/react-query';
import { Paper, Typography } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { allMeteoDataQuery } from '../api/queries/meteodata';

const DashboardBottomLeftView = () => {
    const { data, isLoading, isError } = useQuery(allMeteoDataQuery);

    const dataArray = data ? [data] : [];

    if (isLoading) return <Typography>Loading chart...</Typography>;
    if (isError) return <Typography color="error">Failed to load chart data</Typography>;

    return (
        <Paper sx={{ p: 2, overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom>
                Temperature
            </Typography>
            <LineChart width={500} height={300} data={dataArray}>
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
