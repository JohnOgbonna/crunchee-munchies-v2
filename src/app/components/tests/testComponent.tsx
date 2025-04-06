import React from "react";
import { useItems } from "@/app/context/ItemsContext";

const TestComponent: React.FC = () => {
    const { items, loading, error } = useItems();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Items:</h1>
            {Object.values(items).map((item) => (
                <div key={item.id}>{item.name}</div>
            ))}
        </div>
    );
};

export default TestComponent;