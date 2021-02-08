const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type){
    case '@movies/SET_MOVIES':
      return [...action.movies];
    default:
      return state;
  }
};

export default reducer;