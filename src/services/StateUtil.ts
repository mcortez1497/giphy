import { AppState, defaultApiRequest } from "reducers";

class StateUtil {
  // Returns the ApiRequest object for an action, or a default object
  // if that API request hasn't been made yet.
  public getApiRequest = (state: AppState, apiRequestAction: string) =>
    state.api[apiRequestAction] || defaultApiRequest;

  // Returns the list of current "fresh" gifs merged with
  // currently saved gifs if there is any overlap
  public getFreshGifsMergedWithSavedGifs = (state: AppState) =>
    state.gifs.items.map(
      gif =>
        state.user.gifs.find(userGif => userGif.giphy_id === gif.giphy_id) ||
        gif
    );

  // Returns a list of saved gifs for a given category
  public getSavedGifsByCategory = (state: AppState, categoryId: string) =>
    state.user.gifs.filter(
      gif =>
        gif.categories &&
        gif.categories.find(category => category._id === categoryId)
    );

  // Returns a list of categories sorted alphabetically by name
  public getSortedCategories = (state: AppState) =>
    state.user.categories.items.sort((a, b) => (a.name > b.name ? 1 : -1));
}

const StateUtilSingleton = new StateUtil();
export { StateUtilSingleton as StateUtil };
