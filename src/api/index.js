import { Auth0Client } from '@auth0/auth0-spa-js'
import config from './config.js'
import queryString from 'query-string'

const auth0 = new Auth0Client(config);

const callback = () => {
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
};

if (
    document.readyState === 'complete' || // DOMContentLoaded + Images/Styles/etc loaded, so we call directly.
    document.readyState === 'interactive' // DOMContentLoaded fires at this point, so we call directly.
) {
    callback();
}

// DOMContentLoaded has not fired yet, delay callback until then.
document.addEventListener( 'DOMContentLoaded', callback );

export default auth0;
