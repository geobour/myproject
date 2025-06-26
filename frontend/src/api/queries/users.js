import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from "../../utils/apiConfig.js";

// Fetch users list
const fetchUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        staleTime: 0,         // Always stale
        cacheTime: 0,         // Don't keep cache
        refetchOnWindowFocus: true,
    });
};


// Add user mutation
export const useAddUser = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async (newUser) => {
            const response = await api.post('/users', newUser);
            return response.data;
        },
        {
            onSuccess: () => {
                // Invalidate and refetch users after a user is added
                queryClient.invalidateQueries(['users']);
            },
        }
    );
};

// Delete user mutation
export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async (userId) => {
            await api.delete(`/users/${userId}`);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch users after deletion
                queryClient.invalidateQueries(['users']);
            },
        }
    );
};
