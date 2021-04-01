import { Component } from 'substance';
import BrightcovePlayer from '../components/brightcovePlayer';

class OovvuuComponent extends Component {
  render($$) {
    const el = $$('div');

    // Add the player.
    el.append($$(BrightcovePlayer, {
      location: 'postContent',
      accountId: this.props.node.brightcoveAccountId,
      playerId: this.props.node.brightcovePlayerId,
      videoId: this.props.node.brightcoveVideoId,
      embedOptions: { responsive: true },
      options: {
        fluid: true,
        aspectRatio: '16:9',
      },
    }));

    return el;
  }
}

export default OovvuuComponent;
