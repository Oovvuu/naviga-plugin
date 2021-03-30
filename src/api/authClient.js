import { Auth0Client } from '@auth0/auth0-spa-js'
import { api } from 'writer';

const authClient = new Auth0Client(
    {
        ...api.getConfigValue('en.infomaker.oovvuu').data,
        scope: 'offline_access openid',
        prompt: 'login',
        useRefreshTokens: true,
    }
);

export default authClient;
