import { Component } from 'substance';
import brightcovePlayerLoader from '@brightcove/player-loader';
import * as styles from './brightcovePlayer.scss';

class BrightcovePlayer extends Component {
  /**
     * Return the inital component state before rendering
     *
     * @returns {object} Component state.
     */
  getInitialState() {
    return {
      elementClass: `brightcove-player-${this.props.location}-${this.props.videoId}`,
    };
  }

  didMount() {
    brightcovePlayerLoader({
      refNode: `.${this.state.elementClass}`,
      accountId: this.props.accountId,
      playerId: this.props.playerId,
      videoId: this.props.videoId,
    })
      .catch((error) => {
        console.error('Brightcove player error', error);
      });
  }

  /**
     * Render method is called whenever there's a change in state or props
     *
     * @param $$
     * @returns {*}
     */
  render($$) {
    return $$('div')
      .addClass(this.state.elementClass)
      .addClass(styles.wrapper);
  }
}

export default BrightcovePlayer;
