// import axiosInstance from "./axiosInstance";

// export const category = {
//   movie: "movie",
//   tv: "tv",
// };

// export const movieType = {
//   upcoming: "upcoming",
//   popular: "popular",
//   top_rated: "top_rated",
// };

// export const tvType = {
//   popular: "popular",
//   top_rated: "top_rated",
//   on_the_air: "on_the_air",
// };

// const tmdbApi = {
//   getMoviesList: (type, params = {}) => {
//     const url = "movie/" + movieType[type];
//     return axiosInstance.get(url, {
//       params: {
//         ...params,

//       },
//     });
//   },

//   getEgyptianMoviesList: (type, params = {}) => {
//     const url = "discover/movie";
//     return axiosInstance.get(url, {
//       params: {
//         with_origin_country: "EG",
//         sort_by: type ? `${type}.desc` : "popularity.desc",
//         include_adult: false,
//         ...params,
//       },
//     });
//   },

//   getTvList: (type, params = {}) => {
//     const url = "tv/" + tvType[type];
//     return axiosInstance.get(url, {
//       params: {
//         include_adult: false,
//         ...params,
//       },
//     });
//   },

//   getEgyptianTvList: (type, params = {}) => {
//     const url = "discover/tv";
//     return axiosInstance.get(url, {
//       params: {
//         with_origin_country: "EG",
//         sort_by: type ? `${type}.desc` : "popularity.desc",
//         include_adult: false,
//         ...params,
//       },
//     });
//   },
//   getVideos: (cate, id) => {
//     const url = category[cate] + "/" + id + "/videos";
//     return axiosInstance.get(url, { params: {} });
//   },
//   search: (cate, params) => {
//     const url = "search/" + category[cate];
//     return axiosInstance.get(url, params);
//   },
//   detail: (cate, id, params) => {
//     const url = category[cate] + "/" + id;
//     return axiosInstance.get(url, params);
//   },
//   credits: (cate, id) => {
//     const url = category[cate] + "/" + id + "/credits";
//     return axiosInstance.get(url, { params: {} });
//   },
//   similar: (cate, id) => {
//     const url = category[cate] + "/" + id + "/similar";
//     return axiosInstance.get(url, { params: {} });
//   },
//     getDetails: (mediaType, id, language = "en-US") => {
//     const url = `/${mediaType}/${id}`;
//     return axiosInstance.get(url, {
//       params: {
//         language,
//       },
//     });
//   },
// };

// export default tmdbApi;

// This module interacts with The Movie Database (TMDb) API using a custom axios instance.

// It defines categories for 'movie' and 'tv' to simplify request logic.

// It also defines types for each category:
// - For movies: 'upcoming', 'popular', and 'top_rated'.
// - For TV shows: 'popular', 'top_rated', and 'on_the_air'.

// The exported object 'tmdbApi' provides multiple functions to fetch data from the TMDb API.

// getMoviesList(type, params):
// Builds a URL like 'movie/popular' and sends a GET request with optional parameters.

// getTvList(type, params):
// Builds a URL like 'tv/top_rated' and sends a GET request with optional parameters.

// getVideos(cate, id):
// Fetches the list of videos for a specific movie or TV show by its ID.

// search(cate, params):
// Performs a search in either movies or TV shows using query parameters.

// detail(cate, id, params):
// Fetches detailed info about a specific movie or TV show by its ID.

// credits(cate, id):
// Retrieves the cast and crew for a given movie or TV show.

// similar(cate, id):
// Gets a list of similar movies or TV shows based on a specific item.

// All methods return a promise from the axios GET request.

// This makes it easy to reuse the same functions throughout the application for consistent API calls.
import axiosInstance from "./axiosInstance";

export const category = {
  movie: "movie",
  tv: "tv",
};

export const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
};

export const tvType = {
  popular: "popular",
  top_rated: "top_rated",
  on_the_air: "on_the_air",
};
const mainParams = {
  include_adult: false,
  region:'EG',
};
const extraParams = {
        with_origin_country: "EG",
        with_original_language:'ar',
        'primary_release_date.gte':'2020-01-01',
        'primary_release_date.lte':'2025-12-31',
  };
const tmdbApi = {
  getMoviesList: (params = {}) => {
    const url = "discover/movie";
    return axiosInstance.get(url, {params: {...mainParams,...extraParams,...params}});
  },

  getTvList: (params = {}) => {
    const url = "discover/tv";
    return axiosInstance.get(url, {
      params: {...mainParams,...extraParams,
        ...params,
      },
    });
  },
  getVideos: (cate, id) => {
    const url = category[cate] + "/" + id + "/videos";
    return axiosInstance.get(url);
  },
  search: (cate, params = {}) => {
    const url = "search/" + category[cate];
    return axiosInstance.get(url,{params:{...mainParams,...params}});
  },
  detail: (cate, id, params) => {
    const url = category[cate] + "/" + id;
    return axiosInstance.get(url, params);
  },
  credits: (cate, id) => {
    const url = category[cate] + "/" + id + "/credits";
    return axiosInstance.get(url, { params: {} });
  },
  similar: (cate, id) => {
    const url = category[cate] + "/" + id + "/similar";
    return axiosInstance.get(url, { params: {} });
  },
    getDetails: (mediaType, id, language = "en-US") => {
    const url = `/${mediaType}/${id}`;
    return axiosInstance.get(url, {
      params: {
        language,
      },
    });
  },
};

export default tmdbApi;