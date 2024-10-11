let addButton = document.getElementById("AddEmp");
let divForm = document.getElementById("BasicDtl");
let overlay = document.getElementById("overlay");
let section = document.getElementById("section");
let cancelBtn = document.getElementById("formCancelBtn");
let submitBtn = document.getElementById("submit");
let form = document.getElementById("main-form");

//accessing form elements

let salutation = document.getElementById("salutation");
let firstname = document.getElementById("firstName");
let lastname = document.getElementById("lastName");
let email = document.getElementById("email");
let mobileNumber = document.getElementById("mobileNumber");
let dob = document.getElementById("dob");
let male = document.getElementById("male");
let female = document.getElementById("female");
let qualifications = document.getElementById("Qualifications");
let address = document.getElementById("address");
let country = document.getElementById("country");
let state = document.getElementById("state");
let city = document.getElementById("city");
let zip = document.getElementById("zip");
let username = document.getElementById("username");
let password = document.getElementById("password");

const salutationError = document.getElementById("salutationErr");
const firstnameError = document.getElementById("firstnameErr");
const lastnameError = document.getElementById("lastnameErr");
const emailError = document.getElementById("emailErr");
const mobileError = document.getElementById("mobileNumErr");
const dobError = document.getElementById("dobErr");
const qualificationError = document.getElementById("qualificationErr");
const addressError = document.getElementById("addressErr");
const countryError = document.getElementById("countryErr");
const stateError = document.getElementById("stateErr");
const cityError = document.getElementById("cityErr");
const zipError = document.getElementById("zipErr");
const usernameError = document.getElementById("userNameErr");
const passwordError = document.getElementById("passwordErr");

//fetching api
let allData;
let Data;
async function getData() {
  try {
    let response = await fetch("http://localhost:3000/employees");
    if (!response.ok) {
      throw new Error("Server error");
    } else {
      let data = await response.json();
      // console.log(data);
      allData = data;
      renderData(data);
    }
  } catch (error) {
    console.error(error);
  }
}
getData();

//Form display

section.addEventListener("click", (event) => {
  if (event.target === addButton) {
    divForm.style.display = "block";
    overlay.style.display = "block";
  } else if (event.target === overlay || event.target === cancelBtn) {
    divForm.style.display = "none";
    overlay.style.display = "none";
  }
});

//Data display

function renderData(employee) {
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  employee.forEach((emp, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `<th class="style">#0${index + 1}</th>
      <td class="style"><img src="http://localhost:3000/employees/${
        emp.id
      }/avatar" class="pro-img rounded-4 me-2" alt="image">${
      emp.firstName + emp.lastName
    }</td>
      <td class="style">${emp.email}</td>
      <td class="style">${emp.phone}</td>
      <td class="style">${emp.dob}</td>
      <td class="style">${emp.gender}</td>
      <td class="style">${emp.country}</td>
      <div class="dropdown">
      <button class="btn " type="button" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="fa-solid fa-ellipsis-vertical"></i>
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href='./viewEmployee.html?id=${
          emp.id
        }'><i class="fa-regular fa-eye"></i> View Details</a></li>
        <li><button class="dropdown-item" type="button"id="editBtn" onclick=editor('${
          emp.id
        }')><i class="fa-solid fa-pen-to-square"></i> Edit</button></li>
        <li><button class="dropdown-item" id="dltBtn" type="button" onclick="Alert('${
          emp.id
        }','${index}')"><i class="fa-solid fa-trash"></i> Delete</button></li>
      </ul>
    </div>`;

    tbody.appendChild(tr);
  });
}

//new data
function newData() {
  let Dob = dob.value.split("-").reverse().join("-");
  return {
    // avatar: image,
    salutation: salutation.value,
    firstName: firstname.value,
    lastName: lastname.value,
    email: email.value,
    phone: mobileNumber.value,
    dob: Dob,
    gender: male.checked ? "Male" : female.checked ? "Female" : "Unknown",
    qualifications: qualifications.value,
    address: address.value,
    country: country.value,
    state: state.value,
    city: city.value,
    zip: zip.value,
    username: username.value,
    password: password.value,
  };
}

