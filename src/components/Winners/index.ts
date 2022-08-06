import Win from "../../render/Winner";
import FetchWinner from "../Fetch/Winner";

const winEntity = new Win();

export const getWinners = async () => {
    const winners = await FetchWinner.getWinners();

    winEntity.renderWinners(winners);
};
