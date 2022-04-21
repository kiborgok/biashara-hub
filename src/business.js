const categoriesTable = document.querySelector(".category-list");
const businessesTable = document.querySelector(".business-list");
const categoryForm = document.getElementById("category-form");
const businessForm = document.getElementById("business-form");
const categoryTableContent = document.querySelector(".category-list");
const selectElement = document.querySelector("#business-category");

displayBusinessSelectOptions()

async function displayBusinessSelectOptions() {
  let categories = await loadCategories();
  categories.forEach(category => {
    //let optionValue = category.id
    const option = document.createElement("option");
    
    option.setAttribute("value", category.id);
    option.textContent = category.category;
    selectElement.appendChild(option)
  })
}

categoryForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const categoryValue = e.target.category.value;
  const category = await createCategory(categoryValue);
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  td1.textContent = category.id
  td2.textContent = category.category;
  tr.appendChild(td1)
  tr.appendChild(td2);
  categoryTableContent.appendChild(tr)
});

businessForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const categoryName = e.target.select.options[e.target.select.selectedIndex].textContent;
  const categoryId = parseInt(e.target.select.value);
  const name = e.target.name.value;
  const description = e.target.description.value;
  let services = e.target.services.value;
  services = services.split(",")
  const likes = 0
  const business = {
    category: { id: categoryId, category: categoryName },
    name,
    description,
    services,
    likes
  };
  createBusiness(business)
});

function loadCategories() {
  return fetch("http://localhost:3000/categories")
    .then((res) => res.json())
    .then((categories) => categories);
}

async function adminBusinessesTable() {
  let businesses = await loadCategories();
  categories.forEach((category) => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    td1.textContent = category.id;
    td2.textContent = category.category;
    tr.appendChild(td1);
    tr.appendChild(td2);
    categoriesTable.appendChild(tr);
  });
}

async function adminBusinessesTable() {
  let businesses = await loadBusinesses();
  businesses.forEach((business) => {
    console.log(business.services)
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    const td6 = document.createElement("td");
    td1.textContent = business.id;
    td2.textContent = business.category.category;
    td3.textContent = business.name;
    td4.textContent = business.description;
    td5.textContent = business.likes;
    td6.textContent = business.services;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    businessesTable.appendChild(tr);
  });
}
adminBusinessesTable()

async function adminCategoriesTable() {
  let categories = await loadCategories();
  categories.forEach((category) => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    td1.textContent = category.id;
    td2.textContent = category.category;
    tr.appendChild(td1);
    tr.appendChild(td2);
    categoriesTable.appendChild(tr);
  });
}
adminCategoriesTable();

function createCategory(category) {
  return fetch(`http://localhost:3000/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ category }),
  })
    .then((res) => res.json())
    .then((data) => data);
}

function createBusiness({category,name,description,services,likes}) {
  return fetch(`http://localhost:3000/businesses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ category, name, description, services, likes }),
  })
    .then((res) => res.json())
    .then((data) => data);
}


async function displayCategories() {
  let categories = await loadCategories();
  createCategoryCard(categories);
}
displayCategories();

function createCategoryCard(categories) {
  let homeDiv = document.querySelector(".home-container");
  categories.forEach((category) => {
    let categoryContainer = document.createElement("div");
    categoryContainer.setAttribute("class", "category");
    let h3 = document.createElement("h3");
    let eachCategoryItems = document.createElement("div");
    eachCategoryItems.classList.add("class", "each-category-items");
    h3.textContent = category.category;
    h3.style.fontWeight = "bold";
    h3.style.color = "orange";
    categoryContainer.appendChild(h3);
    categoryContainer.appendChild(eachCategoryItems);
    homeDiv.appendChild(categoryContainer);

    displayBusinesses(eachCategoryItems, category);
  });
}

async function displayBusinesses(eachCategoryItemsDiv, category) {
  const businesses = await loadBusinesses();
  businesses.forEach((business) => {
    if (
      eachCategoryItemsDiv.previousElementSibling.textContent ===
        category.category &&
      business.category.category === category.category
    ) {
      let h4 = document.createElement("h4");
      h4.textContent = business.name;
      h4.style.textAlign = "center";
      let p = document.createElement("p");
      let likeDiv = document.createElement("div");
      likeDiv.style.display = "flex";
      likeDiv.style.justifyContent = "center";
      likeDiv.style.alignItems = "center";
      let likeIcon = document.createElement("i");
      let likes = document.createElement("div");
      likes.style.marginLeft = "10px";
      likes.style.fontSize = "18px";
      likes.style.color = "orangered";
      likes.style.fontWeight = "bold";
      likes.textContent = business.likes;
      likeIcon.setAttribute("class", "bi");
      likeIcon.classList.add("bi-heart");
      likeIcon.addEventListener("click", (e) => {
        const likesDiv = e.target.nextSibling;
        let numOfLikes = parseInt(likesDiv.textContent);
        if (likeIcon.classList.contains("bi-heart")) {
          setTimeout(() => {
            numOfLikes += 1;
            likesDiv.textContent = numOfLikes;
          }, 1000);
          likeIcon.classList.remove("bi-heart");
          likeIcon.classList.add("bi-heart-fill");
          return;
        }
        likeIcon.classList.remove("bi-heart-fill");
        likeIcon.classList.add("bi-heart");
        setTimeout(() => {
          numOfLikes -= 1;
          likesDiv.textContent = numOfLikes;
        }, 1000);
      });
      likeDiv.appendChild(likeIcon);
      likeDiv.appendChild(likes);
      p.textContent = business.description;
      p.style.textAlign = "center";
      let itemContainer = document.createElement("div");
      itemContainer.classList.add("class", "item");

      itemContainer.appendChild(h4);
      itemContainer.appendChild(p);
      itemContainer.appendChild(likeDiv);
      eachCategoryItemsDiv.appendChild(itemContainer);
    }
  });
}

function loadBusinesses() {
  return fetch("http://localhost:3000/businesses")
    .then((res) => res.json())
    .then((data) => data);
}