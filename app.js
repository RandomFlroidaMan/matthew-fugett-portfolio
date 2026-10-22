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

// Keep the source images intact; inspect fine detail at its native resolution.
const viewer = document.querySelector('#image-viewer');
const viewerImage = document.querySelector('#viewer-image');
const viewerTitle = document.querySelector('#viewer-title');
const closeViewer = () => viewer.close();
document.querySelectorAll('.project img').forEach(image => {
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'screenshot-button';
  trigger.setAttribute('aria-label', `View full-size screenshot: ${image.alt}`);
  trigger.setAttribute('aria-haspopup', 'dialog');
  image.before(trigger);
  trigger.append(image);
  const hint = document.createElement('span');
  hint.className = 'screenshot-hint';
  hint.setAttribute('aria-hidden', 'true');
  hint.textContent = 'View screenshot';
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.setAttribute('viewBox', '0 0 24 24');
  icon.setAttribute('width', '16');
  icon.setAttribute('height', '16');
  icon.innerHTML = '<path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>';
  hint.append(icon);
  trigger.append(hint);
  trigger.addEventListener('click', () => {
    viewerTitle.textContent = image.alt;
    viewerImage.src = image.src;
    viewerImage.alt = image.alt;
    viewer.showModal();
    document.body.classList.add('viewer-open');
    const scroll = viewer.querySelector('.viewer-scroll');
    scroll.scrollTop = 0;
    scroll.scrollLeft = Math.max(0, (image.naturalWidth - scroll.clientWidth) / 2);
  });
});
viewer.querySelector('.viewer-close').addEventListener('click', closeViewer);
viewer.addEventListener('click', event => {
  if (event.target === viewer) {
    const rect = viewer.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeViewer();
  }
});
viewer.addEventListener('close', () => document.body.classList.remove('viewer-open'));
