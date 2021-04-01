import { BlockNode } from 'writer';

class OovvuuNode extends BlockNode {}

OovvuuNode.define({
  type: 'oovvuunode',
  brightcoveAccountId: { type: 'string' },
  brightcovePlayerId: { type: 'string' },
  brightcoveVideoId: { type: 'string' },
  embedId: { type: 'string' },
  embed: { type: 'string' },
});

export default OovvuuNode;
