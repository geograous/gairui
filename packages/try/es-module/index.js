import add from './mod1'

console.log(add(2,4))

export function abc(name) {
  console.log(`abc ${name}`)
}

function bbc(name) {
  console.log(`bbc ${name}`)
}

export default bbc
