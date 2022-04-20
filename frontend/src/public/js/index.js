// const { listen } = require("express/lib/application");

// const { render, json } = require("express/lib/response")
localStorage.setItem("todoUserId", JSON.stringify(1));
const ul = document.querySelector("#list");

function checkUser() {
  const userId = window.localStorage.getItem("todoUserId");
  if (!userId) return window.location.replace("/login");
  else {
    renderusers();
  }
  logOut.addEventListener("click", () => {
    window.location.replace("/login");
  });
}

async function renderusers() {
  let data = await fetch("http://localhost:9595/users");
  data = await data.json();
  for (let i of data) {
    let a = document.createElement("a");
    let li = document.createElement("li");
    li.innerText = i.username;
    a.append(li);
    list.append(a);
    li.id = i.userId;
    li.addEventListener("click", () => {
      localStorage.setItem("tempId", JSON.stringify(li.id));
      return window.location.replace("/todo");
    });
  }
}

checkUser();

logOut.addEventListener("click", () => {
  localStorage.setItem("todoUserId", '')
  window.location.replace("/login");
})