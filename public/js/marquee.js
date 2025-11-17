const videos = document.querySelectorAll("video");

videos.forEach((video) => {
  const wrapper = video.parentElement;
  const placeholder = wrapper.querySelector(".video-placeholder");

  video.addEventListener("loadeddata", () => {
    placeholder.classList.add("hidden");
  });

  video.addEventListener("mouseover", () => video.play());
  video.addEventListener("mouseout", () => video.pause());
});

/*--------- SKELETON ---------*/

document.querySelectorAll(".project-preview-img").forEach((img) => {
  img.addEventListener("load", () => {
    img.previousElementSibling.style.display = "none";
  });
});
