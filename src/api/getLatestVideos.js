import request from './graphql.js'

const getLatestVideos = (keywords) => {
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
      activeSince
      providerAssetId
    }
    `

    const variables = {
        "input": {
            "limit": 25,
            "sort": {
                "sort": "id",
                "ascending": false
            },
            "filter": {
                "keywordMatch": keywords,
                "status": [
                    "Active"
                ]
            }
        },
        "playbackInput": {
            "domain": window.location.origin
        }
    }

    return request(query, variables);
}

export default getLatestVideos;
