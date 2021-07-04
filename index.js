
if (typeof Deno === "undefined" && typeof require !== "undefined") {
    const { performance } = require('perf_hooks')
    fs = require('fs')
    const Deno = {}
    Deno.writeTextFile = fs.writeFileSync
}

var global = global || {}

import { makeString, countInfected, roundOff } from './util.js'
import Group from './Group.js'

var iterations = 20
var size = 64   // Must be Square
var NumberImmune = 0
var NumberInfected = 1

var samples = 1000
var parts = 100

const forGraphing = {}
const forProgressionGraphing = {}

var Debugging = false
var LogPositions = false

if (Debugging) await new Promise(resolve => setTimeout(resolve, 3000))

console.log("STARTED")

for (let a = 0; a < parts; a++) {
    const FinalResults = {}
    const ArrayResults = {}
    let group
    let t0, t1
    
    if (Debugging) t0 = performance.now()
    for (let i = 0; i < samples / parts; i++) {
        let t0, t1
        if (Debugging) t0 = performance.now()
        for (NumberImmune = 0; NumberImmune < size; NumberImmune++)
        {
            group = new Group(size, NumberImmune, NumberInfected)
            ArrayResults[(a + 1)] = ArrayResults[(a + 1)] || {}
            ArrayResults[(a + 1)][(i + 1)] = ArrayResults[(a + 1)][(i + 1)] || {}
            ArrayResults[(a + 1)][(i + 1)][NumberImmune] = group.SampleVirus(iterations)
            if (Debugging) {
                FinalResults["Part " + (a + 1) + " Sample " + (i + 1) + " With " + NumberImmune + " Immune"] = ArrayResults[(a + 1)][(i + 1)][NumberImmune]
                console.log(`Finished Number of Immune ${NumberImmune}`)
            }
        }
        if (Debugging) {
            t1 = performance.now()
            console.log(`Finished sample #${i+1} in ${t1 - t0} milliseconds.`)
        }
    }

    
    let BetterResults = ""
    for (const a in ArrayResults)
        for (const b in ArrayResults[a])
            for (const c in ArrayResults[a][b]) {
                forGraphing[c + "count"] = forGraphing[c + "count"] || 0
                forGraphing[Number(c)] = forGraphing[c] || 0
                forGraphing[Number(c)] = ((forGraphing[c] * forGraphing[c + "count"]) + countInfected(ArrayResults[a][b][c][iterations - 1])) / (forGraphing[c + "count"] + 1)
                forGraphing[c + "count"]++
                if (LogPositions) BetterResults += "Part " + a + " Sample " + b + " With " + (Number(c)+1) + " Immune\n"
                for (const d in ArrayResults[a][b][c]) {
                    if (LogPositions) BetterResults += `Iteration ${Number(d)+1} \n ` + (makeString(ArrayResults[a][b][c][d]) + "\n\n")
                    forProgressionGraphing[c + "count"] = forProgressionGraphing[c + "count"] || []
                    forProgressionGraphing[Number(c)] = forProgressionGraphing[c] || []
                    forProgressionGraphing[c + "count"][d] = forProgressionGraphing[c + "count"][d] || []
                    forProgressionGraphing[Number(c)][d] = forProgressionGraphing[c][d] || []
                    forProgressionGraphing[Number(c)][d] = ((forProgressionGraphing[c][d] * forProgressionGraphing[c + "count"][d]) + countInfected(ArrayResults[a][b][c][d])) / (forProgressionGraphing[c + "count"][d] + 1)
                    forProgressionGraphing[c + "count"][d]++
                }
            }
        

    if (LogPositions && (typeof require !== "undefined" || typeof fs === "undefined" && typeof document === "undefined")) Deno.writeTextFile(`./output/BetterResults/Part${a + 1}.txt`, BetterResults, () => { })
    if (LogPositions && typeof document !== "undefined") document.writeln((`Part ${a + 1}\n` + BetterResults).replace(/\n/g, '<br>'));
    if (Debugging) {
        if (typeof require !== "undefined" || typeof fs === "undefined" && typeof document === "undefined") Deno.writeTextFile(`./output/outputArrs/Part${a + 1}.txt`, JSON.stringify(FinalResults), () => { })
        t1 = performance.now()
        console.log(`Finished Part #${a + 1} in ${(t1 - t0)/1000} seconds.`)
    }
}

let GraphingResults = []

for (const i in forGraphing) {
    if (forGraphing[i] !== samples)
        GraphingResults.push(roundOff(forGraphing[i],5))
}
if (typeof require !== "undefined" || typeof fs === "undefined" && typeof document === "undefined") Deno.writeTextFile(`./output/JSONforGraph.txt`, JSON.stringify(GraphingResults), () => { })
if (typeof document !== "undefined") document.writeln(`<br><b>JSON for The Graph</b><br>` + JSON.stringify(GraphingResults))

GraphingResults = []
for (const i in forProgressionGraphing) {
    for (const a in forProgressionGraphing[i]) {
        if (forProgressionGraphing[i][a] !== samples) {
            GraphingResults[i] = GraphingResults[i] || []
            GraphingResults[i][a] = roundOff(forProgressionGraphing[i][a], 5)
        }
    }
}

if (typeof require !== "undefined" || typeof fs === "undefined" && typeof document === "undefined") Deno.writeTextFile(`./output/JSONforProgressionGraph.txt`, JSON.stringify(GraphingResults), () => { })
if (typeof document !== "undefined") document.writeln(`<br><b>JSON for The Progression Graph</b><br>` + JSON.stringify(GraphingResults))

GraphingResults = []
for (const i in forGraphing) {
    if (forGraphing[i] !== samples) {
        GraphingResults[i] = roundOff(size-i-forGraphing[i], 5)
    }
}

if (typeof require !== "undefined" || typeof fs === "undefined" && typeof document === "undefined") Deno.writeTextFile(`./output/JSONforSavedGraph.txt`, JSON.stringify(GraphingResults), () => { })
if (typeof document !== "undefined") document.writeln(`<br><b>JSON for The Saved Graph</b><br>` + JSON.stringify(GraphingResults))


console.log("DONE!")