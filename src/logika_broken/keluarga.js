
function cariOrangTua(data, peran) {
    const orangtua = data.orangtua.find(ortu => ortu.role === peran)
    return orangtua ? orangtua.nama : null;
}

function cariNenekBuyud(data) {
    const nenek = cariOrangTua(data,"ibu")
    return nenek ? cariOrangTua({ orangtua: [{ nama: nenek }] }, "ibu") : null;
}
function cariKakekBuyud(data) {
    const nenek = cariNenekBuyud(data);
    return nenek ? cariOrangTua({ orangtua: [{ nama: nenek }] }, "ayah") : null;
}

module.exports.ortu = cariOrangTua
module.exports.nenekbuyud = cariNenekBuyud
module.exports.kakekbuyud = cariKakekBuyud