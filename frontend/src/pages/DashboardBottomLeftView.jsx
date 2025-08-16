import {useQuery} from '@tanstack/react-query';
import {Paper, Typography} from '@mui/material';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from 'recharts';
import {top10MinDayQuery} from '../api/queries/meteodata';

const DashboardBottomLeftView = () => {
    // Hardcoded coordinates and date
    const lat = 50;
    const lon = 10;
    const date = "2025-08-13";

    const {data, isLoading, error} = useQuery(top10MinDayQuery({lat, lon, date}));

    if (isLoading) return <Typography>Loading chart...</Typography>;
    if (error) return <Typography color="error">Failed to load chart data</Typography>;

    return (
        <Paper sx={{p: 2, overflow: 'auto'}}>
            <Typography variant="h6" gutterBottom>
                Max Temperature
            </Typography>
            <LineChart width={500} height={300} data={data}>
                <CartesianGrid stroke="#ccc"/>
                <XAxis
                    dataKey="time"
                    tickFormatter={(t) => new Date(t).toLocaleTimeString()}
                />
                <YAxis label={{value: '°C', angle: -90, position: 'insideLeft'}}/>
                <Tooltip labelFormatter={(t) => new Date(t).toLocaleString()}/>
                <Legend/>
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


export default DashboardBottomLeftView;
