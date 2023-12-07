function dropdown() {
    const menu = document.getElementById("dropdown");
    if (menu.classList.contains("show")) {
      menu.classList.remove('show');
    } else {
      menu.classList.toggle("show");
    }
  }
