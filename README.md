# krushify-web

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/ManjunathBhagwat12/krushify-web)


````md
# krushify-web

[Edit in StackBlitz ⚡️](https://stackblitz.com/~/github.com/ManjunathBhagwat12/krushify-web)

---

## 🌱 Krushify Web

Krushify is a web application designed to connect agricultural service providers with farmers and users in rural areas. This repository contains the **frontend code** for the platform.

---

## 🛠️ Getting Started

### ✅ Prerequisites

- [Git](https://git-scm.com/downloads)
- [Node.js & npm](https://nodejs.org)

---

### 📦 1. Install Git

Download Git from: https://git-scm.com/downloads

Then verify installation in terminal:

```bash
git --version
````

---

### 🔧 2. Git Configuration (First-time only)

Set your name and email for commit tracking:

```bash
git config --global user.name "Your Name"
git config --global user.email "youremail@example.com"
```

---

### 📁 3. Clone the Project

```bash
git clone https://github.com/krushify/krushify-web.git
cd krushify-web
```

---

### 📦 4. Install Project Dependencies

```bash
npm install
```

---

### 🚀 5. Run the App

```bash
npm run dev
```

Open your browser at: [http://localhost:5173](http://localhost:5173)

---

## 🌍 Translations

This project supports:

* English
* Kannada

To switch language manually in browser dev console:

```js
localStorage.setItem("language", "en"); // or "kn"
```

Translation files are located at: `src/i18n/translations.ts`

---

## 🧱 Project Structure

```
krushify-web/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Pages and views
│   ├── services/       # API service layer
│   ├── i18n/           # Language support (useTranslation)
│   └── App.tsx         # App root component
├── README.md
└── package.json
```

---

## 🧪 Git Workflow (For Contributors)

### 🆕 Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### ✅ Commit & Push

```bash
git add .
git commit -m "feat: your feature description"
git push origin feature/your-feature-name
```

### 🔁 Open Pull Request on GitHub

> Fork → Branch → Code → Commit → Push → Pull Request

---

## 📃 License

MIT © 2025 Krushify

---
