const { createStore, combineReducers } = require("./redux");

// /*counterReducer, 一个子reducer*/
// /*注意：counterReducer 接收的 state 是 state.counter*/
// function counterReducer(state, action) {
//   switch (action.type) {
//     case "INCREMENT":
//       return {
//         count: state.count + 1,
//       };
//     case "DECREMENT":
//       return {
//         ...state,
//         count: state.count - 1,
//       };
//     default:
//       return state;
//   }
// }
// /*InfoReducer，一个子reducer*/
// /*注意：InfoReducer 接收的 state 是 state.info*/
// function InfoReducer(state, action) {
//   switch (action.type) {
//     case "SET_NAME":
//       return {
//         ...state,
//         name: action.name,
//       };
//     case "SET_DESCRIPTION":
//       return {
//         ...state,
//         description: action.description,
//       };
//     default:
//       return state;
//   }
// }

// const reducer = combineReducers({
//   counter: counterReducer,
//   info: InfoReducer,
// });

// let initState = {
//   counter: {
//     count: 0,
//   },
//   info: {
//     name: "前端九部",
//     description: "我们都是前端爱好者！",
//   },
// };

// let store = createStore(reducer, initState);

// store.subscribe(() => {
//   let state = store.getState();
//   console.log(state.counter.count, state.info.name, state.info.description);
// });
// /*自增*/
// store.dispatch({
//   type: "INCREMENT",
// });

// /*修改 name*/
// store.dispatch({
//   type: "SET_NAME",
//   name: "前端九部2号",
// });

/* counter 自己的 state 和 reducer 写在一起*/
let initState = {
  count: 0,
};
function counterReducer(state, action) {
  /*注意：如果 state 没有初始值，那就给他初始值！！*/
  if (!state) {
    state = initState;
  }
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + 1,
      };
    default:
      return state;
  }
}

/*这里没有传 initState 哦 */
const store = createStore(counterReducer);
/*这里看看初始化的 state 是什么*/
console.dir(store.getState());
