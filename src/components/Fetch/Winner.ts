import { Winner } from "../../types";

namespace FetchWinner {
    export const getWinners = async (sort?: "id" | "wins" | "time", order?: "ASC" | "DESC") => {
        const setQuery = `sort=${sort ? sort : "id"}&order=${order ? order : "ASC"}`;
        const response = await fetch(`http://localhost:3000/winners?${setQuery}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.json();
    };

    export const getWinner = async (id: number) => {
        const response = await fetch(`http://localhost:3000/winners/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response;
    }

    export const createWinner = async (data: Winner) => {
        const response = await fetch("http://localhost:3000/winners", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return response.json();
    };

    export const removeWinner = async (id: number) => {
        const response = await fetch(`http://localhost:3000/winners/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.json();
    };

    export const updateWinner = async (id: number, data: Winner) => {
        const response = await fetch(`http://localhost:3000/winners/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return response.json();
    };
}

export default FetchWinner;
