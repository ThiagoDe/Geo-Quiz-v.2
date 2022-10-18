import { useGetTurnsQuery } from "./turnsApiSlice"
import Turn from "./Turn"

const TurnsList = () => {
    const {
        data: turns,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTurnsQuery()

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = turns
        console.log(turns, 'turns from TurnsList.js')

        const tableContent = ids?.length
            ? ids.map(turnId => <Turn key={turnId} turnId={turnId} />)
            : null

        content = (
            // <div className="dashboard-container">
                <table className="table4 table--users">
                    <thead className="table__thead">
                        <tr>
                            <th scope="col" className="table__th">Username</th>
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
export default TurnsList