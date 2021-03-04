import {Component} from 'substance'
import {UIButton} from 'writer'

class SearchResultsListItem extends Component {

    /**
     * Constructor
     * @param args
     */
    constructor(...args) {
        super(...args)
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
            this.props.video.title
        );

        // Add the title.
        container.append(title);

        return container
    }
}

export default SearchResultsListItem;
