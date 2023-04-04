const toggleBtn = document.querySelector('.toggle');
const toggleBtnIcon = document.querySelector( '.toggle i');
const dropDownMenu = document.querySelectorAll('.dropdown, .nav');

toggleBtn.onclick = function() {
  dropDownMenu.forEach(item => {
    item.classList.toggle("open");
  });
  const isOpen = dropDownMenu.classList.contains(' open');
  toggleBtnIcon.classList.toggle("fa-xmark");
}