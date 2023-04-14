import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfZlJba1nQNrCF8WNAQ5JzIRkLlimA0ps",
  authDomain: "to-do-befa3.firebaseapp.com",
  databaseURL: "https://to-do-befa3-default-rtdb.firebaseio.com",
  projectId: "to-do-befa3",
  storageBucket: "to-do-befa3.appspot.com",
  messagingSenderId: "368514741568",
  appId: "1:368514741568:web:26c72baf3bf2ab0a0336a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

document.addEventListener('DOMContentLoaded', function() {

  
  const database = getDatabase(app);
  const shoppingListinDB = ref(database, "shoppingList")
  
  const inputField = document.querySelector("#input-field")
  const shoppingListUL = document.querySelector('#shopping-list');

  document.querySelector("#add-button").onclick = function() {
    let listItem = inputField.value
    if (listItem == "") return
    addItem(listItem)
    clearInputField()
  };

  inputField.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
      document.querySelector("#add-button").click()
    }
  })
 
  const addItem = (value) =>{
    push(shoppingListinDB, value)
  }

  const removeItem = (id) => {
    console.log(id)
    let itemLocationDB = ref(database, `shoppingList/${id}`)
    remove(itemLocationDB)
  }

  onValue(shoppingListinDB, (snapshot) => {
    if (snapshot.exists()) {
      let itemsList = Object.entries(snapshot.val())
      updateList(itemsList)
     }
     if  (!snapshot.exists()) {shoppingListUL.innerHTML = "Add items to Cart"}
  });

  const clearInputField = () => {
    inputField.value = ""
  }

  const clearShoppingListUL = () => {
    shoppingListUL.innerHTML = ""
  }

  const updateList= (arr) => {
    clearShoppingListUL()
    arr.forEach((item) => {
      addLi(...item)
    })
  }

  const addLi = (id, value) => {
    let listElement = document.createElement('li')
    listElement.textContent = value
    listElement.addEventListener('click', () => {removeItem(id)})
    shoppingListUL.append(listElement)
  }

});