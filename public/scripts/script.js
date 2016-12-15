// Instantiate the Bootstrap carousel
$(document).ready(function() {
 
  //In the future make a user site that can input the spices from the site
  var spices_plants = ["cilantro","basil","thyme","rosemary","sage","oregano","tarragon"];
  var spices_seeds = ["cumin","fennel","coriander","mustard","peppercorn","nutmeg"];
  var price_plants = ["1.30","1.50","1.40","1.50","1.30","1.30","1.60"];
  var price_seeds = ["2.30","2.70","2.60","3.20","3.10","4.30"];
  var images_plants = ["cilantro1.jpg","basil-bsp.jpg","Rosemary.jpg","Sage.jpg",
     "Oregano2.jpg","tarragon.jpg"];
  var images_seeds = ["cumin1.jpg","fennel1.jpg","coriander1.jpg","mustard1.jpg",
     "peppercorn1.jpg","nutmeg1.jpg"];
  
  var myStore = new Store("SpiceRack");
  myStore.startStore();
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
  console.log(myStore.inventory);
  console.log(myStore.inventory.plantSpices);
 
  function Store(name) {
    this.name = name;
    this.inventory = null;
    this.customers = [];
    this.startStore = function() {
      this.inventory = new Inventory();
      var spices = this.recordSpices(spices_plants,price_plants,images_plants,"plant");
      this.inventory.addToPlantSpices(spices);
      var spices = this.recordSpices(spices_seeds,price_seeds,images_seeds,"seed");
      this.inventory.addToSeedSpices(spices);
      this.makeProductPage(this.inventory.seedSpices);
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
      var parentDiv = $("#theCarousel1").children()[0];
      console.log("in product page");
      console.log(parentDiv.className);
      for (var i = 0; i < spices.length; i++) {
        var divSpice = parentDiv.appendChild(document.createElement("div"));
        if (i == 0) {
          divSpice.className = "item active";
        }
        else {
          divSpice.className = "item";
        }
        //divSpice.innerText = spices[i].name;
        var inDivSpice = divSpice.appendChild(document.createElement("div"));
        inDivSpice.className = "col-md-4";
        inDivSpice.innerText = spices[i].name;
        var imgDiv = inDivSpice.appendChild(document.createElement("img"));
        imgDiv.className = "img-responsive";
        imgDiv.src = "images/products/"+spices[i].jpgPhoto;
      }
      console.log(parentDiv);
    }

    this.addCustomer = function(customer) {
      this.customers.push(customer);
    }
  }

  function Spice(name,price,image,type) {
    this.name = name;
    this.price = price;
    this.type = type;
    this.jpgPhoto = image;
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
  }
  
  function Customer(idNum) {
    this.idNum = idNum;
    this.cart = null;
  }

  function Cart(name) {
    this.name = name;
    this.spices = [];
    this.numItems = 0;
    this.addToCart = function(spice) {
       this.spices.push(spice);
       this.numItems += 1;
    }
  }
});