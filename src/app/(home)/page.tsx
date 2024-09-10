import styles from '../page.module.scss';

import Form from './components/Form';
import Rank from './components/Rank';

export default function Home() {

  return (
    <div className={styles.page}>
      <Form />
      <Rank />
    </div>
  );
}
