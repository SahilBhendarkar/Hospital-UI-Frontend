import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPatients } from "../services/patientService";

export const usePatientsQuery = () => {
    const queryClient = useQueryClient();

    const { data: patients = [], isLoading } = useQuery({
        queryKey: ["patients"],
        queryFn: async () => {
            const res = await getPatients();
            return res.data;
        },
    });

    const addPatient = (patient) => {
        queryClient.setQueryData(["patients"], (old = []) => [
            ...old,
            { ...patient, id: Date.now() },
        ]);
    };

    const updatePatient = ({ id, data }) => {
        queryClient.setQueryData(["patients"], (old = []) =>
            old.map((p) => (p.id === id ? { ...p, ...data } : p))
        );
    };

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
