import { createServer } from 'http'
import { readFileSync, existsSync } from 'fs'
import { join, extname } from 'path'

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css'
}

let server

export function setup () {
  const root = join(import.meta.dirname, 'server')
  server = createServer((req, res) => {
    const filePath = join(root, req.url === '/' ? 'index.html' : req.url)
    if (!existsSync(filePath)) {
      res.writeHead(404)
      res.end('Not found')
      return
    }
    const ext = extname(filePath)
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
    res.end(readFileSync(filePath))
  })

  return new Promise((resolve) => {
    server.listen(1234, () => resolve())
  })
}

export function teardown () {
  return new Promise((resolve) => {
    server.close(() => resolve())
  })
}
