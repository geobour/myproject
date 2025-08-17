import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import {
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
} from '../store/wishList/wishListSlice.js';

import { fetchMeteoDataByLatLonMutation } from '../api/queries/meteodata';

import {
    Paper,
    Typography,
    TextField,
    Box,
    Divider,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Collapse,
} from '@mui/material';

import CustomButton from '../components/CustomButton';
import { setFilters } from "../store/filters/filters.js";

const DashboardTopView = () => {
    const fetchMeteoMutation = useMutation(fetchMeteoDataByLatLonMutation);
    const [fetchedData, setFetchedData] = useState(null);
    const filters = useSelector((state) => state.filters);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            lat: filters.lat || '',
            lon: filters.lon || '',
            date: filters.date || '',
        },
    });

    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist);

    const onSubmit = (formData) => {
        const lat = parseFloat(formData.lat);
        const lon = parseFloat(formData.lon);
        const date = formData.date || null;

        if (!isNaN(lat) && !isNaN(lon)) {
            dispatch(setFilters({ lat, lon, date }));

            fetchMeteoMutation.mutate(
                { lat, lon, date },
                {
                    onSuccess: (data) => {
                        setFetchedData(data);
                    },
                }
            );
        }
    };

    const onAddToWishlist = (data) => {
        dispatch(addToWishlist({ ...data, id: Date.now() + Math.random() }));
    };

    const colWidths = ['40%', '40%', '20%'];

    return (
        <Paper elevation={2} sx={{ gridColumn: '1 / 3', p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
                Search
            </Typography>

            <Box sx={{ border: '1px solid #ccc', borderRadius: 1, p: 2 }}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{ display: 'flex', alignItems: 'center', gap: 16 }}
                >
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
                    <CustomButton
                        type="submit"
                        variant="contained"
                        color="#1976d2"
                        disabled={fetchMeteoMutation.isLoading}
                    >
                        {fetchMeteoMutation.isLoading ? 'Fetching...' : 'Fetch Weather'}
                    </CustomButton>
                </form>
            </Box>

            {fetchedData && (
                <Table sx={{ mt: 3, tableLayout: 'fixed', width: '100%' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: colWidths[0] }}>Temperature (°C)</TableCell>
                            <TableCell sx={{ width: colWidths[1] }}>Time</TableCell>
                            <TableCell sx={{ width: colWidths[2] }} align="center">Wishlist</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{fetchedData.temperature}</TableCell>
                            <TableCell>{new Date(fetchedData.time).toLocaleString()}</TableCell>
                            <TableCell align="center">
                                <CustomButton
                                    variant="outlined"
                                    size="small"
                                    color="#1976d2"
                                    onClick={() => onAddToWishlist(fetchedData)}
                                >
                                    Add to Wishlist
                                </CustomButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            )}

            {/* Wishlist Section */}
            <Divider sx={{ my: 3 }} />
            <Collapse in={true} timeout={300}>
                <Box
                    sx={{
                        border: '1px solid #ccc',
                        borderRadius: 1,
                        p: 2,
                        minHeight: 150,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Wishlist
                    </Typography>

                    {wishlist.length === 0 ? (
                        <Typography>No items in wishlist</Typography>
                    ) : (
                        <Box
                            sx={{
                                maxHeight: 400,
                                overflowY: 'auto'
                            }}
                        >
                            <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ width: colWidths[0] }}>Temperature (°C)</TableCell>
                                        <TableCell sx={{ width: colWidths[1] }}>Time</TableCell>
                                        <TableCell sx={{ width: colWidths[2] }} align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {wishlist.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.temperature}</TableCell>
                                            <TableCell>{new Date(item.time).toLocaleString()}</TableCell>
                                            <TableCell align="center">
                                                <CustomButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => dispatch(removeFromWishlist(item))}
                                                >
                                                    Remove
                                                </CustomButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    )}

                    {wishlist.length > 0 && (
                        <CustomButton
                            variant="outlined"
                            color="#ff9800"
                            onClick={() => dispatch(clearWishlist())}
                            sx={{ alignSelf: 'flex-end', mt: 1 }}
                        >
                            Clear Wishlist
                        </CustomButton>
                    )}
                </Box>
            </Collapse>
        </Paper>
    );
};

export default DashboardTopView;
