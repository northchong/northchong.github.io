var firebaseConfig = {
  apiKey: "AIzaSyBHhyO8lhSFAT4p4ik2YwSytQvWp4y7r8Y",
  authDomain: "codestersbot.firebaseapp.com",
  databaseURL: "https://codestersbot-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "codestersbot",
  storageBucket: "codestersbot.appspot.com",
  messagingSenderId: "444486969817",
  appId: "1:444486969817:web:8f08316d3997191a5891c8",
  measurementId: "G-BM9GX944H9"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.firestore();
var messageInput = document.getElementById("message-input");
var currentChannelId = "messages";

function sendMessage() {
  var message = messageInput.value;
  if (message.trim().length <= 0) {
    return;
  }
  database.collection("messages").doc("n3yMPWM3u5ctKz9fcKHh").set({
    'message': message
  })
  .then(() => {
    console.log("Document successfully written!");
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  })
  .then(() => {
    document.getElementById("message-input").value = "";
  });
}

document.addEventListener("keypress", function (event) {
  var key = event.keyCode || event.which;
  if (event.keyCode == 13) {
    sendMessage();
    document.getElementById("message-input").value = "";
  }
});