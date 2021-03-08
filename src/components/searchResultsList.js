import {Component} from 'substance'
import {UIButton} from 'writer'
import getLatestVideos from '../api/getLatestVideos.js'
import SearchResultsListItem from './searchResultsListItem.js'
import * as styles from './SearchResultsList.scss';

class SearchResultsList extends Component {

    /**
     * Constructor
     * @param args
     */
    constructor(...args) {
        super(...args)
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
        const searchValue = document.getElementById('oovvuu-video-search-button').value;

        if ('' !== searchValue) {
            this.handleVideoSearch(searchValue)
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

        const title = $$('h2').append(
            this.getLabel('Search results')
        );

        // Add the title.
        container.append(title);

        const inputField = $$('input')
            .attr('placeholder', 'Search for videos...')
            .setId('oovvuu-video-search-button');

        // Add search results components.
        container.append(inputField);
        container.append(
            $$(UIButton, {
                label: this.getLabel('Submit')
            }).on('click', () => { this.handleInputSubmit() } )
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

                    item.append($$(SearchResultsListItem, {
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

export default SearchResultsList;
