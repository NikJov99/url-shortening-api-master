const toggleMobileMenuButton = document.querySelector(".mobile-menu-button");
const mobileSubmenu = document.querySelector(".mobile-submenu");
const form = document.querySelector("form");
const submitButton = document.querySelector(".submit-button");

const toggleMobileMenu = () => {
  mobileSubmenu.classList.toggle("mobile-submenu-active");
};

toggleMobileMenuButton.addEventListener("click", toggleMobileMenu);

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

const shortenUrl = async () => {
  const userInput = document.querySelector("input");
  const userInputUrl = document.querySelector("input").value;
  const errorMsg = document.querySelector(".error-msg");

  try {
    if (userInputUrl == "") {
      userInput.classList.add("error");
      errorMsg.innerHTML = "no link enetered";
    } else {
      userInput.classList.remove("error");
      errorMsg.innerHTML = "";

      const response = await fetch(
        `https://api.shrtco.de/v2/shorten?url=${userInputUrl}`
      );
      const data = await response.json();

      console.log(data);

      let html = "";

      html += `
      <div class="short-link-group">
      <button class="delete-button">X</button>
        <a href="${data.result.original_link}" target="_blank" class="user-link">${data.result.original_link}</a>
        <hr />
        <div>
          <a href="${data.result.short_link}" target="_blank" class="short-link-display">${data.result.short_link}</a>
          <button class="copy-button">Copy</button>
        </div>
      </div>
      `;

      const linkContainer = document.querySelector(".short-links-container");
      linkContainer.innerHTML += html;
    }
  } catch (error) {
    errorMsg.innerHTML = "invalid link or server error";
  }

  const copyButton = document.querySelectorAll(".copy-button");
  const shortUrl = document.querySelector(".short-link-display");

  const copyLink = (event) => {
    const button = event.target;
    const shortUrl = button.previousElementSibling;
    navigator.clipboard.writeText(shortUrl.innerHTML);
  };

  copyButton.forEach((button) => {
    button.addEventListener("click", copyLink);
  });

  const deleteButtons = document.querySelectorAll(".delete-button");

  const deleteLink = (event) => {
    const deleteButton = event.target;
    const shortLinkGroup = deleteButton.closest(".short-link-group");
    shortLinkGroup.remove();
  };

  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteLink);
  });
};

submitButton.addEventListener("click", shortenUrl);
