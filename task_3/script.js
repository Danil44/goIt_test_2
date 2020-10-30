"use strict";

const KEY = "18892945-282aea50c4191b1b0301e6513";
const searchForm = document.getElementById("search-form");
let page = 0;
let query = "";
const trigger = document.querySelector(".trigger");
const picturesContainer = document.querySelector('ul');

const observer = new IntersectionObserver(handleLoadMore);

observer.observe(document.querySelector(".trigger"));

const initPicturesModals = () => {
  picturesContainer.addEventListener('click', (event) => {
    event.preventDefault();

    if(event.target.nodeName === 'IMG') {
      basicLightbox.create(event.target.outerHTML).show();
    }
  })
}

const clearPicturesList = () => document.querySelector('ul').innerHTML = '';

const generatePicturesList = (pictures) => {
  const container = document.querySelector(".pictures-list");
  let list = "";
  document.querySelector(".trigger").remove();

  pictures.forEach((picture) => {
    list = list.concat(`
		<li>
			<a href="${picture.largeImageURL}">
				<img
				src="${picture.webformatURL}"
				data-source="${picture.largeImageURL}"
				alt="описание"
				/>
			</a>
		</li>
		`);
  });

  container.insertAdjacentHTML('beforeend', list);

  initPicturesModals();

  setTimeout(
    () =>
      picturesContainer.insertAdjacentElement("afterend", trigger),
    500
  );
};

const handlePictures = async ({query, page}) => {
  const pictures = await fetchPictures(query, page);

  generatePicturesList(pictures);
}

const fetchPictures = async (searchQuery, nextPage = 1) => {
  const response = await fetch(
    `https://pixabay.com/api/?key=${KEY}&q=${searchQuery}&page=${nextPage}&per_page=20`
  );

  if (response.ok) {
    const { hits } = await response.json();

    return hits;
  }
};

const handleSearchPictures = async (event) => {
  event.preventDefault();

  const searchValue = event.target.querySelector("input").value;
  query = searchValue;
  page = 1;

  clearPicturesList();
  handlePictures({query});
};

searchForm.addEventListener("submit", handleSearchPictures);

function handleLoadMore(entries) {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      handlePictures({query, page: page += 1});
    }
  });
}