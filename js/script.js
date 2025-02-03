$(document).ready(function () {

 // On load, set the accordion background from its data attribute
 var aBgimage = $('.files-accordion').data('background');
 $('.files-accordion').css('background-image', 'url('+aBgimage+')');
 
 $('.article-files').on('click', function(e){
   if( $(this).hasClass('open') ){
     e.stopPropagation();
     $('.files-accordion').removeClass('enabled')
     $('.article-files').removeClass('open')
   } else {
     $(this).parent('.files-accordion').addClass('enabled')
     $(this).addClass('open')
     $(this).siblings('.article-files').removeClass('open')
     var bGimage = $(this).data('background')
     $('.files-accordion').css('background-image', 'url('+bGimage+')');
   }
 })
 
 $('.close').on('click', function(e){
   e.stopPropagation();
   $('.files-accordion').removeClass('enabled')
   $('.article-files').removeClass('open')
 })
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
    // Create WaveSurfer instance for each audio player container
    const wavesurfer = WaveSurfer.create({
      container: container.querySelector('.waveform-ph'),
      waveColor: '#E0E0E0',
      progressColor: '#33B3C0',
      height: 20,
      responsive: true,
    });
  
    // Load the audio file from the data attribute
    const audioPath = container.querySelector('.waveform-ph').dataset.audio;
    wavesurfer.load(audioPath);
  
    // Get control buttons and time display element
    const playPauseButton = container.querySelector('.play-pause');
    const rewindButton = container.querySelector('.rewind');
    const forwardButton = container.querySelector('.forward');
    const timeDisplay = container.querySelector('.time-display');
  
    // Play/Pause toggle with icon update
    playPauseButton.addEventListener('click', () => {
      wavesurfer.playPause();
      playPauseButton.innerHTML = wavesurfer.isPlaying() ? '⏸' : '▶';
    });
  
    // Rewind 10 seconds
    rewindButton.addEventListener('click', () => {
      const currentTime = wavesurfer.getCurrentTime();
      let newTime = currentTime - 10;
      if (newTime < 0) newTime = 0;
      const duration = wavesurfer.getDuration();
      if (duration > 0) {
        wavesurfer.seekTo(newTime / duration);
      }
    });
  
    // Forward 10 seconds
    forwardButton.addEventListener('click', () => {
      const currentTime = wavesurfer.getCurrentTime();
      let newTime = currentTime + 10;
      const duration = wavesurfer.getDuration();
      if (newTime > duration) newTime = duration;
      if (duration > 0) {
        wavesurfer.seekTo(newTime / duration);
      }
    });
  
    // Update the time display during audio processing
    wavesurfer.on('audioprocess', () => {
      const currentTime = wavesurfer.getCurrentTime();
      const duration = wavesurfer.getDuration();
      timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
    });
  
    // Set the initial time display when the audio is ready
    wavesurfer.on('ready', () => {
      const duration = wavesurfer.getDuration();
      timeDisplay.textContent = `${formatTime(0)} / ${formatTime(duration)}`;
    });
  });
  
  // Format seconds to MM:SS
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
  


   // إغلاق قائمة الإشعارات عند النقر في أي مكان خارجها
   $(document).on('click', function() {
    $('.notifications-mega-menu').hide();
  });
  
  // منع إخفاء القائمة عند النقر داخل القائمة نفسها
  $(document).on('click', '.notifications-mega-menu', function(e) {
    e.stopPropagation();
  });

  // عند النقر على أيقونة الإشعارات
  $('.notifications-mega-menu').closest('.icon-container').on('click', function(e) {
    e.stopPropagation();
    
    const notificationMenu = $(this).find('.notifications-mega-menu');

    // إخفاء أي قوائم أخرى (Mega Menus) مفتوحة
    $(".top-bar-container .mega-menu").not(notificationMenu).hide();

    // التأكد من وجود إشعارات، وإن لم توجد نضع رسالة "لا يوجد إشعارات"
    const notificationItems = notificationMenu.find('.notification-item');
    if (notificationItems.length === 0) {
      const container = notificationMenu.find('.notifications-container');
      // تأكد أننا لم نضف الرسالة من قبل
      if (!container.find('.no-notifications-msg').length) {
        container.html('<p class="no-notifications-msg">لا يوجد إشعارات</p>');
      }
    }

    // فتح/إغلاق القائمة
    notificationMenu.toggle();
  });
});



function playVideo(container) {
  const img = container.querySelector('img');
  const button = container.querySelector('.play-button');
  const iframe = container.querySelector('iframe');
  img.style.display = 'none';
  button.style.display = 'none';
  iframe.style.display = 'block';
}