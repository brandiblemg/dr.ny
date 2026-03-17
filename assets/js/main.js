/**
 * Dr. Nader Youssef – Personal Brand Platform
 * Main application script
 */

// Header scroll effect
const header = document.getElementById("main-header");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 50) {
    header.classList.add("header-scrolled");
  } else {
    header.classList.remove("header-scrolled");
  }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in-up");
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".path-card, .ace-pillar").forEach((el) => {
  observer.observe(el);
});

// Interactive Service Finder (services.html)
const serviceFinder = document.getElementById("service-finder");

if (serviceFinder) {
  const roleButtons = serviceFinder.querySelectorAll(".sf-role-btn");
  const step2 = document.getElementById("service-finder-step2");
  const goalGroups = serviceFinder.querySelectorAll(".sf-goals-group");
  const goalButtons = serviceFinder.querySelectorAll(".sf-goal-btn");
  const result = document.getElementById("service-finder-result");
  const resultTitle = document.getElementById("sfr-title");
  const resultBody = document.getElementById("sfr-body");
  const viewDetailsBtn = document.getElementById("sfr-view-details");
  const consultLink = document.getElementById("sfr-consult");
  const toolkitGroups = serviceFinder.querySelectorAll(".sfr-toolkit-group");

  const serviceCopy = {
    patient: {
      title: "Patient Engagement Practice",
      body:
        "Biopsychosocial approach: coping, modifiable factors (sleep, diet, stress), and medication. Pre-visit consultation to identify fears, mistrust, and knowledge gaps; 3 key questions for your physician; optional remote accompaniment; post-visit education. Dr. Youssef does not replace your physician—he ensures you are heard, informed, and empowered. Validated through ~20 focus group sessions over 18 months."
    },
    pharma: {
      title: "Pharmaceutical Consulting",
      body:
        "Study design with patient-centered outcomes. We work with patient groups and KOLs to shape meaningful protocols—e.g. daily function measures (like a child’s ability to self-feed), compassionate study design, and educating pharma partners on real patient priorities. Example: Pediatric Brain Tumor Society collaboration."
    },
    provider: {
      title: "Healthcare Provider Training",
      body:
        "For nurses, PAs, medical students, residents, and young physicians. We address diminished communication from over-reliance on AI and algorithms by teaching empathetic engagement and patient-centered communication—e.g. training providers to explain the \"why\" behind recommendations, not just labels like \"heart health.\""
    }
  };

  let selectedRole = null;
  let targetCardId = null;

  function setRole(role) {
    selectedRole = role;

    // Visual active state for role buttons
    roleButtons.forEach((b) => {
      const bRole = b.getAttribute("data-role");
      b.setAttribute("data-active", bRole === role ? "true" : "false");
    });

    // Show step 2 and the matching goal group
    if (step2) {
      step2.classList.remove("hidden");
    }

    goalGroups.forEach((group) => {
      if (group.getAttribute("data-role") === role) {
        group.classList.remove("hidden");
      } else {
        group.classList.add("hidden");
      }
    });

    // Reset result when role changes
    if (result) {
      result.classList.add("hidden");
    }
  }

  roleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const role = btn.getAttribute("data-role");
      setRole(role);
    });
  });

  goalButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const serviceKey = btn.getAttribute("data-service");
      targetCardId = btn.getAttribute("data-target-card");

      if (!serviceKey || !serviceCopy[serviceKey]) return;

      const copy = serviceCopy[serviceKey];

      if (result && resultTitle && resultBody) {
        resultTitle.textContent = copy.title;
        resultBody.textContent = copy.body;
        result.classList.remove("hidden");
      }

      // Show matching toolkit group
      if (toolkitGroups && toolkitGroups.length) {
        toolkitGroups.forEach((group) => {
          const key = group.getAttribute("data-service");
          if (key === serviceKey) {
            group.classList.remove("hidden");
          } else {
            group.classList.add("hidden");
          }
        });
      }

      // Scroll to cards when "View details below" is clicked
      if (viewDetailsBtn) {
        viewDetailsBtn.onclick = () => {
          if (!targetCardId) return;
          const card = document.getElementById(targetCardId);
          if (card) {
            card.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }
        };
      }

    });
  });

  // Allow "Get started" buttons on service cards to complete Step 1
  const serviceStartLinks = document.querySelectorAll(".service-start");
  serviceStartLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const role = link.getAttribute("data-role");
      if (!role) return;
      setRole(role);
      serviceFinder.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// ACE Framework interactive diagram (ace-framework.html)
const aceDiagram = document.getElementById("ace-diagram");

if (aceDiagram) {
  const segments = aceDiagram.querySelectorAll(".ace-segment");
  const details = aceDiagram.querySelectorAll(".ace-detail");
  const titleEl = document.getElementById("ace-detail-title");
  const bodyEl = document.getElementById("ace-detail-body");

  const aceCopy = {
    advocacy: {
      title: "Advocacy",
      body:
        "Advocacy is how we carry your story into every room where decisions are made—so you never feel like you’re repeating yourself or fighting alone."
    },
    compassion: {
      title: "Compassion",
      body:
        "Compassion is the disciplined practice of feeling with patients and families, and then redesigning conversations and systems to honor that reality."
    },
    education: {
      title: "Education",
      body:
        "Education turns fear and jargon into clarity and action. When the “why” is clear, patients, teams, and partners can finally participate—not just comply."
    }
  };

  function activateSegment(key) {
    // Update segment visuals
    segments.forEach((seg) => {
      const segKey = seg.getAttribute("data-segment");
      if (segKey === key) {
        seg.classList.add("ace-segment-active");
      } else {
        seg.classList.remove("ace-segment-active");
      }
    });

    // Update detail visibility
    details.forEach((detail) => {
      const dKey = detail.getAttribute("data-segment");
      if (dKey === key) {
        detail.classList.remove("hidden");
      } else {
        detail.classList.add("hidden");
      }
    });

    // Update copy
    const copy = aceCopy[key];
    if (copy && titleEl && bodyEl) {
      titleEl.textContent = copy.title;
      bodyEl.textContent = copy.body;
    }
  }

  segments.forEach((seg) => {
    const key = seg.getAttribute("data-segment");
    if (!key) return;
    seg.addEventListener("click", () => activateSegment(key));
    seg.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activateSegment(key);
      }
    });
    seg.setAttribute("tabindex", "0");
    seg.setAttribute("role", "button");
    seg.setAttribute("aria-label", key.charAt(0).toUpperCase() + key.slice(1));
  });

  // Set initial active segment based on URL hash (e.g., #advocacy)
  const hashKey = (window.location.hash || "").replace("#", "").toLowerCase();
  const initialKey = aceCopy[hashKey] ? hashKey : "advocacy";
  activateSegment(initialKey);
}

// Hero video play button (index.html)
const heroVideo = document.getElementById("hero-video");
const heroPlayBtn = document.querySelector(".video-play-btn");

if (heroVideo && heroPlayBtn) {
  heroPlayBtn.addEventListener("click", () => {
    if (heroVideo.paused) {
      heroVideo.play();
      heroPlayBtn.classList.add("opacity-0", "pointer-events-none");
    } else {
      heroVideo.pause();
    }
  });

  heroVideo.addEventListener("ended", () => {
    heroPlayBtn.classList.remove("opacity-0", "pointer-events-none");
  });
}

