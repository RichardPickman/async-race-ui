import { calculateTime, resetEngine } from "./../components/Race/index";
import FetchCars from "./../components/Fetch/Cars";
import { Car } from "../types";
import { handleCarAmount } from "../components/Race/helpers";
import { initEngine, startEngine } from "../components/Race";

class Race {
    _selectedCar: Car | null = null;
    _currentCars: Car[] | null = null;

    renderCars(cars: Car[]) {
        const root = document.querySelector(".garage__list");
        this._currentCars = cars;
        root?.querySelectorAll("li").forEach((elem) => elem.remove());

        const carTemp = document.querySelector(".carTemp") as HTMLTemplateElement;

        cars.forEach((car) => {
            const element = document.createElement("li");
            const fragment = carTemp.content.cloneNode(true) as HTMLElement;

            fragment.querySelector(".car__model")?.classList.add("car__svg");
            fragment.querySelector(".car__finish")?.classList.add("flag__svg");

            (fragment.querySelector(".car__name") as HTMLElement).textContent = car.name;
            (fragment.querySelector(".car__model") as HTMLElement).style.backgroundColor = car.color;

            fragment.querySelector(".car__select")?.addEventListener("click", () => {
                this._selectedCar = car;
            });

            fragment.querySelector(".car__btn-start")?.addEventListener("click", async () => {
                const init = await initEngine(car, "started");
                const time = calculateTime(init.distance, init.velocity);
                startEngine(car, time);
            });

            fragment.querySelector(".car__btn-finish")?.addEventListener("click", async () => {
                await initEngine(car, "stopped");
                resetEngine(car);
            });

            fragment.querySelector(".car__remove")?.addEventListener("click", () => {
                FetchCars.removeCar(car.id as number);
                handleCarAmount();
                element.remove();
            });

            (fragment.querySelector(".car") as HTMLElement).dataset.id = String(car.id);

            element.append(fragment);
            root?.append(element);
        });
    }

    changeCar(car: Car) {
        const getCar = document.querySelector(`[data-id="${car.id}"]`) as HTMLElement;
        (getCar.querySelector(".car__name") as HTMLElement).textContent = car.name;
        getCar.querySelector(".car__model")?.classList.add("car__svg");
        (getCar.querySelector(".car__model") as HTMLElement).style.backgroundColor = car.color;
    }

    get selectedCar() {
        return this._selectedCar;
    }
}

export default Race;
