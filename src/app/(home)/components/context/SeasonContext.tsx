'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface SeasonType {
  seasonID: number;
  seasonStart: string;
  seasonEnd: string;
  seasonName: string;
  isCurrent: number;
}

interface SeasonContextType {
  season: SeasonType | null;
  setSeason: (season: SeasonType) => void;
}

const SeasonContext = createContext<SeasonContextType | undefined>(undefined);

export const SeasonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [season, setSeason] = useState<SeasonType | null>(null);

  useEffect(() => {
    async function fetchSeason() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v2/data/Season`, {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
            'accept': 'application/json',
          }
        });

        const { data } = await res.json();
        const currentSeason = data.find((season: SeasonType) => season.isCurrent === 1);
        setSeason(currentSeason)
        console.log(currentSeason);
      } catch (err) {
        console.error('Failed to fetch Season Info:', err);
      }
    }

    fetchSeason();
  }, []);

  return (
    <SeasonContext.Provider value={{ season, setSeason }}>
      {children}
    </SeasonContext.Provider>
  )
}

export const useSeason = () => {
  const context = useContext(SeasonContext);
  if (context === undefined) {
    throw new Error('useSeason must be used within a SeasonProvider');
  }

  return context;
}