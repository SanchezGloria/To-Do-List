'use strict';

const getApiData = () => {
  return (
    fetch('./api/board.json')
      // 'http//localhost:3000/api/board.json'
      .then((response) => response.json())
  );
};

export default {
  getApiData: getApiData,
};
