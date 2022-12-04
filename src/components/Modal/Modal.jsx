import React, { useEffect } from 'react';
import styles from '../Modal/Modal.module.css';
import PropTypes from 'prop-types';

export default function Modal({ largeImage, alt, onModalClick }) {
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
console.log(alt)
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  const onKeyDown = e => {
    if (e.code === 'Escape') {
      onModalClick();
    }
  };

  const onBackDropClick = e => {
    if (e.target === e.currentTarget) {
      onModalClick();
    }
  };

  return (
    <div className={styles.overlay} onClick={onBackDropClick}>
      <div className={styles.modal}>
        <img src={largeImage} alt={alt} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onModalClick: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
