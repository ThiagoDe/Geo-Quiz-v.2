import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const turnsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = turnsAdapter.getInitialState()

export const turnsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTurns: builder.query({
            query: () => '/turns',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedTurns = responseData.map(note => {
                    note.id = note._id
                    return note
                });
                return turnsAdapter.setAll(initialState, loadedTurns)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Turn', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Turn', id }))
                    ]
                } else return [{ type: 'Turn', id: 'LIST' }]
            }
        }),
    }),
})

export const {
    useGetTurnsQuery,
} = turnsApiSlice

// returns the query result object
export const selectTurnsResult = turnsApiSlice.endpoints.getTurns.select()

// creates memoized selector
const selectTurnsData = createSelector(
    selectTurnsResult,
    turnsResult => turnsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllturns,
    selectById: selectTurnById,
    selectIds: selectTurnIds
    // Pass in a selector that returns the turns slice of state
} = turnsAdapter.getSelectors(state => selectTurnsData(state) ?? initialState)