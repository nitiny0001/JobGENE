const jobs = [
  { title: "Data Analyst", skills: ["Python","SQL","Excel"] },
  { title: "Web Developer", skills: ["HTML","CSS","JavaScript"] },
  { title: "ML Engineer", skills: ["Python","Machine Learning"] }
];

let userSkills = [];

// 👉 Auto-detect backend: use localhost when testing, Render URL when deployed
const backendURL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://127.0.0.1:5000/parse"
  : "https://jobgene-backend.onrender.com/parse";

document.getElementById('uploadBtn').addEventListener('click', upload);
window.addEventListener('load', () => showJobs());

async function upload() {
  const input = document.getElementById('resumeUpload');
  const file = input.files[0];
  if (!file) {
    alert('Please choose a resume file (.txt, .pdf, or .docx).');
    return;
  }

  document.getElementById('status').textContent = 'Uploading...';
  const fd = new FormData();
  fd.append('resume', file);

  try {
    const res = await fetch(backendURL, { method: 'POST', body: fd });

    if (!res.ok) {
      let errText = "";
      try {
        const err = await res.json();
        errText = err.error || res.status;
      } catch {
        errText = res.statusText || res.status;
      }
      alert('Server error: ' + errText);
      document.getElementById('status').textContent = '';
      return;
    }

    const data = await res.json();
    userSkills = (data.skills || []).map(s => s.toLowerCase());

    document.getElementById('parsed').textContent = JSON.stringify(data, null, 2);
    document.getElementById('status').textContent =
      'Parsed: ' + (data.skills.length ? data.skills.join(', ') : 'No skills found');

    showJobs();
  } catch (e) {
    console.error(e);
    alert('Network error: ' + e.message);
    document.getElementById('status').textContent = '';
  }
}

function showJobs() {
  const container = document.getElementById('jobs');
  container.innerHTML = '';
  jobs.forEach(job => {
    const matched = job.skills.filter(s => userSkills.includes(s.toLowerCase())).length;
    const percent = Math.round((matched / job.skills.length) * 100) || 0;

    const card = document.createElement('div');
    card.className = 'job-card';
    card.innerHTML = `
      <h3>${job.title}</h3>
      <p><b>Required:</b> ${job.skills.join(', ')}</p>
      <p><b>Match:</b> ${percent}%</p>
    `;

    container.appendChild(card);
  });
}
