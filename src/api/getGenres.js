import request from './graphql';

/**
 * Gets all available genres.
 *
 * @return {Promise} The API request.
 */
const getGenres = () => {
  const query = `
    query GetGenres {
      __type(name: "Genre") {
        name
        enumValues {
          name
          __typename
        }
        __typename
      }
    }
    `;

  return request(query, {});
};

export default getGenres;
