<template>
   <div>
      <nav class="menu-bar">
        <ul>
	  <li><router-link to="/">Home</router-link></li>
	  <li><router-link to="/Register">Register</router-link></li>
	</ul>
	<span id="forms">
        <form v-on:submit.prevent="userLogin">
	   <input v-model="email" placeholder="Email">
	   <input type="password" v-model="password" placeholder="Password">
	   <button type="submit">Login</button>
	</form>
	<form v-on:submit.prevent="userLogout">
	   <button id="logOut" type="submit">Logout</button>
	</form>
     	<div v-if="loggedIn">
            <p id="username"> current user: {{this.$store.getters.user.username}} </p>
     	</div>
        </span>
     </nav>
     <h1>Pattern Analyzer: The game!</h1>
   </div>
</template>

<script>
export default {
       name: 'AppHeader',
       data() {
       	  return {
	  email: '',
	  password: '',
	  }
      },
      computed: {
      	 loggedIn: function() {
         return this.$store.getters.loggedIn;
	 }
      },
      methods: {
      	       userLogin: function() {
	         this.$store.dispatch('login', {
		    email: this.email,
		    password: this.password,
		    })
		    this.email = '',
		    this.password = ''
	        },
		userLogout: function() {
		this.$store.dispatch('logout')
		},       
	},
}
</script>

<style scoped>
.menu-bar {
       background-color: #D8E1FF;
       padding: 20px;
       text-align: center;
}

form {
     line-height: 15px;
     text-align: center;
}

#createAccount {
       float: right;
       text-align: center;
       display: inline;
       height: 20px;
}

ul {
   text-align: center;
   list-style-type: none;
   line-height: 15px;
}

li {
   float: left;
   display: inline-block;
   text-decoration: none;
   background-color: white;
   padding: 10px;
   border: black;
   border: 1px;
}

h1 {
   color: #FF8177;
   border: black 1px;
   border-style: double;
   background-color: #E8D48C
}

#username {
   border: black 1px;
   display: inline-block;
   float: right;
}

#logOut {
   display: inline-block;
   float: right;
}

#forms {
       display: inline;
}
</style>