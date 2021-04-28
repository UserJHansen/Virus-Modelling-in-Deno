export function GetNumberFromSquareArray(number, size) {
    if (number === 0) {
        return [0,0]
    }
    return [Math.floor(number / Math.sqrt(size)), number - Math.floor(number / Math.sqrt(size)) * Math.sqrt(size)];
}

export function randomNumber(min, max) {
    const r = Math.random() * (max - min) + min
    return Math.floor(r)
}


export function MakeString(Board) {
    let outputStr = ""
    Board.forEach((column) => {
        outputStr += "\n"
        column.forEach((Person) => {
            outputStr += Person.state
        })
    })
    return outputStr;
}


export function CountInfected(Board) {
    let outputNum = 0
    Board.forEach((column) => {
        column.forEach((BoardPerson) => {
            outputNum += BoardPerson.state == "🟫" ? 1 : 0
        })
    })
    return outputNum;
}