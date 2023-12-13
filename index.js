const secretForm = document.forms['secretForm']
const fullnameInput = secretForm['fullname']
const emailInput = secretForm['email']
const subjectInput = secretForm['subject']

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getCookie(key) {
    const array = document.cookie.split(';');
    const cookie = array.find(vl => vl.split('=')[0] === key);
    return cookie ? JSON.parse(cookie.split('=')[1]) : undefined;
}
function setCookie(key, value) {
    let array = document.cookie.split(';').filter(vl => vl != '');
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.split('=')[0] == key) {
            array[i] = `${key}=${JSON.stringify(value)}`;
            document.cookie = array.join(';');
            return;
        }
    }
    array.push(`${key}=${JSON.stringify(value)}`);
    document.cookie = array.join(';');
    return;
}
secretForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    if (!fullnameInput.value || !emailInput.value || !subjectInput.value) {
        alert('You not completed form');
        return;
    }
    const newUser = {
        fullname: fullnameInput.value,
        email: emailInput.value,
        subject: subjectInput.value
    }
    const secretUsers = getCookie('secretUsers');
    setCookie('secretUsers', secretUsers ? [...secretUsers, newUser] : [newUser])
    alert('You success register to secret santa')
})


const buttonGift = document.querySelector('#getGift');
buttonGift.addEventListener('click', () => {
    const secretUsers = getCookie('secretUsers');
    if (!secretUsers || !secretUsers?.length) {
        alert('You need to waiting');
        return;
    }
    const randomUser = secretUsers[getRandomInt(secretUsers.length)];
    console.log(randomUser);
    alert(`This you secret Santa:\n${randomUser.fullname} \nInfo about Santa:\n${randomUser.email}\nSubject:\n${randomUser.subject}`);
})