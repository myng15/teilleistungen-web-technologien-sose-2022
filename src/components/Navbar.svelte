<script>
    import { Router, Link } from "svelte-navigator";
    let current = 0;
</script>

<Router>
    <nav class="navbar navbar-expand-sm fixed-top navbar-dark bg-dark">
        <div class="container-fluid">
            <Link class="navbar-brand m-3" to="overview"><h3>Waldbrand-Vorhersage</h3></Link>
            <div class="collapse navbar-collapse" id="navbarNav"> 
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <Link class="nav-link" to="overview">
                            <span
                            on:click="{() => current = 1}"
                            class:active="{current === 1}">
                            Übersicht
                            </span>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="settings"> <span
                            on:click="{() => current = 2}"
                            class:active="{current === 2}">Einstellungen</span></Link>
                    </li>
                </ul> 
            </div>
        </div>
    </nav>
</Router>

<style>
nav {
    height: 100px;
}

.active {
	color: #fda50f;
	font-weight: bold;
}
</style>