window.addEventListener('DOMContentLoaded', () => {
  // Only fetch if there's a #reports element on this page
  if (document.getElementById('reports')) {
    fetchReports();
  }
});

async function fetchReports() {
  const reportsDiv = document.getElementById('reports');
  const errorDiv   = document.getElementById('error');
  const loadingDiv = document.getElementById('loading');

  try {
    const res = await fetch('https://api.reliefweb.int/v1/reports?appname=helphub&limit=5');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();
    const reports = json.data;

    reports.forEach(r => {
      const card = document.createElement('div');
      card.className = 'news';
      card.innerHTML = `
        <h3>${r.fields.title}</h3>
        <p>${r.fields.date.created.substring(0,10)}</p>
        <a href="${r.fields.url}" target="_blank">Read More</a>
      `;
      reportsDiv.appendChild(card);
    });

    loadingDiv.style.display = 'none';
    reportsDiv.style.display = 'block';

  } catch (err) {
    console.error('Error fetching reports:', err);
    loadingDiv.style.display = 'none';
    errorDiv.textContent = 'Sorry, we can’t load the latest news right now. Please try again later.';
  }
}
