const { ServiceBroker } = require('moleculer')

const WebsocketServerTransporter = require('./WebsocketServerTransporter')

const broker = new ServiceBroker({
  nodeID: 'backend',
  logLevel: 'debug',
  transporter: new WebsocketServerTransporter(),
  tracing: {
    enabled: true,
    exporter: 'Console'
  }
})

broker.createService({
  name: 'posts',
  actions: {
    list (ctx) {
      return [
        { id: 1, title: 'Post #1', content: 'Content of post #1' },
        { id: 2, title: 'Post #2', content: 'Content of post #2' },
        { id: 3, title: 'Post #3', content: 'Content of post #3' }
      ]
    }
  }
})

broker.start().then(() => broker.repl())
