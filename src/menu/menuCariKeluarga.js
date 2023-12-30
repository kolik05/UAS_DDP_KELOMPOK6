const readline = require('readline-sync')
const {loadData} = require('../database/database')

function menuCariKeluarga() {
    console.clear()
    const namaKeluarga = readline.question("Masukan Nama Keluarga:")
    const saveData = loadData()
    if (saveData) {
        const keluargaFilter = saveData.filter(keluarga => keluarga.nama.toLowerCase() === namaKeluarga.toLowerCase())
        if (keluargaFilter.length === 0) {
            console.error("Keluarga tidak ditemukan")
            const backToMenu = readline.question("Kembali ke menu awal?[y/N]:")
            if (backToMenu.toLowerCase() === "y") {
                return 0
            } else {
                console.log("OK Terima kasih telah menggunakan program ini")
                process.exit(0)
            }
        }
        console.log("Keluarga ditemukan")
        keluargaFilter.forEach(member => {
            console.table({namaKeluarga: member.nama, jenisKelamin: member.jenisKelamin})
        })
        const backToMenu = readline.question("Kembali ke menu awal?[y/N]:")
        if (backToMenu.toLowerCase() === "y") {
            return 0
        } else {
            console.log("OK Terima kasih telah menggunakan program ini")
            process.exit(0)
        }
    } else {
        console.error("Database tidak ditemukan!, silahkan gunakan menu no 1 untuk membuat database")
        const backToMenu = readline.question("Kembali ke menu awal?[y/N]:")
        if (backToMenu.toLowerCase() === "y") {
            return 0
        }
    }
}

module.exports = menuCariKeluarga