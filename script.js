const courseData = [
    { id: 1, title: "Business Management (BBA)", faculty: "Business", level: "Undergraduate", mode: "On Campus", credits: 120, duration: "3 Years", seats: 40, desc: "A comprehensive programme covering management theory, strategy, marketing, and finance for the modern global business environment.", color: "#0070b8" },
    { id: 2, title: "Digital Marketing & E-Commerce", faculty: "Business", level: "Postgraduate", mode: "Hybrid", credits: 60, duration: "1 Year", seats: 30, desc: "Covers data-driven marketing, SEO, social media strategy, e-commerce platforms, and analytics in a digital-first environment.", color: "#0070b8" },
    { id: 3, title: "Accounting & Finance", faculty: "Business", level: "Undergraduate", mode: "On Campus", credits: 120, duration: "3 Years", seats: 35, desc: "Financial reporting, management accounting, taxation, auditing, and investment analysis aligned with CIMA and ACCA pathways.", color: "#0070b8" },
    { id: 4, title: "Mechanical Engineering (BEng)", faculty: "Engineering", level: "Undergraduate", mode: "On Campus", credits: 180, duration: "4 Years", seats: 25, desc: "Thermodynamics, fluid mechanics, materials science, and manufacturing processes with extensive laboratory and workshop practice.", color: "#1a7a4a" },
    { id: 5, title: "Electrical & Electronic Engineering", faculty: "Engineering", level: "Undergraduate", mode: "Hybrid", credits: 180, duration: "4 Years", seats: 20, desc: "Circuit design, power systems, embedded systems, and signal processing preparing graduates for high-demand engineering roles.", color: "#1a7a4a" },
    { id: 6, title: "Software Engineering (BSc)", faculty: "Computing", level: "Undergraduate", mode: "On Campus", credits: 120, duration: "3 Years", seats: 45, desc: "Software development methodologies, algorithms, databases, web technologies, and agile practices using modern programming languages.", color: "#6b3fa0" },
    { id: 7, title: "Cybersecurity & Networking", faculty: "Computing", level: "Postgraduate", mode: "Online", credits: 60, duration: "1 Year", seats: 30, desc: "Network security, ethical hacking, incident response, cryptography, and compliance frameworks including ISO 27001.", color: "#6b3fa0" },
    { id: 8, title: "Data Science & AI", faculty: "Computing", level: "Postgraduate", mode: "Hybrid", credits: 60, duration: "1 Year", seats: 20, desc: "Machine learning, deep learning, data visualisation, big data, and practical AI applications using Python and cloud platforms.", color: "#6b3fa0" },
    { id: 9, title: "Nautical Science (BSc)", faculty: "Maritime", level: "Undergraduate", mode: "On Campus", credits: 180, duration: "4 Years", seats: 15, desc: "Navigation, seamanship, maritime law, cargo operations, and ship stability, fully aligned with STCW international standards.", color: "#0a6e6e" },
    { id: 10, title: "Marine Engineering", faculty: "Maritime", level: "Undergraduate", mode: "On Campus", credits: 180, duration: "4 Years", seats: 12, desc: "Marine diesel engines, auxiliary machinery, electrical systems, and propulsion technology for careers at sea and ashore.", color: "#0a6e6e" },
    { id: 11, title: "Aircraft Maintenance Engineering", faculty: "Aviation", level: "Undergraduate", mode: "On Campus", credits: 150, duration: "3.5 Years", seats: 18, desc: "Airframe, powerplant, avionics, and aviation safety — EASA Part-66 aligned programme with hangar-based practical training.", color: "#c0392b" },
    { id: 12, title: "Air Transport Management", faculty: "Aviation", level: "Postgraduate", mode: "Hybrid", credits: 60, duration: "1 Year", seats: 22, desc: "Airline operations, revenue management, airport strategy, and aviation regulatory frameworks for management professionals.", color: "#c0392b" },
];

let enrolled = new Set();
let activeFilter = "All";

function renderCourses(data) {
    const grid = document.getElementById("courses-grid");
    const nr = document.getElementById("no-results");
    if (!data.length) { grid.innerHTML = ""; nr.classList.add("show"); return; }
    nr.classList.remove("show");
    grid.innerHTML = data.map(c => `
    <div class="course-card">
      <div class="course-banner" style="background:${c.color}"></div>
      <div class="course-body">
        <div class="course-tags">
          <span class="tag tag-faculty">${c.faculty}</span>
          <span class="tag tag-level">${c.level}</span>
          <span class="tag tag-mode">${c.mode}</span>
        </div>
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
        <div class="course-meta">
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            ${c.duration}
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            ${c.seats} seats
          </span>
        </div>
      </div>
      <div class="course-footer">
        <div class="course-credits"><strong>${c.credits}</strong> credits</div>
        <button class="enrol-btn ${enrolled.has(c.id) ? "enrolled" : ""}" onclick="toggleEnrol(${c.id})" id="btn-${c.id}">
          ${enrolled.has(c.id) ? "&#10003; Enrolled" : "Enrol"}
        </button>
      </div>
    </div>
  `).join("");
}

