const body = document.querySelector('body');
const imgCount = 4;

/*function showImg(number) {
    const img = new Image();
    img.src = `images/${number + 1}.jpg`
    img.classList.add('bgImg');
    body.prepend(img);
}*/
function showImg(number) {
    body.style.backgroundImage = `url(images/${number + 1}.jpg)`;
}

function getRandom() {
    return Math.floor(Math.random() * imgCount);
} 

function init() {
    const randomNumber = getRandom();
    showImg(randomNumber);
}

init();