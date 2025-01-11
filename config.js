module.exports = {
  name: "",
  networks: [
    "Applovin",
    "Facebook",
    "Google",
    "IronSource",
    "Liftoff",
    "TikTok",
    "UnityAds",
    "Vungle",
    "Landing",
    "Mindworks",
  ],
  customPhaser: true,
  // customPhaserPath: "./phaser.min.js",
  qualityAtlas: [0.8, 0.8],
  qualityTexture: [0.8, 0.8],
  bitrateAudio: 32, // 128, 64, 32, 16
  ios: "https://apps.apple.com/us/app/classic-slots-las-vegas-casino/id1628530581",
  android:
    "https://apps.apple.com/us/app/classic-slots-las-vegas-casino/id1628530581",
  currentVersion: "default", // после изменения значения нужно заново запустить npm run dev
  versions: {
    default: {
      lang: "en",
      audio: [],
      fonts: [],
      sheets: [],
      spine: [],
      textures: [],
    },
    "ne-56": {
      lang: "en",
      audio: [],
      fonts: [],
      sheets: [],
      spine: [],
      textures: [],
    },
  },
};
