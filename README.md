<div align="center">
  <a href="https://github.com/soumyadip9mondal/PolicyPilot">
    <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=250&section=header&text=PolicyPilot&fontSize=80&animation=fadeIn&fontAlignY=35&desc=AI-Powered%20Policy%20Navigator&descAlignY=55&descAlign=50" alt="PolicyPilot Header" width="100%" />
  </a>

  <br>

  <p align="center">
    <b>Empowering individuals to understand, navigate, and apply for policies seamlessly through AI.</b>
  </p>

  <br>

  <!-- Animated Badges -->
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Made%20with-Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white" alt="Next.js" />
  </a>
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://www.mongodb.com/">
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  </a>
  <a href="https://clerk.com/">
    <img src="https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" alt="Clerk Auth" />
  </a>

  <br><br>

  [🟢 Live Demo](#) •
  [📑 Documentation](#) •
  [🐛 Report Bug](#) •
  [✨ Request Feature](#)
</div>

---

## 🌟 Features

<div align="center">
  <img src="https://raw.githubusercontent.com/soumyadip9mondal/PolicyPilot/main/public/demo.gif" alt="App Demo" width="80%" onerror="this.src='https://media.giphy.com/media/xUPGgdO4EaT5f72jW8/giphy.gif';" />
</div>

<br>

### 🤖 AI-Powered Analysis
Understand complex policies and hidden clauses in seconds. Our integrated AI reads through legal jargon and simplifies it for you.

### 🎯 Instant Eligibility Checks
Upload your profile and dynamically match with government and private schemes you didn't even know you were eligible for.

### 📝 Auto-Fill Applications
Tired of repetitive forms? PolicyPilot extracts your data securely and auto-fills application forms across multiple portals.

### 💬 Conversational Policy Assistant
Chat directly with our AI to ask contextual questions about specific schemes, deadlines, and required documents.

<br>

---

<img align="right" width="300" src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" alt="Coding Animation">

## 🛠️ Installation & Setup

Want to run PolicyPilot locally? Follow these simple steps:

**1. Clone the repository**
```bash
git clone https://github.com/soumyadip9mondal/PolicyPilot.git
cd PolicyPilot
```

**2. Install dependencies**
```bash
pnpm install
```

**3. Set up environment variables**
Copy the sample `.env` file and add your actual API keys:
```bash
cp .env.example .env.local
```
*(Required: Clerk Keys, MongoDB URI, Gemini API Key)*

**4. Start the development server**
```bash
pnpm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

<br clear="both">

---

## 🏗️ Architecture

```mermaid
graph TD;
    A[Next.js App Router] -->|Authentication| B(Clerk);
    A -->|AI Processing| C[Gemini AI API];
    A -->|Database Storage| D[(MongoDB)];
    A -->|UI Components| E[Tailwind + Framer Motion];
```

---

## 🎨 UI Showcase

<p align="center">
  <img src="https://img.shields.io/badge/-Dark_Mode_Support-black?style=flat-square&logo=moon&logoColor=white" />
  <img src="https://img.shields.io/badge/-Fully_Responsive-blue?style=flat-square&logo=mobile&logoColor=white" />
  <img src="https://img.shields.io/badge/-Framer_Motion_Animations-purple?style=flat-square&logo=framer&logoColor=white" />
</p>

Designed with modern glassmorphism, smooth micro-interactions, and high-contrast accessibility in mind. The app adapts flawlessly from desktop to mobile screens.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!<br>
Feel free to check [issues page](#).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer&text=Made%20with%20%E2%9D%A4%EF%B8%8F%20by%20Soumyadip&fontSize=20&animation=fadeIn" width="100%"/>
</div>
