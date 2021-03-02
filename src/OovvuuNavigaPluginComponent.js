import {Component} from 'substance'
import {UIButton} from 'writer'
import authService from './api/auth.js'

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
     * @returns {{clickCount: number}}
     */
    getInitialState() {
        return {
            authenticated: null
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
     */
    handleSetAuthState( promise ) {
        // Clear the auth state.
        this.clearAuthState();

        // Handle promise resolution.
        promise
            .then(() => {
                this.setAuthState(true);
                this.setUser(authService.getUser());
            })
            .catch(() => {
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
     * Clears the authentication state.
     */
    clearUser() {
        this.extendState({
            user: null
        })
    }

    /**
     * Clears the authentication state.
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
     * Get based components based on authentication.
     *
     * @param $$
     * @return Components.
     */
    getComponents($$) {
        let components = null;

        // Not authenticated.
        if ( false === this.state.authenticated ) {
            components = $$(UIButton, {
                label: this.getLabel('Login'),
                type: 'default'
            }).on('click', async() => {
                this.handleSetAuthState(authService.login())
            });
        } else if ( true === this.state.authenticated && this.state.user ) {
            components = [
                $$(UIButton, {
                    label: this.getLabel('Add Embed')
                }).on('click', async () => {
                    this.context.api.editorSession.executeCommand('oovvuu.insert', {title: 'Title', embedId: 'test'})
                }),
                $$('div').append([
                    $$(UIButton, {
                        label: this.getLabel('Logout'),
                        type: 'alert outlined'
                    }).on('click', async () => {
                        authService.logout();
                    })
                ]),
                $$('p').append($$('em').text(`Currently logged in as ${this.state.user.email}`)),
            ];
        } else if ( null === this.state.authenticated ) {
            components = $$('p').text('Loading user...');
        }

        return components;
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
        const components = this.getComponents($$);

        if (components) {
            container.append(components);
        }

        return container
    }
}

export {OovvuuNavigaPluginComponent}
