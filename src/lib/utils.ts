import { SITE } from "../data/site";

/** تبدیل ارقام انگلیسی به فارسی */
export const fa = (v: string | number) => String(v).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

/** آدرس مطلق */
export const abs = (path: string) => (path.startsWith("http") ? path : new URL(path, SITE.url).href);

export const postUrl = (slug: string) => `/blog/${slug}/`;
export const categoryUrl = (slug: string) => `/blog/category/${slug}/`;

/** تاریخ شمسی خوانا */
export function jalali(iso?: string, opts: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", { ...opts, timeZone: "Asia/Tehran" }).format(d);
}

/** سال شمسی (برای عنوان هایی مثل «آپدیت ۱۴۰۵») */
export const jalaliYear = (iso?: string) => jalali(iso ?? new Date().toISOString(), { year: "numeric" });

/** نمایش شماره تلفن: 02191300348 → ۰۲۱-۹۱۳۰۰۳۴۸ */
export function phoneDisplay(p: string) {
  const s = p.replace(/[^\d+]/g, "");
  let out = s;
  if (/^021\d{8}$/.test(s)) out = `${s.slice(0, 3)}-${s.slice(3)}`;
  else if (/^09\d{9}$/.test(s)) out = `${s.slice(0, 4)}-${s.slice(4, 7)}-${s.slice(7)}`;
  return fa(out);
}
export const telHref = (p: string) => `tel:${p.replace(/[^\d+]/g, "")}`;

/** شماره بین المللی برای اسکیما: 021… → +9821… */
export function phoneIntl(p: string) {
  const s = p.replace(/[^\d+]/g, "");
  if (s.startsWith("+")) return s;
  if (s.startsWith("0")) return `+98${s.slice(1)}`;
  if (s.length === 8) return `+9821${s}`; // شماره ۸ رقمی تهران بدون پیش شماره
  return s; // شماره های کوتاه مثل ۱۴۴۵
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * مارک داون درون خطی ساده برای رشته های frontmatter:
 * [متن](/blog/x/) و **پررنگ**. لینک خارجی nofollow می شود.
 */
export function inlineMd(s: string) {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text, href) => {
      const external = /^https?:\/\//.test(href) && !href.startsWith(SITE.url);
      if (external && !SITE.showWebsites) return text; // لینک سایت های خارجی بدون اجازه منتشر نمی شود
      return external
        ? `<a href="${href}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`
        : `<a href="${href}">${text}</a>`;
    });
}

/** متن ساده بدون مارک داون (برای اسکیما و متا) */
export const plain = (s: string) => s.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/\*\*/g, "");

export const countWords = (s: string) => (s.match(/[\p{L}\p{N}]+/gu) || []).length;

/** زمان مطالعه تقریبی (۲۰۰ کلمه در دقیقه) */
export const readingMinutes = (words: number) => Math.max(2, Math.round(words / 200));

export function instagramUrl(handle: string) {
  return `https://www.instagram.com/${handle.replace(/^@/, "").replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace(/\/$/, "")}/`;
}
export function telegramUrl(handle: string) {
  return `https://t.me/${handle.replace(/^@/, "").replace(/^https?:\/\/t\.me\//, "")}`;
}
export function whatsappUrl(num: string) {
  const s = num.replace(/[^\d]/g, "");
  return `https://wa.me/${s.startsWith("0") ? "98" + s.slice(1) : s}`;
}
export const hostOf = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};
