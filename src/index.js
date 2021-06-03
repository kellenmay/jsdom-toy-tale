let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  showToys();
  toySubmitListener();
  
});

// show all toys on page load
function showToys() {
  toyCollection = document.querySelector("#toy-collection");

  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => addToysToDOM(json))
}

function addToysToDOM(toys) {
  for (const toy of toys) {
    createNewToy(toy)
  }
}

function createNewToy(toy) {
  let div = document.createElement("div");
  let h2 = document.createElement("h2");
  h2.innerText = toy.name;
  let img = document.createElement("img");
  img.setAttribute("src", toy.image);
  img.setAttribute("class", "toy-avatar");
  let p = document.createElement("p");
  p.innerText = `likes -- ${toy.likes}`
  let btn = document.createElement("button");
  btn.setAttribute("class", "like-btn")
  btn.innerText = "Like <3"

  // append new div
  toyCollection.appendChild(div);
  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(btn);
}

function toySubmitListener() {
  const toySubmitBtn = document.querySelector(".add-toy-form");
  const toyNameInput = document.querySelector(".containter").children[0];
  const toyImageInput = document.querySelector(".container").children[1];

  toySubmitBtn.addEventListener("click", function() {
    let formData = {
      name: toyNameInput.value,
      email: toyImageInput.value,
      likes: 0
    };
  
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };
  
    return fetch("http://localhost:3000/toys", configObj)
      .then(function(response) {
        return response.json();
      })
      .then(createNewToy(object))
      .catch(function(error) {
        alert("Something is amiss!");
      })
  })
}