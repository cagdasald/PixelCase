async function fetchUserDetail(id) {
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`);
      if (!response.ok) {
        throw new Error("Veri çekme hatası.");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Hata:", error);
    }
  }

  function displayUserDetails(userData) {
    const detailsContainer = document.querySelector(".user-cards-container");
    detailsContainer.innerHTML = "";
    
    const userDetails = createUserDetailCard(userData);
    detailsContainer.appendChild(userDetails);
  }

  function createUserDetailCard(userData) {
    const userDetails = document.createElement("div");
    userDetails.classList.add("user-card");
  
    const userImage = document.createElement("img");
    userImage.src = userData.avatar;
    userImage.alt = `${userData.first_name} ${userData.last_name}`;
  
    const userName = document.createElement("h3");
    userName.textContent = `${userData.first_name} ${userData.last_name}`;
  
    const userEmail = document.createElement("p");
    userEmail.textContent = `${userData.email}`;
  
    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.classList.add("app-button");
    backButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });
  
    userDetails.appendChild(userImage);
    userDetails.appendChild(userName);
    userDetails.appendChild(userEmail);
    userDetails.appendChild(backButton);
  
    return userDetails;
  }

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");
    document.querySelector(".user-cards-container").classList.add("show");
  
    if (userId) {
      fetchUserDetail(userId)
        .then((userData) => {
          displayUserDetails(userData);
        })
        .catch((error) => {
          console.error("Hata:", error);
        });
    }
  });