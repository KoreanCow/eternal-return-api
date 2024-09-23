export interface CharacterStat {
  characterCode: number;
  totalGames: number;
  usages: number;
  maxKillings: number;
  top3: number;
  wins: number;
  top3Rate: number;
  averageRank: number;
}

export interface UserStatistics {
  seasonId: number;
  userNum: number;
  matchingMode: number;
  matchingTeamMode: number;
  mmr: number;
  nickname: string;
  rank: number;
  rankSize: number;
  totalGames: number;
  totalWins: number;
  totalTeamKills: number;
  totalDeaths: number;
  escapeCount: number;
  rankPercent: number;
  averageRank: number;
  averageKills: number;
  averageAssistants: number;
  averageHunts: number;
  top1: number;
  top2: number;
  top3: number;
  top5: number;
  top7: number;
  characterStats: CharacterStat[];
}

export interface UserStats {
  code: number;
  message: string;
  userStats: UserStatistics[];
}
