import {
  setUsername,
  setUserCategories,
  setUserGifs,
  userReducer
} from "reducers";
import { Category, Gif } from "types";

const initialState = {
  username: "",
  gifs: [],
  categories: {
    items: []
  }
};

describe("User State", () => {
  describe("Actions", () => {
    it("returns setUsername action", () => {
      expect(setUsername("test")).toMatchSnapshot();
    });

    it("returns setUserCategories action", () => {
      const category = { _id: "123", name: "abc" } as Category;
      expect(setUserCategories([category])).toMatchSnapshot();
    });

    it("returns setUserGifs action", () => {
      const gif: Gif = {
        giphy_id: "giphy_123",
        fixed_url: "fixed_url",
        original_url: "original_url",
        title: "test",
        height: "100",
        categories: []
      };
      expect(setUserGifs([gif])).toMatchSnapshot();
    });
  });

  describe("Reducer", () => {
    it("add a category", () => {
      const action = {
        type: "ADD_USER_CATEGORY",
        category: { _id: "123", name: "abc" }
      };
      expect(userReducer(initialState, action)).toMatchSnapshot();
    });

    it("Adds a gif", () => {
      const action = {
        type: "ADD_USER_GIF",
        gif: {
          giphy_id: "giphy_123",
          fixed_url: "fixed_url",
          original_url: "original_url",
          title: "test",
          height: "100",
          categories: []
        }
      };
      expect(userReducer(initialState, action)).toMatchSnapshot();
    });

    it("Delete a category", () => {
      const state = {
        ...initialState,
        categories: {
          items: [{ _id: "123", name: "abc" }]
        }
      };
      const action = {
        type: "DELETE_USER_CATEGORY",
        id: "123"
      };
      expect(userReducer(state, action)).toMatchSnapshot();
    });

    it("Delete a gif", () => {
      const state = {
        ...initialState,
        gifs: [
          {
            _id: "123",
            giphy_id: "giphy_123",
            fixed_url: "fixed_url",
            original_url: "original_url",
            title: "test",
            height: "100",
            categories: []
          }
        ]
      };
      const action = {
        type: "DELETE_USER_GIF",
        id: "123"
      };
      expect(userReducer(state, action)).toMatchSnapshot();
    });

    it("Update a gif", () => {
      const state = {
        ...initialState,
        gifs: [
          {
            _id: "123",
            giphy_id: "giphy_123",
            fixed_url: "fixed_url",
            original_url: "original_url",
            title: "test",
            height: "100",
            categories: []
          }
        ]
      };
      const action = {
        type: "UPDATE_USER_GIF",
        gif: {
          _id: "123",
          giphy_id: "giphy_456",
          fixed_url: "fixed_url",
          original_url: "original_url",
          title: "test",
          height: "100",
          categories: []
        }
      };
      expect(userReducer(state, action)).toMatchSnapshot();
    });

    it("Reset User", () => {
      const state = {
        ...initialState,
        username: "test"
      };
      const action = {
        type: "RESET_USER"
      };
      expect(userReducer(state, action)).toMatchSnapshot();
    });

    it("Set Username", () => {
      const action = {
        type: "SET_USERNAME",
        username: "test"
      };
      expect(userReducer(initialState, action)).toMatchSnapshot();
    });

    it("Set User Categories", () => {
      const action = {
        type: "SET_USER_CATEGORIES",
        categories: [{ _id: "123", name: "abc" }]
      };
      expect(userReducer(initialState, action)).toMatchSnapshot();
    });

    it("Set User Gifs", () => {
      const action = {
        type: "SET_USER_GIFS",
        gifs: [
          {
            _id: "123",
            giphy_id: "giphy_123",
            fixed_url: "fixed_url",
            original_url: "original_url",
            title: "test",
            height: "100",
            categories: []
          }
        ]
      };
      expect(userReducer(initialState, action)).toMatchSnapshot();
    });
  });
});
