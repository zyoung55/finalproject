<template>
  <div>
	<h1>Register</h1>
	<p>We would love to have you join the site! Please simply add<br>
	an email, username and password.<br>
        <form v-on:submit.prevent="userRegister">
           <input v-model="email" placeholder="Email">
	   <input v-model="username" placeholder="UserName">
           <input type="password" v-model="password" placeholder="Password">
           <button type="submit">Submit</button>
        </form>
	<div v-if="registeredSuccess">
	   <p> Welcome {{this.$store.getters.user.username}}! Go back to the home page to get started! </p>
	</div>
	<div v-if="registeredFailure">
	   <p> Sorry there was an error. It is likely that the email or username you entered is<br>
	   already in the system. Please try again with a different input.</p>
	</div>
   </div>
</template>

<script>
export default {
       name: 'Register',
       data() {
       	      return {
	      email: '',
	      username: '',
	      password: '',
	      registerError: '',
	      registeredSuccess: false,
	      registeredFailure: false,
	      alreadyLoggedIn: false,
	      }
       },
       methods: {
       		userRegister: function() {
          	   this.$store.dispatch('register', {
		       email: this.email,
		       username: this.username,
		       password: this.password,
		   })
		   this.email = '',
		   this.username = '',
		   this.password = ''
		   this.registerError = this.$store.getters.registerError; 
		   if (this.registerError === '') {
		       this.registeredSuccess = true;
		       this.registeredFailure = false;
		   }
		   else {
		        this.registeredSuccess = false;
		   	this.registeredFailure = true;
		   }
      		}
	},
}
</script>

<style scoped>

</style>