import {Component} from 'substance'
import {UIButton} from 'writer'
import BrightcovePlayer from './brightcovePlayer.js';

class SearchResultsListItem extends Component {

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

        const title = $$('h2').append(
            this.props.video.title
        );

        // Add the title.
        container.append(title);

        container.append($$(BrightcovePlayer, {
            accountId: this.props.video.preview.brightcoveAccountId,
            playerId: this.props.video.preview.brightcovePlayerId,
            videoId: this.props.video.preview.brightcoveVideoId
        }));

        return container
    }
}

export default SearchResultsListItem;
