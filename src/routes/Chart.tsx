import {useQuery} from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart  from "react-apexcharts";


interface ChartProps {
  coinId : string
}

interface IHistory {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}



export const Chart = ( {coinId}:ChartProps ) => {

  const { isLoading, data } = useQuery<IHistory[]>(['ohlcv',coinId], () => fetchCoinHistory(coinId));

  return (
   <div>
    { isLoading ? "Loading chart..." : 
      <ApexChart 
        type="candlestick"
        series={[{
          data: data?.map( (price) => {
            return {
              x: new Date(price.time_open),
              y: [price.open, price.close, price.low, price.high],
            }
          }) ?? [] 
        }]}

        options={{
          theme:{
            mode:"dark"
          },
          grid:{
            show:false
          },
          chart: {
            type:"candlestick",
            height:500,
            width:500,
            toolbar:{
              show: false
            },
            background: "transparent",
          },
          yaxis:{
            tooltip: {
              enabled: true,
            }
          },
          xaxis: {
            type: 'datetime',
          },
         
          tooltip: {
            y: {
              formatter: (value) => `$${value.toFixed(2)}`,
            }
          }
        }}

      ></ApexChart>
    }

   </div>
  )
}
