<script>
    import Card from "./Card.svelte"
    export let data, state, i;
</script>

<div class="accordion" id="accordian-card-container">
    <div class="accordion-item m-2" id={"state-"+i}>
      <h2 class="accordion-header" id={"heading-"+i}>
        {#if i === 0}
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse-"+i} aria-expanded="true" aria-controls={"collapse-"+i}>
            <h4>{state}</h4>
        </button>
        {:else}
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse-"+i} aria-expanded="false" aria-controls={"collapse-"+i}>
            <h4>{state}</h4>
        </button>
        {/if}
      </h2>
      <div id={"collapse-"+i} class="accordion-collapse collapse show" aria-labelledby={"heading-"+i} data-bs-parent="#accordian-card-container">
        <div class="accordion-body">
            <div class="d-flex flex-row flex-wrap justify-content-center align-items-center card-container">
                {#each data[state] as place, i}
                <Card id={i} placeName={Object.keys(place)[0]} index={Object.values(place)[0]}/>
                {/each}
            </div>
        </div>
      </div>
    </div>
</div>
<style>
  .accordion-button:not(.collapsed) {
    color: #000;
    background-color: #fafad2;
  }
</style>