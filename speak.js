const { Client } = require('discord.js');
const { getAudioUrl } = require('google-tts-api');

module.exports = {
    name: 'speak',
    aliases: ['s', 'talk'],
    category: 'fun',
    run: async (client, message, args) => {
        if(!args[0]) return message.channel.send('Vui lòng nhập gì đó để tôi nói!');
        const string = args.join('  ');
        if(string.length > 200) return message.channel.send('Vui lòng nhập dưới 200 ký tự!');
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('Bạn phải vào room voice để sử dụng lệnh này!');
        const audioURL = await getAudioUrl(string, {
            lang: 'vi',
            slow: false,
            host: 'https://translate.google.com',
            timeout: 10000,
        });
        try {
            voiceChannel.join().then(connection => {
                const dispatcher = connection.play(audioURL);
                dispatcher.on('finish', () => {
                    voiceChannel.leave();

                })
            })
        }
        catch(e) {
            message.channel.send('Bot lỗi, vui lòng thử lại sau!');
            console.error(e);
        }
    }
}