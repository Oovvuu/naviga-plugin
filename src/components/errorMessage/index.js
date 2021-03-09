import { Component } from 'substance';
import * as styles from './ErrorMessage.scss';

/**
 * A component to present an error message with optional supplimental text.
 */
class ErrorMessage extends Component {
    /**
     * Create a ErrorMessage.
     * @constructor
     *
     * @param {array} args Component arguments.
     */
    constructor(...args) {
        super(...args);
    }

    /**
     * Render the ErrorMessage.
     *
     * @param  {function} $$ The createComponent function.
     * @return {VirtualComponent} The ErrorMessage component.
     */
    render($$) {
        const { message, supplimental } = this.props;

        const alertWrapper = $$('span')
            .addClass(styles.alert)
            .append([
                $$('i').addClass('fa fa-2x fa-ban'),
                $$('p').setTextContent(message),
            ]);

        const SupplimentalWrapper = undefined === supplimental
            ? null
            : $$('p')
                .addClass(styles.supplimental)
                .setTextContent(supplimental);

        return $$('div')
            .addClass(styles.wrapper)
            .append([alertWrapper, SupplimentalWrapper])
    }
}

export default ErrorMessage;
