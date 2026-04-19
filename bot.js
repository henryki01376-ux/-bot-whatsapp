const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    console.log('QR RECEBIDO, ESCANEIA AQUI:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Bot conectado!');
});

client.on('message', async msg => {
    const chat = await msg.getChat();

    if (!chat.isGroup) return;

    if (msg.body === '!fechar') {
        await chat.setMessagesAdminsOnly(true);
        msg.reply('🔒 Grupo fechado');
    }

    if (msg.body === '!abrir') {
        await chat.setMessagesAdminsOnly(false);
        msg.reply('✅ Grupo aberto');
    }
});

client.initialize();
