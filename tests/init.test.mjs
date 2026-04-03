import { describe, test, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { chromium } from 'playwright'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const pkg = require('../node_modules/moleculer/package.json')

let browser, page

beforeAll(async () => {
  browser = await chromium.launch({ args: ['--no-sandbox'] })
})

afterAll(async () => {
  await browser?.close()
})

beforeEach(async () => {
  page = await browser.newPage()
  await page.goto('http://localhost:1234', { waitUntil: 'load' })
})

describe('check initialization of Moleculer', () => {
  test('should return the MOLECULER_VERSION', async () => {
    const version = await page.evaluate(() => window.Moleculer.ServiceBroker.prototype.MOLECULER_VERSION)
    expect(version).toBe(pkg.version)
  })

  test('should create a broker and call an action', async () => {
    const result = await page.evaluate(async () => {
      const broker = new window.Moleculer.ServiceBroker({ logger: false })
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

  test('should handle events correctly', async () => {
    const result = await page.evaluate(async () => {
      const broker = new window.Moleculer.ServiceBroker({ logger: false })
      let eventData = null
      broker.createService({
        name: 'math',
        actions: {
          add (ctx) { return Number(ctx.params.a) + Number(ctx.params.b) }
        }
      })
      broker.createService({
        name: 'listener',
        events: {
          'test.event' (ctx) { eventData = ctx.params }
        }
      })
      await broker.start()
      broker.broadcastLocal('test.event', { foo: 'bar' })
      await new Promise(resolve => setTimeout(resolve, 500))
      await broker.stop()
      return eventData
    })
    expect(result).toEqual({ foo: 'bar' })
  })

  test('should validate params with fastest-validator', async () => {
    const result = await page.evaluate(async () => {
      const broker = new window.Moleculer.ServiceBroker({ logger: false })
      broker.createService({
        name: 'validated',
        actions: {
          greet: {
            params: { name: 'string' },
            handler (ctx) { return 'Hello ' + ctx.params.name }
          }
        }
      })
      await broker.start()
      const res = await broker.call('validated.greet', { name: 'World' })
      await broker.stop()
      return res
    })
    expect(result).toBe('Hello World')
  })
})
