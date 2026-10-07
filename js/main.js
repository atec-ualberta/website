// ATEC site behaviour: mobile nav, accordions, carousels.
(function () {
  "use strict";

  // ---------- Mobile navigation ----------
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        toggle.focus();
      }
    });
  }

  // ---------- Accordion ----------
  document.querySelectorAll(".accordion-trigger").forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      panel.hidden = open;
    });
  });

  // ---------- Carousels ----------
  var chevron = function (dir) {
    var d = dir === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7";
    return (
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="' + d + '"/></svg>'
    );
  };

  document.querySelectorAll(".carousel").forEach(function (carousel) {
    var track = carousel.querySelector(".carousel-track");
    var slides = Array.prototype.slice.call(track.children);
    var label = carousel.getAttribute("aria-label") || "Slides";
    var index = 0;

    slides.forEach(function (slide, i) {
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("aria-label", i + 1 + " of " + slides.length);
    });

    if (slides.length < 2) {
      carousel.setAttribute("data-single", "");
      return;
    }

    var prev = document.createElement("button");
    prev.className = "carousel-btn carousel-btn--prev";
    prev.type = "button";
    prev.setAttribute("aria-label", "Previous slide");
    prev.innerHTML = chevron("prev");

    var next = document.createElement("button");
    next.className = "carousel-btn carousel-btn--next";
    next.type = "button";
    next.setAttribute("aria-label", "Next slide");
    next.innerHTML = chevron("next");

    var dots = document.createElement("div");
    dots.className = "carousel-dots";
    dots.setAttribute("aria-label", label + " navigation");
    dots.setAttribute("role", "group");

    slides.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", "Go to slide " + (i + 1));
      dot.addEventListener("click", function () {
        go(i);
      });
      dots.appendChild(dot);
    });

    carousel.appendChild(prev);
    carousel.appendChild(next);
    carousel.appendChild(dots);

    var live = document.createElement("div");
    live.className = "visually-hidden";
    live.setAttribute("aria-live", "polite");
    carousel.appendChild(live);

    function go(i, announce) {
      index = (i + slides.length) % slides.length;
      track.style.transform = "translateX(" + -index * 100 + "%)";
      slides.forEach(function (s, n) {
        var active = n === index;
        s.setAttribute("aria-hidden", String(!active));
        // keep off-screen links/buttons out of the tab order
        s.querySelectorAll("a, button").forEach(function (el) {
          if (active) el.removeAttribute("tabindex");
          else el.setAttribute("tabindex", "-1");
        });
      });
      Array.prototype.forEach.call(dots.children, function (d, n) {
        if (n === index) d.setAttribute("aria-current", "true");
        else d.removeAttribute("aria-current");
      });
      if (announce !== false) {
        live.textContent = "Slide " + (index + 1) + " of " + slides.length;
      }
    }

    prev.addEventListener("click", function () {
      go(index - 1);
    });
    next.addEventListener("click", function () {
      go(index + 1);
    });

    carousel.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") go(index - 1);
      if (e.key === "ArrowRight") go(index + 1);
    });

    // Basic touch swipe
    var startX = null;
    track.addEventListener(
      "touchstart",
      function (e) {
        startX = e.touches[0].clientX;
      },
      { passive: true }
    );
    track.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(dx < 0 ? index + 1 : index - 1);
      startX = null;
    });

    go(0, false);
  });
})();
