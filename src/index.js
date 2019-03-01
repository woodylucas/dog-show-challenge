document.addEventListener('DOMContentLoaded', async () => {

const dogsData = await data();

let dogId;


const tableBody =
document.querySelector('#table-body')

const dogForm = document.querySelector('#dog-form');

const renderDogHTML = (dogs) => {
  dogs.map(tableRow).join('')
}


const tableRow = (dog) => {
  const tr = document.createElement('tr');
  tr.innerHTML = dogShowHTML(dog);
  tr.dataset.id = dog.id;
  tableBody.append(tr);
  return tr;

}


const dogShowHTML = (dog) => {
  return (`
    <td data-id="${dog.id}">${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td><td><button data-id="${dog.id}" class="dog-btn">Edit</button></td>
    `)

}

// addEventListener
tableBody.addEventListener('click', handleEditForm)

dogForm.addEventListener('submit', handleSubmitButton)


function handleSubmitButton(event) {
  event.preventDefault();
  // debugger
  if(event.target.querySelector('#submit-btn').id === 'submit-btn') {
    const doggyName = event.target.name.value;
    // event.target.parentNode.parentNode.querySelector('#table-body').querySelectorAll('tr')[0].querySelectorAll('td')[0].textContent

    const doggyBreed = event.target.breed.value;

    const doggySex = event.target.sex.value;

    const editDoggy = {
      name: doggyName,
      breed: doggyBreed,
      sex: doggySex
    }
    // debugger


    // debugger
    patchDog(dogId, editDoggy).then(editDog => {
      let row = document.querySelector(`tr[data-id="${editDog.id}"]`)
      // let name = document.querySelector(`tr[data-id="7"]`).firstElementChild;
      // let breed = document.querySelector(`tr[data-id="7"]`).firstElementChild.nextSibling

      row.innerHTML = dogShowHTML(editDog);
    })
  }
  // debugger

}

function handleEditForm(event){
  // debugger
    if (event.target.classList.contains('dog-btn')
) {
  dogId = event.target.dataset.id;
    dogForm.name.value = event.target.parentNode.parentNode.querySelectorAll('td')[0].textContent
    dogForm.breed.value = event.target.parentNode.parentNode.querySelectorAll('td')[1].textContent
    dogForm.sex.value = event.target.parentNode.parentNode.querySelectorAll('td')[2].textContent
    }

    }


// fetches
async function data() {
  const response = await fetch('http://localhost:3000/dogs')
  const jsonResponse = await response.json();
  return jsonResponse;
}


const patchDog = (id, dog) => {
  return fetch(`http://localhost:3000/dogs/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dog)
  }).then(resp => resp.json())

}



renderDogHTML(dogsData)


})
