export function setSearchQuery(searchQuery){
  return {
    type: '@searchQuery/SET_SEARCH_QUERY',
    searchQuery
  };
}

export default setSearchQuery;
