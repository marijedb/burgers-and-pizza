import {
    menuArray
} from "./data.js";

// Add eventListeners for all buttons, using event.target
// Add menu discounts
// When complete order, create a popup. (Still need to make and style it)
let pageHtml = ``;
let orderItems = [];
let singledOutArray = []

document.getElementById("main-page").onload = render();
document.getElementById("main-page").onload = renderOrderItems();

document.addEventListener("click", function (event) {
    if (event.target.dataset.add) {
        addOrderItems(event.target.dataset.add);
    } else if (event.target.dataset.remove) {
        removeItem(event.target.dataset.remove)
    } else if (event.target.dataset.complete) {
        completeOrder()
    }
    else if (event.target.dataset.pay){
        if(document.querySelector('form').checkValidity()){
            payOrder();
            event.preventDefault();
        }
    }
})

function addOrderItems(itemID) {
    for (let i = 0; i < menuArray.length; i++) {
        if (menuArray[i].id === Number(itemID)) {
            menuArray[i].counter += 1
            orderItems.push(menuArray[i])
        }
    }


    for (let item of orderItems) {

        if (!(singledOutArray.includes(item))) {
            singledOutArray.push(item)
        }

    }
    orderItems = []
    renderOrderItems();
}


function removeItem(itemId) {
    for (let i = 0; i < singledOutArray.length; i++) {
        if (singledOutArray[i].id === Number(itemId)) {
            singledOutArray[i].counter = 0;
            singledOutArray.splice(i, 1);
        }
    }
    console.log("orderItems: ", orderItems)
    console.log("SingledOutArray: ", singledOutArray)
    renderOrderItems();
}

function calculateTotalPrice() {
    let totalPrice = 0;
    if (singledOutArray.length === 0) {
        document.getElementById("order-total-amount").textContent = `$0`
    } else {
        for (let i = 0; i < singledOutArray.length; i++) {
            totalPrice += (singledOutArray[i].price * singledOutArray[i].counter);
        }
        document.getElementById("order-total-amount").textContent = `$${totalPrice}`
    }
}

function completeOrder() {
    document.getElementById("pay-modal-container").classList.remove("hidden");
}

function payOrder() {
    let name = document.getElementById("name").value;
    document.getElementById("pay-modal-container").classList.add("hidden");
    document.getElementById("order-container").innerHTML = `
        <div class="completed-container">
            <p class="thank-you-msg">Thanks, ${name}! Your order is on its way!</p>
        </div>`
}

function renderOrderItems() {
    console.log()
    let ul = document.getElementById("ul-items-basket");
    if (singledOutArray.length < 1) {
        document.getElementById("basket-item").textContent = `Select a menu item`;
        document.getElementById("remove-btn").textContent = ``;
        document.getElementById("basket-item-price").textContent = `$0`
    } else {
        ul.textContent = ""
        for (let i = 0; i < singledOutArray.length; i++) {
            if (singledOutArray[i].counter === 1) {
                let list = document.createElement("li");
                list.setAttribute("class", "basket-items-list-container")
                list.innerHTML = `
                    <p id="basket-item" class="basket-item">${singledOutArray[i].name}</p>
                    <p id="remove-btn" class="remove-btn" data-remove="${singledOutArray[i].id}">remove</p>
                    <p id="basket-item-price" class="basket-item-price">$${singledOutArray[i].price}</p>`
                ul.appendChild(list)
            } else {
                let list = document.createElement("li");
                list.setAttribute("class", "basket-items-list-container")
                list.innerHTML = `
                    <p id="basket-item" class="basket-item">${singledOutArray[i].counter}x ${singledOutArray[i].name}</p>
                    <p id="remove-btn" class="remove-btn" data-remove="${singledOutArray[i].id}">remove</p>
                    <p id="basket-item-price" class="basket-item-price">$${singledOutArray[i].price * singledOutArray[i].counter}</p>`
                ul.appendChild(list)
            }
        }
    }
    calculateTotalPrice()
}


