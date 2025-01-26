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


document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "48ef6fafed9643d1bfd1855cb6b9bc0f"; // مفتاح API الخاص بك
  const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

  // تحديث التاريخ والوقت
  const updateDate = () => {
    const dateElements = document.querySelectorAll(".date");
    const now = new Date();
    const timeString = now.toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateString = now.toLocaleDateString("ar-EG");
    dateElements.forEach(
      (dateEl) => (dateEl.textContent = `${timeString} ${dateString}`)
    );
  };

  // تحديث السلايدر بأسعار العملات
  const updateSlider = (slider, baseRate, rates, baseCurrency) => {
    const sliderContainer = document.querySelector(slider);
    if (!sliderContainer) return;

    sliderContainer.innerHTML = ""; // تفريغ السلايدر

    Object.keys(rates).forEach((currency) => {
      if (currency !== baseCurrency) {
        const rate = (rates[currency] / baseRate).toFixed(3);
        const slide = document.createElement("div");
        slide.className = "item";
        slide.innerHTML = `
          <div class="currency">
            <p>${currency}</p>
            <span>${rate} ${currency}</span>
          </div>
        `;
        sliderContainer.appendChild(slide);
      }
    });

    // إعادة تهيئة السلايدر باستخدام OwlCarousel
    $(slider).owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      rtl: true,
      dots: false,
      navText: [
        "<i class='fa-solid fa-chevron-right'></i>",
        "<i class='fa-solid fa-chevron-left'></i>",
      ],
      responsive: {
        0: { items: 3 },
        600: { items: 4 },
        1000: { items: 4 },
      },
    });
  };

  // جلب البيانات من API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.rates) {
        const rates = data.rates;

        // تحديث السلايدرز
        updateSlider(".slider-usd", rates.USD, rates, "USD");
        updateSlider(".slider-eur", rates.EUR, rates, "EUR");

        // تحديث التاريخ والوقت
        updateDate();
      } else {
        console.error("Failed to fetch currency rates:", data.error);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "4e1c311a82984f5686d131632252601"; // مفتاح API الخاص بك
  const apiUrl = "https://api.weatherapi.com/v1/forecast.json"; // تعديل API للحصول على التوقعات اليومية
  const cities = [
    { name: "غزة", query: "Gaza" },
    { name: "القدس", query: "Jerusalem" },
  ];
  const weatherSlidersContainer = document.querySelector(".weather-sliders");
  const today = new Date();

  // تحديث التاريخ الحالي
  const formattedDate = today.toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // جلب بيانات الطقس لكل مدينة
  cities.forEach((city) => {
    fetch(`${apiUrl}?key=${apiKey}&q=${city.query}&days=5&lang=ar`) // طلب بيانات الأيام القادمة
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          // إنشاء قسم جديد لكل مدينة
          const citySection = document.createElement("div");
          citySection.classList.add("background-weather");
          citySection.innerHTML = `
            <header class="d-flex align-items-center gap-2 justify-content-between mb-2">
              <div class="title-with-circle title-with-circle-small d-flex align-items-center gap-2">
                <div class="dot-title red-dot"></div>
                <h5>${city.name}</h5>
              </div>
              <div class="date">${formattedDate}</div>
            </header>
            <div class="owl-carousel weather-slider owl-theme" id="slider-${city.query}">
              <!-- سيتم تعبئة بيانات الطقس هنا -->
            </div>
          `;
          weatherSlidersContainer.appendChild(citySection);

          // تعبئة بيانات الطقس في السلايدر
          const weatherSlider = citySection.querySelector(`#slider-${city.query}`);
          data.forecast.forecastday.forEach((forecast) => {
            const weatherItem = document.createElement("div");
            weatherItem.classList.add("item");
            const forecastDate = new Date(forecast.date);
            const dayName = forecastDate.toLocaleDateString("ar-EG", { weekday: "long" });
            weatherItem.innerHTML = `
              <div class="weather-item">
                <p>${dayName} <span>${forecast.date}</span></p>
                <img src="${forecast.day.condition.icon}" alt="${forecast.day.condition.text}">
                <span class="description-weather">${forecast.day.condition.text}</span>
                <span class="temperature">${Math.round(forecast.day.avgtemp_c)}°C</span>
              </div>
            `;
            weatherSlider.appendChild(weatherItem);
          });

          // تفعيل السلايدر
          $(`#slider-${city.query}`).owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            rtl: true,
            dots: false,
            navText: [
              "<i class='fa-solid fa-chevron-right'></i>",
              "<i class='fa-solid fa-chevron-left'></i>",
            ],
            responsive: {
              0: {
                items: 1,
              },
              600: {
                items: 1,
              },
              1000: {
                items: 2,
              },
            },
          });
        }
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  });
});