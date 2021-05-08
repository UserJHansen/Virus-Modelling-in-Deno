import { Person } from './Person.js';
import { GetNumberFromSquareArray, randomNumber } from './util.js';

export class Group  {
    Board = [];
    children = [];
    States = [];

    constructor(size, immune, infected) {
        if (Math.sqrt(size) ** 2 !== size)
            throw Error("Size is not Square")
        this.Board.cells = []
        this.Board.infected = []

        for (let i = 0; i < Math.sqrt(size); i++) {
            this.Board.cells[i] = []
            for (let i2 = 0; i2 < Math.sqrt(size); i2++) {
                this.Board.cells[i][i2] = new Person(i * Math.sqrt(size) + i2, this);
            }
        }
        let immunenum = 0
        while (immunenum !== immune) {
            const immunecell = randomNumber(0, size)
            const coords = GetNumberFromSquareArray(immunecell, this.Board.cells.length ** 2)
            if (this.Board.cells[coords[0]][coords[1]].state !== this.Board.cells[coords[0]][coords[1]].states.Removed) {
                this.Board.cells[coords[0]][coords[1]].state = this.Board.cells[coords[0]][coords[1]].states.Removed;
                immunenum++;
            }
        }

        let infectednum = 0
        while (infectednum !== infected) {
            const infectedcell = randomNumber(0, size)
            const coords = GetNumberFromSquareArray(infectedcell, this.Board.cells.length ** 2)
            if (this.Board.cells[coords[0]][coords[1]].state !== this.Board.cells[coords[0]][coords[1]].states.Removed) {
                this.Board.cells [coords[0]][coords[1]].state = this.Board.cells[coords[0]][coords[1]].states.Infected;
                this.Board.infected.push(this.Board.cells[coords[0]][coords[1]])
                infectednum++;
            }
        }

        this.States = [ this.makeClone(this.Board.cells) ]

        this.RecalculateNeighbours()
    }

    RecalculateNeighbours() {
        this.children.forEach((value) => {
            value.calculateNeighbours()
        })
    }

    SampleVirus(iterations) {
        this.RecalculateNeighbours()
        for (let i = 2; i - 1 < iterations; i++) {
            const NewBoard = this.Board;
            for (const infected in NewBoard.infected) 
                for (const neighbour in NewBoard.infected[infected].neighbours) {
                    if (NewBoard.infected[infected].neighbours[neighbour].state !== NewBoard.infected[infected].neighbours[neighbour].states.Removed)
                        if (NewBoard.infected[infected].neighbours[neighbour].state !== NewBoard.infected[infected].neighbours[neighbour].states.Infected) {
                            NewBoard.infected[infected].neighbours[neighbour].state = NewBoard.infected[infected].neighbours[neighbour].states.Infected
                            NewBoard.infected.push(NewBoard.infected[infected].neighbours[neighbour])
                        }
                }

            this.States.push(this.makeClone(NewBoard.cells))
            this.RecalculateNeighbours()
        }

        return this.States;
    }

    makeClone(Board){
        const output = []
        for (const column in Board) {
            output[column] = []
            for (const row in Board[column]) {
                output[column][row] = {"id": Board[column][row].id, "state": Board[column][row].state}
            }
        }
        return output;
    }

    toString() {
        let outputStr = ""
        this.Board.cells.forEach((column) => {
            outputStr += "\n"
            column.forEach((Person) => {
                outputStr += Person.state
            })
        })
        return outputStr;
    }
}