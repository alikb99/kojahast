# تصاویر مقالات

از ۱۶ مهر ۱۴۰۵ تصویر همه مقالات از **Unsplash** است ([content-guidelines.md](content-guidelines.md#۷-تصویر-مقالات)). هر مقاله تصویر اختصاصی خودش را دارد و هیچ تصویری در دو مقاله تکرار نشده است.

## مشخصات فنی

- مسیر: `public/images/posts/<slug>.webp` (نام فایل همان اسلاگ مقاله)
- اندازه: ۱۲۰۰ در ۶۹۰ پیکسل (هم نسبت تصویر بالای مقاله ۸۰۰ در ۴۶۰، هم مناسب پیش نمایش شبکه های اجتماعی)، webp با کیفیت ۷۸؛ حجم هر فایل ۸ تا ۱۰۶ کیلوبایت
- فقط عکس های رایگان Unsplash (نه Unsplash+)؛ مجوز Unsplash استفاده تجاری بدون ذکر نام را مجاز می داند، ولی نام عکاس برای پیگیری اینجا ثبت می شود
- `imageAlt` هر مقاله با کلمه کلیدی و توصیف واقعی عکس بازنویسی شد

## روش (برای مقالات بعدی)

دسترسی مستقیم به unsplash.com از ایران فیلتر است و صفحه های جستجوی آن به آی پی دیتاسنتر پاسخ نمی دهند. روش کار در این جلسه:

1. جستجو با `https://unsplash.com/napi/search/photos?query=...&orientation=landscape` از طریق پراکسی محلی (VPN روی پورت ۱۰۸۰۸) و کلاینت `curl_cffi` با `impersonate="chrome"`؛ عکس های `premium` و `plus` کنار گذاشته شدند
2. ساخت برگه پیش نمایش از ۱۲ نامزد هر موضوع و انتخاب چشمی عکسی که واقعاً به موضوع می خورد
3. دانلود از `images.unsplash.com` با `w=1200&h=690&fit=crop` و تبدیل به webp با Pillow
4. چک تکراری نبودن شناسه عکس در کل سایت

## فهرست تصاویر

| مقاله | فایل | عکس Unsplash | عکاس |
|---|---|---|---|
| `acer-laptop-repair-center` | `posts/acer-laptop-repair-center.webp` | [uYDXcEv8Cs4](https://unsplash.com/photos/uYDXcEv8Cs4) | Kompjuteri Com |
| `airpods-repair-tehran` | `posts/airpods-repair-tehran.webp` | [AgLMrojqjAM](https://unsplash.com/photos/AgLMrojqjAM) | Daniel Romero |
| `apple-watch-repair-tehran` | `posts/apple-watch-repair-tehran.webp` | [2wFoa040m8g](https://unsplash.com/photos/2wFoa040m8g) | Simon Daoudi |
| `asus-laptop-repair-center-in-tehran` | `posts/asus-laptop-repair-center-in-tehran.webp` | [Saj5h85DbOs](https://unsplash.com/photos/Saj5h85DbOs) | Kompjuteri Com |
| `computer-repair-tehran` | `posts/computer-repair-tehran.webp` | [sMKUYIasyDM](https://unsplash.com/photos/sMKUYIasyDM) | JESHOOTS.COM |
| `data-recovery-tehran` | `posts/data-recovery-tehran.webp` | [_zIq5WCzfHE](https://unsplash.com/photos/_zIq5WCzfHE) | William Warby |
| `dell-laptop-repair-centers-in-tehran` | `posts/dell-laptop-repair-centers-in-tehran.webp` | [0uVSMGdeUKM](https://unsplash.com/photos/0uVSMGdeUKM) | Its me Pravin |
| `game-console-repair-tehran` | `posts/game-console-repair-tehran.webp` | [NVD_32BBZFE](https://unsplash.com/photos/NVD_32BBZFE) | Kerde Severin |
| `hp-laptop-repair-in-tehran` | `posts/hp-laptop-repair-in-tehran.webp` | [qmcTZZ7XhqY](https://unsplash.com/photos/qmcTZZ7XhqY) | Andrey Matveev |
| `huawei-mobile-repair-centers-in-tehran` | `posts/huawei-mobile-repair-centers-in-tehran.webp` | [-JUfltUcMG8](https://unsplash.com/photos/-JUfltUcMG8) | Kamil Kot |
| `ipad-repair-tehran` | `posts/ipad-repair-tehran.webp` | [LJypKPEBt4I](https://unsplash.com/photos/LJypKPEBt4I) | Leon Seibert |
| `iphone-repairs-tehran` | `posts/iphone-repairs-tehran.webp` | [y2QUqmEzjzA](https://unsplash.com/photos/y2QUqmEzjzA) | Vitalijus |
| `laptop-repair-in-tehran` | `posts/laptop-repair-in-tehran.webp` | [KhnRiIAgvsI](https://unsplash.com/photos/KhnRiIAgvsI) | Revendo |
| `laptop-repair-west-tehran` | `posts/laptop-repair-west-tehran.webp` | [xoOW8cvsWIo](https://unsplash.com/photos/xoOW8cvsWIo) | Vishnu Mohanan |
| `lenovo-laptop-repair-centers-in-tehran` | `posts/lenovo-laptop-repair-centers-in-tehran.webp` | [EOB6SlufEFc](https://unsplash.com/photos/EOB6SlufEFc) | Pranjall Kumar |
| `macbook-repair-in-tehran` | `posts/macbook-repair-in-tehran.webp` | [tpuAo8gVs58](https://unsplash.com/photos/tpuAo8gVs58) | James McKinven |
| `mobile-repair-tehran` | `posts/mobile-repair-tehran.webp` | [IpTPp_aPbYE](https://unsplash.com/photos/IpTPp_aPbYE) | ThisisEngineering |
| `nokia-mobile-repair-tehran` | `posts/nokia-mobile-repair-tehran.webp` | [F5V6d7nPsLQ](https://unsplash.com/photos/F5V6d7nPsLQ) | Isaac Smith |
| `oneplus-mobile-repair-tehran` | `posts/oneplus-mobile-repair-tehran.webp` | [j44CS0Rwx6g](https://unsplash.com/photos/j44CS0Rwx6g) | Boran Kleinlugtenbeld |
| `printer-repair-tehran` | `posts/printer-repair-tehran.webp` | [5AoOejjRUrA](https://unsplash.com/photos/5AoOejjRUrA) | Mahrous Houses |
| `realme-mobile-repair-tehran` | `posts/realme-mobile-repair-tehran.webp` | [cS8zw28b2s4](https://unsplash.com/photos/cS8zw28b2s4) | Andrey Matveev |
| `samsung-mobile-repair-tehran` | `posts/samsung-mobile-repair-tehran.webp` | [H8-mb0OBx6s](https://unsplash.com/photos/H8-mb0OBx6s) | Evgeny Opanasenko |
| `smartwatch-repair-tehran` | `posts/smartwatch-repair-tehran.webp` | [COvwQWG2XMc](https://unsplash.com/photos/COvwQWG2XMc) | Daniel Romero |
| `sony-laptop-repair-centers` | `posts/sony-laptop-repair-centers.webp` | [5NE6xo4g2y8](https://unsplash.com/photos/5NE6xo4g2y8) | 85mm.ca |
| `surface-repair-in-tehran` | `posts/surface-repair-in-tehran.webp` | [6U9oaiiwOXQ](https://unsplash.com/photos/6U9oaiiwOXQ) | Przemyslaw Marczynski |
| `xiaomi-mobile-repair-in-tehran` | `posts/xiaomi-mobile-repair-in-tehran.webp` | [LeFwBk1VNAM](https://unsplash.com/photos/LeFwBk1VNAM) | Li Yan |

## تصاویر قدیمی

فایل های قبلی در `public/images/` حذف نشدند. `best-mobile-phone-repairs-in-tehran.webp` (تصویر پیش فرض `site.ts` و هیرو صفحه اصلی) و `laptop-repair-center.webp` (صفحه اصلی) هنوز استفاده می شوند. بقیه دیگر در مقالات به کار نمی روند و می شود بعداً پاکشان کرد.
