import { Component } from 'substance';
import getLatestVideos from '../../api/getLatestVideos';
import SearchForm from './searchForm';
import SearchResultsItem from './searchResultsItem';
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
            videosError: null,
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
            videos: videos
        })
    }

    /**
     * Sets loading videos.
     *
     * @param {Boolean} loading True or false.
     */
    setLoadingVideos( loading ) {
        this.extendState({
            loadingVideos: Boolean(loading)
        })
    }

    /**
     * Sets videos error.
     *
     * @param {object} error Error from getting videos.
     */
    setVideosError( error ) {
        this.extendState({
            videosError: error
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
        this.setVideosError(null);

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
                    this.setVideosError('Unable to process response, please contact site admin.');
                }

                // Clear loading.
                this.setLoadingVideos(false);
            })
            .catch((error) => {
                console.log('Oovvuu API Error', error);
                this.setVideosError('Encountered error connecting to API, please contact site admin.');

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
        const container = $$('div');

        // Add the search form.
        container.append(
            $$(SearchForm, { handleInputSubmit: this.handleInputSubmit })
        );

        // Loading state.
        if (true === this.state.loadingVideos) {
            container.append($$('p').text('Loading videos...'));
        } else if (false === this.state.loadingVideos && null !== this.state.videosError) {
            container.append($$('p').text(this.state.videosError));
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
                container.append(list);
            }
        }

        return container
    }
}

export default SearchWrapper;
