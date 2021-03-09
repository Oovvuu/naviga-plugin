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
    getInitialState() {
        return {
            videos: [],
            videosError: {},
            loadingVideos: false,
        }
    }

    /**
     * Sets videos.
     *
     * @param {Array} videos An array of videos.
     */
    setVideos( videos ) {
        this.extendState({
            videos: videos,
        })
    }

    /**
     * Sets loading videos.
     *
     * @param {Boolean} loading True or false.
     */
    setLoadingVideos( loading ) {
        this.extendState({
            loadingVideos: Boolean(loading),
        })
    }

    /**
     * Sets videos error.
     *
     * @param {object} error Error from getting videos.
     */
    setVideosError( error ) {
        this.extendState({
            videosError: error,
        })
    }

    /**
     * Performs an API call to get videos based on keywords.
     *
     * @param {String} keywords Search keywords.
     */
    async handleVideoSearch ( keywords ) {
        // Set loading.
        this.setLoadingVideos(true);
        this.setVideosError({});

        // Get the latest videos.
        getLatestVideos( keywords )
            .then((response) => {
                // Success
                if (
                    undefined !== response.videoSet.pageResults
                  && 0 < response.videoSet.pageResults.length
                ) {
                    this.setVideos(response.videoSet.pageResults);
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
        const inputEl = document.getElementById('oovvuu-video-search-button');

        if (null !== inputEl && '' !== inputEl.value) {
            this.handleVideoSearch(inputEl.value)
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
            $$(SearchForm, { handleInputSubmit: this.handleInputSubmit })
        );

        const heading = $$('h2')
            .addClass(styles.heading)
            .text('Latest Videos');

        // Loading state.
        if (true === this.state.loadingVideos) {
            container.append($$(UISpinner, {
                size: 'medium',
                color: 'var(--oovvuu-color-theme)',
            }));
        } else if (false === this.state.loadingVideos && 0 < Object.keys(this.state.videosError).length) {
            container.append($$(ErrorMessage, { ...this.state.videosError }));
        } else {
            // Add video items.
            if (this.state.videos && 0 < this.state.videos.length) {
                const list = $$('ol').addClass(styles.list);

                for (var index = 0; index < this.state.videos.length; index++) {
                    const item = $$('li');

                    item.append($$(SearchResultsItem, {
                        video: this.state.videos[index],
                    }));

                    list.append(item);
                }
                container.append([heading, list]);
            }
        }

        return container
    }
}

export default SearchWrapper;
