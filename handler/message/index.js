/**
 * This Script is modfication version of YogaSakti/imageToSticker
 * for the original creator,
 * 
 * I hope you not mad to me, sorry
 * I will credits you in README
 */
require('dotenv').config()
const { decryptMedia, Client } = require('@open-wa/wa-automate')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
const { downloader, urlShortener, meme, translate } = require('../../lib')
const { apijikan } = require('../../lib/functions')
const { msgFilter, color, processTime, is, sleep } = require('../../utils')
const { ytplay, ytdldown } = require('../../utils/ytdownload')
const { uploadImages } = require('../../utils/fetcher')
const fs = require('fs-extra')
const fs1 = require('fs')
const fetch = require('node-fetch')
const axios = require('axios')
const mime = require('mime-types')
const sizeOf = require('image-size')
const { exec } = require('child_process')
const ytsr = require('ytsr')
const { profile, groupProfile } = require('../../tools/profile')
const webp = require('webp-converter')
const sharp = require('sharp')
const Exif = require('../../tools/exif')
const exif = new Exif()
const { RemoveBgResult, removeBackgroundFromImageBase64, removeBackgroundFromImageFile } = require('remove.bg')
const { menuId } = require('./text') // Indonesian menu

const ban = JSON.parse(fs.readFileSync('./handler/message/data/banned.json'))
const wel = JSON.parse(fs.readFileSync('./handler/message/data/welcome.json'))
const donator = JSON.parse(fs.readFileSync('./handler/message/data/donator.json'))
const errorurl = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
const errorurl2 = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'

