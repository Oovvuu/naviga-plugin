import { Component } from 'substance';
import BrightcovePlayer from '../../brightcovePlayer';
import Badge from '../../badge';
import createEmbed from '../../../api/createEmbed';
import formatDuration from '../../../utils/formatDuration';
import formatTimeSince from '../../../utils/formatTimeSince';
import * as styles from './searchResultsItem.scss';

class SearchResultsListItem extends Component {
  /**
   * Return the inital component state before rendering
   *
   * @returns {object} Component state.
   */
  /* eslint-disable-next-line class-methods-use-this */
  getInitialState() {
    return {
      loadingCreateEmbed: false,
      embeded: 0,
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
   * Save embeded ID.
   */
  embedItem(id) {
    this.extendState({
      embeded: id,
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
          },
        );
        this.setLoadingCreateEmbed(false);
        this.embedItem(this.props.video.id);
      }).catch((error) => {
        console.error(error);
        this.setLoadingCreateEmbed(false);
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
      },
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
        .append($$(Badge, { text: formatTimeSince(modified) })),
    );

    // Logo.
    card.append(
      $$('img')
        .addClass(styles.logo)
        .attr('alt', name)
        .attr('src', logoUrl),
    );

    // Title.
    card.append(
      $$('h2')
        .setTextContent(title)
        .addClass(styles.title),
    );

    // Buttion icon and text.
    let icon;
    let iconText;

    switch (true) {
      // Get the icon based on the loading state.
      case (this.state.loadingCreateEmbed === true):
        icon = 'fa-spinner fa-spin';
        iconText = 'Adding';
        break;

      // Get the icon based on the enbeded video.
      case (Number(id) === Number(this.state.embeded)):
        icon = 'fa-check';
        iconText = 'Added';
        break;

      // Default.
      default:
        iconText = 'Add Embed';
        icon = 'fa-plus-circle';
    }

    // Set the embeded class for the active status.
    const embedStatus = (Number(id) === Number(this.state.embeded))
      ? styles.embeded
      : '';

    // Add embed.
    card.append(
      $$('button')
        .addClass(styles.embed)
        .addClass(embedStatus)
        .on('click', this.handleAddEmbed)
        .setInnerHTML(`<i class="fa ${icon}"></i> ${iconText}`),
    );

    return container.append(card);
  }
}

export default SearchResultsListItem;
