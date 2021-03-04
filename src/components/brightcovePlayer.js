import {Component} from 'substance'

class BrightcovePlayer extends Component {

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
        const container = $$('div');

        container.append(
            $$('iframe').attr(
                'src',
                `https://players.brightcove.net/${this.props.accountId}/${this.props.playerId}_default/index.html?videoId=${this.props.videoId}`
            )
        );

        return container
    }
}

export default BrightcovePlayer;
