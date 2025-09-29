
import { User, UserRole, CourseModule, CourseContent, Quiz, Hazard, StudentReport, DrillScenario } from './types';

// Mock user data
export const MOCK_USERS: User[] = [
  { id: '2023UCB6056', name: 'Vanshita', role: UserRole.Student, avatar: 'https://picsum.photos/seed/STU123/200', xp: 750, level: 7 },
  { id: 'TEACHER101', name: 'Ms. Priya Singh', role: UserRole.Teacher, avatar: 'https://picsum.photos/seed/TEA456/200' },
  { id: 'ADMIN101', name: 'Principal Verma', role: UserRole.Administrator, avatar: 'https://picsum.photos/seed/ADM789/200' }
];

// Sidebar navigation links based on role
export const SIDEBAR_LINKS = {
  [UserRole.Student]: [
    { nameKey: 'sidebar.dashboard', path: '/dashboard' },
    { nameKey: 'sidebar.gyanKendra', path: '/gyan-kendra' },
    { nameKey: 'sidebar.abhyasArena', path: '/abhyas-arena' },
    { nameKey: 'sidebar.satarkHub', path: '/satark-hub' },
    { nameKey: 'sidebar.help', path: '/help' },
    { nameKey: 'sidebar.profile', path: '/profile' },
    { nameKey: 'sidebar.settings', path: '/settings' },
  ],
  [UserRole.Teacher]: [
    { nameKey: 'sidebar.dashboard', path: '/dashboard' },
    { nameKey: 'sidebar.gyanKendra', path: '/gyan-kendra' },
    { nameKey: 'sidebar.abhyasArena', path: '/abhyas-arena' },
    { nameKey: 'sidebar.satarkHub', path: '/satark-hub' },
    { nameKey: 'sidebar.help', path: '/help' },
    { nameKey: 'sidebar.profile', path: '/profile' },
    { nameKey: 'sidebar.settings', path: '/settings' },
  ],
  [UserRole.Administrator]: [
    { nameKey: 'sidebar.dashboard', path: '/dashboard' },
    { nameKey: 'sidebar.satarkHub', path: '/satark-hub' },
    { nameKey: 'sidebar.help', path: '/help' },
    { nameKey: 'sidebar.settings', path: '/settings' },
  ],
};


// NEW: Expanded Course Data for Gyan Kendra
export const GYAN_KENDRA_MODULES: CourseModule[] = [
  {
    slug: 'first-aid',
    title: 'First Aid Fundamentals',
    icon: 'Heart',
    shortDescription: 'Basic life-saving techniques for common injuries.',
    longDescription: 'This course provides essential first aid knowledge to handle emergencies effectively. Learn to assess situations, perform CPR, and manage common injuries like cuts, burns, and fractures until professional help arrives.',
    keyTopics: ['Assessing a Scene', 'Cardiopulmonary Resuscitation (CPR)', 'Wound Care', 'Handling Fractures', 'Burn Management'],
    youtubeUrl: 'https://youtu.be/0JHNvpQ9JW8?si=xlp4s-In3jpNp3sD'
  },
  {
    slug: 'earthquake-preparedness',
    title: 'Earthquake Preparedness',
    icon: 'Globe',
    shortDescription: 'Learn how to stay safe before, during, and after an earthquake.',
    longDescription: 'Earthquakes can strike without warning. This module teaches you how to prepare your home, what to do during the shaking (Drop, Cover, and Hold On), and how to navigate the aftermath safely.',
    keyTopics: ['Creating a Family Emergency Plan', 'Securing Your Space', 'Drop, Cover, and Hold On', 'Post-Earthquake Safety Checks', 'Assembling a Survival Kit'],
    youtubeUrl: 'https://youtu.be/gd7j0iA9eME?si=aC0Z-H9VMx5WWOt2'
  },
  {
    slug: 'flood-safety',
    title: 'Flood Safety',
    icon: 'Droplet',
    shortDescription: 'Essential techniques for flood-prone areas and emergency response.',
    longDescription: 'Floods are one of the most common natural disasters. Understand flood alerts, learn how to prepare your property, and master the crucial rule: Turn Around, Don’t Drown. This course covers both pre-flood preparation and post-flood recovery.',
    keyTopics: ['Understanding Flood Warnings', 'Evacuation Routes & Procedures', 'Protecting Your Home', 'Water Contamination Safety', 'Post-Flood Recovery Steps'],
    videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4'
  },
  {
    slug: 'fire-safety',
    title: 'Fire Safety & Prevention',
    icon: 'Flame',
    shortDescription: 'Understanding fire hazards, prevention methods, and evacuation procedures.',
    longDescription: 'Learn to identify common fire hazards in your home and school. This course covers the basics of fire prevention, the use of fire extinguishers (P.A.S.S. technique), and how to create and practice a fire escape plan.',
    keyTopics: ['Identifying Fire Hazards', 'Using a Fire Extinguisher', 'Creating an Escape Plan', 'Smoke Alarm Maintenance', 'Kitchen Fire Safety'],
    youtubeUrl: 'https://youtu.be/3Z-NNXjwQv0?si=bScgqCMlBzlHB629'
  },
  {
    slug: 'cyclone-response',
    title: 'Cyclone Alert & Response',
    icon: 'Wind',
    shortDescription: 'Preparing for cyclones and knowing what to do when one hits.',
    longDescription: 'This module focuses on the unique challenges posed by cyclones. Learn to interpret cyclone warnings, secure your property against high winds and storm surges, and understand the importance of emergency shelters.',
    keyTopics: ['Cyclone Warning Systems', 'Securing Doors and Windows', 'Emergency Kit for Cyclones', 'Navigating Storm Surges', 'Post-Cyclone Dangers'],
    youtubeUrl: 'https://youtu.be/HDJSj-cpRnM?si=Fy0MT4T6CB4NkwWS'
  },
  {
    slug: 'search-and-rescue',
    title: 'Basic Search and Rescue',
    icon: 'LifeBuoy',
    shortDescription: 'Introductory skills for locating and assisting victims in emergencies.',
    longDescription: 'In the critical moments after a disaster, basic search and rescue skills can save lives. This introductory course covers safe methods for searching for victims, asekhar lifting heavy objects, and creating safe pathways for evacuation.',
    keyTopics: ['Assessing Structural Integrity', 'Search Patterns', 'Safe Lifting Techniques', 'Communicating with Victims', 'Triage Basics'],
    videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4'
  }
];

