import { Component } from 'substance';
import { UIButton } from 'writer';
import SearchWrapper from './components/searchWrapper';
import authService from './api/auth';
import * as styles from './OovvuuNavigaPluginComponent.scss';

class OovvuuNavigaPluginComponent extends Component {

    /**
     * Constructor
     * @param args
     */
    constructor(...args) {
        super(...args)
    }

    /**
     * Return the inital component state before rendering
     *
     * @returns {object} Component state.
     */
    getInitialState() {
        return {
            authenticated: null,
            authenticationError: null,
        }
    }

    /**
     * Do something after the first render
     */
    didMount() {
        // Check if the user is authenticated.
        this.handleSetAuthState(authService.isAuthenticated());
    }

    /**
     * Handles the set auth state based on the resolution of a Promise.
     *
     * @param {Promise} promise Auth promise.
     * @param {Boolean} showError Whether or not to show auth errors.
     */
    handleSetAuthState( promise, showError = false ) {
        // Clear the auth state.
        this.clearAuthState();
        this.clearAuthErrorState();

        // Handle promise resolution.
        promise
            .then(() => {
                this.setAuthState(true);
                this.setUser(authService.getUser());
            })
            .catch((error) => {
                if (showError) {
                    this.setAuthErrorState(error);
                }

                this.setAuthState(false);
            });
    }

    /**
     * Sets the user object.
     *
     * @param {Promise} promise Get user promise.
     */
    setUser( userPromise ) {
        this.clearUser();

        userPromise
            .then((user) => {
                this.extendState({
                    user: user
                })
            })
    }

    /**
     * Clears the user.
     */
    clearUser() {
        this.extendState({
            user: null
        })
    }

    /**
     * Sets the authentication state.
     *
     * @param {Boolean} authState True or false.
     */
    setAuthState( authState ) {
        this.extendState({
            authenticated: Boolean(authState)
        })
    }

    /**
     * Clears the authentication state.
     */
    clearAuthState() {
        this.extendState({
            authenticated: null
        })
    }

    /**
     * Sets the authentication error state.
     *
     * @param {object} error Error object.
     */
    setAuthErrorState( error ) {
        this.extendState({
            authenticationError: error
        })
    }

    /**
     * Clears the authentication error state.
     */
    clearAuthErrorState() {
        this.extendState({
            authenticationError: null
        })
    }

    /**
     * Get based components based on authentication.
     *
     * @param $$
     * @return Components.
     */
    getAuthComponents($$) {
        const components = [];
        const userAuth = $$('div').addClass(styles.userAuth);

        // Not authenticated.
        if ( false === this.state.authenticated ) {
            const LoginButton = $$(UIButton, {
                label: this.getLabel('Login'),
                type: 'default',
                onClick: async() => this.handleSetAuthState(authService.login(), true),
            });

            // Authentication error
            if ( null !== this.state.authenticationError ) {
                components.push($$('p').text(this.state.authenticationError));
                components.push($$('p').text('Please contact site admin for support.'));
            }

            return userAuth.append([LoginButton, ...components]);
        } else if ( true === this.state.authenticated ) {
            // Add user info if available.
            if ( this.state.user ) {
                components.push($$('p').append($$('em').text(`Currently logged in as ${this.state.user.email}`)));
            }

            const LogoutButton = $$(UIButton, {
                label: this.getLabel('Logout'),
                type: 'alert outlined',
                onClick: async () => {
                    authService.logout();
                },
            });

            return userAuth.append([...components, LogoutButton]);
        }

        return userAuth.append($$('p').text('Loading user...'));
    }

    /**
     * Render method is called whenever there's a change in state or props
     *
     * @param $$
     * @returns {*}
     */
    render($$) {
        const container = $$('div');
        const title = $$('h2').append(
            this.getLabel('Oovvuu Plugin')
        );

        // Add the title.
        container.append(title);

        // Add components.
        const components = this.getAuthComponents($$);

        if (components) {
            container.append(components);
        }

        if ( true === this.state.authenticated ) {
            container.append($$(SearchWrapper));
        }

        return container
    }
}

export {OovvuuNavigaPluginComponent}
