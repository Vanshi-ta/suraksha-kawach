# 🛡️ Suraksha Kawach

**Suraksha Kawach** is a gamified disaster-preparedness and safety training platform designed for **students, teachers, and administrators**.
It combines **learning modules, hazard hunts, AR simulations, real-time alerts, and dashboards** into one modern application.

---

## Overview

The application is built as a **Single Page Application (SPA)** using **React + TypeScript**, ensuring a **fast, fluid, and app-like experience**.
It empowers schools and communities to **learn, practice, and stay prepared** for natural disasters through **interactive learning** and **gamified drills**.

---

flowchart TD

    %% User Access
    UA[User Access] --> L[Login / Register]
    UA --> P[Profile Settings]

    %% Dashboard
    L --> D[Dashboard]
    P --> D

    %% Learning Modules
    D --> GK[Gyan Kendra]
    D --> CP[Course Page]
    D --> VP[Video Player]

    %% Interactive Experiences
    D --> AA[Abhyas Arena]
    D --> VD[Virtual Drill Page]
    D --> EQ[Earthquake AR Page]
    D --> HH[Hazard Hunt Page]
    D --> FA[First Aid Match Page]
    D --> SQ[Safety Quiz Page]
    D --> MCQ[Scenario MCQs Page]

    %% Support Features
    D --> CW[Chatbot Widget]
    D --> OT[Onboarding Tour]
    D --> LS[Language Switcher]

    %% Reports & Tracking
    D --> SR[Student Report Page]

    %% Awareness & Resources
    D --> SH[Satark Hub]
    D --> HP[Help Page]

    %% Core System
    subgraph Core_System [Core System]
        I18N[i18n - Localization]
        CONST[Constants & Metadata]
        BE[Backend Integration]
    end

    %% Connections
    D --> Core_System
    GK --> VP
    CP --> VP
    SR --> Core_System
    SH --> Core_System


## Tasks Accomplished

* [x] Designed and implemented **Gyan Kendra** (Learning Modules + Courses + Videos).
* [x] Built **Abhyas Arena** with quizzes, Hazard Hunt, and AR drills for earthquake safety.
* [x] Created **Teacher Dashboard** for monitoring student progress and generating reports.
* [x] Developed **Admin Dashboard** with analytics, safety scores, and broadcast features.
* [x] Integrated **Satark Hub** with real-time alerts and geotagged warnings.

---

## Technology Stack 

- *React.js* – We used React to build the frontend because it makes the app fast and smooth. Its component-based design allowed us to easily create reusable pieces like buttons, cards, and dashboards.  

- *TypeScript* – Since our project is large, TypeScript helps us avoid silly errors by adding types. It makes the code cleaner, safer, and easier for the whole team to work on together.  

- *React Router* – This makes our app feel like a real application rather than a website. It lets users switch between pages (like dashboard, modules, reports) instantly without reloading.  

- *Context API* – Instead of passing data through many layers of components, we used Context to manage global things like login state and theme across the app easily.  

- *Tailwind CSS* – For styling, Tailwind made our work super quick. With its utility classes, we didn’t have to write long CSS files, and the UI looks consistent and modern.  

- *Framer Motion* – To make the app engaging, we added smooth animations (like transitions and modals). It gives the app a polished, professional feel.  

- *Recharts* – For teachers and admins, we wanted clear visuals of reports and scores. Recharts let us build interactive charts that are simple to understand.  

- *i18next* – Since our users may prefer different languages, we added support for both English and Hindi to make the app more inclusive.  

- *Node.js & Express.js* – These power our backend. Together, they handle things like login, saving reports, and sending alerts.  

- *MongoDB* – We chose MongoDB as our database because it’s flexible and works great for storing different types of data like modules, reports, and alerts.  

---

## Key Features

* **Gyan Kendra** → Learning modules, videos, and structured courses.
* **Abhyas Arena** → Quizzes, Hazard Hunt, First-Aid games, AR earthquake drills.
* **Satark Hub** → Real-time alerts, geotag warnings, and broadcast messages.
* **Dashboards** → Role-based dashboards for students, teachers, and administrators.
* **Multilingual Support** → Switch seamlessly between English and Hindi.
* **Gamification** → XP bar, badges, safety score, and automated reports.

---

## Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Vanshi-ta/suraksha-kawach-2.0.git
cd suraksha-kawach-2.0
```

---

### 2. Install Dependencies

For both **Windows** and **macOS**:

```bash
npm install
```

---

### 3. Start the Development Server

```bash
npm run dev
```

App will run at **[http://localhost:5173/](http://localhost:5173/)**

---

## Future Roadmap

* Add more **AR scenarios** (fire safety, flood evacuation).
* AI-powered **chatbot tutor** for disaster FAQs.
* Gamified **leaderboards** across schools.
* Enable **multi-lingual** support.
* Integration with **Govt APIs** for real-time disaster management.

---

🔥 *Suraksha Kawach – Because safety begins with preparedness.*

---
