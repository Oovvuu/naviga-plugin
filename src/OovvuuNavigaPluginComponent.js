import {Component} from 'substance'
import {UIButton} from 'writer'
import { Auth0Client } from '@auth0/auth0-spa-js'

class DevKitComponent extends Component {

    /**
     * Constructor
     * @param args
     */
    constructor(...args) {
        super(...args)
    }

    /**
     * Method called when component is disposed and removed from DOM
     */
    dispose() {
        // Perfect place to remove eventlisteners etc
    }

    /**
     * Return the inital component state before rendering
     *
     * @returns {{clickCount: number}}
     */
    getInitialState() {
        return {
            clickCount: 0
        }
    }

    /**
     * Do something after the first render
     */
    didMount() {
        console.log('Devkit plugin rendered')
    }

    /**
     * Render method is called whenever there's a change in state or props
     *
     * @param $$
     * @returns {*}
     */
    render($$) {
        const el = $$('div')
            .addClass('devkit')

        const auth0 = new Auth0Client({
            domain: 'oovvuu-production.au.auth0.com',
            client_id: 'aZfpyRNB2wViuceV3Q87638Gp5TeI0s7',
            client_secret: 'cX0i2MONG2rJcV3bCf04a1870Jw14V0TqsOKNfBHu_8QwJd8Ix8PU7GDkgaVmB-J',
            audience: 'https://api.prod.oovvuu.io',
            scope: 'offline_access openid',
            useRefreshTokens: true,
        });

        el.append([
            $$('h2').append(
                this.getLabel('Oovvuu Plugin')
            ),
            $$(UIButton, {
                label: this.getLabel('Login')
            }).on('click', async () => {
                await auth0.loginWithRedirect({
                    redirect_uri: 'https://writer.dev.developer.infomaker.io/?action=oovvuu-auth'
                });
            }),
            $$(UIButton, {
                label: this.getLabel('Add Embed')
            }).on('click', async () => {
                this.context.api.editorSession.executeCommand('oovvuu.insert', {title: 'Title', embedId: 'test'})
            })
        ])

        return el
    }
}

export {DevKitComponent}
