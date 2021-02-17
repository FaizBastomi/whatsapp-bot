<p align="center">
<img height="40px;" src="https://img.shields.io/badge/❤️Maintened-idk-red.svg?style=flat-square"/>
</p>

<h1 align="center">WhatsApp Bot</h1>
<p align="center">This project is the modification version of <a href="https://github.com/YogaSakti/imageToSticker" target="_blank">YogaSakti/imageToSticker</a></p>
<br />
<p align="center">
    <a href="https://twitter.com/FaizBastomi"><img height="30" src="https://github.com/FaizBastomi/faizbastomi/blob/master/twitter.png?raw=true"></a>&nbsp;&nbsp;
    <a href="https://instagram.com/faiz_bastomy"><img height="30" src="https://github.com/FaizBastomi/faizbastomi/blob/master/instagram.png?raw=true"></a>&nbsp;&nbsp;
    <a href="https://facebook.com/faiz.bastomi"><img height="30" src="https://github.com/FaizBastomi/faizbastomi/blob/master/facebook.png?raw=true"></a>
</p>

# Needed
- NodeJS 14x [Download](https://nodejs.org/en/download)
- LibWebP [Download](https://developers.google.com/speed/webp/download)
- imagemagick [Download](https://imagemagick.org/script/download.php) (checklist 1,2,3,5,6)
- ffmpeg [Download](https://ffmpeg.org) and [Tutorial](https://youtu.be/04Gf6TEnmjk)<br />
To get YouTube Cookie [Add to Chrome](http://bit.ly/3pb05kJ) and fill [this](https://github.com/FaizBastomi/whatsapp-bot/blob/master/handler/message/data/cookie.json)<br />
To get YouTube ApiKey [Tutorial](https://www.slickremix.com/docs/get-api-key-for-youtube/)<br />
Change ownerNumber [Here](https://github.com/FaizBastomi/whatsapp-bot/blob/b0c39845020f91202e538d909499d0ee17b02729/handler/message/index.js#L48) (Don't forget use `@c.us`)<br />
Fill all apikey [Here](https://github.com/FaizBastomi/whatsapp-bot/blob/master/config.json)<br />
remove.bg apikey [Here](https://remove.bg) and place [Here](https://github.com/FaizBastomi/whatsapp-bot/blob/306923c021d974bb4a0c2060cd397e89545ff912/handler/message/index.js#L249)

# Get Started
## Install
Clone This Project
```bash
> git clone https://github.com/FaizBastomi/whatsapp-bot.git
> cd whatsapp-bot
```
Install the dependencies:
```bash
> npm install
```
## Usage
1. Run the WhatsApp Bot
```bash
> npm start
```

## Options
Edit options in index.js<br />
### Windows
```js
const options = {
    sessionId: 'bot',
    headless: true,
    qrTimeout: 0,
    authTimeout: 0,
    restartOnCrash: start,
    cacheEnabled: false,
    useChrome: true,
    killProcessOnBrowserClose: true,
    throwErrorOnTosBlock: false,
    chromiumArgs: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--aggressive-cache-discard',
        '--disable-cache',
        '--disable-application-cache',
        '--disable-offline-load-stale-cache',
        '--disk-cache-size=0',
        '--disable-extensions',
        '--disable-gl-extensions',
        '--disable-extensions-https-throttling',
        '--disable-extensions-file-access-check'
    ]
}
```

### Linux
```js
const options = {
    sessionId: 'bot',
    headless: true,
    qrTimeout: 0,
    authTimeout: 0,
    restartOnCrash: start,
    cacheEnabled: false,
    executablePath: "/usr/bin/google-chrome-stable",
    killProcessOnBrowserClose: true,
    throwErrorOnTosBlock: false,
    chromiumArgs: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--aggressive-cache-discard',
        '--disable-cache',
        '--disable-application-cache',
        '--disable-offline-load-stale-cache',
        '--disk-cache-size=0',
        '--disable-extensions',
        '--disable-gl-extensions',
        '--disable-extensions-https-throttling',
        '--disable-extensions-file-access-check'
    ]
}
```

### Notes
- Some Features are broken
- You can add more features
- More refactoring

---

# Credits
## Thanks To
<table>
    <tr>
    <td align="center"><a href="https://github.com/YogaSakti" target="_blank"><img src="https://avatars.githubusercontent.com/u/24309806?v=4" width="100px;" alt=""/></a><br />
<sub><b>YogaSakti</b></sub><br /></td>
    <td align="center"><a href="https://github.com/ItzNgga" target="_blank"><img src="https://avatars.githubusercontent.com/u/29621457?v=4" width="100px;" alt=""/></a><br />
<sub><b>ItzNgga</b></sub><br /></td>
    <td align="center"><a href="https://github.com/TobyG74" target="_blank"><img src="https://avatars.githubusercontent.com/u/32604979?v=4" width="100px;" alt=""/></a><br />
<sub><b>TobyG74</b></sub><br /></td>
    <td align="center"><a href="https://github.com/MhankBarBar" target="_blank"><img src="https://avatars.githubusercontent.com/u/55822959?v=4" width="100px;" alt=""/></a><br />
<sub><b>MhankBarBar</b></sub><br /></td>
    </tr>
</table>
<table>
    <tr>
        <td align="center"><a href="https://github.com/ArugaZ" target="_blank"><img src="https://avatars.githubusercontent.com/u/53950128?v=4" width="100px;" alt=""/></a><br />
<sub><b>ArugaZ</b></sub><br /></td>
        <td align="center"><a href="https://github.com/MFarelS" target="_blank"><img src="https://avatars.githubusercontent.com/u/58540890?v=4" width="100px;" alt=""/></a><br />
<sub><b>MFarelS</b></sub><br /></td>
        <td align="center"><a href="https://github.com/beniismael" target="_blank"><img src="https://avatars.githubusercontent.com/u/74507319?v=4" width="100px;" alt=""/></a><br />
<sub><b>beniismael</b></sub><br /></td>
        <td align="center"><a href="https://github.com/Nurutomo" target="_blank"><img src="https://avatars.githubusercontent.com/u/18616827?v=4" width="100px;" alt=""/></a><br />
<sub><b>Nurutomo</b></sub><br /></td>
    </tr>
</table>
And Others

## Rest API
All Rest API that used in this project.<br />
Don't forget to support them.
- [JoJo API](https://docs-jojo.herokuapp.com)
- [Melodicxt API](https://api-melodicxt-2.herokuapp.com)
- [Zeks API](https://api.zeks.xyz)
- [Tobz API](https://tobz-api.herokuapp.com)
- [Terhambar.com](https://scrap.terhambar.com)
- [CF's API](https://api.computerfreaker.cf)
- [Jikan.moe](https://api.jikan.moe)
- [ArugaZ](https://api.arugaz.my.id/api)

## Main Library
- [wa-automate-nodejs](https://github.com/open-wa/wa-automate-nodejs)
- [puppeteer](https://github.com/puppeteer/puppeteer)
- [sharp](https://github.com/lovell/sharp)
