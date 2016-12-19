$(document).ready(function() {
 //Instantiate the Bootstrap carousel
  //In the future make a user site that can input the spices from the site
  var spices_plants = ["cilantro","basil","thyme","rosemary","sage","oregano","tarragon"];
  var spices_seeds = ["cumin","fennel","coriander","mustard","peppercorn","nutmeg"];
  var price_plants = ["1.30","1.50","1.40","1.50","1.30","1.30","1.60"];
  var price_seeds = ["2.30","2.70","2.60","3.20","3.10","4.30"];
  var images_plants = ["cilantro1.jpg","basil-bsp.jpg","thyme.jpg","Rosemary.jpg","Sage.jpg",
     "Oregano2.jpg","tarragon.jpg"];
  var images_seeds = ["cumin1.jpg","fennel1.jpg","coriander1.jpg","mustard1.jpg",
     "peppercorn1.jpg","nutmeg1.jpg"];
  var windowLoc = $(location).attr('pathname');
  console.log(windowLoc);
  switch(windowLoc){      
  case "/products":
    var myStore = new Store("SpiceRack");
    myStore.startStore();
    runCarousel();
    startEventListeners();
    // console.log(myStore.inventory);
    console.log(myStore.inventory.plantSpices);
    break;
  case "/order":
    myStore = new Store("order store");
    cart = localStorage.getItem('cart');
    myStore.cart = JSON.parse(cart);   
    console.log(myStore) 
    myStore.displayOrderSummary();
    break;
  }  
 
  function Store(name) {
    this.name = name;
    this.inventory = null;
    this.customers = [];
    this.cart = null;
    this.orders = []; //this would be used when order submitted
    this.startStore = function() {
      this.cart = new Cart("NewCustomer");
      this.inventory = new Inventory();
      var spices = this.recordSpices(spices_plants,price_plants,images_plants,"plant");
      this.inventory.addToPlantSpices(spices);
      var spices = this.recordSpices(spices_seeds,price_seeds,images_seeds,"seed");
      this.inventory.addToSeedSpices(spices);
      this.inventory.makeTotalArray();
      this.makeProductPage(this.inventory.totalSpices);
    }

    this.recordSpices = function(spiceType,priceType,imageType,type) {
      var spices = [];
      for (var i = 0; i < spiceType.length; i++) {
        var mySpice = new Spice(spiceType[i],priceType[i],imageType[i],type);
        spices.push(mySpice);
      }
      return spices;
    }

    this.makeProductPage = function(spices) {
      //parentDiv should be the inner Carousel
      var parentClass = $(".carousel-inner");
      for (var j = 0; j < parentClass.length; j++) {
        parentDiv = parentClass[j];
        var spiceCat = spices[j];
        this.makeCarouselDiv(spiceCat);
      }
    }
    
    this.makeCarouselDiv = function(spiceCat) {
      for (var i = 0; i < spiceCat.length; i++) {
          var divSpice = parentDiv.appendChild(document.createElement("div"));
          if (i == 0) {
           divSpice.className = "item active";
          }
          else {
           divSpice.className = "item";
          }
          //divSpice.innerText = spices[i].name;
          var inDivSpice = divSpice.appendChild(document.createElement("div"));
          inDivSpice.className = "col-md-4 item-spice";
          var imgDiv = inDivSpice.appendChild(document.createElement("img"));
          imgDiv.className = "img-responsive";
          imgDiv.src = "images/products/"+spiceCat[i].jpgPhoto;
          var pDiv = inDivSpice.appendChild(document.createElement("p"));
          pDiv.innerText = spiceCat[i].name+":  $"+spiceCat[i].price;
          var btnDiv = inDivSpice.appendChild(document.createElement("input"));
          btnDiv.type = "button";
          btnDiv.className = "btnDiv";
          btnDiv.id = spiceCat[i].name;
          btnDiv.value = "Add to Cart";
          var textDiv = inDivSpice.appendChild(document.createElement("input"));
          textDiv.type = "text";
          textDiv.value = "enter amount";
          textDiv.className = "textDiv text-"+spiceCat[i].name;
          $("text-"+spiceCat[i].name).focus();
          // textDiv.id = "text-"+spiceCat[i].name;
      }
    } 
    this.addToOrders = function(order) {
      this.orders.push(order);
    }

    this.displayOrderSummary = function() {
      var table = document.getElementsByClassName("order-table")[0];
      console.log(table);
      var total = 0
      for (var i = 0; i < this.cart.numOrders; i++) {
        var row = table.insertRow(i+1);
        var cell0 = row.insertCell(0);
        cell0.innerText = this.cart.spiceOrders[i].name;
        var cell1 = row.insertCell(1);
        cell1.innerText = this.cart.spiceOrders[i].amount+" oz";
        var cell2 = row.insertCell(2);
        cell2.innerText = "$"+this.cart.spiceOrders[i].price.toFixed(2);
        var cell3 = row.insertCell(3);
        cell3.innerText = "$"+this.cart.spiceOrders[i].total.toFixed(2);
        total += this.cart.spiceOrders[i].total;
      }
      var row = table.insertRow(this.cart.numOrders+1);
      var cell0 = row.insertCell(0);
      cell0.innerText = "Total";
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      var cell3 = row.insertCell(3);
      cell3.innerText = "$"+total.toFixed(2);
      console.log("in order summary");
      console.log(this.cart);
    }
  }

  function Spice(name,price,image,type) {
    this.name = name;
    this.price = price;
    this.type = type;
    this.jpgPhoto = image;
  }

  function SpiceOrder(name,amt) {
    this.name = name;
    this.amount = amt;
    this.total = 0;
    this.price = 0;
    this.validAmount = function() {
      return ((this.amount > 0) && (this.amount < 20));
    }
    this.total = function(price) {
      return price*this.amount;
    }
  }

  function Cart(name) {
    this.custID = name;
    this.spiceOrders = [];
    this.numOrders = 0;
    this.addToCart = function(order) {
      this.spiceOrders.push(order);
      this.numOrders += 1;
    }
  }

  function Inventory() {
    this.plantSpices = [];
    this.seedSpices = [];
    this.totalSpices = [];
    this.numPlant = 0;
    this.numSeed = 0;
    this.numTotal = 0;
    this.addToPlantSpices = function(spices) {
       this.plantSpices = this.plantSpices.concat(spices);
       this.numPlant += spices.length;
    }
    this.addToSeedSpices = function(spices) {
       this.seedSpices = this.seedSpices.concat(spices);
       this.numSeed += spices.length;
    }
    this.makeTotalArray = function() {
      this.totalSpices = [this.plantSpices, this.seedSpices]
      console.log(this.totalSpices);
    }
    this.getSpiceByName = function(name) {
      for (var i = 0; i < this.numPlant; i++) {
        if (this.plantSpices[i].name == name) {
          return this.plantSpices[i];
        }
      }
      for (var i = 0; i < this.numSeed; i++) {
        if (this.seedSpices[i].name == name) {
          return this.seedSpices[i];
        }
      }
    }
  }
  
  function Customer(idNum) {
    this.idNum = idNum;
    this.cart = null;
  }

  function startEventListeners() {
    //Using event delegation. The listener is on the parent of the buttons
    var plantSpices = document.getElementsByClassName("carousel-inner")[0];
    if (plantSpices) { //add listener only if div exists
      plantSpices.addEventListener("click", function(e1) {
        if (e1.target.type == "button") {
          addSpiceToCart(e1.target.id)
        }
      });
    }
    var seedSpices = document.getElementsByClassName("carousel-inner")[1];
    if (seedSpices) {
      seedSpices.addEventListener("click", function(e2) {
        if (e2.target.type == "button") {
          addSpiceToCart(e2.target.id);
        }
      });
    }
  }
  
  function addSpiceToCart(spiceName) {
      var amt = $(".text-"+spiceName).val();
      console.log("text-"+spiceName);
      console.log("amount "+amt);
      var textf = document.getElementsByClassName("text-"+spiceName)[0];
      var newOrder = new SpiceOrder(spiceName,amt);
      console.log(newOrder.validAmount());     
      if (newOrder.validAmount()) {
        spicePrice = myStore.inventory.getSpiceByName(spiceName).price;
        newOrder.total = parseFloat(spicePrice)*amt;
        newOrder.price = parseFloat(spicePrice);
        myStore.cart.addToCart(newOrder);
        localStorage.setItem('cart',JSON.stringify(myStore.cart));
      }
      else {
         alert("Amount must be between 1 and 20");
      }
  }

  function runCarousel() {
    $('.multi-item-carousel').carousel({
     interval: false
    });

// for every slide in carousel, copy the next slide's item in the slide.
// Do the same for the next, next item.
    $('.multi-item-carousel .item').each(function(){
      var next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));
  
      if (next.next().length>0) {
        next.next().children(':first-child').clone().appendTo($(this));
      } else {
      $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
      }
    });
  }

  //running the other pages

  $('#pullquote').fadeIn(5000);
    $('#ginger').fadeIn(8000);
  $('#pullquote2').fadeIn(5000);



  $('.scroll_bar').mouseenter(function() {
    $('.scroll_bar').css('display', 'none');
    $('.footer').slideDown(500, function() {});
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

//var mainPage = new dropDownMenu();
