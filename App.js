import React from 'react';

import Router from './navigation/Router';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor }  from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <Router />
        </PersistGate>
    </Provider>
  );
};

export default App;