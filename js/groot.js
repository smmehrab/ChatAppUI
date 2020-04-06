// For Tabs
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}


// For Side Nav Toggle
var menuBtns = document.querySelectorAll('#menuBtn');
for (var i = 0; i < menuBtns.length; i++) {
    menuBtns[i].addEventListener('click', function (e) {
        // chatWindow.classList.add('slideOut');
        chatWindow.classList.add('hide');
        menu.classList.add('show');
        // menu.classList.add('slideIn');
    });
}

/* AUTHENTICATION */
var signedOut = document.getElementById('signed-out');
var signedIn = document.getElementById('signed-in');

var signInForm = document.getElementById('signin-form');
var signUpForm = document.getElementById('signup-form');

// For Sign In
var signInBtn = document.getElementById('signInBtn');
signInBtn.addEventListener('click', (e)=>{
    signedIn.classList.remove('hide');
    signedOut.classList.add('hide');
});

// For Sign Up
var signUpBtn = document.getElementById('signUpBtn');
signUpBtn.addEventListener('click', (e)=>{
    signedIn.classList.remove('hide');
    signedOut.classList.add('hide');
});


// For Sign Out
var signOutBtn = document.getElementById('signOutBtn');
signOutBtn.addEventListener('click', (e) => {
    signedIn.classList.add('hide');
    signedOut.classList.remove('hide');
});


// For Conversation to Chats
var backBtn = document.querySelector('#backBtn');
backBtn.addEventListener('click', function (e) {
    chats.classList.remove('hide');
    groups.classList.add('hide');
    friends.classList.add('hide');
    people.classList.add('hide');
    conversations.classList.add('hide');
});



var menu = document.getElementById('menu');
var chatWindow = document.getElementById('chatWindow');

var sendMessageInput = document.getElementById("sendMessage");
var fileInput = document.getElementById("fileInput");
var fileBtn = document.getElementById("fileBtn");
var LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

var chatsBtn = document.getElementById('chatsBtn');
var groupsBtn = document.getElementById('groupsBtn');
var friendsBtn = document.getElementById('friendsBtn');
var peopleBtn = document.getElementById('peopleBtn');

var chats = document.getElementById('chats');
var groups = document.getElementById('groups');
var friends = document.getElementById('friends');
var people = document.getElementById('people');

var conversationsDiv = document.getElementById('conversations');
var sendBtn = document.getElementById("sendBtn");


document.addEventListener('DOMContentLoaded', function () {
});

chatsBtn.addEventListener('click', function (e) {
    setActive(this);
    // displayChats();
});

groupsBtn.addEventListener('click', function (e) {
    setActive(this);
    // displayGroups();
});

friendsBtn.addEventListener('click', function (e) {
    setActive(this);
    // displayFriends();
});

peopleBtn.addEventListener('click', function (e) {
    setActive(this);
    // displayPeople();
});

function setActive(x) {
    chatsBtn.parentElement.classList.remove('active');
    groupsBtn.parentElement.classList.remove('active');
    friendsBtn.parentElement.classList.remove('active');
    peopleBtn.parentElement.classList.remove('active');

    chats.classList.add('hide');
    groups.classList.add('hide');
    friends.classList.add('hide');
    people.classList.add('hide');
    conversations.classList.add('hide');

    if (x) {
        x.parentElement.classList.add('active');
        var current = x.href.split("#");
        console.log(x);
        document.getElementById(current[1]).classList.remove('hide');

        if (chatWindow.classList.contains('hide')) {
            chatWindow.classList.remove('hide');
            menu.classList.remove('show');
        };
    }
}

document.querySelector("#chat").addEventListener('click', function (e) {
    chats.classList.add('hide');
    groups.classList.add('hide');
    friends.classList.add('hide');
    people.classList.add('hide');
    conversations.classList.remove('hide');
});


sendBtn.addEventListener('click', function (e) {
    if (fileInput.value) {
        sendBtn.disabled = true;
        // sendImage(currentFile);
        resetSendDiv();
    }
    else if (sendMessageInput.value) {
        sendBtn.disabled = true;
        // sendMessage();
        resetSendDiv();
    }
});

// Triggered when a file is selected via the media picker.
fileInput.addEventListener('input', onMediaFileSelected);
function onMediaFileSelected(event) {
    event.preventDefault();
    sendMessageInput.value = fileInput.value;
    var file = event.target.files[0];
    currentFile = file;

    // Check if the file is an image.
    if (!file.type.match('image.*')) {
        var data = {
            message: 'You can only share images',
            timeout: 2000
        };
        console.log(data);
        resetSendDiv();
        return;
    }
}

function resetSendDiv() {
    if (sendMessageInput.value) {
        sendBtn.disabled = false;
        sendMessageInput.value = "";
        fileInput.value = "";
    }
}
