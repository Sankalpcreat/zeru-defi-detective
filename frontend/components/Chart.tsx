import { ResponsiveLine } from "@nivo/line";

interface ChartProps {
  transactions: {
    timestamp: number;
    amount: number;
    assetPriceUSD: number;
  }[];
}

export default function Chart({ transactions }: ChartProps) {
  const data = [
    {
      id: "Transaction Volume",
      data: transactions.map((tx) => ({
        x: new Date(tx.timestamp * 1000).toLocaleDateString(),
        y: tx.amount * tx.assetPriceUSD,
      })),
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Transaction Volume Over Time</h2>
      <div className="h-[400px] bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <ResponsiveLine
          data={data}
          margin={{ top: 40, right: 50, bottom: 60, left: 80 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", stacked: true, min: 'auto', max: 'auto' }}
          curve="monotoneX"
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: "Date",
            legendOffset: 45,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Volume (USD)",
            legendOffset: -60,
            legendPosition: "middle",
          }}
          pointSize={8}
          pointColor="#ffffff"
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          enableGridX={false}
          enableArea={true}
          areaOpacity={0.1}
          theme={{
            axis: {
              ticks: {
                text: {
                  fontSize: 12,
                },
              },
              legend: {
                text: {
                  fontSize: 13,
                  fontWeight: 'bold',
                },
              },
            },
            grid: {
              line: {
                stroke: "#e5e7eb",
                strokeWidth: 1,
              },
            },
          }}
          colors={["#3b82f6"]}
        />
      </div>
    </div>
  );
}
