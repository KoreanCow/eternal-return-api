'use client';
import Image from "next/image";
import { useState } from 'react';

import styles from '../page.module.scss';
import search from '@/../public/images/icons/search.png';

export default function Home() {

  const [nickname, setNickname] = useState('');

  const onSearch = async (e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e?.preventDefault();
    console.log(nickname);
  };

  return (
    <div className={styles.page}>
      <form
        className={styles.form}
        onSubmit={onSearch}
      >
        <input
          className={styles.input}
          type='text'
          placeholder='user nickname'
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Image
          src={search}
          alt='Search Icon'
          onClick={onSearch} // Image 클릭 시 onSearch 함수 호출
          width={25}
          height={25}
          style={{ cursor: 'pointer' }} // 클릭 가능한 스타일 추가
        />
      </form>
    </div>
  );
}
