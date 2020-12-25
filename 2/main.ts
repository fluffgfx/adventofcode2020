// i am not doing any more haskell work
import * as fs from 'fs'
const lines = fs.readFileSync('./2/input.txt').toString().split("\n").filter(l => l !== "")

type Rule = [min: number, max: number, letter: string]
type RuleWithPassword = [Rule, string]
type LineParser = (line: string) => RuleWithPassword
type RuleChecker = (line: RuleWithPassword) => boolean

// parse each line into a rule and a password
// this one was pretty simple actually
const parseLine: LineParser = (line) => {
    const [left, password] = line.split(": ")
    const [ruleNum, letter] = left.split(" ")
    const [min, max] = ruleNum.split("-").map(s => parseInt(s))
    return [[min, max, letter], password]
}

const input = lines.map(parseLine)

const oldRuleChecker: RuleChecker = ([[min, max, letter], pass]) => {
    const letters = pass.split("")
    const searchedLetters = letters.filter(l => l === letter)
    const count = searchedLetters.length
    return count >= min && count <= max
}

const newRuleChecker: RuleChecker = ([[first, last, letter], pass]) => {
    const splitPass = pass.split("").filter(l => l !== "")
    const fl = splitPass[first - 1]
    const ll = splitPass[last - 1]
    const firstLetter = fl === letter
    const lastLetter = ll === letter
    const both = firstLetter && lastLetter
    return both ? false : (firstLetter || lastLetter)
}

const firstResult = input.map(oldRuleChecker)
console.log(firstResult.filter(x => x).length)

const secondResult = input.map(newRuleChecker)
console.log(secondResult)
console.log(secondResult.filter(x => x).length)
