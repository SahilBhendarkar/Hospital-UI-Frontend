import { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function usePatients() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => {
                const formatted = data.map((u) => ({
                    id: u.id,
                    name: u.name,
                }));
                setPatients(formatted);
            })
            .catch(() => setError("Failed to load patients"))
            .finally(() => setLoading(false));
    }, []);

    const createPatient = (data) => {
        setPatients((prev) => [
            ...prev,
            { id: Date.now(), ...data },
        ]);
    };

    const updatePatient = (id, updatedPatient) => {
        setPatients((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, ...updatedPatient } : p
            )
        );
    };

    const removePatient = (id) => {
        setPatients((prev) => prev.filter((p) => p.id !== id));
    };

    return {
        patients,
        loading,
        error,
        createPatient,
        updatePatient,
        removePatient,
    };
}

export default usePatients;
