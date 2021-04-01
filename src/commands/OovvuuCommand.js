import { WriterCommand, idGenerator } from 'writer';

class OovvuuCommand extends WriterCommand {
  /* eslint-disable class-methods-use-this */
  // Must not be defined as a static method to work with Substance.
  execute(params) {
    params.editorSession.transaction((tx) => {
      tx.insertBlockNode({
        id: idGenerator(),
        type: 'oovvuunode',
        brightcoveAccountId: params.brightcoveAccountId,
        brightcovePlayerId: params.brightcovePlayerId,
        brightcoveVideoId: params.brightcoveVideoId,
        embedId: params.embedId,
        embed: JSON.stringify(params.embed),
      });
    });
    return true;
  }
}

export default OovvuuCommand;
