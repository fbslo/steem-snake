


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

    if (window.confirm("You have " + size + " points! Would you like to get paid?"))
{
window.location.href='http://fbslo.net/steemsnake/hard/submit.html?r=' + size;
};



    die();
  }
}







function draw() {
  screenclear();
  drawsnake();
  drawfood();
}
