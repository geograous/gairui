
const fs = require('fs')
const path = require('path')

const relativePathList = ['./index.js', './mod1.js']
const pathMap = relativePathList.reduce((map, relativePath) => {
  map[relativePath] = path.join(__dirname, relativePath)
  return map
}, {})
const moduleSchemes = relativePathList.map(relativePath => ({
  path: pathMap[relativePath],
  content: fs.readFileSync(pathMap[relativePath], 'utf-8')
}))

function bundle(inputs) {
  const inputContents = inputs.map(createInput).join(';')
  const moduleContents = moduleSchemes.map(createModule).join(',')
  return `
    (function(moduleMap){
      const pathMap = ${JSON.stringify(pathMap)}
      function require(fileName) {
        const filePath = pathMap[fileName]
        if (moduleMap[filePath]) {
          return moduleMap[filePath](require)
        }
      }
      ${inputContents}
    })({${moduleContents}})
  `
}

function createInput(relativePath) {
  return `require('${relativePath}')`
}

function createModule({ path, content }) {
  return `
    '${path}':function(require) {
      const module = { exports: {} }
      ${content}
      return module.exports
    }
  `
}

const bundledContext = bundle(['./index.js'])

fs.writeFileSync(path.join(__dirname, './bundle.js'), bundledContext,'utf-8')
