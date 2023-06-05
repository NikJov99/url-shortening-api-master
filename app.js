const toggleMobileMenuButton = document.querySelector(".mobile-menu-button");
const mobileSubmenu = document.querySelector(".mobile-submenu");

const toggleMobileMenu = () => {
  mobileSubmenu.classList.toggle("mobile-submenu-active");
};

toggleMobileMenuButton.addEventListener("click", toggleMobileMenu);
