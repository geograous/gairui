const add = require('./mod1.js')

const num1 = Math.floor(Math.random() * 1000)
const num2 = Math.floor(Math.random() * 1000)

console.log(`${num1} + ${num2} = ${add(num1, num2)}`)