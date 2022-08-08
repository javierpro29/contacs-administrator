const firebaseConfig = {
    apiKey: "AIzaSyBA_7B8ZucpcaPAIoXEu75qeitAd3ioBkI",
    authDomain: "contacts-3d053.firebaseapp.com",
    databaseURL: "https://contacts-3d053-default-rtdb.firebaseio.com",
    projectId: "contacts-3d053",
    storageBucket: "contacts-3d053.appspot.com",
    messagingSenderId: "322088787030",
    appId: "1:322088787030:web:90f0475ff5f1c2c972aff7"
  };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database().ref("contacts");

export{auth};
export{db};