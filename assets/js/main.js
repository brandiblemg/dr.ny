/**
 * Dr. Nader Youssef – Personal Brand Platform
 * Main application script
 */

// Header scroll effect
const header = document.getElementById("main-header");

window.addEventListener("scroll", () => {
  if (!header) return;
  if (window.pageYOffset > 50) {
    header.classList.add("header-scrolled");
  } else {
    header.classList.remove("header-scrolled");
  }
});

// Mobile menu toggle (classic navbar pattern)
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("primary-navigation");

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("navbar__menu--open");
    mobileMenuBtn.classList.toggle("is-active", open);
    mobileMenuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

// “See More” desktop dropdown (all pages with .nav-more-wrap)
(function initNavMoreDropdown() {
  const wrap = document.querySelector(".nav-more-wrap");
  if (!wrap) return;
  const btn = wrap.querySelector(".nav-more-btn");
  const panel = wrap.querySelector(".nav-more-panel");
  if (!btn || !panel) return;

  const setOpen = (open) => {
    if (open) {
      panel.classList.remove("hidden");
      wrap.classList.add("nav-more-open");
      btn.setAttribute("aria-expanded", "true");
    } else {
      panel.classList.add("hidden");
      wrap.classList.remove("nav-more-open");
      btn.setAttribute("aria-expanded", "false");
    }
  };

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(btn.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("click", (e) => {
    if (!wrap.contains(e.target)) setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
})();

// Smooth scroll for in-page anchors only (must not block links whose href was later set to another page)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.classList.contains("service-start")) {
      return;
    }
    const href = this.getAttribute("href") || "";
    if (!href.startsWith("#") || href.length < 2) {
      return;
    }
    const target = document.querySelector(href);
    if (!target) {
      return;
    }
    e.preventDefault();
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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

document.querySelectorAll(".journey-card, .ace-pillar").forEach((el) => {
  observer.observe(el);
});

// Interactive Service Finder (homepage “Find Your Journey”; service pages keep their own journey finders)
const serviceFinder = document.getElementById("service-finder");

/** Homepage journey → service page panel + labels for resume banner */
const HOME_JOURNEY_GOAL_MAP = {
  "patient-1": {
    base: "patient-advocacy.html",
    panel: "pa-1",
    goalLabel: "Prepare for a visit (3 questions, accompaniment)"
  },
  "patient-2": {
    base: "patient-advocacy.html",
    panel: "pa-2",
    goalLabel: "Feel heard, informed, and empowered"
  },
  "patient-3": {
    base: "patient-advocacy.html",
    panel: "pa-3",
    goalLabel: "Address fears and knowledge gaps before my visit"
  },
  "pharma-1": {
    base: "healthcare-consultation.html",
    panel: "hc-1",
    goalLabel: "Shape study design with patient-centered outcomes"
  },
  "pharma-2": {
    base: "healthcare-consultation.html",
    panel: "hc-2",
    goalLabel: "Improve recruitment with real patient voice"
  },
  "provider-1": {
    base: "education.html",
    panel: "ed-1",
    goalLabel: "Train team in empathetic, patient-centered communication"
  },
  "provider-2": {
    base: "education.html",
    panel: "ed-2",
    goalLabel: "Address communication gaps (e.g. explain the \"why\")"
  }
};

const HOME_ROLE_LABELS = {
  patient: "I'm a Patient",
  pharma: "I represent Pharma",
  provider: "I'm a Healthcare Provider"
};

if (serviceFinder) {
  const isHomeJourneyFinder = serviceFinder.classList.contains("home-journey-finder");
  const roleButtons = serviceFinder.querySelectorAll(".sf-role-btn");
  const step2 = document.getElementById("service-finder-step2");
  const step3 = document.getElementById("service-finder-step3");
  const goalGroups = serviceFinder.querySelectorAll(".sf-goals-group");
  const goalButtons = serviceFinder.querySelectorAll(".sf-goal-btn");
  const narrowGroups = serviceFinder.querySelectorAll(".sf-narrow-group");
  const narrowButtons = serviceFinder.querySelectorAll(".sf-narrow-btn");
  const result = document.getElementById("service-finder-result");
  const resultTitle = document.getElementById("sfr-title");
  const resultBody = document.getElementById("sfr-body");
  const viewDetailsBtn = document.getElementById("sfr-view-details");
  const toolkitsWrap = document.getElementById("sfr-toolkits");
  const toolkitGroups = toolkitsWrap ? toolkitsWrap.querySelectorAll(".sfr-toolkit-group") : [];

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

  let targetCardId = null;

  function hideStep3AndResult() {
    if (step3) step3.classList.add("hidden");
    if (result) result.classList.add("hidden");
    if (toolkitsWrap) toolkitsWrap.classList.add("hidden");
    toolkitGroups.forEach((g) => g.classList.add("hidden"));
    narrowGroups.forEach((g) => g.classList.add("hidden"));
    goalButtons.forEach((b) => b.setAttribute("data-picked", "false"));
    const homeNext = document.getElementById("home-journey-next");
    if (homeNext) homeNext.classList.add("hidden");
  }

  function showToolkitsForKey(toolkitKey) {
    if (!toolkitsWrap || !toolkitKey) {
      if (toolkitsWrap) toolkitsWrap.classList.add("hidden");
      return;
    }
    let matched = false;
    toolkitGroups.forEach((group) => {
      const key = group.getAttribute("data-toolkit-key");
      const show = key === toolkitKey;
      group.classList.toggle("hidden", !show);
      if (show) matched = true;
    });
    toolkitsWrap.classList.toggle("hidden", !matched);
  }

  function showResult(serviceKey, refineLine, toolkitKey) {
    if (!serviceKey || !serviceCopy[serviceKey]) return;

    const copy = serviceCopy[serviceKey];
    const bodyText = refineLine ? `${copy.body} ${refineLine}` : copy.body;

    if (result && resultTitle && resultBody) {
      resultTitle.textContent = copy.title;
      resultBody.textContent = bodyText;
      result.classList.remove("hidden");
    }

    showToolkitsForKey(toolkitKey);

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
  }

  function setRole(role) {
    roleButtons.forEach((b) => {
      const bRole = b.getAttribute("data-role");
      b.setAttribute("data-active", bRole === role ? "true" : "false");
    });

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

    hideStep3AndResult();
  }

  roleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const role = btn.getAttribute("data-role");
      setRole(role);
    });
  });

  goalButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const goalId = btn.getAttribute("data-goal-id");
      const visibleGroup = Array.from(goalGroups).find((g) => !g.classList.contains("hidden"));
      if (visibleGroup) {
        visibleGroup.querySelectorAll(".sf-goal-btn").forEach((b) => b.setAttribute("data-picked", "false"));
      }
      btn.setAttribute("data-picked", "true");

      if (result) result.classList.add("hidden");

      if (isHomeJourneyFinder && goalId) {
        const mapped = HOME_JOURNEY_GOAL_MAP[goalId];
        const serviceKey = btn.getAttribute("data-service");
        const homeNext = document.getElementById("home-journey-next");
        const continueA = document.getElementById("home-continue-journey");
        const learnA = document.getElementById("home-learn-more");
        if (mapped && serviceKey && homeNext && continueA && learnA) {
          const roleQ = encodeURIComponent(serviceKey);
          const hgQ = encodeURIComponent(goalId);
          const panelQ = encodeURIComponent(mapped.panel);
          continueA.href = `${mapped.base}?continue=${panelQ}&role=${roleQ}&hg=${hgQ}#journey-step-3`;
          learnA.href = mapped.base;
          homeNext.classList.remove("hidden");
          homeNext.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
        return;
      }

      if (step3 && goalId) {
        step3.classList.remove("hidden");
        narrowGroups.forEach((group) => {
          const match = group.getAttribute("data-for-goal") === goalId;
          group.classList.toggle("hidden", !match);
        });
        step3.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  });

  narrowButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const serviceKey = btn.getAttribute("data-service");
      targetCardId = btn.getAttribute("data-target-card");
      const refineLine = btn.getAttribute("data-refine") || "";
      const toolkitKey = btn.getAttribute("data-toolkit-key") || "";
      showResult(serviceKey, refineLine, toolkitKey);
      if (result) result.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });

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

