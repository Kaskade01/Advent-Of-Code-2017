/*
--- Day 3: Spiral Memory ---

You come across an experimental new kind of memory stored on an infinite two-dimensional grid.

Each square on the grid is allocated in a spiral pattern starting at a location marked 1 and then counting up while spiraling outward. For example, the first few squares are allocated like this:

17  16  15  14  13
18   5   4   3  12
19   6   1   2  11
20   7   8   9  10
21  22  23---> ...
While this is very space-efficient (no squares are skipped), requested data must be carried back to square 1 (the location of the only access port for this memory system) by programs that can only move up, down, left, or right. They always take the shortest path: the Manhattan Distance between the location of the data and square 1.

For example:

Data from square 1 is carried 0 steps, since it's at the access port.
Data from square 12 is carried 3 steps, such as: down, left, left.
Data from square 23 is carried only 2 steps: up twice.
Data from square 1024 must be carried 31 steps.
How many steps are required to carry the data from the square identified in your puzzle input all the way to the access port?

Your puzzle input is 347991.
*/
const input = 347991;
var inputRow = null;
var inputCol = null;

function startPOS(row, col, square){
    if(square === input){
        inputRow = row
        inputCol = col
    }
}
function getSteps(midRow, midCol, inRow, inCol){
    var xsteps, ysteps
    if(inCol > midCol){
        xsteps = inCol - midCol;
    } else if (midCol > inCol){
        xsteps = midCol-inCol;
    } else {
        xsteps = 0;
    }
    if(inRow > midRow){
        ysteps = inRow - midRow;
    } else if (midRow > inRow){
        ysteps = midRow-inRow;
    } else {
        ysteps = 0;
    }
    return xsteps+ysteps
}

// determine how big the table has to be
var size = 1
while(size*size < input){
    size++
}
// increment to next odd size
if(size%2===0){
    size++;
}
// console.log("table size: " + size);

var left = size             // route 1
var up = size               // route 2
var right = left;       // route 3
var down = up;          // route 4
var square = size*size;     
var route = 1
var table = [];

// construct table with default numbers
var sq = 1
for(var i = 0; i < size; i++){
    var row = []
    for(var j = 0; j < size; j++){
        row.push(sq)
        sq++;
    }
    table.push(row)
}
// console.log(table)

// fill table with real square values
var row = size-1;
var col = size-1;
var loop = 0;
while(square > 0){
    switch(route){
        case 1: // going left... manipulate columns
            // console.log('<')
            for(var i = left-1; i > -1+loop; i--){
                // console.log(row,i,square)
                startPOS(row, i, square)
                table[row][i]=square;
                square--;
                col = i;
            }
            left--;
            route=2;
            break;
        case 2: // going up... manipulate rows
        // console.log('^')
            for(var i = row-1; i > -1+loop; i--){
                // console.log(i,col,square)
                startPOS(i, col, square)
                table[i][col]=square;
                square--;
                row=i;
            }
            up--;
            route=3;
            break;
        case 3: // going right... manipulate columns
        // console.log('>')
            for(var i = col+1; i < right; i++){
                // console.log(row,i,square)
                startPOS(row, i, square)
                table[row][i]=square;
                square--;
                col = i;
            }
            right--;
            route=4;
            break;
        case 4: // going down... manipulate rows
            // console.log('v')
            for(var i = row+1; i < down-1; i++){
                // console.log(i,col,square)
                startPOS(i, col, square)
                table[i][col]=square;
                square--;
                row=i;
            }
            down--;
            route=1;
            loop++;
            break;
    }
}
// console.log(table)
console.log("Input: " + input)
console.log("Mid @ ["+parseInt(size/2)+"]["+parseInt(size/2)+"]")
console.log("input value @ ["+inputRow+"]["+inputCol+"]")
console.log("Steps to middle: " + getSteps( parseInt(size/2), parseInt(size/2), inputRow, inputCol ))


/*
--- Part Two ---

As a stress test on the system, the programs here clear the grid and then store the value 1 in square 1. Then, in the same allocation order as shown above, they store the sum of the values in all adjacent squares, including diagonals.

So, the first few squares' values are chosen as follows:

Square 1 starts with the value 1.
Square 2 has only one adjacent filled square (with value 1), so it also stores 1.
Square 3 has both of the above squares as neighbors and stores the sum of their values, 2.
Square 4 has all three of the aforementioned squares as neighbors and stores the sum of their values, 4.
Square 5 only has the first and fourth squares as neighbors, so it gets the value 5.
Once a square is written, its value does not change. Therefore, the first few squares would receive the following values:

147  142  133  122   59
304    5    4    2   57
330   10    1    1   54
351   11   23   25   26
362  747  806--->   ...
What is the first value written that is larger than your puzzle input?

Your puzzle input is still 347991.
*/

// input carried over from previous section
console.log("PART 2 ------------------")

// create a new blank table
var table2 = [];
for(var i = 0; i < size; i++){
    var row = []
    for(var j = 0; j < size; j++){
        row.push(0)
    }
    table2.push(row)
}
// console.log(table2)

var midRow;
var midCol;
var tbl1Value = 1;

// function returns the position of a value in table 1
function findMid(value){
    var row;
    var col;
    for(var i = 0; i < table.length; i++){
        if(table[i].indexOf(value) > -1){
            row = i;
            col = table[i].indexOf(value);
        }
    }
    midRow = row;
    midCol = col;
    // console.log("inside",midRow, midCol)
}
findMid(tbl1Value);
// console.log(midRow, midCol)

// start with middle value at 1
table2[midRow][midCol] = 1
var loopValue = 1;

while(loopValue < input){
    // generate local sum
    var sum = table2[midRow][midCol];   // mid
    sum += table2[midRow+1][midCol-1]   // NW
    sum += table2[midRow+1][midCol]     // N
    sum += table2[midRow+1][midCol+1]   // NE
    sum += table2[midRow][midCol-1]     // W
    sum += table2[midRow][midCol+1]     // E
    sum += table2[midRow-1][midCol-1]   // SW
    sum += table2[midRow-1][midCol]     // S
    sum += table2[midRow-1][midCol+1]   // SE
    
    // set middle to sum
    table2[midRow][midCol] = sum;
    loopValue = sum;
    // console.log(table2)

    // increment table 1 seek value
    tbl1Value++;

    // get next middle point
    findMid(tbl1Value)
}
// console.log(table2)
console.log("Part 2 solution: " + loopValue)