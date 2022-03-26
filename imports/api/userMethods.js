import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

Meteor.methods({
  "users.remove"(userId) {
    check(userId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    Meteor.users.remove(userId);
  },

  "users.update"(text, userId) {
    check(text, String);
    check(userId, String);

    console.log(userId);
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    Meteor.users.update(userId, {
      $set: {
        username: text,
      },
    });
  },

  "users.getDetailUser"(userId) {
    check(userId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not tidak ada.");
    }

    return Meteor.users.findOne({
      _id: userId,
    });
  },
});
