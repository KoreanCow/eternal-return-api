import { forwardRef, useEffect, useState } from 'react';
import styles from '../[nickname]/nickname.module.scss';
import { UserNum } from '@/types/user/info';
import { useFetchData } from '../../../../../hooks/useDataFetching';
import { MatchType } from '@/types/user/match';

interface UserMatchResultProps {
  userNum: UserNum | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserMatchResult = forwardRef<HTMLDivElement, UserMatchResultProps>(
  function UserMatchResult({ userNum, isOpen, onClose }, ref) {
    const [cachedResult, setCachedResult] = useState<MatchType>({
      userGames: [],
      next: null
    });

    const { data: result, loading, error } = useFetchData<MatchType>(
      userNum && !cachedResult.userGames.length ? `v1/user/games/${userNum.user.userNum}` : null,
      'matchResult'
    );

    // 캐시된 결과에 저장
    useEffect(() => {
      if (result && !cachedResult.userGames.length) {
        setCachedResult(result); // 캐시에 데이터 저장
      }
    }, [result, cachedResult.userGames.length]);

    const loadMoreGames = async () => {
      if (cachedResult.next) {
        const endpoint = `v1/user/games/${userNum?.user.userNum}?next=${cachedResult.next}`;

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
            headers: {
              'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
              'accept': 'application/json',
            },
          });

          if (!res.ok) {
            throw new Error(`Failed to fetch more games: ${res.statusText}`);
          }

          const moreGames: MatchType = await res.json();

          setCachedResult(prev => ({
            userGames: [...prev.userGames, ...moreGames.userGames],
            next: moreGames.next // next 값을 업데이트
          }));
        } catch (error) {
          console.error('Error loading more games:', error);
        }
      }
    };

    return (
      <div ref={ref} className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <button className={styles.closeBtn} onClick={onClose}>Close</button>
        <h2>Match Results</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error loading match results: {error}</p>}
        {cachedResult.userGames.length > 0 ? (
          <div>
            {cachedResult.userGames.map((game, index) => (
              <div key={index}>
                <h3>Game {index + 1}</h3>
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
            ))}
            {cachedResult.next && (
              <button onClick={loadMoreGames}>더 보기</button>
            )}
          </div>
        ) : (
          <p>No games found.</p>
        )}
      </div>
    );
  }
);

export default UserMatchResult;
