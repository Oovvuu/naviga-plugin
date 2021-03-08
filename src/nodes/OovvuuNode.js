import {BlockNode} from 'writer'
class OovvuuNode extends BlockNode {}

OovvuuNode.define({
    type: 'oovvuunode',
    brightcoveAccountId: {type: 'string'},
    brightcovePlayerId: {type: 'string'},
    brightcoveVideoId: {type: 'string'},
    embed: {type: 'object'}
})

export {OovvuuNode}
