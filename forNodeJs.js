function GetNumberFromSquareArray(number, size) {
    if (number === 0) {
        return [
            0,
            0
        ];
    }
    return [
        Math.floor(number / Math.sqrt(size)),
        number - Math.floor(number / Math.sqrt(size)) * Math.sqrt(size)
    ];
}
function randomNumber(min, max) {
    const r = Math.random() * (max - min) + min;
    return Math.floor(r);
}
function MakeString(Board) {
    let outputStr = "";
    Board.forEach((column)=>{
        outputStr += "\n";
        column.forEach((Person)=>{
            outputStr += Person.state;
        });
    });
    return outputStr;
}
function CountInfected(Board) {
    let outputNum = 0;
    Board.forEach((column)=>{
        column.forEach((BoardPerson)=>{
            outputNum += BoardPerson.state == "🟫" ? 1 : 0;
        });
    });
    return outputNum;
}
function roundOff(num, places) {
    const x = Math.pow(10, places);
    return Math.round(num * x) / x;
}
class Person {
    id;
    neighbours = [];
    group;
    states = {
        "Healthy": "🟨",
        "Removed": "🔲",
        "Infected": "🟫"
    };
    state = this.states.Healthy;
    constructor(id, group){
        this.id = id;
        this.group = group;
        this.group.children.push(this);
    }
    calculateNeighbours() {
        this.neighbours = [];
        const coords = GetNumberFromSquareArray(this.id, this.group.Board.cells.length ** 2);
        if (coords[0] === this.group.Board.cells.length - 1 || coords[0] === 0 || coords[1] === this.group.Board.cells.length - 1 || coords[1] === 0) switch(coords[0]){
            case this.group.Board.cells.length - 1:
                if (coords[1] === this.group.Board.cells.length - 1 || coords[1] === 0) {
                    this.neighbours.push(this.group.Board.cells[coords[0] - 1][coords[1]]);
                    if (coords[1] !== 0) this.neighbours.push(this.group.Board.cells[coords[0]][coords[1] - 1]);
                } else {
                    this.neighbours.push(this.group.Board.cells[coords[0] - 1][coords[1]]);
                    this.neighbours.push(this.group.Board.cells[coords[0]][coords[1] - 1]);
                    this.neighbours.push(this.group.Board.cells[coords[0]][coords[1] + 1]);
                }
                break;
            case 0:
                if (coords[1] === this.group.Board.cells.length - 1 || coords[1] === 0) {
                    this.neighbours.push(this.group.Board.cells[coords[0] + 1][coords[1]]);
                    if (coords[1] !== 0) this.neighbours.push(this.group.Board.cells[coords[0]][coords[1] - 1]);
                } else {
                    this.neighbours.push(this.group.Board.cells[coords[0] + 1][coords[1]]);
                    this.neighbours.push(this.group.Board.cells[coords[0]][coords[1] - 1]);
                    this.neighbours.push(this.group.Board.cells[coords[0]][coords[1] + 1]);
                }
                break;
            default:
                if (coords[1] === this.group.Board.cells.length - 1) {
                    this.neighbours.push(this.group.Board.cells[coords[0] - 1][coords[1]]);
                    this.neighbours.push(this.group.Board.cells[coords[0] + 1][coords[1]]);
                    this.neighbours.push(this.group.Board.cells[coords[0]][coords[1] - 1]);
                } else {
                    this.neighbours.push(this.group.Board.cells[coords[0] - 1][coords[1]]);
                    this.neighbours.push(this.group.Board.cells[coords[0] + 1][coords[1]]);
                    this.neighbours.push(this.group.Board.cells[coords[0]][coords[1] + 1]);
                }
        }
        else {
            this.neighbours.push(this.group.Board.cells[coords[0] - 1][coords[1]]);
            this.neighbours.push(this.group.Board.cells[coords[0] + 1][coords[1]]);
            this.neighbours.push(this.group.Board.cells[coords[0]][coords[1] - 1]);
            this.neighbours.push(this.group.Board.cells[coords[0]][coords[1] + 1]);
        }
    }
}
class Group {
    Board = [];
    children = [];
    States = [];
    constructor(size, immune, infected){
        if (Math.sqrt(size) ** 2 !== size) throw Error("Size is not Square");
        this.Board.cells = [];
        this.Board.infected = [];
        for(let i = 0; i < Math.sqrt(size); i++){
            this.Board.cells[i] = [];
            for(let i2 = 0; i2 < Math.sqrt(size); i2++){
                this.Board.cells[i][i2] = new Person(i * Math.sqrt(size) + i2, this);
            }
        }
        let immunenum = 0;
        while(immunenum !== immune){
            const immunecell = randomNumber(0, size);
            const coords = GetNumberFromSquareArray(immunecell, this.Board.cells.length ** 2);
            if (this.Board.cells[coords[0]][coords[1]].state !== this.Board.cells[coords[0]][coords[1]].states.Removed) {
                this.Board.cells[coords[0]][coords[1]].state = this.Board.cells[coords[0]][coords[1]].states.Removed;
                immunenum++;
            }
        }
        let infectednum = 0;
        while(infectednum !== infected){
            const infectedcell = randomNumber(0, size);
            const coords = GetNumberFromSquareArray(infectedcell, this.Board.cells.length ** 2);
            if (this.Board.cells[coords[0]][coords[1]].state !== this.Board.cells[coords[0]][coords[1]].states.Removed) {
                this.Board.cells[coords[0]][coords[1]].state = this.Board.cells[coords[0]][coords[1]].states.Infected;
                this.Board.infected.push(this.Board.cells[coords[0]][coords[1]]);
                infectednum++;
            }
        }
        this.States = [
            this.makeClone(this.Board.cells)
        ];
        this.RecalculateNeighbours();
    }
    RecalculateNeighbours() {
        this.children.forEach((value)=>{
            value.calculateNeighbours();
        });
    }
    SampleVirus(iterations) {
        this.RecalculateNeighbours();
        for(let i1 = 2; i1 - 1 < iterations; i1++){
            const NewBoard = this.Board;
            for(const infected1 in NewBoard.infected)for(const neighbour in NewBoard.infected[infected1].neighbours){
                if (NewBoard.infected[infected1].neighbours[neighbour].state !== NewBoard.infected[infected1].neighbours[neighbour].states.Removed) {
                    if (NewBoard.infected[infected1].neighbours[neighbour].state !== NewBoard.infected[infected1].neighbours[neighbour].states.Infected) {
                        NewBoard.infected[infected1].neighbours[neighbour].state = NewBoard.infected[infected1].neighbours[neighbour].states.Infected;
                        NewBoard.infected.push(NewBoard.infected[infected1].neighbours[neighbour]);
                    }
                }
            }
            this.States.push(this.makeClone(NewBoard.cells));
            this.RecalculateNeighbours();
        }
        return this.States;
    }
    makeClone(Board) {
        const output = [];
        for(const column in Board){
            output[column] = [];
            for(const row in Board[column]){
                output[column][row] = {
                    "id": Board[column][row].id,
                    "state": Board[column][row].state
                };
            }
        }
        return output;
    }
    toString() {
        let outputStr = "";
        this.Board.cells.forEach((column)=>{
            outputStr += "\n";
            column.forEach((Person1)=>{
                outputStr += Person1.state;
            });
        });
        return outputStr;
    }
}
if (typeof Deno === "undefined" && typeof require !== "undefined") {
    const { performance  } = require('perf_hooks');
    fs = require('fs');
    const Deno = {
    };
    Deno.writeTextFile = fs.writeFileSync;
}
var iterations = 20;
var size1 = 64;
var NumberImmune = 0;
var samples = 1000;
var NumberInfected = 1;
var parts = 100;
const forGraphing = {
};
const forProgressionGraphing = {
};
var Debugging = false;
var LogPositions = false;
if (Debugging) await new Promise((resolve)=>setTimeout(resolve, 3000)
);
console.log("STARTED");
for(let a = 0; a < parts; a++){
    const FinalResults = {
    };
    const ArrayResults = {
    };
    let group1;
    let t0, t1;
    if (Debugging) t0 = performance.now();
    for(let i1 = 0; i1 < samples / parts; i1++){
        let t01, t11;
        if (Debugging) t01 = performance.now();
        for(NumberImmune = 0; NumberImmune < size1; NumberImmune++){
            group1 = new Group(size1, NumberImmune, NumberInfected);
            ArrayResults[a + 1] = ArrayResults[a + 1] || {
            };
            ArrayResults[a + 1][i1 + 1] = ArrayResults[a + 1][i1 + 1] || {
            };
            ArrayResults[a + 1][i1 + 1][NumberImmune] = group1.SampleVirus(iterations);
            if (Debugging) {
                FinalResults["Part " + (a + 1) + " Sample " + (i1 + 1) + " With " + NumberImmune + " Immune"] = ArrayResults[a + 1][i1 + 1][NumberImmune];
                console.log(`Finished Number of Immune ${NumberImmune}`);
            }
        }
        if (Debugging) {
            t11 = performance.now();
            console.log(`Finished sample #${i1 + 1} in ${t11 - t01} milliseconds.`);
        }
    }
    let BetterResults = "";
    for(const a1 in ArrayResults)for(const b in ArrayResults[a1])for(const c in ArrayResults[a1][b]){
        forGraphing[c + "count"] = forGraphing[c + "count"] || 0;
        forGraphing[Number(c)] = forGraphing[c] || 0;
        forGraphing[Number(c)] = (forGraphing[c] * forGraphing[c + "count"] + CountInfected(ArrayResults[a1][b][c][iterations - 1])) / (forGraphing[c + "count"] + 1);
        forGraphing[c + "count"]++;
        if (LogPositions) BetterResults += "Part " + (a1 + 1) + " Sample " + (b + 1) + " With " + c + " Immune\n";
        for(const d in ArrayResults[a1][b][c]){
            if (LogPositions) BetterResults += `Iteration ${d} \n ` + (MakeString(ArrayResults[a1][b][c][d]) + "\n\n");
            forProgressionGraphing[c + "count"] = forProgressionGraphing[c + "count"] || [];
            forProgressionGraphing[Number(c)] = forProgressionGraphing[c] || [];
            forProgressionGraphing[c + "count"][d] = forProgressionGraphing[c + "count"][d] || [];
            forProgressionGraphing[Number(c)][d] = forProgressionGraphing[c][d] || [];
            forProgressionGraphing[Number(c)][d] = (forProgressionGraphing[c][d] * forProgressionGraphing[c + "count"][d] + CountInfected(ArrayResults[a1][b][c][d])) / (forProgressionGraphing[c + "count"][d] + 1);
            forProgressionGraphing[c + "count"][d]++;
        }
    }
    if (LogPositions && typeof require !== "undefined") Deno.writeTextFile(`./output/BetterResults/Part${a + 1}.txt`, BetterResults, ()=>{
    });
    if (LogPositions && typeof require === "undefined") document.writeln(`Part ${a + 1}\n` + BetterResults);
    if (Debugging) {
        if (typeof require !== "undefined") Deno.writeTextFile(`./output/outputArrs/Part${a + 1}.txt`, JSON.stringify(FinalResults), ()=>{
        });
        t1 = performance.now();
        console.log(`Finished Part #${a + 1} in ${(t1 - t0) / 1000} seconds.`);
    }
}
let GraphingResults = [];
for(const i1 in forGraphing){
    if (forGraphing[i1] !== samples) GraphingResults.push(roundOff(forGraphing[i1], 5));
}
if (typeof require !== "undefined") Deno.writeTextFile(`./output/JSONforGraph.txt`, JSON.stringify(GraphingResults), ()=>{
});
if (typeof require === "undefined") document.writeln(`<br><b>JSON for The Graph</b><br>` + JSON.stringify(GraphingResults));
GraphingResults = [];
for(const i2 in forProgressionGraphing){
    for(const a1 in forProgressionGraphing[i2]){
        if (forProgressionGraphing[i2][a1] !== samples) {
            GraphingResults[i2] = GraphingResults[i2] || [];
            GraphingResults[i2][a1] = roundOff(forProgressionGraphing[i2][a1], 5);
        }
    }
}
if (typeof require !== "undefined") Deno.writeTextFile(`./output/JSONforProgressionGraph.txt`, JSON.stringify(GraphingResults), ()=>{
});
if (typeof require === "undefined") document.writeln(`<br><b>JSON for The Progression Graph</b><br>` + JSON.stringify(GraphingResults));
GraphingResults = [];
for(const i3 in forGraphing){
    if (forGraphing[i3] !== samples) {
        GraphingResults[i3] = roundOff(size1 - i3 - forGraphing[i3], 5);
    }
}
if (typeof require !== "undefined") Deno.writeTextFile(`./output/JSONforSavedGraph.txt`, JSON.stringify(GraphingResults), ()=>{
});
if (typeof require === "undefined") document.writeln(`<br><b>JSON for The Saved Graph</b><br>` + JSON.stringify(GraphingResults));
if (typeof require === "undefined") navigator.clipboard.writeText(document.innerText);
console.log("DONE!");

