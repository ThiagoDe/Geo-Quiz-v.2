import React from "react";
import './listPrevRounds.css'
import { useGetRoundsQuery } from "../../features/rounds/roundsApiSlice";
import { useEffect } from "react";
import PulseLoader from 'react-spinners/PulseLoader'
import PrevRound from "./PrevRound";

const ListPrevRounds = ({username}) => {
    
    const {
        data: rounds,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetRoundsQuery(undefined, {
        pollingInterval: 30000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color='green' />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

     if (isSuccess) {
        const { ids, entities } = rounds
        
        let filteredIds = ids.filter(roundId => entities[roundId].username === username)
        
        const userRounds = ids?.length && filteredIds.map(roundId => <PrevRound key={roundId} roundId={roundId} />)
        // console.log(userRounds, 'userrounds')
        
        content = (
            <div className="listPrevRounds">
                <div className="header_prevRounds">
                    <p>Previous Games</p>
                </div>
              
                <div>
                    {userRounds.slice(-11, -1).reverse()}
                </div>
            
            </div>
        );

        
    }
    return content
    
}

export default ListPrevRounds