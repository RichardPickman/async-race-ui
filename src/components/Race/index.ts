import { Car } from "./../../types/index";
import Race from "../../render";
import FetchCars from "../Fetch/Cars";

const RaceEntity = new Race();

export const getCars = async (page: number, limit: number) => {
    const response = await FetchCars.getCars(page, limit).then((result) => {
        RaceEntity.renderCars(result);

        return result;
    });

    return response;
};

export const createCar = async (data: Car) => {
    const response = await FetchCars.createCar(data);

    return response;
};

export const updateCar = async (data: Car) => {
    if (RaceEntity._selectedCar) {
        const car = RaceEntity._selectedCar;
        const response = await FetchCars.updateCar(car.id as number, data);
        RaceEntity.changeCar(response);

        return response;
    }

    return;
};

type engine = {
    velocity: number;
    distance: number;
};

export const initEngine = async (car: Car, status: "started" | "stopped") => {
    const start: engine = await FetchCars.handleEngine(car.id as number, status);
    console.log(start);

    return start;
};

export const calculateTime = (distance: number, velocity: number) => distance / velocity;

export const startEngine = async (car: Car, time: number) => {
    const start = FetchCars.handleSwitch(car.id as number);
    const findBlock = document.querySelector(`[data-id="${car.id}"]`) as HTMLElement;
    const findCar = findBlock.querySelector(".car__model") as HTMLElement;
    const width = window.innerWidth - 96 - 76 * 2;
    const step = width / time;
    let request: number;
    let position = 0;

    const performAnimation = () => {
        position += step;
        findCar.style.transform = `translateX(${position}%) scale(-1, 1)`;
        if (position <= width) {
            request = requestAnimationFrame(performAnimation);
        }
    };

    request = requestAnimationFrame(performAnimation);

    start.then(() => cancelAnimationFrame(request));
    start.catch(() => cancelAnimationFrame(request));
};

export const resetEngine = (car: Car) => {
    const findBlock = document.querySelector(`[data-id="${car.id}"]`) as HTMLElement;
    const findCar = findBlock.querySelector(".car__model") as HTMLElement;

    findCar.style.transform = `translateX(0px) scale(-1, 1)`;
};
