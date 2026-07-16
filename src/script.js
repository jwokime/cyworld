
// Radio/BGM Player Functionality
const bgmAudio = document.getElementById('bgm-audio');
const playBtn = document.getElementById('play-radio');
const pauseBtn = document.getElementById('pause-radio');
const nextBtn = document.getElementById('next-radio');
const radioLink = document.getElementById('radio-link');
let currentSelection = null;
let activeRow = null;

const stations = [
  { type: 'radio', name: 'Radio Alhara — راديو الحارة', url: 'https://stream.radiojar.com/78cxy6wkxtzuv', href: 'https://radioalhara.net/' },
  { type: 'radio', name: 'Nightwave Plaza Radio', url: 'https://radio.plaza.one/mp3', href: 'https://plaza.one/' },
  { type: 'radio', name: 'NTS Radio', url: 'https://stream-relay-geo.ntslive.net/stream', href: 'https://nts.live/' },
];

function resolveMediaUrl(stream) {
  if (!stream) return '';
  if (/^https?:\/\//i.test(stream) || stream.startsWith('/')) return stream;
  return `/${stream}`;
}

function clearSelectionHighlight() {
  document.querySelectorAll('.jukebox-station, .jukebox-mp3').forEach(row => {
    row.classList.remove('active');
    row.style.fontWeight = 'normal';
  });
}

function applySelection(source, row = null) {
  if (!bgmAudio || !radioLink || !source) return;

  currentSelection = source;
  activeRow = row || activeRow;
  bgmAudio.src = resolveMediaUrl(source.stream || source.url);
  bgmAudio.load();
  bgmAudio.loop = source.type !== 'mp3';
  radioLink.textContent = source.name;
  radioLink.href = source.href || '#';

  clearSelectionHighlight();
  if (activeRow) {
    activeRow.classList.add('active');
    activeRow.style.fontWeight = 'bold';
  }
}

function getDefaultSelection() {
  return { ...stations[0], stream: stations[0].url, type: 'radio' };
}

async function startPlayback() {
  if (!bgmAudio) return;
  try {
    if (!currentSelection) {
      currentSelection = getDefaultSelection();
    }
    applySelection(currentSelection);
    await bgmAudio.play();
  } catch (err) {
    console.warn('Radio playback failed:', err);
  }
}

function selectJukeboxRow(row) {
  if (!row) return;

  activeRow = row;
  const rowType = row.dataset.type || (row.classList.contains('jukebox-mp3') ? 'mp3' : 'radio');
  const stream = row.dataset.stream;
  const name = row.dataset.name;
  const href = row.dataset.href || '';

  let source = { type: rowType, stream, name, href };

  if (rowType === 'radio') {
    const station = stations.find(s => s.url === stream || s.name === name);
    if (station) {
      source = { ...station, type: 'radio', stream: station.url };
    }
  }

  applySelection(source, row);
  startPlayback();
}

if (playBtn) {
  playBtn.addEventListener('click', startPlayback);
}

if (pauseBtn) {
  pauseBtn.addEventListener('click', () => bgmAudio?.pause());
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    const rows = Array.from(document.querySelectorAll('.jukebox-station, .jukebox-mp3'));
    const currentIndex = rows.findIndex(row => row.classList.contains('active'));
    const nextRow = rows[(currentIndex + 1 + rows.length) % rows.length] || rows[0];
    if (nextRow) {
      selectJukeboxRow(nextRow);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.jukebox-station, .jukebox-mp3').forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') return;
      selectJukeboxRow(row);
    });
  });

  const defaultRow = document.querySelector('.jukebox-station');
  if (defaultRow) {
    currentSelection = getDefaultSelection();
    applySelection(currentSelection, defaultRow);
  }
});




// Visitor counter
fetch('https://arunhitcounter.com/hit_tracker.php?website_name=jwocyworld')
  .then(res => res.json())
  .then(data => {
    document.getElementById('today-count').innerText = data.today_hits;
    document.getElementById('total-count').innerText = data.total_hits;
  });

const tabButtons = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const profile = document.querySelector('.profile');
const folders = document.querySelector('.scrapbook-folders');

function showAllScrapbookItems() {
  const folderLinks = document.querySelectorAll('.folder-list .folder');
  const scrapItems = document.querySelectorAll('.scrap-item');

  folderLinks.forEach(link => link.classList.remove('active'));
  const allFolder = document.querySelector('.folder-list .folder[href="#all"]');
  allFolder?.classList.add('active');

  scrapItems.forEach(item => {
    item.style.display = 'block';
  });
}

function updateSidebarForTab(target) {
  if (!profile || !folders) return;
  if (target === '#scrapbook') {
    profile.style.display = 'none';
    folders.style.display = 'block';
  } else {
    profile.style.display = 'block';
    folders.style.display = 'none';
  }
}

