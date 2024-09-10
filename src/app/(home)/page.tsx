import styles from '../page.module.scss';

import Form from './components/Form';

export default function Home() {

  return (
    <div className={styles.page}>
      <Form />
    </div>
  );
}
