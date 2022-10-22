import {
    menuArray
} from "./data.js";

// render our page using the data.js file and replace the hardcoded data.
// Add eventListeners for all buttons, using event.target
// Add menu discounts
// When complete order, create a popup. (Still need to make and style it)
// Add remaining menu items in data.js

function getHtml() {
    let pageHtml = ``;
    let mainDish = ``;
    let sideDish = ``;
    let beverage = ``;
    let dessert = ``;


    menuArray.forEach(function (menuItem) {
        if (menuItem.categorie === "main dish") {
            mainDish += `
            <div class="menu-item">
                <div class="menu-image">
                    <p class="menu-imagee">${menuItem.emoji}</p>
                </div>
                <div class="menu-item-info">
                    <h3>${menuItem.name}</h3>
                    <p class="ingredients">${menuItem.ingredients}</p>
                    <p class="price">${menuItem.price}</p>
                </div>
            <button class="menu-button">+</button>
        </div>`
        } else if (menuItem.categorie === "beverage") {
            beverage += `
            <div class="menu-item">
                <div class="menu-image">
                    <p class="menu-imagee">${menuItem.emoji}</p>
                </div>
                <div class="menu-item-info">
                    <h3>${menuItem.name}</h3>
                    <p class="ingredients">${menuItem.ingredients}</p>
                    <p class="price">${menuItem.price}</p>
                </div>
            <button class="menu-button">+</button>
        </div>`
        } else if (menuItem.categorie === "side dish") {
            sideDish += `
            <div class="menu-item">
                <div class="menu-image">
                    <p class="menu-imagee">${menuItem.emoji}</p>
                </div>
                <div class="menu-item-info">
                    <h3>${menuItem.name}</h3>
                    <p class="ingredients">${menuItem.ingredients}</p>
                    <p class="price">${menuItem.price}</p>
                </div>
            <button class="menu-button">+</button>
        </div>`
        } else if (menuItem.categorie === "dessert") {
            dessert += `
            <div class="menu-item">
                <div class="menu-image">
                    <p class="menu-imagee">${menuItem.emoji}</p>
                </div>
                <div class="menu-item-info">
                    <h3>${menuItem.name}</h3>
                    <p class="ingredients">${menuItem.ingredients}</p>
                    <p class="price">${menuItem.price}</p>
                </div>
            <button class="menu-button">+</button>
        </div>`
        }
    })

    pageHtml += `
    <div class="content-container">
        <h3 class="menu-item-title">Main dishes</h3>
        ${mainDish}
        <h3 class="menu-item-title">Beverages</h3>
        ${beverage}
    </div>

    <div class="order-container">
        <h1 class="order-title">Your Order</h1>
        <p>Nothing is placed in your basket yet. Please select something from the menu.</p>
        <hr>
        <p>Total price:</p>
        <button class="order-button">Complete order</button>
    </div>`;
    

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

render()