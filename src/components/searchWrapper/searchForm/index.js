import { Component } from 'substance';
import * as styles from './searchForm.scss';

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
        const Input = $$('input')
            .attr('aria-label', this.getLabel('Search'))
            .attr('placeholder', 'Search Video Library')
            .addClass('dw-form-control')
            .addClass(styles.input)
            .setId('oovvuu-video-search-button')

        const SubmitButton = $$('button')
            .attr('aria-label', this.getLabel('Submit'))
            .attr('type', 'submit')
            .addClass(styles.submit)
            .setInnerHTML('<i class="fa fa-search"></i>')

        const Form = $$('form')
            .addClass(styles.form)
            .on('submit', (event) => {
                event.preventDefault();
                this.props.handleInputSubmit()
            })
            // Add child components.
            .append([Input, SubmitButton]);

        return Form;
    }
}

export default SearchForm;
