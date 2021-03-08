import request from './graphql.js'

/**
 * Create an embed based on a single Video ID.
 *
 * @param  {string} videoId Video ID.
 * @return {Promise} The API request.
 */
const createEmbed = (videoId) => {
    const query = `
    mutation CreateEmbed($input: CreateVideoEmbedInput!) {
      createVideoEmbed(input: $input) {
        id
        frameUrl
        playerScriptUrl
        snippet
      }
    }
    `;

    const variables = {
        "input": {
            "videoIds": [
                videoId
            ]
        }
    };

    return request(query, variables);
}

export default createEmbed;