function filterCourses(faculty, el) {
    activeFilter = faculty;
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    el.classList.add("active");
    applyFilters();
}

function searchCourses() { applyFilters(); }

function applyFilters() {
    const q = document.getElementById("course-search").value.toLowerCase();
    let filtered = courseData;
    if (activeFilter !== "All") filtered = filtered.filter(c => c.faculty === activeFilter);
    if (q) filtered = filtered.filter(c => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q));
    renderCourses(filtered);
}

function toggleEnrol(id) {
    if (enrolled.has(id)) { enrolled.delete(id); } else { enrolled.add(id); }
    applyFilters();
    updateBar();
}

function updateBar() {
    const bar = document.getElementById("enrolment-bar");
    const count = enrolled.size;
    const credits = [...enrolled].reduce((s, id) => s + (courseData.find(c => c.id === id)?.credits || 0), 0);
    document.getElementById("enrol-count").textContent = count;
    document.getElementById("enrol-credits").textContent = credits;
    document.getElementById("plural-s").textContent = count !== 1 ? "s" : "";
    bar.classList.toggle("visible", count > 0);
}

function confirmEnrolment() {
    const count = enrolled.size;
    const credits = [...enrolled].reduce((s, id) => s + (courseData.find(c => c.id === id)?.credits || 0), 0);
    document.getElementById("modal-body").textContent = "You have enrolled in " + count + " course" + (count !== 1 ? "s" : "") + " (" + credits + " credits total) for the 2026-27 academic year. A confirmation will be sent to your registered email within 24 hours.";
    document.getElementById("modal").classList.add("open");
}

function closeModal(id) {
    document.getElementById(id).classList.remove("open");
}

function goTo(page) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
    document.getElementById("page-" + page).classList.add("active");
    const nl = document.getElementById("nav-" + page);
    if (nl) nl.classList.add("active");
    window.scrollTo(0, 0);
    if (page === "courses") { renderCourses(courseData); }
}

function toggleMenu() {
    document.getElementById("mobile-menu").classList.toggle("open");
}

function validate(id, errId, condition) {
    const el = document.getElementById(id);
    const err = document.getElementById(errId);
    if (!condition(el.value)) {
        el.classList.add("error"); err.classList.add("show"); return false;
    }
    el.classList.remove("error"); err.classList.remove("show"); return true;
}

function handleRegister() {
    ["reg-success", "reg-error"].forEach(id => { const e = document.getElementById(id); e.className = "alert"; e.textContent = ""; });
    const ok = [
        validate("reg-fname", "err-fname", v => v.trim().length >= 2),
        validate("reg-lname", "err-lname", v => v.trim().length >= 2),
        validate("reg-email", "err-email", v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)),
        validate("reg-dob", "err-dob", v => !!v),
        validate("reg-faculty", "err-faculty", v => !!v),
        validate("reg-pass", "err-pass", v => v.length >= 8),
        validate("reg-pass2", "err-pass2", v => v === document.getElementById("reg-pass").value),
    ].every(Boolean);
    if (ok) {
        const suc = document.getElementById("reg-success");
        suc.textContent = "Account created successfully! Redirecting to course selection\u2026";
        suc.className = "alert success";
        setTimeout(() => goTo("courses"), 1800);
    }
}

function handleLogin() {
    const e = document.getElementById("login-error");
    e.className = "alert"; e.textContent = "";
    const ok = [
        validate("login-email", "err-login-email", v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)),
        validate("login-pass", "err-login-pass", v => v.length >= 1),
    ].every(Boolean);
    if (ok) {
        e.textContent = "Signed in successfully! Redirecting\u2026";
        e.className = "alert success";
        setTimeout(() => goTo("courses"), 1500);
    }
}

