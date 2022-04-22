let homeDiv = document.querySelector(".home-container");
const categoriesTable = document.querySelector(".category-list");
const businessesTable = document.querySelector(".business-list");
const categoryForm = document.getElementById("category-form");
const businessForm = document.getElementById("business-form");
const categoryTableContent = document.querySelector(".category-list");
const selectElement = document.querySelector("#business-category");
const closeModalIcon = document.querySelector(".close");
const modalContainer = document.querySelector(".modal-container");
const modalContent = document.querySelector(".modal-content");
const searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searchForm.children[0].value;
  document.querySelectorAll(".category").forEach((element) => element.remove());
  displayCategories(searchTerm);
});

closeModalIcon.addEventListener("click", (e) => {
  e.target.parentNode.setAttribute("id", "modal-container");
});

async function getCategories() {
  if (localStorage.getItem("categories")) {
    const categories = await JSON.parse(localStorage.getItem("categories"));
    return categories;
  }
  const categories = await loadCategories();
  localStorage.setItem("categories", JSON.stringify(categories));

  return categories;
}

async function getBusinesses() {
  if (localStorage.getItem("businesses")) {
    const businesses = await JSON.parse(localStorage.getItem("businesses"));
    return businesses;
  }
  const businesses = await loadBusinesses();
  localStorage.setItem("businesses", JSON.stringify(businesses));
  return businesses;
}

displayBusinessSelectOptions();

async function displayBusinessSelectOptions() {
  const categories = await getCategories();
  categories.forEach((category) => {
    //let optionValue = category.id
    const option = document.createElement("option");

    option.setAttribute("value", category.id);
    option.textContent = category.category;
    selectElement.appendChild(option);
  });
}

categoryForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const categoryValue = e.target.category.value;
  let category = await createCategory(categoryValue);
  const categories = JSON.parse(localStorage.getItem("categories"));
  category.id = categories.length + 1;
  localStorage.setItem("categories", JSON.stringify([...categories, category]));
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  td1.textContent = category.id;
  td2.textContent = category.category;
  tr.appendChild(td1);
  tr.appendChild(td2);
  categoryTableContent.appendChild(tr);
  categoryForm.reset();
  alert("Category created successfully");
});

businessForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const categoryName =
    e.target.select.options[e.target.select.selectedIndex].textContent;
  const categoryId = parseInt(e.target.select.value);
  const name = e.target.name.value;
  const description = e.target.description.value;
  let services = e.target.services.value;
  services = services.split(",");
  const likes = 0;
  const business = {
    category: { id: categoryId, category: categoryName },
    name,
    description,
    services,
    likes,
  };
  let businessResp = await createBusiness(business);

  const businesses = JSON.parse(localStorage.getItem("businesses"));
  businessResp.id = businesses.length + 1;
  localStorage.setItem(
    "businesses",
    JSON.stringify([...businesses, businessResp])
  );
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");
  const td5 = document.createElement("td");
  const td6 = document.createElement("td");
  td1.textContent = businessResp.id;
  td2.textContent = businessResp.category.category;
  td3.textContent = businessResp.name;
  td4.textContent = businessResp.description;
  td5.textContent = businessResp.likes;
  td6.textContent = businessResp.services;
  const td7 = document.createElement("button");
  const delBtn = deleteBtn(td7);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(td6);
  tr.appendChild(delBtn);
  businessesTable.appendChild(tr);
  businessForm.reset();
  alert("Business created successfully");
});

function loadCategories() {
  return fetch(
    "https://my-json-server.typicode.com/kiborgok/biashara-hub/categories"
  )
    .then((res) => res.json())
    .then((categories) => categories);
}

async function adminBusinessesTable() {
  let businesses = await getBusinesses();
  businesses.forEach((business) => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    const td6 = document.createElement("td");
    const td7 = document.createElement("button");
    const delBtn = deleteBtn(td7, business);
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
    tr.appendChild(delBtn);
    businessesTable.appendChild(tr);
  });
}

function deleteBtn(element, business) {
  element.setAttribute("class", "btn-danger");
  element.setAttribute("type", "button");
  element.textContent = "Delete";
  element.style.margin = "10px";
  element.style.border = "none";
  element.style.borderRadius = "10px";
  element.style.backgroundColor = "red";
  element.addEventListener("click", (e) => {
    //console.log(parseInt(e.target.parentNode.firstChild.textContent));
    //const id = parseInt(e.target.parentNode.firstChild.textContent);
    console.log(business);
    console.log(deleteBusiness(business));
    e.target.parentNode.remove();
    alert("Business deleted successfully");
  });
  return element;
}
adminBusinessesTable();

