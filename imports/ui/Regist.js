import {
    Meteor
} from 'meteor/meteor';
import {
    Template
} from 'meteor/templating';
import '/imports/api/tasksMethods';
import './Regist.html';

Template.regist.events({
    'submit .regist-form': function (event) {
        event.preventDefault();
        const {
            target
        } = event;

        var username = target.usernameRegist.value;
        var password = target.passwordRegist.value;

        Accounts.createUser({
            username: username,
            password: password,
        }, function (error) {
            if (error) {
                alert('User Telah Terdaftar');
            } else {
                Router.go('login');
            }
        });
    }
});