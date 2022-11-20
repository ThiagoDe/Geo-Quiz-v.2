import React from "react";
import './listPrevRounds.css'
import { useGetRoundsQuery } from "../../features/rounds/roundsApiSlice";
import { useEffect } from "react";
import PulseLoader from 'react-spinners/PulseLoader'
import PrevRound from "./PrevRound";
import BestScore from "./BestSore"

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
        let allUserRounds = filteredIds.map((roundId) => entities[roundId] )
        
        const bestScore = <BestScore allUserRounds={allUserRounds}/>
        
        const userRounds = ids?.length && filteredIds.slice(-11, -1).reverse().map((roundId, i )=> <PrevRound key={roundId} roundId={roundId} num={i}/>)
        // console.log(userRounds, 'userrounds')
        
        content = (
            <div className="listPrevRounds">
                <div className="header_prevRounds">
                    <p>PREVIOUS GAMES</p>
                </div>
              
                <div>
                    {userRounds}
                </div>
                <div>
                    {bestScore}
                </div>
            </div>
        );

        
    }
    return content
    
}

export default ListPrevRounds