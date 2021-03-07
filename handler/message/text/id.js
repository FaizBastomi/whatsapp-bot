exports.textInfo = () => {
    return `
Source code / bot ini merupakan program open-source (gratis) yang ditulis menggunakan Javascript, kamu dapat menggunakan, menyalin, memodifikasi, menggabungkan, menerbitkan, mendistribusikan, mensublisensikan, dan atau menjual salinan dengan tanpa menghapus author utama dari source code / bot ini.
Dengan menggunakan source code / bot ini maka anda setuju dengan Syarat dan Kondisi sebagai berikut:
- Source code / bot tidak menyimpan data anda di server kami.
- Source code / bot tidak bertanggung jawab atas sticker yang anda buat dari bot ini serta video, gambar maupun data lainnya yang anda dapatkan dari Source code / bot ini.
 - Source code / bot tidak boleh digunakan untuk layanan yang bertujuan/berkontribusi dalam: 
    • seks / perdagangan manusia
    • perjudian
    • perilaku adiktif yang merugikan 
    • kejahatan
    • kekerasan (kecuali jika diperlukan untuk melindungi keselamatan publik)
    • pembakaran hutan / penggundulan hutan
    • ujaran kebencian atau diskriminasi berdasarkan usia, jenis kelamin, identitas gender, ras, seksualitas, agama, kebangsaan
Source Code BOT : https://github.com/FaizBastomi/whatsapp-bot
NodeJS WhatsApp library: https://github.com/open-wa/wa-automate-nodejs`
}

exports.textDonasi = () => {
    return `Trakteer: https://trakteer.id/faiz-bastomy
Saweria: https://saweria.co/faizbastomy`
}

exports.textMenu = (pushname, prefix) => {
    return `Hi, *${pushname}!👋*

_*${prefix}owner*_ = Nomor Pembuat Bot
_*${prefix}stat*_ = Statistik Bot
_*${prefix}donasi*_ = Donasi Ke Pembuat
_*${prefix}info*_ = Menampilkan Info Bot
_*${prefix}listban*_ = Menampilkan List Banned
_*${prefix}listblock*_ = Menampilkan List Blocked
_*${prefix}bug*_ = Laporkan Bug Pada Bot

_*${prefix}menu sticker*_ = Sticker Menu
_*${prefix}menu text*_ = TextPro Menu
_*${prefix}menu wibu*_ = Wibu Area Menu
_*${prefix}menu download*_ = Downloader Menu
_*${prefix}menu grup*_ = Group Menu
_*${prefix}menu fun*_ = Fun Menu

_*Owner Bot*_
    
_*${prefix}bc*_ = Broadcast Pesan
    
_*${prefix}leaveall*_ = Mengeluarkan Bot Dari Semua Grup

_*${prefix}clearall*_ = Hapus Semua Chat

_*${prefix}readall*_ = Baca Semua Pesan
    
_*${prefix}ban*_ = Blokir Pengguna Dari Memakai Bot

_*${prefix}setinfo*_ = Ganti Info Bot`
}

exports.Sticker = (prefix) => {
    return `_*Sticker Menu:*_

_*${prefix}sticker*_ = Membuat Sticker Dari Gambar atau Link Yang Diberikan(Pastikan Mengandung Gambar)
    Function;   1. nocrop, how to use: ${prefix}sticker nocrop

_*${prefix}memesticker*_ = Membuat Meme Sticker Dari Gambar Yang Diberikan

_*${prefix}sgif*_ = Buat Sticker Gif dengan Mengirim Video atau GIF (MAX 5DETIK)

_*${prefix}stickergiphy*_ = Membuat Sticker Dari Link Giphy Yang Diberikan

_*${prefix}snobg*_ = Sticker No Background

_*${prefix}toimage*_ = Menconvert Sticker Menjadi Gambar

_*${prefix}takestik*_ = Curi Sticker Orang`
}

