function getElement(element){
    const select = document.querySelector(element);
    if(select){ return select}
    else throw new Error(`Check ${element} selected`);
}

const pictureArray = [
    {
    src: "./images/My-website-photo.jpeg",
    title: "me-1",
    class:"photo",
    id: 1,
    alt:"me-1",
    },
    {
    src: "./images/dongwon-tuna-hot-chipotle-tuna.jpeg",
    title: "me-2",
    id: 2,
    class:"photo",
    alt:"me-2",
    },
    {
    src: "./images/item-1.jpeg",
    title: "me-3",
    id: 3,
    class:"photo",
    alt:"me-3",
    },
    {
    src: "./images/oolong-tea.jpg",
    title: "me-4",
    id: 4,
    class:"photo",
    alt:"me-4",
    },
    {
    src: "./images/prik-khing-curry-paste.jfif",
    title: "me-5",
    class:"photo",
    alt:"me-5",
    id: 5,
    },
];


const section = getElement(".picture-section");


allPictures(pictureArray);
function allPictures(pictureArray){
    var displayAll = pictureArray.map(function(e){
    return `
        <img
        src="${e.src}"
        title="${e.title}"
        class="photo"
        data-id="${e.id}"
        alt="${e.title}"
        />`;
    }).join("");
    section.innerHTML = displayAll;
}

function Gallery(element){
    this.container = element
    this.list = [...element.querySelectorAll(".photo")];
    this.frame = getElement(".frame");
    this.frameImg = getElement(".main-img");
    this.imgName = getElement(".imgName");
    this.frameImage = getElement(".frameImage");
    this.closeBtn = getElement(".closeBtn");
    this.prevBtn = getElement(".prevBtn");
    this.nextBtn = getElement(".nextBtn");


    this.closeFrame = this.closeFrame.bind(this);
    this.nextImg = this.nextImg.bind(this);
    this.prevImg = this.prevImg.bind(this);

    this.container.addEventListener("click", function(e){

        if(e.target.classList.contains("photo")){
            this.openFrame(e.target, this.list);
        }
    }.bind(this));
}

Gallery.prototype.openFrame = function(selectedImg, list){
    this.setMainImage(selectedImg);
    this.frameImage.innerHTML = list.map(function(img){
        return `
        <img
        src="${img.src}"
        title="${img.title}"
        class="${selectedImg.dataset.id === img.dataset.id ? "frame-img selected":"frame-img"}"
        data-id="${img.dataset.id}"
        alt="${img.title}"
        />`
    }).join("");
    this.frame.classList.add("open");
    this.closeBtn.addEventListener("click", this.closeFrame);
    this.nextBtn.addEventListener("click", this.nextImg);
    this.prevBtn.addEventListener("click", this.prevImg);
}

Gallery.prototype.setMainImage = function(selectedImage){
    this.frameImg.src = selectedImage.src
    this.imgName.textContent = selectedImage.title
}
Gallery.prototype.closeFrame = function(){
    this.frame.classList.remove("open");
    this.closeBtn.removeEventListener("click", this.closeFrame);
    this.nextBtn.removeEventListener("click", this.nextImg);
    this.prevBtn.removeEventListener("click", this.prevImg);
}
Gallery.prototype.nextImg = function(){
    const selected = this.frameImage.querySelector(".selected");
    const next = selected.nextElementSibling || this.frameImage.firstElementChild;
    selected.classList.remove("selected");
    next.classList.add("selected");
    this.setMainImage(next);
}
Gallery.prototype.prevImg = function(){
    const selected = this.frameImage.querySelector(".selected");
    const prev = selected.previousElementSibling || this.frameImage.lastElementChild;
    selected.classList.remove("selected");
    prev.classList.add("selected");
    this.setMainImage(prev);
}

const pictures = new Gallery(section);





