let currentPage = 1;
let totalPages = 0;
let users = [];

async function fetchUsers() {
  try {
    const response = await fetch(
      `https://reqres.in/api/users?page=${currentPage}`
    );
    if (!response.ok) {
      throw new Error("Veri çekme hatası.");
    }
    const data = await response.json();
    users = data.data;
    currentPage = data.page;
    totalPages = data.total_pages;
  } catch (error) {
    console.error("Hata:", error);
  }
}

function displayUsers() {
  const userCardsContainer = document.querySelector(".user-cards-container");
  userCardsContainer.innerHTML = "";

  users.forEach((user) => {
    const userCard = createUserCard(user);
    userCardsContainer.appendChild(userCard);
  });
}

function createUserCard(user) {
  const userCard = document.createElement("div");
  userCard.classList.add("user-card");

  const userImage = document.createElement("img");
  userImage.src = user.avatar;
  userImage.alt = `${user.first_name} ${user.last_name}`;

  const userName = document.createElement("h3");
  userName.textContent = `${user.first_name} ${user.last_name}`;

  const userEmail = document.createElement("p");
  userEmail.textContent = `${user.email}`;

  const viewDetailsButton = document.createElement("button");
  viewDetailsButton.textContent = "Review";
  viewDetailsButton.classList.add("app-button");
  viewDetailsButton.addEventListener("click", () => {
    window.location.href = `details.html?id=${user.id}`;
  });

  userCard.appendChild(userImage);
  userCard.appendChild(userName);
  userCard.appendChild(userEmail);
  userCard.appendChild(viewDetailsButton);

  return userCard;
}

function updatePaginationButtons(currentPage, totalPages) {
  const prevPageButton = document.getElementById("prevPage");
  const nextPageButton = document.getElementById("nextPage");
  const pageNumbersContainer = document.querySelector(".page-numbers");

  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === totalPages;

  pageNumbersContainer.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const pageNumberButton = document.createElement("button");
    pageNumberButton.textContent = i;
    pageNumberButton.classList.add("pagination-btn");

    if (i === currentPage) {
      pageNumberButton.classList.add("active-page");
    }

    pageNumberButton.setAttribute("page", i);

    pageNumbersContainer.appendChild(pageNumberButton);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const prevPageButton = document.getElementById("prevPage");
  const nextPageButton = document.getElementById("nextPage");
  const pageNumberButton = document.querySelector(".page-numbers");
  document.querySelector(".user-cards-container").classList.add("show");

  const createNewMemberButton = document.querySelector(".app-button");
  createNewMemberButton.addEventListener("click", () => {
    window.location.href = "adduser.html";
  });

  pageNumberButton.addEventListener("click", (event) => {
    const selectedPage = event.target.getAttribute("page");
    currentPage = parseInt(selectedPage);
    fetchDataAndDisplay();
  });

  prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchDataAndDisplay();
    }
  });

  nextPageButton.addEventListener("click", () => {
    currentPage++;
    fetchDataAndDisplay();
  });

  fetchDataAndDisplay();

  function fetchDataAndDisplay() {
    fetchUsers().then(() => {
      displayUsers();
      updatePaginationButtons(currentPage, totalPages);
    });
  }
});