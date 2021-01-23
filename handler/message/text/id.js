exports.textInfo = () => {
    return `<======(THANKS TO)======>
YogaSakti
MhankBarBar
SomnathDas
ArugaZ
Jojo
Alvin
Rafi
ItsNgga
Terror-Machine
Dan masih banyak lagi
<=========(END)=========>`
}

exports.textDonasi = () => {
    return `Trakteer: https://trakteer.id/faiz-bastomy
Saweria: https://saweria.co/faizbastomy
DANA: 085382618855
OVO: 085382618855`
}

exports.textMenu = (pushname, prefix) => {
    return `Hi, *${pushname}!👋*

*Penting‼*
Harap periksa terlebih dahulu *${prefix}changelog*
agar tahu perubahan pada bot‼

_*${prefix}owner*_ = Nomor Pembuat Bot
_*${prefix}stat*_ = Statistik Bot
_*${prefix}donasi*_ = Donasi Ke Pembuat
_*${prefix}info*_ = Menampilkan Info Bot
_*${prefix}listban*_ = Menampilkan List Banned
_*${prefix}listblock*_ = Menampilkan List Blocked
_*${prefix}bug*_ = Laporkan Bug Pada Bot
    Contoh; ${prefix}bug ${prefix}jam tidak berfungsi

_*${prefix}menu sticker*_ = Sticker Menu
_*${prefix}menu text*_ = TextPro Menu
_*${prefix}menu wibu*_ = Wibu Area Menu
_*${prefix}menu download*_ = Downloader Menu
_*${prefix}menu grup*_ = Group Menu
_*${prefix}menu fun*_ = Fun Menu

_*Owner Bot*_
    
_*${prefix}bc*_ = Broadcast Pesan
    
_*${prefix}leaveall*_ = Mengeluarkan Bot Dari Semua Grup
    
_*${prefix}ban*_ = Blokir Pengguna Dari Memakai Bot

_*${prefix}setinfo*_ = Ganti Info Bot
    
⚠️ Gunakan bot dengan bijak‼️
⚠️ Bot tidak aktif 24 Jam‼️
⚠️ Bot memiliki fitur anti spam mohon beri delay 5 detik‼️
⚠️ Jika ada fitur tidak bekerja mohon lapor dengan *${prefix}bug*‼️
    
⚠️ *Note: fitur yang dicoret dengan garis, berarti tidak berfungsi*`
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

~_*${prefix}tik*_ = TikTok Downloader~
    ~Contoh; ${prefix}tik <link_tiktok>~

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

_*${prefix}cnnindo*_ = Ambil Data Berita Terkini Dari CNN Kanal Indonesia

_*${prefix}cnnworld*_ = Ambil Data Berita Terkini Dari CNN Kanal Dunia

_*${prefix}cnndetail*_ = Ambil Isi Body Dari Link Berita CNN Yang Anda Berikan

_*${prefix}randomquotes*_ = Random Quotes

_*${prefix}meme*_ = Get Random Meme From Subreddit

_*${prefix}getses*_ = Ambil SS dari Sesi Saat Ini

~_*${prefix}pakboi*_ = Ambil Pantun Random Pakboi~

_*${prefix}sadboi*_ = Ambil Random Quotes Sadboi

_*${prefix}cat*_ = Mengirim Gambar Random Anak Kucing
    
_*${prefix}memeimg*_ = Membuat Meme Dari Gambar Yang Di Kirim
    Contoh; ${prefix}meme [teks atas|teks bawah]
    
_*${prefix}gempa*_ = Informasi Gempa
    
_*${prefix}github*_ = Cek Informasi Tentang User atau Repositories GitHub
    Contoh; ${prefix}github FaizBastomi

_*${prefix}math*_ = Menyelesaikan soal matematika yang diberikan

_*${prefix}googleimg*_ = Mencari Gambar Dari Google

_*${prefix}heroml*_ = Cek Detail Info Hero ML

_*${prefix}tahta*_ = Harta Tahta`
}

exports.Wibu = (prefix) => {
    return `_*Wibu Area Menu:*_

_*${prefix}aniquote*_ = Random Quote From Anime

_*${prefix}waifu*_ = Random Waifu

~_*${prefix}husbu*_ = Random Husbu~
    
_*${prefix}hentai*_ = Random Hentai
        
_*${prefix}nsfwneko*_ = Random NSFW Neko
        
_*${prefix}randomanime*_ = Random Anime Image

_*${prefix}neko*_ = Random Neko

~_*${prefix}loli*_ = Random Loli~

_*${prefix}neko2*_ = Random Neko2

_*${prefix}anime*_ = Cari Anime Berdasarkan Query

_*${prefix}chara*_ = Mencari Chara Berdasarkan Query

_*${prefix}manga*_ = Mencari Informasi Manga Berdasarkan Query`
}

exports.TextPro = (prefix) => {
    return `_*TextPro Menu:*_
    
_*${prefix}pornhub*_ = Bikin Text Pornhub

_*${prefix}blackpink*_ = Bikin Text Blackpink

_*${prefix}glitch*_ = Bikin Text Glitch

_*${prefix}neonlight*_ = Bikin Text Neon

_*${prefix}neontext*_ = Bikin Text Neon

_*${prefix}thunder*_ = Bikin Text Thunder

~_*${prefix}future*_ = Bikin Logo Futuristik~

_*${prefix}3dtext*_ = Bikin 3D Text

~_*${prefix}wolf*_ = Bikin Logo Serigala~

_*${prefix}marvel*_ = Bikin Text Marvel

_*${prefix}sky*_ = Bikin Text Awan

_*${prefix}glow*_ = Bikin Advanced Glow Text

_*${prefix}ballon*_ = Bikin Text Foil Ballon

_*${prefix}matrix*_ = Bikin Text Matrix

_*${prefix}sand*_ = Bikin Text di Pasir

_*${prefix}sand1*_ = Bikin Text di Pasir

_*${prefix}glue3d*_ = Bikin Text 3D Glue

_*${prefix}luxury*_ = Bikin Text Luxury

~_*${prefix}quotemk*_ = Bikin Quotes~
    ~Contoh; ${prefix}quotemk [quotes|author|theme]~
        
~_*${prefix}pantai*_ = Tulis Pantai~
    ~Contoh; ${prefix}pantai [quotes]~

_*${prefix}nulis*_ = Nulis dibuku
    Contoh; ${prefix}nulis hai

_*${prefix}nulis2*_ = Nulis dibuku2
    Contoh; ${prefix}nulis hai`
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