<script>
    import { selectedSorting } from "../stores"
</script>

<span>Sortierung:</span>
<div class="form-check">
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
