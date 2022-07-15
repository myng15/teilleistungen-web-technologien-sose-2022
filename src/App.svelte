<script>
	import { onMount } from "svelte";
	import { Router, Route } from "svelte-navigator";
	import Navbar from "./components/Navbar.svelte"
	import CardContainer from "./components/CardContainer.svelte"
	import Settings from "./components/Settings.svelte";
	
	let data;
    onMount(async () => {
        const responseData = await fetch("https://tl4.l0e.de/", { mode: "cors" })
                                .then(response => response.json()) 
                                .then(resData => {return resData.states;});
        data = responseData;
    });
    
</script>

<Router>
    <Navbar/>
    <main class="container">
        <Route>
            <CardContainer {data}/>
        </Route>
        <Route path="overview">
            <CardContainer {data}/>
        </Route>
        <Route path="settings">
            <Settings/>
        </Route>
    </main>
</Router>

<style>
	main {
		text-align: left;
		padding: 1em;
		width: 90%;
		margin: 100px auto;
	}

	/* @media (min-width: 640px) {
		main {
			max-width: none;
		}
	} */
</style>