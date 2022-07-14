<script>
    import Card from "./Card.svelte"
    export let data;
    
    let allPlacesData = []
    const getAllPlacesData = (data) => {
        for(const state in data){
            for(const place of data[state]){
                allPlacesData = [...allPlacesData, {placeName: Object.keys(place)[0], state: state, index: Object.values(place)[0]}] //Don't use only allPlacesData.push() because in Svelte, DOM only updates on variable assignments
            }
        }
    }
    $: data && getAllPlacesData(data) // If data is successfully fetched (!undefined), getAllPlacesData will be executed. 
</script>

<div class="d-flex flex-row flex-wrap justify-content-center align-items-center" id="card-container">
    {#each allPlacesData as place, i}
    <!-- <p>{JSON.stringify(data, null, 2)}</p> --> 
    <Card id={i} placeName={place.placeName} state={place.state} index={place.index}/>
    {/each}
</div>

<style>
/* #card-container {
   
} */
</style>
