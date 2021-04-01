import { Component } from 'substance';

class SearchFilterItem extends Component {
  /**
   * Render the SearchFilterItem.
   *
   * @param  {function} $$ The createComponent function.
   * @return {VirtualComponent} The SearchForm component.
   */
  render($$) {
    const {
      data,
      label,
      value,
    } = this.props;

    const Select = $$('select');
    Select.attr('id', `oovvuu-video-search-filter-${label.toLowerCase()}`);

    // Check if we have an empty set of data. If so indicate that we are
    // loading results.
    if (data.length === 0) {
      const placeholder = $$('option').text(`Loading ${label}`);
      placeholder.attr('value', '');
      placeholder.attr('disabled', true);
      placeholder.attr('selected', true);

      return Select.append(placeholder);
    }

    const placeholder = $$('option').text(`Filter By ${label}`);
    placeholder.attr('value', '');
    placeholder.attr('disabled', true);

    if (!value) {
      placeholder.attr('selected', true);
    }

    Select.append(placeholder);

    for (let index = 0; index < data.length; index += 1) {
      const option = $$('option').attr('value', data[index].id);
      option.text(data[index].name);

      if (value && value === data[index].id) {
        option.attr('selected', true);
      }

      Select.append(option);
    }

    return Select;
  }
}

export default SearchFilterItem;
