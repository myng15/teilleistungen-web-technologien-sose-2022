<script>
    import { Router, Link } from "svelte-navigator";
    let current = 0;
</script>

<Router>
    <nav class="navbar navbar-expand-sm fixed-top navbar-dark bg-dark">
        <div class="container-fluid">
            <div class="navbar-brand m-3"><h3>Waldbrand-Vorhersage</h3></div>
            <div class="collapse navbar-collapse" id="navbarNav"> 
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <div on:click="{() => current = 1}"
                              class:active="{current === 1}">
                            <Link class="nav-link" to="overview">
                                Übersicht
                            </Link>
                        </div>
                    </li>
                    <li class="nav-item">
                        <div on:click="{() => current = 2}"
                              class:active="{current === 2}">
                            <Link class="nav-link" to="settings">
                                Einstellungen
                            </Link>
                        </div>
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
	background-color: #b22222;
	font-weight: bold;
    border-radius: 5px;
}
</style>