module.exports = msgHandler = async (client, message) => {
    try {
        const { type, id, from, t, to, sender, isGroupMsg, chat, caption, isMedia, isGif, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName // verifiedName is the name of someone who uses a business account
        const botNumber = await client.getHostNumber() + '@c.us'
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const groupMembers = isGroupMsg ? await client.getGroupMembersId(groupId) : ''
        const isGroupAdmins = groupAdmins.includes(sender.id) || false
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const block = await client.getBlockedIds()
        const ownerNumber = '6285382618855@c.us'
        const isOwner = ownerNumber.includes(sender.id)
        const isBanned = ban.includes(sender.id)
        const isBlocked = block.includes(sender.id)
        const isDonator = donator.includes(sender.id)

        // Bot Prefix
        const prefix = '/'
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const arg = body.substring(body.indexOf(' ') + 1)
        const args = body.trim().split(/ +/).slice(1)
        const isCmd = body.startsWith(prefix)
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const url = args.length !== 0 ? args[0] : ''
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'

        // [BETA] Avoid Spam Message
        if (isCmd && msgFilter.isFiltered(from) && !isGroupMsg) { return client.reply(from, 'Santay dong boss, masih cooldown nih!', id)
            .then(() => { console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname)) }) }
        if (isCmd && msgFilter.isFiltered(from) && isGroupMsg) { return client.reply(from, 'Santay dong boss, masih cooldown nih!', id)
            .then(() => { console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle)) }) }
        //
        if (!isCmd && !isGroupMsg) { return console.log('[RECV]', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'Message from', color(pushname)) }
        if (!isCmd && isGroupMsg) { return console.log('[RECV]', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'Message from', color(pushname), 'in', color(name || formattedTitle)) }
        if (isCmd && !isGroupMsg) { console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname)) }
        if (isCmd && isGroupMsg) { console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle)) }
        // [BETA] Avoid Spam Message
        if (isCmd) msgFilter.addFilter(from)

        // Text function
        function monospace(string) {
            return '```' + string + '```'
        }

        //
        const mess = {
            "nogc": "Maaf, perintah ini hanya dapat dipakai didalam grup! [Group Only]",
            "notadmn": "Gagal, perintah ini hanya dapat digunakan oleh admin grup! [Admin Group Only]",
            "botnotadmn": "Gagal, silahkan tambahkan bot sebagai admin grup! [Bot not Admin]",
            "owner": "[❌] Perintah khusus untuk pemilik bot!",
            "tunggu": "[⏳] Mohon tunggu sebentar!\nBila tidak dikirim berarti Error!",
            "pcaja": `[⛔] Private Chat aja bro wa.me\/${botNumber.replace(/@c.us/, '')}`,
            "donate": `[💎] Fitur khusus Donator!\nSilahkan ketik ${prefix}donasi`,
            "noimg": "[🚫] Tidak ada gambar untuk di proses!",
            "mtc": "[🚫] Fitur sedang diperbaiki!"
        }
        const rate = [
            "0%",
            "10%",
            "20%",
            "30%",
            "40%",
            "50%",
            "60%",
            "70%",
            "80%",
            "90%",
            "100%"
        ]
        const apakah = [
            "Ya",
            "Tidak",
            "Mungkin",
            "Bisa jadi",
            "Tidak mungkin terjadi",
            "Rahasia Tuhan"
        ]

        if (isBlocked) return client.reply(from, 'Kamu telah diblokir dari memakai bot!', id)
        if (!isBanned) {
        switch (command) {
        // Fun Menu
        case 'motivasi': // By beniismael
            fetch('https://raw.githubusercontent.com/beniismael/botstyle/main/media/motivasi.txt')
            .then(res => res.text())
            .then(body => {
                let motivasi = body.split("\n")
                let randmotiv = motivasi[Math.floor(Math.random() * motivasi.length)]
                client.reply(from, randmotiv, id)
            }).catch((err) => {
                console.error(err)
                client.reply(from, `Error:\n${err}`, id)
            })
            break
        case 'truth':
            fetch('https://raw.githubusercontent.com/AlvioAdjiJanuar/random/main/truth.txt')
            .then(res => res.text()).then(body => {
                let truthx = body.split('\n')
                let truthz = truthx[Math.floor(Math.random() * truthx.length)]
                client.reply(from, truthz, id)
            }).catch((e) => {
                console.error(e)
                client.reply(from, `Error: ${e.message}`, id)
            })
            break
            case 'dare':
                fetch('https://raw.githubusercontent.com/AlvioAdjiJanuar/random/main/dare.txt')
                .then(res => res.text()).then(body => {
                    let darex = body.split('\n')
                    let darev = darex[Math.floor(Math.random() * darex.length)]
                    client.reply(from, darev, id)
                }).catch((e) => {
                    console.error(e)
                    client.reply(from, `Error: ${e.message}`, id)
                })
                break
        case 'apakah':{
            if (!args.length) return client.reply(from, `Apa yang mau saya ramal?, contoh ${prefix}apakah aku bisa jadi ironman?`, id)
            const apa = args.join(' ')
            const awr = apakah[Math.floor(Math.random() * (apakah.length))]
            await client.reply(from, `Pertanyaan: *${apa}*\nJawaban: *${awr}*`, id)
        }
        break
        case 'dadu':{
            const dice = Math.floor(Math.random() * 6) + 1
            await client.sendStickerfromUrl(from, `https://www.random.org/dice/dice${dice}.png`, { method: 'get' })
        }
        break
        case 'koin':{
            const side = Math.floor(Math.random() * 2) + 1
            if (side == 1) {
                client.sendStickerfromUrl(from, 'https://i.ibb.co/YTWZrZV/2003-indonesia-500-rupiah-copy.png', { method: 'get' })
            } else {
                client.sendStickerfromUrl(from, 'https://i.ibb.co/bLsRM2P/2003-indonesia-500-rupiah-copy-1.png', { method: 'get' })
            }
        }
        break
        case 'rate':{
            if (!args.length) return client.reply(from, `Apa yang mau saya ukur?, contoh ${prefix}rate kecerdasan bot`, id)
            const rating = args.join(' ')
            const awr = rate[Math.floor(Math.random() * (rate.length))]
            await client.reply(from, `Pertanyaan: *${rating}*\nJawaban: *${awr}*`, id)
            }
            break
        case 'bpk':
            if (!args.length) return client.reply(from, 'Give me a text', id)
            try {
                const input = args.join(" ")
                const res = await axios.get(`http://api.terhambar.com/bpk?kata=${encodeURIComponent(input)}`)
                await client.reply(from, res.data.text, id)
            } catch(e) {
                console.error(e)
                client.reply(from, `Error: ${e.message}`, id)
            }
            break
        // Menu and Help
        case 'speed':
        case 'ping':
            await client.sendTextWithMentions(from, `@${sender.id.replace('@c.us', '')} - Pong!!!!\nSpeed: ${processTime(t, moment())} _Second_`, id)
            break
        case 'info':
            await client.reply(from, monospace(menuId.textInfo()), id)
            break
        case 'menu':
            if (!args.length) return client.reply(from, `Hai, ${pushname}\nUntuk melihat list command kirimkan ${prefix}menu [menu]\nList menu bisa dilihat di ${prefix}help`, id)
            if (args[0] === 'download' || args[0] === 'Download') {
                await client.reply(from, menuId.Downloader(prefix), id)
            } else if (args[0] === 'other') {
                await client.reply(from, menuId.Other(prefix), id)
            } else if (args[0] === 'sticker' || args[0] === 'stiker') {
                await client.reply(from, menuId.Sticker(prefix), id)
            } else if (args[0] === 'grup') {
                await client.reply(from, menuId.Group(prefix), id)
            } else if (args[0] === 'wibu') {
                await client.reply(from, menuId.Wibu(prefix), id)
            } else if (args[0] === 'fun') {
                await client.reply(from, menuId.funMenu(prefix), id)
            }
            break
        case 'help':
            await client.reply(from, menuId.textMenu(pushname, prefix), id)
            break
        case 'donate':
        case 'donasi':
            await client.sendLinkWithAutoPreview(from, monospace(menuId.textDonasi()))
            break
        // Sticker Creator
        case 'snobg':{
            if ((isMedia || isQuotedImage) && args.length === 0) {
                if (!isDonator) return client.reply(from, mess.donate, id)
                try {
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    const base64img = imageBase64
                    const result = await removeBackgroundFromImageBase64({ base64img, apiKey: 'apiKey', size: 'auto', type: 'auto' }) // Ambil di remove.bg
                    await client.sendImageAsSticker(from, `data:${_mimetype};base64,${result.base64img}`).then(() => {
                        console.log(`Sticker noBackground processed for ${processTime(t, moment())} seconds`)
                    })
                } catch(err) {
                    console.error(err)
                    await client.reply(from, err, id)
                }
            } else {
                client.reply(from, mess.noimg, id)
            }
        }
        break
        case 'sticker':
        case 'stiker': {
            if ((isMedia || isQuotedImage) && args.length === 0) {
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                await client.reply(from, mess.tunggu, id)
                webp.buffer2webpbuffer(mediaData, 'jpg', '-q 100')
                .then((res) => {
                    sharp(res)
                    .resize(512, 512)
                    .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                        if (err) return console.error(err)
                        exec(`webpmux -set exif ./temp/biasa.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`)
                        await sleep(2000)
                        const data = fs1.readFileSync(`./temp/${sender.id}.webp`)
                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                        await client.sendRawWebpAsSticker(from, base64)
                        fs1.unlinkSync(`./temp/stage_${sender.id}.webp`)
                        fs1.unlinkSync(`./temp/${sender.id}.webp`)
                    })
                }).catch((err) => {
                    console.error(err)
                    client.reply(from, `${err}`, id)
                })
            } else if (args[0] === 'nocrop') {
                try {
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const buffer = await decryptMedia(encryptMedia, uaOverride)
                    const fileName = `./temp/nocrop_${from}.${mime.extension(mimetype)}`
                    fs.writeFile(`${fileName}`, buffer, function (err) {})
                    exec(`convert ${fileName} ./temp/stage_${from}.png`)
                    await sleep(1000)
                    var dimensions = await sizeOf(`./temp/stage_${from}.png`)
                    if (dimensions.width < dimensions.height) {
                        let cmd = 'mogrify -bordercolor transparent -border ' + (dimensions.height - dimensions.width) / 2 +' '+ `./temp/stage_${from}.png`
                        console.log(cmd)
                        exec(cmd)
                    } else if (dimensions.width > dimensions.height) {
                        let cmd = 'mogrify -bordercolor transparent -border 0x'+ (dimensions.width - dimensions.height) / 2+' '+ `./temp/stage_${from}.png`
                        console.log(cmd)
                        exec(cmd)
                    } else {
                    }
                } catch(err) {
                    console.error(err)
                    await client.reply(from, err.message, id)
                }
                await sleep(2000)
                const media = await fs.readFile(`./temp/stage_${from}.png`, { encoding: 'base64' })
                await client.sendImageAsSticker(from, `data:image/png;base64,${media.toString('base64')}`)
                fs.unlinkSync(`./temp/nocrop_${from}.${mime.extension(mimetype)}`)
                fs.unlinkSync(`./temp/stage_${from}.png`)
            } else if (args.length === 1) {
                try {
                if (!is.Url(url)) { await client.reply(from, 'Maaf, link yang kamu kirim tidak valid. [Invalid Link]', id) }
                client.sendStickerfromUrl(from, url).then((r) => (!r && r !== undefined).catch((e) => {
                    console.error(e)
                    client.reply(from, `Error: ${e.message}`, id)
                })
                    ? client.sendText(from, 'Maaf, link yang kamu kirim tidak memuat gambar. [No Image]')
                    : client.reply(from, 'Here\'s your sticker', id)).then(() => console.log(`Sticker Processed for ${processTime(t, moment())} Second`))
                } catch(e) {
                    console.error(e)
                }
            } else {
                client.reply(from, mess.noimg, id)
            }
            break
        }
        case 'takesticker':
            case 'takestik':
                if (!isDonator) return client.reply(from, mess.donate, id)
                if (!args.includes('|')) return client.reply(from, `Format pesan salah. Contoh ${prefix}takestik Faiz | Faiz`, id)
                if (quotedMsg && quotedMsg.type == 'sticker') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    await client.reply(from, mess.tunggu, id)
                    const packname = arg.split('|')[0]
                    const author = arg.split('|')[1]
                    exif.create(packname, author, `take_${sender.id}`)
                    webp.buffer2webpbuffer(mediaData, 'jpg', '-q 100')
                    .then((res) => {
                        sharp(res)
                        .resize(512, 512)
                        .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                            if (err) return console.error(err)
                            exec(`webpmux -set exif ./temp/take_${sender.id}.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`)
                            await sleep(2000)
                            const data = fs1.readFileSync(`./temp/${sender.id}.webp`)
                            const base64 = `data:image/webp;base64,${data.toString('base64')}`
                            await client.sendRawWebpAsSticker(from, base64)
                            fs1.unlinkSync(`./temp/take_${sender.id}.exif`)
                            fs1.unlinkSync(`./temp/stage_${sender.id}.webp`)
                            fs1.unlinkSync(`./temp/${sender.id}.webp`)
                        })
                    }).catch(async (err) => {
                        console.error(err)
                        await client.reply(from, `${err}`, id)
                    })
                } else {
                    await client.reply(from, 'Tidak ada sticker yang di reply', id)
                }
                break
        case 'stickermeme':
            case 'memesticker':
                case 'memestiker':
                    case 'stikermeme':
                if ((isMedia || isQuotedImage) && args.length >= 1) {
                    const top = arg.split('|')[0]
                    const bottom = arg.split('|')[1]
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const getUrl = await uploadImages(mediaData, false)
                    const imageBase64 = await meme.custom(getUrl, top, bottom)
                    client.sendImageAsSticker(from, imageBase64).then(() => {
                        console.log(`Sticker Processed for ${processTime(t, moment())} Second`)
                    })
                } else {
                    client.reply(from, 'Tidak ada gambar untuk diproses!', id)
                }
            break
        case 'toimg':
            case 'toimage':
                if (quotedMsg && quotedMsg.type == 'sticker') {
                    const mediaData = await decryptMedia(quotedMsg)
                    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                    await client.sendFile(from, imageBase64, 'imgsticker.jpg', '*Selesai!...*', id)
                    .then(() => {
                        console.log(`Sticker to Image Processed for ${processTime(t, moment())} Seconds`)
                    })
                } else if (!quotedMsg) { return client.reply(from, 'Silahkan tag sticker yang ingin di convert!', id) }
                break
                case 'sgif':
                    case 'stickergif':
                        case 'stikergif':
                            if (isMedia && type === 'video' || mimetype === 'image/gif') {
                                try {
                                    const mediaData = await decryptMedia(message, uaOverride)
                                    await client.reply(from, mess.tunggu, id)
                                    await client.sendMp4AsSticker(from, mediaData, {fps: 15, startTime: `00:00:00.0`, endTime: `00:00:05.0`, loop: 0, crop: false, log: true}).then(() => {
                                        console.log('Send Sticker Gif Success to '+pushname)
                                    })
                                } catch(e) {
                                    console.error(e)
                                    client.reply(from, 'Durasi terlalu panjang atau ukuran stiker gifnya terlalu besar, harap kurangi durasi video atau kompres video terlebih dahulu!', id)
                                }
                            } else if (quotedMsg && quotedMsg.type == 'video' || quotedMsg && quotedMsg.mimetype == 'image/gif') {
                                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                                await client.sendMp4AsSticker(from, mediaData, {fps: 15, startTime: `00:00:00.0`, endTime: `00:00:05.0`, loop: 0, crop: false, log: true}).then(() => {
                                    console.log('Send Sticker Gif Success to '+pushname)
                                }).catch((e) => {
                                    console.error(e)
                                    client.reply(from, 'Durasi terlalu panjang atau ukuran stiker gifnya terlalu besar, harap kurangi durasi video atau kompres video terlebih dahulu!', id)
                                })
                            } else {
                                client.reply(from, 'Hanya untuk video/gif saja!', id)
                            }
                            break
        case 'stikergiphy':
        case 'giphysticker': {
            if (args.length !== 1) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            if (is.Giphy) {
                const getGiphyCode = url.match(new RegExp(/(\/|\-)(?:.(?!(\/|\-)))+$/, 'gi'))
                if (!getGiphyCode) { return client.reply(from, 'Gagal mengambil kode giphy', id) }
                const giphyCode = getGiphyCode[0].replace(/[-\/]/gi, '')
                const smallGifUrl = 'https://media.giphy.com/media/' + giphyCode + '/giphy-downsized.gif'
                client.sendGiphyAsSticker(from, smallGifUrl).then(() => {
                    console.log(`Sticker Processed for ${processTime(t, moment())} Second`)
                }).catch((err) => console.log(err))
            } else if (is.MediaGiphy) {
                const gifUrl = url.match(new RegExp(/(giphy|source).(gif|mp4)/, 'gi'))
                if (!gifUrl) { return client.reply(from, 'Gagal mengambil kode giphy', id) }
                const smallGifUrl = url.replace(gifUrl[0], 'giphy-downsized.gif')
                client.sendGiphyAsSticker(from, smallGifUrl).then(() => {
                    console.log(`Sticker Processed for ${processTime(t, moment())} Second`)
                }).catch((err) => console.log(err))
            } else {
                await client.reply(from, 'maaf, untuk saat ini sticker gif hanya bisa menggunakan link dari giphy.  [Giphy Only]', id)
            }
            break
        }
        // Video Downloader
        case 'ig':
        case 'instagram':
            if (args.length !== 1) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            if (!is.Url(url) && !url.includes('instagram.com')) return client.reply(from, 'Maaf, link yang kamu kirim tidak valid. [Invalid Link]', id)
            await client.reply(from, `*Mengambil Data...*`, id)
            downloader.insta(url).then(async (data) => {
                if (data.type == 'GraphSidecar') {
                    if (data.image.length != 0) {
                        data.image.map((x) => client.sendFileFromUrl(from, x, 'photo.jpg', '', null, null, true)
                        .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                        )
                    }
                    if (data.video.length != 0) {
                        data.video.map((x) => client.sendFileFromUrl(from, x.videoUrl, 'video.mp4', '', null, null, true)
                        .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                        )
                    }
                } else if (data.type == 'GraphImage') {
                    client.sendFileFromUrl(from, data.image, 'photo.jpg', '', null, null, true)
                        .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                        .catch((err) => console.error(err))
                } else if (data.type == 'GraphVideo') {
                    client.sendFileFromUrl(from, data.video.videoUrl, 'video.mp4', '', null, null, true)
                        .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                        .catch((err) => console.error(err))
                }
            })
                .catch((err) => {
                    console.log(err)
                    if (err) { return client.reply(from, 'Error, tidak ada video di link yang kamu kirim. [Invalid Link]', id) }
                    client.reply(from, 'Error, user private atau link salah [Private or Invalid Link]', id)
                })
            break
        case 'twt':
        case 'twitter':
            if (args.length !== 1) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            if (!is.Url(url) & !url.includes('twitter.com') || url.includes('t.co')) return client.reply(from, 'Maaf, url yang kamu kirim tidak valid. [Invalid Link]', id)
            await client.reply(from, `*Mengambil Data...*`, id)
            downloader.tweet(url).then(async (data) => {
                if (data.type === 'video') {
                    const content = data.variants.filter(x => x.content_type !== 'application/x-mpegURL').sort((a, b) => b.bitrate - a.bitrate)
                    const result = await urlShortener(content[0].url)
                    console.log('Shortlink: ' + result)
                    await client.sendFileFromUrl(from, content[0].url, 'video.mp4', `Link Download: ${result} \n\nProcessed for ${processTime(t, moment())} _Second_`, null, null, true)
                        .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                        .catch((err) => console.error(err))
                } else if (data.type === 'photo') {
                    for (let i = 0; i < data.variants.length; i++) {
                        await client.sendFileFromUrl(from, data.variants[i], data.variants[i].split('/media/')[1], '', null, null, true)
                            .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                            .catch((err) => console.error(err))
                    }
                }
            })
                .catch(() => client.sendText(from, 'Maaf, link tidak valid atau tidak ada media di link yang kamu kirim. [Invalid Link]'))
            break
            case 'play':{
                if (!isDonator) return client.reply(from, mess.donate, id)
                if (!args.length) return client.reply(from, `No title provided, ex: ${prefix}play gustixa`, id)
                var title = args.join(" ")
                var link1 = await ytplay(title)
                ytdldown(link1, 'mp3').then(async(res) => {
                    if (res.status === 'error') return client.sendText(from, `${res.title}\nLink: ${res.link}`)
                    if (res.status === 'sukses') {
                        await client.sendFileFromUrl(from, res.thumbnail, 'thumb.jpg', `Judul: ${res.title}\n\nMohon tunggu...`, id)
                        return client.sendFileFromUrl(from, res.link, 'audio.mp3', '', id)
                    }
                }).catch((e) => {
                    console.error(e)
                    client.reply(from, `Error: ${e.message}`, id)
                })
            }
            break
            case 'ytmp3':{
                if (!args.length) return client.reply(from, `No link provided, ex: ${prefix}ytmp3 https://youtu.be/MFURRY05R`, id)
                let input = args[0]
                ytdldown(input, 'mp3').then(async(res) => {
                    if (res.status === 'error') return client.sendText(from, `${res.title}\nLink: ${res.link}`)
                    if (res.status === 'sukses') {
                        await client.sendFileFromUrl(from, res.thumbnail, 'thumb.jpg', `Judul: ${res.title}\n\nMohon tunggu...`, id)
                        return client.sendFileFromUrl(from, res.link, 'audio.mp3', '', id)
                    }
                }).catch((e) => {
                    console.error(e)
                    client.reply(from, `Error: ${e.message}`, id)
                })
            }
            break
            case 'ytmp4':{
                if (!args.length) return client.reply(from, `No link provided, ex: ${prefix}ytmp4 https://youtu.be/MFURRY05R`, id)
                let input = args[0]
                ytdldown(input, 'mp4').then(async(res) => {
                    if (res.status === 'error') return client.sendText(from, `${res.title}\nLink: ${res.link}`)
                    if (res.status === 'sukses') {
                        await client.sendFileFromUrl(from, res.thumbnail, 'thumb.jpg', `Judul: ${res.title}\n\nMohon tunggu...`, id)
                        return client.sendFileFromUrl(from, res.link, 'video.mp4', '', id)
                    }
                }).catch((e) => {
                    console.error(e)
                    client.reply(from, `Error: ${e.message}`, id)
                })
            }
            break
        case 'ytsch':
            case 'ytsearch':
            if (!args.length) return client.reply(from, 'Harap masukan judul video!', id)
            try {
                const input = args.join(" ")
                const fil = await ytsr.getFilters(input)
                const fil1 = fil.get('Type').get('Video')
                const fil2 = await ytsr.getFilters(fil1.url)
                const fil3 = fil2.get("Duration").get("Short (< 4 minutes)")
                const { items } = await ytsr(fil3.url, { limit: 10 })

                let hehe = `*YOUTUBE SEARCH*\n\n*Search Query:* ${input}\n`
                for (let i = 0; i < items.length; i++) {
                    hehe += `\n\n=====================\n\n*Judul:* ${items[i].title}\n\n*ID:* ${items[i].id}\n\n*Ditonton:* ${items[i].views}\n\n*Durasi:* ${items[i].duration}\n\n*Link:* ${items[i].url}\n`
                }
                await client.sendFileFromUrl(from, items[0].bestThumbnail.url, 'pict.jpg', `${hehe}\n\nDownload:\n${prefix}ytmp3 [link youtube] = Audio\n${prefix}ytmp4 [link youtube] = Video`, id)
            } catch(e) {
                client.reply(from, 'Didn\'t find anything or there is any error!', id)
                client.sendText(ownerNumber, `Error: ${e.message}`)
            }
            break
        // Other Command
        case 'cat':
            try {
                const q1 = Math.floor(Math.random() * 900) + 300
                const q2 = Math.floor(Math.random() * 900) + 300
                await client.sendFileFromUrl(from, `http://placekitten.com/${q2}/${q1}`, 'kitten.png', 'Here a Kitten for you', id)
            } catch(e) {
                console.error(e)
                client.reply(from, `Error: ${e.message}`, id)
            }
            break
        case 'googleimg':
            try {
                    const query = arg.split('|')[0]
                    const jum = arg.split('|')[1]
                    if (!args.length) return client.reply(from, `Kirim perintah dengan format ${prefix}googleimg [Query|jumlah], contoh = ${prefix}googleimg Loli|3`, id)
                    if (!jum) return client.reply(from, `Maaf jumlah gambar diperlukan, contoh ${prefix}googleimg Loli|3`, id)
                    if (jum >= 5) return client.reply(from, 'Maaf jumlah gambar terlalu banyak, maks 4', id)
                        
                var gis = require('g-i-s')
                var opts = {
                    searchTerm: query
                }
                gis(opts, logResults);
                function logResults(error, results) {
                    if (error) {
                        console.error(error)
                        client.reply(from, `Error: ${error.message}`, id)
                    } else {
                    const item = results.slice(0, jum)
                    item.forEach(async (res) => {
                        const yurl = await urlShortener(res.url)
                        await client.sendImage(from, res.url, null, `➸ Link : ${yurl}\n➸ Image size : ${res.height} x ${res.width}`, id).catch((e) => {console.error(e)})
                    })
                }
            }
            } catch(e) {
                console.error(e)
                client.reply(from, `Error: ${e.message}`, id)
            }
            break
        case 'bug':
        case 'report':
        case 'bugreport':{
            if (args.length < 1) return client.reply(from, 'Found a bug on this bot? Then report using *-bugreport [something]*', id)
            let input = args.join(" ")
            await client.reply(from, 'Thanks for reporting!', id).then(() => {
                client.sendText(ownerNumber, `*[ BUG REPORT ]*\n*Name:* ${sender.pushname}\n*Link:* https://wa.me\/${sender.id.replace('@c.us','')}\n\nIsi Report,\n${input}`)
            })
            break
        }
        case 'github':{
            if (!args.length) return client.reply(from, `Harap masukan nama user atau path repo, contoh:\nDetail User: ${prefix}github FaizBastomi\nDetail Repo: ${prefix}github YogaSakti/imageToSticker`, id)
            const input = args.join(" ")
            if (input.includes('/')) {
                const user = input.split('/')[0]
                const repo = input.split('/')[1]
                const res = await axios.get(`https://api.github.com/repos/${user}/${repo}`)
                const { full_name, html_url, description, open_issues, language } = res.data
                let text = `Name: ${full_name}\nDescription: ${description}\nLanguage: ${language}\nOpened Issues: ${open_issues}\nLink: ${html_url}`
                client.reply(from, text, id)
            } else {
                const res = await axios.get(`https://api.github.com/users/${input}`)
                const { login, name, html_url, bio, followers, location } = res.data
                let text = `Name/Alias: ${login}\/${name}\nBio: ${bio}\nFollowers: ${followers}\nLocation: ${location}\nLink: ${html_url}`
                client.reply(from, text, id)
            }
            break
        }
        case 'tts':
            if (args.length === 1) return client.reply(from, `Kirim perintah *${prefix}tts [kode bahasa] [text]*, Contoh ${prefix}tts id halo`, id)
            try {
                var dataBhs = args[0]
                const ttsZH = require('node-gtts')(dataBhs)
                var dataText = body.slice(8)
                if (dataText === '') return client.reply(from, 'Masukan textnya kaka', id)
                if (dataText > 450) return client.reply(from, 'textnya kepanjangan', id)
                ttsZH.save('./temp/tts.mp3', dataText, function () { })
                await sleep(2000)
                client.sendPtt(from, './temp/tts.mp3', id)
                fs.unlinkSync(`./temp/tts.mp3`)
            } catch(err) {
                console.error(err)
                client.reply(from, 'Kode bahasa salah, Silahkan cek kode disini https://pastebin.com/gNtNbX2u', id)
            }
            break
        case 'sadboi':
            fetch('https://api.terhambar.com/qts/').then(async (res) => {
                const {quotes} = await res.json()
                client.reply(from, `${quotes}\n\n*Provided by: terhambar.com*`, id)
            }).catch(e => console.error(e))
            break
        case 'pins':{
            const input = args[0]
            axios.get(`https://scrap.terhambar.com/pin?url=${input}`).then(async (res) => {
                const { title, links } = res.data.response
                await client.sendFileFromUrl(from, links[0].url, 'pins.png', `${title}\nSize: ${links[0].size}`, id)
            }).catch(() => {
                client.reply(from, 'Mungkin link tidak valid!', id)
            })
            break
        }
            case 'meme':
                await meme.random().then(async (res) => {
                    await client.sendFileFromUrl(from, res.url, 'pict.png', `${res.title}\nAuthor: ${res.author}`, id)
                })
                break
        case 'memeimg':
            if ((isMedia || isQuotedImage) && args.length >= 1) {
                const top = arg.split('|')[0]
                const bottom = arg.split('|')[1]
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const getUrl = await uploadImages(mediaData, false)
                const ImageBase64 = await meme.custom(getUrl, top, bottom)
                client.sendFile(from, ImageBase64, 'image.png', '', null, true)
                    .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                    .catch((err) => console.error(err))
            } else {
                await client.reply(from, 'Tidak ada gambar! Untuk membuka cara penggnaan kirim !menu [Wrong Format]', id)
            }
            break
        case 'tr':
        case 'translate':
            if (args.length != 1) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            if (!quotedMsg) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            const quoteText = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
            translate(quoteText, args[0])
                .then((result) => client.sendText(from, result))
                .catch(() => client.sendText(from, '[Error] Kode bahasa salah atau server bermasalah.'))
            break
            case 'lirik':{
                if (args.length === 0) return await client.sendText(from, `Kirim perintah *${prefix}lirik [lagu]*, contoh *${prefix}lirik strongest*`, id)
                const input = args.join(" ")
                axios.get(`http://scrap.terhambar.com/lirik?word=${input}`).then((res) => {
                    client.reply(from, `*Lirik for ${input}*\n\n${res.data.result.lirik}\n\n*Provided by: Terhambar.com*`, id)
                }).catch((e) => {
                    console.error(e.message)
                    client.reply(from, `Error:\n${e}`, id)
                })
            }
                break
            case 'join':
                if (isGroupMsg) return client.reply(from, 'Tidak dapat digunakan di dalam grup!', id)
                if (!args.length) return client.reply(from, `Kirim perintah *${prefix}join linkgroup*\n\nEx:\n!join https://chat.whatsapp.com/blablablablablabla`, id)
                const link = args.join(" ")
                const isLink = link.match(/(https:\/\/chat.whatsapp.com)/)
                const check = await client.inviteInfo(link)
                if (!isLink) return client.reply(from, 'Apanih, link grup?', id)
                if (check.status === 200) {
                    await client.joinGroupViaLink(link).then(() => client.reply(from, 'Bot akan segera masuk!', id))
                } else {
                    client.reply(from, 'Link group tidak valid!', id)
                }
                break
        case 'owner':
            await client.sendContact(from, ownerNumber)
            break
        // Weebs Command
		case 'randomanime':{
            axios.get('https://api.computerfreaker.cf/v1/anime', {headers:{
                'User-Agent': 'botwaa/v1/indo/remake'
            }}).then((res) => {
                client.sendFileFromUrl(from, res.data.url, 'pict.png', '', id, {headers:{'User-Agent':'botwaa/v1/indo/remake'}})
            })
        }
        break
		case 'hentai':{
            if (isGroupMsg) return client.reply(from, mess.pcaja, id)
            axios.get('https://api.computerfreaker.cf/v1/hentai', {headers:{
                'User-Agent': 'botwaa/v1/indo/remake'
            }}).then((res) => {
                client.sendFileFromUrl(from, res.data.url, 'pict.png', '', id, {headers:{'User-Agent':'botwaa/v1/indo/remake'}})
            })
        }
        break
        case 'nsfwneko':{
            if (isGroupMsg) return client.reply(from, mess.pcaja, id)
            axios.get('https://api.computerfreaker.cf/v1/nsfwneko', {headers:{
                'User-Agent': 'botwaa/v1/indo/remake'
            }}).then((res) => {
                client.sendFileFromUrl(from, res.data.url, 'pict.png', '', id, {headers:{'User-Agent':'botwaa/v1/indo/remake'}})
            })
        }
        break
        case 'neko':{
            axios.get('https://api.computerfreaker.cf/v1/neko', {headers:{
                'User-Agent': 'botwaa/v1/indo/remake'
            }}).then((res) => {
                client.sendFileFromUrl(from, res.data.url, 'pict.png', '', id, {headers:{'User-Agent':'botwaa/v1/indo/remake'}})
            })
        }
        break
        case 'yuri':
            if (isGroupMsg) return client.reply(from, mess.pcaja, id)
            axios.get('https://api.computerfreaker.cf/v1/yuri', {headers :{
                'User-Agent': 'notwaa/v1/indo/remake'
            }}).then((res) => {
                client.sendFileFromUrl(from, res.data.url, '', '', id, {headers:{'User-Agent':'botwaa/v1/indo/remake'}})
            })
            break
        case 'anime':
            if (args.length === 0) return client.sendText(from, 'No Title to search!', id)
            const keyword = args.join(" ")
            try {
                const data = await fetch(`https://api.jikan.moe/v3/search/anime?q=${keyword}`)
                const parsed = await data.json()
                if (!parsed) {
                    await client.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Sorry, Couldn\'t find the requested anime', id)
                console.log("Sent!")
                return null
                }
            const { title, synopsis, episodes, url, rated, score, image_url } = parsed.results[0]
            const content = `*YEAY Found!*
✨ Title: ${title}

🎆️ *Episodes:* ${episodes}

💌️ *Rating:* ${rated}

❤️ *Score:* ${score}

💚️ *Synopsis:* ${synopsis}

🌐️ *URL*: ${url}`
        client.sendFileFromUrl(from, image_url, 'animeresult.png', content)
            } catch (err) {
                console.log(err.message)
                await client.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Sorry, Couldn\'t find the requested anime')
            }
            break
        case 'chara':
            if (!args.length) return await client.reply(from, 'Please, give me name of character!', id)
            try {
                const input = args.join(" ")
                apijikan('chara', input).then(async (res) => {
                    const content = `Name: ${res.name}

Url: ${res.url}

From: ${res.from}`
                    await client.sendFileFromUrl(from, res.image, 'pict.png', content, id).catch((e) => {console.error(e.message)})
                }).catch((e) => { console.error(e.message) })
            } catch(err) {
                console.error(err.message)
                client.reply(from, 'Sorry, Couldn\'t find anything', id)
            }
            break
        case 'manga':
            if (!args.length) return await client.reply(from, 'Please, give me title of the manga!', id)
            try {
                const input = args.join(" ")
                apijikan('manga', input).then(async (res) => {
                    const content = `Title: ${res.title}

Synopsis: ${res.synop}

Chapter: ${res.chap}

Volume: ${res.vol}

Url: ${res.url}`
                    await client.sendFileFromUrl(from, res.image, 'pict.png', content, id)
                }).catch((e) => { onsole.error(e.message) })
            } catch(err) {
                console.error(err.message)
                await client.reply(from, 'Sorry, Couldn\'t find anything', id)
            }
            break
            // Other Command
        case 'math':
            case 'mtk':
                case 'matematika':{
                    if (!args.length) return client.reply(from, 'Apa yang mau anda hitung?', id)
                        const input = args.join(" ")
                    const math = require('mathjs')
                    const s = math.evaluate(input)
                    client.reply(from, `*Hasil:*\n\n${args.join(" ")} = ${s}`, id)
                }
                break
        // Group Commands (group admin only)
        case 'welcome':{
            if (!isGroupMsg) return;
            if (!isGroupAdmins) return client.reply(from, mess.notadmn, id)
            if (!isBotGroupAdmins) return client.reply(from, mess.botnotadmn, id)
            if (!args[0]) return client.reply(from, `Format salah!\nContoh ${prefix}welcome on`, id)

            if (args[0] === 'on') {
                if (wel.includes(chat.id)) return client.reply(from, '*Sudah Aktif sebelumnya*', id)
                wel.push(chat.id)
                fs.writeFileSync('./handler/message/data/welcome.json', JSON.stringify(wel))
                client.reply(from, '*Activated!*', id)
            } else if (args[0] === 'off') {
                if (!wel.includes(from)) return client.reply(from, '*Belom pernah di aktifkan*', id)
                const inx = wel.indexOf(chat.id)
                wel.splice(inx, 1)
                fs.writeFileSync('./handler/message/data/welcome.json', JSON.stringify(wel))
                client.reply(from, '*Deactivated!*', id)
            }
            break
        }
        case 'profile':{
            if (quotedMsg) return profile(quotedMsgObj.sender.id, message, groupAdmins, client)
            if (mentionedJidList.length >= 1) return profile(mentionedJidList[0], message, groupAdmins, client)
            if (!quotedMsg) return profile(sender.id, message, groupAdmins, client)
            break
        }
            case 'grupinfo':
                case 'groupinfo':
                if (!isGroupMsg) return client.sendText(from, mess.nogc)
                if (!isBotGroupAdmins) return client.reply(from, mess.botnotadmn, id)
                if (isGroupMsg) return groupProfile(chat, message, client)
                break
            case 'gcreator': {
                const gid = await chat.groupMetadata.owner
                await client.sendContact(groupId, gid)
            }
            break
            case 'switch':
                if (!isGroupMsg) return client.reply(from, mess.nogc, id)
            if (!isGroupAdmins) return client.reply(from, mess.notadmn, id)
            if (!isBotGroupAdmins) return client.reply(from, mess.botnotadmn, id)
                if (args.length === 0) return client.reply(from, `Format salah, contoh penggunaan *${prefix}switch on*.`, id)
                if (args.length === 2) return client.reply(from, `Format salah, contoh penggunaan *${prefix}switch on*.`, id)
                if (args[0] === 'on') {
                    await client.setGroupToAdminsOnly(groupId, true)
                    await client.sendText(from, `Grup ditutup oleh *${pushname}*`)
                } else if (args[0] === 'off') {
                    await client.setGroupToAdminsOnly(groupId, false)
                    await client.sendText(from, `Grup dibuka oleh *${pushname}*`)
                }
                break
        case 'add':
            try {
                if (!isGroupMsg) return client.reply(from, mess.nogc, id)
            if (!isGroupAdmins) return client.reply(from, mess.notadmn, id)
            if (!isBotGroupAdmins) return client.reply(from, mess.botnotadmn, id)
                if (!quotedMsg) {
                const newMem = args[0]
                await client.reply(from, `Request diterima, menambahkan ${newMem} ke grup.`, id)
            await client.addParticipant(groupId, newMem + '@c.us')
                } else {
                    const qmid = quotedMsgObj.sender.id
                    await client.reply(from, `Request diterima, menambahkan ${qmid.replace('@c.us', '')} ke grup.`, id)
                await client.addParticipant(groupId, qmid)
                }
            } catch(e) {
                await client.sendText(from, `*Pengguna tidak dapat ditambahkan*\n1. Mungkin nomornya tidak teregistrasi di WhatsApp\n2. Hanya orang yang ada di kontaknya yg bisa menambahkan\n3. Kesalahan pada server`)
            }
            break
        case 'kickall':
            if (!isDonator) return client.reply(from, mess.donate, id)
            if (!isGroupMsg) return client.reply(from, mess.nogc, id)
            const isGroupOwner = sender.id === chat.groupMetadata.owner
            if (!isGroupOwner) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner group', id)
            if (!isBotGroupAdmins) return client.reply(from, mess.botnotadmn, id)
            const allMem = await client.getGroupMembers(groupId)
            for (let i = 0; i < allMem.length; i++) {
                if (groupAdmins.includes(allMem[i].id)) {
                    console.log('Upss this is Admin group')
                } else {
                    await client.removeParticipant(groupId, allMem[i].id)
                }
            }
            break
        case 'kick':
            if (!isGroupMsg) return client.reply(from, mess.nogc, id)
            if (!isGroupAdmins) return client.reply(from, mess.notadmn, id)
            if (!isBotGroupAdmins) return client.reply(from, mess.botnotadmn, id)
            if (!quotedMsg) {
                if (mentionedJidList.length === 0) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
                if (mentionedJidList[0] === botNumber) return await client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            await client.sendTextWithMentions(from, `Request diterima, mengeluarkan:\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) return await client.sendText(from, 'Gagal, kamu tidak bisa mengeluarkan admin grup.')
                await client.removeParticipant(groupId, mentionedJidList[i])
            }
        } else {
            const qmid = quotedMsgObj.sender.id
            if (qmid === botNumber) return await client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            if (qmid === groupAdmins) return await client.reply(from, 'Gagal, kamu tidak bisa mengeluarkan admin grup.', id)
            await client.sendTextWithMentions(from, `Request diterima, mengeluarkan:\n@${qmid.replace('@c.us', '')}`)
            await client.removeParticipant(groupId, qmid)
        }
            break
        case 'promote':
            if (!isGroupMsg) return client.reply(from, mess.nogc, id)
            if (!isGroupAdmins) return client.reply(from, mess.notadmn, id)
            if (!isBotGroupAdmins) return client.reply(from, mess.botnotadmn, id)
            if (!quotedMsg) {
                if (mentionedJidList.length != 1) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format, Only 1 user]', id)
            if (groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, 'Maaf, user tersebut sudah menjadi admin. [Already Admin]', id)
            if (mentionedJidList[0] === botNumber) return await client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            await client.promoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `Request diterima, menambahkan @${mentionedJidList[0].replace('@c.us', '')} sebagai admin.`)
            } else {
                const qmid = quotedMsgObj.sender.id
                if (groupAdmins.includes(qmid)) return await client.reply(from, 'Maaf, user tersebut sudah menjadi admin. [Already Admin]', id)
                if (qmid === botNumber) return await client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
                await client.promoteParticipant(groupId, qmid)
                await client.sendTextWithMentions(from, `Request diterima, menambahkan @${qmid.replace('@c.us', '')} sebagai admin.`)
            }
            break
        case 'demote':
            if (!isGroupMsg) return client.reply(from, mess.nogc, id)
            if (!isGroupAdmins) return client.reply(from, mess.notadmn, id)
            if (!isBotGroupAdmins) return client.reply(from, mess.botnotadmn, id)
            if (!quotedMsg) {
                if (mentionedJidList.length !== 1) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format, Only 1 user]', id)
            if (!groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, 'Maaf, user tersebut tidak menjadi admin. [user not Admin]', id)
            if (mentionedJidList[0] === botNumber) return await client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            await client.demoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `Request diterima, menghapus jabatan @${mentionedJidList[0].replace('@c.us', '')}.`)
            } else {
                const qmid = quotedMsgObj.sender.id
                if (!groupAdmins.includes(qmid)) return await client.reply(from, 'Maaf, user tersebut tidak menjadi admin. [user not Admin]', id)
            if (qmid === botNumber) return await client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            await client.demoteParticipant(groupId, qmid)
            await client.sendTextWithMentions(from, `Request diterima, menghapus jabatan @${qmid.replace('@c.us', '')}.`)
            }
            break
        case 'leave':
        case 'bye':
            if (isOwner) {
                client.sendText(ownerNumber, 'You my master! I will leave that group now!')
            client.sendText(from, 'Good bye... ( ⇀‸↼‶ )').then(() => client.leaveGroup(groupId))
            } else {
            if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup! [Group Only]', id)
            if (!isGroupAdmins) return client.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup! [Admin Group Only]', id)
            client.sendText(from, 'Good bye... ( ⇀‸↼‶ )').then(() => client.leaveGroup(groupId))
            }
            break
        case 'delete':
        case 'del':
			if (isGroupMsg) {
            if (!quotedMsg) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            if (!quotedMsgObj.fromMe) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
			} else {
				client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
			}
            break
        case 'tagall':
        case 'everyone':
			if (!isGroupAdmins) return await client.reply(from, mess.notadmn, id)
            const member = isGroupMsg ? await client.getGroupMembersId(groupId) : ''
            const msg = body ? args.join(" ") : ''
            if (!isGroupMsg) return client.reply(from, mess.nogc, id)
            await client.sendTextWithMentions(from, `${msg}\n${member.map((x, index) => index + 1 + ". " + `@${x.replace(/@c.us/, '')}`).join('\n')}`, id)
            break
		case 'glink':
            if (!isBotGroupAdmins) return await client.sendText(from, mess.botnotadmn, id)
            if (!isGroupAdmins) return await client.sendText(from, mess.notadmn, id)
            if (isGroupMsg) {
                const inviteLink = await client.getGroupInviteLink(groupId);
                client.sendLinkWithAutoPreview(from, inviteLink)
            } else {
                client.reply(from, mess.nogc, id)
            }
            break
        // Owner Bot Only
            case 'clearall':{
                if (!isOwner) return client.reply(from, mess.owner, id)
                const allChats = await client.getAllChatIds()
                for (let dchat of allChats) {
                    client.deleteChat(dchat).then(() => {
                        console.log(`Delete chat with id ` + dchat)
                    })
                }
            }
            break
        case 'getses':
            try {
            const res = await client.getSnapshot()
            await client.sendFile(from, res, 'pict.png', 'WAW', id)
        } catch(e) {
            console.error(e)
        }
        break
        case 'core':{
            if (!isOwner) return client.reply(from, mess.owner, id)
            let code = args.join(" ")
            try {

            if (!code) return client.reply(from, 'No JavaScript Code', id)
            let evaled;

            if (code.includes("--silent") && code.includes("--async")) {
                code = code.replace("--async", "").replace("--silent", "");

                return await eval(`(async () => { ${code} })()`)
            } else if (code.includes("--async")) {
                code = code.replace("--async", "");
        
                evaled = await eval(`(async () => { ${code} })()`);
              } else if (code.includes("--silent")) {
                code = code.replace("--silent", "");
        
                return await eval(code);
              } else evaled = await eval(code);

              if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled, { depth: 0 });
  
        let output = clean(evaled);
        client.reply(from, output, id)

        } catch(err) {
            console.error(err)
            const error = clean(err)
            client.reply(from, error, id)
        }

        function clean(text) {
            if (typeof text === "string")
              return text
                .replace(/`/g, `\`${String.fromCharCode(8203)}`)
                .replace(/@/g, `@${String.fromCharCode(8203)}`);
            // eslint-disable-line prefer-template
            else return text;
        }
    }
        break
        case 'listban':{
            let bened = `*This is list of banned number*\n*Total:* ${ban.length}\n`
            for (let i of ban) {
                bened += `➸ ${i.replace(/@c.us/g,'')}\n`
            }
            await client.reply(from, bened, id)
        }
        break
        case 'listblock':{
            const blocked = await client.getBlockedIds()
            let blok = `*This is list of blocked number*\n*Total:* ${blocked.length}\n`
            for (let i of blocked) {
                blok += `➸ ${i.replace(/@c.us/g,'')}\n`
            }
            await client.reply(from, blok, id)
        }
        break
    case 'readall':{
        if (!isOwner) return client.reply(from, mess.owner, id)
        const allChat = await client.getAllChatIds()
        for (let dchat of allChat) {
            client.sendSeen(dchat)
        }
        client.reply(from, `Sukses membaca seluruh pesan dari ${allChat.length} kontak`, id)
    }
    break
        case 'ban':
            if (!isOwner) return client.reply(from, mess.owner, id)
            if (quotedMsg) {
                if (args[0] === 'add') {
                let qmid = quotedMsgObj.sender.id
                ban.push(qmid)
                fs.writeFileSync('./handler/message/data/banned.json', JSON.stringify(ban))
                client.reply(from, 'Success banned target!', id)
                }
            if (args[0] === 'del') {
                let inx = quotedMsgObj.sender.id
                ban.splice(inx, 1)
                fs.writeFileSync('./handler/message/data/banned.json', JSON.stringify(ban))
                client.reply(from, 'Success unbanned target!', id)
            }
            } else if (mentionedJidList.length >= 1) {
                if (args[0] === 'add') {
                for (let i = 0; mentionedJidList.length; i++) {
                    ban.push(mentionedJidList[i])
                    fs.writeFileSync('./handler/message/data/banned.json', JSON.stringify(ban))
                    client.reply(from, 'Success ban target!', id)
                }
            } else if (args[0] === 'del') {
                let inxx = ban.indexOf(mentionedJidList[0])
                ban.splice(inxx, 1)
                fs.writeFileSync('./handler/message/data/banned.json', JSON.stringify(ban))
                client.reply(from, 'Success unbanned target!', id)
            }
            } else if (args.length === 2) {
                if (args[0] === 'add') {
                    const input = args[1]
                    ban.push(`${input}@c.us`)
                    fs.writeFileSync('./handler/message/data/banned.json', JSON.stringify(ban))
                    client.reply(from, 'Success ban target!', id)
                } else if (args[0] === 'del') {
                    const input = args[1]
                    let inxx = ban.indexOf(`${input}@c.us`)
                    ban.splice(inxx, 1)
                    fs.writeFileSync('./handler/message/data/banned.json', JSON.stringify(ban))
                    client.reply(from, 'Success unbanned target!', id)
                }
            }
            break
        case 'leaveall':
            if (!isOwner) return await client.reply(from, mess.owner, id)
            var allChats = await client.getAllChatIds()
            var allGroups = await client.getAllGroups()
            for (let gclist of allGroups) {
                var cvk = await client.getChatById(gclist)
                if (!cvk.isReadOnly) await client.sendText(gclist.contact.id, `Bot Sedang pembersihan, total chat aktif: ${allChats.length}`)
                await client.leaveGroup(gclist.contact.id)
            }
            client.reply(sender.id, 'Sukses keluar semua grup!', id)
            break
        case 'bc':
            if (!isOwner) return await client.sendText(from, mess.owner, id)
            if ((isMedia || isQuotedImage) && args.length >= 1) {
                const msg = args.join(" ")
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const base64 = `data:${_mimetype};base64,${mediaData.toString("base64")}`
                const chatz = await client.getAllChatIds()
                for (let idk of chatz) {
                    var cvk = await client.getChatById(idk)
                    if (!cvk.isReadOnly) client.sendFile(idk, base64, 'pict.png', `[ MIDNIGHTBOT Broadcast ]\n\n${msg}`)
                }
                client.reply(from, 'Broadcast success!', id)
            } else if(args.length >= 1) {
                const msg = args.join(" ")
                const chatz = await client.getAllChatIds()
                for (let idk of chatz) {
                    const cvk = await client.getChatById(idk)
                    if (!cvk.isReadOnly) client.sendText(idk, `[ MIDNIGHTBOT Broadcast ]\n\n${msg}`)
                }
                client.reply(from, 'Broadcast success!', id)
            }
            break
		case 'stat': {
            const loadedMsg = await client.getAmountOfLoadedMessages()
            const chatIds = await client.getAllChatIds()
            const groups = await client.getAllGroups()
            const blocked = await client.getBlockedIds()
            const meBruh = await client.getMe()
            const battery = await client.getBatteryLevel()
            const isCharge = await client.getIsPlugged()
            const osName = require('os-name')
            const osname = osName()
            client.sendText(from, `*Computer Status*\n*RAM:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB \/ ${Math.round(require('os').totalmem / 1024 / 1024)}MB\n*CPU:* ${require('os').cpus()[0].model}\n*Operating System:* ${osname} ${require('os').arch}\n*Device Name:* ${require('os').hostname}\n\n*Bot Status*\nStatus :\n- *${loadedMsg}* Loaded Messages\n- *${groups.length}* Group Chats\n- *${chatIds.length - groups.length}* Personal Chats\n- *${chatIds.length}* Total Chats\n- *${ban.length}* Banned User\n- *${blocked.length}* Blocked User\n\n*Phone*\n*Battery:* ${(`${battery}% ${isCharge ? 'Lagi Ngecas' : 'Ga Ngecas'}`)}\n${Object.keys(meBruh.phone).map(key => `*${key} :* ${meBruh.phone[key]}`).join("\n")}`)
            break
        }
        default:
            console.log(color('[ERROR]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'Unregistered Command from', color(pushname))
            break
        }
    } else {
        client.sendSeen(from)
        client.reply(from, 'You get banned, ask owner to unban You!', id)
        if (isBanned && !isBlocked && isGroupMsg) { return console.log('[CLIENT]', color(moment(t * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${pushname} was blocked and trying to use command`), 'in', color(`${name || formattedTitle}`)) }
        if (!isBanned && isBlocked && isGroupMsg) { return console.log('[CLIENT]', color(moment(t * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${pushname} was blocked and trying to use command`)) }
    }
    } catch (err) {
        console.error(err)
    }
}
