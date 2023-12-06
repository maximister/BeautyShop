const sortAscButtonCatalog = document.querySelector(".catalog-sort-asc");
const sortDescButtonCatalog = document.querySelector(".catalog-sort-desc");
const filterbtn = document.querySelector(".catalog-filter");
const container = document.querySelector(".catalog");
const reset = document.querySelector(".catalog-reset");

const catalogItems = [];
const initialItems = [];

const catalogList = document.getElementsByClassName("catalog-card");

function removeItem(item) {
    catalogItems.remove(item);
    item.remove();
}

Array.prototype.remove = function (value) {
    const index = this.indexOf(value);
    if (index !== -1) {
        this.splice(index, 1);
    }
}

function setCatalogItems(newItems) {
    for (const item of [...catalogItems]) {
        removeItem(item);
    }

    for (const item of newItems) {
        container.insertBefore(item, container.firstElementChild);
        catalogItems.push(item);
    }
}


for (let i = 0; i < catalogList.length; i++) {
    let card = catalog.item(i);
    let name = card.querySelector(".card-title").textContent;
    let img = card.querySelector("img").src;
    let price = card.querySelector('.card-price').textContent;
    let addBtn = card.querySelector('.add-btn');

    catalogItems.push(catalogList.item(i));
    initialItems.push(catalogList.item(i));
}

function getCardPrice(item) {
    const price = item.querySelector('.card-price');
    return parseFloat(price.textContent.substring(0, price.textContent.length));
}

reset.addEventListener('click', () => {
    setCatalogItems(initialItems);
});

sortDescButtonCatalog.addEventListener('click', () => {
    setCatalogItems([...catalogItems.sort((item1, item2) => getCardPrice(item1) - getCardPrice(item2))]);
});

sortAscButtonCatalog.addEventListener('click', () => {
    setCatalogItems([...catalogItems.sort((item1, item2) => getCardPrice(item2) - getCardPrice(item1))]);
});

let unfilteredItems = [];
filterbtn.addEventListener('click', () => {
    if (unfilteredItems.length) {
        setCatalogItems([...unfilteredItems]);
        unfilteredItems = [];
    } else {
        unfilteredItems = [...catalogItems];

        const lower = parseFloat(prompt('Нижняя граница:'));
        if (isNaN(lower)) {
            return;
        }

        const upper = parseFloat(prompt('Верхняя граница:'));
        if (isNaN(upper)) {
            return;
        }

        setCatalogItems([...catalogItems.filter((item) => {
            const price = getCardPrice(item);
            return price >= lower && price <= upper;
        })]);
    }
});
