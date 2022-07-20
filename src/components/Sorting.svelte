<script>
    import { selectedSorting } from "../stores.js"
</script>

<div class="d-flex flex-row flex-wrap justify-content-start align-items-center">
  <span class="mx-2">Sortierung:</span>
  <div class="form-check mx-3">
      <input class="form-check-input" type="radio" id="sort-name-radio" value="name" bind:group={$selectedSorting} checked>
      <label class="form-check-label" for="sort-name-radio">
        Nach Name
      </label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="radio" id="sort-index-radio" value="index" bind:group={$selectedSorting}>
    <label class="form-check-label" for="sort-index-radio">
      Nach Index
    </label>
  </div>
</div>