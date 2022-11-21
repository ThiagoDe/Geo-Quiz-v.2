import { ResponsivePie } from '@nivo/pie'
import { useGetRoundsQuery } from "../../../features/rounds/roundsApiSlice"
import PulseLoader from 'react-spinners/PulseLoader'


const MissedPie = ({username}) => {

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
    
        let hashStates = {}

        allUserRounds.forEach((r) => {
            let { statesMissed } = r
            statesMissed.forEach((state) => {
                // console.log(state, 'r')
                if (state !== null){
                    if ( state in hashStates) {
                        hashStates[state] += 1
                    } else {
                        hashStates[state] = 1
                    }
                }
            })
        }) 

        const data = []

        for (const [key, value] of Object.entries(hashStates)) {
            let obj = {
                "id": key,
                "label": key,
                "value": value
            }
            data.push(obj)
        }


    content = ( <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        style={{ fontFamily: 'Courier Prime' }}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'reds'  }}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLinkLabelsFontFamily={{ fontFamily: 'Courier Prime'}}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
  
    />)
    }
    
    return content
}

export default MissedPie