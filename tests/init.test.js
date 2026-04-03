/* global Moleculer */
const pkg = require('../node_modules/moleculer/package.json')

jest.setTimeout(50000)

describe('check initialization of Moleculer', () => {
  beforeEach(async () => {
    await page.goto(PATH, { waitUntil: 'load' })
  })

  test('should return the MOLECULER_VERSION', async () => {
    const version = await page.evaluate(() => Moleculer.ServiceBroker.prototype.MOLECULER_VERSION)
    expect(version).toBe(pkg.version)
  })

  test('should create a broker and call an action', async () => {
    const result = await page.evaluate(async () => {
      const broker = new Moleculer.ServiceBroker({ logger: false })
      broker.createService({
        name: 'math',
        actions: {
          add (ctx) { return Number(ctx.params.a) + Number(ctx.params.b) }
        }
      })
      await broker.start()
      const res = await broker.call('math.add', { a: 5, b: 3 })
      await broker.stop()
      return res
    })
    expect(result).toBe(8)
  })
})
