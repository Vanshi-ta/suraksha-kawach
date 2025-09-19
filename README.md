# 🛡️ Suraksha Kawach

**Suraksha Kawach** is a gamified disaster-preparedness and safety training platform designed for **students, teachers, and administrators**.
It combines **learning modules, hazard hunts, AR simulations, real-time alerts, and dashboards** into one modern application.

---

## 📌 Overview

The application is built as a **Single Page Application (SPA)** using **React + TypeScript**, ensuring a **fast, fluid, and app-like experience**.
It empowers schools and communities to **learn, practice, and stay prepared** for natural disasters through **interactive learning** and **gamified drills**.

---

## ✅ Tasks Accomplished

* [x] Designed and implemented **Gyan Kendra** (Learning Modules + Courses + Videos).
* [x] Built **Abhyas Arena** with quizzes, Hazard Hunt, and AR drills for earthquake safety.
* [x] Created **Teacher Dashboard** for monitoring student progress and generating reports.
* [x] Developed **Admin Dashboard** with analytics, safety scores, and broadcast features.
* [x] Integrated **Satark Hub** with real-time alerts and geotagged warnings.

---

## 🛠️ Technology Stack

This project leverages the following technologies:

* **[React](https://reactjs.org/):** Component-based frontend framework for UI.
* **[TypeScript](https://www.typescriptlang.org/):** Static typing for scalability and maintainability.
* **[TailwindCSS](https://tailwindcss.com/):** Utility-first styling for responsive design.
* **[Framer Motion](https://www.framer.com/motion/):** Smooth animations and interactive feedback.
* **[Recharts](https://recharts.org/):** Data visualization for dashboards (progress, scores).
* **[i18next](https://www.i18next.com/):** Multilingual support (English + Hindi).
* **[TensorFlow.js](https://www.tensorflow.org/js):** Pose detection for AR drills.
* **[Node.js + Express](https://expressjs.com/):** Backend APIs for authentication and data management.
* **[MongoDB](https://www.mongodb.com/):** Database for user profiles, progress, quizzes, and reports.

---

## 🌟 Key Features

* **Gyan Kendra** → Learning modules, videos, and structured courses.
* **Abhyas Arena** → Quizzes, Hazard Hunt, First-Aid games, AR earthquake drills.
* **Satark Hub** → Real-time alerts, geotag warnings, and broadcast messages.
* **Dashboards** → Role-based dashboards for students, teachers, and administrators.
* **Multilingual Support** → Switch seamlessly between English and Hindi.
* **Gamification** → XP bar, badges, safety score, and automated reports.

---

## 📂 Project Structure

```
Directory structure:
└── suraksha-kawach/
    ├── README.md
    ├── App.tsx
    ├── constants.ts
    ├── i18n.ts
    ├── index.html
    ├── index.tsx
    ├── metadata.json
    ├── package.json
    ├── tsconfig.json
    ├── types.ts
    ├── vite.config.ts
    ├── components/
    │   ├── ChatbotWidget.tsx
    │   ├── Icons.tsx
    │   ├── LanguageSwitcher.tsx
    │   ├── OnboardingTour.tsx
    │   └── VideoPlayer.tsx
    ├── locales/
    │   └── en/
    │       └── translation.ts
    └── pages/
        ├── AbhyasArena.tsx
        ├── CoursePage.tsx
        ├── Dashboard.tsx
        ├── EarthquakeARPage.tsx
        ├── FirstAidMatchPage.tsx
        ├── GyanKendra.tsx
        ├── HazardHuntPage.tsx
        ├── HelpPage.tsx
        ├── Login.tsx
        ├── ProfileSettings.tsx
        ├── Register.tsx
        ├── SafetyQuizPage.tsx
        ├── SatarkHub.tsx
        ├── ScenarioMCQsPage.tsx
        ├── StudentReportPage.tsx
        └── VirtualDrillPage.tsx

```

## ⚙️ Local Setup Instructions

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/Vanshi-ta/suraksha-kawach-2.0.git
cd suraksha-kawach-2.0
```

---

### 🔹 2. Install Dependencies

For both **Windows** and **macOS**:

```bash
npm install
```

---

### 🔹 3. Start the Development Server

```bash
npm run dev
```

App will run at **[http://localhost:5173/](http://localhost:5173/)**

---

## 🚀 Future Roadmap

* 🔜 Add more **AR scenarios** (fire safety, flood evacuation).
* 🔜 AI-powered **chatbot tutor** for disaster FAQs.
* 🔜 Gamified **leaderboards** across schools.
* 🔜 Enable **multi-lingual** support.
* 🔜 Integration with **Govt APIs** for real-time disaster management.

---

🔥 *Suraksha Kawach – Because safety begins with preparedness.*

---
