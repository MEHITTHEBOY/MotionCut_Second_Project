let items = document.querySelectorAll(".slider .list .item");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let pause = document.getElementById("pause");
let thumbnails = document.querySelectorAll(".thumbnail .item");
let fullscreenButtons = document.querySelectorAll(".thumbnail .item #mode");

// config param
let countItem = items.length;
let itemActive = 0;

// event next click
next.onclick = function () {
  itemActive = itemActive + 1;
  if (itemActive >= countItem) {
    itemActive = 0;
  }
  showSlider();
};

// event prev click
prev.onclick = function () {
  itemActive = itemActive - 1;
  if (itemActive < 0) {
    itemActive = countItem - 1;
  }
  showSlider();
};

// auto run slider
let refreshInterval = setInterval(() => {
  next.click();
}, 5000);

pause.onclick = function () {
  const icon = pause.querySelector("i");
  if (icon.classList.contains("fa-pause")) {
    clearInterval(refreshInterval);
    icon.classList.replace("fa-pause", "fa-play");
    pause.setAttribute("title", "Play");
  } else {
    refreshInterval = setInterval(() => {
      next.click();
    }, 3000);
    icon.classList.replace("fa-play", "fa-pause");
    pause.setAttribute("title", "Pause");
  }
};

function showSlider() {
  // remove item active old
  let itemActiveOld = document.querySelector(".slider .list .item.active");
  let thumbnailActiveOld = document.querySelector(".thumbnail .item.active");
  itemActiveOld.classList.remove("active");
  thumbnailActiveOld.classList.remove("active");

  // active new item
  items[itemActive].classList.add("active");
  thumbnails[itemActive].classList.add("active");
  setPositionThumbnail();

  // clear auto time run slider
  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
    next.click();
  }, 5000);
}

function setPositionThumbnail() {
  let thumbnailActive = document.querySelector(".thumbnail .item.active");
  let rect = thumbnailActive.getBoundingClientRect();
  if (rect.left < 0 || rect.right > window.innerWidth) {
    thumbnailActive.scrollIntoView({ behavior: "smooth", inline: "nearest" });
  }
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    itemActive = index;
    showSlider();
  });
});

// keyboard navigation
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    next.click();
  } else if (event.key === "ArrowLeft") {
    prev.click();
  }
});

// fullscreen functionality
fullscreenButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const image = thumbnails[index].querySelector("img:not(#mode)");
    const fullscreenImage = document.createElement("div");
    fullscreenImage.style.position = "fixed";
    fullscreenImage.style.top = "0";
    fullscreenImage.style.left = "0";
    fullscreenImage.style.width = "100%";
    fullscreenImage.style.height = "100%";
    fullscreenImage.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    fullscreenImage.style.display = "flex";
    fullscreenImage.style.justifyContent = "center";
    fullscreenImage.style.alignItems = "center";
    fullscreenImage.style.zIndex = "1000";

    const img = document.createElement("img");
    img.src = image.src;
    img.style.maxWidth = "90%";
    img.style.maxHeight = "90%";
    img.style.boxShadow = "0 0 20px rgba(255, 255, 255, 0.5)";
    fullscreenImage.appendChild(img);

    const exitButton = document.createElement("img");
    exitButton.src = "./Images/exit.png"; // Path to your exit button image
    exitButton.alt = "Close";
    exitButton.style.position = "absolute";
    exitButton.style.top = "20px";
    exitButton.style.right = "20px";
    exitButton.style.width = "30px";
    exitButton.style.height = "30px";
    exitButton.style.cursor = "pointer";
    exitButton.setAttribute("title", "Exit fullscreen");

    document.body.appendChild(fullscreenImage);
    fullscreenImage.appendChild(exitButton);

    exitButton.addEventListener("click", () => {
      document.body.removeChild(fullscreenImage);
    });
  });
});
