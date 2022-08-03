import { Car } from "../../types";

type args = number | null;

export namespace FetchCars {
    export const getCars = async (page: args, limit: args) => {
        const options = { method: "GET" };
        const response =
            page || limit
                ? await fetch(`http://127.0.0.1:3000/garage?_page=${page}&_limit=${limit}`, options)
                : await fetch(`http://127.0.0.1:3000/garage`, options);

        return response.json();
    };

    export const getCar = async (id: number) => await fetch(`http://127.0.0.1:3000/garage/${id}`);

    export const createCar = async (data: Car) => {
        const response = await fetch("http://127.0.0.1:3000/garage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return response.json();
    };

    export const removeCar = async (id: number) => {
        const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.json();
    };

    export const updateCar = async (id: number, data: Car) => {
        const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return response.json();
    };

    export const handleEngine = async (id: number, status: string) => {
        const response = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=${status}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.json();
    };

    export const handleSwitch = async (id: number) => {
        const response = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=drive`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.json();
    };
}

export default FetchCars;
