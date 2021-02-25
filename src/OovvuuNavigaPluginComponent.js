import {Component} from 'substance'
import {UIButton} from 'writer'
import auth0 from './api/index.js'

class OovvuuNavigaPluginComponent extends Component {

    /**
     * Constructor
     * @param args
     */
    constructor(...args) {
        super(...args)
    }

    /**
     * Render method is called whenever there's a change in state or props
     *
     * @param $$
     * @returns {*}
     */
    render($$) {
        const el = $$('div')

        auth0.getTokenSilently().then((token) => {
            console.log(token);
        }).catch((error) => {
            console.log(error)
        });

        el.append([
            $$('h2').append(
                this.getLabel('Oovvuu Plugin')
            ),
            $$(UIButton, {
                label: this.getLabel('Login')
            }).on('click', async() => {
                await auth0.loginWithRedirect();
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

export {OovvuuNavigaPluginComponent}
