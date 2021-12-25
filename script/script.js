let user;
let none = false;


let password = document.querySelector(".password");
let body = document.querySelector("body");
let email = document.querySelector(".email");

// expression checker for email and password
const emailRegex = /^[a-zA-Z0-9]+@+[a-z]+.com+$/
const passwordRegex = /^[a-zA-Z0-9]+$/

//input wrong viewer in html

function errorView(error) {
    let element = document.querySelector(".view")
    element.innerText = error;
    setTimeout(function () {
        element.innerText = "";
    }, 3000)
}

// icon on load animation
function show() {
    let icon = document.querySelectorAll(".icon");
    for (let i = 0; i < icon.length; i++) {
        setTimeout(function () {
            icon[i].classList.add("show");
        }, 500 * i)
    }
}

//  Giving style to input (red color) means wrong input
function wrong(emailBool, passwordBool) {
    if (emailBool) {
        if (email.classList.contains('accepted')) {
            email.classList.remove("accepted");
            email.classList.add("wrong");
        } else {
            email.classList.add("wrong");
        }
    }
    if (passwordBool) {
        if (password.classList.contains('accepted')) {
            password.classList.remove("accepted");
            password.classList.add("wrong");
        } else {
            password.classList.add("wrong");
        }
    }
}


// Giving style to input (Green color) means right input
function right(emailBool, passwordBool) {
    if (emailBool) {
        if (email.classList.contains('wrong')) {
            email.classList.remove("wrong");
            email.classList.add("accepted");
        } else {
            email.classList.add("accepted");
        }
    }
    if (passwordBool) {
        if (password.classList.contains('wrong')) {
            password.classList.remove("wrong");
            password.classList.add("accepted");
        } else {
            password.classList.add("accepted");
        }
    }
}

function load() {
    let temp = JSON.parse(localStorage.getItem("user"));
    if (temp) {
        user = temp;
    }
    show();
}

// PlaceHolder Eraser
document.querySelectorAll("input").forEach(function (v) {
    v.addEventListener("focus", function (e) {
        e.target.setAttribute("placeholder", "");
    })
})

// Email Checker
email.addEventListener("change", function () {
    if (email.value.match(emailRegex)) {
        right(true, false);
    } else {
        wrong(true, false);
        errorView("Email Not Valid");
        email.value = "";
    }
})

// Password Checker
password.addEventListener("change", function () {
    if (password.value.match(passwordRegex)) {
        if (password.value.length < 5) {
            errorView("Password Length Must 5 or more char")
            wrong(false, true);
            password.value = "";
        } else {
            right(false, true);
        }
    } else {
        wrong(false, true);
        errorView("Password Not Valid");
        password.value = "";
    }
})

// Placeholder Adder
document.querySelectorAll("input").forEach(function (v) {
    v.addEventListener("focusout", function (e) {
        if (e.target.getAttribute("type") === "text") {
            e.target.setAttribute("placeholder", "Email");
        } else {
            e.target.setAttribute("placeholder", "Password");
        }
    })
})


// Submit Button
document.querySelector(".login").addEventListener('click', function (e) {
    e.preventDefault();
    if (user) {
        for (let i = 0; i < user.length; i++) {
            if (user[i].email === email.value && user[i].password === password.value) {
                window.location.href = "https://youtu.be/dQw4w9WgXcQ"
                none = false;
                break;
            } else {
                none = true;
            }
        }
    } else if (email.value === "" && password.value === "") {
        errorView("Input must filled")
        wrong(true, true);
        none = false;
    }
    if (none) {
        errorView("Email or Password you entered wrong");
        wrong(true, true);
    }
    email.value = "";
    password.value = "";
})

