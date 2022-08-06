import { Car } from "./../../types/index";
import Race from "../../render/Race";
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

    return start;
};

export const calculateTime = (distance: number, velocity: number) => distance / velocity;

export const startEngine = async (_car: Car, time: number) => {
    const track = document.querySelector(`[data-id="${_car.id}"]`) as HTMLElement;
    const car = track?.querySelector(".car__model") as HTMLElement;
    const flag = track?.querySelector(".car__finish") as HTMLElement;

    const refreshRate = 60;

    const flagPosition = track?.clientWidth - flag?.getBoundingClientRect().right;
    const trackWidth = track?.clientWidth - car.getBoundingClientRect().left - flagPosition;

    const interval = time / refreshRate;
    const step = trackWidth / interval;

    const targetPosition = car?.getBoundingClientRect().left + trackWidth;

    let isEngineRunning = true;

    let ts = Date.now();

    const cb = () => {
        const position = window.scrollX + car?.getBoundingClientRect().left + step;

        if (Date.now() - ts >= interval) {
            ts = Date.now();
            car.style.left = `${position}px`;
        }

        if (position < targetPosition && isEngineRunning) {
            requestAnimationFrame(cb);
        }
    };

    requestAnimationFrame(cb);

    const start = FetchCars.handleSwitch(_car.id as number);

    start.catch(() => (isEngineRunning = false));
};

export const resetEngine = async (car: Car) => {
    const carTag = document.querySelector(`[data-id="${car.id}"]`) as HTMLElement;
    const carModel = carTag.querySelector(".car__model") as HTMLElement;

    initEngine(car, "stopped");
    carModel.style.left = "6%";
};

export const startRace = async () => {
    const race = RaceEntity.currentCars?.map(async (car) => {
        const init = await initEngine(car, "started");
        const time = calculateTime(init.distance, init.velocity);

        return startEngine(car, time);
    });

    const raceOver = await Promise.allSettled([race]);
};

export const resetRace = async () => RaceEntity.currentCars?.forEach((car) => resetEngine(car));
