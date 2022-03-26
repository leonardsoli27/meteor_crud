import { Meteor } from "meteor/meteor";
import "../ui/App.js";
import "../ui/Login.js";
import "../ui/Regist.js";

Router.configure({
  layoutTemplate: "mainContainer",
  notFoundTemplate: "notFound404",
  // noRoutesTemplate: "noRoutes",
  // waitOn: function(){
  // return Meteor.subscribe('users');
  // }
});

Router.route("/", {
  name: "login",
  template: "login",
});

Router.route("/regist", {
  name: "regist",
  template: "regist",
});

Router.route("/home", {
  name: "home",
  template: "home",
});

Router.route("/daftarUser", {
  name: "daftar",
  template: "daftar",
});

Router.route("/editUser/:_id", {
  name: "editUser",
  template: "editUser",
});
