<template>
  <div>
	<h1>Register</h1>
	<p>We would love to have you join the site! Please simply add<br>
	an email, username and password.<br>
        <form v-on:submit.prevent="userRegister">
           <input v-model="email" placeholder="Email">
	   <input v-model="username" placeholder="UserName">
           <input v-model="password" placeholder="Password">
           <button type="submit">Submit</button>
        </form>
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
      		}
	},
}
</script>

<style scoped>

</style>