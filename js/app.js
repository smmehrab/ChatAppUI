var incomingRequestList = ["opportunity@life.com"];
var outgoingRequestList = ["hope@life.com"];
var peopleList = ["stranger@life.com"];
var friendsList = ["friend@life.com", "friend@life.com"];
var currentConversationId;
var chatOn = false;

var menu = document.getElementById('menu');
var chatWindow = document.getElementById('chatWindow');

var sendMessageInput = document.getElementById("sendMessage");
var fileInput = document.getElementById("fileInput");
var fileBtn = document.getElementById("fileBtn");

var chatsBtn = document.getElementById('chatsBtn');
var groupsBtn = document.getElementById('groupsBtn');
var friendsBtn = document.getElementById('friendsBtn');
var peopleBtn = document.getElementById('peopleBtn');
var backBtn = document.querySelector('#backBtn');

var chats = document.getElementById('chats');
var groups = document.getElementById('groups');
var friends = document.getElementById('friends');
var people = document.getElementById('people');

var conversationsDiv = document.getElementById('conversations');
var sendBtn = document.getElementById("sendBtn");

var signedOut = document.getElementById('signed-out');
var signedIn = document.getElementById('signed-in');
var signUpForm = document.getElementById('signup-form');
var signInForm = document.getElementById('signin-form');
var signOutBtn = document.getElementById('signOutBtn');

var peopleDivDefaultHtml =
    `
<div id="searchPeopleDiv" class="row">
<a href="" id="searchPeopleBtn" class="brn col">
    <i id="searchPeopleIcon" class="material-icons">search</i>
</a>

<input id="searchPeopleInput" placeholder="Search People By Email" type="text" class="col" onkeypress="searchPeople(event)" >
</div>

<div id="requestsLabelDiv">
<p id="requestsLabel">Requests</p>
</div>
`;

/************************ MENU *********************************/

document.addEventListener('DOMContentLoaded', function () {
    var currently = localStorage.getItem("currently");
    if (currently === "chats" || !currently) {
        chatsBtn.click();
    } else if (currently === "groups") {
        groupsBtn.click();
    } else if (currently === "friends") {
        friendsBtn.click();
    } else if (currently === "people") {
        peopleBtn.click();
    }
});

backBtn.addEventListener('click', function (e) {
    e.preventDefault();
    chatOn = false;
    chatsBtn.click();
});

chatsBtn.addEventListener('click', function (e) {
    e.preventDefault();
    setActive(this);
    displayChats();
});

groupsBtn.addEventListener('click', function (e) {
    e.preventDefault();
    setActive(this);
    alert("This is for you to make! " + "\n" + "Best of Luck")
    // displayGroups();
});

friendsBtn.addEventListener('click', function (e) {
    e.preventDefault();
    setActive(this);
    displayFriends();
});

