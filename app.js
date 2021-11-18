const canvas = document.getElementById("jsCanvas");
canvas.width = 1000;
canvas.height = 1000;

const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const paintMode = document.getElementById("jsPaintMode");
const saveButton = document.getElementById("jsSave");

ctx.fillStyle = "white"; // 배경 기본 색상
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "black"; // 선택된 채우기 기본 색상
ctx.strokeStyle = "black"; // 기본 색상
ctx.lineWidth = 2.5; // 기본 굵기

let painting = false;
let filling = false;

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
	painting = true;
}

function mouseDragStop(event) {
	painting = false;
}

function changeColorClick(event) {
	const selectedColor = event.target.style.backgroundColor;
	ctx.strokeStyle = selectedColor;
	ctx.fillStyle = selectedColor;
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

function mouseClick(event) {
	if (filling) {
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
}

function mouseRightClick(event) {
	event.preventDefault();
	alert("캔버스에서는 우클릭을 사용할 수 없습니다!");
}

function saveClick(event) {
	const image = canvas.toDataURL("image/png");
	const link = document.createElement("a");
	link.href = image;
	link.download = "PaintJS";
	link.click();
}

if (canvas) {
	canvas.addEventListener("mousemove", mouseMoving);
	canvas.addEventListener("mousedown", mouseDrag);
	canvas.addEventListener("mouseup", mouseDragStop);
	canvas.addEventListener("mouseleave", mouseDragStop);
	canvas.addEventListener("click", mouseClick);
	canvas.addEventListener("contextmenu", mouseRightClick);
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

if (saveButton) {
	saveButton.addEventListener("click", saveClick);
}
