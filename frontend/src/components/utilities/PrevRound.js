import { useGetRoundsQuery } from '../../features/rounds/roundsApiSlice'
import { memo } from 'react'

const PrevRound = ({roundId, num}) => {

    const { round } = useGetRoundsQuery("roundsList", {
            selectFromResult: ({ data }) => ({
                round: data?.entities[roundId]
            }),
        })

    const nums = ['Last', '#2', '#3', '#4', '#5', '#6', '#7', '#8', '#9', '#10']

    if (round) {
        // const created = new Date(round.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'short' })
        const { score, missed } = round
        return (
            <div className="listPrevRounds">
           
            <div className="list_score_rows">
                <div className="list_row-name" >
                    <p>{nums[num]}</p>
                </div>
                <div className="list_row-score">
                    <div className="list_row-counter" style={{color:'rgb(0, 131, 28)', fontWeight: 'bolder'}}>
                        {<p>{score}</p>}
                    </div>
                </div>
                <div className="list_row-score">
                    <div className="list_row-counter" style={{color:'red'}}>
                        {<p>{missed}</p>}
                    </div>
                </div>
            </div>
            
        </div>
        );

    } else return null
}

const memoizedPrevRound = memo(PrevRound)
export default memoizedPrevRound