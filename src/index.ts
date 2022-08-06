import { handleCarAmount, handlePages } from "./components/Race/helpers";
import { getCars, resetRace, startRace } from "./components/Race";
import { generateCars, handleCar } from "./helpers";
import "./sass/style.scss";
import { getWinners } from "./components/Winners";

const App = async () => {
    let page = 1;
    let limit = 7;

    getWinners();
    getCars(page, limit);
    handleCarAmount();

    document.querySelector(".form__generate-cars")?.addEventListener("click", () => generateCars());

    document.querySelector(".create__submit")?.addEventListener("click", () => handleCar("create", page, limit));

    document.querySelector(".update__submit")?.addEventListener("click", () => handleCar("update", page, limit));

    document.querySelector(".pagination__next")?.addEventListener("click", () => {
        page += 1;
        handlePages("next", page, limit);
    });

    document.querySelector(".pagination__prev")?.addEventListener("click", () => {
        page -= 1;
        handlePages("prev", page, limit);
    });

    document.querySelector(".nav__garage")?.addEventListener("click", () => {
        document.querySelector(".racing")?.classList.remove("hide");
        document.querySelector(".winners")?.classList.add("hide");
    });

    document.querySelector(".nav__winners")?.addEventListener("click", () => {
        document.querySelector(".racing")?.classList.add("hide");
        document.querySelector(".winners")?.classList.remove("hide");
    });

    document.querySelector(".form__race")?.addEventListener("click", () => startRace());

    document.querySelector(".form__reset")?.addEventListener("click", () => resetRace());
};

App();

export default App;
