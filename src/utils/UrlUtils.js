/**
 * Update the existing search query and then return it.
 *
 * @param currentSearch
 * @param updatedSearch
 * @returns {URLSearchParams}
 */
export function updateSearchQueries(currentSearch, updatedSearch) {
  const search = new URLSearchParams(currentSearch);

  Object.keys(updatedSearch).forEach((key) => {
    const value = updatedSearch[key];

    if (value === null) {
      search.delete(key);
    } else {
      search.set(key, value);
    }
  });

  return search;
}