peopleBtn.addEventListener('click', function (e) {
    e.preventDefault();
    setActive(this);
    displayPeople();
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

    var currently;
    if (x === chatsBtn) {
        currently = "chats";
        chatsBtn.parentElement.classList.add('active');
        chats.classList.remove('hide');
        chatOn = false;
    } else if (x === groupsBtn) {
        currently = "groups";
        groupsBtn.parentElement.classList.add('active');
        groups.classList.remove('hide');
    } else if (x === friendsBtn) {
        currently = "friends";
        friendsBtn.parentElement.classList.add('active');
        friends.classList.remove('hide');
    } else if (x === peopleBtn) {
        currently = "people";
        peopleBtn.parentElement.classList.add('active');
        people.classList.remove('hide');
    }

    localStorage.setItem("currently", currently);

    if (chatWindow.classList.contains('hide')) {
        chatWindow.classList.remove('hide');
        menu.classList.remove('show');
    };
}




/************************NAVIGATION*********************************/

// For Tabs
function openTab(tabName) {
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
}

// For Side Nav Toggle
var menuBtns = document.querySelectorAll('#menuBtn');
for (var i = 0; i < menuBtns.length; i++) {
    menuBtns[i].addEventListener('click', function (e) {
        e.preventDefault();
        chatWindow.classList.add('hide');
        menu.classList.add('show');
    });
}




/************************AUTH*********************************/
// Handling Sign Up
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signUpForm['signup-email'].value;
    const password = signUpForm['signup-password'].value;
    const confirmPassword = signUpForm['signup-confirmPassword'].value;
    if (password != confirmPassword) {
        signUpForm.querySelector('.error').innerHTML = 'Password Confirmation Failed!';
    }
    else {
        // Create User
        document.getElementById('signUpBtnText').classList.add('hide');
        document.getElementById('signUpBtnIcon').classList.remove('hide');

        setTimeout(()=>{

            document.getElementById('signUpBtnText').classList.remove('hide');
            document.getElementById('signUpBtnIcon').classList.add('hide');
            signedIn.classList.remove('hide');
            signedOut.classList.add('hide');
            signUpForm.reset();
    
            changeUI("signedUp");

        }, 3000);

        // Handle Error
        // document.getElementById('signUpBtnText').classList.remove('hide');
        // document.getElementById('signUpBtnIcon').classList.add('hide');
        // signUpForm.querySelector('.error').innerHTML = err.message;
    }
});

// Handling Sign In
signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signInForm['signin-email'].value;
    const password = signInForm['signin-password'].value;
    // Sign the User In
    document.getElementById('signInBtnText').classList.add('hide');
    document.getElementById('signInBtnIcon').classList.remove('hide');

    setTimeout(()=>{

        document.getElementById('signInBtnText').classList.remove('hide');
        document.getElementById('signInBtnIcon').classList.add('hide');
        signedIn.classList.remove('hide');
        signedOut.classList.add('hide');
        signInForm.reset();
    
        changeUI("signedIn");

    }, 3000);

    // Handle Error
    // document.getElementById('signInBtnText').classList.remove('hide');
    // document.getElementById('signInBtnIcon').classList.add('hide');
    // signInForm.querySelector('.error').innerHTML = err.message;
});

// Handling Sign Out
signOutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signOutBtnIcon').innerHTML = "autorenew";
    document.getElementById('signOutBtnIcon').classList.add('loadingIcon');

    setTimeout(()=>{

        document.getElementById('signOutBtnIcon').innerHTML = "exit_to_app";
        document.getElementById('signOutBtnIcon').classList.remove('loadingIcon');
        signedIn.classList.add('hide');
        signedOut.classList.remove('hide');
    
        var currently = "";
        localStorage.setItem("currently", currently);
    
        document.getElementById('chatsDiv').innerHTML = "";
        document.getElementById('friendsDiv').innerHTML = "";
        document.getElementById('peopleDiv').innerHTML = peopleDivDefaultHtml;
    
        changeUI("signedOut");

    }, 3000);

    // Handle Error
    // document.getElementById('signOutBtnIcon').innerHTML = "exit_to_app";
    // document.getElementById('signOutBtnIcon').classList.remove('loadingIcon');
    // alert('Ensure Internet Connection to Sign Out');
});

// Handling Auth Status Change
function changeUI(status){
    if (status == "signedOut") {
        signedOutUI();
    } else {
        signedInUI();
    }
}

function signedInUI() {
    document.getElementById('profileName').innerHTML = "you@life.com";
    signedIn.classList.remove('hide');
    signedOut.classList.add('hide');
    var currently = localStorage.getItem("currently");
    if (currently === "chats" || !currently) {
        chatsBtn.click();
    } else if (currently === "groups") {
        groupsBtn.click();
    } else if (currently === "friends") {
        friendsBtn.click();
    } else if (currently === "people") {
        peopleBtn.click();
    }
}

function signedOutUI() {
    signedIn.classList.add('hide');
    signedOut.classList.remove('hide');
}