// List of Quizzes/Games for Assignments
export const AVAILABLE_QUIZZES = [
  { id: 'safety-quiz', title: 'General Safety Quiz' },
  { id: 'hazard-hunt', title: 'Hazard Hunt Game' },
  { id: 'scenario-mcqs', title: 'Disaster Scenario MCQs' },
  { id: 'first-aid-match', title: 'First-Aid Match Game' },
];

// NEW: Content for Dedicated Course Pages
export const COURSE_CONTENT: CourseContent[] = [
  {
    id: 'first-aid',
    title: 'First Aid Fundamentals',
    sections: [
      {
        title: 'Module 1: Assessing the Situation',
        content: 'Before providing any help, you must ensure the scene is safe for you and the victim. Check for any hazards like traffic, fire, or unstable structures. Then, check the person for responsiveness. Tap their shoulder and shout, "Are you okay?". If there is no response, call for emergency medical services immediately.',
        image: 'https://picsum.photos/seed/firstaid1/800/400'
      },
      {
        title: 'Module 2: CPR Techniques (Cardiopulmonary Resuscitation)',
        content: 'CPR is a life-saving technique used when someone\'s breathing or heartbeat has stopped. It involves chest compressions and rescue breaths. For an adult, place the heel of one hand in the center of the chest, place your other hand on top, and interlock your fingers. Push hard and fast, at a rate of 100-120 compressions per minute. After 30 compressions, give 2 rescue breaths if you are trained and willing.',
        image: 'https://picsum.photos/seed/firstaid2/800/400'
      },
      {
        title: 'Module 3: Managing Bleeding and Wounds',
        content: 'For minor cuts, wash the area with soap and water and apply an antiseptic ointment and bandage. For severe bleeding, apply direct, firm pressure to the wound using a clean cloth or bandage. If possible, elevate the injured limb above the heart. Do not remove any object that is impaled in the wound; instead, stabilize it and seek immediate medical help.',
      }
    ],
    readMoreUrl: 'https://www.verywellhealth.com/basic-first-aid-procedures-1298578',
  },
  // Add placeholder content for other courses
  {
    id: 'earthquake-preparedness',
    title: 'Earthquake Preparedness',
    sections: [
      {
        title: 'Module 1: Before the Earthquake',
        content: 'Secure heavy furniture to walls. Prepare an emergency kit with water, food, flashlight, and first-aid supplies. Make a family communication plan.',
        image: 'https://picsum.photos/seed/eq1/800/400'
      },
      {
        title: 'Module 2: During the Earthquake',
        content: 'Drop, Cover, and Hold On! Get under a sturdy table or desk. Stay away from windows, and outside walls. If you are outdoors, stay in an open area away from buildings and power lines.',
        image: 'https://picsum.photos/seed/eq2/800/400'
      }
    ],
    readMoreUrl: 'https://www.ready.gov/sites/default/files/2024-03/ready.gov_earthquake_hazard-info-sheet.pdf',
  },
    {
    id: 'flood-safety',
    title: 'Flood Safety',
    sections: [
      {
        title: 'Module 1: Before the Flood',
        content: 'Know your risk & routes — Check local flood zones and safe evacuation routes. Prepare an emergency kit — water (3 days), canned food, torch, power bank, important docs in waterproof pouch. Home safety steps — move valuables to higher shelves, install non-return valves, keep a grab-and-go bag. Activity: Mark nearest high ground and design a family meeting point.',
        image: 'https://picsum.photos/seed/eq1/800/400'
      },
      {
        title: 'Module 2: During the Flood',
        content: 'If inside: Move to the highest safe floor; do not walk through moving water. If outdoors / driving: Avoid floodwaters; do not drive through flooded roads (6 inches can sweep you). Electric & gas safety: Turn off utilities if instructed and avoid electrical equipment in water',
        image: 'https://picsum.photos/seed/eq2/800/400'
      },
      {
        title: 'Module 3 — After the Flood',
        content: 'Health & hygiene: Avoid contaminated water; boil drinking water or use purification tablets. Inspect safely: Watch for structural damage, gas leaks, and mould; use torch, not candles, if smell of gas. Recovery steps: Document damage for insurance, contact local authorities for shelter/aid.',
        image: 'https://picsum.photos/seed/eq2/800/400'
      }
    ],
    readMoreUrl:'https://www.weather.gov/media/owlie/FloodSafety-OnePager-11-29-2018.pdf'
  },
  {
    id: 'fire-safety',
    title: 'Fire Safety & Prevention',
    sections: [{ title: 'Module 1: P.A.S.S. Technique', content: 'To use a fire extinguisher, remember P.A.S.S.: Pull the pin. Aim at the base of the fire. Squeeze the lever. Sweep from side to side.' }],
    readMoreUrl:'https://gidm.gujarat.gov.in/sites/default/files/handbook-english.pdf?download=true&utm_source=chatgpt.com'
  },
  {
    id: 'cyclone-response',
    title: 'Cyclone Alert & Response',
    sections: [
      { 
        title: 'Module 1: Before the Cyclone', 
        content: 'Track official weather updates (IMD alerts, radio, mobile apps). Secure windows/doors, reinforce roof, store drinking water. Prepare emergency kit: torch, dry food, medicines, power bank, important documents in waterproof bag.' 
      },
      { 
        title: 'Module 2: During the Cyclone', 
        content: 'Stay indoors, away from windows and glass. Disconnect electrical appliances; keep emergency lights ready. Evacuate calmly if advised by authorities.' 
      },
      { 
        title: 'Module 3: After the Cyclone', 
        content: 'Avoid fallen power lines and flooded areas. Drink boiled/purified water only; prevent mosquito breeding. Assist neighbours, check local announcements for relief.' 
      }
    ],
    readMoreUrl:'https://nidm.gov.in/PDF/Modules/TM_Cyclone_NIDM24.pdf?utm_source=chatgpt.com',
  },
  {
    id: 'search-and-rescue',
    title: 'Basic Search and Rescue',
    sections: [{ title: 'Module 1: Safety First', content: 'Always prioritize your own safety when attempting a rescue. Never enter an unstable building. Work in teams and let others know where you are going.' }],
    readMoreUrl:'https://nzsar.govt.nz/nzs-sar/nzs-sar-guidelines-overview#:~:text=These%20guidelines%20explain%20the%20five,Planning%2C%20Operations%2C%20and%20Conclusion',
  }
];

