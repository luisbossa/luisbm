const video1 = document.getElementById("projectVideo1");
const video2 = document.getElementById("projectVideo2");
const video3 = document.getElementById("projectVideo3");
const video4 = document.getElementById("projectVideo4");
const video5 = document.getElementById("projectVideo5");

const videoList = [video1, video2, video3, video4, video5];

videoList.forEach(function (video) {
  video.addEventListener("mouseover", function () {
    video.play();
  });
  video.addEventListener("mouseout", function () {
    video.pause();
  });
});
