/**
 * 灵感来源于 webpack，webpack 通过 tapable，以事件发布订阅的方式来构建插件化体系。
 * 插件之间也可以相互调用，生命周期这样的基础设施也应该以插件的形式暴露
 */
import EventEmitter from 'eventemitter3'

class Core {
  plugins = {}

  register = (name, plugin) => {
    this.plugins[name] = plugin
  }
}

export class LifeCyclePlugin {

  static name = 'LifeCyclePlugin'

  static DefaultEventMap = {
    'init': () => {},
    'ready': () => {},
    'destroy': () => {}
  }

  constructor({ eventMap }) {
    this.events = new EventEmitter()
    
    Object.keys(eventMap).forEach(lifeCycleName => {
      const listener = eventMap[lifeCycleName]
      this.events.on(lifeCycleName, listener, this)
    })
  }

  apply(core) {
    core.register(LifeCyclePlugin.name, this)
  }

}

export class LogPlugin {
  static name = 'LogPlugin'

  static DefaultEventMap = {
    'log': () => {}
    'info': () => {}
    'warning': () => {}
    'error': () => {}
    'debug': () => {}
  }

  constructor({ eventMap }) {
    this.events = new EventEmitter()
    
    Object.keys(eventMap).forEach(logName => {
      const listener = eventMap[logName]
      this.events.on(logName, listener, this)
    })
  }

  apply(core) {
    core.register(LogPlugin.name, this)
  }
}

export function Runner({ debug }) {
  const core = new Core()
  new LogPlugin({ eventMap: LogPlugin.DefaultEventMap }).apply(core)
  new LifeCyclePlugin({ eventMap: LifeCyclePlugin.DefaultEventMap }).apply(core)
  if (debug) {
    const lifeCyclePlugin = core.plugins[LifeCyclePlugin.name]
    const logPlugin = core.plugins[LogPlugin.name]
    Object.keys(LifeCyclePlugin.DefaultEventMap).forEach(lifeCycleKey => {
      lifeCyclePlugin.events.on(lifeCycleKey, () => {
        logPlugin.events.emit('info', `life cycle: ${lifeCycleKey}`)
      })
    })
  }
  return core
}