// NEW: Safety Quizzes categorized by disaster (using i18n keys)
export const SAFETY_QUIZZES: { [key: string]: Quiz } = {
  earthquake: {
    id: 'safety-quiz-earthquake',
    title: 'games.safetyQuiz.categories.earthquake.title',
    questions: [
      {
        question: 'games.safetyQuiz.categories.earthquake.questions.0.question',
        options: [
          'games.safetyQuiz.categories.earthquake.questions.0.options.0',
          'games.safetyQuiz.categories.earthquake.questions.0.options.1',
          'games.safetyQuiz.categories.earthquake.questions.0.options.2',
          'games.safetyQuiz.categories.earthquake.questions.0.options.3'
        ],
        correctAnswer: 'games.safetyQuiz.categories.earthquake.questions.0.options.2'
      },
      {
        question: 'games.safetyQuiz.categories.earthquake.questions.1.question',
        options: [
          'games.safetyQuiz.categories.earthquake.questions.1.options.0',
          'games.safetyQuiz.categories.earthquake.questions.1.options.1',
          'games.safetyQuiz.categories.earthquake.questions.1.options.2',
          'games.safetyQuiz.categories.earthquake.questions.1.options.3'
        ],
        correctAnswer: 'games.safetyQuiz.categories.earthquake.questions.1.options.1'
      },
      {
        question: 'games.safetyQuiz.categories.earthquake.questions.2.question',
        options: [
          'games.safetyQuiz.categories.earthquake.questions.2.options.0',
          'games.safetyQuiz.categories.earthquake.questions.2.options.1',
          'games.safetyQuiz.categories.earthquake.questions.2.options.2',
          'games.safetyQuiz.categories.earthquake.questions.2.options.3'
        ],
        correctAnswer: 'games.safetyQuiz.categories.earthquake.questions.2.options.2'
      },
      {
        question: 'games.safetyQuiz.categories.earthquake.questions.3.question',
        options: [
          'games.safetyQuiz.categories.earthquake.questions.3.options.0',
          'games.safetyQuiz.categories.earthquake.questions.3.options.1',
          'games.safetyQuiz.categories.earthquake.questions.3.options.2',
          'games.safetyQuiz.categories.earthquake.questions.3.options.3'
        ],
        correctAnswer: 'games.safetyQuiz.categories.earthquake.questions.3.options.2'
      }
    ]
  },
  flood: {
    id: 'safety-quiz-flood',
    title: 'games.safetyQuiz.categories.flood.title',
    questions: [
      {
        question: 'games.safetyQuiz.categories.flood.questions.0.question',
        options: [
          'games.safetyQuiz.categories.flood.questions.0.options.0',
          'games.safetyQuiz.categories.flood.questions.0.options.1',
          'games.safetyQuiz.categories.flood.questions.0.options.2',
          'games.safetyQuiz.categories.flood.questions.0.options.3'
        ],
        correctAnswer: 'games.safetyQuiz.categories.flood.questions.0.options.2'
      },
      {
        question: 'games.safetyQuiz.categories.flood.questions.1.question',
        options: [
          'games.safetyQuiz.categories.flood.questions.1.options.0',
          'games.safetyQuiz.categories.flood.questions.1.options.1',
          'games.safetyQuiz.categories.flood.questions.1.options.2',
          'games.safetyQuiz.categories.flood.questions.1.options.3'
        ],
        correctAnswer: 'games.safetyQuiz.categories.flood.questions.1.options.1'
      },
      {
        question: 'games.safetyQuiz.categories.flood.questions.2.question',
        options: [
          'games.safetyQuiz.categories.flood.questions.2.options.0',
          'games.safetyQuiz.categories.flood.questions.2.options.1',
          'games.safetyQuiz.categories.flood.questions.2.options.2',
          'games.safetyQuiz.categories.flood.questions.2.options.3'
        ],
        correctAnswer: 'games.safetyQuiz.categories.flood.questions.2.options.1'
      },
      {
        question: 'games.safetyQuiz.categories.flood.questions.3.question',
        options: [
          'games.safetyQuiz.categories.flood.questions.3.options.0',
          'games.safetyQuiz.categories.flood.questions.3.options.1',
          'games.safetyQuiz.categories.flood.questions.3.options.2',
          'games.safetyQuiz.categories.flood.questions.3.options.3'
        ],
        correctAnswer: 'games.safetyQuiz.categories.flood.questions.3.options.1'
      }
    ]
  },
  fire: {
    id: 'safety-quiz-fire',
    title: 'games.safetyQuiz.categories.fire.title',
    questions: [
      {
        question: 'games.safetyQuiz.categories.fire.questions.0.question',
        options: [
          'games.safetyQuiz.categories.fire.questions.0.options.0',
          'games.safetyQuiz.categories.fire.questions.0.options.1',
          'games.safetyQuiz.categories.fire.questions.0.options.2',
          'games.safetyQuiz.categories.fire.questions.0.options.3'
        ],
        correctAnswer: 'games.safetyQuiz.categories.fire.questions.0.options.1'
      },
      {
        question: 'games.safetyQuiz.categories.fire.questions.1.question',
        options: [
          'games.safetyQuiz.categories.fire.questions.1.options.0',
          'games.safetyQuiz.categories.fire.questions.1.options.1',
          'games.safetyQuiz.categories.fire.questions.1.options.2',
          'games.safetyQuiz.categories.fire.questions.1.options.3'
        ],
        correctAnswer: 'games.safetyQuiz.categories.fire.questions.1.options.1'
      },
      {
        question: 'games.safetyQuiz.categories.fire.questions.2.question',
        options: [
          'games.safetyQuiz.categories.fire.questions.2.options.0',
          'games.safetyQuiz.categories.fire.questions.2.options.1',
          'games.safetyQuiz.categories.fire.questions.2.options.2',
          'games.safetyQuiz.categories.fire.questions.2.options.3'
        ],
        correctAnswer: 'games.safetyQuiz.categories.fire.questions.2.options.2'
      },
      {
        question: 'games.safetyQuiz.categories.fire.questions.3.question',
        options: [
          'games.safetyQuiz.categories.fire.questions.3.options.0',
          'games.safetyQuiz.categories.fire.questions.3.options.1',
          'games.safetyQuiz.categories.fire.questions.3.options.2',
          'games.safetyQuiz.categories.fire.questions.3.options.3'
        ],
        correctAnswer: 'games.safetyQuiz.categories.fire.questions.3.options.2'
      }
    ]
  }
};


