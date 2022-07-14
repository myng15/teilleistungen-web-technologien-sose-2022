<script>
    export let placeName, state, index, id;
</script>

{#if index === 1}
<div class="card index1 m-2" style="width: 13rem; height: 12rem;" id={id}>
    <div class="card-body">
    <h5 class="card-title">{placeName}</h5>
    <p class="mb-0">Es besteht sehr geringe Gefahr eines Waldbrandes.</p>
    </div>
</div>
{/if}
{#if index === 2}
<div class="card index2 m-2" style="width: 13rem; height: 12rem;" id={id}>
    <div class="card-body">
        <h5 class="card-title">{placeName}</h5>
        <p class="mb-0">Es besteht geringe Gefahr eines Waldbrandes.</p>
    </div>
</div>
{/if}
{#if index === 3}
<div class="card index3 m-2" style="width: 13rem; height: 12rem;" id={id}>
    <div class="card-body">
        <h5 class="card-title">{placeName}</h5>
        <p class="mb-0">Es besteht mittlere Gefahr eines Waldbrandes.</p>
    </div>
</div>
{/if}
{#if index === 4}
<div class="card index4 m-2" style="width: 13rem; height: 12rem;" id={id}>
    <div class="card-body">
        <h5 class="card-title">{placeName}</h5>
        <p class="mb-0">Es besteht hohe Gefahr eines Waldbrandes.</p>
    </div>
</div>
{/if}
{#if index === 5}
<div class="card index5 m-2" style="width: 13rem; height: 12rem;" id={id}>
    <div class="card-body">
        <h5 class="card-title">{placeName}</h5>
        <p class="mb-0">Es besteht sehr hohe Gefahr eines Waldbrandes.</p>
    </div>
</div>
{/if}


<style>
.index1 {
    background: #99f296;
}
.index2 {
    background: #d5e4e6;
}
.index3 {
    background: #fad4bd;
}
.index4 {
    background: #ffb9cc;
}
.index5 {
    background: #ff7561;
}
</style>