//posting new data to api and validation
submitBtn.addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent form submission refresh

  // Form validation logic
  let isValid = true;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const mobileRegex = /^\d{10}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (salutation.value.trim() === "select salutation") {
    salutationError.textContent = "Salutation is required!";
    isValid = false;
  } else {
    salutationError.textContent = "";
  }

  if (firstname.value.trim() === "") {
    firstnameError.textContent = "First name is required!";
    isValid = false;
  } else {
    firstnameError.textContent = "";
  }

  if (lastname.value.trim() === "") {
    lastnameError.textContent = "Last name is required!";
    isValid = false;
  } else {
    lastnameError.textContent = "";
  }

  if (email.value.trim() === "") {
    emailError.textContent = "Email is required!";
    isValid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    emailError.textContent = "Invalid email format!";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  if (mobileNumber.value.trim() === "") {
    mobileError.textContent = "Mobile number is required!";
    isValid = false;
  } else if (!mobileRegex.test(mobileNumber.value.trim())) {
    mobileError.textContent = "Mobile number must be 10 digits!";
    isValid = false;
  } else {
    mobileError.textContent = "";
  }

  if (dob.value.trim() === "") {
    dobError.textContent = "Date of birth is required!";
    isValid = false;
  } else {
    dobError.textContent = "";
  }

  if (qualifications.value.trim() === "") {
    qualificationError.textContent = "Qualification is required!";
    isValid = false;
  } else {
    qualificationError.textContent = "";
  }

  if (address.value.trim() === "") {
    addressError.textContent = "Address is required!";
    isValid = false;
  } else {
    addressError.textContent = "";
  }

  if (country.value.trim() === "Select country") {
    countryError.textContent = "Country is required!";
    isValid = false;
  } else {
    countryError.textContent = "";
  }

  if (state.value.trim() === "Select state") {
    stateError.textContent = "State is required!";
    isValid = false;
  } else {
    stateError.textContent = "";
  }

  if (city.value.trim() === "") {
    cityError.textContent = "City is required!";
    isValid = false;
  } else {
    cityError.textContent = "";
  }

  if (zip.value.trim() === "") {
    zipError.textContent = "ZIP is required!";
    isValid = false;
  } else {
    zipError.textContent = "";
  }

  if (username.value.trim() === "") {
    usernameError.textContent = "Username is required!";
    isValid = false;
  } else {
    usernameError.textContent = "";
  }

  if (password.value.trim() === "") {
    passwordError.textContent = "Password is required!";
    isValid = false;
  } else if (!passwordRegex.test(password.value.trim())) {
    passwordError.textContent =
      "Password must contain at least one capital letter and one number!";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }

  // If form is valid, proceed with submission
  if (isValid) {
    Data = newData(); // Get new data from form inputs
    await post(Data); // Post the data
    divForm.style.display = "none"; // Hide form after submission
    overlay.style.display = "none"; // Hide overlay after submission
    form.reset(); // Reset form fields after submission
  }
});

//clear error messages
document.getElementById("firstName").addEventListener("input", function () {
  document.getElementById("firstnameErr").textContent = "";
});

document.getElementById("lastName").addEventListener("input", function () {
  document.getElementById("lastnameErr").textContent = "";
});
document.getElementById("email").addEventListener("input", function () {
  document.getElementById("emailErr").textContent = "";
});
document.getElementById("mobileNumber").addEventListener("input", function () {
  document.getElementById("mobileNumErr").textContent = "";
});
document.getElementById("dob").addEventListener("input", function () {
  document.getElementById("dobErr").textContent = "";
});
document.getElementById("Qualifications").addEventListener("input", function () {
  document.getElementById("qualificationErr").textContent = "";
  });
document.getElementById("address").addEventListener("input", function () {
  document.getElementById("addressErr").textContent = "";
});
document.getElementById("country").addEventListener("input", function () {
  document.getElementById("countryErr").textContent = "";
});
document.getElementById("state").addEventListener("input", function () {
  document.getElementById("stateErr").textContent = "";
});
document.getElementById("city").addEventListener("input", function () {
  document.getElementById("cityErr").textContent = "";
});
document.getElementById("zip").addEventListener("input", function () {
  document.getElementById("zipErr").textContent = "";
});
document.getElementById("username").addEventListener("input", function () {
  document.getElementById("userNameErr").textContent = "";
});
document.getElementById("password").addEventListener("input", function () {
  document.getElementById("passwordErr").textContent = "";
});
document.getElementById("salutation").addEventListener("input", function () {
  document.getElementById("salutationErr").textContent = "";
});

//posting api
async function post(Data) {
  try {
    let response = await fetch("http://localhost:3000/employees", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(Data),
    });

    let result = await response.json(); // Await the JSON response
    Data.id = result.id; // Add the returned ID to the new data
    allData.unshift(Data); // Add the new employee to the start of the array
    renderData(allData); // Re-render the updated data
  } catch (error) {
    console.error(error);
  }
}

