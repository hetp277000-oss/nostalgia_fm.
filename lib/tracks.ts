export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  /** Path under /public — drop your own audio file here. */
  src: string;
  /** Path under /public — drop your own cover art here. */
  cover: string;
};

/**
 * Swap these for your own library. Point `src` and `cover` at files you
 * place in `public/audio` and `public/covers` — nothing is bundled here.
 */
export const playlist: Track[] = [
  {
    id: "kajra-mohabbat-wala",
    title: "Kajra Mohabbat Wala",
    artist: "Asha Bhosle",
    album: "Kismet",
    year: 1968,
    src: "/audio/kajra-mohabbat-wala.mp3",
    cover: "/covers/kajra-mohabbat-wala.jpg",
  },
  {
    id: "o-mere-dil-ke-chain",
    title: "O Mere Dil Ke Chain",
    artist: "Kishore Kumar",
    album: "Mere Jeevan Saathi",
    year: 1972,
    src: "/audio/o-mere-dil-ke-chain.mp3",
    cover: "/covers/o-mere-dil-ke-chain.jpg",
  },
];
