import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import { Text } from 'react-native';
export const useUpdateUser = () => {
    const {session} = useAuth();
    return useMutation({
        async mutationFn(data: any){
            const { data:updatedUser, error } = await supabase
            .from('profiles')
            .update({ username: data.user})
            .eq('id', session?.user.id)
            .select().single();

            if(error) throw new Error(error.message);
            return updatedUser;
        },
    })
};
export const useUpdateTransport = () => {
    const {session} = useAuth();

    return useMutation({
        async mutationFn(data: any){
            const { data:favTrans, error } = await supabase
            .from('profiles')
            .update({ fav_transport: data.fav_transport})
            .eq('id', session?.user.id)
            .select().single();

            if(error) throw new Error(error.message);
            return favTrans;
            
        },
    })
};
export const useGetPoints = () => {
    const {session} = useAuth();

    return useQuery({
        queryKey: ['points'],
        async queryFn(){
            const {data, error} = await supabase
            .from('profiles')
            .select("points")
            .eq('id', session?.user.id)
            .single();

            if(error) throw new Error(error.message);

            return data;
        }
    })
}
export const useUpdatePoints = () => {
    const {session} = useAuth();
    const query = useQueryClient();
    return useMutation({
        async mutationFn(data: any){
            const { data:newPoints, error } = await supabase.rpc('increment', {row_id: session?.user.id, x: data.points});
            if(error) throw new Error(error.message);
            return newPoints;
            
        },
        async onSuccess(){
            query.invalidateQueries({queryKey: ['users']});
        }
    })
};

export const useGetUsers = () => {

    return useQuery({
        queryKey: ['users'],
        async queryFn(){
            const {data, error} = await supabase
            .from("profiles")
            .select("*")
            .order("points", {ascending: false});

            if(error) throw new Error(error.message);

            return data;
        }
    })
}