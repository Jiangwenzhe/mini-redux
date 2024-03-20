// src/store.js
import { createStore } from "redux";

// Action Types
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

// Action Creators
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });

// Reducer
const initialState = { count: 0 };
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

// Store
export const store = createStore(counterReducer);
