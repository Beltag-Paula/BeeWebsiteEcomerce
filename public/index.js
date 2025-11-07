var index = parseInt(prompt("Number of days: "));
var myDays = [];
var sum = 0;

console.log("Enter your " + index + " days here:");
for (var i = 0; i < index; i++) {
   myDays[i] = Number(prompt("Enter your day " + (i + 1) + ":"));
}

for (var day of myDays) {
  sum += day;
}

console.log("Your average is " + (sum / index));
