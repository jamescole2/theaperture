const themeToggleBtn=document.getElementById("theme-toggle-btn"),body=document.body,currentTheme=localStorage.getItem("theme")||"light";function updateThemeIcon(){let e=themeToggleBtn.querySelector("i"),t=body.getAttribute("data-theme");"dark"===t?(e.className="fas fa-sun",themeToggleBtn.classList.add("dark-mode")):(e.className="fas fa-moon",themeToggleBtn.classList.remove("dark-mode"))}body.setAttribute("data-theme",currentTheme),updateThemeIcon(),themeToggleBtn.addEventListener("click",()=>{let e=body.getAttribute("data-theme"),t="dark"===e?"light":"dark";body.setAttribute("data-theme",t),localStorage.setItem("theme",t),updateThemeIcon(),showNotification(`Switched to ${t} mode`,"success")});const hamburger=document.querySelector(".hamburger"),navMenu=document.querySelector(".nav-menu");hamburger.addEventListener("click",()=>{hamburger.classList.toggle("active"),navMenu.classList.toggle("active")}),document.querySelectorAll(".nav-link").forEach(e=>{e.addEventListener("click",()=>{hamburger.classList.remove("active"),navMenu.classList.remove("active")})});const filterButtons=document.querySelectorAll(".filter-btn"),portfolioItems=document.querySelectorAll(".portfolio-item");filterButtons.length>0&&filterButtons.forEach(e=>{e.addEventListener("click",()=>{filterButtons.forEach(e=>e.classList.remove("active")),e.classList.add("active");let t=e.getAttribute("data-filter");portfolioItems.forEach(e=>{e.style.animation="none";let o=e.getAttribute("data-category");("all"===t||o===t)?(e.style.display="block",void e.offsetWidth,e.style.animation="fadeInUp .6s ease forwards"):(e.style.display="none")})})}),document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(e){const t=this.getAttribute("href");if("#"===t||!t)return;e.preventDefault();let o;try{o=document.querySelector(t)}catch(e){return}o&&o.scrollIntoView({behavior:"smooth",block:"start"})})}),window.addEventListener("scroll",()=>{const e=document.querySelector(".navbar"),t=window.scrollY>40;e&&(t?e.classList.add("navbar-condensed"):e.classList.remove("navbar-condensed"))});class LazyImageLoader{constructor(){this.imageObserver=null,this.init()}init(){"IntersectionObserver"in window?this.setupIntersectionObserver():this.loadAllImages()}setupIntersectionObserver(){this.imageObserver=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(this.loadImage(e.target),this.imageObserver.unobserve(e.target))})},{root:null,rootMargin:"50px",threshold:.1});let e=document.querySelectorAll(".lazy-image");e.forEach(e=>{this.imageObserver.observe(e)})}loadImage(e){let t=e.getAttribute("data-src");if(!t)return;let o=new Image;o.onload=()=>{e.src=t,e.classList.add("loaded"),setTimeout(()=>{e.style.filter="blur(0)",e.style.transform="scale(1)"},50);let o=e.nextElementSibling;o&&o.classList.contains("image-placeholder")&&setTimeout(()=>{o.style.opacity="0",setTimeout(()=>{o.remove()},300)},100)},o.onerror=()=>{console.warn(`Failed to load image: ${t}`),e.classList.add("error");let o=e.nextElementSibling;o&&o.classList.contains("image-placeholder")&&(o.innerHTML='<div style="color: var(--text-muted); font-size: 0.9rem;">Failed to load</div>')},o.src=t}loadAllImages(){let e=document.querySelectorAll(".lazy-image");e.forEach(e=>{this.loadImage(e)})}}const lazyLoader=new LazyImageLoader;function logPerformanceMetrics(){"performance"in window&&window.addEventListener("load",()=>{setTimeout(()=>{let e=performance.getEntriesByType("navigation")[0];e&&console.log("Page Load Performance:",{"DOM Content Loaded":Math.round(e.domContentLoadedEventEnd-e.domContentLoadedEventStart),"Page Load Complete":Math.round(e.loadEventEnd-e.loadEventStart),"Total Load Time":Math.round(e.loadEventEnd-e.fetchStart)})},1e3)})}logPerformanceMetrics();const portfolioImages=document.querySelectorAll(".portfolio-image img:not(.lazy-image)");portfolioImages.forEach(e=>{e.addEventListener("load",()=>{e.classList.add("loaded")}),e.complete&&e.classList.add("loaded")});let observerOptions,observer;"IntersectionObserver"in window?(observerOptions={threshold:.1,rootMargin:"0px 0px -50px 0px"},observer=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.style.opacity="1",e.target.style.transform="translateY(0)")})},observerOptions),portfolioItems.forEach(e=>{observer.observe(e)})):portfolioItems.forEach(e=>{e.style.opacity="1",e.style.transform="translateY(0)"});function showNotification(e,t="info"){let o=document.querySelector(".notification");o&&o.remove();let a=document.createElement("div");a.className=`notification notification-${t}`,a.innerHTML=`
        <div class="notification-content">
            <span class="notification-message">${e}</span>
            <button class="notification-close">&times;</button>
        </div>
    `,a.style.cssText=`
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${"success"===t?"#27ae60":"error"===t?"#e74c3c":"#3498db"};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;let l=a.querySelector(".notification-close");l.addEventListener("click",()=>{a.remove()}),setTimeout(()=>{a.parentNode&&a.remove()},5e3),document.body.appendChild(a)}const notificationStyles=document.createElement("style");function optimizeHeroImage(){let e=document.querySelector(".hero-image");if(!e)return;e.classList.add("loading");let t=new Image;t.onload=()=>{e.classList.remove("loading"),e.classList.add("loaded")},t.onerror=()=>{console.warn("Failed to load hero image"),e.classList.remove("loading")},t.src="IMG_4688_signed.jpg"}notificationStyles.textContent=`
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`,document.head.appendChild(notificationStyles),window.addEventListener("scroll",()=>{let e=window.pageYOffset,t=document.querySelector(".hero-background");t&&(t.style.transform=`translateY(${.5*e}px)`)}),optimizeHeroImage(),window.addEventListener("load",()=>{document.body.classList.add("loaded"),initializeLightbox();const e=document.querySelector(".portfolio-filters");e&&setTimeout(()=>{e.classList.add("animate")},100)});const loadedStyles=document.createElement("style");loadedStyles.textContent=`
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`,document.head.appendChild(loadedStyles);const animateOnScroll=()=>{let e=document.querySelectorAll(".about-content, .contact-content");e.forEach(e=>{let t=e.getBoundingClientRect().top;t<window.innerHeight-150&&e.classList.add("animate")})};window.addEventListener("scroll",animateOnScroll);const scrollAnimationStyles=document.createElement("style");function initializeLightbox(){const e=document.getElementById("lightbox");if(!e)return;const t=document.getElementById("lightbox-img"),o=document.getElementById("lightbox-info"),a=document.getElementById("lightbox-caption-title"),l=document.getElementById("exif-data"),n=e.querySelector(".lightbox-close"),i=document.getElementById("lightbox-info-toggle"),s=document.querySelectorAll(".portfolio-item");if(!t||!o||!n||!i)return void console.error("Lightbox elements not found!");const c={"data-exif-camera":"Camera","data-exif-lens":"Lens","data-exif-focal-length":"Focal Length","data-exif-aperture":"Aperture","data-exif-shutter":"Shutter Speed","data-exif-iso":"ISO"};function r(e){l.innerHTML="";let t=!1;Object.entries(c).forEach(([o,a])=>{const n=e.getAttribute(o);n&&(t=!0,l.insertAdjacentHTML("beforeend",`<li class="exif-item"><strong>${a}</strong><span>${n}</span></li>`))}),window.innerWidth<=991&&(i.style.display=t?"flex":"none")}function d(s){const c=s.querySelector("img"),d=s.querySelector("h3").textContent,o="true"===c.dataset.noExif;t.src=c.src||c.dataset.src,t.alt=c.alt,a.textContent=d,o?(e.classList.add("no-exif"),l.innerHTML=""):(e.classList.remove("no-exif"),r(c)),document.body.style.overflow="hidden",e.classList.add("show"),window.innerWidth>991&&e.classList.add("view-split")}function m(){document.body.style.overflow="",e.classList.remove("show","view-split","mobile-info-visible","no-exif"),setTimeout(()=>{e.classList.contains("show")||(t.src="")},500)}s.forEach(e=>{e.addEventListener("click",()=>d(e))}),n.addEventListener("click",m),e.addEventListener("click",t=>{t.target===e&&m()}),document.addEventListener("keydown",t=>{"Escape"===t.key&&e.classList.contains("show")&&m()}),i.addEventListener("click",t=>{t.stopPropagation(),e.classList.toggle("mobile-info-visible")})}const navLinks=Array.from(document.querySelectorAll(".nav-link"));if(navLinks.length&&navMenu){const navSections=navLinks.map(e=>{const t=e.getAttribute("href");return t&&t.startsWith("#")?document.querySelector(t):null}).filter(Boolean),updateIndicator=e=>{e&&requestAnimationFrame(()=>{const t=getComputedStyle(navMenu),n=parseFloat(t.getPropertyValue("--nav-indicator-inset"))||0,o=e.offsetLeft-n;navMenu.style.setProperty("--nav-indicator-width",`${e.offsetWidth}px`),navMenu.style.setProperty("--nav-indicator-offset",`${o}px`),navMenu.classList.add("indicator-ready")})},setActiveLink=e=>{e&&(navLinks.forEach(e=>e.classList.remove("active")),e.classList.add("active"),updateIndicator(e))};navLinks.forEach(e=>{const t=e.getAttribute("href");t&&t.startsWith("#")&&e.addEventListener("click",()=>setActiveLink(e))});const updateActiveFromScroll=()=>{if(!navSections.length)return;const e=window.scrollY+window.innerHeight*.35;let t=navSections[0];navSections.forEach(n=>{n&&n.offsetTop-140<=e&&(t=n)});const n=t&&t.id?navLinks.find(e=>e.getAttribute("href")=="#"+t.id):null;n&&setActiveLink(n)};const handleInitial=()=>{const e=document.querySelector(".nav-link.active")||navLinks[0];e&&setActiveLink(e)};if("IntersectionObserver"in window&&navSections.length){const e=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){const t=e.target.getAttribute("id"),n=navLinks.find(e=>e.getAttribute("href")=="#"+t);n&&setActiveLink(n)}})},{threshold:.3,rootMargin:"-40% 0px -45% 0px"});navSections.forEach(t=>e.observe(t))}window.addEventListener("scroll",updateActiveFromScroll,{passive:!0});window.addEventListener("resize",()=>{const e=document.querySelector(".nav-link.active");e&&updateIndicator(e),updateActiveFromScroll()}),handleInitial(),updateActiveFromScroll(),window.addEventListener("load",()=>{handleInitial(),updateActiveFromScroll()})}scrollAnimationStyles.textContent=`
    .portfolio-filters,
    .about-content,
    .contact-content {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .portfolio-filters.animate,
    .about-content.animate,
    .contact-content.animate {
        opacity: 1;
        transform: translateY(0);
    }
`,document.head.appendChild(scrollAnimationStyles);