import { Winner } from "../../types";

namespace FetchWinner {
    export const getWinners = async (id: number, status: "started" | "stopped") => {
        const response = await fetch(`http://localhost:3000/winners`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response;
    };

    export const getWinner = async (id: number) => await fetch(`http://localhost:3000/winners/${id}`);

    export const createCar = async (data: Winner) => {
        const response = await fetch("http://localhost:3000/winners", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return response;
    };

    export const removeWinner = async (id: number) => {
        const response = await fetch(`http://localhost:3000/winners/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response;
    };

    export const updateWinner = async (id: number, data: Winner) => {
        const response = await fetch(`http://localhost:3000/garage/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return response;
    };
}