async function adminCategoriesTable() {
  const categories = await getCategories();
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
  return fetch(
    `https://my-json-server.typicode.com/kiborgok/biashara-hub/categories`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ category }),
    }
  )
    .then((res) => res.json())
    .then((data) => data);
}

function deleteBusiness(business) {
  let businesses = JSON.parse(localStorage.getItem("businesses"));
  const businessesFilter = businesses.filter((biz) => biz.id !== business.id);
  localStorage.setItem("businesses", JSON.stringify(businessesFilter));
}

function createBusiness({ category, name, description, services, likes }) {
  return fetch(
    `https://my-json-server.typicode.com/kiborgok/biashara-hub/businesses`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ category, name, description, services, likes }),
    }
  )
    .then((res) => res.json())
    .then((data) => data);
}

async function displayCategories(show = "all") {
  if (homeDiv.contains(document.getElementById("msg-err"))) {
    homeDiv.children[1].remove()
  }
  if (show.toLowerCase() === "all") {
    const categories = await getCategories();
    createCategoryCard(categories);
    return;
  }
  const categories = await getCategories();
  const filteredCategories = categories.filter((category) =>
    category.category.toLowerCase().includes(show.toLowerCase())
  );

  let messageElement = document.createElement("h3");
  if (filteredCategories.length === 0) {
    messageElement.textContent = `Category with search term "${show}" not found. `;
    messageElement.style.margin = "30px";
    messageElement.setAttribute("id", "msg-err");
    createCategoryCard(filteredCategories, messageElement);
    return;
  }
  createCategoryCard(filteredCategories, messageElement);
}
displayCategories();

function createCategoryCard(categories, messageElement) {
  if (categories.length === 0) {
    homeDiv.appendChild(messageElement);
    return;
  }
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
  const businesses = await getBusinesses();
  businesses.forEach((business) => {
    if (
      eachCategoryItemsDiv.previousElementSibling.textContent ===
        category.category &&
      business.category.category === category.category
    ) {
      let serviceArr = business.services.map((service) => service);
      let bizServices = document.createElement("div");
      bizServices.style.display = "flex";
      bizServices.style.alignItems = "center";
      let servicesTitle = document.createElement("h5");
      servicesTitle.style.margin = "0px";
      servicesTitle.style.marginRight = "10px";
      servicesTitle.textContent = "Products & services: ";
      bizServices.appendChild(servicesTitle);
      serviceArr.forEach((service) => {
        let span = document.createElement("span");
        span.setAttribute("class", "badge badge-success");
        span.style.backgroundColor = "orange";
        span.style.margin = "3px";
        span.textContent = service;
        bizServices.appendChild(span);
      });

      let h4 = document.createElement("h4");
      let bizTitle = document.createElement("h4");
      let bizDescription = document.createElement("p");
      let bizCategory = document.createElement("h5");

      bizCategory.textContent = `Category: ${business.category.category}`;
      h4.textContent = business.name;
      bizTitle.textContent = business.name;
      h4.style.textAlign = "center";
      h4.style.fontFamily = "Lobster";
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
        e.stopPropagation();
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
      bizDescription.textContent = business.description;
      p.style.textAlign = "center";
      let itemContainer = document.createElement("div");
      itemContainer.classList.add("class", "item");
      itemContainer.addEventListener("click", (e) => {
        modalContent.textContent = "";
        modalContent.appendChild(bizTitle);
        modalContent.appendChild(bizDescription);
        modalContent.appendChild(bizCategory);
        modalContent.appendChild(bizServices);
        modalContainer.removeAttribute("id");
      });

      itemContainer.appendChild(h4);
      itemContainer.appendChild(p);
      itemContainer.appendChild(likeDiv);
      eachCategoryItemsDiv.appendChild(itemContainer);
    }
  });
}

function loadBusinesses() {
  return fetch(
    "https://my-json-server.typicode.com/kiborgok/biashara-hub/businesses"
  )
    .then((res) => res.json())
    .then((data) => data);
}
