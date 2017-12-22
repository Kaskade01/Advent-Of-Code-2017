/*
--- Day 6: Memory Reallocation ---

A debugger program here is having an issue: it is trying to repair a memory reallocation routine, but it keeps getting stuck in an infinite loop.

In this area, there are sixteen memory banks; each memory bank can hold any number of blocks. The goal of the reallocation routine is to balance the blocks between the memory banks.

The reallocation routine operates in cycles. In each cycle, it finds the memory bank with the most blocks (ties won by the lowest-numbered memory bank) and redistributes those blocks among the banks. To do this, it removes all of the blocks from the selected bank, then moves to the next (by index) memory bank and inserts one of the blocks. It continues doing this until it runs out of blocks; if it reaches the last memory bank, it wraps around to the first one.

The debugger would like to know how many redistributions can be done before a blocks-in-banks configuration is produced that has been seen before.

For example, imagine a scenario with only four memory banks:

The banks start with 0, 2, 7, and 0 blocks. The third bank has the most blocks, so it is chosen for redistribution.
Starting with the next bank (the fourth bank) and then continuing to the first bank, the second bank, and so on, the 7 blocks are spread out over the memory banks. The fourth, first, and second banks get two blocks each, and the third bank gets one back. The final result looks like this: 2 4 1 2.
Next, the second bank is chosen because it contains the most blocks (four). Because there are four memory banks, each gets one block. The result is: 3 1 2 3.
Now, there is a tie between the first and fourth memory banks, both of which have three blocks. The first bank wins the tie, and its three blocks are distributed evenly over the other three banks, leaving it with none: 0 2 3 4.
The fourth bank is chosen, and its four blocks are distributed such that each of the four banks receives one: 1 3 4 1.
The third bank is chosen, and the same thing happens: 2 4 1 2.
At this point, we've reached a state we've seen before: 2 4 1 2 was already seen. The infinite loop is detected after the fifth block redistribution cycle, and so the answer in this example is 5.

Given the initial block counts in your puzzle input, how many redistribution cycles must be completed before a configuration is produced that has been seen before?
*/
const fs = require('fs');
const readline = require('readline');

function IsNumeric(val) {
    return Number(parseFloat(val)) === val;
}

function processState(state){
    findBigBank(state)
}

function findBigBank(state){
    var bank_with_most_blocks = 0;
    for(var i = 0; i < state.length; i++){
        if(state[i] > state[bank_with_most_blocks]){
            bank_with_most_blocks = i;
        }
    }
    redistributeBank(bank_with_most_blocks, state)
}

function redistributeBank(bank, state){
    var blocks = state[bank];
    state[bank] = 0;
    bank++;
    while (blocks > 0){
        if (IsNumeric(state[bank])){
            state[bank]++;
            bank++;
        } else {
            bank = 0;
            state[bank]++;
            bank++
        }
        blocks--;
    }
}

fs.readFile('./input/day-06.txt', 'utf8', (err, data) => { 
    if(err){
        console.log(err)
    } else {
        var cycles = 0;
        var saved_states = {}
        // split numbers into array and parse array elements as integers
        var state = data.split('\t').map((str) => {return parseInt(str)});

        var loopFlag = true;
        while(loopFlag){
            processState(state)             // mutates state in redistributeBank()
            if ( IsNumeric(saved_states[String(state)]) ){
                saved_states[String(state)]++
                loopFlag = false;
            } else {
                saved_states[String(state)] = 1
            }
            cycles++
        } // end loop
        console.log(state)
        console.log(cycles)
        findLoopSize(state)
    }
})

/*
--- Part Two ---
Out of curiosity, the debugger would also like to know the size of the loop: starting from a state that has already been seen, how many block redistribution cycles must be performed before that same state is seen again?

In the example above, 2 4 1 2 is seen again after four cycles, and so the answer in that example would be 4.

How many cycles are in the infinite loop that arises from the configuration in your puzzle input?
*/

function findLoopSize(state){
    var cycles = 0;
    var saved_states = {}
    
    // add initial state to saved states
    saved_states[String(state)] = 1

    var loopFlag = true;
    while(loopFlag){
        processState(state)             // mutates state in redistributeBank()
        if ( IsNumeric(saved_states[String(state)]) ){
            saved_states[String(state)]++
            loopFlag = false;
        } else {
            saved_states[String(state)] = 1
        }
        cycles++
    } // end loop
    console.log("Part 2:")
    console.log(state)
    console.log(cycles)
}