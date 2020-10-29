'use strict';

const createBoxes = (amount) => {
	const boxesContainer = document.getElementById('boxes');
	const fragment = document.createDocumentFragment();
	let boxSize = 30;


	for(let index = 0; index < amount; index++) {
		const div = document.createElement('div');
		const rgbPoint = () => Math.floor(0 + Math.random() * (255 - 0));

		div.style.width = `${boxSize}px`;
		div.style.height = `${boxSize}px`;
		div.style.backgroundColor = `rgb(${rgbPoint()},${rgbPoint()},${rgbPoint()})`;

		fragment.appendChild(div);

		boxSize += 10;
	}

	boxesContainer.appendChild(fragment);
}

const destroyBoxes = () => {
	document.getElementById('boxes').innerHTML = '';
}

const createButton = document.querySelector('button[data-action="create"]');
const destroyButton = document.querySelector('button[data-action="destroy"]');

const handleBoxesCreate = () => {
	const amount = document.querySelector('input').value;

	createBoxes(amount)
}

createButton.addEventListener('click', handleBoxesCreate);
destroyButton.addEventListener('click', destroyBoxes);