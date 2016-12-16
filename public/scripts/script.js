$(document).ready(function() {

/*$('.footer')*/

$('.scroll_bar').mouseenter(function() {
	$('.scroll_bar').css('display', 'none');
	$('.footer').slideDown(500, function() {		
	});
});


});



function dropDownMenu () {
	
	this.clickCounter = 0

	this.clickDown = function () {
			console.log(this.clickCounter);
		if (this.clickCounter % 2 === 0) {
			document.getElementsByClassName('dropdown_shop_cart')[0].style.display = 'block';
		}
		else if (this.clickCounter === 1 || this.clickCounter % 2 === 1) {
			document.getElementsByClassName('dropdown_shop_cart')[0].style.display = 'none';
		}
		this.clickCounter = this.clickCounter + 1;
	}
}

var mainPage = new dropDownMenu();