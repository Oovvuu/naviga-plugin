import { Component } from 'substance';
import * as styles from './badge.scss';

/**
 * A rounded rectangle to present metadata.
 */
class Badge extends Component {
  /**
   * Render the Badge.
   *
   * @param  {function} $$ The createComponent function.
   * @return {VirtualComponent} The Badge component.
   */
  render($$) {
    return $$('span')
      .addClass(styles.badge)
      .setTextContent(this.props.text);
  }
}

export default Badge;
