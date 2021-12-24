// array to store user data
let user = [];

//expression to check email and password
const emailRegex = /^[a-zA-Z0-9]+@+[a-z]+.com+$/
const passwordRegex = /^[a-zA-Z0-9]+$/

let email = document.querySelector(".email");
let password = document.querySelector(".password");
let reenter = document.querySelector(".reenter");

//icon on load animation
function load() {
    let icon = document.querySelectorAll(".icon");
    for (let i = 0; i < icon.length; i++) {
        setTimeout(function () {
            icon[i].classList.add("show");
        }, 500 * i)
    }
}

function wrong(emailBool, passwordBool, reenterBool) {
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
    if (reenterBool) {
        if (reenter.classList.contains('accepted')) {
            reenter.classList.remove("accepted");
            reenter.classList.add("wrong");
        } else {
            reenter.classList.add("wrong");
        }
    }
}


// Giving style to input (Green color) means right input
function right(emailBool, passwordBool, reenterBool) {
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
    if (reenterBool) {
        if (reenter.classList.contains('wrong')) {
            reenter.classList.remove("wrong");
            reenter.classList.add("accepted");
        } else {
            reenter.classList.add("accepted");
        }
    }
}

//error viewer in html
function errorView(error) {
    let element = document.querySelector(".view")
    element.innerText = error;
    setTimeout(function () {
        element.innerText = "";
    }, 3000)
}

// email checker
email.addEventListener("change", function () {
    if (email.value.match(emailRegex)) {
        right(true, false, false);
    } else {
        wrong(true, false, false);
        errorView("Email Not Valid");
        email.value = "";
    }
})
//password checker
password.addEventListener("change", function () {
    if (password.value.match(passwordRegex)) {
        if (password.value.length < 6) {
            errorView("Password Length Must 5 or more char")
            wrong(false, true, false);
            password.value = "";
        } else {
            right(false, true, false);
        }
    } else {
        wrong(false, true, false);
        errorView("Password Not Valid");
        password.value = "";
    }
})
// reenter checker
reenter.addEventListener("change", function () {
    if (reenter.value == password.value) {
        right(false, false, true);
    } else {
        wrong(false, false, true);
        errorView("Password Not similar");
        reenter.value = "";
    }
})

// placeholder eraser
document.querySelectorAll("input").forEach(function (v) {
    v.addEventListener("focus", function (e) {
        e.target.setAttribute("placeholder", "");
    })
})

//placeholder adder
document.querySelectorAll("input").forEach(function (v) {
    v.addEventListener("focusout", function (e) {
        if (e.target.getAttribute("type") === "text") {
            e.target.setAttribute("placeholder", "Email");
        } else if (e.target.classList.contains("reenter")) {
            e.target.setAttribute("placeholder", "Reenter Password");
        } else {
            e.target.setAttribute("placeholder", "Password");
        }
    })
})

//sign in button
document.querySelector(".sign-in-button").addEventListener('click', function (e) {
    e.preventDefault();
    let accepted = 0;
    if (email.value === "" && password.value === "" && reenter.value === "") {
        errorView("Input must filled")
    } else {
        document.querySelectorAll(".input").forEach(function (v) {
            if (v.classList.contains('accepted')) {
                accepted++;
            }
        })
        if (accepted === 3) {
            user.push({ email: email.value, password: password.value })
            localStorage.setItem("user", JSON.stringify(user))
            window.location.href = "index.html"
        }
    }
    email.value = "";
    password.value = "";
    reenter.value = "";
})