// Import required Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOJBqKGPBdx6ZokTHJwJ8YIqYZTjE6skQ",
  authDomain: "cyfuse-c906e.firebaseapp.com",
  projectId: "cyfuse-c906e",
  storageBucket: "cyfuse-c906e.firebasestorage.app",
  messagingSenderId: "586599557367",
  appId: "1:586599557367:web:d96a63d23f22efe4f30bf2",
  measurementId: "G-RSQVCSEBF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// JSON Data to Upload (example)
const jsonData = [
  { id: 1, title: "title1", description: "Just a text" },
  { id: 2, title: "title2", description: "Just a text"  }
];

// Function to upload JSON data to Firestore
async function uploadJsonToFirestore(collectionName, jsonData) {
  const collectionRef = collection(db, collectionName);

  try {
    for (const item of jsonData) {
      await addDoc(collectionRef, item); // Add each JSON object as a document
      console.log(`Document added with ID: ${item.id}`);
    }
    console.log("All documents successfully uploaded!");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

// Usage
uploadJsonToFirestore("Announcements", jsonData);

