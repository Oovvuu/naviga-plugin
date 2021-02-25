import { Auth0Client } from '@auth0/auth0-spa-js'
import config from './config.js'
import queryString from 'query-string'
import domReady from '../utils/domReady.js'

// @TODO: Determine if this is commpliant with security standards.
config.cacheLocation = 'localstorage';

const auth0 = new Auth0Client(config);

domReady(() => {
    const queryParams = queryString.parse(window.location.search);

    // Auth callback.
    if (
        undefined !== queryParams.action
    && 'oovvuu-auth' === queryParams.action
    ) {
        auth0.handleRedirectCallback().then(async () => {
            history.pushState({}, '', '/');
        });
    }
});

export default auth0;
