import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import {
    allMeteoDataQuery,
    deleteAllMeteoDataMutation,
    fetchMeteoDataByLatLonMutation,
} from '../api/queries/meteodata';
import {
    Paper,
    Typography,
    CircularProgress,
    Button,
    TextField,
    Box,
} from '@mui/material';

const DashboardTopView = () => {
    const { data, isLoading, isError } = useQuery(allMeteoDataQuery);
    const deleteAllMutation = useMutation(deleteAllMeteoDataMutation);
    const fetchMeteoMutation = useMutation(fetchMeteoDataByLatLonMutation);

    const [fetchedData, setFetchedData] = useState(null); // Only show this after submit

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const handleDeleteAll = () => {
        if (window.confirm('Are you sure you want to delete all weather records?')) {
            deleteAllMutation.mutate();
        }
    };

    const onSubmit = (formData) => {
        const lat = parseFloat(formData.lat);
        const lon = parseFloat(formData.lon);
        const date = formData.date || null;

        if (!isNaN(lat) && !isNaN(lon)) {
            fetchMeteoMutation.mutate(
                { lat, lon, date },
                {
                    onSuccess: (data) => {
                        setFetchedData(data); // Show only this data
                        reset();
                    },
                }
            );
        }
    };

    // Commented out combinedData to only show freshly fetched data:
    // const combinedData = fetchedData
    //     ? [fetchedData, ...(data || [])]
    //     : data || [];

    return (
        <Paper elevation={2} sx={{ gridColumn: '1 / 3', p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
                Weather Data Record
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', gap: 2, mb: 2, mt: 1 }}>
                    <TextField
                        label="Latitude"
                        {...register('lat', { required: true })}
                        error={!!errors.lat}
                        helperText={errors.lat ? 'Latitude is required' : ''}
                    />
                    <TextField
                        label="Longitude"
                        {...register('lon', { required: true })}
                        error={!!errors.lon}
                        helperText={errors.lon ? 'Longitude is required' : ''}
                    />
                    <TextField
                        label="Date"
                        type="date"
                        {...register('date')}
                        InputLabelProps={{ shrink: true }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={fetchMeteoMutation.isLoading}
                    >
                        {fetchMeteoMutation.isLoading ? 'Fetching...' : 'Fetch Weather'}
                    </Button>
                </Box>
            </form>

            <Button
                variant="contained"
                color="error"
                onClick={handleDeleteAll}
                disabled={deleteAllMutation.isLoading}
                sx={{ mb: 2 }}
            >
                {deleteAllMutation.isLoading ? 'Deleting...' : 'Delete All Records'}
            </Button>

            {isLoading && <CircularProgress />}
            {isError && <Typography color="error">Failed to load weather data</Typography>}

            {/* Show only the freshly fetched data */}
            {fetchedData ? (
                <Paper sx={{ p: 1, mb: 1 }}>
                    <Typography>Temperature: {fetchedData.temperature}°C</Typography>
                    <Typography>Wind Speed: {fetchedData.windspeed} km/h</Typography>
                    <Typography>Weather Code: {fetchedData.weathercode}</Typography>
                    <Typography>Time: {new Date(fetchedData.time).toLocaleString()}</Typography>
                </Paper>
            ) : (
                !isLoading && <Typography>No weather data fetched yet</Typography>
            )}
        </Paper>
    );
};

export default DashboardTopView;
