import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
	    user : {},
	    loggedIn: false,
	    loginError: '',
	    registerError: '',
	},
	    getters: {
	    user: state => state.user,
		loggedIn: state => state.loggedIn,
		loginError: state => state.loginError,
		registerError: state => state.registerError
	},
	    mutations: {
	    setUser (state, user) {
		state.user = user;
	    },
	    setLogin (state, loggedInStatus) {
	        state.loggedIn = loggedInStatus;
	    },
	    setLoginError (state, currentLogError) {
		state.loginError = currentLogError;
	    },
	    setRegisterError (state, currentRegisterError) {
		state.registerError = currentRegisterError;
	    }
	},
	    actions: {
	    login (context, user) {
		console.log("DRAKE AND JOSH");
		axios.post("/api/login", user).then(response => {
			context.commit('setUser', response.data.user);
			context.commit('setLogin', true);
			context.commit('setLoginError', '');
			context.commit('setRegisterError', '');
			/*console.log(user, 'getLoggedIn');*/
		    }).catch(error => {
			    context.commit('setLogin', false);
			    if (error.response.status === 400) {
				context.commit('setLoginError', "Some information not added.")
			    }
			    if (error.response.status === 403) {
				context.commit('setLoginError', "Invalid Credentials")
			    }
			});
	    },
	    register (context, user) {
		console.log("user", user);
		axios.post("/api/users", user).then(response => {
			console.log("user", user);
			context.commit('setUser', response.data.user);
			context.commit('setLogin', true);
			context.commit('setLoginError', '');
			context.commit('setRegisterError', '');
		    }).catch(error => {
			    context.commit('setLogin', false);
			    if (error.response.status === 400) {
				    context.commit('setLoginError', "Invalid credentials.")
			    }
			    else if (error.response.status === 403) {
				context.commit('setRegisterError', "Email already in use.")
			    }
			    else if (error.response.status === 409) {
				context.commit('setRegisterError', "Username already in use.")
			    }
			    else { 
				context.commit('setRegisterError', "Unknown problem. We will resolve it as fast as possible.")
			    }
			});
		    },
	    logout (context) {
		context.commit('setUser', {});
		context.commit('setLogin', false);
		context.commit('setLoginError', '');
		context.commit('setRegisterError', '');
	    }
	 }
});