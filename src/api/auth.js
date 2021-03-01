import { Auth0Client } from '@auth0/auth0-spa-js'
import config from './config.js'
import queryString from 'query-string'
import domReady from '../utils/domReady.js'

const auth0 = new Auth0Client(config);

/**
 * Handle the authentication callback.
 */
domReady(() => {
    const queryParams = queryString.parse(window.location.search);

    if (
        undefined !== queryParams.action
        && 'oovvuu-auth' === queryParams.action
    ) {
        auth0.handleRedirectCallback().then(async () => {
            // Removes auth params.
            history.pushState({}, '', '/');
        });
    }
})

const authService = {
    login: auth0.loginWithRedirect(),
    logout: auth0.logout({
        returnTo: window.location.origin
    }),
    isAuthenticated: auth0.getTokenSilently(),
}

export default authService;