/************************************ PEOPLE SECTION ******************************************/
function displayPeople() {
    document.getElementById('peopleDiv').innerHTML = peopleDivDefaultHtml;

    // Outgoing Requests Inserted
    outgoingRequestList.forEach(people=>{
        renderPeople("outgoing", people);
    });

    // Incoming Requests Inserted so
    // Outgoings pushed down
    incomingRequestList.forEach(people=>{
        renderPeople("incoming", people);
    });

    // If there's no request available
    // renderNotFound('requests');
}

function searchPeople(e) {
    if (e.keyCode === 13) {
        e.preventDefault();

        document.querySelectorAll('.searchResult').forEach((item) => {
            document.getElementById('peopleDiv').removeChild(item);
        });

        document.querySelector('#searchPeopleIcon').innerHTML = "";
        document.querySelector('#searchPeopleIcon').appendChild(document.createTextNode('autorenew'));
        document.querySelector('#searchPeopleIcon').classList.add('loadingIcon');

        var searchEmail = document.getElementById('searchPeopleInput').value;

        renderNotFound('searchResult');
        setTimeout(() => {
            if (document.querySelector('.searchResult')) {
                document.getElementById('peopleDiv').removeChild(document.querySelector('.searchResult'));
            }

            if(peopleList.indexOf(searchEmail)!=-1){
                renderPeople('searchResultGeneral', searchEmail);                
            }
        }, 1000);
    }
}

function renderNotFound(type) {
    var notFoundDiv = document.createElement('div');
    notFoundDiv.id = 'notFoundDiv';

    if (type == 'searchResult') {
        notFoundDiv.classList.add('searchResult');
    }

    var notFoundP = document.createElement('p');
    notFoundP.id = 'notFoundP';

    if (type == 'requests') {
        notFoundP.appendChild(document.createTextNode('No Requests Available'));
    } else if (type == 'searchResult') {
        notFoundP.appendChild(document.createTextNode('No People Found'));
    }

    notFoundDiv.appendChild(notFoundP);

    if (type == 'requests') {
        notFoundDiv.appendAfter(document.getElementById('requestsLabelDiv'));
    } else if (type == 'searchResult') {
        document.querySelector('#searchPeopleIcon').classList.remove('loadingIcon');
        document.querySelector('#searchPeopleIcon').innerHTML = "";
        document.querySelector('#searchPeopleIcon').appendChild(document.createTextNode('search'));

        notFoundDiv.appendAfter(document.getElementById('searchPeopleDiv'));
    }
}

