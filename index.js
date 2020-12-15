const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const { prefix, token } = require('./config.json');
const fs = require('fs')

client.on('ready', () => {
    console.log(`${client.user.tag} is online.`)
    client.user.setActivity(`${client.users.cache.size} users | ${prefix}ping`, {
        "type": "WATCHING",
        "name": "Watching users."
    })

})
    
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const commands = require(`./commands/${file}`)


	client.commands.set(commands.name, commands);
}

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;


    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);
    if (!client.commands.has(commandName)) return;

    try {
        command.execute(message, args);
    }   catch (error) {
        console.error(error);
    }
})

client.login(token)