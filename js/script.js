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

  // عند النقر على التبويبة
  $(".buttons-group-tabs li").click(function() {
    var tab = $(this).data("tab");
    
    // تغيير النمط النشط للتبويبات
    $(".buttons-group-tabs li").removeClass("active");
    $(this).addClass("active");
    
    // إخفاء جميع المحتويات وعرض المحتوى المقابل للتبويب
    $(".tab-pane").hide();
    $("." + tab).show();
  });
 
  // Initialize sliders with configurations
  const sliderConfigs = [
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
        margin: 20,
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


  

  document.querySelectorAll('.audio-player').forEach((container) => {
    const wavesurfer = WaveSurfer.create({
      container: container.querySelector('.waveform-ph'),
      waveColor: '#E0E0E0',
      progressColor: '#33B3C0',
      height: 20,
      responsive: true,
    })
  
    const audioPath = container.querySelector('.waveform-ph').dataset.audio
    wavesurfer.load(audioPath)
  
    const playPauseButton = container.querySelector('.play-pause')
    const timeDisplay = container.querySelector('.time-display')
  
    // تشغيل/إيقاف مع تحديث الأيقونة
    playPauseButton.addEventListener('click', () => {
      wavesurfer.playPause()
      playPauseButton.innerHTML = wavesurfer.isPlaying() ? '⏸' : '▶'
    })
  
    // تحديث الوقت أثناء التشغيل
    wavesurfer.on('audioprocess', () => {
      const currentTime = wavesurfer.getCurrentTime()
      const duration = wavesurfer.getDuration()
      timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`
    })
  
    // تعيين الوقت الابتدائي عند التحميل
    wavesurfer.on('ready', () => {
      const duration = wavesurfer.getDuration()
      timeDisplay.textContent = `${formatTime(0)} / ${formatTime(duration)}`
    })
  })
  
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }
});



function playVideo(container) {
  const img = container.querySelector('img');
  const button = container.querySelector('.play-button');
  const iframe = container.querySelector('iframe');
  img.style.display = 'none';
  button.style.display = 'none';
  iframe.style.display = 'block';
}