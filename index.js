
await new Promise(resolve => setTimeout(resolve, 3000));

var iterations = 20;
var size = 64   // Must be Square

console.log(SampleVirus(iterations, size));

function SampleVirus(iterations, size) {
    if (Math.sqrt(size)**2 !== size)
        throw Error("Size is not Square") 

    let Board = { "cells": generateArray(Math.sqrt(size), Math.sqrt(size)), "infected": [] }
    let infected = randomNumber(0, size-1)
    Board.cells[Math.floor(infected / Math.sqrt(size))][infected - Math.floor(infected / Math.sqrt(size)) * Math.sqrt(size)] = "⬛️"
    Board.infected.push(infected)
    let States = { Board }
    for (let i = 0; i + 1 < iterations; i++) {
        let NewBoard = Board
        VirusSpread(Board).forEach((value) => {
            if (Board.)
        })

        States.push(NewBoard)
    }

    return States;
}

function VirusSpread(Board) {
    Board.infected.forEach((value) => {
        console.log(GetNeighbours(value))
    })
}

function GetNeighbours(Board, index) {
    return [Board[index+1, index-1, index+Board.length, index-Board.length]]
}

// 
// USEFULL FUNCTIONS BELLOW
// 


function generateArray(width, height) {
    let output = [];
    for (let i = 0; i < width; i++) {
        output[i] = []
        for (let i2 = 0; i2 < height; i2++) {
            output[i][i2] = "⬜️";
        }
    }
    return output;
}

function GetNumberFromArray(number, size) {
    return [Math.floor(number / Math.sqrt(size)), number - Math.floor(number / Math.sqrt(size)) * Math.sqrt(size)
}

function randomNumber(min, max) {
    const r = Math.random() * (max - min) + min
    return Math.floor(r)
}

