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

        // Handle auth callback.
        authService.handleAuthCallback();
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
        authService.isAuthenticated()
            .then(() => {
                this.extendState({
                    authenticated: true
                })
            })
            .catch(() => {
                this.extendState({
                    authenticated: false
                })
            });
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
                authService.login();
            });
        } else if ( true === this.state.authenticated ) {
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
                ])
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
