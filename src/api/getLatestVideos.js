import request from './graphql';

/**
 * Gets the latest videos.
 *
 * @param  {object} filters Video filters.
 * @return {Promise} The API request.
 */
const getLatestVideos = (filters) => {
  const query = `
    query ($input: VideoSetInput!, $playbackInput: PlaybackInput! ) {
      videoSet (input: $input) {
        totalCount
        pageResults {
          ...VideoDetailFragment
        }
        cursor
        hasMorePages
      }
    }
    fragment VideoDetailFragment on Video {
      id
      title
      description
      summary
      tags
      thumbnail(input: { width: 500, height: 281 }) {
        url
      }
      preview (input: $playbackInput) {
        brightcoveVideoId
        brightcovePlayerId
        brightcoveAccountId
      }
      collection {
        id
        provider {
          id
          name
          legalName
          logo(input: { width: 100, height: 100 }) {
            url
          }
        }
      }
      genres
      duration
      created
      modified
      activatedAt
      providerAssetId
    }
    `;

  const variables = {
    input: {
      limit: 25,
      sort: {
        sort: 'publishedAt',
        ascending: false,
      },
      filter: {
        ...filters,
        status: [
          'Active',
        ],
      },
    },
    playbackInput: {
      domain: window.location.origin,
    },
  };

  return request(query, variables);
};

export default getLatestVideos;
