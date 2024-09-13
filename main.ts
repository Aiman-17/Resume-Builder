document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resumeForm") as HTMLFormElement;
  const createResumeBtn = document.getElementById(
    "create-resume-btn"
  ) as HTMLButtonElement;

  createResumeBtn?.addEventListener("click", (e) => {
    e.preventDefault();

    // Capture form data including the new image field
    const fullName = (document.getElementById("fullName") as HTMLInputElement)
      ?.value;
    const email = (document.getElementById("email") as HTMLInputElement)?.value;
    const phone = (document.getElementById("phone") as HTMLInputElement)?.value;
    const degree = (document.getElementById("degree") as HTMLInputElement)
      ?.value;
    const university = (
      document.getElementById("university") as HTMLInputElement
    )?.value;
    const graduationYear = (
      document.getElementById("graduationYear") as HTMLInputElement
    )?.value;
    const jobTitle = (document.getElementById("jobTitle") as HTMLInputElement)
      ?.value;
    const company = (document.getElementById("company") as HTMLInputElement)
      ?.value;
    const workDates = (document.getElementById("workDates") as HTMLInputElement)
      ?.value;
    const jobDescription = (
      document.getElementById("jobDescription") as HTMLTextAreaElement
    )?.value;
    const skills = (document.getElementById("skills") as HTMLInputElement)
      ?.value;
    const website = (document.getElementById("website") as HTMLInputElement)
      ?.value;
    const uploadImage = (
      document.getElementById("uploadImage") as HTMLInputElement
    )?.files?.[0];

    if (form && uploadImage) {
      const reader = new FileReader();
      reader.onload = function () {
        const resumeData = {
          fullName,
          email,
          phone,
          degree,
          university,
          graduationYear,
          jobTitle,
          company,
          workDates,
          jobDescription,
          skills,
          website,
          image: reader.result, // Base64 encoded image
        };

        localStorage.setItem("resumeData", JSON.stringify(resumeData));
        window.location.href = "resume.html";
      };
      reader.readAsDataURL(uploadImage);
    } else {
      prompt("Please fill out all fields and upload an image.");
    }
  });
});
function loadResumeData() {
  const resumeDataString = localStorage.getItem("resumeData");
  if (resumeDataString) {
    const resumeData = JSON.parse(resumeDataString);

    // Populate the resume page with saved data
    const resumeFullName = document.querySelector(
      ".left-column h1"
    ) as HTMLHeadingElement;
    const resumeEmail = document.querySelector(
      ".contact-info p:nth-of-type(2)"
    ) as HTMLParagraphElement;
    const resumePhone = document.querySelector(
      ".contact-info p:nth-of-type(1)"
    ) as HTMLParagraphElement;
    const resumeDegree = document.querySelector(
      ".education .degree:nth-of-type(1) p:nth-of-type(2)"
    ) as HTMLParagraphElement;
    const resumeUniversity = document.querySelector(
      ".education .degree:nth-of-type(1) h3"
    ) as HTMLHeadingElement;
    const resumeJobTitle = document.querySelector(
      ".experience .job h3"
    ) as HTMLHeadingElement;
    const resumeCompany = document.querySelector(
      ".experience .job p:nth-of-type(1)"
    ) as HTMLParagraphElement;
    const resumeDates = document.querySelector(
      ".experience .job p:nth-of-type(2)"
    ) as HTMLParagraphElement;
    const resumeDescription = document.querySelector(
      ".experience .job p:nth-of-type(3)"
    ) as HTMLParagraphElement;
    const resumeWebsite = document.querySelector(
      ".contact-info p:nth-of-type(3)"
    ) as HTMLParagraphElement;
    const skillsList = document.getElementById(
      "skills-list"
    ) as HTMLUListElement;
    const resumeImage = document.querySelector(
      ".left-column .profile-img"
    ) as HTMLImageElement;

    if (resumeFullName) resumeFullName.textContent = resumeData.fullName;
    if (resumeEmail) resumeEmail.textContent = `Email: ${resumeData.email}`;
    if (resumePhone) resumePhone.textContent = `Phone: ${resumeData.phone}`;
    if (resumeDegree) resumeDegree.textContent = resumeData.degree;
    if (resumeUniversity) resumeUniversity.textContent = resumeData.university;
    if (resumeJobTitle) resumeJobTitle.textContent = resumeData.jobTitle;
    if (resumeCompany) resumeCompany.textContent = resumeData.company;
    if (resumeDates) resumeDates.textContent = resumeData.workDates;
    if (resumeDescription)
      resumeDescription.textContent = resumeData.jobDescription;
    if (resumeWebsite)
      resumeWebsite.textContent = `Website: ${resumeData.website}`;

    if (skillsList) {
      skillsList.innerHTML = "";
      resumeData.skills.split(",").forEach((skill: string) => {
        const listItem = document.createElement("li");
        listItem.textContent = skill.trim();
        skillsList.appendChild(listItem);
      });
    }

    if (resumeImage && resumeData.image) {
      resumeImage.src = resumeData.image;
    }
  }
}

// Call this function on the resume.html page to load the stored data
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("resume.html")) {
    loadResumeData();
  }
});

function handlePrint() {
  window.print(); // This opens the browser's print dialog
}

// Attach the event listener to the print button
document.addEventListener("DOMContentLoaded", () => {
  const printButton = document.getElementById("print-btn") as HTMLButtonElement;

  if (printButton) {
    printButton.addEventListener("click", handlePrint);
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarLinks = document.querySelector('.navbar-links');

  if (navbarToggle) {
    navbarToggle.addEventListener('click', () => {
      if (navbarLinks) {
        navbarLinks.classList.toggle('active');
      }
    });
  }
});
