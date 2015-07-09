function createBubble(){
    var randomLeft = Math.floor(Math.random() * 85) + 1;
        var getBubbleSize = ["large","small"];
        var rand = Math.random();
        rand *= getBubbleSize.length;
        var bubbleSize = getBubbleSize[ Math.floor(rand)];
        var randomOpacity = Math.floor(Math.random() * (9 - 8 + 1)) + 8;
        var scaleValue = Math.floor(Math.random() * (9 - 5 + 1)) + 5;
        var randomScale = "scale(0." + scaleValue +")";
        var verticalSpeed = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
        var frequency = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        var randomAnimation = "moveclouds " + verticalSpeed + "s linear infinite, sideWays " + frequency +"s  ease-in-out infinite alternate";
        var randomBubbleYvalue = Math.floor(Math.random() * (500 - 0 + 1)) + 0;//for < ie9
   

    if ($('html').hasClass("cssanimations")){//css animate
            $("#bubbles").append('<div class="bubble '+bubbleSize+'" style="left:'+randomLeft+'%;bottom: '+randomBubbleYvalue+'px; opacity:0.'+randomOpacity+';transform:'+randomScale+';-moz-transform:'+randomScale+';-webkit-transform:'+randomScale+';-webkit-animation:'+randomAnimation+';animation:'+randomAnimation+';-moz-animation:'+randomAnimation+';--o-animation:'+randomAnimation+';"></div>');
    }
    else{//jquery animation fallback for older browsers (ie 9 and below)
        $('<div class="bubble '+bubbleSize+'" style="left:'+randomLeft+'%;bottom: '+(randomBubbleYvalue-500)+'px; opacity:0.'+randomOpacity+';"></div>')
            .appendTo($("#bubbles"))
            .animate(
                {
                    bottom: "+=1200"
                },
                verticalSpeed*1800, 
                function(){
                    $(this).remove();
                    createBubble();
                }
            );
   }
}


function startBubbles(){
    for (i = 0; i < 47; i++) { //create bubble every .5 seconds
          createBubble();
    }

}

window.onload = function(){
    startBubbles()
}

$( "#bubbles" ).on( "click", ".large", function(){
    burstBubble(this, true);
});

$( "#bubbles" ).on( "click", ".small", function(){
    burstBubble(this, true);
});


function burstBubble(bubbleObj, doNumberGeneration){
    var bubble = $(bubbleObj);
    $(this).css("transform","scale(1.1)");
    setTimeout(function(){
        if($(bubble).hasClass("large")){
            $(bubble).css("background", "url(images/large-bubble-burst.png)");
            setTimeout(function(){ 
                $(bubble).css("opacity","0");
                $(bubble).remove();
            }, 80);
        }
        else{
            $(bubble).css("background", "url(images/small-bubble-burst.png)");
            setTimeout(function(){ 
                $(bubble).css("opacity","0");
                $(bubble).remove();
            }, 80);
        }
    }, 20);
    if(doNumberGeneration){
        generateNextRandomNumber(); 
    }
    
}

function burstAllBubbles(){
    $( "#bubbles .bubble").each(function(){
        burstBubble(this, false);
    });
}

//get numbers
var numbersArray = Array();
var tempRandomNumber = -1;

$("#get-random-numbers").on("click", function () {
    
    //Reinit the array if it's already full
    if(numbersArray.length > 0){
        numbersArray = Array();   
    }
    
    //populate the array with 6 random numbers
    for (var i = 0; i < 6; i++) {
        //Keep generating a number until we get a new one
        do {
            tempRandomNumber = getRandomInt(1, 47);
        }
        while ($.inArray(tempRandomNumber, numbersArray) != -1);

        //Add the number to the array
        numbersArray.push(tempRandomNumber);

    }
    
    //sort the array
    numbersArray.sort(function(a,b){return a - b});
    
    //populate the front-end (this will be images eventually)
    $.each(numbersArray, function (i, val) {
        $("#numbers li").eq(i).find("span").text(val);
    });
});

$("#get-single-random-number").on("click", function() {
   generateNextRandomNumber(); 
});


$("#clear-numbers").on("click", function(){
    numbersArray = Array();
    //clear the front-end numbers
    for (var i = 0; i < 6; i++) {
        $("#numbers li").empty();
        burstAllBubbles();
        startBubbles();
        $('#play-numbers').removeClass('active');
        $('#clear-numbers').removeClass('active');

    }
});

function generateNextRandomNumber(){
    if(numbersArray.length < 6){
        //Keep generating a number until we get a new one
        do {
            tempRandomNumber = getRandomInt(1, 47);
        }
        while ($.inArray(tempRandomNumber, numbersArray) != -1);
        
        //Add the number to the array
        var newArraySize = numbersArray.push(tempRandomNumber);

        if (newArraySize == 6){
            $('#play-numbers').addClass('active');
            $('#clear-numbers').addClass('active');
            burstAllBubbles();
        }
        $("#numbers li").eq(newArraySize-1).empty();
        //populate the front-end (this will be images eventually)
        $("#numbers li").eq(newArraySize-1).append(getImageForNumberObj(tempRandomNumber));
    }
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Gradient Text

$(".gradient").pxgradient({

  step: 10, // Step Color. The smaller the number, the greater the load. Default: 10

  colors: ["#e6f7fb", "#c5e9f1"], // an array of hex colors.

  dir: "y" // gradient direction. "x" - horizontal,  "y" - vertical

});



//Get balls from hubspot
  function getImageForNumberObj(number){
    var hubspotCdnUrl = "images/";
    return(number);
  }



