'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from '../../page.module.scss';
import search from '@/../public/images/icons/search.png'
import { useTranslations } from 'next-intl';

export default function Form() {
  const t = useTranslations('HomePage');

  const [nickname, setNickname] = useState<string>('');

  const router = useRouter();

  const onSearch = async (e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e?.preventDefault();

    const trimNickname = nickname.trim();

    if (trimNickname !== '') {
      router.push(`/users/${trimNickname}`);
      setNickname('');
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={onSearch}
    >
      <input
        className={styles.input}
        type='text'
        placeholder={t('placeholder')}
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <Image
        src={search}
        alt='Seatch Icon'
        onClick={onSearch}
        width={20}
        height={20}
        style={{ cursor: 'pointer' }}
      />

    </form>
  )

}