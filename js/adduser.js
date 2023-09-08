const backButton = document.getElementById("backButton");
backButton.addEventListener("click", () => {
  window.location.href = "index.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("userForm");
  const messageDiv = document.getElementById("message");
  document.querySelector(".user-form").classList.add("show");

  userForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const job = document.getElementById("job").value;

    const userData = {
      name: name,
      job: job,
    };

    fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        messageDiv.innerHTML = `Başarılı! Kullanıcı oluşturuldu. ID: ${data.id}`;
        userForm.reset();
      })
      .catch((error) => {
        messageDiv.innerHTML = `Hata: ${error.message}`;
      });
  });
});
