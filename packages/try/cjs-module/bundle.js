
    (function(moduleMap){
      const pathMap = {"./index.js":"/Users/zhuhao/projects/private/gairui/packages/try/cjs-module/index.js","./mod1.js":"/Users/zhuhao/projects/private/gairui/packages/try/cjs-module/mod1.js"}
      function require(fileName) {
        const filePath = pathMap[fileName]
        if (moduleMap[filePath]) {
          return moduleMap[filePath](require)
        }
      }
      require('./index.js')
    })({
    '/Users/zhuhao/projects/private/gairui/packages/try/cjs-module/index.js':function(require) {
      const module = { exports: {} }
      const add = require('./mod1.js')

const num1 = Math.floor(Math.random() * 1000)
const num2 = Math.floor(Math.random() * 1000)

console.log(`${num1} + ${num2} = ${add(num1, num2)}`)
      return module.exports
    }
  ,
    '/Users/zhuhao/projects/private/gairui/packages/try/cjs-module/mod1.js':function(require) {
      const module = { exports: {} }
      module.exports = function add(num1, num2) {
  return num1 + num2
}
      return module.exports
    }
  })
  