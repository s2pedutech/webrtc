var express = require('express')
var ws = require('ws')
var app = express()
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.get('/', function (req, res) {
   res.send('Hello World');
})
app.listen(port,ip, function () {
   console.log('Example app listening on ip!: ' + ip + ', port: ' + port )
})

var WebSocketServer = ws.Server,
  wss = new WebSocketServer({port: 40510})
wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    console.log('received: %s', message)
  })
  setInterval(
    () => ws.send(`${new Date()}`),
    1000
  )
})