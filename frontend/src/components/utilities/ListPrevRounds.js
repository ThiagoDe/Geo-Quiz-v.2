import React from "react";
import './listPrevRounds.css'
import { useGetRoundsQuery } from "../../features/rounds/roundsApiSlice";
import { useEffect } from "react";
import PulseLoader from 'react-spinners/PulseLoader'

const ListPrevRounds = ({score, missed}) => {
    
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
        const { entities } = rounds
        
        // if (entities){
        //     const roundsIn = Object.values(entities)
        //     roundsIn.map(e => console.log(e))
        //     } 
        
        
        content = (
            <div className="listPrevRounds">
            {/* <div className="header">
                <p>LISTPREVROUNDS</p>
            </div> */}
            <div className="list_score_rows">
                <div className="list_row-name" >
                    <p>OCT 28</p>
                </div>
                <div className="list_row-score">
                    <div className="list_row-counter" style={{color:'rgb(0, 131, 28)'}}>
                        {<p>{3}</p>}
                    </div>
                </div>
                <div className="list_row-score">
                    <div className="list_row-counter" style={{color:'red'}}>
                        {<p>{2}</p>}
                    </div>
                </div>
            </div>
            
        </div>
        );

        
    }
    return content
    
}

export default ListPrevRounds