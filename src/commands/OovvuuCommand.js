import {WriterCommand, idGenerator} from 'writer'

class OovvuuCommand extends WriterCommand {
    execute(params) {
        params.editorSession.transaction(tx => {
            tx.insertBlockNode({
                id: idGenerator(),
                type: 'oovvuunode',
                brightcoveAccountId: params.brightcoveAccountId,
                brightcovePlayerId: params.brightcovePlayerId,
                brightcoveVideoId: params.brightcoveVideoId,
                embed: params.embed,
            })
        })
        return true
    }
}

export {OovvuuCommand}
