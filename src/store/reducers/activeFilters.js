const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type){
    case '@activeFilters/SET_ACTIVE_FILTERS':
      return [...action.activeFilters];
    default:
      return state;
  }
};

export default reducer;