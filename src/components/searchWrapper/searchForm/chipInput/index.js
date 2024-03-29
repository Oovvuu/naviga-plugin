import { Component } from 'substance';
import * as styles from './chipInput.scss';
import keyCodes from '../../../../utils/keyCodes';

class ChipInput extends Component {
  /**
   * Constructor
   * @param args
   */
  constructor(...args) {
    super(...args);

    // Bind class methods.
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.addToKeywords = this.addToKeywords.bind(this);
  }

  didMount() {
    this.handleFocusEl();
  }

  /**
   * Sets the focus to the input field based on prop.
   */
  handleFocusEl() {
    if (!this.props.focus) {
      return;
    }

    const inputEl = document.getElementById('oovvuu-video-search-input');

    if (inputEl) {
      inputEl.focus();
    }
  }

  /**
   * Converts the input value with the TAB or Return key.
   *
   * @param {Event} event The event object.
   */
  handleKeyDown(event) {
    const { TAB, RETURN } = keyCodes;
    const { keyCode } = event;

    if ([TAB, RETURN].includes(keyCode)) {
      const inputEl = document.getElementById('oovvuu-video-search-input');

      if (inputEl) {
        if (inputEl.value !== '') {
          event.preventDefault();

          // Add to keywords.
          this.addToKeywords(inputEl.value);
        } else if (TAB === keyCode && !event.shiftKey) {
          const submitEl = document.getElementById('oovvuu-video-search-submit-button');

          if (submitEl) {
            event.preventDefault();
            submitEl.focus();
          }
        }
      }
    }
  }

  /**
   * Adds keyword to parent component state using passes function.
   *
   * @param {string} keyword A new keyword.
   */
  addToKeywords(keyword) {
    if (keyword) {
      this.props.addKeyword(keyword);
    }
  }

  /**
   * Render the ChipInput.
   *
   * @param  {function} $$ The createComponent function.
   * @return {VirtualComponent} The ChipInput component.
   */
  render($$) {
    const Label = $$('label')
      .attr('for', 'oovvuu-video-search-input')
      .addClass(styles.inputItem);

    const Input = $$('input')
      .attr('aria-label', this.getLabel('Search'))
      .attr('placeholder', 'Search Video Library')
      .attr('autoComplete', 'off')
      .setId('oovvuu-video-search-input')
      .addClass(styles.input)
      .addClass('panel-shadow');

    // Disable input until filters are loaded.
    if (this.props.loadingFilters) {
      Input.attr('disabled', true);
      Input.attr('placeholder', 'Loading filters...');
    }

    Input.on('keydown', (event) => {
      this.handleKeyDown(event);
    });

    return Label.append(Input);
  }
}

export default ChipInput;
