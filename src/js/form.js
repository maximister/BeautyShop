const logbtn = document.querySelector(".log-in");
const regbtn = document.querySelector(".reg");

const logdiv = document.querySelector(".login-form");
const regdiv = document.querySelector(".reg-form");

 regdiv.classList.add("hidden");

logbtn.addEventListener('click', () => {
    logdiv.classList.remove("hidden");
    regdiv.classList.add("hidden");
});

regbtn.addEventListener('click', () => {
    regdiv.classList.remove("hidden");
    logdiv.classList.add("hidden");
});



const logMessage = logdiv.querySelector(".message");
const regMessage = regdiv.querySelector(".message");
const loginBtn = logdiv.querySelector(".login-btn");
const registrBtn = regdiv.querySelector(".register-btn");

function loginButtonFunction() {
    const mail = logdiv.getElementsByTagName("input")[0].value;
    const password = logdiv.getElementsByTagName("input")[1].value;

    if (mail.length == 0 || password.length == 0) {
        logMessage.textContent = "Заполнены не все поля";
        return;
    } 
    let isvalid = String(mail)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (!isvalid) {
        logMessage.textContent = "Введена некорректная почта";
        return;
    }

    logMessage.textContent = "Пользователь не обнаружен";
    exit();
}

function regButtonFunction() {
    const name = regdiv.getElementsByTagName("input")[0].value;
    const surname = regdiv.getElementsByTagName("input")[1].value;
    const mail = regdiv.getElementsByTagName("input")[2].value;
    const password = regdiv.getElementsByTagName("input")[3].value;
    const password2 = regdiv.getElementsByTagName("input")[4].value;


    if (mail.length == 0 || password.length == 0 || name.length == 0 || surname.length == 0 || password2.length == 0) {
        regMessage.textContent = "Заполнены не все поля";
        return;
    } 
    let isvalid = String(mail)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (!isvalid) {
        regMessage.textContent = "Введена некорректная почта";
        return;
    }

    if (password != password2) {
        regMessage.textContent = "Пароли должны совпадать";
        return;
    }

    regMessage.textContent = "Для завершения регистрации необходимо подтвердить почту в личном кабинете";
    return;
}

loginBtn.addEventListener('click', loginButtonFunction);
registrBtn.addEventListener('click', regButtonFunction);