<script>
    import Card from "./Card.svelte"
    import AccordionCardContainer from "./AccordionCardContainer.svelte"
    export let data;

    import { selectedGrouping, selectedSorting } from "../stores.js"
    let selectedGroupingCriterion;
	let selectedSortingCriterion;
	selectedGrouping.subscribe(value => selectedGroupingCriterion = value)
	selectedSorting.subscribe(value => selectedSortingCriterion = value)
        
    //allStates, allPlacesData, sortedDataGroupedByState must be assigned a value inside a function such as following, which has "data" as param, otherwise not updated
    let allStates = [];
    const getAllStates = (data) => {
        allStates = Object.keys(data); 
    }

    let allPlacesData = [];
    const getAllPlacesData = (data) => {
        for(const state in data){
            // for(const place of data[state]){
            //     allPlacesData = [...allPlacesData, {placeName: Object.keys(place)[0], state: state, index: Object.values(place)[0]}] //Don't use only allPlacesData.push() because in Svelte, DOM only updates on variable assignments
            // }
            allPlacesData = allPlacesData.concat(data[state])
        }
        allPlacesData = sortCards(allPlacesData);
    }
    
    const sortDataGroupedByState = (data) => {
        for(const state in data){
            data[state] = sortCards(data[state]);
        }
    }
    
    function sortCards(data) {
        let sortedArr = [];
        if (selectedSortingCriterion === 'name') {
            sortedArr = data.sort((a, b) => {
                let nameA = Object.keys(a)[0];
                let nameB = Object.keys(b)[0];
                return nameA > nameB ? 1 : -1;
            })
        }
        if (selectedSortingCriterion === 'index') {
            sortedArr = data.sort((a, b) => {
                let indexA = Object.values(a)[0]; 
                let indexB = Object.values(b)[0]; 
                return indexA > indexB ? -1 : 1;
            })
        }
        return sortedArr;
    }

    // If data is successfully fetched, these functions will be executed. 
    $: data && getAllStates(data) 
    $: data && getAllPlacesData(data) 
    $: data && sortDataGroupedByState(data) 
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
