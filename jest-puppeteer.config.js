module.exports = {
  launch: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  },
  server: {
    command: 'npx http-server tests/server -p 1234 -s',
    port: 1234,
    launchTimeout: 30000
  }
}
