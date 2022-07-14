<script>
	import { onMount } from "svelte";
	import { Router, Route } from "svelte-navigator";
	import Navbar from "./components/Navbar.svelte"
	import CardContainer from "./components/CardContainer.svelte"
	import Settings from "./components/Settings.svelte";
	
</script>

<Router>
    <Navbar/>
    <main class="container">
        <Route>
            <CardContainer/>
        </Route>
        <Route path="overview">
            <CardContainer/>
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