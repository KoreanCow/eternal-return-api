export const userTier = (mmr: number, rank: number) => {
  let tier: string;
  let grade: number | string = '';
  let rp: number;


  if (mmr < 600) {
    tier = 'Iron';
    grade = Math.floor(mmr / 150) + 4;
    rp = mmr - (150 * (grade - 4));
  } else if (mmr < 1400) {
    tier = 'Bronze';
    grade = Math.floor((mmr - 600) / 100) + 4;
    rp = mmr - (600 + (100 * (grade - 4)));
  } else if (mmr < 2400) {
    tier = 'Silver';
    grade = Math.floor((mmr - 1400) / 100) + 4;
    rp = mmr - (1400 + (100 * (grade - 4)));
  } else if (mmr < 3600) {
    tier = 'Gold';
    grade = Math.floor((mmr - 2400) / 300) + 4;
    rp = mmr - (2400 + (300 * (grade - 4)));
  } else if (mmr < 5000) {
    tier = 'Platinum';
    grade = Math.floor((mmr - 3600) / 350) + 4;
    rp = mmr - (3600 + (350 * (grade - 4)));
  } else if (mmr < 6400) {
    tier = 'Diamond';
    grade = Math.floor((mmr - 5000) / 350) + 4;
    rp = mmr - (5000 + (350 * (grade - 4)));
  } else if (mmr < 6800) {
    tier = 'Meteorite';
    grade = 1;
    rp = mmr - 6400;
  } else {
    if (rank <= 200) {
      tier = 'Eternity';
      rp = mmr - 6800;
    } else if (rank <= 700) {
      tier = 'Demigod';
      rp = mmr - 6800;
    } else {
      tier = 'Mithril';
      rp = mmr - 6800;
    }
  }

  return {
    tier,
    grade,
    rp
  };
};
