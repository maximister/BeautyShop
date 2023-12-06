

const basket = document.querySelector('#' + getBasketName());
const endbtn = basket.querySelector('.' + getBasketName('add-button'));
const clearButton = basket.querySelector('.' + getBasketName('clear-button'));
const total = basket.querySelector('.' + getBasketName('total'));
const sortAscButton = basket.querySelector('.' + getBasketName('sort-asc'));
const sortDescButton = basket.querySelector('.' + getBasketName('sort-desc'));
const filterButton = basket.querySelector('.' + getBasketName('filter'));


const items = [];

endbtn.addEventListener('click', () => {
    if (items.length == 0) {
        alert("Ошибка: ваша корзина пуста")
    } else {
        alert("Сервис временно недоступен, попробуйте позже")
    }
});

const catalog = document.getElementsByClassName("catalog-card");
for (let i = 0; i < catalog.length; i++) {
    let card = catalog.item(i);
    let name = card.querySelector(".card-title").textContent;
    let img = card.querySelector("img").src;
    let price = card.querySelector('.card-price').textContent;
    let addBtn = card.querySelector('.add-btn');

    addBtn.addEventListener('click', () => {
        let j = searchItem(name);
        if (j === -1) {
            addCatalogItem(name, price, img);
            updateTotal();  
        }
        else {
            console.log(items, i);
            changeItemQuantity(items[j], price, 1);
        }
    });
}

function searchItem(name) {
    
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        if (item.querySelector(".item-title").textContent == name) {
            return i;
        }
    }

    return -1;
}


function addCatalogItem(title, price, img) {
    const item = document.createElement('div');
    item.className = 'item';
    basket.insertBefore(item, basket.firstElementChild.nextElementSibling);

    const head = document.createElement('div');
    head.className = getItemName('head');
    head.appendChild(createImg(img, 128, 128));

    const itemInfo = document.createElement('div');
    itemInfo.className = getItemName('info');
    itemInfo.innerHTML = 
        `<span class=${getItemName('title')}>${title}</span>` +
        `<span class=${getItemName('price')}>${price}₽</span>`;
    head.appendChild(itemInfo);
    item.appendChild(head);

    const controls = document.createElement('div');
    controls.className = getItemName('controls');
    item.appendChild(controls);

    const current = document.createElement('span');
    current.className = getItemName('quantity') + '-current';
    current.textContent = 1;
    current.style.marginRight = "2px";
    current.style.fontSize = "1.5rem";
    controls.appendChild(current);

    const changeQuantity = document.createElement('div');
    changeQuantity.className = getItemName('change-quantity');
    controls.appendChild(changeQuantity);

    const add = document.createElement('button');
    add.className = getItemName('change-quantity') + '-add';
    add.innerHTML += "<i class=\"fa-solid fa-caret-up\"></i>";
    changeQuantity.appendChild(add);

    add.addEventListener('click', () => changeItemQuantity(item, price, +1));

    const sub = document.createElement('button');
    sub.className = getItemName('change-quantity') + '-sub';
    sub.innerHTML += "<i class=\"fa-solid fa-caret-down\"></i>";
    changeQuantity.appendChild(sub);

    sub.addEventListener('click', () => {
        if (parseInt(current.textContent) > 1) {
            changeItemQuantity(item, price, -1);
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = getItemName('delete-button');
    deleteButton.innerHTML += "<i class=\"fa-regular fa-trash-can\"></i>";
    controls.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
        removeItem(item);
        updateTotal();
    });

    items.push(item);
}

function setItems(newItems) {
    for (const item of [...items]) {
        removeItem(item);
    }

    for (const item of newItems) {
        basket.insertBefore(item, basket.firstElementChild.nextElementSibling);
        items.push(item);
    }

    updateTotal();
}

function removeItem(item) {
    items.remove(item);
    item.remove();
}

Array.prototype.remove = function (value) {
    const index = this.indexOf(value);
    if (index !== -1) {
        this.splice(index, 1);
    }
}


function changeItemQuantity(item, price, delta) {
    const current = item.querySelector('.' + getItemName('quantity') + '-current');
    current.textContent = parseInt(current.textContent) + delta;

    const itemPrice = item.querySelector('.' + getItemName('price'));
    itemPrice.textContent = `${getItemPrice(item) + price * delta}₽`;
    updateTotal();
}

function getItemPrice(item) {
    const price = item.querySelector('.' + getItemName('price'));
    return parseFloat(price.textContent.substring(0, price.textContent.length - 1));
}

function updateTotal() {
    let sum = 0;
    for (const child of basket.querySelectorAll('.' + getItemName())) {
        sum += parseFloat(child.querySelector('.' + getItemName('price')).textContent);
    }

    total.textContent = `Общая сумма: ${sum}₽`;
}

clearButton.addEventListener('click', () => setItems([]));

sortAscButton.addEventListener('click', () => {
    setItems([...items.sort((item1, item2) => getItemPrice(item1) - getItemPrice(item2))]);
});

sortDescButton.addEventListener('click', () => {
    setItems([...items.sort((item1, item2) => getItemPrice(item2) - getItemPrice(item1))]);
});

let unfiltered = [];
filterButton.addEventListener('click', () => {
    if (unfiltered.length) {
        setItems([...unfiltered]);
        unfiltered = [];
    } else {
        unfiltered = [...items];

        const lower = parseFloat(prompt('Нижняя граница:'));
        if (isNaN(lower)) {
            return;
        }

        const upper = parseFloat(prompt('Верхняя граница:'));
        if (isNaN(upper)) {
            return;
        }

        setItems([...items.filter((item) => {
            const price = getItemPrice(item);
            return price >= lower && price <= upper;
        })]);
    }
});


//Utils
function getBasketName(str) {
    return str ? `basket-${str}` : 'basket';
}

function getItemName(str) {
    return str ? `item-${str}` : 'item';
}

function createImg(src, width, height) {
    const img = document.createElement('img');
    img.src = src;
    img.width = width;
    img.height = height;
    return img;
}
