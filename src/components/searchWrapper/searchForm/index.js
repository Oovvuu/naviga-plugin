import { Component } from 'substance';
import { UIButton } from 'writer';

class SearchForm extends Component {
    /**
     * Create a SearchForm.
     * @constructor
     *
     * @param {array} args Component arguments.
     */
    constructor(...args) {
        super(...args);
    }

    /**
     * Render the SearchForm.
     *
     * @param  {function} $$ The createComponent function.
     * @return {VirtualComponent} The SearchForm component.
     */
    render($$) {
        const container = $$('div');

        const inputField = $$('input')
            .attr('placeholder', 'Search for videos...')
            .setId('oovvuu-video-search-button');

        // Add search results components.
        container.append(inputField);
        container.append(
            $$(UIButton, {
                label: this.getLabel('Submit')
            }).on('click', () => { this.props.handleInputSubmit() } )
        );

        return container;
    }
}

export default SearchForm;
