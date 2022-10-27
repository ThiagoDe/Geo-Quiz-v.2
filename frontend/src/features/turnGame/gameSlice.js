import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    roundComplete: false,
    gameOn: false
}

const roundCompleteSlice = createSlice({
    name: 'rounder',
    initialState,
    reducers: {
        startGame: (state) => {
            state.gameOn = true
        },
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