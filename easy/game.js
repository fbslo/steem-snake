


function gamerun() {
  init();
}

function step(){
  update();
  draw();
}



function update() {
  if (!movesnake()) {
    var txt;

    if (window.confirm("You have " + size/2 + " points! Would you like to get paid?"))
{
window.location.href='http://fbslo.net/steemsnake/easy/submit.html?r=' + size;
};



    die();
  }
}







function draw() {
  screenclear();
  drawsnake();
  drawfood();
}
