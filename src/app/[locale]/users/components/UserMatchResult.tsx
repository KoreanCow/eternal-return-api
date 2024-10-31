import { forwardRef, useEffect, useRef, useState } from 'react';
import styles from '../[nickname]/nickname.module.scss';
import { UserNum } from '@/types/user/info';
import { useFetchData } from '../../../../../hooks/useDataFetching';
import { MatchType } from '@/types/user/match';
import MatchDetail from './MatchDetail';

interface UserMatchResultProps {
  userNum: UserNum | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserMatchResult = forwardRef<HTMLDivElement, UserMatchResultProps>(
  function UserMatchResult({ userNum, isOpen, onClose }, ref) {
    const [cachedResult, setCachedResult] = useState<MatchType>({
      userGames: [],
      next: null,
    });

    const { data: result, loading, error } = useFetchData<MatchType>(
      userNum && !cachedResult.userGames.length
        ? `v1/user/games/${userNum.user.userNum}`
        : null,
      'matchResult'
    );

    useEffect(() => {
      if (result && !cachedResult.userGames.length) {
        setCachedResult(result);
      }
    }, [result]);

    const loadMoreGames = async () => {
      if (cachedResult.next) {
        const endpoint = `v1/user/games/${userNum?.user.userNum}?next=${cachedResult.next}`;

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
            headers: {
              'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
              accept: 'application/json',
            },
          });

          if (!res.ok) {
            throw new Error(`Failed to fetch more games: ${res.statusText}`);
          }

          const moreGames: MatchType = await res.json();

          setCachedResult((prev) => ({
            userGames: [...prev.userGames, ...moreGames.userGames],
            next: moreGames.next,
          }));
        } catch (error) {
          console.error('Error loading more games:', error);
        }
      }
    };

    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && cachedResult.next) {
            loadMoreGames();
          }
        },
        { threshold: 0.5 }
      );

      if (observerRef.current) {
        observer.observe(observerRef.current);
      }

      return () => {
        if (observerRef.current) {
          observer.unobserve(observerRef.current);
        }
      };
    }, [cachedResult.next]);

    return (
      <div ref={ref} className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <button className={styles.closeBtn} onClick={onClose}>
          Close
        </button>
        <h2>Match Results</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error loading match results: {error}</p>}
        <div>
          {cachedResult.userGames.map((game, index) => (
            <MatchDetail key={index} game={game} />
          ))}
          <div ref={observerRef} style={{ height: '20px' }} />
        </div>
      </div>
    );
  }
);

export default UserMatchResult;
