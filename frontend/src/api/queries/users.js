import {useQuery} from '@tanstack/react-query';
import api from "../../utils/apiConfig.js";

// Fetch users list
export const useUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await api.get("/users");
            return response.data;
        },
        staleTime: 0,
        cacheTime: 0,
        refetchOnWindowFocus: true,
    });
};

