import type { ImageMetadata } from 'astro';
import cargo from '../assets/icons/crime-theft-cargo-trailer.png';
import fuel from '../assets/icons/crime-theft-fuel.png';
import hijack from '../assets/icons/crime-hijack.png';
import theft from '../assets/icons/crime-theft.png';
import tank from '../assets/icons/crime-damage-tank.png';

// Crime pictograms a guide can use as its card picture (the `icon` field).
export const guideIcons: Record<string, ImageMetadata> = {
  'crime-theft-cargo-trailer': cargo,
  'crime-theft-fuel': fuel,
  'crime-hijack': hijack,
  'crime-theft': theft,
  'crime-damage-tank': tank,
};
