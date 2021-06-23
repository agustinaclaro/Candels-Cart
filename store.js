
//$(document).ready(function () {
let selectedItems = [];
const list = $('#cartList');
const totalPrice = $('#total');

$('.add-btn-js').click(function () {
    const productClicked = {};
    productClicked.title = $(this).parent().find('.card-title').text();
    productClicked.price = $(this).parent().find('.card-text').text();
    productClicked.id = $(this).parent().parent().attr('id')
    productClicked.quantity = 1;

    selectedItems = toggleArrayelements(productClicked, selectedItems);

    changeButtonStyle($(this));

    reRender();
});

function changeButtonStyle(btn) {
    const currentLabel = btn.text();
    if (currentLabel === "Añadir al carrito") {
        btn.text("Remover de carrito")
        btn.css("background-color", "red")
    } else {
        btn.text("Añadir al carrito")
        btn.css("background-color", "#81775c")
    }
}

function toggleArrayelements(element, array) {
    let newArray = [...array];
    const isInArray = Boolean(newArray.find(function (item) {
        return item.id === element.id

    }))
    if (isInArray) {
        newArray = newArray.filter(function (item) {
            return item.id !== element.id
        })

    } else {
        newArray.push(element)

    }
    return newArray
}

function getTotal(selectedItems) {
    let total = 0;
    selectedItems.forEach(function (item) {
        total += parseInt(item.price * item.quantity);
    })
    return total
}

function incrementValue(itemId) {
    const currentItemValue = selectedItems.find(function (item) {
        return item.id === itemId
    });

    if (currentItemValue.quantity <10) {
        currentItemValue.quantity++
    }
    reRender();
}

function decrementValue(itemId) {

    const currentItem = selectedItems.find(function (item) {
        return item.id === itemId
    });

    if (currentItem.quantity > 1) {
        currentItem.quantity -= 1
    }

    reRender();
}


function subTotal(quantity, price) {

    let subTotal = 0;
    subTotal += parseInt(price * quantity);
    console.log(subTotal)

    return subTotal
}

function reRender() {
    list.empty();

    selectedItems.forEach(function (item) {
        list.append(`
                <li>
                    ${item.title} - $ ${item.price}
                    <div class="btnSumaResta">
                        <input type="button" onclick="decrementValue('${item.id}')" value="-">
                        <input type="text" name="quantity" value="${item.quantity}" maxlength="2" max="10" size="1" id="number" disabled >
                        <input type="button" onclick="incrementValue('${item.id}')" value="+" >
                    </div>
                
                    <div class="subtotaTxt">
                    <label>Subtotal: </label> <label id="subTotal" class="currency">${subTotal(item.price, item.quantity)}</label><br> 
                    <div>
                </li>
                `);
    });
    totalPrice.text(getTotal(selectedItems))
}