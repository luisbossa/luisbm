const videos = document.querySelectorAll("video");

videos.forEach((video) => {
  // play() se rechaza si el cursor sale antes de que arranque; no es un error
  video.addEventListener("mouseover", () => video.play().catch(() => {}));
  video.addEventListener("mouseout", () => video.pause());
});

/*--------- SKELETON ---------*/

document.querySelectorAll(".project-preview-img").forEach((img) => {
  img.addEventListener("load", () => {
    const skeleton = img.nextElementSibling;
    if (skeleton) skeleton.style.display = "none";
  });
});