function renderPeople(type, email) {
    var peopleItem = document.createElement('li');
    peopleItem.id = "peopleItem";
    peopleItem.classList.add('row');

    if (type == 'searchResultGeneral' || type == 'searchResultIncoming' || type == 'searchResultOutgoing' || type == 'searchResultFriend') {
        peopleItem.classList.add('searchResult');
    }

    var picture = document.createElement('img');
    picture.id = "picture";
    picture.src = "img/icons/icon128.png";
    picture.classList.add('col');
    peopleItem.appendChild(picture);

    var details = document.createElement('div');
    details.id = "details";
    details.classList.add('col');

    var detailsInside = document.createElement('div');
    detailsInside.id = "detailsInside";

    var peopleTitle = document.createElement('p');
    peopleTitle.id = "peopleTitle";
    peopleTitle.appendChild(document.createTextNode(email));

    var peopleBio = document.createElement('p');
    peopleBio.id = "peopleBio";
    peopleBio.appendChild(document.createTextNode("From The Mountains To The Ocean"));

    detailsInside.appendChild(peopleTitle);
    detailsInside.appendChild(peopleBio);
    details.appendChild(detailsInside);
    peopleItem.appendChild(details);

    var status = document.createElement('div');
    status.id = "status";
    status.classList.add('col');

    var statusInside = document.createElement('div');
    statusInside.id = "statusInside";

    var peopleAddFriend = document.createElement('a');
    peopleAddFriend.id = "peopleAddFriend";
    peopleAddFriend.href = "";

    var addFriend = document.createElement('i');
    addFriend.classList.add('material-icons');
    addFriend.classList.add('addFriend');

    if (type == "searchResultGeneral") {
        addFriend.appendChild(document.createTextNode("person_add"));
    } else if (type == "outgoing" || type == 'searchResultOutgoing') {
        addFriend.appendChild(document.createTextNode("person_add_disabled"));
    } else if (type == "incoming" || type == 'searchResultIncoming') {
        addFriend.appendChild(document.createTextNode("check"));
    }

    if (type == "incoming" || type == 'searchResultIncoming') {
        var peopleRejectFriend = document.createElement('a');
        peopleRejectFriend.id = "peopleAddFriend";
        peopleRejectFriend.href = "";

        var rejectFriend = document.createElement('i');
        rejectFriend.classList.add('material-icons');
        rejectFriend.classList.add('addFriend');

        rejectFriend.appendChild(document.createTextNode("clear"));

        rejectFriend.addEventListener('click', (e) => {
            e.preventDefault();
            handleFriendRequest("reject", email, addFriend, rejectFriend);
        });

        peopleRejectFriend.appendChild(rejectFriend);
    }


    addFriend.addEventListener('click', (e) => {
        e.preventDefault();

        if (addFriend.innerHTML == "check") {
            handleFriendRequest("accept", email, addFriend, rejectFriend);
        } else if (addFriend.innerHTML == "person_add") {
            addAsFriend("send", email, addFriend);
        } else {
            addAsFriend("cancel", email, addFriend);
        }
    });

    peopleAddFriend.appendChild(addFriend);


    var peopleViewProfile = document.createElement('a');
    peopleViewProfile.id = "peopleViewProfile";
    peopleViewProfile.href = "";

    var viewPeopleProfile = document.createElement('i');
    viewPeopleProfile.classList.add('material-icons');
    viewPeopleProfile.classList.add('viewPeopleProfile');
    viewPeopleProfile.appendChild(document.createTextNode("info"));

    viewPeopleProfile.addEventListener('click', (e) => {
        e.preventDefault();
        alert("Set Up Profile Page Here!");
    });

    peopleViewProfile.appendChild(viewPeopleProfile);
    statusInside.appendChild(peopleAddFriend);
    if (type == "incoming" || type == 'searchResultIncoming') {
        statusInside.appendChild(peopleRejectFriend);
    }
    statusInside.appendChild(peopleViewProfile);
    status.appendChild(statusInside);
    peopleItem.appendChild(status);

    if (type == 'searchResultGeneral' || type == 'searchResultIncoming' || type == 'searchResultOutgoing' || type == 'searchResultFriend') {
        document.querySelector('#searchPeopleIcon').classList.remove('loadingIcon');
        document.querySelector('#searchPeopleIcon').innerHTML = "";
        document.querySelector('#searchPeopleIcon').appendChild(document.createTextNode('search'));

        document.querySelectorAll('.searchResult').forEach((item) => {
            document.getElementById('peopleDiv').removeChild(item);
        });

        peopleItem.appendAfter(document.getElementById('searchPeopleDiv'));
    } else {
        document.querySelectorAll('#notFoundDiv').forEach((item) => {
            document.getElementById('peopleDiv').removeChild(item);
        });

        peopleItem.appendAfter(document.getElementById('requestsLabelDiv'));
    }
}

Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}, false;

function GetElementInsideContainer(containerID, childID) {
    var elm = document.getElementById(childID);
    var parent = elm ? elm.parentNode : {};
    return (parent.id && parent.id === containerID) ? elm : {};
}

