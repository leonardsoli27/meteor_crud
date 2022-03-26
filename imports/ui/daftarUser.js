import {
  Meteor
} from "meteor/meteor";
import {
  Template
} from "meteor/templating";
import {
  ReactiveDict
} from "meteor/reactive-dict";

import "./daftarUser.html";
import "./Login.js";
import "./Regist.js";

const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();

Template.daftar.onCreated(function daftarOnCreated() {
  this.state = new ReactiveDict();
});

Template.daftar.events({
  "click .user": function (event) {
    event.preventDefault();
    Meteor.logout();
    Router.go("login");
  },

  "click .deleteUser"() {
    Meteor.call("users.remove", this._id, function (error) {
      if (!error) {
        Router.go("daftar");
        alert("User Berhasil Di Hapus");
      }
    });
  },
});

Template.daftar.helpers({
  users: function () {
    return Meteor.users.find({
      _id: {
        $ne: Meteor.userId(),
      },
    }, {
      sort: {
        createdAt: -1,
      },
    });
  },

  hideCompleted() {
    return Template.instance().state.get(HIDE_COMPLETED_STRING);
  },

  isUserLogged() {
    return isUserLogged();
  },

  getUser() {
    // console.log(getUser());

    if (getUser().username == "admin") {
      Router.go("daftar");
      return getUser();
    } else {
      Router.go("home");
      return getUser();
    }
  },
});

Template.editUser.onCreated(function () {
  this.state = new ReactiveDict();
  const id_user = Router.current().params._id;
  // console.log(id_user);
  const self = this;
  self.userDetail = new ReactiveVar();

  Meteor.call("users.getDetailUser", id_user, function (error, result) {
    if (result) {
      self.userDetail.set(result);
    } else {
      console.log(error);
    }
  });
});

Template.editUser.events({
  "submit .edit-form"(event) {
    event.preventDefault();
    const target = event.target;
    const text = target.username.value;
    const id_user = Router.current().params._id;
    // console.log(text);
    Meteor.call("users.update", text, id_user, function (error) {
      if (!error) {
        alert("Username Berhasil Diubah");
        Router.go("daftar");
      }
    });
  },
});

Template.editUser.helpers({
  editUser: function () {
    // console.log(Template.instance().userDetail.get());
    return Template.instance().userDetail.get();
  },
});