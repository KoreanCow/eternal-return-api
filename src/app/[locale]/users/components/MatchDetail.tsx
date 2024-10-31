import React from 'react';
import { MatchType } from '@/types/user/match';
import styles from '../[nickname]/nickname.module.scss';

interface MatchDetailProps {
  game: MatchType['userGames'][number];
}

export default function MatchDetail({ game }: MatchDetailProps) {
  return (
    <div className={styles.matchBox}>
      <h3>Game</h3>
      <p>Game ID: {game.gameId}</p>
      <p>Matching Mode: {game.matchingMode}</p>
      <p>Character Number: {game.characterNum}</p>
      <p>Character Level: {game.characterLevel}</p>
      <p>Game Rank: {game.gameRank}</p>
      <p>Player Kills: {game.playerKill}</p>
      <p>Player Assists: {game.playerAssistant}</p>
      <p>Play Time: {game.playTime}</p>
      <p>Damage to Player: {game.damageToPlayer}</p>
      <p>Team Kills: {game.teamKill}</p>
      <p>Main Weather: {game.mainWeather}</p>
      <p>Sub Weather: {game.subWeather}</p>
      <p>Start Route ID: {game.routeIdOfStart}</p>
      <p>First Core Trait: {game.traitFirstCore}</p>
      <p>First Sub Trait: {game.traitFirstSub}</p>
      <p>Second Sub Trait: {game.traitSecondSub}</p>
      <p>Tactical Skill Group: {game.tacticalSkillGroup}</p>
      <p>Date: {game.startDtm}</p>
    </div>
  );
}
