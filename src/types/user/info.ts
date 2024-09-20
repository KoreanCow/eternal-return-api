export interface UserNum {
  userNum: number;
  nickname: string;
}

export interface UserNumState {
  userNum: UserNum | null;
  loading: boolean;
  error: string | null;
}