// Standalone “Find Your Journey” on service pages (goal → narrow → anchor cards + toolkits)
document.querySelectorAll(".service-journey-finder").forEach((root) => {
  const step2 = root.querySelector(".spf-step2");
  const toolkitsRoot = root.querySelector(".spf-toolkits");
  if (!step2) return;

  const panels = step2.querySelectorAll(".spf-narrow-panel");
  const toolkitGroups = toolkitsRoot ? toolkitsRoot.querySelectorAll(".spf-toolkit-group") : [];

  function hideServicePageToolkits() {
    if (toolkitsRoot) toolkitsRoot.classList.add("hidden");
    toolkitGroups.forEach((g) => g.classList.add("hidden"));
  }

  function showServicePageToolkits(toolkitKey) {
    if (!toolkitsRoot || !toolkitKey) {
      hideServicePageToolkits();
      return;
    }
    let matched = false;
    toolkitGroups.forEach((group) => {
      const key = group.getAttribute("data-toolkit-key");
      const show = key === toolkitKey;
      group.classList.toggle("hidden", !show);
      if (show) matched = true;
    });
    toolkitsRoot.classList.toggle("hidden", !matched);
  }

  root.querySelectorAll(".spf-goal-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-open-panel");
      root.querySelectorAll(".spf-goal-btn").forEach((b) => b.setAttribute("data-picked", "false"));
      btn.setAttribute("data-picked", "true");
      hideServicePageToolkits();
      step2.classList.remove("hidden");
      panels.forEach((p) => {
        p.classList.toggle("hidden", p.getAttribute("data-panel") !== key);
      });
      const skipScroll = window.__spfResumeSkipStepScroll === true;
      window.__spfResumeSkipStepScroll = false;
      if (!skipScroll) {
        step2.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  });

  root.querySelectorAll(".spf-narrow-panel a[data-toolkit-key]").forEach((link) => {
    link.addEventListener("click", () => {
      const toolkitKey = link.getAttribute("data-toolkit-key") || "";
      // Persist selection styling for “Narrow your focus...” pills
      const panel = link.closest(".spf-narrow-panel");
      if (panel) {
        panel.querySelectorAll("a[data-toolkit-key]").forEach((a) => a.setAttribute("data-picked", "false"));
      }
      link.setAttribute("data-picked", "true");
      showServicePageToolkits(toolkitKey);
    });
  });
});

