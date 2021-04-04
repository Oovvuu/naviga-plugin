import { Component } from 'substance';
import * as styles from './chipItem.scss';

class ChipItem extends Component {
  /**
   * Render the ChipItem.
   *
   * @param  {function} $$ The createComponent function.
   * @return {VirtualComponent} The ChipItem component.
   */
  render($$) {
    const {
      keyword,
    } = this.props;
    const textId = keyword.replace(/\s/g, '-');
    const buttonId = `remove-${textId}`;

    const Container = $$('div')
      .addClass(styles.user)
      .addClass(styles.item);

    // Screen-reader label.
    const Span = $$('span')
      .attr('aria-hidden', true)
      .text(keyword)
      .setId(textId);
    Container.append(Span);

    const Button = $$('button')
      .attr('type', 'button')
      .attr('aria-label', this.getLabel('Remove'))
      .attr('aria-labelledby', `${buttonId} ${textId}`)
      .text('x');

    Button.on('click', () => {
      this.props.removeKeyword(keyword);
    });
    Container.append(Button);

    return Container;
  }
}

export default ChipItem;
