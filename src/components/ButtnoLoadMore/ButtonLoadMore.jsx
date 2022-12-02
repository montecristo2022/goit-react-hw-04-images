import PropTypes from 'prop-types';

import styles from '../ButtnoLoadMore/ButtonLoadMore.module.css';

export default function ButtonLoadMore({ onClick }) {
  return (
    <button className={styles.buttonLoadMore} type="button" onClick={onClick}>
      Загрузить еще картинок...
    </button>
  );
}

ButtonLoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};


