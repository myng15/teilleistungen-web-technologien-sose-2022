import { writable } from "svelte/store";

export const selectedGrouping = writable("place");
export const selectedSorting = writable("name");

