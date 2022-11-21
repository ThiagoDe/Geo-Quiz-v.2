import { useGetRoundsQuery } from '../features/rounds/roundsApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"

import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const BarChart = ({username}) => {
    
    const options = {
      responsive: false,
      maintainAspectRatio: false, 
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: "'Courier Prime', monospace"
          }
        },
        title: {
          display: true,
          // text: "LAST 20 GAMES", 
          // font: "Courier"
          
        }
      }
    }

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

        const labels = []
        const scored = []
        const missed = []
        let data2 = {
          labels,
          datasets: [
            {
            label: "Scored",
            data: scored,
            backgroundColor: 'rgb(0, 131, 28)'
            },
            {
              label: "Missed",
              data: missed,
              backgroundColor: 'red'
            }
          ]
        }
        const userRounds = ids?.length && filteredIds.map(roundId => entities[roundId])
        userRounds.slice(-21, -1).forEach((r, i) => {
          if (i === 19){
            labels.push('Last')
          } else {
            labels.push('#' + (i+1))
          }
          
          scored.push(r.score)
          missed.push(r.missed)
        })
        

        content = (
            <div className='dash-nivo' >
              <div className='canvas'>
                <p style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bolder', position: 'relative', top: '36px' }}>LAST 20 GAMES</p>
                <Bar options={options} data={data2} width={1065} height='200px' style={{font: 'Courier Prime'}}/>
              </div>
            </div>
           
    )
    return content

  }
}
export default BarChart
