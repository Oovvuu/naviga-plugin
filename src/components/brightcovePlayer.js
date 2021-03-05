import {Component} from 'substance'
import brightcovePlayerLoader from '@brightcove/player-loader';

class BrightcovePlayer extends Component {

    /**
     * Constructor
     * @param args
     */
    constructor(...args) {
        super(...args)
    }

    /**
     * Return the inital component state before rendering
     *
     * @returns {object} Component state.
     */
    getInitialState() {
        return {
            elementId: `brightcove-player-${this.props.videoId}`
        }
    }

    didMount() {
        brightcovePlayerLoader({
            refNode: `#${this.state.elementId}`,
            accountId: this.props.accountId,
            playerId: this.props.playerId,
            videoId: this.props.videoId
        })
            .catch((error) => {
                console.log('Brightcove player error', error);
            });
    }

    /**
     * Render method is called whenever there's a change in state or props
     *
     * @param $$
     * @returns {*}
     */
    render($$) {
        return $$('div').attr('id', this.state.elementId);
    }
}

export default BrightcovePlayer;
