const { ServiceBroker } = require('moleculer')
const BaseTransporter = require('moleculer').Transporters.Base
const IO = require('socket.io')

class WebsocketServerTransporter extends BaseTransporter {
  constructor (opts) {
    super(opts)

    if (!this.opts) {
      this.opts = {
        port: 3300
      }
    }

    this.io = null
    this.subscriptions = {}
  }

  async connect () {
    this.io = IO()

    // Add a connect listener
    this.io.on('connection', socket => {
      this.logger.info(`Websocket client connected from ${socket.conn.remoteAddress}`)

      socket.on('disconnect', () => {
        this.logger.info(`Websocket client disconnected from ${socket.conn.remoteAddress}`)
      })

      for (const [topic, handler] of Object.entries(this.subscriptions)) {
        socket.on(topic, handler)
      }
    })

    const port = this.opts.port
    this.io.listen(port)
    this.logger.info(`WS transporter listening on ${port}...)`)

    this.onConnected()
  }

  async disconnect () {
    if (this.io && this.io.sockets) {
      this.io.close()
      // Send disconnecting messages to all sockets.
      // const sockets = Object.values(this.io.sockets.sockets)
      // sockets.forEach(socket => socket.emit('$broker.stopped'))
    }
  }

  /**
   * Subscribe to a command
   *
   * @param {String} cmd
   * @param {String} nodeID
   *
   * @memberof FakeTransporter
   */
  async subscribe (cmd, nodeID) {
    const t = this.getTopicName(cmd, nodeID)
    this.subscriptions[t] = msg => this.receive(cmd, msg)
  }

  /**
   * Send data buffer.
   *
   * @param {String} topic
   * @param {Buffer} data
   * @param {Object} meta
   *
   * @returns {Promise}
   */
  async send (topic, data) {
    this.io.emit(topic, data)
  }
};

const broker = new ServiceBroker({
  nodeID: 'backend',
  logLevel: 'debug',
  transporter: new WebsocketServerTransporter()
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
