import * as fs from 'fs'
import { pid } from 'process'
const rawPassports = fs.readFileSync('./4/input.txt').toString().split("\n\n").filter(l => l !== "").map(l => l.replace(/(\r\n|\n|\r)/gm, " "))

interface Passport {
    byr: number,
    iyr: number,
    eyr: number,
    hgt: string,
    hcl: string,
    ecl: string,
    pid: number,
    cid?: number
}

const isBetween = (n: number, a: number, b: number) => (n >= a && n <= b)

function isPassport(a: any): a is Passport {
    // check to see all fields exist
    const hasAllFields = a && a.byr && a.iyr && a.eyr && a.hgt && a.hcl && a.ecl && a.pid
    if (!hasAllFields) return false

    // return true here for the first puzzle

    // check to see birthyear is valid
    const byrInt = parseInt(a.byr)
    if (isNaN(byrInt)) return false
    if (!isBetween(byrInt, 1920, 2002)) return false

    // check iyr
    const iyrInt = parseInt(a.iyr)
    if (isNaN(iyrInt)) return false
    if (!isBetween(iyrInt, 2010, 2020)) return false

    // check eyr
    const eyrInt = parseInt(a.eyr)
    if (isNaN(eyrInt)) return false
    if (!isBetween(eyrInt, 2020, 2030)) return false

    // check hgt
    if (!(a.hgt.endsWith("cm") || a.hgt.endsWith("in"))) return false
    const hgtInt = parseInt(a.hgt.slice(0, -2))
    if (isNaN(hgtInt)) return false
    if (a.hgt.endsWith("cm") && (!isBetween(hgtInt, 150, 193))) return false
    if (a.hgt.endsWith("in") && (!isBetween(hgtInt, 59, 76))) return false

    // check hcl
    if (!(a.hcl.startsWith("#"))) return false
    const hclInt = parseInt(a.hcl.replace("#", "0x"))
    if (isNaN(hclInt)) return false
    if (hclInt > parseInt("0xffffff")) return false

    // check ecl
    const eyes = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
    if (!eyes.includes(a.ecl)) return false

    // check pid
    if (a.pid.length !== 9) return false
    const pidInt = parseInt(a.pid)
    if (isNaN(pidInt)) return false

    return true 
}

const parsePassport = (raw: string) => {
    let r: any = {}
    const fields = raw.split(" ")
    fields.forEach(f => {
        const [n, v] = f.split(":")
        r[n] = v
    })
    return isPassport(r) ? <Passport>r : null
}

const passports = rawPassports.map(parsePassport).filter(x => x)
console.log(rawPassports.length)
console.log(passports.length)
