
function dropDownMenu () {
	
	this.shoppingCart = document.getElementsByClassName('glyphicon glyphicon-shopping-cart');
	this.dropDownCart = document.getElementsByClassName('dropdown_shop_cart');

	this.shoppingCart.addEventListener('click', function () {
		this.dropDownCart.style.display = 'block';
	})
}