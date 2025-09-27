const menuBtn = document.querySelector(".menu__btn");
const menu = document.querySelector(".menu");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("menu--open");
});

// Initialize EmailJS
(function() {
  emailjs.init("r8qdXq9z0EKckngeb"); // Replace with your EmailJS public key
})();

function sendEmail() {
  // Get form data
  const form = document.querySelector('.contact__form');
  const formData = new FormData(form);
  
  // Prepare parameters for the main email (to you)
  let params = {
    from_name: document.getElementById("name").value,
    from_email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
    to_email: "vilamourasurfing@gmail.com", // Your email
  };

  // Prepare parameters for autoreply (to customer)
  let autoreplyParams = {
    to_name: document.getElementById("name").value,
    to_email: document.getElementById("email").value,
    from_name: "Vilamoura Surf School",
    reply_message: `Thank you for contacting Vilamoura Surf School! We've received your message about "${document.getElementById("subject").value}" and will get back to you within 24 hours. Looking forward to surfing with you!`,
  };

  // Show loading state
  const submitBtn = document.querySelector('.contact__submit');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  // Send main email to you
  emailjs
    .send("service_q8fgy2p", "template_7koojlf", params)
    .then(function (res) {
      console.log("Main email sent successfully", res.status);
      
      // Send autoreply to customer
      return emailjs.send("service_q8fgy2p", "template_autoreply", autoreplyParams);
    })
    .then(function (res) {
      console.log("Autoreply sent successfully", res.status);
      
      // Show success message
      alert("Thank you for your message! We've sent you a confirmation email and will get back to you soon.");
      
      // Reset form
      form.reset();
      
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    })
    .catch(function (error) {
      console.error("Error sending email:", error);
      alert("Sorry, there was an error sending your message. Please try again or contact us directly at +351 912 568 342");
      
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
}
