import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPatients } from "../services/patientService";

export const usePatientsQuery = () => {
    const queryClient = useQueryClient();

    // Initial fetch (READ only once)
    const { data: patients = [], isLoading } = useQuery({
        queryKey: ["patients"],
        queryFn: async () => {
            const res = await getPatients();
            return res.data;
        },
    });

    // ADD (local state update)
    const addPatient = (patient) => {
        queryClient.setQueryData(["patients"], (old = []) => [
            ...old,
            { ...patient, id: Date.now() },
        ]);
    };

    // UPDATE (local state update)
    const updatePatient = ({ id, data }) => {
        queryClient.setQueryData(["patients"], (old = []) =>
            old.map((p) => (p.id === id ? { ...p, ...data } : p))
        );
    };

    // DELETE (local state update)
    const deletePatient = (id) => {
        queryClient.setQueryData(["patients"], (old = []) =>
            old.filter((p) => p.id !== id)
        );
    };

    return {
        patients,
        loading: isLoading,
        addPatient,
        updatePatient,
        deletePatient,
    };
};
