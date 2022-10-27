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
            state.gameOn = false  
        },
        roundFinish: (state) => {
            state.roundComplete = true 
        },
        resetGame: (state) => {
            state.roundComplete = false 
            // state.gameOn = false 
        }
    }
})

export const { gameFinish, resetGame, startGame, roundFinish } = roundCompleteSlice.actions

export default roundCompleteSlice.reducer