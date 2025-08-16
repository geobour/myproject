import api from '../../utils/apiConfig';
import {queryClient} from "../../app/queryClient.jsx";

export const top10MaxDayQuery = ({lat, lon, date}) => ({
    queryKey: ['meteodata-top10', lat, lon, date],
    queryFn: async () => {
        if (!lat || !lon || !date) throw new Error('lat, lon, and date are required');
        const res = await api.get('/meteodata/top10max-day', {  // <- match backend
            params: {lat, lon, date},
        });
        return res.data;
    },
    staleTime: 0,
    cacheTime: 0,
});
export const top10MinDayQuery = ({lat, lon, date}) => ({
    queryKey: ['meteodata-top10-min', lat, lon, date],
    queryFn: async () => {
        if (!lat || !lon || !date) throw new Error('lat, lon, and date are required');
        const res = await api.get('/meteodata/top10min-day', {
            params: {lat, lon, date},
        });
        return res.data;
    },
    staleTime: 0,
    cacheTime: 0,
});

export const fetchMeteoDataByLatLonMutation = {
    mutationFn: async ({lat, lon, date}) => {
        if (!lat || !lon) throw new Error('Latitude and longitude must be provided');
        // Include date only if provided
        const body = date ? {lat, lon, date} : {lat, lon};
        const res = await api.post('/meteodata/fetch', body); // Assuming backend route is /meteodata/fetch
        console.log('Fetched weather data (with optional date):', res.data);
        return res.data;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['meteodata-all']});
    },
};

