const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyCgY1fUJSdwThRMoQ7ADnjIoUyVUbYK50k",
  authDomain: "profound-ripsaw-367620.firebaseapp.com",
  projectId: "profound-ripsaw-367620",
  storageBucket: "profound-ripsaw-367620.appspot.com",
  messagingSenderId: "102438761045",
  appId: "1:102438761045:web:a447b80d8380184a91dadc",
  measurementId: "G-LXHFSV5P44"
  };

  const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
module.exports = getStorage(firebaseApp);