import {
    menuArray
} from "./data.js";


// render our page using the data.js file and replace the hardcoded data.
// Add eventListeners for all buttons, using event.target
// Add menu discounts
// When complete order, create a popup. (Still need to make and style it)
let pageHtml = ``;
let orderItems = [];

document.getElementById("main-page").onload = render();
document.getElementById("main-page").onload = renderOrderItems();

document.addEventListener("click", function(event){
    if(event.target.dataset.add){
        // console.log(event.target.dataset.add);
        addOrderItems(event.target.dataset.add);
    }
})

function addOrderItems(itemID){
    for(let i = 0; i < menuArray.length; i++){
        if(menuArray[i].id === Number(itemID)){
            orderItems.push(menuArray[i])
        }
    }
    renderOrderItems();
}

function renderOrderItems(){
    let ul = document.getElementById("ul-items-basket");
    if(orderItems.length < 1) {
        document.getElementById("basket-item").textContent = `Select a menu item`;
    } else {
        ul.textContent = ""
        for(let i = 0; i < orderItems.length; i++){
            let list = document.createElement("li");
            list.setAttribute("class", "basket-items-list-container")
            list.innerHTML = `
                <p id="basket-item" class="basket-item">${orderItems[i].name}</p>
                <p id="remove-btn" class="remove-btn">remove</p>
                <p class="basket-item-price">$${orderItems[i].price}</p>`
            ul.appendChild(list)
            }
    }
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

    <div class="order-container">
        <h1 class="order-title">Your Order</h1>
                <ul id="ul-items-basket">
                    <li class="basket-items-list-container">
                        <p id="basket-item" class="basket-item"></p>
                        <p id="remove-btn" class="remove-btn"></p>
                        <p class="basket-item-price">$0</p>
                    </li>
                </ul>
        <div class="total-price-container">
            <p class="order-price-total">Total price:</p>
            <p class="order-total-amount">$0</p>
        </div>
        <button class="order-button">Complete order</button>
    </div>`;
    
    //

    return pageHtml;
    // loop over the array and grab all main dishes and put them inside a variable
    // loop over the array and grab all the side dishes and put them inside a variable
    // loop over the array and grab all the beverages and put them inside a variable. 
    // Main dishes
    // Beverages
}

function render() {
    document.getElementById("main-page").innerHTML = getHtml();
}

