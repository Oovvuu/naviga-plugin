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
            videos: null,
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

        container.append($$(UIButton, {
            label: this.getLabel('Submit')
        }).on('click', async () => {
            // Get the latest videos.
            const response = await getLatestVideos(document.getElementById('oovvuu-video-search-button').value)

            if (
                undefined !== response.data.videoSet.pageResults
                && 0 < response.data.videoSet.pageResults.length
            ) {
                this.setVideos(response.data.videoSet.pageResults);
            }
        }));

        // Add video items.
        if (this.state.videos && 0 < this.state.videos.length) {

            for (var index = 0; index < this.state.videos.length; index++) {
                container.append($$(SearchResultsListItem, {
                    video: this.state.videos[index],
                }));
            }
        }

        return container
    }
}

export default SearchResultsList;
