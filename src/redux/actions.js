import { types } from './types';

const saveFiltersToLocalStorage = (filters) => {
  localStorage.setItem("savedFilters", JSON.stringify(filters));
};


export const filterItems = (data) => (dispatch, getState) => {
  const {
    query,
    selectedCategories,
    selectedBrands,
    minPrice,
    maxPrice,
    minRating,
    maxRating,
  } = getState().search;

  const queryLower = query.trim().toLowerCase();
  const hasCategoryFilter = selectedCategories.length > 0;
  const hasBrandFilter = selectedBrands.length > 0;


  const matchesQuery = (product) => {
    const nameLower = product.name.toLowerCase();
    const brandLower = product.brand.toLowerCase();
    return !queryLower || nameLower.includes(queryLower) || brandLower.includes(queryLower);
  };

  const matchesCategory = (product) => !hasCategoryFilter || selectedCategories.includes(product.category);
  const matchesBrandFilter = (product) => !hasBrandFilter || selectedBrands.includes(product.brand);
  const matchesPrice = (product) => (minPrice === undefined || product.price >= minPrice) && (maxPrice === undefined || product.price <= maxPrice);
  const matchesRating = (product) => (minRating === undefined || product.rating >= minRating) && (maxRating === undefined || product.rating <= maxRating);


  const filteredItems = data.filter((product) => (
    matchesQuery(product) &&
    matchesCategory(product) &&
    matchesBrandFilter(product) &&
    matchesPrice(product) &&
    matchesRating(product)
  ));


  saveFiltersToLocalStorage({
    query,
    selectedCategories,
    selectedBrands,
    minPrice,
    maxPrice,
    minRating,
    maxRating,
  });

  dispatch({ type: types.FILTER_ITEMS, payload: filteredItems });
};





export const clearCategories = () => ({
  type: types.CLEAR_CATEGORIES,
});

export const clearBrands = () => ({
  type: types.CLEAR_BRANDS,
});


export const handleChangeRadio = (e, type) => (dispatch, getState) => {
  const { value } = e.target;
  const { selectedCategories, selectedBrands } = getState().search;

  if (type === 'category') {
    if (value === 'All') {
      dispatch(clearCategories());
    } else {
      const newCategories = selectedCategories.includes(value)
        ? selectedCategories.filter(category => category !== value)
        : [...selectedCategories, value];
      dispatch({ type: types.FILTER_CATEGORY, payload: newCategories });
    }
  } else if (type === 'brand') {
    if (value === 'All') {
      dispatch(clearBrands());
    } else {
      const newBrands = selectedBrands.includes(value)
        ? selectedBrands.filter(brand => brand !== value)
        : [...selectedBrands, value];
      dispatch({ type: types.FILTER_BRAND, payload: newBrands });
    }
  }
};


export const setPriceRange = (minPrice, maxPrice) => ({
  type: types.SET_PRICE_RANGE,
  payload: { minPrice, maxPrice },
});

export const setRatingRange = (minRating, maxRating) => ({
  type: types.SET_RATING_RANGE,
  payload: { minRating, maxRating },
});


export const setQuery = (query) => ({
  type: types.SET_QUERY,
  payload: query,
});

