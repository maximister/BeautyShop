const listOfCards = document.getElementsByClassName("catalog-card");
for (let i = 0; i < listOfCards.length; i++) {
    let card = listOfCards.item(i);
    let descr = card.querySelector('.card-descr');
    let aboutBtn = card.querySelector('.about-btn');

    aboutBtn.addEventListener('click', () => {
        descr.classList.toggle("show-descr");
    });

    card.addEventListener('mouseout', () => {
        if (!card.matches(':hover')) {
            descr.classList.remove("show-descr");
        }
    })
}