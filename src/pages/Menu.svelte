<script lang="ts">

    export let new_challenge: (title: string, description: string, has_timer: boolean, min: string, sec: string) => void;

    let title: string;
    let description: string;
    let has_timer: boolean = false;
    let min: string;
    let sec: string;

</script>

<form class="menu" on:submit|preventDefault={() => new_challenge(
    title, 
    description, 
    has_timer, 
    min, 
    sec
)}> 

    <h2> 
        Create A New Challenge
    </h2>
    <span data-content="Title"> 
        <input name="Title" placeholder=" " bind:value={title} />
    </span>
    <span data-content="Description"> 
        <textarea name="Description" placeholder=" " bind:value={description} cols="20" rows="6"></textarea> 
    </span>
    <div id="timer"> 
        <span> 
            <h5> Timer </h5>
            <input type="checkbox" bind:checked={has_timer} /> 
        </span>
        <span data-content="Minutes"> 
            <input name="Minutes" placeholder=" " bind:value={min} pattern="^(0|[1-9][0-9]*)$" aria-disabled={has_timer} />
        </span>
        <span data-content="Seconds"> 
            <input name="Seconds" placeholder=" " bind:value={sec} pattern="^(0|[1-9][0-9]*)$" aria-disabled={has_timer} />
        </span>
    </div>
    <button> Start Challenge </button>

</form>

<style>

    .menu {
        display: flex;
        flex-direction: column;
        gap: 1.5em;

        padding: 1em 0;
    }

    .menu * {
        color: white;
    }

    span {
        position: relative;
    }

    span::after {
        position: absolute;
        top: 0;
        left: 0;

        margin: 0.8em 0.6em;
        padding: 0 0.2em;

        background-color: black;

        content: attr(data-content);

        font-size: 1em;
        font-weight: 500;
        color: white;

        transition: translate 0.2s ease, opacity 0.2s ease;

        cursor: text;
    }

    span:has(
        input:focus, 
        textarea:focus
    )::after,
    span:has(
        input:not(:placeholder-shown), 
        textarea:not(:placeholder-shown)
    )::after {
        translate: 0 -1.35em;
    }

    input {         
        transition: opacity 0.2s ease;
    }

    span:has(input[aria-disabled="false"])::after, 
    input[aria-disabled="false"] {
        opacity: 0.5;
        
        pointer-events: none; 
    }

    input, textarea, button {
        width: 100%;

        padding: 0.75em;

        background-color: transparent;

        font-size: 1em;
        font-weight: 500;

        border: 0.15em solid white;
        border-radius: 0.5em;

        outline: none;
    }

    #timer {
        display: flex;
        /* justify-content: center; */
        align-items: center;
        gap: 1em;
    }

    #timer span:first-of-type input {
        aspect-ratio: 1.16;
    }

    #timer span:not(:first-of-type) {
        flex-grow: 1;
    }

    button {
        cursor: pointer;
    }

</style>