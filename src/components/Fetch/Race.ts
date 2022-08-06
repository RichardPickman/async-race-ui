namespace FetchRace {
    export const handleCars = async (id: number, status: "started" | "stopped") => {
        const response = await fetch(`http://localhost:3000/engine?id=${id}&status=${status}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response;
    };

    export const switchCars = async (id: number, status: "started" | "stopped") => {
        const response = await fetch(`http://localhost:3000/engine?id=${id}&status=${status}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response;
    };
}

export default FetchRace;
