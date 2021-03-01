import authClient from './authClient.js'
import queryString from 'query-string'
import domReady from '../utils/domReady.js'

const authService = {
    login: async () => {
        await authClient.loginWithRedirect()
    },
    logout: async () => {
        authClient.logout({
            returnTo: window.location.origin
        })
    },
    handleAuthCallback: () => {
        domReady(() => {
            const queryParams = queryString.parse(window.location.search);

            if (
                undefined !== queryParams.action
              && 'oovvuu-auth' === queryParams.action
            ) {
                authClient.handleRedirectCallback().then(async () => {
                    // Removes auth params.
                    history.pushState({}, '', '/');
                });
            }
        })
    },
    isAuthenticated: () => {
        return authClient.getTokenSilently()
    },
}

export default authService;
