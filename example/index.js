import 'regenerator-runtime/runtime'

const { ServiceBroker } = require('../dist/moleculer.umd')
const WebsocketClientTransporter = require('./WebsocketClientTransporter')

const broker = window.broker = new ServiceBroker({
  nodeID: 'frontend',
  transporter: new WebsocketClientTransporter(),
  logger: {
    type: 'Console',
    options: {
      colors: false
    }
  },
  logLevel: 'debug'
})

broker.createService({
  name: 'math',
  actions: {
    add (ctx) {
      return Number(ctx.params.a) + Number(ctx.params.b)
    }
  }
})

broker.start()
// Call service
  .then(() => broker.call('math.add', { a: 5, b: 3 }))
  .then(res => console.log('5 + 3 =', res))
  .catch(err => console.error(`Error occured! ${err.message}`))
