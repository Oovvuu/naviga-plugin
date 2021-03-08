import {Component} from 'substance'
import BrightcovePlayer from '../components/brightcovePlayer';

class OovvuuComponent extends Component {
    render($$) {
        const el = $$('div')

        // Add the player.
        el.append($$(BrightcovePlayer, {
            accountId: this.props.node.brightcoveAccountId,
            playerId: this.props.node.brightcovePlayerId,
            videoId: this.props.node.brightcoveVideoId,
            embedOptions: { responsive: true }
        }));

        return el
    }
}

export {OovvuuComponent}
