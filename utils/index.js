/* eslint-disable no-return-assign */
const chalk = require('chalk')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')

// Color
const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const processTime = (timestamp, now) => {
    return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

// is Url?
const Url = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

const Giphy = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?giphy.com/, 'gi'))
}

const MediaGiphy = (url) => {
    return url.match(new RegExp(/https?:\/\/media.giphy.com\/media/, 'gi'))
}

// Message Filter / Message Cooldowns
const usedCommandRecently = new Set()

const isFiltered = (from) => {
    return !!usedCommandRecently.has(from)
}

const addFilter = (from) => {
    usedCommandRecently.add(from)
    setTimeout(() => {
        return usedCommandRecently.delete(from)
    }, 5000) // 5sec is delay before processing next command
}

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const hilih = (text) => {   // by LoL-Human & HRTZ
    const R = new RegExp('[AIUEOaiueo]', 'g')
    text = text.replace(R, 'i')
    return text
}

const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 1000)}.${ext}`
}

module.exports = {
    msgFilter: {
        isFiltered,
        addFilter
    },
    processTime,
    is: {
        Url,
        Giphy,
        MediaGiphy
    },
    color,
    sleep,
    hilih,
    getRandom
}
