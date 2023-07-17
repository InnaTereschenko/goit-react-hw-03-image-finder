import { Component } from 'react';
// import PropTypes from 'prop-types';
import css from './Button.module.css';

export class Button extends Component {
  render() {
    return (
      <button type="button" className={css.button}>
        Load More
      </button>
    );
  }
}
