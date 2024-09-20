export interface RankType {
  userNum: number;
  nickname: string;
  rank: number;
  mmr: number;
}

export interface RankListType {
  topRanks: RankType[];
}