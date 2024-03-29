import { Component } from 'substance';
import SearchFilters from '../searchFilters';
import ChipInput from './chipInput';
import ChipItem from './chipItem';
import * as styles from './searchForm.scss';

class SearchForm extends Component {
  /**
   * Constructor
   * @param args
   */
  constructor(...args) {
    super(...args);

    // Bind class methods.
    this.addKeyword = this.addKeyword.bind(this);
    this.removeKeyword = this.removeKeyword.bind(this);
  }

  /**
   * Return the inital component state before rendering
   *
   * @returns {object} Component state.
   */
  getInitialState() {
    return {
      keywords: this.props.initialKeywords ?? [],
    };
  }

  /**
   * Add keyword.
   *
   * @param {string} keyword A keyword
   */
  addKeyword(keyword) {
    // Keyword already exists in array.
    if (this.state.keywords.includes(keyword)) {
      return;
    }

    this.extendState({
      keywords: [
        ...this.state.keywords,
        keyword,
      ],
    });
  }

  /**
   * Remove keyword.
   *
   * @param {string} keyword A keyword
   */
  removeKeyword(keyword) {
    this.extendState({
      keywords: [
        ...this.state.keywords.filter((item) => keyword !== item),
      ],
    });
  }

  /**
   * Render the SearchForm.
   *
   * @param  {function} $$ The createComponent function.
   * @return {VirtualComponent} The SearchForm component.
   */
  render($$) {
    const Input = $$(ChipInput, {
      loadingFilters: this.props.genres.length === 0 || this.props.providers.length === 0,
      addKeyword: this.addKeyword,
      removeKeyword: this.removeKeyword,
      focus: this.state.keywords.length !== 0,
    });

    const InputWrapper = $$('div')
      .addClass(styles.wrapper);

    if (this.state.keywords.length !== 0) {
      this.state.keywords.map((keyword) => {
        InputWrapper.append($$(ChipItem, { removeKeyword: this.removeKeyword, keyword }));
        return keyword;
      });
    }

    InputWrapper.append(Input);

    const SubmitButton = $$('button')
      .attr('aria-label', this.getLabel('Submit'))
      .attr('type', 'submit')
      .setId('oovvuu-video-search-submit-button')
      .addClass(styles.submit)
      .append($$('i').addClass('fa fa-search'));

    const SearchWrapper = $$('div')
      .addClass(styles.form);
    SearchWrapper.append([InputWrapper, SubmitButton]);

    const Filters = $$(SearchFilters, {
      genres: this.props.genres,
      providers: this.props.providers,
      filters: this.props.filters,
    })
      .addClass(styles.filters);

    return $$('form')
      .on('submit', (event) => {
        event.preventDefault();
        this.props.handleInputSubmit(this.state.keywords);
      })
      // Add child components.
      .append([SearchWrapper, Filters]);
  }
}

export default SearchForm;
