import { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import css from './Seachbar.module.css';
class SearchBar extends Component {
  state = {
    imgName: '',
  };
  handleNameChange = event => {
    this.setState({ imgName: event.currentTarget.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.imgName);
    this.setState({ imgName: '' });
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.handleSubmit} className={css.form}>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.imgName}
            onChange={this.handleNameChange}
            placeholder="Search images and photos"
          />
          <button type="submit" className={css.button}>
            <span>
              <FcSearch className={css.icon} size={40} />{' '}
            </span>
          </button>
        </form>
      </header>
    );
  }
}

export default SearchBar;
// className={css.label}
