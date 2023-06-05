const toggleMobileMenuButton = document.querySelector(".mobile-menu-button");
const mobileSubmenu = document.querySelector(".mobile-submenu");

console.log(mobileSubmenu);

const toggleMobileMenu = () => {
  mobileSubmenu.classList.toggle("mobile-submenu-active");
};

toggleMobileMenuButton.addEventListener("click", toggleMobileMenu);
