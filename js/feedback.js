import {
  insertDataAndDisplayTable,
  focusFunc,
  blurFunc,
  validateAllFields,
} from "./modules/feedbackFunctions.js";

document
  .getElementById("registration-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateAllFields()) {
      return;
    }

    const formData = new FormData(event.target);
    const formObject = {};

    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    const jsonData = JSON.stringify(formObject);

    insertDataAndDisplayTable(jsonData);

    event.target.reset();
  });

const inputs = document.querySelectorAll(".input");
inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});
