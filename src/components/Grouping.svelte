<script>
    import { selectedGrouping } from "../stores"
</script>
<span>Groupierung:</span>
<div class="form-check">
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
