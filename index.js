const { Client, Intents, Message, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Sẵn sàng!');

    client.user.setPresence({
        activity: {
            name: "GAME CÙNG NGỌC TRINH",
            type: 'PLAYING'
        },
        status: 'online'
    })
})

client.on("message", message => {
    const args = message.content.split(' ');
    const cmd = args.shift().toLowerCase();
    switch(cmd) {
        case 'ping':
            message.channel.send(`Pong ${client.ws.ping} ms`)
            break;
        case 'say' : {
            if (message.deletable) message.delete()
            message.channel.send(args.join(' '))
            break;
        }
        case 'avatar': {
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
            const URL = member.user.avatarURL({ format: 'jpg', dynamic: true, size: 1024 })
            const avatarEmbed = new MessageEmbed()
                .setImage(URL)
                .setURL()
                .setTitle('Tải ảnh xuống ở đây')
            message.channel.send(avatarEmbed)
        }
    }
})


client.login(token);