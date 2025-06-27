import api from '../../utils/apiConfig';
import {queryClient} from "../../app/queryClient.jsx";

// export const meteodataQuery = {
//     queryKey: ['meteodata'],
//     queryFn: async () => {
//         const res = await api.get('/meteodata');
//         console.log('Fetched meteo data:', res.data);
//         return res.data;
//     },
//     staleTime: 0,
//     cacheTime: 0,
//     refetchOnWindowFocus: true,
// };
export const deleteMeteoDataByIdMutation = {
    mutationFn: async (id) => {
        if (!id) throw new Error('No ID provided for deletion');
        const res = await api.delete(`/meteodata/${id}`);
        console.log('Deleted meteo data:', res.data);
        return res.data;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['meteodata'] });
    },
};

// Get all meteo records from MongoDB
export const allMeteoDataQuery = {
    queryKey: ['meteodata-all'],
    queryFn: async () => {
        const res = await api.get('/meteodata/all');
        return res.data;
    },
    staleTime: 0,
    cacheTime: 0,
};

// DELETE all
export const deleteAllMeteoDataMutation = {
    mutationFn: async () => {
        const res = await api.delete('/meteodata'); // calls DELETE /meteodata
        return res.data;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['meteodata-all'] }); // refresh all data query
    },
};

export const addMeteoDataMutation = {
    mutationFn: async ({ lat, lon }) => {
        if (!lat || !lon) throw new Error('Latitude and longitude must be provided');
        const res = await api.post('/meteodata', { lat, lon });
        return res.data;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['meteodata-all'] });
    },
};

export const fetchMeteoDataByLatLonMutation = {
    mutationFn: async ({ lat, lon, date }) => {
        if (!lat || !lon) throw new Error('Latitude and longitude must be provided');
        // Include date only if provided
        const body = date ? { lat, lon, date } : { lat, lon };
        const res = await api.post('/meteodata/fetch', body); // Assuming backend route is /meteodata/fetch
        console.log('Fetched weather data (with optional date):', res.data);
        return res.data;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['meteodata-all'] });
    },
};

