/**
 * amd 使用预执行，在执行工厂方法之前进行加载执行
 * cmd 使用懒加载，在执行到代码的地方进行加载
 */
const moduleMap = {}

function define(name, deps, factory) {
  const moduleItem = {
    deps,
    factory
  }
  moduleMap[name] = moduleItem
}

function require(deps, factory) {
  const depModules = deps.map(dep => {
    const { deps, factory } = moduleMap[dep]
    if (deps && deps.length > 0) {
      return require(deps, factory)
    }
    return factory()
  })
  return factory.apply(factory, depModules)
}

define('add', [], () => {
  return (num1, num2) => num1 + num2
})

require(['add'], (add) => {
  const num1 = Math.floor(Math.random() * 1000)
  const num2 = Math.floor(Math.random() * 1000)

  console.log(`${num1} + ${num2} = ${add(num1, num2)}`)
})