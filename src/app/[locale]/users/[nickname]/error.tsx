'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import styles from './nickname.module.scss'

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.error_body}>
      <h2 className={styles.error_title}>Something went wrong</h2>
      <span className={styles.error_text}>
        {error && error.message}
      </span>
      <div className={styles.error_btns}>
        <button onClick={() => reset()}>Try again</button>
        <button onClick={() => router.push('/')}>Go Home</button>
      </div>
    </div>
  );
}
