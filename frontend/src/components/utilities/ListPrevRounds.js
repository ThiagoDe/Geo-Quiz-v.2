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

    if (isLoading) content = <PulseLoader color={"#FFF"} />

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
                {/* <div className="list_score_rows">
                    <div className="list_row-name" >
                        <p>Date</p>
                    </div>
                <div className="list_row-score">
                    <div className="list_row-counter" style={{color:'rgb(0, 131, 28)'}}>
                        {<p>Correct</p>}
                    </div>
                </div>
                <div className="list_row-score">
                    <div className="list_row-counter" style={{color:'red'}}>
                        {<p>Missed</p>}
                    </div>
                </div>
                </div> */}
                <div>
                    {userRounds.slice(-11, -1)}
                </div>
            
            </div>
        );

        
    }
    return content
    
}

export default ListPrevRounds