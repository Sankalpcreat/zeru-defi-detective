const endpoint = `https://gateway.thegraph.com/api/${process.env.GRAPHQL_API_KEY}/subgraphs/id/Cd2gEDVeqnjBn1hSeqFMitw8Q1iiyV9FYUZkLNRcL87g`;

const getUserTransactions = async (user) => {
  // Dynamically import `graphql-request`
  const { request, gql } = await import('graphql-request');

  const query = gql`
    query UserTransactions($user: String!) {
      userTransactions(
        where: { user: $user }
        orderBy: timestamp
        orderDirection: desc
        first: 100
      ) {
        id
        timestamp
        txHash
        action
        amount
        assetPriceUSD
        reserve {
          symbol
          decimals
        }
      }
    }
  `;

  const variables = { user };

  try {
    const data = await request(endpoint, query, variables);
    return data.userTransactions;
  } catch (error) {
    throw new Error('Error fetching data from Aave API');
  }
};

module.exports = { getUserTransactions };
