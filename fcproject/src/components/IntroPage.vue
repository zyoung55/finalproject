<template>
<div>
    <div class="body">
  	<p> &nbsp &nbsp Welcome to the pattern math game! This game is designed to test your ability to find 
<br> the pattern and correctly guess what is happening! If you don't have an account<br> 
already, please feel free to make a username and password so your scores can be saved!</p> 
</div>
    <div>
	<form v-on:submit.prevent="startGame">
	    <button type="submit">Start Game</button>
        </form>
    </div>
    <div v-if="gameStarted">
        <p>Current number correct:  {{ currentNumRight }} </p>   
       <ul>
         <li v-for="number in visualNumbers">
	     {{ number }} 
	 </li>
       </ul>
       <form v-on:submit.prevent="checkGuess">
       	  <input v-model="operatorGuess" placeholder="Operator Guess">
	  <input v-model="numberGuess" placeholder="Integer Guess">
	  <button type="submit">Guess</button>
       </form>  
       <form v-on:submit.prevent="solutionFlip">
         <button type="submit">Show Solution</button>
       </form>
       <div v-if="correctGuess">
       	  <p> You're right. Great job! Press "Start Game" to try again.</p>
       </div>
       <div v-if="incorrectGuess">
       	  <p> Nope. Try again. </p>
       </div>
       <p>Note: Operators include '+', '-', and '*'. Integers must be between 1 and 10.</p>
        <div v-if="solutionDisplay">
         <h1>Solution</h1>
         <ul>
           <li v-for="solutions in solution">
              {{ solutions }}
           </li>
         </ul>
       </div>
    </div>
</div>
</template>

<script>
   export default {
   name: 'IntroPage',
   data() {
   	  return {
	  solution: [],
	  visualNumbers: [],
	  gameStarted: false,
	  solutionDisplay: false,
	  correctGuess: false,
	  incorrectGuess: false,
	  operatorNumOne: 0,
	  operatorNumTwo: 0,
	  operatorOne: '',
	  operatorTwo: '',
	  randomNumber: 0,
	  numberOne: 0,
	  numberTwo: 0,
	  operatorGuess: '',
	  numberGuess: '',
	  currentNumRight: 0,
	  }
   },
   methods: {
   	    startGame: function() {
	    	       this.incorrectGuess = false;
	    	       this.correctGuess = false;
	    	       this.solutionDisplay = false;
	    	       this.createGame();
	    	       this.gameStarted = true;
	    },
            createGame: function() {
	    	this.visualNumbers.length = 0;
		this.solution.length = 0;
		this.operatorNumOne = Math.floor(Math.random() * 3);
                this.operatorNumTwo = Math.floor(Math.random() * 3);
		this.numberOne = Math.floor(Math.random() * 51);
		this.numberTwo = Math.floor(Math.random() * 10) + 1;
		if (this.operatoNumOne === 0) {
		   this.operatorOne = '+';
		}
		if (this.operatorNumOne === 1) {
		   this.operatorOne = '-';
		}
		if (this.operatorNumOne === 2) {
		   this.operatorOne = '*';
		}
		if (this.operatorNumOne === 3) {
		   this.operatorOne = '/'
		}
		if (this.operatorNumTwo	=== 0) {
		   this.operatorTwo = '+';
                }
		if (this.operatorNumTwo	=== 1) {
		   this.operatorTwo = '-';
                }
		if (this.operatorNumTwo	=== 2) {
		   this.operatorTwo = '*';
                }
		if (this.operatorNumTwo	=== 3) {
		   this.operatorTwo = '/'
                }
		var originalNum = this.numberOne;
		console.log("operatorOne:", this.operatorOne, "numberOne:", this.numberOne)
		console.log("this.numberOne:", this.numberOne);
		console.log(this.numberOne);
		this.visualNumbers.push(this.numberOne);
		for (var i = 0; i < 5; ++i) {
		   if (this.operatorOne === '+') {
		      this.numberOne += this.numberTwo;
		   }
		   if (this.operatorOne === '-') {
		      this.numberOne -= this.numberTwo;
		   }
		   if (this.operatorOne === '*') {
		      this.numberOne *= this.numberTwo;
		   }
		   if (this.operatorOne === '/') {
		      this.numberOne /= this.numberTwo;
		   }
		   this.visualNumbers.push(this.numberOne);
		}  
		if (this.operatorOne === '') {
		   this.createGame();
		}
		else {
		     this.solution.push(this.operatorOne);
		     this.solution.push(this.numberTwo);
		}
	}, 
	solutionFlip : function() {
		      this.solutionDisplay = true;
	},
	checkGuess : function() {
		   this.incorrectGuess = false;
		   if (this.operatorGuess === this.solution[0] && 
		      (this.numberGuess / 1 ) === this.solution[1]) {
		      this.correctGuess = true;
		      ++this.currentNumRight;
		      console.log(this.currentNumRight);
		      console.log("hotmama");
		   }
		   else { 
		   	this.incorrectGuess = true;
			this.currentNumRight = 0;
		   }
		   console.log("operatorGuess:", this.operatorGuess, "numberGuess:", this.numberGuess, "this.solution[0]", this.solution[0], "this.solution[1]", this.solution[1]);
		   this.operatorGuess = '';
		   this.numberGuess = '';
	},
},    
}
</script>

<style scoped>
p {
  color: black;
}       
li {
   color: black;
   list-style-type: none;
   float: left;
   padding: 5px;
   border: black 1px;
   text-align: center;
}
</style>