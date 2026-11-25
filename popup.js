"use strict";

const read = document.getElementById("read");
const status = document.getElementById("status");
const result = document.getElementById("result");
const key = document.getElementById("key");
const toggle = document.getElementById("toggle");
const copy = document.getElementById("copy");
let revision = 0;

function message(text, error = false) {
  status.textContent = text;
  status.dataset.error = String(error);
}

function clearKey() {
  revision += 1;
  key.value = "";
  key.type = "password";
  toggle.textContent = "显示";
  toggle.setAttribute("aria-pressed", "false");
  result.hidden = true;
}

read.addEventListener("click", async () => {
  clearKey();
  read.disabled = true;
  message("正在读取…");
  try {
    const cookie = await chrome.cookies.get({
      url: "https://claude.ai/",
      name: "sessionKey"
    });
    if (!cookie?.value) {
      message("未找到 sessionKey。请先登录 Claude，再点击读取。", true);
      return;
    }
    key.value = cookie.value;
    result.hidden = false;
    message("已读取本地 Cookie。登录是否仍有效需在 Claude 中确认。");
  } catch {
    message("读取失败。请在扩展详情中允许访问 claude.ai，然后重试。", true);
  } finally {
    read.disabled = false;
  }
});

toggle.addEventListener("click", () => {
  const visible = key.type === "password";
  key.type = visible ? "text" : "password";
  toggle.textContent = visible ? "隐藏" : "显示";
  toggle.setAttribute("aria-pressed", String(visible));
});

copy.addEventListener("click", async () => {
  if (!key.value) return;
  const currentRevision = revision;
  try {
    await navigator.clipboard.writeText(key.value);
    if (currentRevision === revision) message("已复制到剪贴板。");
  } catch {
    if (currentRevision === revision) message("复制失败。可点击显示后选中密钥手动复制。", true);
  }
});

document.getElementById("clear").addEventListener("click", () => {
  clearKey();
  message("已清除弹窗中的密钥。系统剪贴板内容不受影响。");
});
