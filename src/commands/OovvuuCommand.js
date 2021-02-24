import {WriterCommand, idGenerator} from 'writer'

class OovvuuCommand extends WriterCommand {
    execute(params) {
        params.editorSession.transaction(tx => {
            tx.insertBlockNode({
                id: idGenerator(),
                type: 'oovvuunode',
                title: 'Oovvuu',
                // @TODO: Remove test data.
                embedId: 'test'
            })
        })
        return true
    }
}

export {OovvuuCommand}
