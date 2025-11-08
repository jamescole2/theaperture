const themeToggleBtn=document.getElementById("theme-toggle-btn"),body=document.body,currentTheme=localStorage.getItem("theme")||"light";function updateThemeIcon(){let e=themeToggleBtn.querySelector("i"),t=body.getAttribute("data-theme");"dark"===t?(e.className="fas fa-sun",themeToggleBtn.classList.add("dark-mode")):(e.className="fas fa-moon",themeToggleBtn.classList.remove("dark-mode"))}body.setAttribute("data-theme",currentTheme),updateThemeIcon(),themeToggleBtn.addEventListener("click",()=>{let e=body.getAttribute("data-theme"),t="dark"===e?"light":"dark";body.setAttribute("data-theme",t),localStorage.setItem("theme",t),updateThemeIcon(),showNotification(`Switched to ${t} mode`,"success")});const hamburger=document.querySelector(".hamburger"),navMenu=document.querySelector(".nav-menu");hamburger.addEventListener("click",()=>{hamburger.classList.toggle("active"),navMenu.classList.toggle("active")}),document.querySelectorAll(".nav-link").forEach(e=>{e.addEventListener("click",()=>{hamburger.classList.remove("active"),navMenu.classList.remove("active")})});const filterButtons=document.querySelectorAll(".filter-btn"),portfolioItems=document.querySelectorAll(".portfolio-item");console.log("Portfolio items found:",portfolioItems.length),filterButtons.length>0&&filterButtons.forEach(e=>{e.addEventListener("click",()=>{filterButtons.forEach(e=>e.classList.remove("active")),e.classList.add("active");let t=e.getAttribute("data-filter");portfolioItems.forEach(e=>{let o=e.getAttribute("data-category");"all"===t?(e.style.display="block",e.style.animation="fadeInUp 0.6s ease forwards"):o===t?(e.style.display="block",e.style.animation="fadeInUp 0.6s ease forwards"):e.style.display="none"})})}),document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(e){e.preventDefault();let t=document.querySelector(this.getAttribute("href"));t&&t.scrollIntoView({behavior:"smooth",block:"start"})})}),window.addEventListener("scroll",()=>{let e=document.querySelector(".navbar"),t="dark"===body.getAttribute("data-theme");window.scrollY>100?t?(e.style.background="rgb(26, 26, 26)",e.style.boxShadow="0 2px 30px rgba(0, 0, 0, 0.4)"):(e.style.background="rgb(255, 255, 255)",e.style.boxShadow="0 2px 30px rgba(0, 0, 0, 0.15)"):t?(e.style.background="rgba(26, 26, 26, 0.95)",e.style.boxShadow="0 2px 20px rgba(0, 0, 0, 0.3)"):(e.style.background="rgba(255, 255, 255, 0.95)",e.style.boxShadow="0 2px 20px rgba(0, 0, 0, 0.1)")});class LazyImageLoader{constructor(){this.imageObserver=null,this.init()}init(){"IntersectionObserver"in window?this.setupIntersectionObserver():this.loadAllImages()}setupIntersectionObserver(){this.imageObserver=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(this.loadImage(e.target),this.imageObserver.unobserve(e.target))})},{root:null,rootMargin:"50px",threshold:.1});let e=document.querySelectorAll(".lazy-image");e.forEach(e=>{this.imageObserver.observe(e)})}loadImage(e){let t=e.getAttribute("data-src");if(!t)return;let o=new Image;o.onload=()=>{e.src=t,e.classList.add("loaded"),setTimeout(()=>{e.style.filter="blur(0)",e.style.transform="scale(1)"},50);let o=e.nextElementSibling;o&&o.classList.contains("image-placeholder")&&setTimeout(()=>{o.style.opacity="0",setTimeout(()=>{o.remove()},300)},100)},o.onerror=()=>{console.warn(`Failed to load image: ${t}`),e.classList.add("error");let o=e.nextElementSibling;o&&o.classList.contains("image-placeholder")&&(o.innerHTML='<div style="color: var(--text-muted); font-size: 0.9rem;">Failed to load</div>')},o.src=t}loadAllImages(){let e=document.querySelectorAll(".lazy-image");e.forEach(e=>{this.loadImage(e)})}}const lazyLoader=new LazyImageLoader;function logPerformanceMetrics(){"performance"in window&&window.addEventListener("load",()=>{setTimeout(()=>{let e=performance.getEntriesByType("navigation")[0];e&&console.log("Page Load Performance:",{"DOM Content Loaded":Math.round(e.domContentLoadedEventEnd-e.domContentLoadedEventStart),"Page Load Complete":Math.round(e.loadEventEnd-e.loadEventStart),"Total Load Time":Math.round(e.loadEventEnd-e.fetchStart)})},1e3)})}logPerformanceMetrics();const portfolioImages=document.querySelectorAll(".portfolio-image img:not(.lazy-image)");portfolioImages.forEach(e=>{e.addEventListener("load",()=>{e.classList.add("loaded")}),e.complete&&e.classList.add("loaded")});const observerOptions={threshold:.1,rootMargin:"0px 0px -50px 0px"},observer=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.style.opacity="1",e.target.style.transform="translateY(0)")})},observerOptions);function showNotification(e,t="info"){let o=document.querySelector(".notification");o&&o.remove();let a=document.createElement("div");a.className=`notification notification-${t}`,a.innerHTML=`
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
    `;let l=a.querySelector(".notification-close");l.addEventListener("click",()=>{a.remove()}),setTimeout(()=>{a.parentNode&&a.remove()},5e3),document.body.appendChild(a)}portfolioItems.forEach(e=>{observer.observe(e)});const notificationStyles=document.createElement("style");function optimizeHeroImage(){let e=document.querySelector(".hero-image");if(!e)return;e.classList.add("loading");let t=new Image;t.onload=()=>{e.classList.remove("loading"),e.classList.add("loaded")},t.onerror=()=>{console.warn("Failed to load hero image"),e.classList.remove("loading")},t.src="IMG_4688_signed.jpg"}notificationStyles.textContent=`
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
`,document.head.appendChild(notificationStyles),window.addEventListener("scroll",()=>{let e=window.pageYOffset,t=document.querySelector(".hero-background");t&&(t.style.transform=`translateY(${.5*e}px)`)}),optimizeHeroImage(),window.addEventListener("load",()=>{document.body.classList.add("loaded"),initializeLightbox()});const loadedStyles=document.createElement("style");loadedStyles.textContent=`
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`,document.head.appendChild(loadedStyles),portfolioItems.forEach(e=>{e.addEventListener("mouseenter",()=>{e.style.transform="translateY(-15px) scale(1.02)"}),e.addEventListener("mouseleave",()=>{e.style.transform="translateY(0) scale(1)"})});const animateOnScroll=()=>{let e=document.querySelectorAll(".portfolio-filters, .about-content, .contact-content");e.forEach(e=>{let t=e.getBoundingClientRect().top;t<window.innerHeight-150&&e.classList.add("animate")})};window.addEventListener("scroll",animateOnScroll);const scrollAnimationStyles=document.createElement("style");function initializeLightbox(){let e=document.getElementById("lightbox"),t=document.getElementById("lightbox-img"),o=document.querySelector(".lightbox-caption"),a=document.querySelector(".lightbox-close"),l=document.querySelectorAll(".portfolio-item");if(console.log("Current portfolio items found:",l.length),console.log("Lightbox elements found:",{lightbox:e,lightboxImg:t,lightboxCaption:o,lightboxClose:a}),e&&t&&o&&a){function n(){e.classList.remove("show"),document.body.style.overflow="",console.log("Lightbox closed")}console.log("All lightbox elements found successfully"),window.testLightbox=function(){t.src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop",o.textContent="Test Image",e.classList.add("show"),document.body.style.overflow="hidden",console.log("Test lightbox opened")},console.log("Test lightbox function available: window.testLightbox()"),l.forEach((a,l)=>{console.log(`Adding click listener to portfolio item ${l+1}`),a.addEventListener("click",()=>{console.log(`Portfolio item ${l+1} clicked!`);let n=a.querySelector("img"),i=a.querySelector("h3").textContent;console.log("Image src:",n.src),console.log("Caption:",i),t.src=n.src,t.alt=n.alt,o.textContent=i,e.classList.add("show"),document.body.style.overflow="hidden",console.log("Lightbox should be visible now")})}),a.addEventListener("click",n),e.addEventListener("click",t=>{t.target===e&&n()}),document.addEventListener("keydown",t=>{"Escape"===t.key&&e.classList.contains("show")&&n()})}else console.error("Some lightbox elements not found!")}scrollAnimationStyles.textContent=`
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