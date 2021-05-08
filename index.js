
if (!Deno) {
    const { performance } = require('perf_hooks')
    fs = require('fs')
    const Deno = {}
    Deno.writeTextFile = fs.writeFileSync
}

import { MakeString, CountInfected, roundOff } from './util.js'
import { Group } from './Group.js'

var iterations = 20
var size = 64   // Must be Square
var NumberImmune = 0
var samples = 10000
var NumberInfected = 1

var parts = 100

const forGraphing = {}
const forProgressionGraphing = {}

const Debugging = false
const LogPositions = false

if (Debugging) await new Promise(resolve => setTimeout(resolve, 3000))

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
                forGraphing[Number(c)] = ((forGraphing[c] * forGraphing[c + "count"]) + CountInfected(ArrayResults[a][b][c][iterations - 1])) / (forGraphing[c + "count"] + 1)
                forGraphing[c + "count"]++
                if (LogPositions) BetterResults += "Part " + (a + 1) + " Sample " + (b + 1) + " With " + c + " Immune\n"
                for (const d in ArrayResults[a][b][c]) {
                    if (LogPositions) BetterResults += `Iteration ${d} \n ` + (MakeString(ArrayResults[a][b][c][d]) + "\n\n")
                    forProgressionGraphing[c + "count"] = forProgressionGraphing[c + "count"] || []
                    forProgressionGraphing[Number(c)] = forProgressionGraphing[c] || []
                    forProgressionGraphing[c + "count"][d] = forProgressionGraphing[c + "count"][d] || []
                    forProgressionGraphing[Number(c)][d] = forProgressionGraphing[c][d] || []
                    forProgressionGraphing[Number(c)][d] = ((forProgressionGraphing[c][d] * forProgressionGraphing[c + "count"][d]) + CountInfected(ArrayResults[a][b][c][d])) / (forProgressionGraphing[c + "count"][d] + 1)
                    forProgressionGraphing[c + "count"][d]++
                }
            }
        

    if (LogPositions) Deno.writeTextFile(`./output/BetterResults/Part${a + 1}.txt`, BetterResults, () => { })
    if (Debugging) {
        Deno.writeTextFile(`./output/outputArrs/Part${a + 1}.txt`, JSON.stringify(FinalResults), () => { })
        t1 = performance.now()
        console.log(`Finished Part #${a + 1} in ${(t1 - t0)/1000} seconds.`)
    }
}

let GraphingResults = []

for (const i in forGraphing) {
    if (forGraphing[i] !== samples)
        GraphingResults.push(roundOff(forGraphing[i],5))
}
Deno.writeTextFile(`./output/JSONforGraph.txt`, JSON.stringify(GraphingResults), () => { })

GraphingResults = []
for (const i in forProgressionGraphing) {
    for (const a in forProgressionGraphing[i]) {
        if (forProgressionGraphing[i][a] !== samples) {
            GraphingResults[i] = GraphingResults[i] || []
            GraphingResults[i][a] = roundOff(forProgressionGraphing[i][a], 5)
        }
    }
}

Deno.writeTextFile(`./output/JSONforProgressionGraph.txt`, JSON.stringify(GraphingResults), () => { })

GraphingResults = []
for (const i in forGraphing) {
    if (forGraphing[i] !== samples) {
        GraphingResults[i] = roundOff(size-i-forGraphing[i], 5)
    }
}

Deno.writeTextFile(`./output/JSONforSavedGraph.txt`, JSON.stringify(GraphingResults), () => { })

console.log("DONE!")