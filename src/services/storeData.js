const { Firestore } = require('@google-cloud/firestore');

//initialize firestore db
const db = new Firestore({
    projectId: 'process.env.PROJECT_ID',
    keyFilename: 'process.env.KEY_FILE_NAME',
});

//store data prediction
async function storeData(id, data) {
    const predictCollection = db.collection('prediction');
    return predictCollection.doc(id).set(data);
}

//retrieve history prediction data
async function fetchAllData() {
    const predictCollection = db.collection('prediction');
    const snapshot = await predictCollection.get();
    if (snapshot.empty) {
        console.log('No matching documents.');
        return [];
    }

    let data = [];
    snapshot.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

module.exports = {storeData, fetchAllData};