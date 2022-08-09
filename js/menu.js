var rotateDegrees = 45;
$('.btn-menu').click(function(){
  $('.menu').slideToggle()
  rotateDegrees += 45;
  $(".btn-menu").css("transform","rotate(" + rotateDegrees + "deg)");
  })