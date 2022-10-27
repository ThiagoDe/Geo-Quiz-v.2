import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const roundsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = roundsAdapter.getInitialState()

export const roundsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRounds: builder.query({
            query: () => '/rounds',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedRounds = responseData.map(round => {
                    round.id = round._id
                    return round
                });
                return roundsAdapter.setAll(initialState, loadedRounds)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Round', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Round', id }))
                    ]
                } else return [{ type: 'Round', id: 'LIST' }]
            }
        }),
        addNewRound: builder.mutation({
            query: initialRound => ({
                url: '/rounds',
                method: 'POST',
                body: {
                    ...initialRound,
                }
            }),
            invalidatesTags: [
                { type: 'Round', id: "LIST" }
            ]
        }),
        updateRound: builder.mutation({
            query: initialRound => ({
                url: '/rounds',
                method: 'PATCH',
                body: {
                    ...initialRound,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Round', id: arg.id }
            ]
        }),
        deleteRound: builder.mutation({
            query: ({ id }) => ({
                url: `/rounds`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Round', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetRoundsQuery,
    useAddNewRoundMutation,
    useUpdateRoundMutation,
    useDeleteRoundMutation,
} = roundsApiSlice

// returns the query result object
export const selectRoundsResult = roundsApiSlice.endpoints.getRounds.select()

// creates memoized selector
const selectRoundsData = createSelector(
    selectRoundsResult,
    roundsResult => roundsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllrounds,
    selectById: selectRoundById,
    selectIds: selectRoundIds
    // Pass in a selector that returns the rounds slice of state
} = roundsAdapter.getSelectors(state => selectRoundsData(state) ?? initialState)