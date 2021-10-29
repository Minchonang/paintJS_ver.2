const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

ctx.strokeStyle = "black";
ctx.lineWidth = 2.5;

let painting = false;

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
	}
}

function mouseDrag(event) {
	paintingTrue();
}

function mouseDragStop(event) {
	paintingFalse();
}

if (canvas) {
	canvas.addEventListener("mousemove", mouseMoving);
	canvas.addEventListener("mousedown", mouseDrag);
	canvas.addEventListener("mouseup", mouseDragStop);
	canvas.addEventListener("mouseleave", mouseDragStop);
}
