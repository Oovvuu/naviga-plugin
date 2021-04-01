import { Component } from 'substance';
import SearchFilters from '../searchFilters';
import * as styles from './searchForm.scss';

class SearchForm extends Component {
  /**
   * Render the SearchForm.
   *
   * @param  {function} $$ The createComponent function.
   * @return {VirtualComponent} The SearchForm component.
   */
  render($$) {
    const Input = $$('input')
      .attr('aria-label', this.getLabel('Search'))
      .attr('placeholder', 'Search Video Library')
      .addClass('dw-form-control')
      .addClass(styles.input)
      .setId('oovvuu-video-search-button');

    if (undefined !== this.props.filters?.keywordMatch) {
      Input.attr('value', this.props.filters?.keywordMatch);
    }

    // Disable input until filters are loaded.
    if (
      this.props.genres.length === 0
      || this.props.providers.length === 0
    ) {
      Input.attr('disabled', true);
      Input.attr('placeholder', 'Loading filters...');
    }

    const SubmitButton = $$('button')
      .attr('aria-label', this.getLabel('Submit'))
      .attr('type', 'submit')
      .addClass(styles.submit)
      .append($$('i').addClass('fa fa-search'));

    const InputWrapper = $$('div')
      .addClass(styles.wrapper)
      .append([Input, SubmitButton]);

    const Filters = $$(SearchFilters, {
      genres: this.props.genres,
      providers: this.props.providers,
      filters: this.props.filters,
    })
      .addClass(styles.filters);

    return $$('form')
      .addClass(styles.form)
      .on('submit', (event) => {
        event.preventDefault();
        this.props.handleInputSubmit();
      })
      // Add child components.
      .append([InputWrapper, Filters]);
  }
}

export default SearchForm;
