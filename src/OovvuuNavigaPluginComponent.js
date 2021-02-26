import {Component} from 'substance'
import {UIButton} from 'writer'
import auth0 from './api/auth0.js'

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
        auth0.getTokenSilently().then(() => {
            this.extendState({
                authenticated: true
            })
        }).catch(() => {
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
                    label: this.getLabel('Login')
                }).on('click', async() => {
                    await auth0.loginWithRedirect();
                })
            );
        } else if ( true === this.state.authenticated) {
            container.append(
                $$(UIButton, {
                    label: this.getLabel('Add Embed')
                }).on('click', async () => {
                    this.context.api.editorSession.executeCommand('oovvuu.insert', {title: 'Title', embedId: 'test'})
                })
            );
        } else {
            container.append(
                $$('p').text('Loading user...')
            );
        }

        return container
    }
}

export {OovvuuNavigaPluginComponent}
