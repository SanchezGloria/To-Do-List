'use strict';

const searchInput = document.querySelector('.app-header-search');

const listArray = [];

function filterList(ev) {
  console.log(ev.currentTarget.value);
  // let input = ev.currentTarget.value;
  // console.log(listArray);

  // const listFiltered = listArray.filter((title) => {
  //   return title.toUpperCase().includes(input.value.toUpperCase());
  // });
  // return listFiltered;
}

searchInput.addEventListener('change', filterList);