function addAsFriend(status, email, addFriend) {
    addFriend.innerHTML = 'autorenew';
    addFriend.classList.add('loadingIcon');

    setTimeout(()=>{
        if (status == "send") {
            addFriend.innerHTML = "";
            addFriend.classList.remove('loadingIcon');
            addFriend.appendChild(document.createTextNode("person_add_disabled"));
            alert("Request Sent");
        } else if (status == "cancel") {
            addFriend.innerHTML = "";
            addFriend.classList.remove('loadingIcon');
            addFriend.appendChild(document.createTextNode("person_add"));
            alert("Request Cancelled");
        }
    }, 1000);
}

function handleFriendRequest(status, email, addFriend, rejectFriend) {
    rejectFriend.style.display = "none";
    addFriend.innerHTML = 'autorenew';
    addFriend.classList.add('loadingIcon');

    setTimeout(()=>{
        if (status == "accept") {
            addFriend.innerHTML = "";
            rejectFriend.innerHTML = "";
            addFriend.classList.remove('loadingIcon');
            addFriend.style.display = "none";
            rejectFriend.style.display = "none";
            alert("Request Accepted");
        } else if (status == "reject") {
            addFriend.innerHTML = "";
            rejectFriend.innerHTML = "";
            addFriend.classList.remove('loadingIcon');
            rejectFriend.style.display = "none";
            addFriend.appendChild(document.createTextNode("person_add"));
            alert("Request Rejected");
        }
    }, 1000);
}






/************************************ FRIENDS SECTION ******************************************/
function displayFriends() {
    document.getElementById('friendsDiv').innerHTML = "";
    friendsList.forEach(friend=>{
        renderFriend(friend, "Yesterday");
    });
}

function renderFriend(email, lastActive) {
    var friendItem = document.createElement('li');
    friendItem.id = "friendItem";
    friendItem.classList.add('row');

    var picture = document.createElement('img');
    picture.id = "picture";
    picture.src = 'img/icons/icon128.png';
    picture.classList.add('col');
    friendItem.appendChild(picture);

    var details = document.createElement('div');
    details.id = "details";
    details.classList.add('col');

    var detailsInside = document.createElement('div');
    detailsInside.id = "detailsInside";

    var friendTitle = document.createElement('p');
    friendTitle.id = "friendTitle";
    friendTitle.appendChild(document.createTextNode(email));

    var friendLastActive = document.createElement('p');
    friendLastActive.id = "friendLastActive";

    friendLastActive.appendChild(document.createTextNode(lastActive));

    detailsInside.appendChild(friendTitle);
    detailsInside.appendChild(friendLastActive);
    details.appendChild(detailsInside);
    friendItem.appendChild(details);

    var status = document.createElement('div');
    status.id = "status";
    status.classList.add('col');

    var statusInside = document.createElement('div');
    statusInside.id = "statusInside";

    var friendChatWith = document.createElement('a');
    friendChatWith.id = "friendChatWith";
    friendChatWith.href = "";

    var messageFriend = document.createElement('i');
    messageFriend.classList.add('material-icons');
    messageFriend.classList.add('messageFriend');
    messageFriend.appendChild(document.createTextNode("message"));

    messageFriend.addEventListener('click', (e) => {
        e.preventDefault();
        chatWithFriend(email, messageFriend);
    });

    friendChatWith.appendChild(messageFriend);

    var friendViewProfile = document.createElement('a');
    friendViewProfile.id = "friendViewProfile";
    friendViewProfile.href = "";

    var viewFriendProfile = document.createElement('i');
    viewFriendProfile.classList.add('material-icons');
    viewFriendProfile.classList.add('viewFriendProfile');
    viewFriendProfile.appendChild(document.createTextNode("info"));

    viewFriendProfile.addEventListener('click', (e) => {
        e.preventDefault();
        alert("Set Up Profile Page Here!");
    });

    friendViewProfile.appendChild(viewFriendProfile);
    statusInside.appendChild(friendChatWith);
    statusInside.appendChild(friendViewProfile);
    status.appendChild(statusInside);
    friendItem.appendChild(status);

    document.getElementById('friendsDiv').appendChild(friendItem);
}

