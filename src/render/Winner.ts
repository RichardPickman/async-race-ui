import { getCar } from "../components/Race";
import { Winner } from "../types";


class WinnerRender {
    async render(winner: Winner) {
        const root = document.querySelector('.winner-table__winners');
        root?.childNodes.forEach(el => el.remove());
        const fragment = document.querySelector('.winnerTemp') as HTMLTemplateElement;
        const tableElement = fragment.content.cloneNode(true) as HTMLElement;
        const carWinner = await getCar(winner.id);

        (tableElement.querySelector('.winner__number') as HTMLElement).textContent = String(winner.id);
        (tableElement.querySelector('.winner__car') as HTMLElement).classList.add('car__svg');
        (tableElement.querySelector('.winner__car') as HTMLElement).style.backgroundColor = carWinner.color;
        (tableElement.querySelector('.winner__name') as HTMLElement).textContent = carWinner.name;
        (tableElement.querySelector('.winner__wins') as HTMLElement).textContent = String(winner.wins);
        (tableElement.querySelector('.winner__time') as HTMLElement).textContent = String(winner.time);

        root?.append(tableElement);
    }
}

export default WinnerRender;


// <tbody class="winners__table">
//     <tr>
//         <td class="winners__number">1</td>
//         <td class="winners__car">asd</td>
//         <td class="winners__name">Porshe</td>
//         <td class="winners__wins">2</td>
//         <td class="winners__time">5</td>
//     </tr>
// </tbody>
