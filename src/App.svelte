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

    const PAGES = {
        [GAME_STATE.MENU]: Menu,
        [GAME_STATE.IN_GAME]: Game,
        [GAME_STATE.ELIMINATION]: Elimination,
        [GAME_STATE.REVIVAL]: Revival,
    }

    let state: State = GAME_STATE.MENU;
    let teams: Team[] = get("teams", teams_init);
    let challenge: Challenge = {
        //bind values to form inputs
        index: get("challenge_index", 4),
        title: '',
        description: '',
        timer: null,
    };

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

<header> 
    {#each teams as { title, participants, }, team_index}

        <div class="team"> 
            <h2> {title} </h2>
            <ul class="participants">
            {#each sort_participants(participants) as { name, eliminated, }, participant_index}
            <li class={eliminated ? "eliminated" : ""}
                on:click={() => (eliminated ? revive : eliminate)(team_index, participant_index)} 
                on:keydown={() => (eliminated ? revive : eliminate)(team_index, participant_index)} 
            >
                <img src={svg_user} alt=""/>
                <p> {name} </p>
            </li>
            {/each}
            </ul>
        </div>

    {/each}
</header>

<main>

    <div class="heading"> 
        <h4> AP Calculus BC </h4>
        <h1> SURVIVOR </h1>
    </div>

    <svelte:component this={PAGES[state]} />

</main>

<style>

    header {
        display: flex;
        justify-content: space-between;

        padding: 2em 2em;
    }

    li {
        display: flex;
        align-items: center;
        gap: 0.25em;

        cursor: pointer;

        transition: background-color 0.2s ease;
    }

    li:hover {
        background-color: var(--lightestgrey);
    }

    p {
        position: relative;

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

    main {
        flex-grow: 1;

        padding: 1.25em 2.25em;

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

</style>
