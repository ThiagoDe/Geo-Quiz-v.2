import { memo } from 'react'

const BestScore = ({allUserRounds}) => {

    let best = [0,0]
    // console.log(allUserRounds)
    if (allUserRounds.length > 0){

        allUserRounds.forEach((round) => {
            let {score, missed} = round
            const created = new Date(round.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'short' })
           
            let diff = (score - missed)
            if (diff > best[best.length -1]){
                best = [created, score, missed, diff]
            }
        })
        return (
            <div className="listPrevRounds">
                <div className="header_prevRounds" >
                    <p style={{ color: "#FFD700"}}>YOUR BEST SCORE</p>
                </div>
                <div className="list_score_rows">
                <div className="list_row-name" >
                    <p>{best[0]}</p>
                </div>
                <div className="list_row-score">
                    <div className="list_row-counter" style={{color:'rgb(0, 131, 28)', fontWeight: 'bolder'}}>
                        {<p>{best[1]}</p>}
                    </div>
                </div>
                <div className="list_row-score">
                    <div className="list_row-counter" style={{color:'red'}}>
                        {<p>{best[2]}</p>}
                    </div>
                </div>
            </div>
            
            </div>
        );

    } else return null
}

const memoizedBestScore = memo(BestScore)
export default memoizedBestScore