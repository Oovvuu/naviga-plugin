import { GraphQLClient, gql } from 'graphql-request'
import authService from './auth.js'

const request = async (query, variables) => {
    const endpoint = 'https://api.oovvuu.media/v1/graphql/'

    // Get the access token.
    const token = await authService.isAuthenticated();

    // Check that access token is valid.
    if (!token) {
        return new Promise((resolve, reject) => {
            reject('Unable to get access token');
        })
    }

    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    return graphQLClient.request(gql`${query}`, variables)
}

export default request;