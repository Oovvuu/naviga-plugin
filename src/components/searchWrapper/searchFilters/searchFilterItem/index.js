import { Component } from 'substance';

class SearchFilterItem extends Component {
    /**
     * Create a SearchFilterItem.
     * @constructor
     *
     * @param {array} args Component arguments.
     */
    constructor(...args) {
        super(...args);
    }

    /**
     * Render the SearchFilterItem.
     *
     * @param  {function} $$ The createComponent function.
     * @return {VirtualComponent} The SearchForm component.
     */
    render($$) {
        const Select = $$('select');
        Select.attr('id', `oovvuu-video-search-filter-${this.props.label.toLowerCase()}` );

        const placeholder = $$('option').text(`Filter By ${this.props.label}`);
        placeholder.attr('value', '');
        placeholder.attr('disabled', true);

        if (!this.props.value) {
            placeholder.attr('selected', true);
        }

        Select.append(placeholder);

        for (let index = 0; index < this.props.data.length; index++) {
            const option = $$('option').attr('value', this.props.data[index].id);
            option.text(this.props.data[index].name);

            if (this.props.value && this.props.value === this.props.data[index].id) {
                option.attr('selected', true);
            }

            Select.append(option);
        }

        return Select;
    }
}

export default SearchFilterItem;
