
// Radio/BGM Player Functionality
const bgmAudio = document.getElementById('bgm-audio');
const playBtn = document.getElementById('play-radio');
const pauseBtn = document.getElementById('pause-radio');

playBtn.addEventListener('click', () => {
    bgmAudio.play();
});

pauseBtn.addEventListener('click', () => {
    bgmAudio.pause();
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

async function loadGuestbook() {
  const apiKey = "AIzaSyCkUY3R7BYVeJ9rHbHClHbxwER3GLQB0dU";
  const sheetId = "1hoxK7zD4tEHAvJbF3VT-M-eEjcOe02YXSYjJ9vcyl7U";
  const sheetName = "Form Responses 1";

  try {
    const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`);
    console.log("Response status:", res.status);
    const data = await res.json();
    const rows = data.values;
    const container = document.getElementById("guestbook-messages");
    
    container.innerHTML = "";

    // Show NEWEST first
    for (let i = 1; i < rows.length; i++) {
      const timestamp = rows[i][0];
      const name = rows[i][2];
      const message = rows[i][3];
      const emoji = rows[i][4];

      const entry = document.createElement("div");
      entry.className = "gb-entry";

      const displayEmoji = emoji && emoji.trim() !== "" ? emoji : "*";

        const authorSpan = document.createElement("span");
        authorSpan.className = "gb-author";
        authorSpan.textContent = displayEmoji + " " + name;

      const timeSpan = document.createElement("span");
      timeSpan.className = "gb-time";
      timeSpan.textContent = "[" + timestamp + "]";

      const msgPara = document.createElement("p");
      msgPara.textContent = message;
    
      entry.appendChild(authorSpan);
      entry.appendChild(document.createTextNode(" "));
      entry.appendChild(timeSpan);
      entry.appendChild(msgPara);

      container.appendChild(entry);
    }

  } catch (err) {
    console.error("Load error:", err);
    document.getElementById("guestbook-messages").innerText = "Failed to load messages.";
  }
}

document.addEventListener("DOMContentLoaded", loadGuestbook);

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('gb-form');
  const messageInput = document.getElementById('message-input');

  form?.addEventListener('submit', () => {
    setTimeout(() => {
        loadGuestbook();
        const container = document.getElementById("guestbook-messages");
        container.scrollTop = container.scrollHeight;
        messageInput.value = '';
    }, 1500);
    });
});

document.getElementById('emoji-select').addEventListener('change', function() {
  document.getElementById('emoji-input').value = this.value;
});

// left sidebar scrapbook folders
const tabs = document.querySelectorAll('.tab');
const profile = document.querySelector('.profile');
const folders = document.querySelector('.scrapbook-folders');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab.getAttribute('href') === '#scrapbook') {
      profile.style.display = 'none';
      folders.style.display = 'block';
    } else {
      profile.style.display = 'block';
      folders.style.display = 'none';
    }
  });
});

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