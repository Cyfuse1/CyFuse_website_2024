import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import firebaseConfig from '../../firebaseConfig.json' assert { type: 'json' };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
// console.log('Firebase initialized'); // Debugging statement
const GetData = async (req, res) => {
    console.log('GetData function called'); // Debugging statement

   
 
    // Process file.buffer here

    // Fetch data from Firestore
    try {
        const collections = ['events', 'Announcements', 'gallery', 'projects', 'team_details'];
        const data = {};

        for (const collectionName of collections) {
            console.log(`Fetching data from ${collectionName}`); // Debugging statement
            const colRef = collection(db, collectionName);
            const snapshot = await getDocs(colRef);
            data[collectionName] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log(`All data from ${collectionName}:`, data[collectionName]);
        }

        // Send the fetched data as the response
        console.log('Fetched data:', data);
        
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data.');
    }
};

// Function to fetch data from a specific collection
export async function fetchDataFromCollection(collectionName) {
    const colRef = collection(db, collectionName);
    try {
        const snapshot = await getDocs(colRef);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(`All data from ${collectionName}:`, data);
    } catch (error) {
        console.error(`Error fetching data from ${collectionName}:`, error);
    }
}
// GetData();

export { GetData };
