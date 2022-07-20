<script>
    import { selectedGrouping } from "../stores.js"
</script>

<div class="d-flex flex-row flex-wrap justify-content-start align-items-center my-4">
  <span class="mx-2">Groupierung:</span>
  <div class="form-check mx-3">
      <input class="form-check-input" type="radio" id="group-place-radio" value="place" bind:group={$selectedGrouping} checked>
      <label class="form-check-label" for="group-place-radio">
        Ort
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" id="group-state-radio" value="state" bind:group={$selectedGrouping}>
      <label class="form-check-label" for="group-state-radio">
        Bundesland
      </label>
    </div>
</div>