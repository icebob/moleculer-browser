const Moleculer = require('../../dist/moleculer.umd')
console.log('Moleculer', Moleculer)
const { ServiceBroker } = require('../../dist/moleculer.umd').__moduleExports

const broker = window.broker = new ServiceBroker({
  transporter: 'Fake',
  logger: 'Console'
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
  .then(res => console.log('Call local service: 5 + 3 =', res))
  .catch(err => console.error(`Error occured! ${err.message}`))
