import { Auth0Client } from '@auth0/auth0-spa-js'
import config from './config.js'

const authClient = new Auth0Client(config);

export default authClient;
