// Instantiate the Bootstrap carousel
$(document).ready(function() {
 
  //In the future make a user site that can input the spices from the site
  var spices_plants = ["cilantro","basil","thyme","rosemary","sage","oregano","tarragon"];
  var spices_seeds = ["cumin","fennel","coriander","mustard","peppercorn","nutmeg"];
  var price_plants = ["1.30","1.50","1.40","1.50","1.30","1.30","1.60"];
  var price_seeds = ["2.30","2.70","2.60","3.20","3.10","4.30"];
  var images_plants = ["cilantro1.jpg","basil-bsp.jpg","thyme.jpg","Rosemary.jpg","Sage.jpg",
     "Oregano2.jpg","tarragon.jpg"];
  var images_seeds = ["cumin1.jpg","fennel1.jpg","coriander1.jpg","mustard1.jpg",
     "peppercorn1.jpg","nutmeg1.jpg"];
  
  var myStore = new Store("SpiceRack");
  myStore.startStore();
  runCarousel();
  startEventListeners();
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
      console.log("in product page");
      console.log(parentClass);
      console.log(spices);
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
          inDivSpice.className = "col-md-4";
          var imgDiv = inDivSpice.appendChild(document.createElement("img"));
          imgDiv.className = "img-responsive";
          imgDiv.src = "images/products/"+spiceCat[i].jpgPhoto;
          var pDiv = inDivSpice.appendChild(document.createElement("p"));
          pDiv.innerText = spiceCat[i].name+"  "+spiceCat[i].price;
          var btnDiv = inDivSpice.appendChild(document.createElement("input"));
          btnDiv.type = "button";
          btnDiv.className = "btnDiv";
          btnDiv.value = "Add to Cart";
          var textDiv = inDivSpice.appendChild(document.createElement("input"));
          textDiv.type = "text";
          textDiv.value = "# of oz.";
          textDiv.className = "textDiv";
      }
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
    this.makeTotalArray = function() {
      this.totalSpices = [this.plantSpices, this.seedSpices]
      console.log(this.totalSpices);
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

  function startEventListeners() {
    //Using event delegation. The listener is on the parent of the buttons
    var plantSpices = document.getElementsByClassName("carousel-inner")[0];
    plantSpices.addEventListener("click", function(e1) {
      console.log("button clicked");
      console.log(e1.target);
    });
    var seedSpices = document.getElementsByClassName("carousel-inner")[1];
    seedSpices.addEventListener("click", function(e2) {
      console.log(e2.target);
    });
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
});