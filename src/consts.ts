// Contact details and links used across the site. Change them here, not in pages.

export const SITE_NAME = 'SafePark';
export const COMPANY = 'SafePark App Ltd';
// From Companies House. Shown in the footer, as the law expects of a company website.
export const COMPANY_NUMBER = '15999653';
export const REGISTERED_OFFICE = '164 Northwood Lane, Newcastle, Staffordshire, ST5 4BZ';
export const VAT_NUMBER = 'GB 486 2483 58';

export const PHONE = '01782 909489';
export const PHONE_HREF = 'tel:+441782909489';
export const EMAIL = 'info@safepark.app';

export const MAP_URL = 'https://map.safepark.app';

// park-backend-2 receives the Get access and Contact forms and emails them to EMAIL.
// `||`, not `??`: the deploy workflow passes an unset repo variable as "".
export const ENQUIRY_URL =
  import.meta.env.PUBLIC_ENQUIRY_URL || 'https://prodapiv2.safepark.app/enquiry';

export const DEFAULT_DESCRIPTION =
  'Find vetted, secure lorry parking across the UK and Europe, and see where cargo and fuel crime is happening before you stop.';
