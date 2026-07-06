
// Radio/BGM Player Functionality
const bgmAudio = document.getElementById('bgm-audio');
const playBtn = document.getElementById('play-radio');
const pauseBtn = document.getElementById('pause-radio');
const nextBtn = document.getElementById('next-radio');
const radioLink = document.getElementById('radio-link');
let currentStation = 0;

const stations = [
  { name: "NTS Radio", url: "https://stream-relay-geo.ntslive.net/stream", href: "https://nts.live/" },
  { name: "Nightwave Plaza Radio", url: "https://radio.plaza.one/mp3", href: "https://plaza.one/" },
  { name: "Radio Alhara — راديو الحارة", url: "https://stream.radiojar.com/78cxy6wkxtzuv", href: "https://radioalhara.net/" },
];

function loadStation(index) {
  const station = stations[index] || stations[0];
  if (!bgmAudio || !radioLink || !station) return;
  bgmAudio.src = station.url;
  bgmAudio.load();
  radioLink.textContent = station.name;
  radioLink.href = station.href;
}

async function startPlayback() {
  if (!bgmAudio) return;
  try {
    loadStation(currentStation);
    await bgmAudio.play();
  } catch (err) {
    console.warn('Radio playback failed:', err);
  }
}

if (playBtn) {
  playBtn.addEventListener('click', startPlayback);
}

if (pauseBtn) {
  pauseBtn.addEventListener('click', () => bgmAudio?.pause());
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    currentStation = (currentStation + 1) % stations.length;
    loadStation(currentStation);
    startPlayback();
  });
}

loadStation(currentStation);




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