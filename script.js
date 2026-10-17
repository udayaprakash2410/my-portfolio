
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS animations when the library is available.
  if (window.AOS) {
    AOS.init({
      duration: 750,
      once: true,
      offset: 70,
      easing: "ease-out-cubic",
      disable: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    });
  }

  // Animated role text.
  const typing = document.getElementById("typing");

  const roles = [
    "Frontend Developer",
    "MERN Stack Developer",
    "Web Developer"
  ];

  if (typing) {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {
      const currentRole = roles[roleIndex];

      typing.textContent = currentRole.slice(0, charIndex);

      if (!deleting) {
        charIndex++;

        if (charIndex > currentRole.length) {
          deleting = true;
          setTimeout(typeLoop, 1450);
          return;
        }

        setTimeout(typeLoop, 75);
      } else {
        charIndex--;

        if (charIndex < 0) {
          charIndex = 0;
          deleting = false;

          roleIndex = (roleIndex + 1) % roles.length;

          setTimeout(typeLoop, 300);
          return;
        }

        setTimeout(typeLoop, 32);
      }
    }

    typing.textContent = "";
    typeLoop();
  }

  // Mobile menu.
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.setAttribute("role", "button");
    menuBtn.setAttribute("tabindex", "0");
    menuBtn.setAttribute("aria-controls", "mobile-menu");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open navigation menu");

    function setMenu(open) {
      mobileMenu.classList.toggle("active", open);

      menuBtn.innerHTML = open
        ? '<i class="fas fa-times" aria-hidden="true"></i>'
        : '<i class="fas fa-bars" aria-hidden="true"></i>';

      menuBtn.setAttribute("aria-expanded", String(open));

      menuBtn.setAttribute(
        "aria-label",
        open ? "Close navigation menu" : "Open navigation menu"
      );
    }

    menuBtn.addEventListener("click", () => {
      setMenu(!mobileMenu.classList.contains("active"));
    });

    menuBtn.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setMenu(!mobileMenu.classList.contains("active"));
      }
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });

    document.addEventListener("click", (event) => {
      if (
        !mobileMenu.contains(event.target) &&
        !menuBtn.contains(event.target)
      ) {
        setMenu(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMenu(false);
      }
    });
  }

  // Add a subtle shadow to the navbar when scrolling.
  const navbar = document.querySelector(".navbar");

  function updateHeader() {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 12);
    }
  }

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  // Highlight the active desktop navigation link.
  const desktopLinks = [
    ...document.querySelectorAll(".nav-links a")
  ];

  const sections = [
    ...document.querySelectorAll(
      "main section[id], body > section[id]"
    )
  ];

  if (
    "IntersectionObserver" in window &&
    desktopLinks.length &&
    sections.length
  ) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          desktopLinks.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isActive);

            if (isActive) {
              link.setAttribute("aria-current", "page");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        rootMargin: "-28% 0px -58% 0px"
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // Prevent placeholder links from jumping to the top.
  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });
});
