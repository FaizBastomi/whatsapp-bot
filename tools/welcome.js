const fs = require('fs-extra')
const { sleep } = require('../utils')

async function welcome(client, event) {

    const wel = JSON.parse(fs.readFileSync('./handler/message/data/welcome.json'))
    const isWel = wel.includes(event.chat)
    const host = await client.getHostNumber() + '@c.us'
    try {
        if (event.action === 'add' && event.who !== host && isWel) {
            const det = await client.getChatById(event.chat)
            const person = await client.getContact(event.who)
            const profile = await client.getProfilePicFromServer(event.who) || 'https://telegra.ph/file/3f1289c6e05cd95ab67fd.jpg'
            let { pushname, verifiedName, formattedName } = person
            pushname = pushname || verifiedName || formattedName
            client.sendFileFromUrl(from, profile, 'pp.png')
            client.sendTextWithMentions(from, `Selamat datang di ${det.groupMetadata.formattedTitle} @${event.who.split("@")[0]}`)
        }
        if (event.action === 'remove' && event.who !== host && isWel) {
            const det = await client.getChatById(event.chat)
            const person = await client.getContact(event.who)
            const profile = await client.getProfilePicFromServer(event.who) || 'https://telegra.ph/file/3f1289c6e05cd95ab67fd.jpg'
            let { pushname, verifiedName, formattedName } = person
            pushname = pushname || verifiedName || formattedName

            await client.sendFileFromUrl(event.chat, profile, 'pfp.png', `Selamat jalan kawan, @${event.who.replace(/@c.us/, '')}!👋`, null, null, true)
        }
        if (event.action === 'add' && event.by === 'user' && event.who !== host && isWel) {
            const det = await client.getChatById(event.chat)
            const person = await client.getContact(event.who)
            const profile = await client.getProfilePicFromServer(event.who) || 'https://telegra.ph/file/3f1289c6e05cd95ab67fd.jpg'
            let { pushname, verifiedName, formattedName } = person
            pushname = pushname || verifiedName || formattedName
            client.sendFileFromUrl(from, profile, 'pp.png')
            client.sendTextWithMentions(from, `Selamat datang di ${det.groupMetadata.formattedTitle} @${event.who.split("@")[0]}`)
        }
        if (event.action === 'remove' && event.by === 'user' && event.who !== host && isWel) {
            const det = await client.getChatById(event.chat)
            const person = await client.getContact(event.who)
            const profile = await client.getProfilePicFromServer(event.who) ||'https://telegra.ph/file/3f1289c6e05cd95ab67fd.jpg'
            let { pushname, verifiedName, formattedName } = person
            pushname = pushname || verifiedName || formattedName

            await client.sendFileFromUrl(event.chat, profile, 'pfp.png', `Selamat jalan kawan, @${event.who.replace(/@c.us/, '')}!👋`, null, null, true)
        }
    } catch(err) {
        console.error(err.message)
    }
}

module.exports = {
    welcome
}