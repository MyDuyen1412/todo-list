import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Content from "./pages/Content";
import AppProvider from "./providers/AppProvider.js";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Switch>
          <Route exact path="/" component={Content} />
        </Switch>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
