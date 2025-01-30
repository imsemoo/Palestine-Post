
$(".icon-container").on("click", function (event) {
    event.stopPropagation(); // لمنع الإغلاق عند الضغط داخل القائمة
  
    let megaMenu = $(this).find(".notifications-mega-menu, .weather-mega-menu, .curancy-mega-menu");
  
    // إغلاق أي قائمة مفتوحة أخرى
    $(".notifications-mega-menu, .weather-mega-menu, .curancy-mega-menu").not(megaMenu).hide();
  
    if (megaMenu.length > 0) {
      megaMenu.html('<div class="loading">جارٍ التحميل...</div>'); // رسالة تحميل
      megaMenu.show();
  
      // جلب البيانات بنفس التنسيق السابق
      if (megaMenu.hasClass("curancy-mega-menu")) {
        fetchCurrencyData(megaMenu);
      } else if (megaMenu.hasClass("weather-mega-menu")) {
        fetchWeatherData(megaMenu);
      } else if (megaMenu.hasClass("notifications-mega-menu")) {
        megaMenu.html('<div class="mega-menu-content"><p>لا توجد إشعارات جديدة</p></div>'); // إشعارات ثابتة كمثال
      }
    }
  });
  
  // إغلاق القائمة عند الضغط خارجها
  $(document).on("click", function () {
    $(".notifications-mega-menu, .weather-mega-menu, .curancy-mega-menu").hide();
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "48ef6fafed9643d1bfd1855cb6b9bc0f"; // مفتاح API الخاص بك
    const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;
  
    // تحديث التاريخ والوقت
    const updateDate = () => {
      const dateElements = document.querySelectorAll(".date-slider");
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
              margin: 10,
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
                  items: 1.7,
                },
              },
            });
          }
        })
        .catch((error) => console.error("Error fetching weather data:", error));
    });
  });


  