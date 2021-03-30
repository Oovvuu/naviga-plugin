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
     * Return the inital component state before rendering
     *
     * @returns {object} Component state.
     */
    getInitialState() {
        return {
            loadingCreateEmbed: false
        };
    }

    /**
     * Clears loading create embed.
     */
    clearLoadingCreateEmbed() {
        this.extendState({
            loadingCreateEmbed: null,
        });
    }

    /**
     * Sets loading create embed.
     *
     * @param {Boolean} loading True or false.
     */
    setLoadingCreateEmbed(loading) {
        this.extendState({
            loadingCreateEmbed: Boolean(loading),
        });
    }

    /**
     * Handle creating the Oovvuu embed and add it to the document.
     */
    handleAddEmbed() {
        this.clearLoadingCreateEmbed();

        // Create the embed based on the video ID.
        if (undefined === this.props.video || !this.props.video.id) {
            return;
        }

        this.setLoadingCreateEmbed(true);

        createEmbed(this.props.video.id)
            .then((embed) => {
                this.context.api.editorSession.executeCommand(
                    'oovvuu.insert',
                    {
                        brightcoveAccountId: this.props.video.preview.brightcoveAccountId,
                        brightcovePlayerId: this.props.video.preview.brightcovePlayerId,
                        brightcoveVideoId: this.props.video.preview.brightcoveVideoId,
                        embedId: embed.createVideoEmbed.id,
                        embed: embed.createVideoEmbed,
                    }
                );
                this.setLoadingCreateEmbed(false);
            }).catch((error) => {
                console.error(error);
                this.setLoadingCreateEmbed(false);
            });

        // Add video as selected.
        this.props.addVideo(this.props.video.id)
    }

    /**
     * Handle removing the Oovvuu embed.
     */
    handleRemoveEmbed() {
        this.clearLoadingCreateEmbed();

        // Create the embed based on the video ID.
        if (undefined === this.props.video || !this.props.video.id) {
            return;
        }

        this.setLoadingCreateEmbed(true);

        // Deselect video.
        this.props.removeVideo(this.props.video.id);

        this.setLoadingCreateEmbed(false);
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

        // Add the player.
        const container = $$('article')
            .setId(id)
            .addClass(styles.wrapper)
            .append($$(BrightcovePlayer, {
                location: 'searchResults',
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

        const selectedVideo = (this.props.addedVideos.includes(Number(id)));

        console.log(this.state.loadingCreateEmbed);

        // Button icon and text.
        let icon;
        let iconText;

        switch(true) {
            // Get the icon based on the loading state.
            case (true === this.state.loadingCreateEmbed):
                icon = 'fa-spinner fa-spin'
                iconText = 'Adding'
                break;

            // Get the icon based on the selected video.
            case (true === selectedVideo):
                icon = 'fa-check';
                iconText = 'Added'
                break;

            // Default.
            default:
                icon = 'fa-plus-circle';
                iconText = 'Add Embed'
        }

        const selectedVideoClass = true === selectedVideo
            ? styles.embeded
            : '';

        const buttonAction = true === selectedVideo
            ? this.handleRemoveEmbed
            : this.handleAddEmbed;

        card.append(
            $$('button')
                .addClass(styles.embed)
                .addClass(selectedVideoClass)
                .on('click', buttonAction)
                .setInnerHTML(`<i class="fa ${icon}"></i> ${iconText}`)
        );

        return container.append(card);
    }
}

export default SearchResultsListItem;