// Switch tab display + active class
function switchTab(targetHash) {
  // Default to #home if no hash
  const target = targetHash || '#home';

  // Update tab styling
  tabButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('href') === target) {
      btn.classList.add('active');
    }
  });

  // Update content visibility
  tabContents.forEach(content => {
    content.classList.remove('active');
  });
  document.querySelector(target)?.classList.add('active');

  updateSidebarForTab(target);

  // Avoid stale folder filters hiding scrapbook posts when returning to this tab.
  if (target === '#scrapbook') {
    showAllScrapbookItems();
  }
}

// 1. Click tabs → instant switch
tabButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault(); // STOP PAGE RELOAD
    const target = btn.getAttribute('href');
    window.location.hash = target; // update URL
    switchTab(target);
  });
});

// 2. Load correct tab on page load + URL hash change
window.addEventListener('load', () => switchTab(window.location.hash));
window.addEventListener('hashchange', () => switchTab(window.location.hash));


// Guestbook //

// async function loadGuestbook() {
//   const apiKey = "AIzaSyCkUY3R7BYVeJ9rHbHClHbxwER3GLQB0dU";
//   const sheetId = "1hoxK7zD4tEHAvJbF3VT-M-eEjcOe02YXSYjJ9vcyl7U";
//   const sheetName = "Form Responses 1";

//   try {
//     const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`);
//     console.log("Response status:", res.status);
//     const data = await res.json();
//     const rows = data.values;
//     const container = document.getElementById("guestbook-messages");
    
//     container.innerHTML = "";

//     // Show NEWEST first
//     for (let i = 1; i < rows.length; i++) {
//       const timestamp = rows[i][0];
//       const name = rows[i][2];
//       const message = rows[i][3];
//       const emoji = rows[i][4];

//       const entry = document.createElement("div");
//       entry.className = "gb-entry";

//       const displayEmoji = emoji && emoji.trim() !== "" ? emoji : "*";

//         const authorSpan = document.createElement("span");
//         authorSpan.className = "gb-author";
//         authorSpan.textContent = displayEmoji + " " + name;

//       const timeSpan = document.createElement("span");
//       timeSpan.className = "gb-time";
//       timeSpan.textContent = "[" + timestamp + "]";

//       const msgPara = document.createElement("p");
//       msgPara.textContent = message;
    
//       entry.appendChild(authorSpan);
//       entry.appendChild(document.createTextNode(" "));
//       entry.appendChild(timeSpan);
//       entry.appendChild(msgPara);

//       container.appendChild(entry);
//     }

//   } catch (err) {
//     console.error("Load error:", err);
//     document.getElementById("guestbook-messages").innerText = "Failed to load messages.";
//   }
// }

// document.addEventListener("DOMContentLoaded", loadGuestbook);

// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.getElementById('gb-form');
//   const messageInput = document.getElementById('message-input');

//   form?.addEventListener('submit', () => {
//     setTimeout(() => {
//         loadGuestbook();
//         const container = document.getElementById("guestbook-messages");
//         container.scrollTop = container.scrollHeight;
//         messageInput.value = '';
//     }, 1500);
//     });
// });

// const emojiSelect = document.getElementById('emoji-select');
// const emojiInput = document.getElementById('emoji-input');
// if (emojiSelect && emojiInput) {
//   emojiSelect.addEventListener('change', function() {
//     emojiInput.value = this.value;
//   });
// }

// scrapbook
document.addEventListener('DOMContentLoaded', function() {
  const folderLinks = document.querySelectorAll('.folder-list .folder');
  const scrapItems = document.querySelectorAll('.scrap-item');

  scrapItems.forEach(item => {
    item.style.display = 'block';
  });

  folderLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // stop page jump

      // set active class
      folderLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');

      // get tag from href (#website → website)
      const targetTag = this.getAttribute('href').replace('#', '');

      // filter posts
      scrapItems.forEach(item => {
        const itemTags = item.dataset.tags || '';

        if (targetTag === 'all') {
          item.style.display = 'block';
        } else if (itemTags.includes(targetTag)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});

document.querySelectorAll('.recent-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const anchor = link.dataset.postAnchor;

    switchTab('#scrapbook');
    window.location.hash = '#scrapbook';

    showAllScrapbookItems();

    document.querySelector('.profile').style.display = 'none';
    document.querySelector('.scrapbook-folders').style.display = 'block';

    setTimeout(() => {
      const target = document.getElementById(anchor);
      if (!target) { console.warn('anchor not found:', anchor); return; }
      const container = document.querySelector('.scrapbook-container');
      const targetOffsetTop = target.offsetTop;
      container.scrollTop = targetOffsetTop - (container.clientHeight / 2) + (target.offsetHeight / 2);
    }, 50);
  });
});