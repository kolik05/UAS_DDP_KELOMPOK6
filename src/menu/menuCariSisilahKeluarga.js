const readline = require('readline-sync')
const {loadData} = require('../database/database')
const {ortu,kakekbuyud,nenekbuyud} = require('../logika_broken/keluarga')

function menuCariSisilahKeluarga() {
    const savedatas = loadData()
    console.clear()
    for (let i = 0; i < savedatas.length; i++) {
        console.log(`${i+1}.${savedatas[i].nama}`)
    }
    const chooseMember = readline.questionInt(`Silahkan pilih keluarga yang ingin dicari sisilahnya:[1-${savedatas.length}]`)
    if (chooseMember > savedatas.length) {
        console.error("Nomer yang kamu pilih tidak sesuai dengan data yang ada")
        setTimeout(() => {
            menuCariSisilahKeluarga()
        }, 2000)
    }
    const chooseData = savedatas[chooseMember - 1]
    const ayah = ortu(chooseData,"ayah")
    const ibu = ortu(chooseData,"ibu")
    const nenek = ortu(chooseData, "ibu") ? ortu({ orangtua: [{ nama: `${chooseData.orangtua[0].nama}` }] }, "ibu") : null;
    const kakek = ortu(chooseData,"ayah")
    const kakekBuyut = kakekbuyud(chooseData)
    const nenekBuyut = nenekbuyud(chooseData)

    console.log("Ayah:", ayah);
    console.log("Ibu:", ibu);
    console.log("Nenek:", nenek);
    console.log("Kakek:", kakek);
    console.log("Nenek Buyut:", nenekBuyut);
    console.log("Kakek Buyut:", kakekBuyut);

    const backToMenu = readline.question("kembali ke menu utama [y/N]:")
    if (backToMenu.toLowerCase() === "y") {
        return 0
    } else {
        console.log("OK, Terima Kasih telah menggunakan Aplikasi kami")
        process.exit(0)
    }
}
module.exports = menuCariSisilahKeluarga