const buttons = [...document.querySelectorAll('[data-filter]')];
const projects = [...document.querySelectorAll('.project')];
const search = document.querySelector('#search');
let category = 'all';
function filterProjects() {
  const term = search.value.trim().toLowerCase();
  let count = 0;
  projects.forEach(project => {
    const visible = (category === 'all' || project.dataset.category === category) && project.textContent.toLowerCase().includes(term);
    project.hidden = !visible;
    if (visible) count++;
  });
  document.querySelector('#result-count').textContent = `${count} case ${count === 1 ? 'study' : 'studies'} · ${category === 'all' ? 'All disciplines' : category}`;
  document.querySelector('#empty').hidden = count !== 0;
}
buttons.forEach(button => button.addEventListener('click', () => {
  category = button.dataset.filter;
  buttons.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  filterProjects();
}));
search.addEventListener('input', filterProjects);
filterProjects();
