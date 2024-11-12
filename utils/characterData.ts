// util/characterData.ts

export const characterData: Record<number, string> = {
  1: "Jackie",
  2: "Aya",
  3: "Fiora",
  4: "Magnus",
  5: "Zahir",
  6: "Nadine",
  7: "Hyunwoo",
  8: "Hart",
  9: "Isol",
  10: "LiDailin",
  11: "Yuki",
  12: "Hyejin",
  13: "Xiukai",
  14: "Chiara",
  15: "Sissela",
  16: "Silvia",
  17: "Adriana",
  18: "Shoichi",
  19: "Emma",
  20: "Lenox",
  21: "Rozzi",
  22: "Luke",
  23: "Cathy",
  24: "Adela",
  25: "Bernice",
  26: "Barbara",
  27: "Alex",
  28: "Sua",
  29: "Leon",
  30: "Eleven",
  31: "Rio",
  32: "William",
  33: "Nicky",
  34: "Nathapon",
  35: "Jan",
  36: "Eva",
  37: "Daniel",
  38: "Jenny",
  39: "Camilo",
  40: "Chloe",
  41: "Johann",
  42: "Bianca",
  43: "Celine",
  44: "Echion",
  45: "Mai",
  46: "Aiden",
  47: "Laura",
  48: "Tia",
  49: "Felix",
  50: "Elena",
  51: "Priya",
  52: "Adina",
  53: "Markus",
  54: "Karla",
  55: "Estelle",
  56: "Piolo",
  57: "Martina",
  58: "Haze",
  59: "Isaac",
  60: "Tazia",
  61: "Irem",
  62: "Theodore",
  63: "LyAnh",
  64: "Vanya",
  65: "DebiMarlene",
  66: "Arda",
  67: "Abigail",
  68: "Alonso",
  69: "Leni",
  70: "Tsubame",
  71: "Kenneth",
  72: "Katja",
  73: "Charlotte",
  74: "Darko",
  75: "Lenore",
  76: "Garnet",
  77: "Yumin",
};

export const getCharacterName = (characterCode: number) => {
  return characterData[characterCode] || "Unknown";
};