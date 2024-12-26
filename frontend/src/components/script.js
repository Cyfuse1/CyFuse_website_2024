import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBO...",
  authDomain: "cyfuse-c906e.firebaseapp.com",
  projectId: "cyfuse-c906e",
  storageBucket: "cyfuse-c906e.firebasestorage.app",
  messagingSenderId: "586599557367",
  appId: "1:586599557367:web:d96a63d23f22efe4f30bf2",
  measurementId: "G-RSQVCSEBF9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to add data
export const uploadJsonToFirestore = async (collectionName, jsonData) => {
  const collectionRef = collection(db, collectionName);
  try {
    for (const item of jsonData) {
      await addDoc(collectionRef, item);
      console.log(`Document added with ID: ${item.id}`);
    }
    console.log("All documents successfully uploaded!");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// Function to fetch data
export const fetchCollectionData = async (collectionName) => {
  const collectionRef = collection(db, collectionName);
  try {
    const snapshot = await getDocs(collectionRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};
