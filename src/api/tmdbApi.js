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
  region: "EG",
};
const extraParams = {
  with_origin_country: "EG",
  with_original_language: "ar",
  "primary_release_date.gte": "2020-01-01",
  "primary_release_date.lte": "2025-12-31",
};

const tmdbApi = {
  // ✅ Movies List
  getMoviesList: (params = {}) => {
    const url = "discover/movie";
    return axiosInstance.get(url, {
      params: { ...mainParams, ...extraParams, ...params },
    });
  },

  // ✅ TV Shows List
  getTvList: (params = {}) => {
    const url = "discover/tv";
    return axiosInstance.get(url, {
      params: { ...mainParams, ...extraParams, ...params },
    });
  },

  // ✅ Get Videos (for movie or tv)
  getVideos: (cate, id) => {
    const url = `${category[cate]}/${id}/videos`;
    return axiosInstance.get(url, {
      params: { ...mainParams },
    });
  },

  // ✅ Search by category
  search: (cate, params = {}) => {
    const url = `search/${category[cate]}`;
    return axiosInstance.get(url, {
      params: { ...mainParams, ...params },
    });
  },

  // ✅ Get details (movie or tv)
  detail: (cate, id, params = {}) => {
    const url = `${category[cate]}/${id}`;
    return axiosInstance.get(url, {
      params: { ...mainParams, ...params },
    });
  },

  // ✅ Credits (cast and crew)
  credits: (cate, id) => {
    const url = `${category[cate]}/${id}/credits`;
    return axiosInstance.get(url, {
      params: { ...mainParams },
    });
  },

  // ✅ Similar content
  similar: (cate, id, params = {}) => {
    const url = `${category[cate]}/${id}/similar`;
    return axiosInstance.get(url, {
      params: {
        ...mainParams,
        ...extraParams,
        ...params, // هنا تيجي اللغة
      },
    });
  },

  // ✅ Recommendations
  recommendations: (cate, id) => {
    const url = `${category[cate]}/${id}/recommendations`;
    return axiosInstance.get(url, {
      params: { ...mainParams, ...extraParams },
    });
  },

  // ✅ General Get Details with language
  getDetails: (mediaType, id, language = "en-US") => {
    const url = `/${mediaType}/${id}`;
    return axiosInstance.get(url, {
      params: {
        ...mainParams,
        language,
      },
    });
  },
};

export default tmdbApi;

// const tmdbApi = {
//   getMoviesList: (params = {}) => {
//     const url = "discover/movie";
//     return axiosInstance.get(url, {params: {...mainParams,...extraParams,...params}});
//   },

//   getTvList: (params = {}) => {
//     const url = "discover/tv";
//     return axiosInstance.get(url, {
//       params: {...mainParams,...extraParams,
//         ...params,
//       },
//     });
//   },
//   getVideos: (cate, id) => {
//     const url = category[cate] + "/" + id + "/videos";
//     return axiosInstance.get(url);
//   },
//   search: (cate, params = {}) => {
//     const url = "search/" + category[cate];
//     return axiosInstance.get(url,{params:{...mainParams,...params}});
//   },
//   detail: (cate, id, params) => {
//     const url = category[cate] + "/" + id;
//     return axiosInstance.get(url, params);
//   },
//   credits: (cate, id) => {
//     const url = category[cate] + "/" + id + "/credits";
//     return axiosInstance.get(url, { params: {} });
//   },
  // similar: (cate, id) => {
  //   const url = category[cate] + "/" + id + "/similar";
  //   return axiosInstance.get(url, { params: {} });
  // },

//   similar: (cate, id) => {
//   const url = `${category[cate]}/${id}/similar`;
//   return axiosInstance.get(url, {
//     params: {
//       ...mainParams,
//       ...extraParams
//     }
//   });
// },

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
