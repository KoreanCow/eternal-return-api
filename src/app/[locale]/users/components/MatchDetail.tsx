import React from 'react';
import { MatchType } from '@/types/user/match';
import styles from '../[nickname]/nickname.module.scss';
import { useTranslations } from 'next-intl';

interface MatchDetailProps {
  game: MatchType['userGames'][number];
}

export default function MatchDetail({ game }: MatchDetailProps) {
  const t = useTranslations("MatchResult");

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
      <div className={styles.matchLeft}>
        <p>Game Rank: {game.gameRank}</p>
        <p>{t('MatchingMode')}: {game.matchingMode === 2 ? t('Normal') : t('Rank')}</p>
        <p>Play Time: {formatTime(game.playTime)}</p>
        <p>{formatDate(game.startDtm)}</p>
      </div>
      <div className={styles.matchMiddle}>
        <p>Game ID: {game.gameId}</p>

        <p>Character Level: {game.characterLevel}</p>
        <p>Character Number: {game.characterNum}</p>

        <p>Team Kills: {game.teamKill}</p>
        <p>Player Kills: {game.playerKill}</p>
        <p>Player Assists: {game.playerAssistant}</p>
        <p>Damage to Player: {game.damageToPlayer}</p>

      </div>
      <div className={styles.matchRight}>
        <p>Main Weather: {game.mainWeather}</p>
        <p>Sub Weather: {game.subWeather}</p>
        <p>Start Route ID: {game.routeIdOfStart}</p>
        <p>First Core Trait: {game.traitFirstCore}</p>
        <p>First Sub Trait: {game.traitFirstSub}</p>
        <p>Second Sub Trait: {game.traitSecondSub}</p>
        <p>Tactical Skill Group: {game.tacticalSkillGroup}</p>

      </div>
    </div>
  );
}
