import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { AppThunk } from "../../app/store"
import { fetchJoke } from "./characterApi"

export interface CharacterState {
  stamina: number
  money: number
  hunger: number
  joke: string
  status: "idle" | "loading" | "failed"
}

const initialState: CharacterState = {
  stamina: 50,
  money: 50,
  hunger: 50,
  joke: '',
  status: "idle",
}

export const characterSlice = createAppSlice({
  name: "character",
  initialState,
  reducers: create => ({
    sleep: create.reducer(state => {
      state.stamina = 100;
      state.hunger = state.hunger - 20;
    }),
    eat: create.reducer(state => {
      state.money = state.money - 20;
      state.hunger = state.hunger + 40;
    }),
    work: create.reducer(state => {
      state.money = state.money + 30;
      state.hunger = state.hunger - 20;
      state.stamina = state.stamina - 20;
    }),
    fetchJokeAsync: create.asyncThunk(
      async () => {
        const response = await fetchJoke()
        // The value we return becomes the `fulfilled` action payload
        return response.joke
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action: PayloadAction<string>) => {
          state.status = "idle"
          state.joke = action.payload
          state.stamina = state.stamina + 10;
          state.money = state.money - 50;
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectStamina: character => character.stamina,
    selectHunger: character => character.hunger,
    selectMoney: character => character.money,
    selectCharacter: character => character,
  },
})

// Action creators are generated for each case reducer function.
export const { eat, sleep, work, fetchJokeAsync } = characterSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectStamina, selectHunger, selectMoney, selectCharacter } = characterSlice.selectors;