const ytdl = require('ytdl-core');
const ytsr = require("ytsr")
const { VISITOR_INFO1_LIVE, CONSENT, SID, __Secure_3PSID, HSID, SSID, APISID, SAPISID, __Secure_3PAPISID, LOGIN_INFO, SIDCC, __Secure_3PSIDCC } = require('../handler/message/data/cookie.json')

const COOKIE = `VISITOR_INFO1_LIVE=${VISITOR_INFO1_LIVE}; CONSENT=${CONSENT}; SID=${SID}; __Secure-3PSID=${__Secure_3PSID}; HSID=${HSID}; SSID=${SSID}; APISID=${APISID}; SAPISID=${SAPISID}; __Secure-3PAPISID=${__Secure_3PAPISID}; LOGIN_INFO=${LOGIN_INFO}; SIDCC=${SIDCC}; __Secure-3PSIDCC=${__Secure_3PSIDCC}`

/**
 * 
 * @param {String} args 
 */
const ytplay = (args) => new Promise(async (resolve, reject) => {
    const fil = await ytsr.getFilters(args)
    const fil1 = fil.get("Type").get("Video")
    const fil2 = await ytsr.getFilters(fil1.url)
    const fil3 = fil2.get("Duration").get("Short (< 4 minutes)")
    const { items } = await ytsr(fil3.url, { limit: 3})
    resolve(items[0].url)
});

/**
 * 
 * @param {url} url 
 * @param {type} type 
 */
const ytdldown = (url, type) => new Promise((resolve, reject) => {
    try {
        switch(type) {
            case "mp3":{
                ytdl.getInfo(url, {
                    requestOptions: {
                        headers: {
                            cookie: COOKIE
                        }
                    }
                }).then(async (res) => {
                    const formats = await ytdl.filterFormats(res.formats, 'audioonly')
                    const thumb = res.videoDetails.thumbnails
                    if (res.videoDetails.lengthSeconds >= 500) resolve({ status: 'error', duration: res.videoDetails.lengthSeconds, link: formats[0].url, title: 'Durasi kepanjangan!'})
                    if (res.videoDetails.lengthSeconds < 500) resolve({ status: 'sukses', duration: res.videoDetails.lengthSeconds, link: formats[0].url, thumbnail: thumb[thumb.length - 1].url, title: res.videoDetails.title })
                })
            }
            break
            case "mp4":{
                ytdl.getInfo(url, {
                    requestOptions: {
                        headers: {
                            cookie: COOKIE
                        }
                    }
                }).then(async (res) => {
                    const formats = await ytdl.filterFormats(res.formats, 'audioandvideo')
                    const thumb = res.videoDetails.thumbnails
                    if (res.videoDetails.lengthSeconds >= 500) resolve({ status: 'error', duration: res.videoDetails.lengthSeconds, link: formats[0].url, title: 'Durasi kepanjangan!'})
                    if (res.videoDetails.lengthSeconds < 500) resolve({ status: 'sukses', duration: res.videoDetails.lengthSeconds, link: formats[0].url, thumbnail: thumb[thumb.length - 1].url, title: res.videoDetails.title })
                })
            }
            break
        }
    } catch (e) {
        reject(e)
    }
})

module.exports = {
    ytplay,
    ytdldown
}