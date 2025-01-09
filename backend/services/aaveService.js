// Construct the endpoint URL using environment variables
const baseUrl = 'https://gateway.thegraph.com/api';
const subgraphId = 'Cd2gEDVeqnjBn1hSeqFMitw8Q1iiyV9FYUZkLNRcL87g';
const endpoint = `${baseUrl}/${process.env.GRAPHQL_API_KEY}/subgraphs/id/${subgraphId}`;

const getUserTransactions = async (user) => {
  const { request, gql } = await import('graphql-request');

  const query = gql`
    query GetUserTransactions($userAddress: String!) {
      sentTransfers: transfers(
        where: { from: $userAddress }
        orderBy: timestamp
        orderDirection: desc
        first: 100
      ) {
        id
        timestamp
        hash
        from
        to
        value
        asset {
          symbol
          decimals
          priceInUSD
        }
      }
      receivedTransfers: transfers(
        where: { to: $userAddress }
        orderBy: timestamp
        orderDirection: desc
        first: 100
      ) {
        id
        timestamp
        hash
        from
        to
        value
        asset {
          symbol
          decimals
          priceInUSD
        }
      }
    }
  `;

  try {
    const data = await request(endpoint, query, { 
      userAddress: user.toLowerCase() 
    });
    
    if (!data || (!data.sentTransfers && !data.receivedTransfers)) {
      console.log('No transactions found.');
      return [];
    }

    // Combine and transform sent and received transfers
    const sentTransactions = (data.sentTransfers || []).map(transfer => ({
      id: transfer.id,
      timestamp: parseInt(transfer.timestamp),
      txHash: transfer.hash,
      action: 'SEND',
      amount: parseFloat(transfer.value),
      assetPriceUSD: parseFloat(transfer.asset.priceInUSD || '0'),
      reserve: {
        symbol: transfer.asset.symbol,
        decimals: parseInt(transfer.asset.decimals)
      }
    }));

    const receivedTransactions = (data.receivedTransfers || []).map(transfer => ({
      id: transfer.id,
      timestamp: parseInt(transfer.timestamp),
      txHash: transfer.hash,
      action: 'RECEIVE',
      amount: parseFloat(transfer.value),
      assetPriceUSD: parseFloat(transfer.asset.priceInUSD || '0'),
      reserve: {
        symbol: transfer.asset.symbol,
        decimals: parseInt(transfer.asset.decimals)
      }
    }));

    // Combine all transactions and sort by timestamp
    const transactions = [...sentTransactions, ...receivedTransactions];
    return transactions.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('GraphQL Error:', error);
    throw error;
  }
};

module.exports = { getUserTransactions };
