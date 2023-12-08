const signInButtons = document.getElementsByClassName("sign-in");

for (let btn of signInButtons) {
    btn.addEventListener('click', () => {
        const form = document.querySelector(".autorize");
        form.classList.toggle("hidden");
    });
}


const goBackBtn = document.querySelector(".go-back");

goBackBtn.addEventListener('click', () => {
    const form = document.querySelector(".autorize");
    form.classList.toggle("hidden");
});