// Resume homepage journey: Steps 1–2 shown as complete; open Step 3 (narrow focus) and scroll there
(function resumeFindYourJourneyFromHome() {
  const params = new URLSearchParams(window.location.search);
  const panel = params.get("continue");
  const roleKey = params.get("role");
  const hg = params.get("hg");
  const hash = (window.location.hash || "").replace(/^#/, "");
  if (!panel) return;
  if (!/^(pa|hc|ed)-[123]$/.test(panel)) return;
  if (hash !== "journey-step-3" && hash !== "find-your-journey" && hash !== "find-your-path") return;

  const root = document.getElementById("find-your-journey");
  if (!root) return;

  const btn = root.querySelector(`.spf-goal-btn[data-open-panel="${panel}"]`);
  if (!btn) return;

  const mapped = hg ? HOME_JOURNEY_GOAL_MAP[hg] : null;
  if (hg && (!mapped || mapped.panel !== panel)) return;
  if (roleKey && !HOME_ROLE_LABELS[roleKey]) return;

  const step3El = document.getElementById("journey-step-3");
  const narrowLabel = document.getElementById("spf-narrow-step-label");
  const banner = document.getElementById("journey-home-banner");
  const bannerRole = document.getElementById("journey-banner-role");
  const bannerGoal = document.getElementById("journey-banner-goal");
  const step1 = root.querySelector(".spf-step1");

  if (hg && roleKey && banner && bannerRole && bannerGoal && mapped) {
    bannerRole.textContent = HOME_ROLE_LABELS[roleKey] || roleKey;
    bannerGoal.textContent = mapped.goalLabel || "";
    banner.classList.remove("hidden");
  }

  window.__spfResumeSkipStepScroll = true;
  btn.click();

  if (narrowLabel) {
    narrowLabel.textContent = "Step 3 · Narrow your focus...";
  }

  if (step1) {
    step1.classList.add("ring-2", "ring-deep-teal/15", "rounded-2xl", "p-4", "-mx-1", "mb-8", "bg-deep-teal/[0.03]");
    const step1Caption = step1.querySelector(".spf-step1-caption");
    if (!step1Caption) {
      const cap = document.createElement("p");
      cap.className =
        "spf-step1-caption text-xs text-deep-teal font-medium mb-3 -mt-1";
      cap.textContent = "Completed from your homepage — your goal is locked in below.";
      step1.insertBefore(cap, step1.children[1] || null);
    }
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const scrollTarget = step3El || root;
      scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();

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
  heroPlayBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (heroVideo.paused) {
      heroVideo.play();
      heroPlayBtn.classList.add("opacity-0", "pointer-events-none");
    } else {
      heroVideo.pause();
      heroPlayBtn.classList.remove("opacity-0", "pointer-events-none");
    }
  });

  heroVideo.addEventListener("click", () => {
    if (heroVideo.paused) {
      heroVideo.play();
      heroPlayBtn.classList.add("opacity-0", "pointer-events-none");
    } else {
      heroVideo.pause();
      heroPlayBtn.classList.remove("opacity-0", "pointer-events-none");
    }
  });

  heroVideo.addEventListener("ended", () => {
    heroPlayBtn.classList.remove("opacity-0", "pointer-events-none");
  });
}

// Chatbase widget embed (site-wide)
(function initChatbase() {
  if (typeof window.chatbase === "function" && window.chatbase("getState") === "initialized") {
    return;
  }

  window.chatbase =
    window.chatbase ||
    function (...args) {
      window.chatbase.q = window.chatbase.q || [];
      window.chatbase.q.push(args);
    };

  window.chatbase = new Proxy(window.chatbase, {
    get(target, prop) {
      if (prop === "q") return target.q;
      return (...args) => target(prop, ...args);
    }
  });

  const onLoad = function () {
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "TMOu-Vsbt3FrIw11bhSL2";
    script.domain = "www.chatbase.co";
    document.body.appendChild(script);
  };

  if (document.readyState === "complete") {
    onLoad();
  } else {
    window.addEventListener("load", onLoad);
  }
})();

