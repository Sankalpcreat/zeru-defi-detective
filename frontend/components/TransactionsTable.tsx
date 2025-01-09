interface Transaction {
    id: string;
    timestamp: number;
    txHash: string;
    action: string;
    amount: number;
    assetPriceUSD: number;
    reserve: {
      symbol: string;
    };
  }
  
  interface TransactionsTableProps {
    transactions: Transaction[];
  }
  
  export default function TransactionsTable({ transactions }: TransactionsTableProps) {
    const getActionColor = (action: string) => {
      switch (action.toLowerCase()) {
        case 'supply':
          return 'bg-green-100 text-green-800';
        case 'borrow':
          return 'bg-blue-100 text-blue-800';
        case 'repay':
          return 'bg-purple-100 text-purple-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };
  
    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto rounded-xl shadow-md border border-gray-100">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tx Hash</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (USD)</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-500">
                    {tx.txHash.slice(0, 10)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getActionColor(tx.action)}`}>
                      {tx.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {tx.amount.toFixed(4)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {tx.reserve.symbol}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    ${tx.assetPriceUSD.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(tx.timestamp * 1000).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  