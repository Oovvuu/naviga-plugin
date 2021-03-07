import {Component} from 'substance'
import {UIButton} from 'writer'
import getLatestVideos from '../api/getLatestVideos.js'
import SearchResultsListItem from './searchResultsListItem.js'

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
     * Performs an API call to get videos based on keywords.
     *
     * @param {String} keywords Search keywords.
     */
    async handleVideoSearch ( keywords ) {
        // Set loading.
        this.setLoadingVideos(true);

        // Get the latest videos.
        const response = await getLatestVideos( keywords );

        console.log(response);

        if (
            undefined !== response.videoSet.pageResults
            && 0 < response.videoSet.pageResults.length
        ) {
            this.setVideos(response.videoSet.pageResults);
        }

        // Clear loading.
        this.setLoadingVideos(false);
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

        const inputField = $$('input').attr('placeholder', 'Search for videos...');
        inputField.attr('id','oovvuu-video-search-button')

        // Add search results components.
        container.append(inputField);
        container.append(
            $$(UIButton, {
                label: this.getLabel('Submit')
            }).on('click', () => {
                this.handleVideoSearch(document.getElementById('oovvuu-video-search-button').value)
            })
        );

        // Loading state.
        if ( true === this.state.loadingVideos) {
            container.append($$('p').text('Loading videos...'));
        } else {
            // Add video items.
            if (this.state.videos && 0 < this.state.videos.length) {
                for (var index = 0; index < this.state.videos.length; index++) {
                    container.append($$(SearchResultsListItem, {
                        video: this.state.videos[index],
                    }));
                }
            }
        }

        return container
    }
}

export default SearchResultsList;
