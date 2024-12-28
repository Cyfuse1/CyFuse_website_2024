// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOJBqKGPBdx6ZokTHJwJ8YIqYZTjE6skQ",
  authDomain: "cyfuse-c906e.firebaseapp.com",
  projectId: "cyfuse-c906e",
  storageBucket: "cyfuse-c906e.appspot.com",
  messagingSenderId: "586599557367",
  appId: "1:586599557367:web:d96a63d23f22efe4f30bf2",
  measurementId: "G-RSQVCSEBF9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to handle Google authentication
export function authenticate(action) {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Signed in as:", user.displayName);

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to the next page with the action
      window.location.href = `nextpage.html?action=${action}`;
    })
    .catch((error) => {
      console.error("Error signing in: ", error.message);
    });
}

// Function to perform Firestore actions
export async function performAction(action) {
  const user = JSON.parse(localStorage.getItem("user"));
  const collectionName = "Announcements";
  const collectionRef = collection(db, collectionName);

  try {
    if (action === "create" && user) {
      const newDoc = { title: "New Record", description: "This is a new record." };
      await addDoc(collectionRef, newDoc);
      alert("Record created successfully!");
    } else if (action === "update" && user) {
      const docRef = doc(db, collectionName, "3Wav0ZR9Kzf7FuaWCl8v"); // Replace with an actual document ID
      await updateDoc(docRef, { title: "Updated Record" });
      alert("Record updated successfully!");
    } else if (action === "delete" && user) {
      const docRef = doc(db, collectionName, "3Wav0ZR9Kzf7FuaWCl8v"); // Replace with an actual document ID
      await deleteDoc(docRef);
      alert("Record deleted successfully!");
    } else if (action === "fetch") {
      const querySnapshot = await getDocs(collectionRef);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
      alert("Fetched records. Check the console.");
    } else {
      alert("Action not allowed or user not authenticated.");
    }
  } catch (error) {
    console.error("Error performing action: ", error);
  }
}

// Function to fetch collection data
export async function fetchCollectionData(collectionName) {
  try {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    console.error(`Error fetching collection ${collectionName}:`, error);
    throw error;
  }
}

