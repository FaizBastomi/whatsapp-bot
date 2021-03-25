const { create, Client } = require('@open-wa/wa-automate')
const { color } = require('./utils')
const figlet = require('figlet')
const lolcatjs = require('lolcatjs')
// const msgHandler = require('./handler/message')
const fs = require('fs')
const { welcome } = require('./tools/welcome')

/**
 * Auto Update By Nurutomo
 * Thanks For Nurutomo
 */
require('./handler/message/index.js')
nocache('./handler/message/index.js', module => console.log(`${module} Updated!`))
require('./handler/message/text/id.js')
nocache('./handler/message/text/id.js', module => console.log(`${module} Updated!`))

const start = (client = new Client()) => {
    console.log('<------------------------------------------------------------------------------>\n')
    lolcatjs.fromString(figlet.textSync('MidnightBot', 'Larry 3D'))
    console.log('\n<---------------------------------------------------------------------------->')
    console.log('[DEV]', color('MidnightPerson', 'yellow'))
    console.log('[CLIENT] CLIENT Started!')

    // Force it to keep the current session
    client.onStateChanged((state) => {
        console.log('[Client State]', state)
        if (state === 'CONFLICT' || state === 'DISCONNECTED') client.forceRefocus()
    })

    // listening on message
    client.onMessage((message) => {

        // Cut message Cache if cache more than 3K
        client.getAmountOfLoadedMessages().then((msg) => (msg >= 1000) && client.cutMsgCache())

        // Message Handler (Loaded From Recent Cache)
        require('./handler/message/index.js')(client, message)
    })

    // listen group invitation
    client.onAddedToGroup(({ groupMetadata: { id }, contact: { name } }) => {
        client.sendText(id, `Thanks for inviting me, ${name}! Type /menu to see all command!`, id)
        console.log('[CLIENT] Has been added to Group', color(`${name} => ${id}`, 'white'))
        })

    // listen paricipant event on group (wellcome message)
    client.onGlobalParicipantsChanged(async (event) => {
        await welcome(client, event)
    })

    client.onIncomingCall((callData) => {
         client.contactBlock(callData.peerJid)
    })
}

const options = {
    sessionId: 'bot',
    headless: true,
    qrTimeout: 0,
    authTimeout: 0,
    cachedPatch: true,
    disableSpins: true,
    restartOnCrash: start,
    cacheEnabled: false,
    executablePath: "/usr/bin/google-chrome-stable",
    killProcessOnBrowserClose: true,
    throwErrorOnTosBlock: false,
    stickerServerEndpoint: false,
    chromiumArgs: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--aggressive-cache-discard',
        '--disable-cache',
        '--disable-application-cache',
        '--disable-offline-load-stale-cache',
        '--disk-cache-size=0'
    ]
}

/**
 * Uncache if there is file change
 * @param {Strinng} module Module name or path
 * @param {function} cb cb <optional>
 */
function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'is now being watched for changes')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * 
 * @param {String} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve,reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

create(options)
    .then((client) => start(client))
    .catch((err) => new Error(err))
