function createStore(reducer, initState, rewriteCreateStoreFunc) {
  if (rewriteCreateStoreFunc) {
    const newCreateStore = rewriteCreateStoreFunc(createStore);
    return newCreateStore(reducer, initState);
  }

  let state = initState;
  let listeners = [];

  function subscribe(listener) {
    listeners.push(listener);
    // 退订功能
    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }

  function getState() {
    return state;
  }

  /* 注意！！！只修改了这里，用一个不匹配任何计划的 type，来获取初始值 */
  dispatch({ type: Symbol() });

  return {
    subscribe,
    getState,
    dispatch,
  };
}

function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);

  // 返回新的 reducer 函数
  return function combination(state = {}, action) {
    const nextState = {};
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const reducer = reducers[key];
      // 之前的 key 的 state
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForKey;
    }
    return nextState;
  };
}

const applyMiddleware = function (...middlewares) {
  return function (oldCreateStore) {
    // 生成新的 createStore
    return function newCreateSotore(reducer, initState) {
      const store = oldCreateStore(reducer, initState);
      /*给每个 middleware 传下store，相当于 const logger = loggerMiddleware(store);*/
      /* const chain = [exception, time, logger]*/
      const chain = middlewares.map((middleware) => middleware(store));
      let dispatch = store.dispatch;
      /* 实现 exception(time((logger(dispatch))))*/
      chain.reverse().map((middleware) => {
        dispatch = middleware(dispatch);
      });

      // 重写 dispatch
      store.dispatch = dispatch;
      return store;
    };
  };
};

export default function compose(...funcs) {
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}

module.exports = { createStore, combineReducers, applyMiddleware };