// NEW: Scenario MCQs categorized by disaster
export const SCENARIO_MCQS: { [key: string]: Quiz } = {
  earthquake: {
    id: 'scenarios-101-earthquake',
    title: 'games.scenarioMcqs.categories.earthquake.title',
    questions: [
      { question: "games.scenarioMcqs.scenarios.q1.question", options: ["games.scenarioMcqs.scenarios.q1.options.0", "games.scenarioMcqs.scenarios.q1.options.1", "games.scenarioMcqs.scenarios.q1.options.2", "games.scenarioMcqs.scenarios.q1.options.3"], correctAnswer: "games.scenarioMcqs.scenarios.q1.options.1", explanation: "games.scenarioMcqs.scenarios.q1.explanation" },
      { question: "games.scenarioMcqs.scenarios.q4.question", options: ["games.scenarioMcqs.scenarios.q4.options.0", "games.scenarioMcqs.scenarios.q4.options.1", "games.scenarioMcqs.scenarios.q4.options.2", "games.scenarioMcqs.scenarios.q4.options.3"], correctAnswer: "games.scenarioMcqs.scenarios.q4.options.3", explanation: "games.scenarioMcqs.scenarios.q4.explanation" },
      { question: "games.scenarioMcqs.scenarios.earthquake.q1.question", options: ["games.scenarioMcqs.scenarios.earthquake.q1.options.0", "games.scenarioMcqs.scenarios.earthquake.q1.options.1", "games.scenarioMcqs.scenarios.earthquake.q1.options.2"], correctAnswer: "games.scenarioMcqs.scenarios.earthquake.q1.options.2", explanation: "games.scenarioMcqs.scenarios.earthquake.q1.explanation" }
    ]
  },
  flood: {
    id: 'scenarios-101-flood',
    title: 'games.scenarioMcqs.categories.flood.title',
    questions: [
      { question: "games.scenarioMcqs.scenarios.q3.question", options: ["games.scenarioMcqs.scenarios.q3.options.0", "games.scenarioMcqs.scenarios.q3.options.1", "games.scenarioMcqs.scenarios.q3.options.2", "games.scenarioMcqs.scenarios.q3.options.3"], correctAnswer: "games.scenarioMcqs.scenarios.q3.options.0", explanation: "games.scenarioMcqs.scenarios.q3.explanation" },
      { question: "games.scenarioMcqs.scenarios.flood.q1.question", options: ["games.scenarioMcqs.scenarios.flood.q1.options.0", "games.scenarioMcqs.scenarios.flood.q1.options.1", "games.scenarioMcqs.scenarios.flood.q1.options.2"], correctAnswer: "games.scenarioMcqs.scenarios.flood.q1.options.0", explanation: "games.scenarioMcqs.scenarios.flood.q1.explanation" }
    ]
  },
  fire: {
    id: 'scenarios-101-fire',
    title: 'games.scenarioMcqs.categories.fire.title',
    questions: [
      { question: "games.scenarioMcqs.scenarios.q2.question", options: ["games.scenarioMcqs.scenarios.q2.options.0", "games.scenarioMcqs.scenarios.q2.options.1", "games.scenarioMcqs.scenarios.q2.options.2", "games.scenarioMcqs.scenarios.q2.options.3"], correctAnswer: "games.scenarioMcqs.scenarios.q2.options.2", explanation: "games.scenarioMcqs.scenarios.q2.explanation" },
      { question: "games.scenarioMcqs.scenarios.fire.q1.question", options: ["games.scenarioMcqs.scenarios.fire.q1.options.0", "games.scenarioMcqs.scenarios.fire.q1.options.1", "games.scenarioMcqs.scenarios.fire.q1.options.2"], correctAnswer: "games.scenarioMcqs.scenarios.fire.q1.options.1", explanation: "games.scenarioMcqs.scenarios.fire.q1.explanation" }
    ]
  }
};


