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
  /* eslint-disable-next-line class-methods-use-this */
  getInitialState() {
    return {
      keywords: [],
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
      loadingFilters: this.props?.genres?.length === 0 || this.props?.providers?.length === 0,
      addKeyword: this.addKeyword,
      removeKeyword: this.removeKeyword,
    });

    const SubmitButton = $$('button')
      .attr('aria-label', this.getLabel('Submit'))
      .attr('type', 'submit')
      .addClass(styles.submit)
      .append($$('i').addClass('fa fa-search'));

    const InputWrapper = $$('div')
      .addClass(styles.wrapper);

    if (this.state.keywords.length !== 0) {
      this.state.keywords.map((keyword) => {
        InputWrapper.append($$(ChipItem, { removeKeyword: this.removeKeyword, keyword }));
        return keyword;
      });
    }

    InputWrapper.append([Input, SubmitButton]);

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
        this.props.handleInputSubmit(this.state.keywords);
      })
      // Add child components.
      .append([InputWrapper, Filters]);
  }
}

export default SearchForm;
