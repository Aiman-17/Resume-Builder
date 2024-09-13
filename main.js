document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resumeForm");
    const createResumeBtn = document.getElementById("create-resume-btn");
    createResumeBtn === null || createResumeBtn === void 0 ? void 0 : createResumeBtn.addEventListener("click", (e) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        e.preventDefault();
        // Capture form data including the new image field
        const fullName = (_a = document.getElementById("fullName")) === null || _a === void 0 ? void 0 : _a.value;
        const email = (_b = document.getElementById("email")) === null || _b === void 0 ? void 0 : _b.value;
        const phone = (_c = document.getElementById("phone")) === null || _c === void 0 ? void 0 : _c.value;
        const degree = (_d = document.getElementById("degree")) === null || _d === void 0 ? void 0 : _d.value;
        const university = (_e = document.getElementById("university")) === null || _e === void 0 ? void 0 : _e.value;
        const graduationYear = (_f = document.getElementById("graduationYear")) === null || _f === void 0 ? void 0 : _f.value;
        const jobTitle = (_g = document.getElementById("jobTitle")) === null || _g === void 0 ? void 0 : _g.value;
        const company = (_h = document.getElementById("company")) === null || _h === void 0 ? void 0 : _h.value;
        const workDates = (_j = document.getElementById("workDates")) === null || _j === void 0 ? void 0 : _j.value;
        const jobDescription = (_k = document.getElementById("jobDescription")) === null || _k === void 0 ? void 0 : _k.value;
        const skills = (_l = document.getElementById("skills")) === null || _l === void 0 ? void 0 : _l.value;
        const website = (_m = document.getElementById("website")) === null || _m === void 0 ? void 0 : _m.value;
        const uploadImage = (_p = (_o = document.getElementById("uploadImage")) === null || _o === void 0 ? void 0 : _o.files) === null || _p === void 0 ? void 0 : _p[0];
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
        }
        else {
            prompt("Please fill out all fields and upload an image.");
        }
    });
});
function loadResumeData() {
    const resumeDataString = localStorage.getItem("resumeData");
    if (resumeDataString) {
        const resumeData = JSON.parse(resumeDataString);
        // Populate the resume page with saved data
        const resumeFullName = document.querySelector(".left-column h1");
        const resumeEmail = document.querySelector(".contact-info p:nth-of-type(2)");
        const resumePhone = document.querySelector(".contact-info p:nth-of-type(1)");
        const resumeDegree = document.querySelector(".education .degree:nth-of-type(1) p:nth-of-type(2)");
        const resumeUniversity = document.querySelector(".education .degree:nth-of-type(1) h3");
        const resumeJobTitle = document.querySelector(".experience .job h3");
        const resumeCompany = document.querySelector(".experience .job p:nth-of-type(1)");
        const resumeDates = document.querySelector(".experience .job p:nth-of-type(2)");
        const resumeDescription = document.querySelector(".experience .job p:nth-of-type(3)");
        const resumeWebsite = document.querySelector(".contact-info p:nth-of-type(3)");
        const skillsList = document.getElementById("skills-list");
        const resumeImage = document.querySelector(".left-column .profile-img");
        if (resumeFullName)
            resumeFullName.textContent = resumeData.fullName;
        if (resumeEmail)
            resumeEmail.textContent = `Email: ${resumeData.email}`;
        if (resumePhone)
            resumePhone.textContent = `Phone: ${resumeData.phone}`;
        if (resumeDegree)
            resumeDegree.textContent = resumeData.degree;
        if (resumeUniversity)
            resumeUniversity.textContent = resumeData.university;
        if (resumeJobTitle)
            resumeJobTitle.textContent = resumeData.jobTitle;
        if (resumeCompany)
            resumeCompany.textContent = resumeData.company;
        if (resumeDates)
            resumeDates.textContent = resumeData.workDates;
        if (resumeDescription)
            resumeDescription.textContent = resumeData.jobDescription;
        if (resumeWebsite)
            resumeWebsite.textContent = `Website: ${resumeData.website}`;
        if (skillsList) {
            skillsList.innerHTML = "";
            resumeData.skills.split(",").forEach((skill) => {
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
    const printButton = document.getElementById("print-btn");
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

