const canvas = document.getElementById("jsCanvas");
canvas.width = 1000;
canvas.height = 1000;

const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const paintMode = document.getElementById("jsPaintMode");

ctx.strokeStyle = "black"; // 기본 색상
ctx.lineWidth = 2.5; // 기본 굵기

let painting = false;
let filling = false;

function paintingTrue() {
	painting = true;
}
function paintingFalse() {
	painting = false;
}

function mouseMoving(event) {
	const x = event.offsetX;
	const y = event.offsetY;
	if (!painting) {
		ctx.beginPath();
		ctx.moveTo(x, y);
	} else {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

function mouseDrag(event) {
	paintingTrue();
}

function mouseDragStop(event) {
	paintingFalse();
}

function changeColorClick(event) {
	const selectedColor = event.target.style.backgroundColor;
	ctx.strokeStyle = selectedColor;
}

function rangeChange(event) {
	const changedRange = event.target.value;
	ctx.lineWidth = changedRange;
}

function changeMode(event) {
	if (filling === true) {
		filling = false;
		paintMode.innerText = "Fill";
	} else {
		filling = true;
		paintMode.innerText = "Paint";
	}
}

if (canvas) {
	canvas.addEventListener("mousemove", mouseMoving);
	canvas.addEventListener("mousedown", mouseDrag);
	canvas.addEventListener("mouseup", mouseDragStop);
	canvas.addEventListener("mouseleave", mouseDragStop);
}

Array.from(colors).forEach((color) =>
	color.addEventListener("click", changeColorClick)
);

if (range) {
	range.addEventListener("input", rangeChange);
}

if (paintMode) {
	paintMode.addEventListener("click", changeMode);
}
