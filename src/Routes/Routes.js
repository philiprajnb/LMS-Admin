import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ManageLeads from "../Pages/ManageLeads/ManageLeads"
import ManageAgents from "../Pages/ManageAgents/ManageAgents"
import Reports from "../Pages/Reports/Reports"
import AuditLog from "../Pages/AuditLog/AuditLog";
import NotFound from "../Pages/NotFound/NotFound";

const token = localStorage.getItem("token");
const Routes = (props) => (
 
  <Router {...props} >
    <Switch>

      <Route path="/login">
        <Login />
      </Route>
      
      <Route
       path="/"
       exact
       render={()=>{
        return token!==null?(
          <Dashboard/>
        ):<Redirect to='/login' />
       }}
       >
        
      </Route>
      <Route
       path="/dashboard"
       exact
       render={()=>{
        return token!==null?(
          <Dashboard/>
        ):<Redirect to='/login' />
       }}
       >
        
      </Route>
      <Route
       path="/manageleads"
       exact
       render={()=>{
        return token!==null?(
          <ManageLeads/>
        ):<Redirect to='/login' />
       }}
       >
        
      </Route>
      <Route
       path="/manageagents"
       exact
       render={()=>{
        return token!==null?(
          <ManageAgents/>
        ):<Redirect to='/login' />
       }}
       >
      </Route>
      <Route
       path="/reports"
       exact
       render={()=>{
        return token!==null?(
          <Reports/>
        ):<Redirect to='/login' />
       }}
       ></Route>
       <Route
       path="/auditlog"
       exact
       render={()=>{
        return token!==null?(
          <AuditLog/>
        ):<Redirect to='/login' />
       }}
       ></Route>
      <Route path="*" >
        <NotFound/>
      </Route>
    </Switch>
  </Router>
  
);
export default Routes;