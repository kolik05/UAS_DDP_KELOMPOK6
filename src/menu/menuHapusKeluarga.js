const {loadData, deleteData} = require('../database/database')
const readline = require('readline-sync')

function menuHapusKeluarga() {
    console.clear()
    const savedata = loadData()

    if (savedata) {
        if (savedata.length <= 0) {
            console.error("Tidak ada keluarga yang tersimpan!")
            process.exit(0)
        }
        console.log("Nama Keluarga")
        for (let i = 0; i < savedata.length; i++) {
            console.log(`${i + 1}.${savedata[i].nama}`)
        }
        const pilihKeluarga = readline.questionInt(`Silahkan Pilih nama Keluarga yang ingin di hapus [1-${savedata.length}]:`)
        if (pilihKeluarga - 1 > savedata.length) {
            console.log("Nomer yang kamu masukan tidak valid!, silahkan coba lagi")
            setTimeout(() => {
                menuHapusKeluarga()
            }, 3500)
        }
        const lastConfirm = readline.question(`Keluarga ${savedata[pilihKeluarga - 1].nama} akan di hapus!, apakah anda yakin ingin menghapus keluarga ini?[y/n]`)
        if (lastConfirm.toLowerCase() === "y") {
            const code = deleteData(savedata[pilihKeluarga - 1].nama)
            if (code === 0) {
                console.log("Keluarga sudah berhasil di hapus")
                return 0
            } else {
                console.log("Ada masalah ketika ingin menghapus keluarga, mungkin file database nya hilang")
                process.exit(1)
            }
        }
    }
}

module.exports = menuHapusKeluarga