const ws = require('ws');

module.exports = {
    name: 'ping',
    description: "Ping the API.",

    execute(message, args) {
        message.channel.send(`Pong! 🏓 (${message.client.ws.ping} ms)`)
    }
}