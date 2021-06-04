const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const toyCollection = document.querySelector("#toy-collection")
let addToy = false;


document.addEventListener("DOMContentLoaded", ()=>{


  fetch("http://localhost:3000/toys")
    .then(r => r.json())
    .then(toys => {
      let toysHTML = toys.map(function(toy){
        return `
        <div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>  
        <button data-id="${toy.id}"class="like-btn">Like <3</button>
        </div> 
        `
      })
      toyCollection.innerHTML = 
      toysHTML.join('')
    })
  })


  
  addBtn.addEventListener('click', () => {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
    })



  toyForm.addEventListener("submit", function(e){
    e.preventDefault()  
      console.log(e.target.name)
      const toyName = e.target.name.value
      const toyImage = e.target.image.value

      fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image:toyImage, 
        likes: 99
      })
    })
    .then(response => response.json())
    .then( newToy => {
      let newToyHTML= `
      <div class="card">
      <h2>${newToy.name}</h2>
      <img src=${newToy.image} class="toy-avatar" />
      <p>${newToy.likes} Likes </p>
      <button data-id="${newToy.id}"class="like-btn">Like <3</button>
      <button data-id="${newToy.id}"class="delete-btn">Back in the toy chest</button>
      </div> 
      `
      toyCollection.innerHTML += 
      newToyHTML

      console.log(e.target.reset())
    })
    
    toyCollection.addEventListener("click", (e) => {
      if (e.target.className === "like-btn"){
        let currentLikes = parseInt (e.target.previousElementSibling.innerText)
        let newLikes = currentLikes + 1
        e.target.previousElementSibling.innerText = newLikes + " likes"

        fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            likes: newLikes
          })
        })
      }
      if (e.target.className === "delete-btn"){
        fetch(`http://localhost:3000/toys/${e.target.dataset.id}`), {
          method: "DELETE"
        }
        .then ( r => {
          e.target.partentElement.remove()
        })
      }
    })
  })












// document.addEventListener("DOMContentLoaded", () => {

//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
//   showToys();
//   toySubmitListener();
  
// });

// // show all toys on page load
// function showToys() {
//   toyCollection = document.querySelector("#toy-collection");

//   fetch("http://localhost:3000/toys")
//   .then(resp => resp.json())
//   .then(json => addToysToDOM(json))
// }

// function addToysToDOM(toys) {
//   for (const toy of toys) {
//     createNewToy(toy)
//   }
// }

// function createNewToy(toy) {
//   let div = document.createElement("div");
//   let h2 = document.createElement("h2");
//   h2.innerText = toy.name;
//   let img = document.createElement("img");
//   img.setAttribute("src", toy.image);
//   img.setAttribute("class", "toy-avatar");
//   let p = document.createElement("p");
//   p.innerText = `likes -- ${toy.likes}`
//   let btn = document.createElement("button");
//   btn.setAttribute("class", "like-btn")
//   btn.innerText = "Like <3"

//   // append new div
//   toyCollection.appendChild(div);
//   div.appendChild(h2);
//   div.appendChild(img);
//   div.appendChild(p);
//   div.appendChild(btn);
// }

// function toySubmitListener() {
//   const toySubmitBtn = document.querySelector(".add-toy-form");
//   const toyNameInput = document.querySelector(".containter").children[0];
//   const toyImageInput = document.querySelector(".container").children[1];

//   toySubmitBtn.addEventListener("click", function() {
//     let formData = {
//       name: toyNameInput.value,
//       email: toyImageInput.value,
//       likes: 0
//     };
  
//     let configObj = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify(formData)
//     };
  
//     return fetch("http://localhost:3000/toys", configObj)
//       .then(function(response) {
//         return response.json();
//       })
//       .then(createNewToy(object))
//       .catch(function(error) {
//         alert("Something is amiss!");
//       })
//   })
// }