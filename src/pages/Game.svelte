<script lang="ts">

    import type { Challenge, Team } from "../types";

    export let challenge: Challenge;
    export let teams: Team[];
    export let add_points: (team_index: number, points: number) => void;
    export let end_challenge: () => void;

    let time: number | null = challenge.timer;
    $: min = Math.floor(time / 60).toString().padStart(2, '0');
    $: sec = (time % 60).toString().padStart(2, '0');

    if(time) {

        let interval = setInterval(() => {

            if(time <= 0) {
                return clearInterval(interval);
            }

            time--;

        }, 1000);

    }

</script>

<div class="game">
    <h2> Challenge {challenge.index} {challenge.title ? `: ${challenge.title}` : ''} </h2>
    <p> {challenge.description || ""} </p>
    {#if time !== null}
        <div class="timer"> {min}:{sec} </div>
    {/if}
    <ul>
        {#each teams as { title, points }, i}
            <li>
                <div class="display">
                    <div class="title"> {title} </div>
                    <div class="points"> {points} </div>
                </div>
                <div class="controls">
                    <button on:click={() => add_points(i, 1)}> + </button>
                    <button on:click={() => add_points(i, -1)}> - </button>
                </div>
            </li>
        {/each}
    </ul>
    <button on:click={() => end_challenge()}> End Challenge </button>
</div>

<style>

    .game {
        display: flex;
        flex-direction: column;
        gap: 1.5em;

        padding: 2em 0;
    }

    .game * {
        color: white;
    }

    h2 {
        font-size: 1.75em;
    }

    p {
        font-size: 1.15em;
        font-weight: 500;
        line-height: 1.5em;
    }

    .timer {
        display: grid;
        place-items: center;

        padding: 0.5em;

        font-size: 2.5em;

        border-radius: 0.5em;
    }

    ul {
        display: flex;
        gap: 0.75em;
    }

    li {
        --team-color: white;

        flex-grow: 1;

        text-align: center;
        font-weight: 600;

        border: 0.1em solid var(--team-color);
        border-radius: 0.5em;
    }

    /* .lost {
        --team-color: red;
    } */

    .display {
        padding: 0.5em;
    }

    .display * {
        color: var(--team-color);
    }

    .controls {
        display: flex;
    }

    .controls button {
        flex-grow: 1;

        background-color: var(--team-color);

        font-size: 1.5em;
        font-weight: 600;
        color: black;

        border: none;

        cursor: pointer;
    }

    .controls button:first-of-type {
        border-radius: 0 0 0 0.2em;
    }

    .controls button:last-of-type {
        border-radius: 0 0 0.2em 0;
    }

    .game > button {
        padding: 1em;

        background-color: transparent;

        font-size: 1em;
        font-weight: 600;

        border: 0.15em solid white;
        border-radius: 1em;

        cursor: pointer;
    }

</style>