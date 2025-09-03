const jobs = [
  { title: "Data Analyst", skills: ["Python","SQL","Excel"] },
  { title: "Web Developer", skills: ["HTML","CSS","JavaScript"] },
  { title: "ML Engineer", skills: ["Python","Machine Learning"] }
];

let userSkills = [];

document.getElementById('uploadBtn').addEventListener('click', upload);
window.addEventListener('load', () => showJobs());

async function upload(){
  const input = document.getElementById('resumeUpload');
  const file = input.files[0];
  if (!file) { alert('Please choose a .txt resume file (sample included).'); return; }

  document.getElementById('status').textContent = 'Uploading...';
  const fd = new FormData();
  fd.append('resume', file);

  try {
    const res = await fetch('http://127.0.0.1:5000/parse', { method: 'POST', body: fd });
    if (!res.ok) {
      const err = await res.json();
      alert('Server error: ' + (err.error || res.status));
      document.getElementById('status').textContent = '';
      return;
    }
    const data = await res.json();
    userSkills = (data.skills || []).map(s => s.toLowerCase());
    document.getElementById('parsed').textContent = JSON.stringify(data, null, 2);
    document.getElementById('status').textContent = 'Parsed: ' + (data.skills.length ? data.skills.join(', ') : 'No skills found');
    showJobs();
  } catch (e) {
    alert('Network error: ' + e.message);
    document.getElementById('status').textContent = '';
  }
}

function showJobs(){
  const container = document.getElementById('jobs');
  container.innerHTML = '';
  jobs.forEach(job => {
    const matched = job.skills.filter(s => userSkills.includes(s.toLowerCase())).length;
    const percent = Math.round((matched / job.skills.length) * 100) || 0;
    const card = document.createElement('div');
    card.className = 'job-card';
    card.innerHTML = `<h3>${job.title}</h3>
                      <p><b>Required:</b> ${job.skills.join(', ')}</p>
                      <p><b>Match:</b> ${percent}%</p>`;
    container.appendChild(card);
  });
}
