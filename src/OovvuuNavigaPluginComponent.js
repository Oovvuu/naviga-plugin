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

        // Not authenticated.
        if ( false === this.state.authenticated ) {
            container.append(
                $$(UIButton, {
                    label: this.getLabel('Login'),
                    type: 'default'
                }).on('click', async() => {
                    await authService.login();
                })
            );
        } else if ( true === this.state.authenticated) {
            container.append([
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
            ]);
        } else {
            container.append(
                $$('p').text('Loading user...')
            );
        }

        return container
    }
}

export {OovvuuNavigaPluginComponent}
