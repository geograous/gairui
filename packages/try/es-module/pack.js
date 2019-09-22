
const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const generate = require('@babel/generator').default
const traverse = require('@babel/traverse').default

class Parser {
  parseDepsAndInputs = (content) => {
    const deps = []
    const inputs = []
    const outputs = []
    const ast = parser.parse(content, { sourceType: 'module' })
    // console.log('ast:', ast)
    traverse(ast, {
      ImportDeclaration(path) {
        // console.log('import:', path.node)
        // 依赖文件
        deps.push(path.node.source.value)
        // path.node.specifiers.forEach(spec => {
        //   // console.log('spec:', spec.local.name)
        // })
      },
      ExportDeclaration(path) {
        // console.log('output:', path.node)
        // 依赖文件
        // deps.push(path.node.source.value)
        // path.node.specifiers.forEach(spec => {
        //   // console.log('spec:', spec.local.name)
        // })
      }
    })
    console.log('ast:', ast.program.body)
    return { deps, inputs }
  }
}

class Generator {

}

class Builder {
  apply() {

  }
}

class Bundler {
  contentMap = {}

  constructor({ entry }) {
    this.entry = entry
    this.parser = new Parser()

    // this.load = this.load.bind(this)
  }

  load = () => {
    this.entry.forEach(input => {
      const filePath = path.join(__dirname, input)
      const content = fs.readFileSync(filePath, 'utf-8')
      console.log('content:', content)
      this.parser.parseDepsAndInputs(content)
      this.contentMap[input] = {
        path: filePath,
        content
      }
    })
  }
  build = () => {
    // this.parser.getDeps()
  }
  generate = () => {
    
  }
}

const bundler = new Bundler({ entry: ['./index.js'] })
bundler.load()


