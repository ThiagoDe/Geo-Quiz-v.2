import { store } from '../../app/store'
import { roundsApiSlice } from '../rounds/roundsApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    
    useEffect(() => {
        // console.log('subscribing')
        // const rounds = store.dispatch(roundsApiSlice.endpoints.getRounds.initiate())
        // const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

        store.dispatch(roundsApiSlice.util.prefetch('getRounds', 'roundsList', { force: true }))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))

    }, [])

    return <Outlet />
}
export default Prefetch