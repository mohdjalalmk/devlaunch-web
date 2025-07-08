# 📚 DevLaunch — Learning Platform

DevLaunch is a simple e-learning platform where users can purchase, enroll in, and watch video courses.\
Built with **Vue.js + Vite** on the frontend and **Node.js + Express + MongoDB** on the backend.

---

## 🚀 Features

✅ User authentication (login & signup)\
✅ Course list & details\
✅ Video streaming with signed URLs\
✅ Course progress tracking\
✅ Certificate generation & download\
✅ Clean responsive design

---

## 🛠 Tech Stack

- **Frontend:** Vue.js, Vite, Pinia, Vue Router, Vuetify
- **Backend:** Node.js, Express, MongoDB, AWS S3 (for video & certificates)
- **Tools:** PDFKit, dotenv

---

## ⚙️ Setup Instructions

### 📦 Clone the repo

```bash
git clone https://github.com/mohdjalalmk/devlaunch-web.git
cd devlaunch-web
```

### 🔧 Install dependencies

```bash
npm install
```

### 🖥️ Frontend (this repo)

Start development server:

```bash
npm run dev
```

### 🧰 Backend (separate repo - https://github.com/mohdjalalmk/devlaunch-backend.git)

```bash
cd devlaunch-backend
npm install
npm run dev
```

Make sure to add your **.env** file in backend with:

```env
MONGO_URI=your_mongodb_connection_string
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET_NAME=...
JWT_SECRET=...
```

---

- Payment integration is *skipped / planned*.

---

## 📄 License

MIT

---

## ✏️ Author

**Mohamed Jalal M K**

---

> 🌟 Feel free to fork, star, and contribute!

---

### 🔗 Demo

`https://devlaunch-web.vercel.app` 
