/*
--- Day 4: High-Entropy Passphrases ---

A new system policy has been put in place that requires all accounts to use a passphrase instead of simply a password. A passphrase consists of a series of words (lowercase letters) separated by spaces.

To ensure security, a valid passphrase must contain no duplicate words.

For example:

aa bb cc dd ee is valid.
aa bb cc dd aa is not valid - the word aa appears more than once.
aa bb cc dd aaa is valid - aa and aaa count as different words.
The system's full passphrase list is available as your puzzle input. How many passphrases are valid?
*/
const fs = require('fs');
const readline = require('readline');


function IsNumeric(val) {
    return Number(parseFloat(val)) === val;
}

fs.readFile('./input/day-04.txt', 'utf8', (err, data) => { 
    if(err){
        console.log(err)
    } else {
        var pass = 0
        var fail = 0
        
        var lines = data.split('\n');                   // split txt file into lines
        lines.forEach(line => {
            var dictionary = {}
            var words = line.split(' ');                // split lines into words
            // console.log(words)
            words.forEach(word => {                     // loop through words
                if(IsNumeric(dictionary[word])){        // add word to dictionary and keep count
                    dictionary[word] += 1
                } else {
                    dictionary[word] = 1
                }
            })
            var failFlag = false;
            for(word in dictionary){                    // check if there is more than 1 of each word
                if (dictionary[word] > 1){
                    fail++;
                    failFlag = true;
                    break;
                }
            }
            if (!failFlag){
                pass++
            }
        })
        console.log("Part 1 - Pass: "+pass, "Fail: "+fail)
    }
})

/*
--- Part Two ---

For added security, yet another system policy has been put in place. Now, a valid passphrase must contain no two words that are anagrams of each other - that is, a passphrase is invalid if any word's letters can be rearranged to form any other word in the passphrase.

For example:

abcde fghij is a valid passphrase.
abcde xyz ecdab is not valid - the letters from the third word can be rearranged to form the first word.
a ab abc abd abf abj is a valid passphrase, because all letters need to be used when forming another word.
iiii oiii ooii oooi oooo is valid.
oiii ioii iioi iiio is not valid - any of these words can be rearranged to form any other word.
Under this new system policy, how many passphrases are valid?
*/

fs.readFile('./input/day-04.txt', 'utf8', (err, data) => { 
    if(err){
        console.log(err)
    } else {
        var pass = 0
        var fail = 0
        
        var lines = data.split('\n');                   // split txt file into lines
        lines.forEach(line => {
            var dictionary = {}
            var words = line.split(' ');                // split lines into words
            // console.log(words)
            words.forEach(word => {                     // loop through words
                var anagram = word.toLowerCase().split("").sort()
                // console.log(anagram)
                if(IsNumeric(dictionary[anagram])){     // add word to dictionary and keep count
                    dictionary[anagram] += 1
                } else {
                    dictionary[anagram] = 1
                }
            })
            var failFlag = false;
            for(word in dictionary){                    // check if there is more than 1 of each word
                if (dictionary[word] > 1){
                    fail++;
                    failFlag = true;
                    break;
                }
            }
            if (!failFlag){
                pass++
            }
        })
        console.log("Part 2 - Pass: "+pass, "Fail: "+fail)
    }
})