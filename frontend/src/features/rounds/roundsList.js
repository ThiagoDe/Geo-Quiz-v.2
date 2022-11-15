import { useGetRoundsQuery } from "./roundsApiSlice"
import Round from "./Round"
import useAuth from "../../hooks/useAuth"
import PulseLoader from 'react-spinners/PulseLoader'

const RoundsList = () => {

    const { username, isManager, isAdmin } = useAuth()
    const {
        data: rounds,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetRoundsQuery('roundsList', {
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
        // console.log(rounds, 'rounds from RoundsList.js')

        let filteredIds
        if (isManager || isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(roundId => entities[roundId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(roundId => <Round key={roundId} roundId={roundId} />)

        content = (
            // <div className="dashboard-container">
                <table className="table4 table--users">
                    <thead className="table__thead">
                        <tr>
                            <th scope="col" className="table__th">Username</th>
                            <th scope="col" className="table__th">States Scored</th>
                            <th scope="col" className="table__th">States Missed</th>
                            <th scope="col" className="table__th">Score</th>
                            <th scope="col" className="table__th">Last Game</th>
                            <th scope="col" className="table__th">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            // </div>
        )
    }

    return content
}
export default RoundsList