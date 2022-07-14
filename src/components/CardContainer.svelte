<script>
    import Card from "./Card.svelte"
    import AccordionCardContainer from "./AccordionCardContainer.svelte"
    export let data;

    import { selectedGrouping, selectedSorting } from "../stores.js"
    let selectedGroupingCriterion;
	let selectedSortingCriterion;
	selectedGrouping.subscribe(value => selectedGroupingCriterion = value)
	selectedSorting.subscribe(value => selectedSortingCriterion = value)
    
    let allStates = [];
    let allPlacesData = []
    //allStates and allPlacesData must be assigned a value inside a function such as following, which has "data" as param, otherwise not updated
    const getAllPlacesData = (data) => {
        allStates = Object.keys(data); 
        for(const state in data){
            // for(const place of data[state]){
            //     allPlacesData = [...allPlacesData, {placeName: Object.keys(place)[0], state: state, index: Object.values(place)[0]}] //Don't use only allPlacesData.push() because in Svelte, DOM only updates on variable assignments
            // }
            allPlacesData = allPlacesData.concat(data[state])
        }
    }
    $: data && getAllPlacesData(data) // If data is successfully fetched, getAllPlacesData will be executed. 
</script>

{#if selectedGroupingCriterion === "place"}
<div class="d-flex flex-row flex-wrap justify-content-center align-items-center card-container">
    {#each allPlacesData as place, i}
    <!-- <p>{JSON.stringify(data, null, 2)}</p> --> 
    <!-- <Card id={i} placeName={place.placeName} index={place.index}/> -->
    <Card id={i} placeName={Object.keys(place)[0]} index={Object.values(place)[0]}/>
    {/each}
</div>
{:else}
{#each allStates as state, i}
<AccordionCardContainer {data} {state} {i}/>
{/each}
{/if}

<style>
/* #card-container {
   
} */
</style>
