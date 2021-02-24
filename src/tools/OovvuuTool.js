import {Tool} from 'substance'

class OovvuuTool extends Tool {
    render($$) {
        let el = $$('div').attr('title', this.getLabel('Insert oovvuu'))

        el.append([
            $$('button').addClass('se-tool').append(
                $$('i')
            ).on('click', this.onClick.bind(this))
        ])

        return el
    }

    onClick() {
        // Execute a named command
        this.context.api.editorSession.executeCommand('oovvuu.insert', {embedId: 'test'})
    }
}

export {OovvuuTool}
