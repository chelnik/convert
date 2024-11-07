initMap();

async function initMap() {
  // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
  await ymaps3.ready;

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
    ymaps3;

  // Иницилиазируем карту
  const map = new YMap(
    // Передаём ссылку на HTMLElement контейнера
    document.getElementById("map"),

    // Передаём параметры инициализации карты
    {
      location: {
        // Координаты центра карты
        center: [60.617251, 56.80356],

        // Уровень масштабирования
        zoom: 15,
      },
    }
  );

  map.addChild(new YMapDefaultSchemeLayer());
  map.addChild(new YMapDefaultFeaturesLayer());

  const content = document.createElement("section");

  // Инициализируйте маркер
  const marker = new YMapMarker(
    {
      coordinates: [60.617251, 56.80356],
      draggable: false,
      scallable: false,
    },
    content
  );

  // Добавьте маркер на карту
  map.addChild(marker);

  // Добавьте произвольную HTML-разметку внутрь содержимого маркера
  content.innerHTML = "<div class='marker'><img src='./img/Group.svg' /></div>";

  // Добавляем слой для отображения схематической карты
}
// 56.803529, 60.617291
// 56.803560, 60.617251

const list = localStorage.getItem("list")
  ? JSON.parse(localStorage.getItem("list"))
  : [];

renderList(list);

function saveList() {
  localStorage.setItem("list", JSON.stringify(list));
}

document
  .getElementById("consultationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const inputs = document.querySelectorAll(".form__input");
    inputs.forEach((input) => {
      input.classList.remove("error");
    });

    const checkBox = document.getElementById("check");
    let isValid = true;

    const nameInput = document.getElementById("name");
    if (!nameInput.value.trim()) {
      nameInput.classList.add("error");
      isValid = false;
    }

    const phoneInput = document.getElementById("phone");
    if (!phoneInput.value.trim()) {
      phoneInput.classList.add("error");
      isValid = false;
    }

    if (!checkBox.checked) {
      checkBox.classList.add("error");
      alert("Вы должны согласиться с политикой конфиденциальности!");
      isValid = false;
    }

    if (isValid) {
      alert("Форма успешно отправлена!");

      list.push({
        name: nameInput.value,
        phone: phoneInput.value,
      });
      renderList(list);
      saveList();
    }
  });

function renderList(list) {
  const body = document.querySelector(".list__body");
  body.innerHTML = null;
  list.forEach((element) => {
    body.insertAdjacentHTML(
      "beforeend",
      ` <div class="list__item">
              <h4 class="list__name">${element.name}</h4>
              <p class="list__text">${element.phone}</p>
            </div>
            `
    );
  });
}
