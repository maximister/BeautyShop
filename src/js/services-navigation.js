const cancelBtn = document.querySelector(".cancel");

cancelBtn.addEventListener('click', () => {
    const navlist = document.querySelector(".nav-list");

    if (navlist.classList.contains('hidden')) {
        cancelBtn.innerHTML = "";
        cancelBtn.innerHTML += "<i class=\"fa-regular fa-circle-xmark\"></i>"
    } else {
        cancelBtn.innerHTML = "";
        cancelBtn.innerHTML += "<i class=\"fa-solid fa-list\"></i>";
    }

    navlist.classList.toggle("hidden");
});