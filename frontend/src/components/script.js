import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, limit, orderBy, query, startAfter  } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOJBqKGPBdx6ZokTHJwJ8YIqYZTjE6skQ",
  authDomain: "cyfuse-c906e.firebaseapp.com",
  databaseURL: "https://cyfuse-c906e-default-rtdb.firebaseio.com", // Ensure this URL is correct
  projectId: "cyfuse-c906e",
  storageBucket: "cyfuse-c906e.appspot.com",
  messagingSenderId: "586599557367",
  appId: "1:586599557367:web:d96a63d23f22efe4f30bf2",
  measurementId: "G-RSQVCSEBF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Function to fetch data from a specific collection
export async function fetchDataFromCollection(collectionName) {
  const colRef = collection(db, collectionName);
  try {
    const snapshot = await getDocs(colRef);
    let data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Order by order_id if present
    data = data.sort((a, b) => (a.order_id || 0) - (b.order_id || 0));
    
    // console.log(`All data from ${collectionName}:`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${collectionName}:`, error);
  }
}

export async function fetchPaginatedData(collectionName, limitNumber, lastVisibleDoc) {
  const colRef = collection(db, collectionName);

  // Create paginated query with order
  const q = lastVisibleDoc
    ? query(colRef, orderBy("Time"), startAfter(lastVisibleDoc), limit(limitNumber))
    : query(colRef, orderBy("Time"), limit(limitNumber));

  try {
    const snapshot = await getDocs(q);

    // Map full document data and ID
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    const lastDoc = snapshot.docs[snapshot.docs.length - 1] || null;

    console.log(`Fetched ${data.length} documents from ${collectionName}. Last visible:`, lastDoc?.id || 'None');

    return {
      data,
      lastDoc,
      empty: snapshot.empty,
    };
  } catch (error) {
    console.error(`Error fetching paginated data from ${collectionName}:`, error);
    throw error;
  }
}


// Fetch data from multiple collections
//fetchDataFromCollection("events");
//fetchDataFromCollection("Announcements");
//fetchDataFromCollection("gallery");
//fetchDataFromCollection("projects");
//fetchDataFromCollection("team_details");
