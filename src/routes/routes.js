import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from '../pages/Login';
import NewSchedule from '../pages/Schedule/NewSchedule';
import NewCategory from "../pages/Category/NewCategory";
import NewCampus from "../pages/Campus/NewCampus";
import NewCourse from "../pages/Course/NewCourse";
import NewEquipament from "../pages/Equipament/NewEquipament";
import NewPlace from "../pages/Place/NewPlace";
import NewUser from "../pages/User/NewUser";
import ViewCampus from "../pages/Campus/ViewCampus";
import ViewCategory from "../pages/Category/ViewCategory";
import ViewCourse from "../pages/Course/ViewCourse";
import ViewEquipament from "../pages/Equipament/ViewEquipament";
import ViewPlace from "../pages/Place/ViewPlace";
import ViewUser from "../pages/User/ViewUser";
import ViewSchedule from "../pages/Schedule/ViewSchedule";
import EditCampus from "../pages/Campus/EditCampus";
import EditCategory from "../pages/Category/EditCategory";
import EditCourse from "../pages/Course/EditCourse";
import EditEquipament from "../pages/Equipament/EditEquipament";
import EditPlace from "../pages/Place/EditPlace";
import EditUser from "../pages/User/EditUser";
import EditSchedule from "../pages/Schedule/EditSchedule";
import DeleteCampus from "../pages/Campus/DeleteCampus";
import DeleteCategory from "../pages/Category/DeleteCategory";
import DeleteCourse from "../pages/Course/DeleteCourse";
import DeleteEquipament from "../pages/Equipament/DeleteEquipament";
import DeletePlace from "../pages/Place/DeletePlace";
import DeleteUser from "../pages/User/DeleteUser";
import DeleteSchedule from "../pages/Schedule/DeleteSchedule";
import Reports from "../pages/Reports";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import AdmRoute from "./AdmRoute";
import RestoreCampus from "../pages/Campus/RestoreCampus";
import RestoreCategory from "../pages/Category/RestoreCategory";
import RestoreCourse from "../pages/Course/RestoreCourse";
import RestoreEquipament from "../pages/Equipament/RestoreEquipament";
import RestorePlace from "../pages/Place/RestorePlace";
import RestoreUser from "../pages/User/RestoreUser";

const Routes = () => (
    <Switch>
      <Route exact path="/" component={Login} />
      <AdmRoute path="/reports" component={Reports} />
      
      <PrivateRoute path="/schedule/new" component={NewSchedule} />
      <PrivateRoute path="/schedule/edit" component={EditSchedule} />
      <PrivateRoute path="/schedule/view" component={ViewSchedule} />
      <PrivateRoute path="/schedule/edit" component={EditSchedule} />
      <PrivateRoute path="/schedule/delete" component={DeleteSchedule} />
      
      <AdmRoute path="/campus/new" component={NewCampus} />
      <AdmRoute path="/campus/edit" component={EditCampus} />
      <AdmRoute path="/campus/delete" component={DeleteCampus} />
      <AdmRoute path="/campus/restore" component={RestoreCampus} />
      <AdmRoute path="/campus/view" component={ViewCampus} />

      <AdmRoute path="/category/new" component={NewCategory} />
      <AdmRoute path="/category/edit" component={EditCategory} />
      <AdmRoute path="/category/delete" component={DeleteCategory} />
      <AdmRoute path="/category/restore" component={RestoreCategory} />
      <AdmRoute path="/category/view" component={ViewCategory} />

      <AdmRoute path="/course/new" component={NewCourse} />
      <AdmRoute path="/course/edit" component={EditCourse} />
      <AdmRoute path="/course/delete" component={DeleteCourse} />
      <AdmRoute path="/course/restore" component={RestoreCourse} />
      <AdmRoute path="/course/view" component={ViewCourse} />

      <AdmRoute path="/equipament/new" component={NewEquipament} />
      <AdmRoute path="/equipament/edit" component={EditEquipament} />
      <AdmRoute path="/equipament/delete" component={DeleteEquipament} />
      <AdmRoute path="/equipament/restore" component={RestoreEquipament} />
      <AdmRoute path="/equipament/view" component={ViewEquipament} />

      <AdmRoute path="/place/new" component={NewPlace} />
      <AdmRoute path="/place/edit" component={EditPlace} />
      <AdmRoute path="/place/delete" component={DeletePlace} />
      <AdmRoute path="/place/restore" component={RestorePlace} />
      <AdmRoute path="/place/view" component={ViewPlace} />

      <AdmRoute path="/user/new" component={NewUser} />
      <AdmRoute path="/user/edit" component={EditUser} />
      <AdmRoute path="/user/delete" component={DeleteUser} />
      <AdmRoute path="/user/restore" component={RestoreUser} />
      <AdmRoute path="/user/view" component={ViewUser} />
      
      <Route path="*" component={NotFound} />
    </Switch>
);

export default Routes;