import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getFirestore, collection, getDocs, addDoc } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAI1Sbt9Gcp1Z3Trtsj6cD4TDMBPI5oUcs",
  authDomain: "cshelp-a57e9.firebaseapp.com",
  projectId: "cshelp-a57e9",
  storageBucket: "cshelp-a57e9.appspot.com",
  messagingSenderId: "346632228186",
  appId: "1:346632228186:web:955db68a4aea20493e7763",
  measurementId: "G-Q3YJ3C0B5P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Use getFirestore to get Firestore instance

// Listen for the form submission
if(document.URL.includes("index")){
document.addEventListener("DOMContentLoaded", submitFeedBack());
window.addEventListener('load', getNotifications);
}

else if(document.URL.includes("admin")) document.addEventListener("DOMContentLoaded",addNotification());

function submitFeedBack(){
  const feedbackForm = document.getElementById("feedback-form");

  feedbackForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting normally

    // Get the user's name and feedback message from the form
    const userName = document.getElementById("name").value;
    const feedbackMessage = document.getElementById("feedback").value;

    // Initialize Firestore and reference to the "Feedback" collection
    const db = getFirestore(app); // Make sure 'app' is correctly initialized

    const feedbackCollection = collection(db, "Feedback");


    // Add a new document to the "Feedback" collection
    addDoc(feedbackCollection, {
      Id: "Temp",
      UserName: userName,
      Feedback: feedbackMessage
    })
      .then(() => {
        // Feedback successfully added to Firestore
        //console.log("Feedback submitted successfully!");
        // You can add further actions here, like displaying a success message to the user
        alert("Feedback submitted successfully!");
        document.getElementById("feedback").value = "";
      })
      .catch((error) => {
        //console.error("Error adding feedback: ", error);
        // Handle any errors that occur during the submission
        alert("Error adding feedback!");

      });
  });
}


//////////////// following code helps to add new notifications in the firebase data base
///////////////////////////////////////////////////////////////////////////////////////

function addNotification(){

  const notificationForm = document.getElementById("add-notification-form");

  notificationForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting normally

    // Get the user's name and feedback message from the form
    var notificationTitle = document.getElementById("notification-title");
    var notificationDetails = document.getElementById("notification-details");
    var notificationLink= document.getElementById("notification-link");

    // Initialize Firestore and reference to the "Feedback" collection
    const db = getFirestore(app); // Make sure 'app' is correctly initialized

    const notificationCollection = collection(db, "Notification");


    // Add a new document to the "Notification" collection
    addDoc(notificationCollection, {
      Id: "Temp",
      Title:notificationTitle.value,
      Message:notificationDetails.value,
      link:notificationLink.value
    })
      .then(() => {
        // Notification successfully added to Firestore
        // You can add further actions here, like displaying a success message to the user
        alert("Notification submitted successfully!");
        notificationTitle.value="";
        notificationDetails.value="";
        notificationLink.value="";
      })
      .catch((error) => {
        console.error("Error adding feedback: ", error);
        alert("Error adding notification!");

      });
  });

}






// code for handlind ans showing all notifications from firebase 
function getNotifications() {

  // Reference to the Firestore "Notification" collection
  const notificationsRef = collection(db, "Notification");

  // Fetch data from Firestore and populate the table
  getDocs(notificationsRef).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const title = doc.data().Title;
      const message = doc.data().Message;
      const link = doc.data().link;

  
      // Access the table element in the parent window (index.html)
      const table = document.getElementById("notification-table");

      const row = table.insertRow();

      // Create cells for Title and Message
      const titleCell = row.insertCell(0);
      const messageCell = row.insertCell(1);

      titleCell.textContent = title;
      messageCell.textContent = message;

      // Add a link to the row (if link exists)
      if (link) {
        row.style.cursor = "pointer";
        row.addEventListener("click", () => {
          // window.location.href = link;
          window.open(link,'_blank');
        });
      }
    });
  });
}

