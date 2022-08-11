export interface Car {
    id?: number;
    name: string;
    color: string;
}

export interface Winner {
    id: number;
    wins: number;
    time: number;
}

export type raceReject = {
    status: string,
    message: string
}

export type raceSuccess = {
    status: string,
    message: string
}
