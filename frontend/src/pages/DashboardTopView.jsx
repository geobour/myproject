import React, {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {useForm} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
} from '../store/wishList/wishListSlice.js';

import {
    fetchMeteoDataByLatLonMutation,
} from '../api/queries/meteodata';

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
} from '@mui/material';

import CustomButton from '../components/CustomButton';

const DashboardTopView = () => {
    const fetchMeteoMutation = useMutation(fetchMeteoDataByLatLonMutation);

    const [fetchedData, setFetchedData] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm();

    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist);


    const onSubmit = (formData) => {
        const lat = parseFloat(formData.lat);
        const lon = parseFloat(formData.lon);
        const date = formData.date || null;

        if (!isNaN(lat) && !isNaN(lon)) {
            fetchMeteoMutation.mutate(
                {lat, lon, date},
                {
                    onSuccess: (data) => {
                        setFetchedData(data);
                        // reset();
                    },
                }
            );
        }
    };

    return (
        <Paper elevation={2} sx={{gridColumn: '1 / 3', p: 2, height: '100%'}}>
            <Typography variant="h6" gutterBottom>
                Weather Data Record
            </Typography>
            <Box sx={{border: '1px solid #ccc', borderRadius: 1, p: 2}}>
                <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', alignItems: 'center', gap: 16}}>
                    <TextField
                        label="Latitude"
                        {...register('lat', {required: true})}
                        error={!!errors.lat}
                        helperText={errors.lat ? 'Latitude is required' : ''}
                    />
                    <TextField
                        label="Longitude"
                        {...register('lon', {required: true})}
                        error={!!errors.lon}
                        helperText={errors.lon ? 'Longitude is required' : ''}
                    />
                    <TextField
                        label="Date"
                        type="date"
                        {...register('date')}
                        InputLabelProps={{shrink: true}}
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
            {fetchedData &&
                <Table sx={{mb: 3}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Temperature (°C)</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell align="center">Wishlist</TableCell>
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
                                    onClick={() => dispatch(addToWishlist(fetchedData))}
                                >
                                    Add to Wishlist
                                </CustomButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            }
            <Divider sx={{my: 3}}/>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="h6" gutterBottom sx={{ml: 2}}>
                    Wishlist
                </Typography>
                {wishlist.length > 0 && (
                    <CustomButton
                        variant="outlined"
                        color="#ff9800"
                        onClick={() => dispatch(clearWishlist())}
                        sx={{mt: 0, mr: 1}}
                    >
                        Clear Wishlist
                    </CustomButton>
                )}
            </Box>
            {wishlist.length === 0 ? (
                <Typography>No items in wishlist</Typography>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Temperature (°C)</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {wishlist.map((item) => (
                            <TableRow key={item.time}>
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
            )}
        </Paper>
    );
};

export default DashboardTopView;
