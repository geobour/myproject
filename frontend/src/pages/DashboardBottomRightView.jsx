import { useQuery } from '@tanstack/react-query';
import { Paper, Typography } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { allMeteoDataQuery } from '../api/queries/meteodata';

const DashboardBottomRightView = () => {
    const { data, isLoading, isError } = useQuery(allMeteoDataQuery);

    if (isLoading) return <Typography>Loading chart...</Typography>;
    if (isError) return <Typography color="error">Failed to load chart data</Typography>;

    return (
        <Paper sx={{ p: 2, overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom>
                Wind Speed
            </Typography>
            <LineChart width={500} height={300} data={data}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="time" tickFormatter={(t) => new Date(t).toLocaleTimeString()} />
                <YAxis label={{ value: 'km/h', angle: -90, position: 'insideLeft' }} />
                <Tooltip labelFormatter={(t) => new Date(t).toLocaleString()} />
                <Legend />
                <Line type="monotone" dataKey="windspeed" stroke="#82ca9d" name="Wind Speed" />
            </LineChart>
        </Paper>
    );
};

export default DashboardBottomRightView;
