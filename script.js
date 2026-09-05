(() => {
  const menuButton =
    document.querySelector(".menu-btn");

  const menu =
    document.querySelector(".menu");

  const menuLinks = [
    ...document.querySelectorAll(
      '.menu a[href^="#"]'
    )
  ];

  const sections = [
    ...document.querySelectorAll(
      "main section[id]"
    )
  ];

  const revealElements =
    document.querySelectorAll(".reveal");

  const hero =
    document.querySelector(".hero");

  function closeMenu() {
    menu.classList.remove("open");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "Open menu"
    );

    document.body.classList.remove("lock");
  }

  menuButton.addEventListener("click", () => {
    const menuIsOpen =
      !menu.classList.contains("open");

    menu.classList.toggle(
      "open",
      menuIsOpen
    );

    menuButton.setAttribute(
      "aria-expanded",
      String(menuIsOpen)
    );

    menuButton.setAttribute(
      "aria-label",
      menuIsOpen
        ? "Close menu"
        : "Open menu"
    );

    document.body.classList.toggle(
      "lock",
      menuIsOpen
    );
  });

  menuLinks.forEach((link) => {
    link.addEventListener(
      "click",
      closeMenu
    );
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });

  if ("IntersectionObserver" in window) {
    const revealObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(
                "show"
              );

              revealObserver.unobserve(
                entry.target
              );
            }
          });
        },
        {
          threshold: 0.12
        }
      );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

    const navigationObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            menuLinks.forEach((link) => {
              const currentSection =
                link.getAttribute("href") ===
                `#${entry.target.id}`;

              link.classList.toggle(
                "active",
                currentSection
              );
            });
          });
        },
        {
          rootMargin: "-35% 0px -55%",
          threshold: 0
        }
      );

    sections.forEach((section) => {
      navigationObserver.observe(section);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("show");
    });
  }

  const supportsMouse =
    window.matchMedia("(pointer: fine)");

  if (supportsMouse.matches && hero) {
    hero.addEventListener(
      "pointermove",
      (event) => {
        const heroPosition =
          hero.getBoundingClientRect();

        const cursorX =
          event.clientX - heroPosition.left;

        const cursorY =
          event.clientY - heroPosition.top;

        hero.style.setProperty(
          "--x",
          `${cursorX}px`
        );

        hero.style.setProperty(
          "--y",
          `${cursorY}px`
        );
      }
    );
  }

  const year =
    document.getElementById("year");

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }
})();