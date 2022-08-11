import Win from "../../render/Winner";
import { Winner } from "../../types";
import FetchWinner from "../Fetch/Winner";

const winEntity = new Win();

export const getWinners = async () => {
    const winners = await FetchWinner.getWinners();

    winners.forEach((winner: Winner) => winEntity.render(winner))
};

export const getWinner = async (id: number) => {
    const winner = await FetchWinner.getWinner(id)

    return winner
}

export const updateWinner = async (id: number, data: Winner) => {
    const winner = await FetchWinner.updateWinner(id, data)

    return winner
}

export const createWinner = async (data: Winner) => {
    const winner = await FetchWinner.createWinner(data)

    return winner
}
