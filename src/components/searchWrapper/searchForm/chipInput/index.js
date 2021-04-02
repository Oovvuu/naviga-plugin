import { Component } from 'substance';
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

  /**
   * Converts the input value with the TAB or Return key.
   *
   * @param {Event} event The event object.
   */
  handleKeyDown(event) {
    const { TAB, RETURN } = keyCodes;
    const { keyCode } = event;

    if ([TAB, RETURN].includes(keyCode)) {
      event.preventDefault();

      const inputEl = document.getElementById('oovvuu-video-search-button');

      if (inputEl) {
        // Add to keywords.
        this.addToKeywords(inputEl.value);

        // Clear current selection.
        inputEl.value = '';
      }
    }
  }

  /**
   * Adds keyword to parent component state using passes function.
   *
   * @param {string} keyword A new keyword.
   */
  addToKeywords(keyword) {
    this.props.addKeyword(keyword);
  }

  /**
   * Render the ChipInput.
   *
   * @param  {function} $$ The createComponent function.
   * @return {VirtualComponent} The ChipInput component.
   */
  render($$) {
    const Label = $$('label')
      .attr('for', 'oovvuu-video-search-button');

    const Input = $$('input')
      .attr('aria-label', this.getLabel('Search'))
      .attr('placeholder', 'Search Video Library')
      .attr('autoComplete', 'off')
      .addClass('dw-form-control')
      .setId('oovvuu-video-search-button');

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
