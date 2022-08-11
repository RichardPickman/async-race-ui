import { Car, raceReject, raceSuccess, Winner } from "./../../types/index";
import Race from "../../render/Race";
import FetchCars from "../Fetch/Cars";
import { createWinner, getWinner, getWinners, updateWinner } from "../Winners";

const RaceEntity = new Race();

export const getCars = async (page: number, limit: number) => {
    const response = await FetchCars.getCars(page, limit).then((result) => {
        RaceEntity.renderCars(result);

        return result;
    });

    return response;
};

export const getCar = async (id: number) => {
    const response = await FetchCars.getCar(id);

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



// 500 000 | velocity = x, ms

// [x  ...    y]
// [0% ... 100%]

// 

let anim: boolean;
    
export const startEngine = async (_car: Car, time: number): Promise<raceSuccess | raceReject> => {
    const start = FetchCars.handleSwitch(_car.id as number);

    anim = true;
    startAnimation(_car, time);

    start.then((res) => {
        res.id = _car.id;
        anim = false
    })
    start.catch(() => (anim = false));

    return start;
};

const startAnimation = (_car: Car, time: number) => {
    const track = document.querySelector(`[data-id="${_car.id}"]`) as HTMLElement;
    const car = track?.querySelector('.car__model') as HTMLElement;
    const flag = track?.querySelector('.car__finish') as HTMLElement;

    const refreshRate = 60;

    const flagPosition = track?.clientWidth - flag?.getBoundingClientRect().left;
    const trackWidth = track?.clientWidth - car.getBoundingClientRect().left - flagPosition;

    const step = (trackWidth / time) * refreshRate;
    const carPosition = car?.getBoundingClientRect();

    const targetPosition = window.scrollX + carPosition.left + trackWidth ;
        
    let ts = Date.now()

    car.style.left = car?.getBoundingClientRect().left + 'px';

    const cb = () => {
        const position = window.scrollX + parseInt(car.style.left) + step; //car?.getBoundingClientRect().left + step;
        
        if (Date.now() - ts >= refreshRate) {
            ts = Date.now();

            car.style.left = `${position}px`;
        }

        if (position <= targetPosition && anim) {
            requestAnimationFrame(cb);
        }
    };

    requestAnimationFrame(cb);
}

export const resetEngine = (car: Car) => {
    const findBlock = document.querySelector(`[data-id="${car.id}"]`) as HTMLElement;
    const findCar = findBlock.querySelector(".car__model") as HTMLElement;

    findCar.style.transform = `translateX(0px) scale(-1, 1)`;
    anim = false;
    initEngine(car, 'stopped');
};

export const startRace = async () => {
    const timers: number[] = [];
    const race = RaceEntity._currentCars?.map(async (car) => {
        const engine = await initEngine(car, 'started');
        const time = calculateTime(engine.distance, engine.velocity);

        timers.push(time);

        return startEngine(car, time);
    }) as Promise<raceSuccess | raceReject>[];

    Promise.allSettled(race).then(async (arr) => {
        if (!RaceEntity._currentCars) {
            return;
        }
        
        const winTime = Math.min(...timers);
        const index = timers.indexOf(winTime);
        const car = RaceEntity._currentCars[index];
        const winnerQuery = await getWinner(car.id as number);
        const winner = await winnerQuery.json();

        if (winnerQuery.status === 404) {
            const winnerData: Winner = { 
                id: car.id as number,
                wins: 1,
                time: Number((winTime / 1000).toFixed(2)),
            }
            await createWinner(winnerData);

            return;
        }

        if (winner.time < winTime) {
            winner.time = Number((winTime / 1000).toFixed(2));
        }

        winner.wins = winner.wins + 1;

        updateWinner(car.id as number, winner);

    })
}
