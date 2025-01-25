$(document).ready(function () {
  $(".owl-news").owlCarousel({
    loop: true,
    margin: 20,
    rtl: true,
    nav: true,
    navText: [
      "<i class='fa-solid fa-chevron-right'></i>",
      "<i class='fa-solid fa-chevron-left'></i>",
    ],
    responsive: {
      0: { items: 1.5 },
      600: { items: 2 },
      1000: { items: 2 },
    },
  });
  // Initialize sliders with configurations
  const sliderConfigs = [
    {
      id: ".currency-slider",
      options: {
        loop: true,

        nav: true,
        dots: true,
        rtl: true,
        navText: ["«", ""],
        responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 1 } },
      },
    },

    {
      id: "#slider1",
      options: {
        loop: true,
        margin: 20,
        rtl: true,
        nav: true,
        navText: [
          "<i class='fa-solid fa-chevron-right'></i>",
          "<i class='fa-solid fa-chevron-left'></i>",
        ],
        responsive: {
          0: { items: 1.5 },
          600: { items: 2 },
          1000: { items: 3 },
        },
      },
    },
    {
      id: "#slider2",
      options: {
        loop: true,
        margin: 20,
        rtl: true,
        nav: true,
        navText: [
          "<i class='fa-solid fa-chevron-right'></i>",
          "<i class='fa-solid fa-chevron-left'></i>",
        ],
        responsive: {
          0: { items: 1.5 },
          600: { items: 2 },
          1000: { items: 2 },
        },
      },
    },
    {
      id: "#slider3",
      options: {
        loop: true,
        rtl: true,
        margin: 0,
        nav: true,
        navText: [
          "<i class='fa-solid fa-chevron-right'></i>",
          "<i class='fa-solid fa-chevron-left'></i>",
        ],
        responsive: {
          0: { items: 1.5 },
          600: { items: 2 },
          1000: { items: 2 },
        },
      },
    },
    {
      id: "#slider4",
      options: {
        loop: true,
        margin: 15,
        rtl: true,
        nav: true,
        dots: false,
        navText: [
          "<i class='fa-solid fa-chevron-right'></i>",
          "<i class='fa-solid fa-chevron-left'></i>",
        ],
        responsive: {
          0: { items: 1.5 },
          600: { items: 2 },
          1000: { items: 3 },
        },
      },
    },
    {
      id: "#safit-slider",
      options: {
        loop: true,

        margin: 20,
        rtl: true,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 3 } },
      },
    },
  ];

  sliderConfigs.forEach(({ id, options }) => $(id).owlCarousel(options));

  $(".right-choises li").on("click", function () {
    $(".right-choises li").removeClass("active");
    $(this).addClass("active");
  });

  $(".bars-container ").addClass("active");
  $(".bars-container , .cells-container i").click(function () {
    $(".bars-container , .cells-container ").removeClass("active");
    $(this).addClass("active");
  });

  $("#bars-btn, #cells-btn").click(function () {
    const isBars = $(this).is("#bars-btn");
    $(".hide-right-section").toggle(isBars);
    $(".toggle-menu").toggle(!isBars);
    $(".toggle-menu-card").toggle(isBars);
    $(".bars-container ").toggleClass("active", isBars);
    $(".cells-container ").toggleClass("active", !isBars);
  });

  $(".local-news-controls ul li").on("click", function () {
    const $li = $(this);
    $li.fadeOut(300, function () {
      $li
        .prependTo($li.parent())
        .fadeIn(300)
        .addClass("active")
        .siblings()
        .removeClass("active");
    });
  });

  $(".share-arrow, .share h4 ,.btn-share").click(function (e) {
    e.preventDefault();
    $(this).siblings(".share-social-icons").toggle();
  });

  $(window).on("scroll", function () {
    $("#scrollToTop").toggleClass("show", $(this).scrollTop() > 800);
  });

  $("#scrollToTop").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, "smooth");
  });

  const hideSliders = () => $(".owl-carousel-container").hide();

  $("#safit").on("click", function () {
    hideSliders();
    $("#safit-slider-container").show();
  });

  $("#jerusalem").on("click", function () {
    hideSliders();
    $("#slider1-container").show();
  });

  $(".nav-item.dropdown > .nav-link").click(function (e) {
    e.preventDefault();
    $(this).find("i").toggleClass("fa-chevron-down fa-chevron-up");
    $(this).siblings(".mega-menu").toggleClass("active");
  });

  $("#local-news-toggle, #more-mega-menu").click(function (e) {
    e.preventDefault();
    const target = $(this).is("#local-news-toggle")
      ? "#local-news-slide-menu"
      : "#mega-menu";
    const other =
      target === "#local-news-slide-menu"
        ? "#mega-menu"
        : "#local-news-slide-menu";
    $(other).slideUp();
    $(target).slideToggle();
  });

  // WaveSurfer setup
  const wavesurfer = WaveSurfer.create({
    container: "#waveform",
    waveColor: "#E0E0E0",
    progressColor: "#33B3C0",
    height: 20,
    responsive: true,
  });

  // Load audio file
  wavesurfer.load("./audio/001.mp3");

  // Play/Pause functionality
  const playPauseButton = document.getElementById("play-pause");
  playPauseButton.addEventListener("click", () => {
    wavesurfer.playPause();
    playPauseButton.textContent = wavesurfer.isPlaying() ? "⏸" : "▶";
  });

  // Rewind and Forward functionality
  document.getElementById("rewind").addEventListener("click", () => {
    wavesurfer.skipBackward(5); // Skip 5 seconds back
  });

  document.getElementById("forward").addEventListener("click", () => {
    wavesurfer.skipForward(5); // Skip 5 seconds forward
  });

  // Update time display
  const timeDisplay = document.getElementById("time");
  wavesurfer.on("audioprocess", () => {
    const currentTime = wavesurfer.getCurrentTime();
    timeDisplay.textContent = formatTime(currentTime);
  });

  wavesurfer.on("ready", () => {
    const duration = wavesurfer.getDuration();
    timeDisplay.textContent = `${formatTime(0)} / ${formatTime(duration)}`;
  });

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }
});
