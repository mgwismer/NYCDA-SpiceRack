<<<<<<< HEAD
$(document).ready(function(){
    $('#pullquote').fadeIn(5000);
});

$(document).ready(function(){
    $('#ginger').fadeIn(8000);
});
=======
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
>>>>>>> layout
