const readline = require("readline-sync");
const {saveData} = require("../database/database");

function menuTambahKeluarga() {
    let member
    console.clear()
    const namaKeluarga = readline.question("Masukan nama Keluarga:")
    const jenisKelamin = readline.question("Masukan Jenis Kelamin (l/p):")
    if (jenisKelamin.toLowerCase() === "l" || jenisKelamin.toLowerCase() === "p") {
        member = {
            nama: namaKeluarga,
            jenisKelamin,
            orangtua: [],
            anak: []
        }
    } else {
        console.error("Jenis Kelamin tidak valid!, silahkan pilih antara Laki-Laki (l) atau Perempuan (p)")
        setTimeout(() => {
            menuTambahKeluarga()
        }, 2000)
    }
    //TODO: Save the data
    saveData(member)
    console.log("Data sudah tersimpan")
    const backtoMenu = readline.question("Kembali ke menu awal? [y/N]:")
    if (backtoMenu.toLowerCase() === "y") {
        return true
    } else {
        console.log("OK Terima kasih telah menggunakan program ini")
        process.exit(0)
    }
}
module.exports = menuTambahKeluarga