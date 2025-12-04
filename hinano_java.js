const PAGE_SIZE = 10;
let currentPage = 1;
let sortOrder = "desc"; // default: newest first
// Manual list of Hinano blog posts
const posts = [
  {
    title: "意図せず",
    date: "2025-07-02",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103579"
  },
  {
    title: "終わってから分かっても遅いのにな",
    date: "2025-09-20",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103842"
  },
  {
    title: "甘雨",
    date: "2025-11-20",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/104125"
  },
  {
    title: "トリガー",
    date: "2025-11-13",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/104062"
  },
  {
    title: "𝗛𝗔𝗣𝗣𝗬 𝗛𝗔𝗟𝗟𝗢𝗪𝗘𝗘𝗡 👻",
    date: "2025-10-30",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103981"
  },
  {
    title: "初ソログラビア写真館です！",
    date: "2025-10-28",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103973"
  },
  {
    title: "こんばんは🌛",
    date: "2025-10-20",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103947"
  },
  {
    title: "とっとと",
    date: "2025-10-16",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103926"
  },
  {
    title: "1言って10わからない",
    date: "2025-10-04",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103892"
  },
  {
    title: "ぴーすぴーすっ！",
    date: "2025-10-02",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103883"
  },
  {
    title: "🆕自己紹介",
    date: "2025-10.01",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103872"
  },
  {
    title: "春夏夏夏ｱｷｯ冬冬",
    date: "2025-09-30",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103869"
  },
  {
    title: "簡単じゃない",
    date: "2025-09-10",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103814"
  },
  {
    title: "同じくらい浸ってくれていますよに",
    date: "2025-08-31",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103783"
  },
  {
    title: "まだ8月？信じられない、8月かと思った",
    date: "2025-08-21",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103760"
  },
  {
    title: "今のところは",
    date: "2025-08-11",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103738"
  },
  {
    title: "乃木坂46がくれたもの",
    date: "2025-08-01",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103718"
  },
  {
    title: "原点回帰の予感",
    date: "2025-07-22",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103691"
  },
  {
    title: "強くなれない",
    date: "2025-07-12",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103603"
  },
  {
    title: "急にアイスが食べたい真夏日",
    date: "2025-06-22",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103553"
  },
  {
    title: "わー！ちがうんです！",
    date: "2025-06-12",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103518"
  },
  {
    title: "日曜の夜は苦手",
    date: "2025-06-02",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103487"
  },
  {
    title: "笑顔が好きなら",
    date: "2025-05-22",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103462"
  },
  {
    title: "劣等感でできてるから",
    date: "2025-05-12",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103430"
  },
  {
    title: "そばかす🥕",
    date: "2025-05-02",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103391"
  },
  {
    title: "君を好きになった、それだけのことでも",
    date: "2025-04-19",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103370"
  },
  {
    title: "こんばんは(はじめまして！)",
    date: "2025-04-08",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/103334"
  },
  {
    title: "ふと思い返すもの",
    date: "2025-12-01",
    url: "https://www.nogizaka46.com/s/n46/diary/detail/104141"
  }
];

function sortPosts() {
  posts.sort((a, b) => {
    const da = new Date(a.date);
    const db = new Date(b.date);
    return sortOrder === "asc" ? da - db : db - da;
  });
}

function renderPage(page) {
  const listEl = document.getElementById("blog-list");
  const paginationTopEl = document.getElementById("pagination-top");
  const paginationBottomEl = document.getElementById("pagination");

  sortPosts();

  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;
  currentPage = page;

  listEl.innerHTML = "";

  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pagePosts = posts.slice(start, end);

  pagePosts.forEach(post => {
    const item = document.createElement("div");
    item.className = "post-item";
    item.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.date}</p>
      <a href="${post.url}" target="_blank">去官方睇</a>
    `;
    listEl.appendChild(item);
  });

  function renderPagination(container) {
    container.innerHTML = "";

    const info = document.createElement("span");
    info.textContent = `Page ${currentPage} / ${totalPages}`;
    container.appendChild(info);

    if (currentPage > 1) {
      const prevBtn = document.createElement("button");
      prevBtn.textContent = "上一頁";
      prevBtn.onclick = () => renderPage(currentPage - 1);
      container.appendChild(prevBtn);
    }

    if (currentPage < totalPages) {
      const nextBtn = document.createElement("button");
      nextBtn.textContent = "下一頁";
      nextBtn.onclick = () => renderPage(currentPage + 1);
      container.appendChild(nextBtn);
    }
  }

  renderPagination(paginationTopEl);
  renderPagination(paginationBottomEl);
}

// handle change of sort order
const sortSelect = document.getElementById("sort-order");
sortSelect.addEventListener("change", () => {
  sortOrder = sortSelect.value;   // "asc" or "desc"
  renderPage(1);                  // go back to page 1 with new order
});

// Render posts into the page
const listEl = document.getElementById("blog-list");

posts.forEach(post => {
  const item = document.createElement("div");
  item.className = "post-item";
  item.innerHTML = `
    <h2>${post.title}</h2>
    <p>${post.date}</p>
    <a href="${post.url}" target="_blank">去官方睇</a>
  `;
  listEl.appendChild(item);
});
renderPage(1);
