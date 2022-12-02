import { ImSpinner } from 'react-icons/im';

import styles from '../Loader/Loader.module.css';

export default function Loader() {
  return (
    <div>
      <ImSpinner size="54" className={styles.spinnerLoad} />
      <div>Загружаем картиночки....</div>
    </div>
  );
}
