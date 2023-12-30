function cekArgument() {
    if (process.argv.length > 2) {
        if (process.argv[2].toLowerCase() === "tambah_kelurga") {
            return 1
        } else if (process.argv[2].toLowerCase() === "cari_keluarga") {
            return 2
        } else if (process.argv[2].toLowerCase() === "hapus_keluarga") {
            return 3
        } else if (process.argv[2].toLowerCase() === "kaitkan_keluarga") {
            return 4
        } else if (process.argv[2].toLowerCase() === "cari_sisilah") {
            return 5
        } else {
            console.error("Masukan tidak valid!, argument yang tersedia adalah 'tambah_keluarga','hapus_keluarga','kaitkan_keluarga','cari_sisilah'")
            process.exit(1)
        }
    } else {
        return 0
    }
}
module.exports = cekArgument