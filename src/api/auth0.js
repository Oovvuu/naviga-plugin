import { Auth0Client } from '@auth0/auth0-spa-js'
import config from './config.js'
import queryString from 'query-string'
import domReady from '../utils/domReady.js'

// @TODO: Determine if this is compliant with security standards.
config.cacheLocation = 'localstorage';

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
});

export default auth0;
