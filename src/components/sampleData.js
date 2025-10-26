export const SAMPLE_SERIES = {
  id: 'series-1',
  title: 'Crimson Shards',
  author: 'A. Kuro',
  year: 2024,
  status: 'Ongoing',
  genres: ['Action', 'Fantasy', 'Adventure'],
  rating: 4.6,
  ratingBreakdown: [60, 25, 10, 4, 1],
  synopsis:
    'In a realm where ancient relics pulse with forbidden power, a wayward courier and a fallen knight are thrust together by fate. As fractured kingdoms collide, they must traverse haunted skylines and crystal deserts to gather the Crimson Shards — before a silent cabal reshapes destiny itself.',
  cover:
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1920&auto=format&fit=crop',
  chapters: [
    {
      id: 'ch-10',
      title: 'Chapter 10 · Ember Oath',
      date: '2025-10-05',
      images: [
        'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1920&auto=format&fit=crop',
      ],
    },
    {
      id: 'ch-9',
      title: 'Chapter 9 · Glass Choir',
      date: '2025-09-18',
      images: [
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1545972152-705f1074e5a0?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1920&auto=format&fit=crop',
      ],
    },
    {
      id: 'ch-8',
      title: 'Chapter 8 · Moonlit Vale',
      date: '2025-09-01',
      images: [
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1920&auto=format&fit=crop',
      ],
    },
  ],
};

export const MOCK_SERIES_LIST = [
  { id: 's1', title: 'Crimson Shards', author: 'A. Kuro', status: 'Ongoing', year: 2024, genres: ['Action', 'Fantasy'], views: 120340, cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format&fit=crop' },
  { id: 's2', title: 'Neon Echo', author: 'R. Sato', status: 'Completed', year: 2022, genres: ['Sci-Fi', 'Drama'], views: 90340, cover: 'https://images.unsplash.com/photo-1545972152-705f1074e5a0?q=80&w=600&auto=format&fit=crop' },
  { id: 's3', title: 'Moonlit Vale', author: 'E. Aria', status: 'Ongoing', year: 2025, genres: ['Fantasy'], views: 55010, cover: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop' },
  { id: 's4', title: 'Glass Garden', author: 'U. Ame', status: 'Completed', year: 2021, genres: ['Slice of Life'], views: 33400, cover: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=600&auto=format&fit=crop' },
];

export const MOCK_COMMENTS = [
  { id: 'c1', user: 'kuro', type: 'Comment', status: 'Pending', content: 'Love the pacing in this chapter!', series: 'Crimson Shards', chapter: '10', ts: '2025-10-10' },
  { id: 'c2', user: 'rei', type: 'Comment', status: 'Pending', content: 'Panel 3 has a typo.', series: 'Neon Echo', chapter: '9', ts: '2025-10-09' },
  { id: 'c3', user: 'nox', type: 'Series', status: 'Reviewed', content: 'Inaccurate tags', series: 'Moonlit Vale', chapter: '-', ts: '2025-10-08' },
];

export const MOCK_USERS = [
  { id: 'u1', name: 'Aiko', joined: '2024-09-03', badges: ['Early'], stats: { followed: 14, read: 380, comments: 45 } },
  { id: 'u2', name: 'Ren', joined: '2023-05-20', badges: ['Pro'], stats: { followed: 22, read: 1420, comments: 210 } },
];
