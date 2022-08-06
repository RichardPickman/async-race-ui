import FetchCars from "./../Fetch/Cars";
import { getCars } from "../Race";

export const handleCarAmount = async () => {
    const amount = await FetchCars.getCars(null, null);
    (document.querySelector(".garage__title") as HTMLElement).textContent = `Garage(${amount.length})`;
};

export const handlePages = async (action: string, page: number, limit: number) => {
    const next = document.querySelector(".pagination__next") as HTMLElement;
    const prev = document.querySelector(".pagination__prev") as HTMLElement;

    switch (action) {
        case "prev": {
            if (page === 1) {
                prev.classList.add("disabled");
            } else {
                prev.classList.remove("disabled");
                next.classList.remove("disabled");
            }

            getCars(page, limit);

            break;
        }
        case "next": {
            const render = await getCars(page, limit);

            if (render.length < 7) {
                next?.classList.add("disabled");
            }

            if (render.length === 7 && page !== 1) {
                next.classList.remove("disabled");
                prev.classList.remove("disabled");
            }

            break;
        }
    }
};

export const handleAnimation = (id: number, time: number) => {
    const car = document.querySelector(`[data-id="${id}"]`);

    console.log(car);
};
