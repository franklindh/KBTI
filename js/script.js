const checkInInput = document.getElementById("check-in");
const checkOutInput = document.getElementById("check-out");

const dateOptions = {
  format: "DD MMMM YYYY",
  i18n: {
    previousMonth: "Bulan Sebelumnya",
    nextMonth: "Bulan Berikutnya",
    months: moment.localeData("id").months(),
    weekdays: moment.localeData("id").weekdays(),
    weekdaysShort: moment.localeData("id").weekdaysShort(),
  },
  toString(date) {
    return moment(date).locale("id").format("DD MMMM YYYY");
  },
  parse(dateString) {
    return moment(dateString, "DD MMMM YYYY").toDate();
  },
  onSelect: function () {
    const startDate = this._o.startDate;
    const endDate = this._o.endDate;

    if (startDate && endDate) {
      checkInInput.value = moment(startDate).locale("id").format("DD MMMM YYYY");
      checkOutInput.value = moment(endDate).locale("id").format("DD MMMM YYYY");
    }
  },
};

const checkInPicker = new Pikaday({
  field: checkInInput,
  ...dateOptions,
});

const checkOutPicker = new Pikaday({
  field: checkOutInput,
  ...dateOptions,
});

const cityInput = document.getElementById("city");
const cityDropdown = document.getElementById("city-dropdown");
const cities = ["Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Bali"];

function filterCities(keyword) {
  const filteredCities = cities.filter((city) => city.toLowerCase().includes(keyword.toLowerCase()));
  return filteredCities;
}

function displayDropdown(filteredCities) {
  cityDropdown.innerHTML = "";
  if (filteredCities.length > 0) {
    filteredCities.forEach((city) => {
      const li = document.createElement("li");
      li.textContent = city;
      li.classList.add("py-2", "px-3", "cursor-pointer", "hover:bg-gray-100");
      li.addEventListener("click", () => {
        cityInput.value = city;
        cityDropdown.classList.add("hidden");
      });
      cityDropdown.appendChild(li);
    });
    cityDropdown.classList.remove("hidden");
  } else {
    cityDropdown.classList.add("hidden");
  }
}

cityInput.addEventListener("input", (event) => {
  const keyword = event.target.value;
  const filteredCities = filterCities(keyword);
  displayDropdown(filteredCities);
});

window.addEventListener("click", (event) => {
  if (!cityInput.contains(event.target) && !cityDropdown.contains(event.target)) {
    cityDropdown.classList.add("hidden");
  }
});
