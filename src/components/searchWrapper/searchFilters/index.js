import { Component } from 'substance';
import SearchFilterItem from './searchFilterItem';

class SearchFilters extends Component {
    /**
     * Create a SearchFilters.
     * @constructor
     *
     * @param {array} args Component arguments.
     */
    constructor(...args) {
        super(...args);
    }

    /**
     * Render the SearchFilters.
     *
     * @param  {function} $$ The createComponent function.
     * @return {VirtualComponent} The SearchForm component.
     */
    render($$) {
        const container = $$('div');

        container.append($$(SearchFilterItem, {
            label: 'Genres',
            data: this.props?.genres,
            value: this.props?.filters?.genre || null,
        }));
        container.append($$(SearchFilterItem, {
            label: 'Providers',
            data: this.props?.providers,
            value: this.props?.filters?.provider || null,
        }));

        return container;
    }
}

export default SearchFilters;
