import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import Dropdown from './Dropdown';
import searchMovies from '../../actions/movies/operations';
import { changeSortMode } from '../../actions/search/actions';
import './header.scss';

class Header extends Component {
  searchQuery = (value) => {
    const {
      discover, sortBy, searchBy, sortMode,
    } = this.props;
    discover(value, sortBy, searchBy, sortMode);
  };

  handleSortOrderSwitch = () => {
    const { sortMode, switchSortMode } = this.props;
    const newMode = sortMode === 'desc' ? 'asc' : 'desc';
    switchSortMode({ sortMode: newMode });
  };

  render() {
    const { sortMode } = this.props;
    return (
      <div className="header">
        <div className="header__logo">My App</div>
        <div className="header__search-container">
          <SearchBar query={this.searchQuery} />
          <Dropdown menuType="Search" items={['Title', 'Year', 'Genre', 'Actor']} />
          <Dropdown menuType="Sort" items={['Rating', 'Popularity', 'Release year']} />
          <button className="header__sort-order-switch" type="button" onClick={this.handleSortOrderSwitch}>
            {sortMode}
          </button>
        </div>
        <div className="header__display-mode">
          <button className="header__switch" type="button">small</button>
          <button className="header__switch" type="button">large</button>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  discover: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  searchBy: PropTypes.string.isRequired,
  switchSortMode: PropTypes.func.isRequired,
  sortMode: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  sortBy: state.util.sortBy,
  searchBy: state.util.searchBy,
  sortMode: state.util.sortMode,
});

const mapDispatchToProps = dispatch => ({
  discover: (value, sortBy, searchBy, order) => {
    dispatch(searchMovies(value, sortBy, searchBy, order));
  },
  switchSortMode: mode => dispatch(changeSortMode(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
