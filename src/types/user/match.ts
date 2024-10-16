export interface MatchType {
  userGames: {
    gameId: number;
    matchingMode: number; // 2 노말 3 랭크
    characterNum: number;
    characterLevel: number;
    gameRank: number; // 등수
    playerKill: number;
    playerAssistant: number;
    playTime: number;
    damageToPlayer: number; // 딜량
    teamKill: number; // 팀 기록 킬
    equipment: number[]; // 착용 장비
    mainWeather: number; // 메인 날씨
    subWeather: number; // 서브 날씨
    routeIdOfStart: number; // 루트 번호
    traitFirstCore: number; // 주 특성 핵심 슬롯 번호
    traitFirstSub: number; // 주 특성 보조 슬롯 번호 배열
    traitSecondSub: number; // 보조 특성 보조 슬롯 번호 배열
    tacticalSkillGroup: number; // 전술 스킬 종류
    startDtm: string; // 날짜
  }[];
  next: number | null; // 다음 페이지의 ID
}
