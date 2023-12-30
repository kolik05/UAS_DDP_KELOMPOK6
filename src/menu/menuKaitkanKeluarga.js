const readline = require('readline-sync')
const {loadData, saveData} = require('../database/database')

function menuKaitkanKeluarga() {
    console.clear()
    let temp = []
    const saveDatas = loadData()
    if (saveDatas) {
        const clearData = saveDatas.map(({orangtua, anak, ...sisa}) => sisa)
        console.log("Nama Keluarga:")
        console.table(clearData) // PLEASE READ THE OFFICIAL DOCUMENTATION!, DON'T TELL THIS FUNCTION IS NOT EXITS!!!
        const chooseMember = readline.questionInt(`Pilih Keluarga yang ingin di kaitkan [1-${saveDatas.length}](Note:Anggap saja 0 yang ada di table adalah 1):`)
        if (chooseMember > saveDatas.length) {
            console.error("Nomer yang anda pilih tidak sesuai dengan jumlah keluarga yang ada :/")
            return setTimeout(() => {
                menuKaitkanKeluarga()
            }, 2300)
        }
        const target = saveDatas[chooseMember - 1].nama
        for (let i = 0; i < saveDatas.length; i++) {
            if (saveDatas[i].nama !== target) {
                console.log(`${saveDatas[i].nama}`)
                temp.push(saveDatas[i])
            }
        }
        const linkMember = readline.questionInt(`Silahkan Pilih Keluarga yang ingin di kaitkan [1-${temp.length}]:`)
        const memberRole = readline.question(`${target} dengan merupakan [ayah/ibu/anak] dari ${temp[linkMember - 1].nama}?:`)
        if (memberRole.toLowerCase() === "ayah" || memberRole.toLowerCase() === "ibu") {
            const parentData = {
                nama: temp[linkMember - 1].nama,
                role: memberRole,
            }
            saveDatas[chooseMember - 1].orangtua.push(parentData)
            saveData(saveDatas)
            console.log("Keluarga berhasil dikaitkan!")
            const backToMenu = readline.question("Balik ke main Menu [y/N]")
            if (backToMenu.toLowerCase() !== "y") {
                console.log("Ok, Terima kasih telah menggunakan Program ini")
                process.exit(0)
            }
        }
        if (memberRole.toLowerCase() === "anak") {
            const childData = {
                nama: temp[linkMember - 1].nama,
                role: memberRole
            }
            saveDatas[chooseMember - 1].anak.push(childData)
            saveData(saveDatas)
            console.log("Keluarga berhasil dikaitkan!")
            const backToMenu = readline.question("Balik ke main Menu [y/N]")
            if (backToMenu.toLowerCase() !== "y") {
                console.log("Ok, Terima kasih telah menggunakan Program ini")
                process.exit(0)
            } else {
                return 0
            }
        }
        if (memberRole.toLowerCase() !== "ayah" || memberRole.toLowerCase() !== "ibu" || memberRole.toLowerCase() !== "anak") {
            console.log(memberRole.toLowerCase())
            console.error("Invalid Choose!")
            return setTimeout(() => {
                menuKaitkanKeluarga()
            }, 2400)
        }
        return 0
    } else {
        console.error("Data Save tidak ditemukan")
        return setTimeout(() => {
            process.exit(0)
        },2000)
    }
}

module.exports = menuKaitkanKeluarga