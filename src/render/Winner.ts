import FetchCars from "../components/Fetch/Cars";
import { Winner } from "../types";

class Win {
    renderWinners(winners: Winner[]) {
        const temp = document.querySelector(".winnerTemp") as HTMLTemplateElement;
        const root = document.querySelector(".winner-table__winners") as HTMLElement;

        winners.forEach(async (winner) => {
            const fragment = temp.content.cloneNode(true) as HTMLElement;
            const car = await FetchCars.getCar(winner.id);

            (fragment.querySelector(".winner__number") as HTMLElement).textContent = String(winner.id);
            fragment.querySelector(".winner__car")?.classList.add("car__svg");
            (fragment.querySelector(".winner__car") as HTMLElement).style.backgroundColor = car.color;
            (fragment.querySelector(".winner__car") as HTMLElement).style.width = "3rem";
            (fragment.querySelector(".winner__name") as HTMLElement).textContent = car.name;
            (fragment.querySelector(".winner__wins") as HTMLElement).textContent = String(winner.wins);
            (fragment.querySelector(".winner__time") as HTMLElement).textContent = String(winner.time);

            root.append(fragment);
        });
    }
}

export default Win;
