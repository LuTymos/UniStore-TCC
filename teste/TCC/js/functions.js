
$('.slider').slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });

  
  var rotateDegrees = 45;
  $('.btn-menu').click(function(){
    $('.menu').slideToggle()
    rotateDegrees += 45;
    $(".btn-menu").css("transform","rotate(" + rotateDegrees + "deg)");
    })