var firebaseConfig = {
	apiKey: "AIzaSyB2B6yF_9-Yw7WIp5sE3XkGFt8JpdgqYnI",
	authDomain: "snifflock-69202.firebaseapp.com",
	projectId: "snifflock-69202",
	storageBucket: "snifflock-69202.appspot.com",
	messagingSenderId: "440938576850",
	appId: "1:440938576850:web:94a9c8b07c901e83c9260b",
	measurementId: "G-CPQ0QMQFD6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var database = firebase.firestore();

var inputEmail = document.getElementById("email");
var inputPassword = document.getElementById("password");
var feedbackHTML = document.getElementById("feedback");
var authenticationHTML = document.getElementById("authentication");
var appScreenHTML = document.getElementById("app");

var dropdown = document.getElementById('country');
var data = document.getElementById('data');
var conect = document.getElementById('conec');
var disconect = document.getElementById('disconec');
var logoutbutton = document.getElementById('logout');

loadDefaultValues();
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        showAuthentication();
    } else {
        showAuthentication();
        console.log("User isn't signed in.");
    }
});

function logout() {
    firebase.auth().signOut()
        .then(function () {
            feedbackHTML.innerHTML = "Logged out succesfully!";
            buttonLogout.style.display = "none";
            inputEmail.value = "";
            inputPassword.value = "";
            showAuthentication();
        })
        .catch(function (error) {
            feedbackHTML.innerHTML = "Successfully signed out.";
        });
}

function signup() {
    var email = inputEmail.value;
    var password = inputPassword.value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var message = "Welcome " + userCredential.user.email + "!";
            feedbackHTML.innerHTML = message;
            showAppScreen();
        })
        .catch((error) => {
            feedbackHTML.innerHTML = error.message;
            feedbackHTML.classList.add("feedback-error");
        });
}

function login() {
    var email = inputEmail.value;
    var password = inputPassword.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var message = "Welcome " + userCredential.user.email + "!";
            feedbackHTML.innerHTML = "";
            showAppScreen();
        })
        .catch((error) => {
            feedbackHTML.innerHTML = error.message;
            feedbackHTML.classList.add("feedback-error");
        });
}

function showAuthentication() {
    authenticationHTML.style.display = "flex";
    appScreenHTML.style.display = "none";
}

function showAppScreen() {
    authenticationHTML.style.display = "none";
    appScreenHTML.style.display = "flex";
}

function loadDefaultValues() {
    inputEmail.value = "asdasd1@gmail.com";
    inputPassword.value = "asdasd1";
}

// Connect
async function onConnect(){

	var country = dropdown.value;

	// Get info from firebase
	const countries = database.collection('countries ').doc('M6KbdkESghiyeWkzZVoF');
	const doc = await countries.get();
	if (!doc.exists) {
		console.log('No such document!');
	} else {
		data.innerHTML = `
			<h2 id="download" class="data-text">Download speed : ${doc.data()[country].download} MB/s</h2>
			<h2 id="upload" class="data-text">Upload speed : ${doc.data()[country].upload} MB/s</h2>
			<h2 id="ping" class="data-text">Ping : ${doc.data()[country].ping} ms</h2>
			<img src="${doc.data()[country].img}" class="flag"></img>
		`
		dropdown.style.display = "none";
		conect.style.display = "none";
		disconect.style.display = "block";
		data.style.display = "block";
        logoutbutton.style.display = "none";

	}

}

function onDisconect(){
	dropdown.style.display = "block";
	conect.style.display = "block";
	disconect.style.display = "none";
	data.style.display = "none";
    logoutbutton.style.display = "block";

}