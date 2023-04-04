const toggleBtn = document.querySelector('.toggle');
const toggleBtnIcon = document . querySelector( '.toggle i');
const dropDownMenu = document. querySelector('.dropdown');

toggleBtn.onclick = function () {
dropDownMenu.classList.toggle("open");
  const isOpen = dropDownMenu.classList.contains(' open');
  
  toggleBtnIcon.classList.toggle("fa-xmark");
}