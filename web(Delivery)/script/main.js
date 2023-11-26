$(document).ready(function () {
    var totalPrice = 0;
    var itemQuantity = {}; 
    var itemTotal = {}; 
    var taxRate = 0.01; 

    function updateTotalPrice() {
        var totalBeforeTax = 0;
        $.each(itemTotal, function (itemName, total) {
            totalBeforeTax += total;
        });

        var tax = totalBeforeTax * taxRate;
        totalPrice = totalBeforeTax + tax;

        $('.item-total').text(totalPrice.toFixed('id-ID'));
        $('.pajak').text(tax.toFixed('id-ID'));
        $('.total-tanpa-pajak').text(totalBeforeTax.toFixed('id-ID'));
        $('#total-harga').text('Rp. ' + totalPrice.toFixed('id-ID'));
    }

    function addOrUpdateItem(itemName, itemPrice, itemPriceText) {
        if (!itemQuantity[itemName]) {
            itemQuantity[itemName] = 1;
            itemTotal[itemName] = itemPrice;
        } else {
            itemQuantity[itemName]++;
            itemTotal[itemName] += itemPrice;
        }

        var existingItem = $('#list-harga').find('li:contains("' + itemName + '")');

        if (existingItem.length) {
            existingItem.find('.item-quantity').text('Total: ' + itemQuantity[itemName]);
            existingItem.find('.item-total').text(itemTotal[itemName].toFixed('id-ID'));
        } else {
            var listItem = $('<li class="list-group-item d-flex justify-content-between align-items-center">' +
                itemName + ' ' + itemPriceText + ' <span class="item-quantity">' + itemQuantity[itemName] + '</span>' +
                '<span><a class="btn btn-dark" href="#" role="button" onclick="removeItem(this, ' + itemPrice + ', \'' + itemName + '\')" style="background: transparent; border: none;">' +
                '<img src="image/trash.png" style="width: 20px; height: 20px;"></a></span>' +
                '</li>');
            $('#list-harga').append(listItem);
        }
    }

    $('.card').click(function () {
        var itemName = $(this).find('.card-title').text();
        var itemPriceText = $(this).find('.card-text').text();
        var itemPrice = parseFloat(itemPriceText.replace('RP. ', '').replace('.', '').replace(',', '.'));

        if (!isNaN(itemPrice)) {
            addOrUpdateItem(itemName, itemPrice, itemPriceText);
            updateTotalPrice();
        }
    });

    window.removeItem = function (element, itemPrice, itemName) {
        var listItem = $(element).closest('li');
        totalPrice -= itemTotal[itemName];
        itemQuantity[itemName]--;
        itemTotal[itemName] -= itemPrice;

        if (itemQuantity[itemName] <= 0) {
            listItem.remove();
            itemQuantity[itemName] = 0;
            itemTotal[itemName] = 0;
        } else {
            listItem.find('.item-quantity').text('Total: ' + itemQuantity[itemName]);
            listItem.find('.item-total').text(itemTotal[itemName].toFixed('id-ID'));
        }

        updateTotalPrice();
    };
});
