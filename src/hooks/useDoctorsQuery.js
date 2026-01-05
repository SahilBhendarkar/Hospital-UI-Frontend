import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDoctors } from "../services/doctorService";

export const useDoctorsQuery = () => {
    const queryClient = useQueryClient();

    const { data: doctors = [], isLoading } = useQuery({
        queryKey: ["doctors"],
        queryFn: async () => {
            const res = await getDoctors();
            return res.data;
        },
    });

    const addDoctor = (doctor) => {
        queryClient.setQueryData(["doctors"], (old = []) => [
            ...old,
            { ...doctor, id: Date.now() },
        ]);
    };

    const updateDoctor = ({ id, data }) => {
        queryClient.setQueryData(["doctors"], (old = []) =>
            old.map((d) => (d.id === id ? { ...d, ...data } : d))
        );
    };

    const deleteDoctor = (id) => {
        queryClient.setQueryData(["doctors"], (old = []) =>
            old.filter((d) => d.id !== id)
        );
    };

    return {
        doctors,
        loading: isLoading,
        addDoctor,
        updateDoctor,
        deleteDoctor,
    };
};