function chatWithFriend(email, messageFriendBtn) {
    messageFriendBtn.innerHTML = 'autorenew';
    messageFriendBtn.classList.add('loadingIcon');

    setTimeout(()=>{

        messageFriendBtn.innerHTML = '';
        messageFriendBtn.classList.remove('loadingIcon');
        messageFriendBtn.appendChild(document.createTextNode("message"));
    
        openConversation(0, email);
        
    }, 3000);
}








/************************************ CHATS SECTION ******************************************/
function displayChats() {
    document.getElementById('chatsDiv').innerHTML = "";
    renderChat(0, "friend@life.com", "Enjoy never ending happiness...", "1d ago" ,3);
    renderChat(1, "friend@life.com", "Enjoy never ending happiness...", "1d ago" ,3);
}

function renderChat(id, chatWith, lastMessage, lastAt, notification) {
    var chatItem = document.createElement('li');
    chatItem.id = "chatItem";
    chatItem.classList.add('row');

    var picture = document.createElement('img');
    picture.id = "picture";
    picture.src = "img/icons/icon128.png";
    picture.classList.add('col');

    var details = document.createElement('div');
    details.id = "details";
    details.classList.add('col');

    var detailsInside = document.createElement('div');
    detailsInside.id = "detailsInside";

    var chatTitle = document.createElement('p');
    chatTitle.id = "chatTitle";

    chatTitle.appendChild(document.createTextNode(chatWith));

    var chatLastMessage = document.createElement('p');
    chatLastMessage.id = "chatLastMessage";

    // If last message is too long
    if (lastMessage.length > 25) {
        chatLastMessage.appendChild(document.createTextNode(lastMessage.substring(0, 22) + '...'));
    } else {
        chatLastMessage.appendChild(document.createTextNode(lastMessage));
    }

    detailsInside.appendChild(chatTitle);
    detailsInside.appendChild(chatLastMessage);
    details.appendChild(detailsInside);

    var status = document.createElement('div');
    status.id = "status";
    status.classList.add('col');

    var statusInside = document.createElement('div');
    statusInside.id = "statusInside";

    if (notification > 0) {
        var chatNewMessageCount = document.createElement('p');
        chatNewMessageCount.id = "chatNewMessageCount";
        chatNewMessageCount.appendChild(document.createTextNode(notification));
    }

    var chatLastModified = document.createElement('p');
    chatLastModified.id = "chatLastModified";

    chatLastModified.appendChild(document.createTextNode(lastAt));

    if (notification > 0) {
        statusInside.appendChild(chatNewMessageCount);
    }
    statusInside.appendChild(chatLastModified);
    status.appendChild(statusInside);

    chatItem.appendChild(picture);
    chatItem.appendChild(details);
    chatItem.appendChild(status);

    chatItem.addEventListener('click', (e) => {
        e.preventDefault();
        currentConversationId = id;
        openConversation(id, chatWith);
    });

    document.getElementById('chatsDiv').appendChild(chatItem);
}








