import { company, model } from "./cars";
import { createCar, getCars, updateCar } from "./components/Race";

const getRandomNumber = (high: number) => Math.floor(Math.random() * high);

export const generateCars = () => {
    const amount = 100;

    for (let i = 0; i < amount; i += 1) {
        const getCompanyIndex = getRandomNumber(10);
        const getModelIndex = getRandomNumber(10);
        const getCarName = `${company[getCompanyIndex]} ${model[getModelIndex]}`;
        const rgb = (getRandomNumber(255) << 16) | (getRandomNumber(255) << 8) | getRandomNumber(255);
        const getRandomColor = "#" + rgb.toString(16).padStart(6, "");

        createCar({ name: getCarName, color: getRandomColor });
    }
};

export const handleCar = async (form: string, page: number, limit: number) => {
    const name = (document.querySelector(`.${form}__input`) as HTMLInputElement).value;
    const color = (document.querySelector(`.${form}__color`) as HTMLInputElement).value;

    switch (form) {
        case "create": {
            await createCar({ name, color });
            break;
        }
        case "update": {
            await updateCar({ name, color });
            break;
        }
    }

    await getCars(page, limit);
};
