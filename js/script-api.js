$(document).ready(function() {
  // إدارة النقر على الأيقونات
  $(".icon-container").on("click", function(event) {
    event.stopPropagation();
    const megaMenu = $(this).find(".mega-menu");

    // إغلاق القوائم الأخرى
    $(".mega-menu").not(megaMenu).hide();

    if (megaMenu.length) {
      // إذا كانت القائمة للعملات
      if (megaMenu.hasClass("curancy-mega-menu")) {
        megaMenu.find('.loading-overlay').addClass('active');
        megaMenu.show();
        fetchCurrencyData(megaMenu);

      // إذا كانت القائمة للطقس
      } else if (megaMenu.hasClass("weather-mega-menu")) {
        megaMenu.find('.loading-overlay').addClass('active');
        megaMenu.show();
        fetchWeatherData(megaMenu);

      // القوائم الأخرى (الإشعارات مثلاً) تُفتح بدون لودنج
      } else {
        megaMenu.show();
        megaMenu.find('.loading-overlay').removeClass('active');
      }
    }
  });

  // إغلاق القوائم عند النقر خارجها
  $(document).on("click", function() {
    $(".mega-menu").hide();
  });

  // دالة تحديث العملات
  function updateSlider(sliderSelector, baseRate, rates, baseCurrency) {
    const slider = $(sliderSelector);
    slider.owlCarousel('destroy');
    slider.html('');

    Object.keys(rates).forEach(currency => {
      if (currency !== baseCurrency) {
        const rate = (rates[currency] / baseRate).toFixed(3);
        slider.append(`
          <div class="item">
            <div class="currency">
              <p>${currency}</p>
              <span>${rate} ${currency}</span>
            </div>
          </div>
        `);
      }
    });

    slider.owlCarousel({
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
      }
    });
  }

  // دالة جلب بيانات العملات
  function fetchCurrencyData(menuElement) {
    const apiKey = "48ef6fafed9643d1bfd1855cb6b9bc0f";
    const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.rates) {
          // تحديث التاريخ
          const now = new Date();
          const timeString = now.toLocaleTimeString("ar-EG", { 
            hour: "2-digit", 
            minute: "2-digit" 
          });
          const dateString = now.toLocaleDateString("ar-EG");
          menuElement.find(".date-slider").text(`${timeString} ${dateString}`);

          // تحديث السلايدرات
          updateSlider(".slider-usd", data.rates.USD, data.rates, "USD");
          updateSlider(".slider-eur", data.rates.EUR, data.rates, "EUR");
        }
      })
      .catch(error => console.error('Error:', error))
      .finally(() => {
        menuElement.find('.loading-overlay').removeClass('active');
      });
  }

  // دالة جلب بيانات الطقس
  function fetchWeatherData(menuElement) {
    const apiKey = "4e1c311a82984f5686d131632252601"; // تأكد من صحة المفتاح
    const cities = [
      { name: "غزة", query: "Gaza" },
      { name: "القدس", query: "Jerusalem" }
    ];

    // مسح المحتوى القديم قبل التحديث
    menuElement.find('.weather-sliders').html('');

    // إنشاء وعد لكل مدينة
    const promises = cities.map(city => {
      return fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city.query}&days=5&lang=ar`)
        .then(response => response.json())
        .then(data => {
          if (!data.forecast) {
            throw new Error('Invalid weather data');
          }
          return { city, data };
        });
    });

    // معالجة جميع الطلبات معًا
    Promise.all(promises)
      .then(results => {
        results.forEach(({ city, data }) => {
          const sliderId = `slider-${city.query.replace(/\s+/g, '-')}`;
          const sliderContainer = $('<div class="background-weather"></div>');

          // بناء الهيكل الأساسي
          sliderContainer.html(`
            <header class="d-flex align-items-center gap-2 justify-content-between mb-2">
              <div class="title-with-circle title-with-circle-small d-flex align-items-center gap-2">
                <div class="dot-title red-dot"></div>
                <h5>${city.name}</h5>
              </div>
              <div class="date">${new Date().toLocaleDateString("ar-EG", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              })}</div>
            </header>
            <div class="owl-carousel weather-slider owl-theme" id="${sliderId}"></div>
          `);

          const slider = sliderContainer.find(`#${sliderId}`);

          // إضافة البيانات لكل يوم
          data.forecast.forecastday.forEach(day => {
            const date = new Date(day.date);
            slider.append(`
              <div class="item">
                <div class="weather-item">
                  <p>${date.toLocaleDateString("ar-EG", { weekday: "long" })} 
                    <span>${day.date}</span>
                  </p>
                  <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
                  <span class="description-weather">${day.day.condition.text}</span>
                  <span class="temperature">${Math.round(day.day.avgtemp_c)}°C</span>
                </div>
              </div>
            `);
          });

          // إضافة السلايدر إلى القائمة
          menuElement.find('.weather-sliders').append(sliderContainer);

          // تهيئة السلايدر
          slider.owlCarousel({
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
              0: { items: 1 },
              600: { items: 1 },
              1000: { items: 1.7 }
            }
          });
        });
      })
      .catch(error => {
        console.error('Error fetching weather:', error);
        menuElement.find('.weather-sliders').html('<p class="error">حدث خطأ في جلب بيانات الطقس</p>');
      })
      .finally(() => {
        menuElement.find('.loading-overlay').removeClass('active');
      });
  }
});