// FORGOT PASSWORD FLOW
function fpStep1() {
    const err = document.getElementById("fp-error1");
    err.className = "alert"; err.textContent = "";
    const ok = validate("fp-email", "err-fp-email", v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
    if (ok) {
        document.getElementById("fp-step1").style.display = "none";
        document.getElementById("fp-step2").style.display = "block";
        document.getElementById("sdot1").className = "step-dot done";
        document.getElementById("sdot1").textContent = "\u2713";
        document.getElementById("sline1").className = "step-line done";
        document.getElementById("sdot2").className = "step-dot active";
    }
}

function fpStep2() {
    const err = document.getElementById("fp-error2");
    err.className = "alert"; err.textContent = "";
    const ok = validate("fp-otp", "err-fp-otp", v => /^\d{6}$/.test(v.trim()));
    if (ok) {
        document.getElementById("fp-step2").style.display = "none";
        document.getElementById("fp-step3").style.display = "block";
        document.getElementById("sdot2").className = "step-dot done";
        document.getElementById("sdot2").textContent = "\u2713";
        document.getElementById("sline2").className = "step-line done";
        document.getElementById("sdot3").className = "step-dot active";
    }
}

function fpStep3() {
    const err = document.getElementById("fp-error3");
    err.className = "alert"; err.textContent = "";
    const ok = [
        validate("fp-newpass", "err-fp-newpass", v => v.length >= 8),
        validate("fp-newpass2", "err-fp-newpass2", v => v === document.getElementById("fp-newpass").value),
    ].every(Boolean);
    if (ok) {
        document.getElementById("sdot3").className = "step-dot done";
        document.getElementById("sdot3").textContent = "\u2713";
        document.getElementById("fp-modal").classList.add("open");
    }
}

function fpResend() {
    const i = document.getElementById("fp-info2");
    i.textContent = "Code resent! Please check your inbox.";
    i.className = "alert success";
}

// LEGAL CONTENT
const legalContent = {
    terms: {
        title: "Terms & Conditions",
        body: `
      <h4>1. Acceptance of Terms</h4>
      <p>By creating a student account or enrolling in any programme at CINEC Campus for the 2026&ndash;27 academic year, you agree to be bound by these Terms and Conditions. Please read them carefully before proceeding.</p>
      <h4>2. Enrolment</h4>
      <p>Enrolment is subject to meeting the stated entry requirements and the availability of places. CINEC Campus reserves the right to withdraw or suspend admission at any stage if false or misleading information is provided.</p>
      <h4>3. Academic Obligations</h4>
      <ul>
        <li>Students must attend a minimum of 80% of all scheduled sessions.</li>
        <li>All assessments must be submitted by the designated deadlines.</li>
        <li>Academic dishonesty, including plagiarism, will result in disciplinary action.</li>
      </ul>
      <h4>4. Fees &amp; Payments</h4>
      <p>Tuition fees are payable per semester as per the Schedule of Fees for 2026&ndash;27. Late payment may result in suspension of access to facilities and academic services.</p>
      <h4>5. Code of Conduct</h4>
      <p>All students are required to abide by the CINEC Campus Student Code of Conduct, which promotes a respectful, inclusive, and safe learning environment.</p>
      <h4>6. Changes to Programmes</h4>
      <p>CINEC Campus reserves the right to modify programme content, scheduling, and delivery mode. Students will be notified with reasonable notice of any material changes.</p>
      <h4>7. Governing Law</h4>
      <p>These terms are governed by the laws of Sri Lanka. Any disputes will be subject to the exclusive jurisdiction of the courts of Sri Lanka.</p>
    `
    },
    privacy: {
        title: "Privacy Policy",
        body: `
      <h4>1. Data Controller</h4>
      <p>CINEC Campus is the data controller for personal information collected through this portal. We are committed to protecting your privacy in accordance with applicable data protection legislation.</p>
      <h4>2. Information We Collect</h4>
      <ul>
        <li>Personal identification information (name, date of birth, email address)</li>
        <li>Academic records, course selections, and enrolment history</li>
        <li>Communication records and portal usage data</li>
      </ul>
      <h4>3. How We Use Your Information</h4>
      <p>Your personal data is used solely for the purposes of:</p>
      <ul>
        <li>Processing and managing your enrolment</li>
        <li>Communicating important academic and administrative updates</li>
        <li>Improving our services and portal experience</li>
        <li>Complying with legal and regulatory obligations</li>
      </ul>
      <h4>4. Data Sharing</h4>
      <p>We do not sell or share your personal data with third parties for marketing purposes. Data may be shared with accreditation bodies and regulatory authorities where required by law.</p>
      <h4>5. Data Retention</h4>
      <p>Student records are retained for a period of 7 years after the completion or termination of enrolment, as required by academic regulations.</p>
      <h4>6. Your Rights</h4>
      <p>You have the right to access, correct, or request deletion of your personal data. Please contact the CINEC Campus Data Protection Officer at <strong>privacy@cinec.edu.lk</strong>.</p>
      <h4>7. Cookies</h4>
      <p>This portal uses essential cookies only, necessary for the functioning of the system. No third-party tracking cookies are used.</p>
      <h4>8. Contact</h4>
      <p>For any privacy-related concerns, please email <strong>privacy@cinec.edu.lk</strong> or write to the Registrar, CINEC Campus, Malabe, Sri Lanka.</p>
    `
    }
};

function showLegal(type) {
    const content = legalContent[type];
    document.getElementById("legal-title").textContent = content.title;
    document.getElementById("legal-body").innerHTML = content.body;
    document.getElementById("legal-modal").classList.add("open");
}

// Initial render
renderCourses(courseData);
