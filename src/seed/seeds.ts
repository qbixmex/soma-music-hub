import { Category, EventSeed, UserSeed } from '../interfaces';

type SeedData = {
  users: UserSeed[];
  categories: Category[];
  events: EventSeed[];
};

const users: UserSeed[] = [
  {
    name: 'Daniel Gonzalez',
    email: 'daniel@gmail.com',
    emailVerified: new Date('2024-10-17T17:00:00.000Z'),
    password: '12345678',
    role: 'admin',
    image: 'daniel.jpg'
  },
  {
    name: 'Enrique Cordova',
    email: 'murcielago1008@gmail.com',
    emailVerified: new Date('2024-10-17T17:00:00.100Z'),
    password: '12345678',
    role: 'author',
    image: 'james.jpg'
  },
  {
    name: 'Leo',
    email: 'leo@gmail.com',
    emailVerified: new Date('2024-10-17T17:00:00.200Z'),
    password: '12345678',
    role: 'subscriber',
    image: 'leo.jpg'
  },
];

const categories: Category[] = [
  {
    name: "House",
    permalink: "house",
    description: "Is a style of electronic dance music characterized by a repetitive four-on-the-floor beat and a tempo of 120 to 130 beats per minute.",
  },
  {
    name: "Techno",
    permalink: "techno",
    description: "Is a genre of electronic dance music that is characterized by a repetitive four-on-the-floor beat which is generally produced for use in a continuous DJ set.",
  },
  {
    name: "Tech House",
    permalink: "tech-house",
    description: "Is a subgenre of house music that combines stylistic features of techno with house.",
  },
];

const events: EventSeed[] = [
  {
    title: "Haunting at heritage hall 2024 (Halloween Party)",
    permalink: "haunting-at-heritage-hall-2024",
    imageUrl: "halloween-party-2024.jpg",
    imagePublicId: "48d87f21-6c79-4f0c-b504-0aa5868268a2",
    description: "You're summoned to the 3rd Annual Haunting at Heritage Hall—where the ghosts are friendly, and the drinks are wicked!",
    category: "house",
    content: "Prepare for a night of bone-rattling beats and ghastly grooves! Our DJ lineup will be announced soon, but trust us, they'll be spinning tracks that are to die for!\nPresale Tickets Available Now!\nDon't wait until the witching hour—secure your spot for a night filled with mischief, mayhem, and maybe a few surprises that will haunt you in the best way possible.\nSo, dust off your broomsticks and don your most devilish attire. Whether you're a sultry vampire or a cheeky ghost, we want to see your best Halloween getup!",
    tags: ["techno"],
    author: "Daniel Gonzalez",
    publishedAt: "2024-10-17T17:15:08.735Z",
    robots: "index, follow"
  },
];

export const initialData: SeedData = {
  users,
  categories,
  events,
};
