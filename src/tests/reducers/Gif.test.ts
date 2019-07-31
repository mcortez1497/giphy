import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";

import {
  AppState,
  addGifs,
  setGifs,
  setPagination,
  getGifs,
  getMoreGifs,
  GifAction,
  gifReducer
} from "reducers";
import { Gif, GifPagination } from "types";
import { Api } from "services";

const middlewares = [thunkMiddleware];
const mockStore = configureStore(middlewares);

const initialState = {
  items: [],
  pagination: {
    count: 0,
    offset: 0,
    total_count: 0
  },
  query: ""
};

const responseMock = {
  data: [
    {
      id: "giphy_123",
      title: "test",
      height: "100",
      images: {
        fixed_width: {
          webp: "fixed_url"
        },
        original: {
          url: "original_url"
        }
      }
    }
  ],
  pagination: {
    count: 10,
    offset: 0,
    total_count: 100
  }
};

describe("Gif State", () => {
  describe("Actions", () => {
    it("returns addGifs action", () => {
      const gif: Gif = {
        giphy_id: "giphy_123",
        fixed_url: "fixed_url",
        original_url: "original_url",
        title: "test",
        height: "100",
        categories: []
      };
      expect(addGifs([gif])).toMatchSnapshot();
    });

    it("returns setGifs action", () => {
      const gif: Gif = {
        giphy_id: "giphy_123",
        fixed_url: "fixed_url",
        original_url: "original_url",
        title: "test",
        height: "100",
        categories: []
      };
      expect(setGifs([gif], "test")).toMatchSnapshot();
    });

    it("returns setPagination action", () => {
      const pagination: GifPagination = {
        count: 10,
        offset: 0,
        total_count: 100
      };
      expect(setPagination(pagination)).toMatchSnapshot();
    });
  });

  describe("Reducer", () => {
    it("add a gif", () => {
      const action = {
        type: "ADD_GIFS",
        items: [{
          giphy_id: "giphy_123",
          fixed_url: "fixed_url",
          original_url: "original_url",
          title: "test",
          height: "100",
          categories: []
        }]
      };
      expect(gifReducer(initialState, action)).toMatchSnapshot();
    });

    it("sets the array of gifs", () => {
      const action = {
        type: "SET_GIFS",
        items: [{
          giphy_id: "giphy_123",
          fixed_url: "fixed_url",
          original_url: "original_url",
          title: "test",
          height: "100",
          categories: []
        }],
        query: "test"
      };
      expect(gifReducer(initialState, action)).toMatchSnapshot();
    });

    it("sets pagination", () => {
      const action = {
        type: "SET_PAGINATION",
        pagination: {
          count: 10,
          offset: 0,
          total_count: 100
        }
      };
      expect(gifReducer(initialState, action)).toMatchSnapshot();
    });
  });

  describe("Thunks", () => {
    let store: MockStoreEnhanced<
      {},
      ThunkDispatch<AppState, undefined, GifAction>
    > = mockStore({
      gifs: initialState
    });

    beforeEach(() => {
      store.clearActions();
    });

    it("calls getGifs", () => {
      store = mockStore({
        gifs: initialState
      });

      Api.fetch = jest
        .fn()
        .mockImplementation((url: string) =>
          Promise.resolve(responseMock)
        );

      return store.dispatch(getGifs()).then(() => {
        expect(Api.fetch).toHaveBeenCalled();
        expect(store.getActions()).toMatchSnapshot();
      });
    });

    it("calls getMoreGifs", () => {
      store = mockStore({
        gifs: initialState
      });

      const responseData = {
        data: [
          {
            id: "giphy_456",
            title: "test",
            height: "100",
            images: {
              fixed_width: {
                webp: "fixed_url"
              },
              original: {
                url: "original_url"
              }
            }
          }
        ],
        pagination: {
          count: 10,
          offset: 0,
          total_count: 100
        }
      };

      Api.fetch = jest
        .fn()
        .mockImplementation((url: string) => Promise.resolve(responseData));

      return store.dispatch(getMoreGifs()).then(() => {
        expect(Api.fetch).toHaveBeenCalled();
        expect(store.getActions()).toMatchSnapshot();
      });
    });
  });
});