// Hazard Hunt Game Data for the new image (1536x1024)
// Coordinates and radius are converted to percentages for responsive scaling.
const naturalImageWidth = 1536;
const naturalImageHeight = 1024;
const hazardRadius = 40; // Clickable radius in pixels

export const HAZARD_HUNT_DATA: Hazard[] = [
  {
    id: "wire",
    label: "Loose Electrical Wire",
    x: (350 / naturalImageWidth) * 100,
    y: (750 / naturalImageHeight) * 100,
    radius: (hazardRadius / naturalImageWidth) * 100,
    tipKey: "games.hazardHunt.tips.wire"
  },
  {
    id: "exit",
    label: "Blocked Exit Door",
    x: (120 / naturalImageWidth) * 100,
    y: (220 / naturalImageHeight) * 100,
    radius: (hazardRadius / naturalImageWidth) * 100,
    tipKey: "games.hazardHunt.tips.exit"
  },
  {
    id: "bag",
    label: "Unattended Bag",
    x: (700 / naturalImageWidth) * 100,
    y: (780 / naturalImageHeight) * 100,
    radius: (hazardRadius / naturalImageWidth) * 100,
    tipKey: "games.hazardHunt.tips.bag"
  },
  {
    id: "glass",
    label: "Broken Window Glass",
    x: (1250 / naturalImageWidth) * 100,
    y: (300 / naturalImageHeight) * 100,
    radius: (hazardRadius / naturalImageWidth) * 100,
    tipKey: "games.hazardHunt.tips.glass"
  },
  {
    id: "socket",
    label: "Overloaded Power Socket",
    x: (1350 / naturalImageWidth) * 100,
    y: (570 / naturalImageHeight) * 100,
    radius: (hazardRadius / naturalImageWidth) * 100,
    tipKey: "games.hazardHunt.tips.socket"
  }
];

// First-Aid Match Game Data
export const FIRST_AID_PAIRS = [
    {
        id: 'fa-1',
        situation: 'games.firstAidMatch.pairs.s1',
        response: 'games.firstAidMatch.pairs.r1',
    },
    {
        id: 'fa-2',
        situation: 'games.firstAidMatch.pairs.s2',
        response: 'games.firstAidMatch.pairs.r2',
    },
    {
        id: 'fa-3',
        situation: 'games.firstAidMatch.pairs.s3',
        response: 'games.firstAidMatch.pairs.r3',
    },
    {
        id: 'fa-4',
        situation: 'games.firstAidMatch.pairs.s4',
        response: 'games.firstAidMatch.pairs.r4',
    },
    {
        id: 'fa-5',
        situation: 'games.firstAidMatch.pairs.s5',
        response: 'games.firstAidMatch.pairs.r5',
    },
    {
        id: 'fa-6',
        situation: 'games.firstAidMatch.pairs.s6',
        response: 'games.firstAidMatch.pairs.r6',
    },
];

