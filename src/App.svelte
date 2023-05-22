<script lang="ts">

    //svgs
    import svg_user from "./assets/User.svg";

    //types
    import type { 
        State, 
        Team, 
        Participant, 
        Challenge,
    } from "./types";

    //utils
    import { 
        GAME_STATE,
        teams_init, 
        sort_participants, 
        get,
        set,
    } from "./utils";

    //components
    import Menu from "./pages/Menu.svelte";
    import Game from "./pages/Game.svelte";
    import Elimination from "./pages/Elimination.svelte";
    import Revival from "./pages/Revival.svelte";

    let state: State = GAME_STATE.MENU;
    let teams: Team[] = get("teams", teams_init);
    let challenge: Challenge = {
        index: get("challenge_index", 3),
        title: '',
        description: '',
        timer: null,
    };

    function new_challenge(title: string, description: string, has_timer: boolean, min: string, sec: string) {

        teams.forEach((team: Team) => team.points = 0);

        challenge.index++;
        challenge.title = title;
        challenge.description = description;
        challenge.timer = has_timer ? (parseFloat(min) || 0) * 60 + (parseFloat(sec) || 0) : null;

        challenge = challenge;

        state = GAME_STATE.IN_GAME;

    }

    function end_challenge() {
        state = GAME_STATE.MENU;
    }

    function add_points (team_index: number, points: number) {
        teams[team_index].points += points; 
        teams = teams;
    }

    function eliminate(team_index: number, participant_index: number): void {
        teams[team_index].participants[participant_index].eliminated = true;
        teams = teams;
        set("teams", teams);
    }

    function revive(team_index: number, participant_index: number): void {
        teams[team_index].participants[participant_index].eliminated = false;
        teams = teams;
        set("teams", teams);
    }

</script>

<main>

    <div class="heading"> 
        <h4> AP Calculus BC </h4>
        <h1> SURVIVOR </h1>
    </div>

    {#if state === GAME_STATE.MENU}
        <Menu {new_challenge} />
    {:else if state === GAME_STATE.IN_GAME}
        <Game {challenge} {teams} {add_points} {end_challenge} />
    {:else if state === GAME_STATE.ELIMINATION}
        <Elimination />
    {:else if state === GAME_STATE.REVIVAL}
        <Revival />
    {/if}

</main>

<aside> 

    {#each teams as { title, participants, }, team_index}
        <div class="team"> 
            <h2> {title} </h2>
            <ul class="participants">
                {#each sort_participants(participants) as { name, eliminated, }, participant_index}
                    <li class="
                        {eliminated ? "eliminated" : ""}
                        {state === GAME_STATE.MENU ? "active" : ""}
                    "
                        on:click={() => state === GAME_STATE.MENU && (eliminated ? revive : eliminate)(team_index, participant_index)} 
                        on:keydown={() => state === GAME_STATE.MENU && (eliminated ? revive : eliminate)(team_index, participant_index)} 
                    >
                        <img src={svg_user} alt=""/>
                        <p> {name} </p>
                    </li>
                {/each}
            </ul>
        </div>
    {/each}
    
    </aside>

<style>

    main {
        padding: 1.25em 2.25em;

        width: 40vw;

        background-color: black;
    }

    main * {
        color: white;
    }

    h4 {
        letter-spacing: 0.25em;
        font-weight: 200;

        translate: 0.3em 0.5em;
    }

    h1 {
        font-size: 4em;
    }

    aside {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 10vw;

        padding: 2em 2em;
    }

    li {
        display: flex;
        align-items: center;
        gap: 0.25em;

        font-size: calc(1em + 0.5vw);

        cursor: not-allowed;

        transition: background-color 0.2s ease;
    }

    .active {
        cursor: pointer;
    }

    .active:hover {
        background-color: var(--lightestgrey);
    }

    p {
        position: relative;

        white-space: nowrap;
        font-weight: 500;
    }

    img {
        width: 1.2em;

        transition: opacity 1s ease 0.2s;
    }

    p::after {
        position: absolute;
        top: 50%;
        left: 0;

        height: 10%;
        width: 0;
        /* width: 0; */

        background-color: red;

        content: "";

        translate: 0 -25%;

        transition: width 0.2s ease;
    }

    .eliminated img {
        opacity: 0.1;
    }

    .eliminated p::after {
        width: 100%;
    }

</style>
