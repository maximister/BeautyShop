const sortAscButtonCatalog = document.querySelector(".catalog-sort-asc");
const sortDescButtonCatalog = document.querySelector(".catalog-sort-desc");
const from = document.querySelector(".catalog-from");
const to = document.querySelector(".catalog-to");
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
    catalogItems.push(catalogList.item(i));
    initialItems.unshift(catalogList.item(i));
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
let upperBound = Number.MAX_VALUE;
let lowerBound = 0;
from.addEventListener('click', () => {
    if (unfilteredItems.length) {
        setCatalogItems([...unfilteredItems]);
        unfilteredItems = [];
    } else {
        unfilteredItems = [...items];

        lowerBound = parseFloat(prompt('Нижняя граница:'));
        if (isNaN(lowerBound)) {
            lowerBound = 0;
            return;
        }

        alert(lowerBound)
        alert(upperBound)
        setCatalogItems([...catalogItems.filter((item) => {
            const price = getCardPrice(item);
            return price >= lowerBound && price <= upperBound;
        })]);
    }
});

to.addEventListener('click', () => {
    if (unfilteredItems.length) {
        setCatalogItems([...unfilteredItems]);
        unfilteredItems = [];
    } else {
        unfilteredItems = [...items];

        upperBound = parseFloat(prompt('Верхняя граница:'));
        if (isNaN(upperBound)) {
            upperBound = Number.MAX_VALUE;
            return;
        }

        alert(lowerBound)
        alert(upperBound)
        setCatalogItems([...catalogItems.filter((item) => {
            const price = getCardPrice(item);
            return price >= lowerBound && price <= upperBound;
        })]);
    }
});
