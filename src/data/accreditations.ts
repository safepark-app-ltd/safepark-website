import type { ImageMetadata } from 'astro';
import parkmark from '../assets/icons/info-parkmark.png';
import tapa from '../assets/icons/info-tapa.png';
import esporg from '../assets/icons/info-esporg.png';
import travis from '../assets/icons/info-travis.png';
// Park Safe Network is hidden until the client confirms it; uncomment its two lines to restore it.
// import parkSafeNetwork from '../assets/img/park-safe-network-logo.svg';

// Parking accreditation schemes drivers can filter by in the map.
// `scale` shrinks wide logos so they sit at the same visual weight.
export const accreditations: { name: string; logo: ImageMetadata; scale?: number }[] = [
  { name: 'ParkMark', logo: parkmark },
  { name: 'TAPA', logo: tapa },
  { name: 'ESPORG', logo: esporg },
  { name: 'Travis', logo: travis },
  // { name: 'Park Safe Network', logo: parkSafeNetwork, scale: 0.82 },
];
