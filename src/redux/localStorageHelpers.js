export const loadWishlist = () => {
  try {
    const serializedState = localStorage.getItem("wishlist");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load wishlist from localStorage", err);
    return undefined;
  }
};

export const saveWishlist = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("wishlist", serializedState);
  } catch (err) {
    console.error("Could not save wishlist to localStorage", err);
  }
};

// Language
export const loadLanguage = () => {
  try {
    return localStorage.getItem("language") || "en";
  } catch (err) {
    console.error("Could not load language", err);
    return "en";
  }
};

export const saveLanguage = (language) => {
  try {
    localStorage.setItem("language", language);
  } catch (err) {
    console.error("Could not save language", err);
  }
};