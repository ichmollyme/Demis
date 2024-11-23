function insertDataAndDisplayTable(jsonData) {
  fetch("/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Response error.");
      }
    })
    .then(() => {
      return fetch("/api/feedback", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    })
    .then((data) => {
      displayTable(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function displayTable(data) {
  const table = document.getElementById("data-table");
  const tbody = table.querySelector("tbody");

  table.style.display = "table";
  tbody.innerHTML = "";

  data.forEach((row) => {
    const tr = document.createElement("tr");

    Object.values(row).forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
}

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

function validateAllFields() {
  const fullname = document.getElementById("fullname").value;
  const adress = document.getElementById("adress").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const email = document.getElementById("email").value;

  if (!fullname || fullname.length < 3) {
    showError("ФИО должно содержать минимум 3 символа");
    return false;
  }

  if (!adress) {
    showError("Адрес не может быть пустым");
    return false;
  }

  const phoneRegex = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
  if (!phoneNumber.match(phoneRegex)) {
    showError("Введите корректный номер телефона");
    return false;
  }

  if (!validateEmail(email)) {
    showError("Неверный формат email");
    return false;
  }

  return true;
}

function validateEmail(email) {
  const re = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  return re.test(email);
}

function showError(message) {
  const errorElement = document.createElement("div");
  errorElement.classList.add("error");
  errorElement.textContent = message;

  const formContainer = document.querySelector(".error-wrapper");
  formContainer.appendChild(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, 3000);
}

const phoneInput = document.getElementById("phoneNumber");

phoneInput.addEventListener("input", function (event) {
  let value = phoneInput.value.replace(/\D/g, "");
  const formatted = [];

  if (value[0] === "8") value = "7" + value.slice(1);
  if (!value.startsWith("7")) value = "7" + value;

  formatted.push("+7");
  if (value.length > 1) formatted.push("(", value.slice(1, 4));
  if (value.length > 4) formatted.push(")", value.slice(4, 7));
  if (value.length > 7) formatted.push("-", value.slice(7, 9));
  if (value.length > 9) formatted.push("-", value.slice(9, 11));

  phoneInput.value = formatted.join("");
});

phoneInput.addEventListener("focus", function () {
  phoneInput.placeholder = "+7(___)___-__-__";
});

phoneInput.addEventListener("blur", function () {
  if (phoneInput.value === "") {
    phoneInput.placeholder = "";
  }
});

export { insertDataAndDisplayTable, focusFunc, blurFunc, validateAllFields };
