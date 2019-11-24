var char = 'abcdefghijklmnopqrstuvwxyz';
var charCap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var num = '0123456789';
var sym = '~!@#$%^&*()_';

var passwordLength = prompt("enter length")
var passwordList = [];
var placeholderList = [];

while (passwordLength < 8 || passwordLength > 128) {
    passwordLength = prompt("please enter a number between 8 and 128")
}


function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


function randomOneCharFromString(candidate) {
    var length = candidate.length;
    var nextIndex = randomRange(0, candidate.length - 1);
    return candidate.charAt(nextIndex);
}

function getNextIndex() {
    var leftSlot = new Array();
    for (var i = 0; i < placeholderList.length; i++) {
        if (placeholderList[i] == 0) {
            leftSlot.push(i);
        }
    }

    return leftSlot.length == 0 ? -1 : leftSlot[Math.floor(Math.random()*leftSlot.length)];
}

function pushNextChar(index, bit) {
    passwordList[index] = bit;
    placeholderList[index] = 1;
}

function initialPlaceholder(length) {
    for (var i = 0; i < length; i++) {
        placeholderList[i] = 0;
    }
    passwordList = [];
}

function generateOneChar(candidate) {
    var nextBit = randomOneCharFromString(candidate);
    var nextIndex = getNextIndex(passwordList, placeholderList);
    pushNextChar(nextIndex, nextBit);
}




function generatePassword() {
    var candidateChar = '';

    initialPlaceholder(passwordLength);

    var specialCharacter = document.getElementById("checkboxSpecialCharacter").checked
    var lowerCharacter = document.getElementById("checkboxLowerCaseCharacter").checked
    var upperCharacter = document.getElementById("checkboxUpperCaseCharacter").checked
    var number = document.getElementById("checkboxNumberCharacter").checked


    if (specialCharacter == true) {
        candidateChar += sym;
        generateOneChar(sym);
    }

    if (lowerCharacter == true) {
        candidateChar += char;
        generateOneChar(char);
    }

    if (upperCharacter == true) {
        candidateChar += charCap;
        generateOneChar(charCap);
    }

    if (number == true) {
        candidateChar += num;
        generateOneChar(num);
    }

    if (passwordList == []) {
        alert("please select a condition");
    }

   
    console.log('passwordList', passwordList, candidateChar);

    while (getNextIndex() != -1) {
        generateOneChar(candidateChar);
    }

    var password = passwordList.join('');

    document.getElementById("password").value = password;
    console.log(password);
}














