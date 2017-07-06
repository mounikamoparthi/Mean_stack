module.exports = function (){
  return {
    add: function(num1, num2) { 
         return num1+num2
    },
    multiply: function(num1, num2) {
         console.log("the mult result is:", num1 * num2); 
    },
    square: function(num) {
         console.log("the square is:", num * num);
    },
    random: function(num1, num2) {
         let greater = Math.max(num1, num2);
         let lesser = num1 + num2 - greater;
         console.log("The random value is:", Math.floor(Math.random() * (greater - lesser + 1)) + lesser);
    }
  }
};