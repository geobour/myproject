import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import {
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
} from '../store/wishList/wishListSlice.js';
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
    Divider,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@mui/material';

const DashboardTopView = () => {
    const { isLoading, isError } = useQuery(allMeteoDataQuery);
    const deleteAllMutation = useMutation(deleteAllMeteoDataMutation);
    const fetchMeteoMutation = useMutation(fetchMeteoDataByLatLonMutation);
    const [fetchedData, setFetchedData] = useState(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist);

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
                        setFetchedData(data);
                        reset();
                    },
                }
            );
        }
    };

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
                        color="primary"
                        disabled={fetchMeteoMutation.isLoading}
                    >
                        {fetchMeteoMutation.isLoading ? 'Fetching...' : 'Fetch Weather'}
                    </Button>
                </Box>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteAll}
                    disabled={deleteAllMutation.isLoading}
                    sx={{ mb: 2 }}
                >
                    {deleteAllMutation.isLoading ? 'Deleting...' : 'Delete All Records'}
                </Button>
            </form>

            {isLoading && <CircularProgress />}
            {isError && <Typography color="error">Failed to load weather data</Typography>}

            {fetchedData ? (
                <Table sx={{ mb: 3 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Temperature (°C)</TableCell>
                            <TableCell>Wind Speed (km/h)</TableCell>
                            <TableCell>Weather Code</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell align="center">Wishlist</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{fetchedData.temperature}</TableCell>
                            <TableCell>{fetchedData.windspeed}</TableCell>
                            <TableCell>{fetchedData.weathercode}</TableCell>
                            <TableCell>{new Date(fetchedData.time).toLocaleString()}</TableCell>
                            <TableCell align="center">
                                <Button
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                    onClick={() => dispatch(addToWishlist(fetchedData))}
                                >
                                    Add to Wishlist
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            ) : (
                !isLoading && <Typography>No weather data fetched yet</Typography>
            )}

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
                Wishlist
            </Typography>

            {wishlist.length === 0 ? (
                <Typography>No items in wishlist</Typography>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Temperature (°C)</TableCell>
                            <TableCell>Wind Speed (km/h)</TableCell>
                            <TableCell>Weather Code</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {wishlist.map((item) => (
                            <TableRow key={item.time}>
                                <TableCell>{item.temperature}</TableCell>
                                <TableCell>{item.windspeed}</TableCell>
                                <TableCell>{item.weathercode}</TableCell>
                                <TableCell>{new Date(item.time).toLocaleString()}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        size="small"
                                        color="error"
                                        onClick={() => dispatch(removeFromWishlist(item))}
                                    >
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            {wishlist.length > 0 && (
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => dispatch(clearWishlist())}
                    sx={{ mt: 1 }}
                >
                    Clear Wishlist
                </Button>
            )}
        </Paper>
    );
};

export default DashboardTopView;
