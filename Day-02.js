/*
--- Day 2: Corruption Checksum ---

As you walk through the door, a glowing humanoid shape yells in your direction. "You there! Your state appears to be idle. Come help us repair the corruption in this spreadsheet - if we take another millisecond, we'll have to display an hourglass cursor!"

The spreadsheet consists of rows of apparently-random numbers. To make sure the recovery process is on the right track, they need you to calculate the spreadsheet's checksum. For each row, determine the difference between the largest value and the smallest value; the checksum is the sum of all of these differences.

For example, given the following spreadsheet:

5 1 9 5
7 5 3
2 4 6 8
The first row's largest and smallest values are 9 and 1, and their difference is 8.
The second row's largest and smallest values are 7 and 3, and their difference is 4.
The third row's difference is 6.
In this example, the spreadsheet's checksum would be 8 + 4 + 6 = 18.

What is the checksum for the spreadsheet in your puzzle input?
*/

// node imports
const fs = require('fs');
const readline = require('readline');


function IsNumeric(val) {
    return Number(parseFloat(val)) === val;
}

fs.readFile('./input/day-02.txt', 'utf8', (err, data) => { // data returns a string buffer
    if(err){
        console.log(err)
    } else {
        var lines = data.split('\n')              // split lines into array
        var checksum = 0;
        lines.forEach(line => {                   // process each line
            var numbers = line.split('\t');       // split each number into array
            var min = Number.MAX_SAFE_INTEGER;
            var max = Number.MIN_SAFE_INTEGER;
            numbers.forEach(number => {           // process each number
                num = parseInt(number)
                if(num<min){
                    min = num
                }
                if(num>max){
                    max = num
                }
            })
            checksum += (max-min);
        })
        console.log("Day 2 Part 1 Solution: " + checksum)
    }
})

/*
--- Part Two ---

"Great work; looks like we're on the right track after all. Here's a star for your effort." However, the program seems a little worried. Can programs be worried?

"Based on what we're seeing, it looks like all the User wanted is some information about the evenly divisible values in the spreadsheet. Unfortunately, none of us are equipped for that kind of calculation - most of us specialize in bitwise operations."

It sounds like the goal is to find the only two numbers in each row where one evenly divides the other - that is, where the result of the division operation is a whole number. They would like you to find those numbers on each line, divide them, and add up each line's result.

For example, given the following spreadsheet:

5 9 2 8
9 4 7 3
3 8 6 5
In the first row, the only two numbers that evenly divide are 8 and 2; the result of this division is 4.
In the second row, the two numbers are 9 and 3; the result is 3.
In the third row, the result is 2.
In this example, the sum of the results would be 4 + 3 + 2 = 9.
*/

fs.readFile('./input/day-02.txt', 'utf8', (err, data) => { // data returns a string buffer
    if(err){
        console.log(err)
    } else {
        var lines = data.split('\n')
        var checksum = 0;
        lines.forEach(line => {
            var numbers = line.split('\t').sort(function(a, b){return b-a});   // split and sort (desc) numbers into array
            for(var i = 0; i < numbers.length; i++){
                for(var j = i+1; j < numbers.length; j++){
                    if(parseInt(numbers[i]) % parseInt(numbers[j]) === 0){
                        checksum+=(numbers[i]/numbers[j])
                    }
                }
            }
        })
        console.log("Day 2 Part 2 Solution: " + checksum)
    }
})