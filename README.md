# 🎬 React Movie App

![Home Screenshot](./screenshots/home.png)

A responsive and dynamic movie & TV show browser built with **React**, **Redux Toolkit**, **Vite**, and **TMDb API**. Users can explore movies/TV shows, view details, search, add favorites, and toggle languages and layout directions.

---

## 🚀 Features

### 🧾 Movies
- Now-playing movies list  
  `GET /movie/now_playing`
- Movie details with:
  - Info: `GET /movie/{id}`
  - Recommendations: `GET /movie/{movie_id}/recommendations`
  - Reviews: `GET /movie/{movie_id}/reviews`
- Pagination via `?page=x`

### 📺 TV Shows
- Popular TV shows: `GET /tv/popular`
- TV show details: `GET /tv/{series_id}`

### ❤️ Wishlist / Favorites
- Add/remove movies or TV shows
- Heart toggle and wishlist counter in navbar
- Dedicated wishlist page
- Labels for movie or TV type

### 🔍 Search
- Movie search by name:  
  `GET /search/movie?query={MovieName}`

### 🌐 Language & Layout
- Language options: `[ 'en', 'ar', 'fr', 'zh' ]`
- RTL layout for Arabic, LTR for others
- Applies `&language={lang}` to all API calls

---

## 🧭 Pages

- `/` - Movie list
- `/movie/:id` - Movie details
- `/tv/:id` - TV show details
- `/wishlist` - Favorites
- `/search/:query` - Search results
- `/tv` - TV shows
- `*` - 404 Not Found

---

## 🛠️ Tech Stack

| Category         | Tech/Libs                                  |
|------------------|---------------------------------------------|
| Frontend         | React 19 + Vite                            |
| State Management | Redux Toolkit + React Redux                |
| HTTP Client      | Axios (with interceptors)                  |
| Routing          | React Router v7                            |
| Styling          | SASS, Bootstrap 5, Bootstrap Icons         |
| Animations       | Lottie React, Swiper.js                    |
| Utilities        | query-string, prop-types, react-icons      |

---

## 🧑‍💻 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/your-username/movie_app.git
cd movie_app
npm install
```

### 2. Add API Key
Create a .env file in the root:
```bash
ini
VITE_TMDB_API_KEY=your_tmdb_api_key
```
### 3. Run the App
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

To display posters or backdrops from TMDb:

const imageUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;


🔐 TMDb Authentication
Sign up: https://www.themoviedb.org/login

Generate your API key.

Add it to .env as VITE_TMDB_API_KEY.

API Documentation: TMDb Developer Docs



📜 License
This project is intended for educational and non-commercial use. TMDb branding and data are subject to TMDb’s policies and license.

🙌 Credits
TMDb API

React

Redux Toolkit

Bootstrap

LottieFiles