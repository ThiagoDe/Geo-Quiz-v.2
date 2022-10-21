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
            // keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedTurns = responseData.map(turn => {
                    turn.id = turn._id
                    return turn
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
        addNewTurn: builder.mutation({
            query: initialTurn => ({
                url: '/turns',
                method: 'POST',
                body: {
                    ...initialTurn,
                }
            }),
            invalidatesTags: [
                { type: 'Turn', id: "LIST" }
            ]
        }),
        updateTurn: builder.mutation({
            query: initialTurn => ({
                url: '/turns',
                method: 'PATCH',
                body: {
                    ...initialTurn,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Turn', id: arg.id }
            ]
        }),
        deleteTurn: builder.mutation({
            query: ({ id }) => ({
                url: `/turns`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Turn', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetTurnsQuery,
    useAddNewTurnMutation,
    useUpdateTurnMutation,
    useDeleteTurnMutation,
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