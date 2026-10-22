// Organisations listed on /driver-welfare/.

export interface WelfareOrg {
  topic: string;
  name: string;
  body: string;
  url: string;
}

export const welfare: WelfareOrg[] = [
  {
    topic: 'Bereavement',
    name: 'Cruse Bereavement Support',
    body: 'Support and advice after someone close to you has died.',
    url: 'https://www.cruse.org.uk/',
  },
  {
    topic: 'Alcohol',
    name: 'Alcoholics Anonymous',
    body: 'Meetings and support for anyone who wants to stop drinking.',
    url: 'https://www.alcoholics-anonymous.org.uk/',
  },
  {
    topic: 'Men’s mental health',
    name: 'Andy’s Man Club',
    body: 'Free peer-support groups for men. It’s okay to talk.',
    url: 'https://andysmanclub.co.uk/',
  },
  {
    topic: 'Cancer',
    name: 'Macmillan Cancer Support',
    body: 'Help with the medical, emotional and financial side of cancer.',
    url: 'https://www.macmillan.org.uk/',
  },
  {
    topic: 'Veterans',
    name: 'Combat Stress',
    body: 'Mental-health support for former members of the armed forces.',
    url: 'https://combatstress.org.uk/',
  },
  {
    topic: 'Suicide prevention',
    name: 'The Calm Zone (CALM)',
    body: 'Support for anyone who is struggling or feeling suicidal.',
    url: 'https://www.thecalmzone.net/',
  },
  {
    topic: 'Money, work and legal',
    name: 'Citizens Advice',
    body: 'Free, independent advice on money, work, housing and the law.',
    url: 'https://www.citizensadvice.org.uk/',
  },
  {
    topic: 'Someone to talk to',
    name: 'Samaritans',
    body: 'Call 116 123 free, 24 hours a day, 365 days a year.',
    url: 'https://www.samaritans.org/',
  },
];
