const videos = document.querySelectorAll("video");

videos.forEach((video) => {
  video.addEventListener("mouseover", () => video.play());
  video.addEventListener("mouseout", () => video.pause());
});

/*--------- SKELETON ---------*/

document.querySelectorAll(".project-preview-img").forEach((img) => {
  img.addEventListener("load", () => {
    img.previousElementSibling.style.display = "none";
  });
});
