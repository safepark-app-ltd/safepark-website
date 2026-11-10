import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { COMPANY, EMAIL, HAULIER_SIGNUP_URL, JOIN_URL, LICENCE_PRICE, MAP_URL, PHONE, TRIAL_DAYS } from '../consts';

// Plain-English summary for AI tools (https://llmstxt.org).

export const GET: APIRoute = async ({ site }) => {
  const url = (path: string) => new URL(path, site).href;
  const guides = (await getCollection('guides', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.published.valueOf() - a.data.published.valueOf(),
  );

  const body = `# SafePark

> SafePark is a web app for truck and lorry drivers. It shows vetted, secure truck parking across the UK and Europe on one map, alongside reported cargo and fuel crime, so drivers can see whether a stop is safe before they pull in. Crime locations are updated twice a day.

SafePark is run by ${COMPANY}, a UK company. The map is at ${MAP_URL} and needs a SafePark login. It runs in a phone's browser, with nothing to install.

## How to register

- Hauliers sign up at ${HAULIER_SIGNUP_URL}: a ${TRIAL_DAYS}-day free trial (card taken up front), then ${LICENCE_PRICE} per driver a month. They get a link and a code for their drivers.
- Drivers join free with their haulier's link or code at ${JOIN_URL}, registering with a name and email address or Google.
- Drivers without a haulier code can get in touch with the form at ${url('/sign-up/')}, or by phone on ${PHONE}.

## What the map shows

- Secure parking sites, with their facilities and accreditations (ParkMark, TAPA, ESPORG, Travis).
- Reported cargo theft, fuel theft, tank damage and hijacking, from police crime data.
- Drivers can report an incident from the map.

## Pages

- [Home](${url('/')}): what SafePark does and how to register
- [Get started](${url('/sign-up/')}): hauliers start a free trial; drivers join with a code
- [Guides](${url('/guides/')}): advice on secure parking and cargo crime
- [Driver welfare](${url('/driver-welfare/')}): support services for drivers
- [Contact](${url('/contact/')}): ${PHONE}, ${EMAIL}

## Guides

${guides.map((g) => `- [${g.data.title}](${url(`/${g.id}/`)}): ${g.data.description}`).join('\n')}
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
