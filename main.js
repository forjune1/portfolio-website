const menuToggle = document.querySelector('.menu-toggle');
const primaryLinks = document.querySelector('#primary-links');

if (menuToggle && primaryLinks) {
  menuToggle.addEventListener('click', function () {
    const isOpen = primaryLinks.classList.toggle('is-open');

    menuToggle.setAttribute('aria-expanded', String(isOpen));

    menuToggle.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation menu' : 'Open navigation menu'
    );

    menuToggle.innerHTML = `
      <i class="fa-solid fa-${isOpen ? 'xmark' : 'bars'}"
         aria-hidden="true"></i>
    `;
  });
}



document.addEventListener("DOMContentLoaded", function () {
  const skillCards = document.querySelectorAll(".skill-card");

  function animateSkill(circle) {
    const target = Number(circle.dataset.percentage);
    const number = circle.querySelector("span");

    if (
      !number ||
      !Number.isFinite(target) ||
      target < 0 ||
      target > 100
    ) {
      return;
    }

    const duration = 1500;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smoothly slow down near the target number
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentNumber = Math.round(
        target * easedProgress
      );

      number.innerHTML = `${currentNumber}<small>%</small>`;

      circle.style.setProperty(
        "--percentage",
        currentNumber
      );

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  }

  if ("IntersectionObserver" in window) {
    const skillObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const card = entry.target;

            card.classList.add("show");

            const circle = card.querySelector(".skill-circle");

            if (circle && circle.dataset.animated !== "true") {
              circle.dataset.animated = "true";
              animateSkill(circle);
            }

            observer.unobserve(card);
          }
        });
      },
      {
        threshold: 0.2
      }
    );

    skillCards.forEach(function (card) {
      skillObserver.observe(card);
    });
  } else {
    skillCards.forEach(function (card) {
      card.classList.add("show");

      const circle = card.querySelector(".skill-circle");

      if (circle) {
        animateSkill(circle);
      }
    });
  }
});



const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const subject = document.getElementById("contactSubject").value.trim();
  const message = document.getElementById("contactMessage").value.trim();

  if (!name || !email || !subject || !message) {
    formFeedback.textContent = "Please complete all fields.";
    return;
  }

  const yourEmail = "your-email@example.com";

  const emailSubject = encodeURIComponent(subject);
  const emailBody = encodeURIComponent(
    "Name: " + name +
    "\nEmail: " + email +
    "\n\nMessage:\n" + message
  );

  formFeedback.textContent =
    "Opening your email app. Please send the message there.";

  window.location.href =
    "mailto:" + yourEmail +
    "?subject=" + emailSubject +
    "&body=" + emailBody;
});
