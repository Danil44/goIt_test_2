"use strict";

const KEY = "18892945-282aea50c4191b1b0301e6513";
const searchForm = document.getElementById("search-form");
let page = 0;
let query = "";
let loadedPictures = [];
const trigger = document.querySelector(".trigger");

const observer = new IntersectionObserver(scroll);

observer.observe(document.querySelector(".trigger"));

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

  container.innerHTML = list;

  setTimeout(
    () =>
      document.querySelector("ul").insertAdjacentElement("afterend", trigger),
    500
  );
};

const fetchPictures = async (searchQuery, nextPage = 1) => {
  const response = await fetch(
    `https://pixabay.com/api/?key=${KEY}&q=${searchQuery}&page=${nextPage}&per_page=20`
  );

  if (response.ok) {
    const { hits } = await response.json();

    loadedPictures.push(...hits);
  }
};

const handleSearchPictures = async (event) => {
  event.preventDefault();
  const searchValue = event.target.querySelector("input").value;
  query = searchValue;
  loadedPictures = [];
  page = 1;

  await fetchPictures(searchValue);

  generatePicturesList(loadedPictures);
};

searchForm.addEventListener("submit", handleSearchPictures);

function scroll(entries) {
  entries.forEach(async (entry) => {
    if (entry.intersectionRatio > 0) {
      await fetchPictures(query, (page += 1));
      generatePicturesList(loadedPictures);
    }
  });
}
