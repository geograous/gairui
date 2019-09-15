
const fs = require('fs')
const path = require('path')

const relativePathList = ['./index.js', './mod1.js']
const absolutePathList = relativePathList.map(relativePath => path.join(__dirname, relativePath))
const moduleSchemes = absolutePathList.map(path => ({
  path,
  content: fs.readFileSync(path, 'utf-8')
}))

function bundle(inputs) {
  const inputContents = inputs.map(createInput).join(';')
  const moduleContents = moduleSchemes.map(createModule).join(',')
  return `
    (function(moduleMap){
      const path = require('path')
      function require(fileName) {
        const filePath = path.join(__dirname, fileName)
        if (moduleMap[filePath]) {
          return moduleMap[filePath](require)
        }
      }
      ${inputContents}
    })({${moduleContents}})
  `
}

function createInput(relativePath) {
  const absolutePath = path.join(__dirname, relativePath)
  return `require('${absolutePath}')`
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
