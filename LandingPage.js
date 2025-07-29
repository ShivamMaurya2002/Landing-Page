document.addEventListener("DOMContentLoaded", () => {
// DOM Elements
  const timeField = document.getElementById("time");
  
  const replyToField = document.getElementById("reply_to");
  
  const emailField = document.getElementById("email");
  
  const contactForm = document.getElementById("contact-form");
  
  const statusMsg = document.getElementById("status");
  
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  
  const navLinks = document.getElementById("navLinks");

  //  Auto-fill current time 
  if (timeField) timeField.value = new Date().toLocaleString();

  //  Sync reply_to with email input 
  if (emailField && replyToField) 
  {
    emailField.addEventListener("input", () => {
      replyToField.value = emailField.value;
    });
  }

  
  //  Mobile Menu Toggle 
  if (mobileMenuBtn && navLinks) 
  {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mobileMenuBtn.innerHTML = navLinks.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  
  // Navbar Scroll Effect & Section Reveal
  window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (nav) 
    {
      if (window.scrollY > 50) 
      {
        nav.style.padding = "15px 0";
        nav.style.backdropFilter = "blur(15px)";
      } 
      else 
      {
        nav.style.padding = "20px 0";
        nav.style.backdropFilter = "blur(10px)";
      }
    }

    
    document.querySelectorAll("section").forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      
      if (sectionTop < windowHeight - 100) 
      {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
      }
    });
  });

  
  // Smooth Scrolling for Anchors 
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) 
    {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) 
      {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  
  // Initialize Section Animations
  document.querySelectorAll("section").forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  
  const hero = document.querySelector(".hero");
  if (hero) hero.style.opacity = "1";

  
  // EmailJS Form Submission with Auto-Reply
  if (contactForm && statusMsg) 
  {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      
      statusMsg.style.color = "#0ee9a7";
      statusMsg.innerText = "⏳ Sending message...";

      
      // Step 1: Send message to admin
      emailjs.sendForm("Shivam_1913", "template_uzlhfj9", this).then(
        () => {
          
          // Step 2: Send auto-reply to user
          emailjs.send("Shivam_1913", "template_7dx8jze", 
          {
            name: contactForm.name.value,
            email: contactForm.email.value,
            message: contactForm.message.value,
          });

          
          statusMsg.innerText = "✅ Message sent successfully!";
          contactForm.reset();
          if (timeField) timeField.value = new Date().toLocaleString();
          if (replyToField) replyToField.value = "";
        },
        
        (error) => {
          statusMsg.style.color = "tomato";
          statusMsg.innerText = "❌ Failed to send message. Try again.";
          console.error("EmailJS Error:", error);
        }
      );
    });
  }
});
