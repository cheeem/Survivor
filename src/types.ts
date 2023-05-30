import * as Utils from './utils';

type ObjectValues<T> = T[keyof T];

export type State = ObjectValues<typeof Utils.GAME_STATE>;

export type Team = {
    title: string 
    points: number 
    participants: Participant[] 
}

export type Participant = {
    name: string
    eliminated: boolean
}

export type Challenge = {
    index: number,
    title: string,
    description: string,
    timer: number | null,
}

export type Dragged = {
    team_index: number | null 
    participant_index: number | null
}