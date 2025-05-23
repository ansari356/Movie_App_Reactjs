const apiConfig = {
    baseUrl: import.meta.env.VITE_MOVIE_BASE_URL || 'https://api.themoviedb.org/3',
    apiKey: '49846a5fea90eddee7c5c9e80d5c8cb7',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;