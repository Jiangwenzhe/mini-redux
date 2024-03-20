import React, {
  useContext,
  useLayoutEffect,
  useReducer,
  useSyncExternalStore,
} from "react";
import { bindActionCreators } from "redux";

const Context = React.createContext();

export function Provider({ store, children }) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

/* eslint-disable */
export const connect =
  (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => (props) => {
    const store = useContext(Context);
    const { getState, dispatch, subscribe } = store;
    const stateProps =
      typeof mapStateToProps === "function"
        ? mapStateToProps(getState())
        : getState();
    let dispatchProps = { dispatch };

    if (typeof mapDispatchToProps === "function") {
      dispatchProps = mapDispatchToProps(dispatch);
    } else if (
      Object.prototype.toString.call(mapDispatchToProps) === "[object Object]"
    ) {
      dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
    }

    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    useLayoutEffect(() => {
      const unsubscribe = subscribe(() => {
        forceUpdate();
      });
      return () => {
        unsubscribe();
      };
    }, []);

    return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
  };

export const useSelector = (func) => {
  const store = useContext(Context);
  const { getState, subscribe } = store;

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
      forceUpdate();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return func(getState());
};

export const useSelectorR18 = (func) => {
  const store = useContext(Context);
  const { getState, subscribe } = store;

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const state = useSyncExternalStore(() => subscribe(forceUpdate), getState);

  return func(state);
};

export const useDispatch = () => {
  const store = useContext(Context);
  const { dispatch } = store;
  return dispatch;
};