// --- VIRTUAL DRILL SCENARIOS ---
const EARTHQUAKE_DRILL_SCENARIO: DrillScenario = {
  id: 'earthquake-library-drill',
  titleKey: 'games.virtualDrill.earthquakeDrill.title',
  scenario: [
    {
      step: 0,
      situationKey: 'games.virtualDrill.earthquakeDrill.steps.0.situation',
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2070&auto=format&fit=crop',
      options: [
        { textKey: 'games.virtualDrill.earthquakeDrill.steps.0.options.0', isCorrect: false, feedbackKey: 'games.virtualDrill.earthquakeDrill.steps.0.feedback.0' },
        { textKey: 'games.virtualDrill.earthquakeDrill.steps.0.options.1', isCorrect: true, feedbackKey: 'games.virtualDrill.earthquakeDrill.steps.0.feedback.1' },
        { textKey: 'games.virtualDrill.earthquakeDrill.steps.0.options.2', isCorrect: false, feedbackKey: 'games.virtualDrill.earthquakeDrill.steps.0.feedback.2' }
      ]
    },
    {
      step: 1,
      situationKey: 'games.virtualDrill.earthquakeDrill.steps.1.situation',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop',
      options: [
        { textKey: 'games.virtualDrill.earthquakeDrill.steps.1.options.0', isCorrect: false, feedbackKey: 'games.virtualDrill.earthquakeDrill.steps.1.feedback.0' },
        { textKey: 'games.virtualDrill.earthquakeDrill.steps.1.options.1', isCorrect: true, feedbackKey: 'games.virtualDrill.earthquakeDrill.steps.1.feedback.1' },
        { textKey: 'games.virtualDrill.earthquakeDrill.steps.1.options.2', isCorrect: false, feedbackKey: 'games.virtualDrill.earthquakeDrill.steps.1.feedback.2' }
      ]
    },
    {
      step: 2,
      situationKey: 'games.virtualDrill.earthquakeDrill.steps.2.situation',
      image: 'https://images.unsplash.com/photo-1612282208643-3e1a5a0b3e6c?q=80&w=2070&auto=format&fit=crop',
      options: [
        { textKey: 'games.virtualDrill.earthquakeDrill.steps.2.options.0', isCorrect: true, feedbackKey: 'games.virtualDrill.earthquakeDrill.steps.2.feedback.0' },
        { textKey: 'games.virtualDrill.earthquakeDrill.steps.2.options.1', isCorrect: false, feedbackKey: 'games.virtualDrill.earthquakeDrill.steps.2.feedback.1' },
        { textKey: 'games.virtualDrill.earthquakeDrill.steps.2.options.2', isCorrect: false, feedbackKey: 'games.virtualDrill.earthquakeDrill.steps.2.feedback.2' }
      ]
    },
    {
      step: 3,
      situationKey: 'games.virtualDrill.earthquakeDrill.steps.3.situation',
      image: 'https://images.unsplash.com/photo-1567593810070-7a8bab19ee18?q=80&w=1932&auto=format&fit=crop',
      options: [
        { textKey: 'games.virtualDrill.earthquakeDrill.steps.3.options.0', isCorrect: false, feedbackKey: 'games.virtualDrill.earthquakeDrill.steps.3.feedback.0' },
        { textKey: 'games.virtualDrill.earthquakeDrill.steps.3.options.1', isCorrect: false, feedbackKey: 'games.virtualDrill.earthquakeDrill.steps.3.feedback.1' },
        { textKey: 'games.virtualDrill.earthquakeDrill.steps.3.options.2', isCorrect: true, feedbackKey: 'games.virtualDrill.earthquakeDrill.steps.3.feedback.2' }
      ]
    }
  ]
};

const FIRE_DRILL_SCENARIO: DrillScenario = {
  id: 'fire-cafeteria-drill',
  titleKey: 'games.virtualDrill.fireDrill.title',
  scenario: [
    {
      step: 0,
      situationKey: 'games.virtualDrill.fireDrill.steps.0.situation',
      image: 'https://images.unsplash.com/photo-1588072432904-880af182c36f?q=80&w=2070&auto=format&fit=crop',
      options: [
        { textKey: 'games.virtualDrill.fireDrill.steps.0.options.0', isCorrect: true, feedbackKey: 'games.virtualDrill.fireDrill.steps.0.feedback.0' },
        { textKey: 'games.virtualDrill.fireDrill.steps.0.options.1', isCorrect: false, feedbackKey: 'games.virtualDrill.fireDrill.steps.0.feedback.1' },
        { textKey: 'games.virtualDrill.fireDrill.steps.0.options.2', isCorrect: false, feedbackKey: 'games.virtualDrill.fireDrill.steps.0.feedback.2' }
      ]
    },
    {
      step: 1,
      situationKey: 'games.virtualDrill.fireDrill.steps.1.situation',
      image: 'https://images.unsplash.com/photo-1566089362422-4a5c53140224?q=80&w=1974&auto=format&fit=crop',
      options: [
        { textKey: 'games.virtualDrill.fireDrill.steps.1.options.0', isCorrect: false, feedbackKey: 'games.virtualDrill.fireDrill.steps.1.feedback.0' },
        { textKey: 'games.virtualDrill.fireDrill.steps.1.options.1', isCorrect: true, feedbackKey: 'games.virtualDrill.fireDrill.steps.1.feedback.1' },
        { textKey: 'games.virtualDrill.fireDrill.steps.1.options.2', isCorrect: false, feedbackKey: 'games.virtualDrill.fireDrill.steps.1.feedback.2' }
      ]
    },
    {
      step: 2,
      situationKey: 'games.virtualDrill.fireDrill.steps.2.situation',
      image: 'https://images.unsplash.com/photo-1587974955562-841913165b44?q=80&w=1974&auto=format&fit=crop',
      options: [
        { textKey: 'games.virtualDrill.fireDrill.steps.2.options.0', isCorrect: false, feedbackKey: 'games.virtualDrill.fireDrill.steps.2.feedback.0' },
        { textKey: 'games.virtualDrill.fireDrill.steps.2.options.1', isCorrect: true, feedbackKey: 'games.virtualDrill.fireDrill.steps.2.feedback.1' },
        { textKey: 'games.virtualDrill.fireDrill.steps.2.options.2', isCorrect: false, feedbackKey: 'games.virtualDrill.fireDrill.steps.2.feedback.2' }
      ]
    },
  ]
};

