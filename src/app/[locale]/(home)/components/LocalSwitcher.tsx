'use client';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import styles from '../../page.module.scss';

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onLanguageChange = (locale: string) => {
    startTransition(() => {
      router.replace(`/${locale}`);
    });
  };

  return (
    <div className={styles.LocaleBox}>
      {isPending ? (
        <p>로딩 중...</p> // 로딩 중일 때 표시
      ) : (
        <>
          <p
            onClick={() => onLanguageChange('en')}
          >
            English
          </p>
          <p
            onClick={() => onLanguageChange('ko')}
          >
            한국어
          </p>
          <p
            onClick={() => onLanguageChange('ja')}
          >
            日本語
          </p>
        </>
      )}
    </div>
  );
}
