
// await new Promise(resolve => setTimeout(resolve, 3000));

// const { performance } = require('perf_hooks');
// fs = require('fs');
// const Deno = {}
// Deno.writeTextFile = fs.writeFileSync

import { MakeString } from './util.js';
import { Group } from './Group.js'

var iterations = 20;
var size = 64   // Must be Square
var NumberImmune = 0
var samples = 10;
var NumberInfected = 1;

var parts = 1

for (let a = 0; a < parts; a++) {
    let FinalResults = {}
    let group;
    const t0 = performance.now()
    for (let i = 0; i < samples / parts; i++) {
        // const t0 = performance.now()
        for (NumberImmune = 0; NumberImmune < size; NumberImmune++)
        {
            group = new Group(size, NumberImmune, NumberInfected)
            FinalResults["Part "+(a + 1)+" Sample "+(i + 1)+" With "+(NumberImmune+1)+" Immune"] = group.SampleVirus(iterations);
            // console.log(`Finished Number of Immune ${NumberImmune}`)
        }
        // const t1 = performance.now()
        // console.log(`Finished sample #${i+1} in ${t1 - t0} milliseconds.`)
    }

    let BetterResults = ""
    for (const a in FinalResults) {
        BetterResults += a+"\n"
        for (const b in FinalResults[a])
            BetterResults += `Iteration ${b} \n `+(MakeString(FinalResults[a][b]) + "\n\n")
    }


    Deno.writeTextFile(`./output/outputArrsPart${a + 1}.txt`, JSON.stringify(FinalResults), () => { })
    Deno.writeTextFile(`./output/BetterResultsPart${a + 1}.txt`, BetterResults, () => { })
    const t1 = performance.now()
    console.log(`Finished Part #${a + 1} in ${(t1 - t0)/1000} seconds.`)
}

console.log("DONE!")