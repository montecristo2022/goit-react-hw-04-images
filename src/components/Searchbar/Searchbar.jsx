import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../Searchbar/Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [pictureName, setPictureName] = useState('');

  const handleChange = event => {
    let eventValue = event.currentTarget.value.toLowerCase();

    setPictureName(eventValue);
    
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (pictureName === '') {
      alert('и как я узнаю что ты хочешь найти?');
      return;
    }

    onSubmit(pictureName);
     setPictureName('');
  };

  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button className={styles.button} type="submit">
          Поиск
        </button>

        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="что хотите найти?"
          value={pictureName}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