exports.Group = (prefix) => {
    return `_*Group Menu:*_
    
_*${prefix}add*_ = Menambahkan Seseorang Kedalam Grup
    Contoh; ${prefix}add 628xxxxxx

_*${prefix}kick*_ = Mengeluarkan Member Dari Grup
    Contoh; ${prefix}kick @mentionUser

_*${prefix}glink*_ = Mengambil Link Grup

_*${prefix}gcreator*_ = Mengirim Nomor Pembuat Grup dalam bentuk VCard

_*${prefix}tagall*_ = Mention Semua Member

_*${prefix}kickAll*_ = Kick Semua Member(hanya pembuat grup)

_*${prefix}promote*_ = Jadikan Member Menjadi Admin Grup

_*${prefix}demote*_ = Turunkan Jabatan Admin

_*${prefix}profile*_ = Mengambil Informasi Kamu atau Yang Kamu Tag dan Reply Pesan

_*${prefix}grupinfo*_ = Mengambil Informasi Grup

_*${prefix}leave*_ = Mengeluarkan Bot Dari Grup

_*${prefix}welcome*_ = Mengaktifkan Fitur Sambutan
    Contoh; ${prefix}welcome on

_*${prefix}switch*_ = Buka atau Tutup Grup
    Contoh; ${prefix}switch on`
}

exports.Downloader = (prefix) => {
    return `_*Downloader Menu:*_
    
_*${prefix}ig*_ = Mengunduh Video atau Gambar Dari Instagram

_*${prefix}twt*_ = Mengunduh Video atau Gambar Dari Twitter

_*${prefix}ytmp3*_ = Mengunduh Audio Dari Link YouTube Yang Diberikan

_*${prefix}ytmp4*_ = Mengunduh Video Dari Link YouTube Yang Diberikan

_*${prefix}pins*_ = Mengunduh Gambar Dari Pinterest

_*${prefix}ytsch*_ = Mencari Video YouTube Berdasarkan Query

_*${prefix}nhder*_ = Nhentai Downloader
    Contoh; ${prefix}nhder 150306`
}

exports.Other = (prefix) => {
    return `_*Other Menu:*_

_*${prefix}join*_ = Join Grup Menggunakan Link Grup

_*${prefix}translate*_ = Terjemahkan Bahasa Asing
    
_*${prefix}play*_ = Putar Lagu Dari Youtube
        
_*${prefix}wiki*_ = Wikipedia

_*${prefix}tts*_ = Text to Speech Google Translate
    Contoh; ${prefix}tts id halo

_*${prefix}meme*_ = Get Random Meme From Subreddit

_*${prefix}getses*_ = Ambil SS dari Sesi Saat Ini

_*${prefix}sadboi*_ = Ambil Random Quotes Sadboi

_*${prefix}cat*_ = Mengirim Gambar Random Anak Kucing
    
_*${prefix}memeimg*_ = Membuat Meme Dari Gambar Yang Di Kirim
    Contoh; ${prefix}meme [teks atas|teks bawah]
    
_*${prefix}gempa*_ = Informasi Gempa
    
_*${prefix}github*_ = Cek Informasi Tentang User atau Repositories GitHub
    Contoh; ${prefix}github FaizBastomi

_*${prefix}math*_ = Menyelesaikan soal matematika yang diberikan

_*${prefix}googleimg*_ = Mencari Gambar Dari Google`
}

exports.Wibu = (prefix) => {
    return `_*Wibu Area Menu:*_
    
_*${prefix}hentai*_ = Random Hentai
        
_*${prefix}nsfwneko*_ = Random NSFW Neko
        
_*${prefix}randomanime*_ = Random Anime Image

_*${prefix}neko*_ = Random Neko

_*${prefix}anime*_ = Cari Anime Berdasarkan Query

_*${prefix}chara*_ = Mencari Chara Berdasarkan Query

_*${prefix}manga*_ = Mencari Informasi Manga Berdasarkan Query`
}

exports.funMenu = (prefix) => {
    return `_*Fun Menu:*_

_*${prefix}mono*_ = Bot kirim pesan dalam mode monospace

_*${prefix}bpk*_ = B4p4ck f0nt

_*${prefix}motivasi*_ = Random Motivasi

_*${prefix}rate*_ = Rating

_*${prefix}apakah*_ = Apakah

_*${prefix}koin*_ = Koin Flip

_*${prefix}dadu*_ = Dice Roll

_*${prefix}truth*_ = Truth

_*${prefix}dare*_ = Dare`
}