function getHtml() {
    let mainDish = ``;
    let sideDish = ``;
    let beverage = ``;
    let dessert = ``;


    menuArray.forEach(function (menuItem) {
        if (menuItem.categorie === "main dish") {
            mainDish += `
            <div class="menu-item">
                <div class="menu-image">
                    <p>${menuItem.emoji}</p>
                </div>
                <div class="menu-item-info">
                    <h3>${menuItem.name}</h3>
                    <p class="ingredients">${menuItem.ingredients}</p>
                    <p class="price">$${menuItem.price}</p>
                </div>
            <button class="menu-button" data-add="${menuItem.id}">+</button>
        </div>`
        } else if (menuItem.categorie === "beverage") {
            beverage += `
            <div class="menu-item">
                <div class="menu-image">
                    <p>${menuItem.emoji}</p>
                </div>
                <div class="menu-item-info">
                    <h3>${menuItem.name}</h3>
                    <p class="ingredients">${menuItem.ingredients}</p>
                    <p class="price">$${menuItem.price}</p>
                </div>
            <button class="menu-button" data-add="${menuItem.id}">+</button>
        </div>`
        } else if (menuItem.categorie === "side dish") {
            sideDish += `
            <div class="menu-item">
                <div class="menu-image">
                    <p>${menuItem.emoji}</p>
                </div>
                <div class="menu-item-info">
                    <h3>${menuItem.name}</h3>
                    <p class="ingredients">${menuItem.ingredients}</p>
                    <p class="price">$${menuItem.price}</p>
                </div>
            <button class="menu-button" data-add="${menuItem.id}">+</button>
        </div>`
        } else if (menuItem.categorie === "dessert") {
            dessert += `
            <div class="menu-item">
                <div class="menu-image">
                    <p>${menuItem.emoji}</p>
                </div>
                <div class="menu-item-info">
                    <h3>${menuItem.name}</h3>
                    <p class="ingredients">${menuItem.ingredients}</p>
                    <p class="price">$${menuItem.price}</p>
                </div>
            <button class="menu-button" data-add="${menuItem.id}">+</button>
        </div>`
        }
    })

    pageHtml += `
    <div class="content-container">
        <h3 class="menu-item-title">Main dishes</h3>
        ${mainDish}
        <h3 class="menu-item-title">Side Dishes</h3>
        ${sideDish}
        <h3 class="menu-item-title">Desserts</h3>
        ${dessert}
        <h3 class="menu-item-title">Beverages</h3>
        ${beverage}
    </div>

    <div id="order-container" class="order-container">
        <h1 class="order-title">Your Order</h1>
                <ul id="ul-items-basket">
                    <li class="basket-items-list-container">
                        <p id="basket-item" class="basket-item"></p>
                        <p id="remove-btn" class="remove-btn"></p>
                        <p id="basket-item-price" class="basket-item-price">$0</p>
                    </li>
                </ul>
        <div class="total-price-container">
            <p class="order-price-total">Total price:</p>
            <p id="order-total-amount" class="order-total-amount"></p>
        </div>
        <button class="btn" data-complete="complete">Complete order</button>
    </div>
        <div id="pay-modal-container" class="pay-modal-container hidden">
            <div class="pay-modal-inner">
                <h1 class="card-details-title">Enter card details</h1>
                <form action="#">
                    <input id="name" class="input-field" type="text" placeholder="Enter your name" required> 
                    <input class="input-field" type="text" placeholder="Enter card number" required> 
                    <input class="input-field" type="text" placeholder="Enter CVV" required> 
                    <input id="pay-button" class="btn" type="submit" value="pay" id="place-order" data-pay="pay" />
                </form>
            </div>
        </div>`;

    return pageHtml;
}

function render() {
    document.getElementById("main-page").innerHTML = getHtml();
}