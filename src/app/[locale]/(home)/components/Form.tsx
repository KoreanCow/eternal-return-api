'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from '@/i18n/routing'; // i18n/routing에서 useRouter를 가져옵니다.
import styles from '../../page.module.scss';
import search from '@/../public/images/icons/search.png';
import { useTranslations } from 'next-intl';

export default function Form() {
  const t = useTranslations('HomePage');

  const [nickname, setNickname] = useState<string>('');
  const router = useRouter();

  const onSearch = async (e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e?.preventDefault();

    const trimNickname = nickname.trim();

    if (trimNickname !== '') {
      // 동적 경로를 객체 형식으로 설정합니다.
      router.push({
        pathname: '/users/[nickname]',
        params: { nickname: trimNickname },
      });
      setNickname('');
    }
  };

  return (
    <form className={styles.form} onSubmit={onSearch}>
      <input
        className={styles.input}
        type='text'
        placeholder={t('placeholder')}
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <Image
        src={search}
        alt='Search Icon'
        onClick={onSearch}
        width={20}
        height={20}
        style={{ cursor: 'pointer' }}
      />
    </form>
  );
}
