import {
    Meteor
} from 'meteor/meteor';
import {
    Template
} from 'meteor/templating';
import {
    TasksCollection
} from '../db/TasksCollection';
import {
    ReactiveDict
} from 'meteor/reactive-dict';
import './App.html';
import './Task.js';
import './Login.js';
import './Regist.js';
import './daftarUser.js'

const HIDE_COMPLETED_STRING = 'hideCompleted';

const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();

const getTasksFilter = () => {
    const user = getUser();

    const hideCompletedFilter = {
        isChecked: {
            $ne: true
        }
    };
    const userFilter = user ? {
        userId: user._id
    } : {};

    const pendingOnlyFilter = {
        ...hideCompletedFilter,
        ...userFilter
    };
    return {
        userFilter,
        pendingOnlyFilter
    };
}

Template.home.onCreated(function homeOnCreated() {
    this.state = new ReactiveDict();
});

Template.home.events({
    'click #hide-completed-button'(event, instance) {
        const currentHideCompleted = instance.state.get(HIDE_COMPLETED_STRING);
        instance.state.set(HIDE_COMPLETED_STRING, !currentHideCompleted);
    },
    "click .user": function (event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});

Template.home.helpers({
    tasks() {
        const instance = Template.instance();
        const hideCompleted = instance.state.get(HIDE_COMPLETED_STRING);

        const {
            pendingOnlyFilter,
            userFilter
        } = getTasksFilter();

        if (!isUserLogged()) {
            return [];
        }

        return TasksCollection.find(hideCompleted ? pendingOnlyFilter : userFilter, {
            sort: {
                createdAt: -1
            },
        }).fetch();
    },

    hideCompleted() {
        return Template.instance().state.get(HIDE_COMPLETED_STRING);
    },

    incompleteCount() {
        if (!isUserLogged()) {
            return '';
        }

        const {
            pendingOnlyFilter
        } = getTasksFilter();

        const incompleteTasksCount = TasksCollection.find(pendingOnlyFilter).count();
        return incompleteTasksCount ? `(${incompleteTasksCount})` : '';
    },

    isUserLogged() {
        return isUserLogged();
    },

    getUser() {
        return getUser();
    }
});

Template.form.events({
    'submit .task-form'(event) {

        event.preventDefault();

        const target = event.target;
        const text = target.text.value;

        if (!text) {
            alert("Text Kosong")
        } else {
            Meteor.call('tasks.insert', text);
            queueMicrotask
            target.text.value = '';
        }
    },
});