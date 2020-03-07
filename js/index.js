const matches = document.querySelector('.matches');
const matchesBurger = document.querySelector('.matches-burger');
const innerList = document.querySelector('.inner-list');
const innerListBurger = document.querySelector('.inner-list-burger');
const burgerButton = document.querySelector('.burger-button');
const burger = document.querySelector('.burger-menu');

burgerButton.addEventListener('click', () => burger.classList.toggle('burger-menu-block'));

matches.addEventListener('mouseenter', () => innerList.classList.toggle('flex'));

matchesBurger.addEventListener('mouseenter', () => innerListBurger.classList.toggle('flex'));