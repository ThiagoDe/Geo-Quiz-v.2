import { useGetRoundsQuery } from "./roundsApiSlice"
import Round from "./Round"

const RoundsList = () => {
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

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = rounds
        console.log(rounds, 'rounds from RoundsList.js')

        const tableContent = ids?.length
            ? ids.map(roundId => <Round key={roundId} roundId={roundId} />)
            : null

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