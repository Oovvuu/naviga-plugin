import { Component } from 'substance';
import BrightcovePlayer from '../../brightcovePlayer';
import Badge from '../../badge';
import createEmbed from '../../../api/createEmbed.js';
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
     * Handle creating the Oovvuu embed and add it to the document.
     */
    handleAddEmbed() {
        // Create the embed based on the video ID.
        if (undefined === this.props.video || !this.props.video.id) {
            return;
        }

        createEmbed(this.props.video.id)
            .then((embed) => {
                this.context.api.editorSession.executeCommand(
                    'oovvuu.insert',
                    {
                        brightcoveAccountId: this.props.video.preview.brightcoveAccountId,
                        brightcovePlayerId: this.props.video.preview.brightcovePlayerId,
                        brightcoveVideoId: this.props.video.preview.brightcoveVideoId,
                        embed: embed.createVideoEmbed,
                    }
                );
            }).catch((error) => {
                console.error(error);
            });
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

        // Add embed.
        card.append(
            $$('button')
                .addClass(styles.embed)
                .on('click', this.handleAddEmbed)
                .setInnerHTML('<i class="fa fa-plus-circle"></i> Add Embed')
        );

        container.append(card);

        return container
    }
}

export default SearchResultsListItem;
