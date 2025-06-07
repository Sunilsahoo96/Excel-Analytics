
# 📊 Excel Analytics Platform

An intuitive, full-stack MERN-based application to upload, analyze, and visualize Excel files. The platform empowers users to extract insights from spreadsheets using rich charts, history tracking, and optional AI-powered analysis.

---

## 🚀 Features

- 📁 Upload Excel files (`.xlsx`, `.xls`)
- 📊 Auto-generate interactive charts (bar, line, pie, 3D charts)
- 🧮 Data preview and summary (tables, headers, stats)
- ⏳ History tracking of uploaded files
- 🔍 View and manage all uploaded datasets
- 🧠 (Optional) AI insights using OpenAI for trends, anomalies
- 🎯 Reusable and modular component architecture
- 📤 Export chart as PNG
- 🌐 Smooth UX with routing and animations
- 🔐 JWT-based authentication (for extended version)

---

## 🛠️ Tech Stack

**Frontend:**
- React
- Redux Toolkit
- React Router
- Chart.js & Three.js (3D charts)
- Tailwind CSS
- Axios

**Backend:**
- Node.js
- Express
- MongoDB + Mongoose
- Multer (for file upload)
- XLSX (to parse Excel files)
- JWT (for authentication)
- CORS, Dotenv

---

## 📁 Project Structure

```
📦 excel-analytics-platform
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── utils/
│   │   └── App.jsx
│   └── public/
└── README.md
```

---

## 🧑‍💻 Key Components

- `UploadPage`: Upload and preview Excel files
- `VisualizePage`: Display charts using Chart.js & Three.js
- `UserManagement`: Admin panel to view user uploads
- `Chart3D`: Reusable component to render interactive 3D charts
- `FileHistory`: List of previously uploaded files with metadata

---

## ⚙️ Setup Instructions

### Backend

```bash
cd backend
npm install
npm start
```

- Add `.env`:
  ```
  MONGO_URI=your_mongodb_connection
  PORT=5000
  JWT_SECRET=your_jwt_secret
  ```

### Frontend

```bash
cd frontend
npm install
npm start
```



---

## 🌐 Deployment

- Frontend: Vercel / Netlify
- Backend: Render / Railway / Heroku
- MongoDB: MongoDB Atlas

---

## 🔒 Security

- JWT Auth (planned/optional)
- CORS configuration
- `.env` and secrets are ignored from version control

---

## ✅ To Do

- [ ] Add AI-based insights panel
- [ ] Enable downloadable CSV summaries
- [ ] Advanced chart filters and themes

---

## 🤝 Contribution

Feel free to fork, raise issues, or open pull requests.

```bash
git clone https://github.com/Sunilsahoo96/Excel-Analytics.git
```

---

## 📄 License

MIT License © 2025 Sunil Sahoo
