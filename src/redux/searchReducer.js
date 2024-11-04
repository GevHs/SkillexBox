import { types } from './types';
const loadFiltersFromLocalStorage = () => {
  const savedFilters = localStorage.getItem('savedFilters');
  if (savedFilters) {
    try {
      const parsedFilters = JSON.parse(savedFilters);
      return {
        query: parsedFilters.query || '',
        selectedCategories: parsedFilters.selectedCategories || [],
        selectedBrands: parsedFilters.selectedBrands || [],
        minPrice: parsedFilters.minPrice !== undefined ? parsedFilters.minPrice : 0,
        maxPrice: parsedFilters.maxPrice !== undefined ? parsedFilters.maxPrice : 1000,
        minRating: parsedFilters.minRating !== undefined ? parsedFilters.minRating : 1,
        maxRating: parsedFilters.maxRating !== undefined ? parsedFilters.maxRating : 5,
      };
    } catch (error) {
      console.error("Failed to parse saved filters from localStorage", error);
    }
  }
  return {
    query: '',
    selectedCategories: [],
    selectedBrands: [],
    minPrice: 0,
    maxPrice: 1000,
    minRating: 1,
    maxRating: 5,
  };
};


const initialState =   loadFiltersFromLocalStorage()


export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_QUERY:
      return { ...state, query: action.payload };

    case types.FILTER_CATEGORY:
      return { ...state, selectedCategories: action.payload };

    case types.FILTER_BRAND:
      return { ...state, selectedBrands: action.payload };

    case types.FILTER_ITEMS:
      return { ...state, filteredItems: action.payload };


    case types.SELECT_CATEGORY:
      return {
        ...state,
        selectedCategories: state.selectedCategories.includes(action.payload)
          ? state.selectedCategories.filter(category => category !== action.payload)
          : [...state.selectedCategories, action.payload],
      };

    case types.SELECT_BRAND:
      return {
        ...state,
        selectedBrands: state.selectedBrands.includes(action.payload)
          ? state.selectedBrands.filter(brand => brand !== action.payload)
          : [...state.selectedBrands, action.payload],
      };

    case types.SET_PRICE_RANGE:
      return {
        ...state,
        minPrice: action.payload.minPrice,
        maxPrice: action.payload.maxPrice,
      };
    case types.SET_RATING_RANGE:
      return {
        ...state,
        minRating: action.payload.minRating,
        maxRating: action.payload.maxRating,
      };
    case types.CLEAR_CATEGORIES:
      return { ...state, selectedCategories: [] };

    case types.CLEAR_BRANDS:
      return { ...state, selectedBrands: [] };

    default:
      return state;
  }
};
