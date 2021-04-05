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

    const CloseIconHtml = '<svg height="12" viewBox="0 0 18 18" width="12" xmlns="http://www.w3.org/2000/svg"><path d="m18 1.80019284-1.8001928-1.80019284-7.1998072 7.19980716-7.19980716-7.19980716-1.80019284 1.80019284 7.19980716 7.19980716-7.19980716 7.1998072 1.80019284 1.8001928 7.19980716-7.1998072 7.1998072 7.1998072 1.8001928-1.8001928-7.1998072-7.1998072z" fill-rule="evenodd"/></svg>';

    const Button = $$('button')
      .attr('type', 'button')
      .attr('aria-label', this.getLabel('Remove'))
      .attr('aria-labelledby', `${buttonId} ${textId}`)
      .html(CloseIconHtml);

    Button.on('click', () => {
      this.props.removeKeyword(keyword);
    });
    Container.append(Button);

    return Container;
  }
}

export default ChipItem;
