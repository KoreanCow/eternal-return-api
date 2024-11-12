import React from 'react';
import { MatchType } from '@/types/user/match';
import styles from '../[nickname]/nickname.module.scss';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { getCharacterName } from '../../../../../utils/characterData';
import WeatherData from './WeatherData';

interface MatchDetailProps {
  game: MatchType['userGames'][number];
}

export default function MatchDetail({ game }: MatchDetailProps) {
  const t = useTranslations("MatchResult");
  const characterName = getCharacterName(game.characterNum);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const second = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  return (
    <div className={styles.matchBox}>
      <div className={styles.matchTop}>
        <p>#{game.gameRank}</p>
        <p>{game.matchingMode === 2 ? t('Normal') : t('Rank')}</p>
        <p>{formatTime(game.playTime)}</p>
        <p>{formatDate(game.startDtm)}</p>
      </div>

      <div className={styles.matchMiddle}>
        <div className={styles.matchContent}>
          <p>Level <span>{game.characterLevel}</span></p>
          <Image
            className={styles.tacticalSkillsImage}
            src={`/images/characters/${characterName}_Mini.png`}
            alt='CharacterImage'
            width={60}
            height={60}
          />
          <div className={styles.tacticals}>
            <Image
              className={styles.tacticalSkillsImage}
              src={`/images/trait/${game.traitFirstCore}.png`}
              alt='Trait Image'
              width={30}
              height={30}
            />
            <Image
              className={styles.tacticalSkillsImage}
              src={`/images/tacticalSkills/${game.tacticalSkillGroup}.png`}
              alt='TacticalSkill Image'
              width={30}
              height={30}
            />
          </div>
          <div className={styles.tka}>
            <p>{game.teamKill} / {game.playerKill} / {game.playerAssistant}</p>
            <p>TK / K / A</p>
            <p>Damage to Player: {game.damageToPlayer}</p>
          </div>
        </div>
        <div className={styles.matchRight}>
          <p>Start Route ID: {game.routeIdOfStart}</p>
          <p>Main Weather: <WeatherData weatherCode={game.mainWeather} /></p>
          <p>Sub Weather: <WeatherData weatherCode={game.subWeather} /></p>
        </div>
      </div>
    </div>
  );
}
