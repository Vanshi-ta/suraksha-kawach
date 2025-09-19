
export default {
    appName: 'Suraksha Kawach',
    appDescription: 'Your Digital Shield for Disaster Resilience',

    // Login Page
    login: {
        selectRole: 'Select Your Role',
        student: 'Student',
        teacher: 'Teacher',
        admin: 'Admin',
        identifierLabel: 'School ID / Email',
        identifierPlaceholder: 'Enter your ID or Email',
        signInButton: 'Sign In',
        passwordLabel: 'Password',
        errorRequired: 'ID or Email is required.',
        errorPasswordRequired: 'Password is required.',
        errorInvalid: 'Invalid credentials for the selected role.',
        forgotPassword: 'Forgot Password?',
        resetPasswordTitle: 'Reset Your Password',
        resetPasswordDesc: 'Enter your School ID or Email and we will send you instructions to reset your password.',
        sendResetLink: 'Send Reset Link',
        resetLinkSentTitle: 'Check Your Inbox',
        resetLinkSentDesc: 'If an account exists for {{schoolId}}, you will receive an email with password reset instructions.',
        backToLogin: 'Back to Login',
        noAccount: "Don't have an account?",
        createAccount: 'Create New Account',
    },

    // Registration Page
    register: {
        title: 'Create New Account',
        subtitle: 'Join Suraksha Kawach and become a safety champion!',
        selectRole: 'I am a...',
        fullNameLabel: 'Full Name',
        emailLabel: 'Email Address',
        passwordLabel: 'Password',
        confirmPasswordLabel: 'Confirm Password',
        schoolIdLabel: 'School ID',
        optional: 'Optional',
        createAccountButton: 'Create Account',
        creatingAccount: 'Creating...',
        haveAccount: 'Already have an account?',
        signIn: 'Sign In',
        errors: {
            passwordMismatch: 'Passwords do not match.',
            passwordWeak: 'Password is too weak. Please include more characters.',
            emailExists: 'An account with this email already exists.',
            generic: 'An unexpected error occurred. Please try again.'
        }
    },

    // Sidebar
    sidebar: {
        dashboard: 'Dashboard',
        gyanKendra: 'Gyan Kendra',
        abhyasArena: 'Abhyas Arena',
        satarkHub: 'Satark Hub',
        help: 'Help & FAQ',
        profile: 'Profile',
        settings: 'Settings',
        logout: 'Log Out',
    },
    
    // Header
    header: {
        welcome: 'Welcome, {{name}}!',
        language: 'Language',
        selectLanguage: 'Select Language',
        english: 'English',
        hindi: 'Hindi',
    },
    
    // Modals
    logoutModal: {
        title: 'Confirm Logout',
        message: 'Are you sure you want to log out?',
        cancel: 'Cancel',
        confirm: 'Log Out',
    },

    deleteAccountModal: {
        title: 'Confirm Account Deletion',
        message: 'Do you want to delete your account permanently? This action cannot be undone.',
        cancel: 'Cancel',
        confirm: 'Yes, Delete',
    },

    // Dashboard
    dashboard: {
      welcome: 'Welcome, {{name}}!',
      level: 'Level {{level}}',
      xp: 'Experience Points (XP)',
      myJourney: 'My Journey',
      startNow: 'Start Now',
      badgesShowcase: 'Badges Showcase',
      classLeaderboard: 'Class Leaderboard',
      currentRank: 'Your Current Rank is',
      keepLearning: 'Keep learning to climb up!',
      teacherDashboard: 'Teacher Dashboard',
      totalStudents: 'Total Students',
      avgProgress: 'Average Progress',
      pendingDrills: 'Pending Drills',
      studentProgress: 'Student Progress Overview',
      adminDashboard: 'Administrator Dashboard',
      totalSchools: 'Total Schools',
      activeAlerts: 'Active Alerts',
      highRiskZones: 'High Risk Zones',
      schoolCompletionRate: 'School-wise Completion Rate',
      viewReport: 'View Report',
      analytics: {
        title: 'Key Analytics',
        engagement: 'Student Engagement (Last 7 Days)',
        modulePopularity: 'Module Popularity',
        failurePoints: 'Common Quiz Failure Points',
        alertAckRate: 'Alert Acknowledgement Rate'
      },
      assignments: {
        manageAssignments: 'Manage Assignments',
        createAssignment: 'Create New Assignment',
        createAssignmentTitle: 'Create a New Assignment',
        assignmentType: 'Assignment Type',
        module: 'Gyan Kendra Module',
        quiz: 'Abhyas Arena Quiz',
        selectModule: 'Select a Module',
        selectQuiz: 'Select a Quiz',
        dueDate: 'Due Date',
        saveAssignment: 'Save Assignment',
        studentsCompleted: 'Students Completed',
        myAssignments: 'My Assignments',
        pending: 'Pending',
        completed: 'Completed',
        startAssignment: 'Start'
      }
    },
    
    // Gyan Kendra Page
    gyanKendra: {
        title: 'Gyan Kendra',
        subtitle: 'The Knowledge Center',
        description: 'Your one-stop hub for interactive disaster management learning. Equip yourself with the knowledge to stay safe.',
        xpEarned: '+{{xp}} XP Earned',
        learnMore: 'Learn More',
        startCourse: 'Start Course',
        keyTopics: 'Key Topics',
        videoTutorial: 'Video Tutorial',
        youtubeTutorial: 'YouTube Tutorial',
        modules: {
            'first-aid': {
                title: 'First Aid Fundamentals',
                shortDescription: 'Basic life-saving techniques for common injuries.',
                longDescription: 'This course provides essential first aid knowledge to handle emergencies effectively. Learn to assess situations, perform CPR, and manage common injuries like cuts, burns, and fractures until professional help arrives.',
                keyTopics: ['Assessing a Scene', 'Cardiopulmonary Resuscitation (CPR)', 'Wound Care', 'Handling Fractures', 'Burn Management']
            },
            'earthquake-preparedness': {
                title: 'Earthquake Preparedness',
                shortDescription: 'Learn how to stay safe before, during, and after an earthquake.',
                longDescription: 'Earthquakes can strike without warning. This module teaches you how to prepare your home, what to do during the shaking (Drop, Cover, and Hold On), and how to navigate the aftermath safely.',
                keyTopics: ['Creating a Family Emergency Plan', 'Securing Your Space', 'Drop, Cover, and Hold On', 'Post-Earthquake Safety Checks', 'Assembling a Survival Kit']
            },
            'flood-safety': {
                title: 'Flood Safety',
                shortDescription: 'Essential techniques for flood-prone areas and emergency response.',
                longDescription: 'Floods are one of the most common natural disasters. Understand flood alerts, learn how to prepare your property, and master the crucial rule: Turn Around, Don’t Drown. This course covers both pre-flood preparation and post-flood recovery.',
                keyTopics: ['Understanding Flood Warnings', 'Evacuation Routes & Procedures', 'Protecting Your Home', 'Water Contamination Safety', 'Post-Flood Recovery Steps']
            },
            'fire-safety': {
                title: 'Fire Safety & Prevention',
                shortDescription: 'Understanding fire hazards, prevention methods, and evacuation procedures.',
                longDescription: 'Learn to identify common fire hazards in your home and school. This course covers the basics of fire prevention, the use of fire extinguishers (P.A.S.S. technique), and how to create and practice a fire escape plan.',
                keyTopics: ['Identifying Fire Hazards', 'Using a Fire Extinguisher', 'Creating an Escape Plan', 'Smoke Alarm Maintenance', 'Kitchen Fire Safety']
            },
            'cyclone-response': {
                title: 'Cyclone Alert & Response',
                shortDescription: 'Preparing for cyclones and knowing what to do when one hits.',
                longDescription: 'This module focuses on the unique challenges posed by cyclones. Learn to interpret cyclone warnings, secure your property against high winds and storm surges, and understand the importance of emergency shelters.',
                keyTopics: ['Cyclone Warning Systems', 'Securing Doors and Windows', 'Emergency Kit for Cyclones', 'Navigating Storm Surges', 'Post-Cyclone Dangers']
            },
            'search-and-rescue': {
                title: 'Basic Search and Rescue',
                shortDescription: 'Introductory skills for locating and assisting victims in emergencies.',
                longDescription: 'In the critical moments after a disaster, basic search and rescue skills can save lives. This introductory course covers safe methods for searching for victims, asekhar lifting heavy objects, and creating safe pathways for evacuation.',
                keyTopics: ['Assessing Structural Integrity', 'Search Patterns', 'Safe Lifting Techniques', 'Communicating with Victims', 'Triage Basics']
            }
        }
    },

    // Abhyas Arena Page
    abhyasArena: {
        title: 'Abhyas Arena',
        subtitle: 'The Practice Arena',
        description: 'Learn by Doing. Practice. Prepare. Sharpen your disaster response skills through engaging games and simulations.',
        leaderboard: 'Leaderboard',
        badges: 'Badges Earned',
        xpLevel: 'XP Level',
        tier1Title: 'Accessible Gamified Learning',
        tier1Desc: 'Start with fun quizzes and mini-games to build your foundational knowledge.',
        tier2Title: 'Immersive 3D Simulations',
        tier2Desc: 'Step into realistic scenarios in a virtual school environment to practice your skills.',
        tier3Title: 'AR Extension Modules',
        tier3Desc: 'Experience the next level of preparedness with cutting-edge virtual and augmented reality modules.',
        startSim: 'Start Simulation',
        comingSoon: 'Coming Soon',
        selectCategory: 'Select a Category',
        categories: {
            earthquake: 'Earthquake',
            flood: 'Flood',
            fire: 'Fire Evacuation'
        }
    },

    // Satark Hub Page
    satarkHub: {
        title: 'Satark Hub',
        subtitle: 'The Alert Hub',
        description: 'Stay Informed. Stay Safe. Real-time alerts from official sources and campus-level communication.',
        liveFeed: 'Live Alert Feed (District-wise)',
        showAcknowledged: 'Show Acknowledged',
        noAlerts: 'No new alerts to show.',
        learnSafety: 'Learn Safety',
        practiceDrill: 'Practice Drill',
        acknowledge: 'Acknowledge',
        acknowledged: 'Acknowledged'
    },

    // Profile & Settings Page
    profileSettings: {
        title: 'Profile & Settings',
        myProfile: 'My Profile',
        uploadPhoto: 'Upload New Photo',
        saveChanges: 'Save Changes',
        settings: 'Settings',
        darkMode: 'Dark Mode',
        darkModeDesc: 'Reduce eye strain in low-light conditions.',
        notifications: 'Enable Push Notifications',
        notificationsDesc: 'Receive real-time alerts and updates.',
        tts: 'Text-to-Speech',
        ttsDesc: 'Read out content in Gyan Kendra.',
        lowBandwidth: 'Low-bandwidth Mode',
        lowBandwidthDesc: 'Optimize Abhyas Arena for slower connections.',
        language: 'Language',
        toastSuccess: 'Profile photo updated successfully!',
        deleteAccount: 'Delete My Account',
        deleteAccountDesc: 'Permanently remove your account and all associated data.',
    },

    // Course Page
    coursePage: {
        ctaText: "You've completed the learning module.",
        ctaButton: "Take Test in Abhyas Arena",
        readMore: "Read More"
    },

    // Game Pages
    games: {
      backToArena: 'Back to Arena',
      retakeTest: 'Retake Test',
      safetyQuiz: {
        title: 'Safety Quiz',
        description: 'Answer {{count}} questions on {{category}} to test your knowledge!',
        start: 'Start Quiz',
        complete: 'Quiz Complete!',
        greatJob: 'Great job!',
        keepPracticing: 'Keep practicing!',
        youGot: 'You got',
        questionProgress: 'Question {{current}} of {{total}}',
        categories: {
            earthquake: { 
                title: 'Earthquake Safety Quiz',
                questions: {
                    '0': {
                        question: "During an earthquake, what is the recommended safety action?",
                        options: { '0': "Run outside", '1': "Stand in a doorway", '2': "Drop, Cover, and Hold On", '3': "Go to the top floor" }
                    },
                    '1': {
                        question: "What should you do after the shaking stops?",
                        options: { '0': "Immediately use the elevator", '1': "Check for injuries and watch for aftershocks", '2': "Light a candle for light", '3': "Call everyone you know" }
                    },
                    '2': {
                        question: "If you are outdoors during an earthquake, where should you go?",
                        options: { '0': "Under a large tree", '1': "Next to a tall building", '2': "To an open area away from buildings and power lines", '3': "Inside the nearest car" }
                    },
                    '3': {
                        question: "Which item is LEAST important for an earthquake emergency kit?",
                        options: { '0': "Water", '1': "First-aid supplies", '2': "Video games", '3': "A flashlight" }
                    }
                }
            },
            flood: { 
                title: 'Flood Safety Quiz',
                questions: {
                    '0': {
                        question: "What is the most important rule when you see a flooded road?",
                        options: { '0': "Drive through it slowly", '1': "Wait for others to cross first", '2': "Turn Around, Don't Drown", '3': "Measure how deep it is" }
                    },
                    '1': {
                        question: "If your house is flooding, where is the safest place to go?",
                        options: { '0': "The basement", '1': "The highest level of your home", '2': "Outside to your car", '3': "Under a bed" }
                    },
                    '2': {
                        question: "Why should you avoid walking through floodwater?",
                        options: { '0': "It might make your shoes wet", '1': "It can be contaminated and hide dangers", '2': "It is usually very cold", '3': "You might see a fish" }
                    },
                    '3': {
                        question: "Before a flood, what is a good way to protect your home?",
                        options: { '0': "Open all windows", '1': "Move important items to a higher floor", '2': "Turn on all the lights", '3': "Water the garden" }
                    }
                }
            },
            fire: { 
                title: 'Fire Safety Quiz',
                questions: {
                    '0': {
                        question: "What does the 'A' in the P.A.S.S. acronym for fire extinguishers stand for?",
                        options: { '0': "Alert", '1': "Aim", '2': "Activate", '3': "Action" }
                    },
                    '1': {
                        question: "If your clothes catch fire, what should you do?",
                        options: { '0': "Run to find water", '1': "Stop, Drop, and Roll", '2': "Wave your arms for help", '3': "Take off the clothing quickly" }
                    },
                    '2': {
                        question: "How should you check if a door is safe to open during a fire?",
                        options: { '0': "Kick it open", '1': "Listen for sounds", '2': "Feel it with the back of your hand", '3': "Look through the keyhole" }
                    },
                    '3': {
                        question: "Where is the best place to crawl in a smoke-filled room?",
                        options: { '0': "Near the ceiling", '1': "In the middle of the room", '2': "Low to the floor", '3': "Close to the windows" }
                    }
                }
            }
        }
      },
      hazardHunt: {
        title: 'Hazard Hunt',
        description: 'Click on the scene to find hidden safety hazards and learn how to respond.',
        start: 'Start Inspection',
        progress: 'Hazards Found:',
        complete: 'Inspection Complete!',
        scoreMessage: "You've got a sharp eye for safety!",
        score: 'Your Score:',
        replayTips: 'Replay Safety Tips',
        tips: {
          wire: "Loose electrical wires on the floor are a major trip hazard. They should be secured along walls or covered.",
          exit: "Emergency exits must always be clear and accessible. Clutter can slow down evacuation.",
          bag: "Unattended bags can be a trip hazard and a potential security concern. Keep walkways clear.",
          glass: "Broken glass is a serious safety risk that can cause deep cuts. Report it to an adult immediately.",
          socket: "Overloading a power socket is a fire hazard. Use a surge protector and don't plug too many high-power devices into one outlet."
        }
      },
      scenarioMcqs: {
          title: 'Scenario Challenge',
          description: "Test your decision-making skills in realistic {{category}} situations.",
          start: 'Start Challenge',
          complete: 'Challenge Complete!',
          scoreMessage: "You've made some excellent decisions!",
          score: 'Your Final Score:',
          categories: {
            earthquake: { title: 'Earthquake Scenarios' },
            flood: { title: 'Flood Scenarios' },
            fire: { title: 'Fire Scenarios' }
          },
          scenarios: {
              q1: {
                  question: "You are in a classroom on the second floor when you feel the building start to shake violently. What is your first and safest action?",
                  options: [
                      "Run for the stairs to get outside as fast as possible.",
                      "Drop to the ground, take cover under a sturdy desk, and hold on.",
                      "Stand in the doorway for protection.",
                      "Immediately call your parents for instructions."
                  ],
                  explanation: "The internationally recognized 'Drop, Cover, and Hold On' protocol is the safest immediate action during an earthquake. Running can lead to falls from shaking, and doorways may not be safer than being under sturdy furniture."
              },
              q2: {
                  question: "The fire alarm goes off while you're in the library. You see smoke coming from the end of the hallway. What should you do?",
                  options: [
                      "Ignore it, as it might be a false alarm.",
                      "Go back to your classroom to get your backpack.",
                      "Calmly follow the nearest marked evacuation route and exit the building.",
                      "Use the elevator to get out of the building quickly."
                  ],
                  explanation: "Always treat a fire alarm as a real emergency. Evacuate immediately using the stairs and designated routes. Never use an elevator during a fire, as it can become trapped."
              },
              q3: {
                  question: "You are walking home from school when you receive a flash flood warning on your phone. The street ahead is covered in moving water. What is the best course of action?",
                  options: [
                      "Turn around and find an alternate, higher route. Do not enter the water.",
                      "Try to walk through it quickly since it doesn't look very deep.",
                      "Wait by the water's edge until it stops flowing.",
                      "Call a friend who has a bigger car to come pick you up."
                  ],
                  explanation: "The rule is 'Turn Around, Don't Drown.' It's impossible to know the depth or current of floodwater, and it can sweep you or a vehicle away. The only safe option is to avoid it completely and find higher ground."
              },
              q4: {
                  question: "After an earthquake, you are safe but you smell gas near the science lab. What should you NOT do?",
                  options: [
                      "Leave the area immediately.",
                      "Tell a teacher or another adult about the smell.",
                      "Avoid using your mobile phone or anything that could create a spark.",
                      "Turn on a light switch to get a better look at the source."
                  ],
                  explanation: "Flipping a light switch, or any electrical device, can create a spark that could ignite a gas leak, causing an explosion. The correct actions are to leave the area, inform an adult, and avoid creating any sparks."
              },
              q5: {
                  question: "A classmate falls and gets a deep cut that is bleeding a lot. What is the most important first-aid step you can take while waiting for help?",
                  options: [
                      "Try to clean the wound with water.",
                      "Apply firm, direct pressure to the wound with a clean cloth or bandage.",
                      "Help them sit up and give them some water to drink.",
                      "Ask them what their blood type is."
                  ],
                  explanation: "Controlling severe bleeding is the top priority. Applying direct pressure helps to slow or stop the blood flow and is a critical first-aid step until a professional can provide medical care."
              },
              earthquake: {
                q1: {
                    question: "You are outside on the playground when an earthquake starts. What should you do?",
                    options: [
                        "Run inside the nearest building.",
                        "Stand under the basketball hoop.",
                        "Move to an open area, away from buildings, trees, and power lines."
                    ],
                    explanation: "If you are outdoors, the safest place is in the open where nothing can fall on you. Stay away from buildings, streetlights, and utility wires."
                }
              },
              flood: {
                q1: {
                    question: "Your teacher instructs everyone to move to the third floor due to rising water. On the way, you see a friend trying to use the elevator.",
                    options: [
                        "Tell them to stop and take the stairs with you.",
                        "Race them to see who gets there first.",
                        "Ignore them and continue to the stairs."
                    ],
                    explanation: "Never use an elevator during a flood or fire. It could lose power and become a trap. Always use the stairs and ensure your friends do the same."
                }
              },
              fire: {
                q1: {
                    question: "You are escaping a fire, and the hallway is filled with smoke. You should:",
                    options: [
                        "Hold your breath and run.",
                        "Stay low to the ground and crawl under the smoke.",
                        "Cover your mouth with your shirt and walk quickly."
                    ],
                    explanation: "The cleanest air is near the floor. Staying low and crawling helps you avoid inhaling toxic smoke and improves visibility."
                }
              }
          }
      },
      firstAidMatch: {
          title: 'First-Aid Matchup',
          description: 'Match the first-aid situation to the correct response. Test your knowledge!',
          start: 'Start Matching',
          complete: 'Game Completed!',
          finalScore: 'Your Final Score:',
          progress: 'Matched: {{matched}} of {{total}}',
          score: 'Score',
          situations: 'Situations',
          responses: 'Responses',
          pairs: {
              s1: 'Minor burn on a hand',
              r1: 'Cool the burn under clean, running water for 10-20 minutes.',
              s2: 'Nosebleed',
              r2: 'Pinch the soft part of the nose and lean forward.',
              s3: 'Insect sting with swelling',
              r3: 'Apply a cold pack to the area to reduce pain and swelling.',
              s4: 'Twisted ankle',
              r4: 'Apply an ice pack and elevate the leg.',
              s5: 'Someone is choking and cannot speak',
              r5: 'Perform the Heimlich maneuver (abdominal thrusts).',
              s6: 'Minor cut or scrape',
              r6: 'Clean the area with soap and water, then apply a bandage.',
          }
      },
      virtualDrill: {
        start: 'Start Drill',
        complete: 'Drill Complete!',
        yourScore: 'Your Score',
        xpEarned: '+{{xp}} XP Earned',
        earthquakeDrill: {
            title: 'Earthquake Evacuation Drill',
            description: 'Navigate through a simulated earthquake in the school library. Make the right choices!',
            steps: {
                '0': {
                    situation: "You're reading in the school library when the ground begins to shake violently. Books are falling off the shelves!",
                    options: {
                        '0': "Run for the main exit immediately.",
                        '1': "Drop, get under the nearest sturdy table, and hold on.",
                        '2': "Stand in the doorway of the library entrance."
                    },
                    feedback: {
                        '0': "Incorrect. Running during an earthquake is dangerous as you can easily lose your balance and get injured by falling objects.",
                        '1': "Correct! 'Drop, Cover, and Hold On' is the safest action to protect yourself from falling debris.",
                        '2': "Incorrect. While once thought to be safe, modern doorways are not built to withstand the force of a strong earthquake and offer little protection."
                    }
                },
                '1': {
                    situation: "The shaking has stopped. It's quiet for a moment, but you can hear the faint sound of an alarm. What do you do next?",
                    options: {
                        '0': "Immediately run out of the building.",
                        '1': "Quickly check for injuries on yourself and others nearby, then proceed cautiously towards an exit.",
                        '2': "Call your parents on your mobile phone to tell them you are okay."
                    },
                    feedback: {
                        '0': "Not the best choice. Rushing out without assessing the situation could lead you into more danger, like falling debris from aftershocks.",
                        '1': "Excellent. Assess your situation first. Check for injuries and be aware of your surroundings as you evacuate cautiously. Aftershocks are possible.",
                        '2': "Incorrect. Phone lines may be needed for emergency services. Your priority is to get to a safe location first."
                    }
                },
                '2': {
                    situation: "As you move towards the exit, you see a classmate with a cut on their arm from fallen glass. It's bleeding but they can walk.",
                    options: {
                        '0': "Help them apply pressure to the wound with a clean cloth and evacuate together.",
                        '1': "Leave them behind to find a first aid kit.",
                        '2': "Tell them to wait while you go get a teacher."
                    },
                    feedback: {
                        '0': "Correct! Assisting someone with a minor injury while continuing to evacuate is the right balance of safety and support. Don't leave anyone behind if you can help it.",
                        '1': "Incorrect. Never leave an injured person alone in a potentially dangerous building. Your primary goal is to get everyone out safely.",
                        '2': "Incorrect. While informing a teacher is good, your immediate priority is to get both of you out of the building. You can find a teacher at the designated assembly point."
                    }
                },
                '3': {
                    situation: "You have reached the exit and are now outside the library. What is your final objective?",
                    options: {
                        '0': "Go to the parking lot to wait for your parents.",
                        '1': "Go back inside to find your friends.",
                        '2': "Proceed to the pre-designated school assembly point in an open area, away from buildings."
                    },
                    feedback: {
                        '0': "Incorrect. The parking lot can be dangerous due to moving vehicles and potential damage. Always go to the official assembly point.",
                        '1': "Incorrect. Never re-enter a building after an earthquake. Your friends should also be heading to the assembly point.",
                        '2': "Perfect! The designated assembly point is the safest place to be. It allows school staff to account for all students and provide assistance."
                    }
                }
            }
        },
        fireDrill: {
            title: 'Fire Evacuation Drill',
            description: 'The fire alarm has sounded in the cafeteria. React quickly and safely!',
            steps: {
                '0': {
                    situation: 'You are eating lunch in the crowded cafeteria when the fire alarm blares loudly. What is your immediate action?',
                    options: {
                        '0': 'Leave your tray and calmly walk towards the nearest exit.',
                        '1': 'Finish your lunch quickly before leaving.',
                        '2': 'Grab your backpack from your locker first.'
                    },
                    feedback: {
                        '0': 'Correct. Your personal safety is the top priority. Leave belongings behind and evacuate immediately.',
                        '1': 'Incorrect. Every second counts in a fire. Do not delay evacuation for any reason.',
                        '2': 'Incorrect. Never go back for personal items during a fire alarm. Exit the building without delay.'
                    }
                },
                '1': {
                    situation: 'The hallway is starting to fill with smoke, making it hard to see. What should you do?',
                    options: {
                        '0': 'Run as fast as you can through the smoke.',
                        '1': 'Stay low to the ground, where the air is cleaner, and crawl towards the exit.',
                        '2': 'Stand up and shout for help.'
                    },
                    feedback: {
                        '0': 'Incorrect. Running in smoke can lead to disorientation and inhaling toxic fumes. Visibility is poor when standing.',
                        '1': 'Correct! The cleanest air is near the floor. Staying low helps you breathe better and see more clearly under the smoke.',
                        '2': 'Incorrect. While alerting others is good, your priority is to move to safety. Shouting can cause you to inhale more smoke.'
                    }
                },
                '2': {
                    situation: 'You reach a closed door on your escape route. You touch it with the back of your hand and it feels hot.',
                    options: {
                        '0': 'Open the door quickly to see if there is fire on the other side.',
                        '1': 'Do not open the door. Turn around and use your alternate escape route.',
                        '2': 'Brace yourself and try to break the door down.'
                    },
                    feedback: {
                        '0': 'Incorrect! Opening a hot door can cause a dangerous backdraft and expose you directly to fire.',
                        '1': 'Correct! A hot door means there is fire on the other side. Always use your alternate escape route if your primary one is blocked.',
                        '2': 'Incorrect and dangerous. This will waste time and could lead to injury. Find another way out.'
                    }
                }
            }
        },
        floodDrill: {
            title: 'Flood Response Drill',
            description: "Water levels are rising around the school. Follow instructions to stay safe.",
            steps: {
                '0': {
                    situation: "It's been raining heavily all day. The principal announces over the intercom that there is a flood warning and all students must prepare to move.",
                    options: {
                        '0': 'Run outside to see the water.',
                        '1': 'Listen calmly to the instructions and wait for your teacher to lead.',
                        '2': 'Start calling your parents immediately.'
                    },
                    feedback: {
                        '0': 'Incorrect. Going outside is extremely dangerous. Stay inside and follow official instructions.',
                        '1': 'Correct. In an emergency, it is vital to stay calm, listen to authorities (like teachers and staff), and follow the established plan.',
                        '2': 'Incorrect. While contacting family is important, the immediate priority is to follow safety procedures. Phone lines might be needed for emergencies.'
                    }
                },
                '1': {
                    situation: 'Your teacher instructs the class to evacuate to the third floor of the school building. Which path should you take?',
                    options: {
                        '0': 'Take the elevator to get there faster.',
                        '1': 'Use the designated emergency stairs calmly and in an orderly fashion.'
                    },
                    feedback: {
                        '0': 'Incorrect. Never use an elevator during a flood or fire, as it could lose power and trap you inside.',
                        '1': 'Correct! Stairs are the only safe way to move between floors during most emergencies.'
                    }
                },
                '2': {
                    situation: 'You have reached the third floor with your class. You are now waiting for further instructions or rescue. What is the best thing to do?',
                    options: {
                        '0': 'Stay away from windows and conserve your phone battery.',
                        '1': 'Look out the windows to watch the floodwaters rise.',
                        '2': 'Use your phone to play games to pass the time.'
                    },
                    feedback: {
                        '0': 'Correct. Windows can break from water pressure or debris. Conserving your phone battery is crucial for communication when it is safe to do so.',
                        '1': 'Incorrect. Windows are a potential hazard. It is safer to stay in the center of the room.',
                        '2': 'Incorrect. Your phone is a vital communication tool. Its battery should be conserved for emergencies.'
                    }
                }
            }
        }
    }
    },
    
    // Onboarding Tour
    onboarding: {
        buttons: {
            next: 'Next',
            prev: 'Previous',
            skip: 'Skip Tour',
            finish: 'Finish'
        },
        welcome: {
            title: 'Welcome to Suraksha Kawach!',
            content: "Let's take a quick tour to see how you can become a safety champion."
        },
        sidebar: {
            title: 'Main Navigation',
            content: 'This is your command center. Access all the main sections of the app from here.'
        },
        gyanKendra: {
            title: 'Gyan Kendra (Knowledge Center)',
            content: 'Visit here to learn everything about disaster safety through interactive modules.'
        },
        abhyasArena: {
            title: 'Abhyas Arena (Practice Arena)',
            content: 'Put your knowledge to the test with fun games and realistic simulations.'
        },
        satarkHub: {
            title: 'Satark Hub (Alert Hub)',
            content: 'Get real-time safety alerts and important updates for your area.'
        },
        language: {
            title: 'Switch Language',
            content: 'You can change the app language at any time, right from the header.'
        },
        profile: {
            title: 'Your Profile',
            content: 'See your name and avatar here. Click on "Profile" or "Settings" in the menu to manage your account.'
        },
        end: {
            title: "You're all set!",
            content: "You're ready to explore. Stay safe and keep learning!"
        }
    },

    // Help & FAQ Page
    helpPage: {
        title: 'Help & Frequently Asked Questions',
        subtitle: 'Find answers to your questions about Suraksha Kawach. If you can\'t find what you are looking for, contact your school administrator.',
        sections: [
            {
                title: 'General Questions',
                items: [
                    {
                        q: 'What is Suraksha Kawach?',
                        a: 'Suraksha Kawach is a digital platform designed to teach disaster resilience through interactive learning modules, gamified practice sessions, and real-time alerts.'
                    },
                    {
                        q: 'Who can use this app?',
                        a: 'The app is designed for students, teachers, and school administrators, with features tailored to each role.'
                    },
                    {
                        q: 'How do I change the language?',
                        a: 'You can switch between English and Hindi using the language switcher in the top right corner of the header on any page.'
                    }
                ]
            },
            {
                title: 'Gyan Kendra (Knowledge Center)',
                items: [
                    {
                        q: 'What can I find in Gyan Kendra?',
                        a: 'Gyan Kendra contains detailed learning modules on various topics like First Aid, Earthquake Preparedness, Fire Safety, and more. Each module includes key topics, descriptions, and sometimes video tutorials.'
                    },
                    {
                        q: 'Do I get points for learning?',
                        a: 'Yes, students earn Experience Points (XP) for starting and completing courses, which helps them level up.'
                    }
                ]
            },
            {
                title: 'Abhyas Arena (Practice Arena)',
                items: [
                    {
                        q: 'What is the Abhyas Arena?',
                        a: 'It is a section with games and simulations like Safety Quizzes and Hazard Hunts where you can practice the skills you learned in Gyan Kendra in a fun, interactive way.'
                    },
                    {
                        q: 'Are the games available for all users?',
                        a: 'The games and simulations are primarily designed for students to practice their skills. Teachers can review them, and administrators can see overall performance metrics.'
                    }
                ]
            },
            {
                title: 'Satark Hub (Alert Hub)',
                items: [
                    {
                        q: 'What kind of alerts will I receive?',
                        a: 'Satark Hub provides real-time alerts from official sources like the IMD and NDMA for events like floods, cyclones, and earthquakes. School administrators can also send campus-wide broadcasts.'
                    },
                    {
                        q: 'What does "Acknowledge" mean on an alert?',
                        a: 'Acknowledging an alert confirms that you have seen and understood the information. This helps teachers and administrators know that students are informed during an emergency.'
                    }
                ]
            },
            {
                title: 'Account & Settings',
                items: [
                    {
                        q: 'How do I change my profile picture?',
                        a: 'Go to the "Profile" or "Settings" page from the sidebar. Click on your current profile picture or the "Upload New Photo" button to select a new image from your device.'
                    },
                    {
                        q: 'What does Dark Mode do?',
                        a: 'Enabling Dark Mode in Settings changes the app\'s color scheme to a darker theme, which can reduce eye strain, especially in low-light environments.'
                    }
                ]
            }
        ]
    },

    // Chatbot
    chatbot: {
        header: 'Suraksha Kawach Assistant',
        welcomeMessage: 'Hello! How can I help you today? Select a question below.',
        prompts: {
            q_disaster_prep: {
                question: "How do I prepare for a disaster?",
                answer: "General preparedness involves three key steps: 1) Make a plan with your family. 2) Build an emergency kit with supplies like water, food, and a first-aid kit. 3) Stay informed about potential risks in your area."
            },
            q_first_aid: {
                question: "Tell me about basic first aid.",
                answer: "Basic first aid is crucial. For severe bleeding, apply direct pressure. For minor burns, cool with running water. Knowing these basics can make a huge difference."
            },
            q_abhyas_arena: {
                question: "What's in the Abhyas Arena?",
                answer: "The Abhyas Arena is where you practice! It has quizzes, scenario challenges, and even virtual drills to test your skills in a safe environment and earn XP."
            },
            q_ar_drill: {
                question: "What is the new AR drill?",
                answer: "The Augmented Reality (AR) Earthquake Drill uses your phone's camera to simulate an earthquake in your room! You can practice 'Drop, Cover, and Hold On' in an immersive way."
            },
            q_earthquake_specific: {
                question: "How to stay safe in an earthquake?",
                answer: "During an earthquake, remember to 'Drop, Cover, and Hold On'. Get under a sturdy piece of furniture and protect your head and neck."
            },
            q_flood_specific: {
                question: "What's the main rule for floods?",
                answer: "The most important rule is 'Turn Around, Don't Drown'. Never walk or drive through floodwaters, as the depth and current can be deceptive and dangerous."
            },
            q_fire_specific: {
                question: "What if there is a fire?",
                answer: "If a fire alarm sounds, evacuate immediately. Feel doors before opening them; if hot, find another exit. Stay low to the ground to avoid smoke."
            },
            q_first_aid_burns: {
                question: "How to treat a minor burn?",
                answer: "Immediately cool the burn with cool (not cold) running water for 10-20 minutes. Do not use ice. Cover it loosely with a sterile bandage."
            },
            q_first_aid_choking: {
                question: "What if someone is choking?",
                answer: "If someone is choking and cannot speak or cough, perform abdominal thrusts (the Heimlich maneuver). Call for emergency help immediately."
            },
            q_gamification: {
                question: "How do I earn points and level up?",
                answer: "You earn Experience Points (XP) by completing learning modules in Gyan Kendra and by getting high scores in the Abhyas Arena games. The more you learn and practice, the higher your level becomes!"
            },
            q_satark_hub: {
                question: "How does the Satark Hub work?",
                answer: "The Satark Hub provides real-time alerts from official disaster management agencies. It's designed to keep you informed about potential dangers like floods or cyclones in your area."
            },
            initial_prompts_link: {
                question: "Ask something else.",
                answer: "Of course! What other topic are you curious about?"
            }
        }
    },

    // Student Report Page
    studentReport: {
        title: "Student Progress Report",
        backToDashboard: "Back to Dashboard",
        studentInfo: "Student Information",
        overallProgress: "Overall Progress",
        lastActive: "Last Active",
        completedModules: "Completed Modules",
        badgesShowcase: "Badges Showcase",
        quizPerformance: "Quiz Performance",
        noData: "Student data not found."
    },

    // AR Earthquake Drill
    arDrill: {
        title: "Earthquake AR Drill",
        description: "An immersive AR experience to practice earthquake safety.",
        tapToStart: "Tap anywhere to start the drill",
        progress: "Step {{current}} of 5",
        step1: "Simulating Earthquake...",
        step2_interactive: "Tap and HOLD the glowing blue area to get under the desk.",
        step3_interactive: "KEEP HOLDING to stay safe. AVOID tapping the red hazard zones.",
        step4_interactive: "KEEP HOLDING until the shaking stops. Don't move!",
        step5_interactive: "Evacuate! Tap the glowing green exit door to get to safety.",
        voiceDrop: "Drop, Cover, and Hold On.",
        voiceDanger: "Stay away from windows and heavy objects.",
        voiceEvacuate: "Evacuate calmly.",
        tooltipWindow: "Glass can shatter during an earthquake. Stay clear!",
        tooltipShelf: "Heavy objects can fall from shelves. Keep your distance.",
        drillComplete: "Drill Complete!",
        exitDrill: "Exit Drill",
        replayDrill: "Replay Drill",
        cameraError: "Could not access camera. Please enable camera permissions in your browser settings.",
        evacuateButton: "Evacuate",
        feedback: {
            getBackUnderCover: "Get back under cover! Countdown is resetting.",
            hazardTapped: "You tapped a hazard! Stay focused on cover."
        },
        performanceReport: "Performance Report",
        feedbackExcellent: "Excellent reaction and a swift evacuation. You're a safety pro!",
        feedbackGood: "Good job! Quick reactions and a safe evacuation.",
        feedbackImprove: "Good effort! Try to react and evacuate a little faster next time.",
        reactionTime: "Reaction Time",
        evacuationTime: "Evacuation Time",
        qualitative: {
            excellent: "Excellent!",
            good: "Good",
            slow: "Could be faster"
        }
    }
};
