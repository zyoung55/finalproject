<template>
    <div class="home-page">
        <div v-if="loggedIn">
	 <p>Login successfull. Welcome Back! </p>
	  <user-score/>
	</div>
	<div v-else>
	  <intro-page/>
	</div>
   </div>
</template>

<script>
   import UserScore from './UserScore';
   import IntroPage from './IntroPage';
   export default {
   name: 'HomePage',
   data() {
   return {
     user: '',
     }
   },
   components: {UserScore, IntroPage},
   computed: {
     loggedIn: function() {
      	 return this.$store.getters.loggedIn;
	 },
   },
}
</script>

<style scoped>
.home-page {
	   color: #DAE2FF;
}

p {
  color: black;
}

</style>