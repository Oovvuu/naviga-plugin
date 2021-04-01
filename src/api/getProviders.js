import request from './graphql';

/**
 * Gets all available providers.
 *
 * @return {Promise} The API request.
 */
const getProviders = () => {
  const query = `
    query GetProviders {
        organisationSet(input: {filter: {isProvider: true}, limit: 100}){
          pageResults {
              id
              name
              __typename
          }
        __typename
      }
    }
    `;

  return request(query, {});
};

export default getProviders;
