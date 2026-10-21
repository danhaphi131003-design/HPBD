
"use strict";

// ============================================
// 1. CÀI ĐẶT SINH NHẬT
// ============================================

// Đổi ngày và tháng theo sinh nhật của người yêu.
// Ví dụ: sinh nhật ngày 15 tháng 12 thì dùng:
// const BIRTHDAY_DAY = 15;
// const BIRTHDAY_MONTH = 12;

const BIRTHDAY_DAY = 11;
const BIRTHDAY_MONTH = 11;

// ============================================
// 2. ĐẾM NGƯỢC SINH NHẬT
// ============================================

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const countdownMessage = document.getElementById("countdownMessage");

function getNextBirthday() {
  const now = new Date();
  const year = now.getFullYear();

  // Lấy sinh nhật năm nay theo giờ địa phương.
  let birthday = new Date(
    year,
    BIRTHDAY_MONTH - 1,
    BIRTHDAY_DAY,
    0, 0, 0
  );

  // Nếu sinh nhật năm nay đã qua, chuyển sang năm sau.
  if (now >= birthday) {
    birthday = new Date(
      year + 1,
      BIRTHDAY_MONTH - 1,
      BIRTHDAY_DAY,
      0, 0, 0
    );
  }

  return birthday;
}

function updateCountdown() {
  const now = new Date();
  const birthday = getNextBirthday();

  let remaining = birthday.getTime() - now.getTime();

  if (remaining < 0) {
    remaining = 0;
  }

  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");

  const todayIsBirthday =
    now.getDate() === BIRTHDAY_DAY &&
    now.getMonth() === BIRTHDAY_MONTH - 1;

  if (todayIsBirthday) {
    countdownMessage.textContent =
      "Hôm nay là ngày của em! Chúc mừng sinh nhật, em yêu! 🎂💗";
  } else {
    countdownMessage.textContent =
      "Anh đang mong chờ ngày đặc biệt của em. 🌷";
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ============================================
// 3. MỞ VÀ ĐÓNG LÁ THƯ
// ============================================

const openLetterBtn = document.getElementById("openLetterBtn");
const loveLetter = document.getElementById("loveLetter");

openLetterBtn.addEventListener("click", () => {
  const isOpen = openLetterBtn.classList.toggle("open");

  loveLetter.hidden = !isOpen;
  openLetterBtn.setAttribute("aria-expanded", String(isOpen));

  if (isOpen) {
    openLetterBtn.setAttribute("aria-label", "Đóng lá thư");
    createHearts(20);

    // Cuộn tới lá thư để người nhận dễ đọc.
    setTimeout(() => {
      loveLetter.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 150);
  } else {
    openLetterBtn.setAttribute("aria-label", "Mở lá thư");
  }
});

// ============================================
// 4. TRÁI TIM VÀ CÁNH HOA BAY
// ============================================

const petalLayer = document.getElementById("petalLayer");
const decorations = ["💗", "💕", "🌸", "🌷", "♡"];

function createHearts(amount = 8) {
  for (let i = 0; i < amount; i++) {
    const petal = document.createElement("span");

    petal.className = "petal";
    petal.textContent =
      decorations[Math.floor(Math.random() * decorations.length)];

    petal.style.left = Math.random() * 100 + "%";
    petal.style.fontSize = 14 + Math.random() * 16 + "px";
    petal.style.animationDuration = 4 + Math.random() * 4 + "s";

    petalLayer.appendChild(petal);

    petal.addEventListener("animationend", () => {
      petal.remove();
    }, { once: true });

    // Dự phòng nếu animationend không được kích hoạt.
    setTimeout(() => petal.remove(), 9000);
  }
}

// Thả một vài trái tim theo chu kỳ.
setInterval(() => {
  if (Math.random() > 0.4) {
    createHearts(1);
  }
}, 1800);

// ============================================
// 5. NHẠC NỀN BẬT / TẮT
// ============================================

const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

bgMusic.volume = 0.35;

musicBtn.addEventListener("click", async () => {
  if (bgMusic.paused) {
    try {
      await bgMusic.play();
      musicBtn.textContent = "♫ Tắt nhạc";
    } catch (error) {
      musicBtn.textContent = "Không phát được nhạc";
      console.error("Không thể phát nhạc:", error);
    }
  } else {
    bgMusic.pause();
    musicBtn.textContent = "♫ Bật nhạc";
  }
});

// ============================================
// 6. HIỂN THỊ ẢNH KỶ NIỆM
// ============================================

document.querySelectorAll(".photo-frame").forEach((frame) => {
  const img = frame.querySelector("img");
  const fallback = frame.querySelector(".photo-fallback");

  function showPhoto() {
    fallback.hidden = true;
    img.style.display = "block";
  }

  function showPlaceholder() {
    img.style.display = "none";
    fallback.hidden = false;
  }

  img.addEventListener("load", showPhoto);
  img.addEventListener("error", showPlaceholder);

  // Xử lý trường hợp ảnh đã được tải trước khi gắn sự kiện.
  if (img.complete) {
    if (img.naturalWidth > 0) {
      showPhoto();
    } else {
      showPlaceholder();
    }
  }
});
