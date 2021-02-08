const initialState = '';

const reducer = (state = initialState, action) => {
  switch (action.type){
    case '@searchQuery/SET_SEARCH_QUERY':
      return action.searchQuery;
    default:
      return state;
  }
};

export default reducer;