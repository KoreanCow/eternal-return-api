import styles from '../page.module.scss';

import Form from './components/Form';
import LocaleSwitcher from './components/LocalSwitcher';
import Rank from './components/Rank';

export default function Home() {

  return (
    <div className={styles.page}>
      <LocaleSwitcher />
      <Form />
      <Rank />
    </div>
  );
}
