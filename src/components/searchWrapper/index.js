import { Component } from 'substance';
import { UISpinner } from 'writer';
import getLatestVideos from '../../api/getLatestVideos';
import SearchForm from './searchForm';
import SearchResultsItem from './searchResultsItem';
import ErrorMessage from '../errorMessage';
import * as styles from './searchWrapper.scss';

class SearchWrapper extends Component {
  /**
   * Constructor
   * @param args
   */
  constructor(...args) {
    super(...args);

    // Bind class methods.
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
  }

  /**
   * Return the inital component state before rendering
   *
   * @returns {object} Component state.
   */
  static getInitialState() {
    return {
      videos: [],
      videosTotalCount: 0,
      videosError: {},
      loadingVideos: false,
      filters: {},
    };
  }

  /**
   * Sets videos.
   *
   * @param {Array} videos An array of videos.
   */
  setVideos(videos) {
    this.extendState({
      videos,
    });
  }

  /**
   * Sets total count of videos.
   *
   * @param {Integer} totalCount Total number of videos.
   */
  setVideosTotal(totalCount) {
    this.extendState({
      videosTotalCount: totalCount,
    });
  }

  /**
   * Sets loading videos.
   *
   * @param {Boolean} loading True or false.
   */
  setLoadingVideos(loading) {
    this.extendState({
      loadingVideos: Boolean(loading),
    });
  }

  /**
   * Sets videos error.
   *
   * @param {object} error Error from getting videos.
   */
  setVideosError(error) {
    this.extendState({
      videosError: error,
    });
  }

  /**
   * Sets filters
   *
   * @param {object} filters Search filters.
   */
  setFilters(filters) {
    this.extendState({
      filters,
    });
  }

  /**
   * Performs an API call to get videos based on keywords.
   *
   * @param {object} filters Search filters.
   */
  async handleVideoSearch(filters) {
    // Set loading.
    this.setLoadingVideos(true);
    this.setVideosError({});
    this.setFilters(filters);

    // Get the latest videos.
    getLatestVideos(filters)
      .then((response) => {
        // Success
        if (
          undefined !== response.videoSet.pageResults
                    && response.videoSet.pageResults.length > 0
        ) {
          this.setVideos(response.videoSet.pageResults);
          this.setVideosTotal(response.videoSet.totalCount);
        } else {
          this.setVideosError({
            message: "Sorry, we couldn't find a match",
            supplimental: 'Please change your search term to improve your video recommendations.',
          });
        }

        // Clear loading.
        this.setLoadingVideos(false);
      })
      .catch((error) => {
        console.error('Oovvuu API Error', error);
        this.setVideosError({
          message: 'Error connecting to API',
          supplimental: 'Please contact the site admin.',
        });

        // Clear loading.
        this.setLoadingVideos(false);
      });
  }

  /**
   * Handles the input search submission.
   */
  handleInputSubmit() {
    const filterEls = {
      keywordMatch: 'oovvuu-video-search-button',
      genre: 'oovvuu-video-search-filter-genres',
      provider: 'oovvuu-video-search-filter-providers',
    };

    const filters = {};
    Object.keys(filterEls).forEach((key) => {
      const value = filterEls[key];
      // do something with key or value
      const el = document.getElementById(value);

      if (el !== null && el.value !== '') {
        filters[key] = el.value;
      }
    });

    // Handle the search with filters.
    if (filters) {
      this.handleVideoSearch(filters);
    }
  }

  /**
   * Render method is called whenever there's a change in state or props
   *
   * @param $$
   * @returns {*}
   */
  render($$) {
    const container = $$('div').addClass(styles.wrapper);

    // Add the search form.
    container.append(
      $$(SearchForm, {
        handleInputSubmit: this.handleInputSubmit,
        genres: this.props.genres,
        providers: this.props.providers,
        filters: this.state.filters,
      }),
    );

    // Loading state.
    if (this.state.loadingVideos === true) {
      return container.append($$(UISpinner, {
        size: 'medium',
        color: 'var(--oovvuu-color-theme)',
      }));
    }

    // Error.
    if (this.state.loadingVideos === false && Object.keys(this.state.videosError).length > 0) {
      return container.append($$(ErrorMessage, { ...this.state.videosError }));
    }

    // Add video items.
    if (this.state.videos && this.state.videos.length > 0) {
      const list = $$('ol').addClass(styles.list);

      for (let index = 0; index < this.state.videos.length; index += 1) {
        const item = $$('li');

        item.append($$(SearchResultsItem, {
          video: this.state.videos[index],
        }));

        list.append(item);
      }

      const heading = $$('h2')
        .addClass(styles.heading)
        .text(`Showing ${this.state.videos.length} of ${Number(this.state.videosTotalCount).toLocaleString()}`);

      container.append([
        heading,
        list,
      ]);
    }

    return container;
  }
}

export default SearchWrapper;
