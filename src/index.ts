import { handleCarAmount, handlePages } from "./components/Race/helpers";
import { getCars } from "./components/Race";
import { generateCars, handleCar } from "./helpers";
import "./sass/style.scss";

const App = async () => {
    let page = 1;
    let limit = 7;

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
};

App();

export default App;
