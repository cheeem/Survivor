import type { Team, Participant, } from "./types";

export const GAME_STATE = {
    MENU: "MENU",
    IN_GAME: "IN_GAME",
    ELIMINATION: "ELIMINATION",
    REVIVAL: "REVIVE",
}

export const teams_init: Team[] = [
    {
        title: "Team 1",
        points: 0,
        participants: [
            { name: "Jackson H.", eliminated: false, },
            { name: "Chloe", eliminated: false, },
            { name: "Cianna", eliminated: true, },
            { name: "Tyler", eliminated: false, },
        ],
    },
    {
        title: "Team 2",
        points: 0,
        participants: [
            { name: "Jackson W.", eliminated: false, },
            { name: "Cole", eliminated: false, },
            { name: "Norah", eliminated: true, },
            { name: "Jon", eliminated: false, },
        ],
    },
    {
        title: "Team 3",
        points: 0,
        participants: [
            { name: "Catherine", eliminated: false, },
            { name: "Jackie", eliminated: true, },
            { name: "Sophie", eliminated: false, },
            { name: "Anika", eliminated: false, },
        ],
    },
    {
        title: "Team 4",
        points: 0,
        participants: [
            { name: "Evan", eliminated: false, },
            { name: "Amanda", eliminated: false, },
            { name: "Mason", eliminated: false, },
            { name: "Angus", eliminated: false, },
            { name: "Alec", eliminated: false, },
        ],
    },
];

export function get<T>(key: string, _default:T): T {

    try {
        return JSON.parse(window.localStorage.getItem(key)) as T || _default;
    }
    catch (error) {
        console.log(error);
        return _default;
    }

}

export function set<T>(key: string, value: T): void {

    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }

}

export function sort_participants(participants: Participant[]): Participant[] {
    return participants.sort((a, b) => a.eliminated === b.eliminated ? 0 : b.eliminated ? -1 : 1);
}