/************************************ CONVERSATION SECTION ******************************************/
sendBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (fileInput.value) {
        sendBtn.disabled = true;
        sendImage(currentFile);
        resetSendDiv();
    }
    else if (sendMessageInput.value) {
        sendBtn.disabled = true;
        var message = sendMessageInput.value;
        sendMessage(message);
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
        alert(data);
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

// HAVE A LOOK
// Send two messages for UI demonstration purpose
function sendMessage(message) {
    // Send to firestore database
    alert(message + "\n" + "Message Sent");
    renderMessage(message, "sent", "you@life.com");

    // For Demonstration Purpose
    // Receiver will automatically reply the same message after 2 seconds
    setTimeout(()=>{
        renderMessage(message, "received", "friend@life.com");
    }, 2000);
}

// HAVE A LOOK
// Send two messages for UI demonstration purpose
function sendImage(path) {
    // alert(path + "\n" + "Image Sent");
    renderImage("./img/image.jpg", "sent", "you@life.com");

    // For Demonstration Purpose
    // Receiver will automatically reply the same message after 2 seconds
    setTimeout(()=>{
        renderImage("./img/image.jpg", "received", "friend@life.com");
    }, 2000);
}

function renderMessage(message, type, sender) {
    var messageDiv = document.createElement('div');
    messageDiv.classList.add("message");

    var senderSpan = document.createElement('span');
    var messageBody = document.createElement('p');

    if (type == "sent") {
        senderSpan.classList.add("sender");
        messageBody.classList.add("senderMessageBody");
    } else {
        senderSpan.classList.add("receiver");
        messageBody.classList.add("receiverMessageBody");
    }

    senderSpan.appendChild(document.createTextNode(sender));
    var br = document.createElement('br');

    // HANDLING LINKS
    if (message.indexOf("https://") >= 0) {
        var text = "", link = "";
        var i;

        for (i = 0; i < message.indexOf("https://"); i++) {
            text += message[i];
        }
        if (text) {
            var text1 = document.createTextNode(text);
            messageBody.appendChild(text1);
        }

        for (i = message.indexOf("https://"); i < message.length; i++) {
            link += message[i];
            if (message[i + 1] == " ") {
                break;
            }
        }
        var linkText = document.createTextNode(link);
        var anchor = document.createElement('a');
        anchor.href = link;
        anchor.style.color = "blue";
        anchor.style.textDecoration = "underline";
        anchor.target = "_blank";
        anchor.append(linkText);

        messageBody.appendChild(anchor);

        text = "";
        for (++i; i < message.length; i++) {
            text += message[i];
        }
        if (text) {
            var text2 = document.createTextNode(text);
            messageBody.appendChild(text2);
        }
    }

    // HANDLING NORMAL TEXT
    else {
        messageBody.appendChild(document.createTextNode(message));
    }

    messageDiv.appendChild(senderSpan);
    messageDiv.appendChild(br);
    messageDiv.appendChild(messageBody);

    document.querySelector("#messagesDiv").appendChild(messageDiv);
    document.querySelector("#messagesDiv").scrollTop = document.querySelector("#messagesDiv").scrollHeight;
}

function renderImage(path, type, sender) {
    var messageDiv = document.createElement('div');
    messageDiv.classList.add("imageMessage");

    var senderSpan = document.createElement('span');

    var img = document.createElement('img');
    img.src = path;

    if (type == "sent") {
        senderSpan.classList.add("sender");
        img.classList.add("senderImgBody");
    } else {
        senderSpan.classList.add("receiver");
        img.classList.add("receiverImgBody");
    }

    senderSpan.appendChild(document.createTextNode(sender));

    var messageImageSpan = document.createElement('span');
    messageImageSpan.classList.add("imageBody");
    messageImageSpan.appendChild(img);

    messageDiv.appendChild(senderSpan);
    var brDiv = document.createElement('br');
    messageDiv.appendChild(brDiv);
    messageDiv.appendChild(messageImageSpan);

    document.querySelector("#messagesDiv").appendChild(messageDiv);
    document.querySelector("#messagesDiv").scrollTop = document.querySelector("#messagesDiv").scrollHeight;
}

function openConversation(conversationId, email) {
    groupsBtn.parentElement.classList.remove('active');
    friendsBtn.parentElement.classList.remove('active');
    peopleBtn.parentElement.classList.remove('active');
    chatsBtn.parentElement.classList.add('active');

    chats.classList.add('hide');
    groups.classList.add('hide');
    friends.classList.add('hide');
    people.classList.add('hide');
    conversations.classList.remove('hide');

    document.getElementById('conversationTitle').innerHTML = email;
    document.querySelector("#messagesDiv").innerHTML = "";
    chatOn = true;
}