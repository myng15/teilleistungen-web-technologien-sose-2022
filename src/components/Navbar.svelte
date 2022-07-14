<script>
    import { Router, Link } from "svelte-navigator";
</script>

<Router>
    <nav class="navbar navbar-expand-sm fixed-top navbar-dark bg-dark">
        <div class="container-fluid">
            <Link class="navbar-brand" to="overview">Waldbrand-Vorhersage</Link>
            <div class="collapse navbar-collapse" id="navbarNav"> 
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <Link class="nav-link active" to="overview">Übersicht</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="settings">Einstellungen</Link> </li>
                </ul> 
            </div>
        </div>
    </nav>
</Router>

<style>
    
</style>