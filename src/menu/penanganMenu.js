const readline = require('readline-sync')
const menuTambahKeluarga = require('./menuTambahKeluarga')
const menuCariKeluarga = require('./menuCariKeluarga')
const menuHapusKeluarga = require('./menuHapusKeluarga')
const menuKaitkanKeluarga = require('./menuKaitkanKeluarga')
const menuCariSisilahKeluarga = require('./menuCariSisilahKeluarga')
const cekArgument = require('../argument/argument')
function mainmenu() {
    let code
    switch (cekArgument()) {
        case 1:
            menuTambahKeluarga()
            break
        case 2:
            menuCariKeluarga()
            break
        case 3:
            menuHapusKeluarga()
            break
        case 4:
            menuKaitkanKeluarga()
            break
        case 5:
            menuCariSisilahKeluarga()
            break
    }
    console.clear()
    console.log("Program Pencatatan Silsilah Keluarga\n====================================\n1. Tambah Keluarga\n2. Cari Keluarga\n3. Hapus Keluarga\n4. Kaitkan Keluarga\n5. Cari Silsilah\n6. Keluar")
    const choose = readline.questionInt("Silahkan pilih mode yang ingin di gunakan [1-6]:")
    if (choose === 1) {
        code = menuTambahKeluarga()
        if (code) {
            mainmenu()
        }
    } else if (choose === 2) {
        code = menuCariKeluarga()
        if (code === 0) {
            code = null
            mainmenu()
        }
    } else if (choose === 3) {
        code = menuHapusKeluarga()
        if (code === 0) {
            code = null
            mainmenu()
        }
    } else if (choose === 4) {
        code = menuKaitkanKeluarga()
        if (code === 0) {
            code = null
            mainmenu()
        }
    } else if (choose === 5) {
        code = menuCariSisilahKeluarga()
        if (code === 0) {
            code = null
            mainmenu()
        }
    } else if (choose === 6) {
        process.exit(0)
    } else {
        console.error("Menu yang anda masukan tidak terdaftar silahkan coba lagi")
        setTimeout(() => {
            mainmenu()
        }, 2000)
    }
}
module.exports = mainmenu