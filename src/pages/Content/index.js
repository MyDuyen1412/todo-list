import React from "react";
import Add from "../../components/Add";
import ListTodo from "../../components/ListTodo";
import { Route } from "react-router-dom";
import ItemSelected from "../../components/ListTodo/ItemSelected";

function Content() {

  
  return (
    <div>
      <Add />
      <ListTodo/>
      <Route path="/item/:id" component={ItemSelected} />
    </div>
  );
}

export default Content;
