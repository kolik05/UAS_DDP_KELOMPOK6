const fs = require('fs');
const readlineSync = require('readline-sync');

let familyData = [];

function loadFamilyData() {
    try {
        const data = fs.readFileSync('family_data.json', 'utf8');
        familyData = JSON.parse(data);
    } catch (error) {
        console.log('File not found or error reading file. Starting with an empty family tree.');
    }
}

function saveFamilyData() {
    fs.writeFileSync('family_data.json', JSON.stringify(familyData, null, 2), 'utf8');
}

function displayMainMenu() {
    console.log(`
Program Pencatatan Silsilah Keluarga
====================================
1. Tambah Keluarga
2. Cari Keluarga
3. Hapus Keluarga
4. Kaitkan Keluarga
5. Cari Silsilah
6. Keluar
`);
}

function addFamilyMember() {
    console.log('Pilih Menu [1-6]: 1');
    const name = readlineSync.question('Nama Keluarga: ');
    const gender = readlineSync.question('Jenis Kelamin (l/p): ').toLowerCase();

    const member = {
        name,
        gender,
        children: [],
    };

    familyData.push(member);
    saveFamilyData();
    console.log('Keluarga berhasil ditambahkan!');
}

function findFamilyMember() {
    console.log('Pilih Menu [1-6]: 2');
    const searchName = readlineSync.question('Masukan nama keluarga: ');

    const foundMembers = familyData.filter(member => member.name.toLowerCase() === searchName.toLowerCase());

    if (foundMembers.length > 0) {
        console.log('Keluarga ditemukan!');
        foundMembers.forEach(member => {
            console.log(`Nama Keluarga: ${member.name}\nJenis Kelamin: ${member.gender}`);
        });
    } else {
        console.log('Keluarga tidak ditemukan.');
    }
}

function deleteFamilyMember() {
    console.log('Pilih Menu [1-6]: 3');
    displayFamilyMembers();
    const choice = readlineSync.question('Pilih Keluarga yang akan dihapus [1-' + familyData.length + ']: ');
    const index = parseInt(choice) - 1;

    if (index >= 0 && index < familyData.length) {
        const deletedFamily = familyData.splice(index, 1)[0];
        saveFamilyData();
        console.log(`Keluarga ${deletedFamily.name} berhasil dihapus!`);
    } else {
        console.log('Pilihan tidak valid.');
    }
}

function linkFamilyMembers() {
    console.log('Pilih Menu [1-6]: 4');
    displayFamilyMembers();

    const parentIndex = readlineSync.question('Pilih Keluarga yang akan dikaitkan [1-' + familyData.length + ']: ');
    const childIndex = readlineSync.question('Pilih Keluarga yang akan dikaitkan sebagai [anak] [1-' + familyData.length + ']: ');

    const parent = familyData[parentIndex - 1];
    const child = familyData[childIndex - 1];

    const relationship = readlineSync.question(`Keluarga ${parent.name} dengan merupakan [ayah/ibu/anak] dari ${child.name}: `);

    if (relationship === 'ayah' || relationship === 'ibu' || relationship === 'anak') {
        if (relationship === 'anak') {
            child.children.push(parent);
        } else {
            parent.children.push(child);
        }
        saveFamilyData();
        console.log('Keluarga berhasil dikaitkan!');
    } else {
        console.log('Hubungan tidak valid. Harap masukkan "ayah", "ibu", atau "anak".');
    }
}

function searchFamilyTree() {
    console.log('Pilih Menu [1-6]: 5');
    displayFamilyMembers();

    const searchIndex = readlineSync.question('Pilih Keluarga yang akan dicari silsilahnya [1-' + familyData.length + ']: ');
    const searchMember = familyData[searchIndex - 1];

    displayAncestors(searchMember);
    displayDescendants(searchMember);
}

function displayFamilyMembers() {
    familyData.forEach((member, index) => {
        console.log(`${index + 1}. ${member.name}`);
    });
}

function displayAncestors(member, depth = 1) {
    if (depth > 3) {
        return;
    }

    console.log(`Data leluhur dari ${member.name} adalah:`);
    displayParent(member, depth);
    displayAncestors(member, depth + 1);
}

function displayParent(member, depth) {
    const parent = member.children.length > 0 ? member.children[0] : null;

    if (parent) {
        console.log(`${getSpaces(depth)}${getParentLabel(depth)}: ${parent.name}`);
        displayParent(parent, depth + 1);
    }
}

function displayDescendants(member, depth = 1) {
    if (depth > 3) {
        return;
    }

    console.log(`Data keturunan dari ${member.name} adalah:`);
    member.children.forEach(child => {
        console.log(`${getSpaces(depth)}Anak: ${child.name}`);
        displayDescendants(child, depth + 1);
    });
}

function getSpaces(depth) {
    return ' '.repeat(depth * 2);
}

function getParentLabel(depth) {
    const labels = ['Ibu', 'Ayah', 'Kakek', 'Nenek'];
    return labels[depth - 1];
}

function mainMenu() {
    loadFamilyData();

    while (true) {
        displayMainMenu();
        const choice = readlineSync.question('Pilih Menu [1-6]: ');

        switch (choice) {
            case '1':
                addFamilyMember();
                break;
            case '2':
                findFamilyMember();
                break;
            case '3':
                deleteFamilyMember();
                break;
            case '4':
                linkFamilyMembers();
                break;
            case '5':
                searchFamilyTree();
                break;
            case '6':
                console.log('Keluar.');
                process.exit();
            default:
                console.log('Pilihan tidak valid. Harap masukkan angka 1-6.');
        }
    }
}

mainMenu();
