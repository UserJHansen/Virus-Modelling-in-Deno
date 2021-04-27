// import { GetNumberFromSquareArray } from './util.js';

// export class Person {
//     id; 
//     neighbours = [];
//     privates = new WeakMap();

//     states = { "Healthy": "⬜️", "Removed": "🔲", "Infected": "⬛️"}
//     state = this.states.Healthy;

//     constructor(id, group) {
//         this.id = id;
//         var privatesProperties = {
//             group: group
//         };
//         this.privates.set(this, privatesProperties);

//         this.privates.get(this).group.children.push(this)
//     }

//     calculateNeighbours() {
//         this.neighbours = []
//         const coords = GetNumberFromSquareArray(this.id, this.privates.get(this).group.Board.cells.length ** 2)
//         if (coords[0] === this.privates.get(this).group.Board.cells.length - 1 || coords[0] === 0 || coords[1] === this.privates.get(this).group.Board.cells.length - 1 || coords[1] === 0)
//             switch (coords[0]) {
//                 case this.privates.get(this).group.Board.cells.length - 1:
//                     if (coords[1] === this.privates.get(this).group.Board.cells.length - 1 || coords[1] === 0) {
//                         this.neighbours.push(this.privates.get(this).group.Board.cells[coords[0] - 1][coords[1]])
//                         if (coords[1] !== 0)
//                             this.neighbours.push(this.privates.get(this).group.Board.cells[coords[0]][coords[1] - 1])
//                     } else {
//                         this.neighbours.push(this.privates.get(this).group.Board.cells[coords[0] - 1][coords[1]])
//                         this.neighbours.push(this.privates.get(this).group.Board.cells[coords[0]][coords[1] - 1])
//                         this.neighbours.push(this.privates.get(this).group.Board.cells[coords[0]][coords[1] + 1])
//                     }
//                     break;
//                 case 0:
//                     if (coords[1] === this.privates.get(this).group.Board.cells.length - 1 || coords[1] === 0) {
//                         this.neighbours.push(this.privates.get(this).group.Board.cells[coords[0] + 1][coords[1]])
//                         if (coords[1] !== 0)
//                             this.neighbours.push(this.privates.get(this).group.Board.cells[coords[0]][coords[1] - 1])
//                     } else {
//                         this.neighbours.push(this.privates.get(this).group.Board.cells[coords[0] + 1][coords[1]])
//                         this.neighbours.push(this.privates.get(this).group.Board.cells[coords[0]][coords[1] - 1])
//                         this.neighbours.push(this.privates.get(this).group.Board.cells[coords[0]][coords[1] + 1])
//                     }
//                     break;
//                 default:
//                     if (coords[1] === this.privates.get(this).group.Board.cells.length - 1) {
//                         this.neighbours.push(this.privates.get(this).group.Board.cells[coords[0] - 1][coords[1]])
//                         this.neighbours.push(this.privates.get(this).group.Board.cells[coords[0] + 1][coords[1]])
//                         this.neighbours.push(this.privates.get(this).group.Board.cells[coords[0]][coords[1] - 1])
//                     } else {
//                         this.neighbours.push(this.privates.get(this).group.Board.cells[coords[0] - 1][coords[1]])
//                         this.neighbours.push(this.privates.get(this).group.Board.cells[coords[0] + 1][coords[1]])
//                         this.neighbours.push(this.privates.get(this).group.Board.cells[coords[0]][coords[1] + 1])
//                     }
//             }
//         else {
//             this.neighbours.push(this.privates.get(this).group.Board.cells[coords[0] - 1][coords[1]])
//             this.neighbours.push(this.privates.get(this).group.Board.cells[coords[0] + 1][coords[1]])
//             this.neighbours.push(this.privates.get(this).group.Board.cells[coords[0]][coords[1]-1])
//             this.neighbours.push(this.privates.get(this).group.Board.cells[coords[0]][coords[1]+1])
//         }
//     }
// }

import { GetNumberFromSquareArray } from './util.js';

export class Person {
    id;
    neighbours = [];
    group;

    states = { "Healthy": "⬜️", "Removed": "🔲", "Infected": "⬛️" }
    state = this.states.Healthy;

    constructor(id, group) {
        this.id = id;
        this.group = group;

        this.group.children.push(this)
    }

    calculateNeighbours() {
        this.neighbours = []
        const coords = GetNumberFromSquareArray(this.id, this.group.Board.cells.length ** 2)
        if (coords[0] === this.group.Board.cells.length - 1 || coords[0] === 0 || coords[1] === this.group.Board.cells.length - 1 || coords[1] === 0)
            switch (coords[0]) {
                case this.group.Board.cells.length - 1:
                    if (coords[1] === this.group.Board.cells.length - 1 || coords[1] === 0) {
                        this.neighbours.push(this.group.Board.cells[coords[0] - 1][coords[1]])
                        if (coords[1] !== 0)
                            this.neighbours.push(this.group.Board.cells[coords[0]][coords[1] - 1])
                    } else {
                        this.neighbours.push(this.group.Board.cells[coords[0] - 1][coords[1]])
                        this.neighbours.push(this.group.Board.cells[coords[0]][coords[1] - 1])
                        this.neighbours.push(this.group.Board.cells[coords[0]][coords[1] + 1])
                    }
                    break;
                case 0:
                    if (coords[1] === this.group.Board.cells.length - 1 || coords[1] === 0) {
                        this.neighbours.push(this.group.Board.cells[coords[0] + 1][coords[1]])
                        if (coords[1] !== 0)
                            this.neighbours.push(this.group.Board.cells[coords[0]][coords[1] - 1])
                    } else {
                        this.neighbours.push(this.group.Board.cells[coords[0] + 1][coords[1]])
                        this.neighbours.push(this.group.Board.cells[coords[0]][coords[1] - 1])
                        this.neighbours.push(this.group.Board.cells[coords[0]][coords[1] + 1])
                    }
                    break;
                default:
                    if (coords[1] === this.group.Board.cells.length - 1) {
                        this.neighbours.push(this.group.Board.cells[coords[0] - 1][coords[1]])
                        this.neighbours.push(this.group.Board.cells[coords[0] + 1][coords[1]])
                        this.neighbours.push(this.group.Board.cells[coords[0]][coords[1] - 1])
                    } else {
                        this.neighbours.push(this.group.Board.cells[coords[0] - 1][coords[1]])
                        this.neighbours.push(this.group.Board.cells[coords[0] + 1][coords[1]])
                        this.neighbours.push(this.group.Board.cells[coords[0]][coords[1] + 1])
                    }
            }
        else {
            this.neighbours.push(this.group.Board.cells[coords[0] - 1][coords[1]])
            this.neighbours.push(this.group.Board.cells[coords[0] + 1][coords[1]])
            this.neighbours.push(this.group.Board.cells[coords[0]][coords[1] - 1])
            this.neighbours.push(this.group.Board.cells[coords[0]][coords[1] + 1])
        }
    }
}