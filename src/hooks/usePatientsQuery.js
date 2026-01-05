import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPatients } from "../services/patientService";

export const usePatientsQuery = () => {
    const queryClient = useQueryClient();

    // Initial fetch 
    const { data: patients = [], isLoading } = useQuery({
        queryKey: ["patients"],
        queryFn: async () => {
            const res = await getPatients();
            return res.data;
        },
    });

    // ADD 
    const addPatient = (patient) => {
        queryClient.setQueryData(["patients"], (old = []) => [
            ...old,
            { ...patient, id: Date.now() },
        ]);
    };

    // UPDATE 
    const updatePatient = ({ id, data }) => {
        queryClient.setQueryData(["patients"], (old = []) =>
            old.map((p) => (p.id === id ? { ...p, ...data } : p))
        );
    };

    // DELETE 
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
