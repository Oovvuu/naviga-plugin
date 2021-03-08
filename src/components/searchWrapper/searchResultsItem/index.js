import { Component } from 'substance';
import BrightcovePlayer from '../../brightcovePlayer';
import Badge from '../../badge';
import formatDuration from '../../../utils/formatDuration';
import formatTimeSince from '../../../utils/formatTimeSince';
import * as styles from './searchResultsItem.scss';

class SearchResultsListItem extends Component {

    /**
     * Create a SearchResultsListItem.
     * @constructor
     *
     * @param {array} args Component arguments.
     */
    constructor(...args) {
        super(...args);
    }

    /**
     * Render the SearchResultsListItem.
     *
     * @param  {function} $$ The createComponent function.
     * @return {VirtualComponent} The SearchResultsListItem component.
     */
    render($$) {
        const {
            video: {
                id,
                title,
                duration,
                modified,
                collection: {
                    provider: {
                        logo: {
                            url: logoUrl,
                        } = {},
                        name = '',
                    } = {},
                } = {},
                preview: {
                    brightcoveAccountId: accountId,
                    brightcovePlayerId: playerId,
                    brightcoveVideoId: videoId,
                } = {},
            }
        } = this.props;

        const container = $$('article')
            .setId(id)
            .addClass(styles.wrapper);

        // Add the player.
        container.append($$(BrightcovePlayer, {
            accountId,
            playerId,
            videoId,
            embedOptions: { responsive: true },
            options: { // Video.js options.
                fluid: true,
                aspectRatio: '16:9',
                width: 250,
            },
        }));

        const card = $$('div').addClass(styles.card);

        // Meta.
        card.append(
            $$('div')
                .addClass(styles.meta)
                .append($$(Badge, { text: formatDuration(duration) }))
                .append($$(Badge, { text: formatTimeSince(modified) }))
        );

        // Logo.
        card.append(
            $$('img')
                .addClass(styles.logo)
                .attr('alt', name)
                .attr('src', logoUrl)
        );

        // Title.
        card.append(
            $$('h2')
                .setTextContent(title)
                .addClass(styles.title)
        );

        container.append(card);

        return container
    }
}

export default SearchResultsListItem;
