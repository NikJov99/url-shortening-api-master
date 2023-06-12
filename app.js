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

  const copyButtons = document.querySelectorAll(".copy-button");
  const shortUrl = document.querySelector(".short-link-display");

  const copyLink = (event) => {
    const button = event.target;
    const shortUrl = button.previousElementSibling;
    navigator.clipboard.writeText(shortUrl.innerHTML);

    button.style.backgroundColor = "#3b3054";
    button.textContent = "Copied!";
  };

  copyButtons.forEach((button) => {
    button.addEventListener("click", copyLink);
  });
};

submitButton.addEventListener("click", shortenUrl);