const FLOOD_DRILL_SCENARIO: DrillScenario = {
  id: 'flood-school-drill',
  titleKey: 'games.virtualDrill.floodDrill.title',
  scenario: [
    {
      step: 0,
      situationKey: 'games.virtualDrill.floodDrill.steps.0.situation',
      image: 'https://images.unsplash.com/photo-1519694483-37b37d575e92?q=80&w=2070&auto=format&fit=crop',
      options: [
        { textKey: 'games.virtualDrill.floodDrill.steps.0.options.0', isCorrect: false, feedbackKey: 'games.virtualDrill.floodDrill.steps.0.feedback.0' },
        { textKey: 'games.virtualDrill.floodDrill.steps.0.options.1', isCorrect: true, feedbackKey: 'games.virtualDrill.floodDrill.steps.0.feedback.1' },
        { textKey: 'games.virtualDrill.floodDrill.steps.0.options.2', isCorrect: false, feedbackKey: 'games.virtualDrill.floodDrill.steps.0.feedback.2' }
      ]
    },
    {
      step: 1,
      situationKey: 'games.virtualDrill.floodDrill.steps.1.situation',
      image: 'https://images.unsplash.com/photo-1554240333-f78326a1b22e?q=80&w=1968&auto=format&fit=crop',
      options: [
        { textKey: 'games.virtualDrill.floodDrill.steps.1.options.0', isCorrect: false, feedbackKey: 'games.virtualDrill.floodDrill.steps.1.feedback.0' },
        { textKey: 'games.virtualDrill.floodDrill.steps.1.options.1', isCorrect: true, feedbackKey: 'games.virtualDrill.floodDrill.steps.1.feedback.1' },
      ]
    },
    {
      step: 2,
      situationKey: 'games.virtualDrill.floodDrill.steps.2.situation',
      image: 'https://images.unsplash.com/photo-1616723284523-26a99b457367?q=80&w=2070&auto=format&fit=crop',
      options: [
        { textKey: 'games.virtualDrill.floodDrill.steps.2.options.0', isCorrect: true, feedbackKey: 'games.virtualDrill.floodDrill.steps.2.feedback.0' },
        { textKey: 'games.virtualDrill.floodDrill.steps.2.options.1', isCorrect: false, feedbackKey: 'games.virtualDrill.floodDrill.steps.2.feedback.1' },
        { textKey: 'games.virtualDrill.floodDrill.steps.2.options.2', isCorrect: false, feedbackKey: 'games.virtualDrill.floodDrill.steps.2.feedback.2' }
      ]
    },
  ]
};


export const VIRTUAL_DRILLS: DrillScenario[] = [
  EARTHQUAKE_DRILL_SCENARIO,
  FIRE_DRILL_SCENARIO,
  FLOOD_DRILL_SCENARIO
];


// --- CHATBOT DATA STRUCTURE ---
export interface ChatbotPrompt {
  id: string;
  question: string; // translation key
  answer: string;   // translation key
  followUpIds?: string[]; // IDs of other prompts
}

