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
        const genrePlaceholder = $$('option').text(`Filter By ${this.props.label}`);
        genrePlaceholder.attr('disabled', true);
        genrePlaceholder.attr('selected', true);
        Select.append(genrePlaceholder);

        for (let index = 0; index < this.props.data.length; index++) {
            const option = $$('option').attr('value', this.props.data[index].id);
            option.text(this.props.data[index].name);
            Select.append(option);
        }

        return Select;
    }
}

export default SearchFilterItem;
