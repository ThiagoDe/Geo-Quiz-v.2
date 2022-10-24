import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    roundComplete: false
}

const roundCompleteSlice = createSlice({
    name: 'rounder',
    initialState,
    reducers: {
        gameFinish: (state) => {
            state.roundComplete = true 
        },
        resetGame: (state) => {
            state.roundComplete = false 
        }
    }
})

export const { gameFinish, resetGame } = roundCompleteSlice.actions

export default roundCompleteSlice.reducer