export const CHATBOT_DATA: { [key: string]: ChatbotPrompt } = {
  // --- Special node for initial prompts ---
  initial: {
    id: 'initial',
    question: '', // Not displayed
    answer: 'chatbot.welcomeMessage',
    followUpIds: ['q_disaster_prep', 'q_first_aid', 'q_abhyas_arena', 'q_ar_drill'],
  },

  // --- Top Level Questions ---
  q_disaster_prep: {
    id: 'q_disaster_prep',
    question: 'chatbot.prompts.q_disaster_prep.question',
    answer: 'chatbot.prompts.q_disaster_prep.answer',
    followUpIds: ['q_earthquake_specific', 'q_flood_specific', 'q_first_aid', 'initial_prompts_link'],
  },
  q_first_aid: {
    id: 'q_first_aid',
    question: 'chatbot.prompts.q_first_aid.question',
    answer: 'chatbot.prompts.q_first_aid.answer',
    followUpIds: ['q_first_aid_burns', 'q_first_aid_choking', 'q_disaster_prep', 'initial_prompts_link'],
  },
  q_abhyas_arena: {
    id: 'q_abhyas_arena',
    question: 'chatbot.prompts.q_abhyas_arena.question',
    answer: 'chatbot.prompts.q_abhyas_arena.answer',
    followUpIds: ['q_ar_drill', 'q_gamification', 'q_satark_hub', 'initial_prompts_link'],
  },
  q_ar_drill: {
      id: 'q_ar_drill',
      question: 'chatbot.prompts.q_ar_drill.question',
      answer: 'chatbot.prompts.q_ar_drill.answer',
      followUpIds: ['q_abhyas_arena', 'q_earthquake_specific', 'initial_prompts_link'],
  },
  
  // --- Follow-up Questions ---
  q_earthquake_specific: {
    id: 'q_earthquake_specific',
    question: 'chatbot.prompts.q_earthquake_specific.question',
    answer: 'chatbot.prompts.q_earthquake_specific.answer',
    followUpIds: ['q_flood_specific', 'q_fire_specific', 'initial_prompts_link'],
  },
  q_flood_specific: {
    id: 'q_flood_specific',
    question: 'chatbot.prompts.q_flood_specific.question',
    answer: 'chatbot.prompts.q_flood_specific.answer',
    followUpIds: ['q_earthquake_specific', 'q_fire_specific', 'initial_prompts_link'],
  },
  q_fire_specific: {
    id: 'q_fire_specific',
    question: 'chatbot.prompts.q_fire_specific.question',
    answer: 'chatbot.prompts.q_fire_specific.answer',
    followUpIds: ['q_earthquake_specific', 'q_flood_specific', 'initial_prompts_link'],
  },
  q_first_aid_burns: {
      id: 'q_first_aid_burns',
      question: 'chatbot.prompts.q_first_aid_burns.question',
      answer: 'chatbot.prompts.q_first_aid_burns.answer',
      followUpIds: ['q_first_aid_choking', 'q_first_aid', 'initial_prompts_link'],
  },
  q_first_aid_choking: {
      id: 'q_first_aid_choking',
      question: 'chatbot.prompts.q_first_aid_choking.question',
      answer: 'chatbot.prompts.q_first_aid_choking.answer',
      followUpIds: ['q_first_aid_burns', 'q_first_aid', 'initial_prompts_link'],
  },
  q_gamification: {
    id: 'q_gamification',
    question: 'chatbot.prompts.q_gamification.question',
    answer: 'chatbot.prompts.q_gamification.answer',
    followUpIds: ['q_abhyas_arena', 'q_satark_hub', 'initial_prompts_link'],
  },
  q_satark_hub: {
    id: 'q_satark_hub',
    question: 'chatbot.prompts.q_satark_hub.question',
    answer: 'chatbot.prompts.q_satark_hub.answer',
    followUpIds: ['q_disaster_prep', 'q_abhyas_arena', 'initial_prompts_link'],
  },
  
  // --- Special node to link back to main topics ---
  initial_prompts_link: {
      id: 'initial_prompts_link',
      question: 'chatbot.prompts.initial_prompts_link.question',
      answer: 'chatbot.prompts.initial_prompts_link.answer',
      followUpIds: ['q_disaster_prep', 'q_first_aid', 'q_abhyas_arena', 'q_ar_drill']
  }
};


// --- STUDENT REPORT MOCK DATA ---
export const STUDENT_REPORTS: StudentReport[] = [
    {
        id: 's1',
        name: 'Vanshita',
        avatar: 'https://picsum.photos/seed/s1/100',
        progress: 85,
        lastActive: '2 hours ago',
        xp: 2350,
        level: 3,
        modulesCompleted: ['First Aid Fundamentals', 'Earthquake Preparedness', 'Fire Safety & Prevention'],
        badges: ['First Aid Pro', 'Earthquake Expert', 'Fire Marshal'],
        quizPerformance: [
            { topic: 'First Aid', score: 90 },
            { topic: 'Earthquakes', score: 85 },
            { topic: 'Fire Safety', score: 95 },
            { topic: 'Floods', score: 70 },
        ],
    },
    {
        id: 's2',
        name: 'Vikram Rathore',
        avatar: 'https://picsum.photos/seed/s2/100',
        progress: 60,
        lastActive: '1 day ago',
        xp: 1500,
        level: 2,
        modulesCompleted: ['First Aid Fundamentals', 'Earthquake Preparedness'],
        badges: ['First Aid Pro', 'Earthquake Expert'],
        quizPerformance: [
            { topic: 'First Aid', score: 75 },
            { topic: 'Earthquakes', score: 80 },
            { topic: 'Fire Safety', score: 50 },
            { topic: 'Floods', score: 40 },
        ],
    },
    {
        id: 's3',
        name: 'Sneha Patel',
        avatar: 'https://picsum.photos/seed/s3/100',
        progress: 95,
        lastActive: '30 minutes ago',
        xp: 3100,
        level: 4,
        modulesCompleted: ['First Aid Fundamentals', 'Earthquake Preparedness', 'Fire Safety & Prevention', 'Flood Safety'],
        badges: ['First Aid Pro', 'Earthquake Expert', 'Fire Marshal', 'Flood Fighter'],
        quizPerformance: [
            { topic: 'First Aid', score: 100 },
            { topic: 'Earthquakes', score: 90 },
            { topic: 'Fire Safety', score: 92 },
            { topic: 'Floods', score: 88 },
        ],
    },
    {
        id: 's4',
        name: 'Amit Kumar',
        avatar: 'https://picsum.photos/seed/s4/100',
        progress: 40,
        lastActive: '3 days ago',
        xp: 800,
        level: 1,
        modulesCompleted: ['First Aid Fundamentals'],
        badges: ['First Aid Pro'],
        quizPerformance: [
            { topic: 'First Aid', score: 60 },
            { topic: 'Earthquakes', score: 30 },
            { topic: 'Fire Safety', score: 25 },
            { topic: 'Floods', score: 10 },
        ],
    },
];
