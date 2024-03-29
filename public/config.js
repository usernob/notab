window.CONFIG = {
  commandPathDelimiter: '/',
  commandSearchDelimiter: ' ',
  defaultSearchTemplate: 'https://duckduckgo.com/?q={}',
  openLinksInNewTab: false,
  suggestionLimit: 4,
  commands: {
    a: { name: 'Chat', url: 'https://chat.openai.com' },
    b: { name: 'Dribbble', url: 'https://dribbble.com/shots/recent' },
    c: { name: 'Calendar', url: 'https://calendar.google.com' },
    d: { name: 'Drive', url: 'https://drive.google.com' },
    f: { name: 'Figma', url: 'https://www.figma.com' },
    g: { name: 'GitHub', url: 'https://github.com' },
    k: { name: 'Keep', url: 'https://keep.google.com' },
    m: { name: 'Mail', url: 'https://mail.proton.me/u/0/inbox' },
    n: { name: 'Notion', url: 'https://www.notion.so' },
    p: { name: 'Pomodoro', url: 'https://pomodoro.xvvvyz.xyz' },
    r: {
      name: 'Reddit',
      suggestions: ['r/r/webdev', 'r/r/dataisbeautiful', 'r/r/fujix', 'r/r/leetcode'],
      url: 'https://reddit.com',
    },
    t: { name: 'Translate', url: 'https://www.deepl.com/translator' },
    w: { name: 'WhatsApp', url: 'https://web.whatsapp.com' },
    y: {
      name: 'YouTube',
      searchTemplate: '/results?search_query={}',
      url: 'https://youtube.com/feed/subscriptions',
    },
    0: {
      name: 'localhost',
      searchTemplate: ':{}',
      suggestions: ['0 54323', '0 54324'],
      url: 'http://localhost:3000',
    },
    ym: {
      name: 'YT Music',
      url: 'https://music.youtube.com'
    }
  },
};
