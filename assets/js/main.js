/* ==========================================================================
   Brightlight Oasis - front-end behaviour
   Vanilla JS, no build step. Swiper is the only external dependency.
   ========================================================================== */
(function () {
	"use strict";

	document.addEventListener("DOMContentLoaded", init);

	function init() {
		mobileNav();
		stickyHeader();
		revealOnScroll();
		counters();
		skillBars();
		serviceBoxHover();
		accordion();
		pricingToggle();
		sliders();
		backToTop();
		forms();
		document.getElementById("year").textContent = new Date().getFullYear();
	}

	/* ---------------------------------------------------------------- nav -- */
	function mobileNav() {
		var toggler = document.querySelector(".nav-toggler");
		var nav = document.querySelector(".header-nav");
		var overlay = document.querySelector(".nav-overlay");
		if (!toggler || !nav) return;

		function close() {
			nav.classList.remove("show");
			overlay.classList.remove("show");
			toggler.setAttribute("aria-expanded", "false");
		}

		toggler.addEventListener("click", function () {
			var open = nav.classList.toggle("show");
			overlay.classList.toggle("show", open);
			toggler.setAttribute("aria-expanded", String(open));
		});
		overlay.addEventListener("click", close);
		document.querySelector(".nav-close").addEventListener("click", close);

		// Accordion sub-menus on small screens only.
		nav.querySelectorAll(".has-sub > a").forEach(function (link) {
			link.addEventListener("click", function (e) {
				if (window.innerWidth >= 1024) return;
				e.preventDefault();
				link.parentElement.classList.toggle("open");
			});
		});

		// Close the drawer after tapping a real link.
		nav.querySelectorAll('a[href^="#"]').forEach(function (a) {
			a.addEventListener("click", close);
		});
	}

	function stickyHeader() {
		var header = document.querySelector(".site-header");
		if (!header) return;
		var onScroll = function () {
			header.classList.toggle("is-fixed", window.scrollY > 300);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
	}

	/* ------------------------------------------------------------- reveal -- */
	function revealOnScroll() {
		var items = document.querySelectorAll("[data-reveal]");
		if (!items.length) return;
		if (!("IntersectionObserver" in window)) {
			items.forEach(function (el) {
				el.classList.add("is-visible");
			});
			return;
		}
		document.documentElement.classList.add("reveal-ready");
		window.setTimeout(function () {
			document.documentElement.classList.remove("reveal-ready");
		}, 2500);
		var io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (!entry.isIntersecting) return;
					entry.target.classList.add("is-visible");
					io.unobserve(entry.target);
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
		);
		items.forEach(function (el) {
			var delay = el.getAttribute("data-delay");
			if (delay) el.style.setProperty("--reveal-delay", delay);
			io.observe(el);
		});
	}

	/* ----------------------------------------------------------- counters -- */
	function counters() {
		var nodes = document.querySelectorAll("[data-count]");
		if (!nodes.length) return;
		var io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (!entry.isIntersecting) return;
					countUp(entry.target);
					io.unobserve(entry.target);
				});
			},
			{ threshold: 0.5 }
		);
		nodes.forEach(function (n) {
			io.observe(n);
		});
	}

	function countUp(el) {
		var target = parseFloat(el.getAttribute("data-count"));
		var duration = 1600;
		var start = null;
		function step(ts) {
			if (start === null) start = ts;
			var progress = Math.min((ts - start) / duration, 1);
			// easeOutCubic
			var eased = 1 - Math.pow(1 - progress, 3);
			el.textContent = Math.round(target * eased).toLocaleString();
			if (progress < 1) requestAnimationFrame(step);
		}
		requestAnimationFrame(step);
	}

	/* --------------------------------------------------------- skill bars -- */
	function skillBars() {
		var bars = document.querySelectorAll(".skill-bar");
		if (!bars.length) return;
		var io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (!entry.isIntersecting) return;
					var fill = entry.target.querySelector("span");
					fill.style.width = entry.target.getAttribute("data-value") + "%";
					io.unobserve(entry.target);
				});
			},
			{ threshold: 0.4 }
		);
		bars.forEach(function (b) {
			io.observe(b);
		});
	}

	/* -------------------------------------------- numbered service cards -- */
	function serviceBoxHover() {
		var wrappers = document.querySelectorAll(".box-hover-wrapper");
		wrappers.forEach(function (wrapper) {
			var boxes = wrapper.querySelectorAll(".box-hover");
			boxes.forEach(function (box) {
				box.addEventListener("mouseenter", function () {
					boxes.forEach(function (b) {
						b.classList.remove("active");
					});
					box.classList.add("active");
				});
			});
		});
	}

	/* ---------------------------------------------------------- accordion -- */
	function accordion() {
		document.querySelectorAll(".accordion").forEach(function (group) {
			var items = group.querySelectorAll(".accordion-item");
			items.forEach(function (item) {
				item.querySelector(".accordion-head").addEventListener("click", function () {
					var isOpen = item.classList.contains("active");
					items.forEach(function (i) {
						i.classList.remove("active");
					});
					if (!isOpen) item.classList.add("active");
				});
			});
		});
	}

	/* ----------------------------------------------------- pricing toggle -- */
	function pricingToggle() {
		var buttons = document.querySelectorAll("[data-plan]");
		if (!buttons.length) return;
		buttons.forEach(function (btn) {
			btn.addEventListener("click", function () {
				var plan = btn.getAttribute("data-plan");
				buttons.forEach(function (b) {
					var on = b.getAttribute("data-plan") === plan;
					b.classList.toggle("bg-secondary", on);
					b.classList.toggle("text-white", on);
					b.classList.toggle("text-[color:var(--secondary)]", !on);
				});
				document.querySelectorAll("[data-price-group]").forEach(function (g) {
					g.classList.toggle("hidden", g.getAttribute("data-price-group") !== plan);
				});
			});
		});
	}

	/* ------------------------------------------------------------ sliders -- */
	function sliders() {
		if (typeof Swiper === "undefined") return;

		if (document.querySelector(".team-swiper")) {
			new Swiper(".team-swiper", {
				slidesPerView: 1,
				spaceBetween: 20,
				loop: true,
				autoplay: { delay: 4000, disableOnInteraction: false },
				navigation: { nextEl: ".team-next", prevEl: ".team-prev" },
				breakpoints: {
					576: { slidesPerView: 2 },
					1280: { slidesPerView: 2 }
				}
			});
		}

		new Swiper(".testimonial-swiper", {
			slidesPerView: 1,
			spaceBetween: 30,
			loop: true,
			autoplay: { delay: 6000, disableOnInteraction: false },
			pagination: { el: ".testimonial-pagination", clickable: true },
			navigation: { nextEl: ".testimonial-next", prevEl: ".testimonial-prev" },
			breakpoints: {
				768: { slidesPerView: 2 },
				1280: { slidesPerView: 2 }
			}
		});

		new Swiper(".blog-swiper", {
			slidesPerView: 1,
			spaceBetween: 30,
			loop: true,
			navigation: { nextEl: ".blog-next", prevEl: ".blog-prev" },
			breakpoints: {
				640: { slidesPerView: 2 },
				1024: { slidesPerView: 3 }
			}
		});

		new Swiper(".video-swiper", {
			slidesPerView: 1,
			spaceBetween: 24,
			loop: true,
			navigation: { nextEl: ".video-next", prevEl: ".video-prev" },
			breakpoints: {
				768: { slidesPerView: 2 },
				1200: { slidesPerView: 3 }
			}
		});
	}

	/* -------------------------------------------------------- back to top -- */
	function backToTop() {
		var btn = document.getElementById("backToTop");
		if (!btn) return;
		window.addEventListener(
			"scroll",
			function () {
				btn.classList.toggle("show", window.scrollY > 600);
			},
			{ passive: true }
		);
		btn.addEventListener("click", function () {
			window.scrollTo({ top: 0, behavior: "smooth" });
		});
	}

	/* -------------------------------------------------------------- forms -- */
	// Demo-only handling: these forms have no backend. Wire the action
	// attribute up to your own endpoint before going live.
	function forms() {
		document.querySelectorAll("form[data-demo]").forEach(function (form) {
			form.addEventListener("submit", function (e) {
				e.preventDefault();
				var note = form.querySelector(".form-note");
				if (note) {
					note.textContent =
						"Thanks - this is a demo form. Connect it to your booking system to receive submissions.";
					note.classList.remove("hidden");
				}
				form.reset();
			});
		});
	}
})();
