# وابستگی های سایت به مجموعه «برتر سرویس»

تاریخ بررسی: ۸ مهر ۱۴۰۵ (2026-09-30)

به گفته مدیر سایت، «کجا هست» هنوز شماره تماس، آدرس و شبکه اجتماعی رسمی ندارد و شماره `02191300348` و آدرس «تهران، خیابان مطهری، خیابان قائم مقام فراهانی، پلاک ۱۵۸» متعلق به سایت نیست (این اطلاعات برتر سرویس است). این سند همه جاهایی را فهرست می کند که سایت را به برتر سرویس و سایت های اقماری آن وصل می کند.

## ۱. اطلاعات هویتی خود سایت — حذف شد

| مورد | محل | وضعیت |
|---|---|---|
| تلفن `02191300348` و `۰۲۱-۹۱۳۰۰۳۴۸` | `src/data/site.ts` (`phone`، `phoneDisplay`) | حذف شد |
| آدرس پلاک ۱۵۸ قائم مقام فراهانی | `site.ts` (`address`) | حذف شد |
| ساعت کاری «شنبه تا پنجشنبه ۹ تا ۱۸» | `site.ts` (`hours`) | حذف شد |
| نوار ثابت «مشاوره رایگان انتخاب تعمیرگاه» با شماره برتر سرویس (پایین صفحه موبایل) | `Header.astro` | حذف شد (همراه فاصله پایین صفحه در `global.css`) |
| تلفن، ساعت و آدرس در فوتر | `Footer.astro` | حذف شد؛ فقط ایمیل ماند |
| کارت های تلفن، ساعت پاسخگویی و آدرس | صفحه تماس | حذف شد؛ فقط ایمیل و فرم ماند |
| باکس «نمی دانید کدام مرکز مناسب شماست؟» با دکمه تماس | سایدبار همه مقالات | حذف شد |
| `telephone` و `address` در اسکیمای Organization | `src/lib/schema.ts` | حذف شد (گوگل دیگر این شماره و آدرس را به نام «کجا هست» نمی شناسد) |
| «با شماره پشتیبانی تماس بگیرید» | FAQ صفحه اصلی | به «از صفحه تماس پیام بفرستید» تغییر کرد |
| «نقاط ضعف همه مراکز، از جمله همکارانمان» | صفحه درباره | «همکارانمان» حذف شد |
| شبکه های اجتماعی (`SITE.socials`) | `site.ts` | از قبل خالی بود؛ چیزی نمایش داده نمی شد |

## ۲. نیازمند تصمیم مدیر سایت

- **ایمیل:** `support@kojahast.ir` مال سایت نبود و با ایمیل رسمی `info@kojahast.com` جایگزین شد (فوتر، صفحه تماس، فرم تماس، اسکیمای Organization).
- **`src/components/FaqSection.astro`:** از قالب قبلی مانده و با زبان یک تعمیرگاه نوشته شده («دستگاه را به مراکز ما ارسال کنند»، «ما پس از تعمیر تست ها را انجام می دهیم»). در هیچ صفحه ای استفاده نمی شود (در فهرست فایل های بلااستفاده [seo-audit.md](seo-audit.md) هم هست)، ولی در مخزن باقی است. پیشنهاد: حذف.
- **`docs/data-verification.md`:** بخشی با عنوان «مراکز همکار / برتر سرویس» دارد و می گوید اطلاعات «مراکز همکار» دست نخورده حفظ شده است. سند داخلی است و روی سایت نمایش داده نمی شود.

## ۳. مراکز برتر سرویس در مقالات (به عنوان یک مرکز معرفی شده)

این ها صریحاً برتر سرویس هستند (نام، اینستاگرام `bartar_repairer`، سایت `bartar-repairer.com` یا تلفن `02191300348` / `02122129170`). **حذف نشدند**؛ تصمیم با مدیر سایت است. نکته: در بیشتر مقالات **در جایگاه اول** لیست آمده اند.

| مقاله | جایگاه در لیست | نام مرکز | سایت (در frontmatter، نمایش داده نمی شود) |
|---|---|---|---|
| `acer-laptop-repair-center` | 1 از 10 | مرکز تعمیرات برتر سرویس | bartar-repairer.com/lap-top-acer |
| `airpods-repair-tehran` | 1 از 9 | اپل سرویس (مجموعه برتر سرویس) | apple-servise.ir |
| `apple-watch-repair-tehran` | 1 از 9 | اپل سرویس (مجموعه برتر سرویس) | bartar-repairer.com/apple/apple-watch |
| `asus-laptop-repair-center-in-tehran` | 1 از 14 | مرکز تعمیرات برتر سرویس | bartar-repairer.com/asus |
| `dell-laptop-repair-centers-in-tehran` | 1 از 11 | مرکز تعمیرات برتر سرویس | bartar-repairer.com/dell/lap-top |
| `hp-laptop-repair-in-tehran` | 1 از 11 | مرکز تعمیرات برتر سرویس | bartar-repairer.com/hp/lap-top |
| `huawei-mobile-repair-centers-in-tehran` | 1 از 10 | مرکز تعمیرات برتر سرویس | bartar-repairer.com/huawei/mobile |
| `ipad-repair-tehran` | 1 از 10 | اپل سرویس (مجموعه برتر سرویس) | bartar-repairer.com/apple/ipad |
| `mobile-repair-tehran` | 16 از 16 | برتر سرویس | bartar-repairer.com |
| `nokia-mobile-repair-tehran` | 2 از 7 | برتر سرویس | bartar-repairer.com |
| `oneplus-mobile-repair-tehran` | 4 از 8 | برتر سرویس | bartar-repairer.com/services/category-mobile-phone-repair/oneplus-phone-repair |
| `realme-mobile-repair-tehran` | 1 از 9 | برتر سرویس (بخش ریلمی) | bartar-repairer.com/services/category-mobile-phone-repair/realme-phone-repair |
| `samsung-mobile-repair-tehran` | 2 از 13 | مجموعه تخصصی برتر سرویس | bartar-repairer.com/samsung/mobile |
| `sony-laptop-repair-centers` | 1 از 9 | نمایندگی لپ تاپ سونی وایو (برتر سرویس) | bartar-repairer.com/sony/lap-top |
| `surface-repair-in-tehran` | 1 از 10 | برتر سرویس (نمایندگی تعمیر سرفیس مایکروسافت) | bartar-repairer.com/services/laptop-repair/surface-laptop-repair |
| `xiaomi-mobile-repair-in-tehran` | 2 از 12 | برتر سرویس | bartar-repairer.com/xiaomi/mobile |

## ۴. سایت های اقماری سعادت آباد (مجتمع کسری، میدان کاج)

سایت های تک برندی با یک آدرس مشترک (سعادت آباد، میدان کاج، کوچه دوازدهم علی اکبر، پلاک ۳۰، مجتمع اداری کسری) و موبایل/واتس اپ مشترک `09046972370` که همان واتس اپ برتر سرویس در چند مقاله است؛ دو مورد (شیائومی و سامسونگ) تلفن `02191300348` را هم دارند. یعنی به احتمال زیاد شعبه یا سایت های فرعی برتر سرویس اند. بیشترشان **جایگاه اول یا دوم** لیست را دارند.

| مقاله | جایگاه در لیست | نام مرکز | سایت (در frontmatter، نمایش داده نمی شود) |
|---|---|---|---|
| `acer-laptop-repair-center` | 2 از 10 | تعمیرگاه ایسر (سعادت آباد) | www.acer-services.org |
| `asus-laptop-repair-center-in-tehran` | 2 از 14 | تعمیرگاه ایسوس (سعادت آباد) | asus-services.com |
| `dell-laptop-repair-centers-in-tehran` | 2 از 11 | مرکز تخصصی تعمیر لپ تاپ دل (سعادت آباد) | dell-services.ir |
| `hp-laptop-repair-in-tehran` | 2 از 11 | نمایندگی تعمیر لپ تاپ اچ پی (سعادت آباد) | hp-services.org |
| `huawei-mobile-repair-centers-in-tehran` | 2 از 10 | نمایندگی هواوی ریپر | huawei-repairer.ir |
| `samsung-mobile-repair-tehran` | 1 از 13 | نمایندگی تعمیرات گوشی سامسونگ (سعادت آباد) | samsung-repairer.ir |
| `xiaomi-mobile-repair-in-tehran` | 1 از 12 | نمایندگی تعمیر شیائومی (سعادت آباد) | xiaomi-repair.ir |

## ۵. شبکه واحد ۸۰۹۳ مجتمع نور («پین سنتر» / «پین تک»)

سایت های تک برندی با تلفن های مشترک `0218822870x` و موبایل `09124587015`. در مقاله سونی، مرکزی با همین آدرس (مجتمع نور، واحد ۸۰۹۳) با نام «برتر سرویس» و تلفن `02191300348` ثبت شده و در مقاله سرفیس، شناسه `pincenter` به برتر سرویس داده شده است. پس **احتمال ارتباط با برتر سرویس بالاست ولی قطعی نیست**؛ تلفنی تأیید شود.

| مقاله | جایگاه در لیست | نام مرکز | سایت (در frontmatter، نمایش داده نمی شود) |
|---|---|---|---|
| `acer-laptop-repair-center` | 4 از 10 | نمایندگی تعمیرات لپ تاپ ایسر (پین تک) | acer-repair.ir |
| `asus-laptop-repair-center-in-tehran` | 3 از 14 | نمایندگی ایسوس تهران (پین سنتر) | asus-repair.ir |
| `dell-laptop-repair-centers-in-tehran` | 6 از 11 | مرکز تخصصی دل (مجتمع نور) | dell-repair.ir |
| `hp-laptop-repair-in-tehran` | 3 از 11 | نمایندگی اچ پی در تهران (hp-repair) | hp-repair.ir |
| `lenovo-laptop-repair-centers-in-tehran` | 1 از 10 | نمایندگی تعمیرات تخصصی لنوو تک | lenovo-tech.ir |
| `macbook-repair-in-tehran` | 1 از 13 | نمایندگی تعمیر مک بوک (پین تک) | macbook-repair.ir |
| `surface-repair-in-tehran` | 9 از 10 | مرکز سرویس سرفیس مجتمع نور (پین سنتر) | microsoft-surface.ir |
| `xiaomi-mobile-repair-in-tehran` | 7 از 12 | تعمیرات شیائومی در مجتمع نور | mi-repair.ir |

## ۶. شواهد دیگر

- مختصات `lat`/`lng` برتر سرویس (قائم مقام فراهانی) در چند مقاله ثبت شده؛ در مقاله سونی همین مختصات کنار آدرس مجتمع نور آمده که با هم نمی خوانند (در [data-verification.md](data-verification.md) هم ذکر شده).
- مرکز برتر سرویس در مقالات ریلمی و وان پلاس خود را «نمایندگی رسمی» معرفی می کند؛ در متن تکرار نشده.

## تصمیم مدیر سایت (۸ مهر ۱۴۰۵)

- ایمیل رسمی: `info@kojahast.com` (اعمال شد).
- مراکز بخش های ۳ تا ۵ **در مقالات فعلی می مانند.**
- برای مقالات جدید: مراکز باید با تحقیق واقعی برای همان موضوع پیدا شوند، نه با برداشتن از مراکز موجود سایت. لوکیشن و نقشه از گوگل مپ یا سایت های رقیب. قاعده کامل: [content-guidelines.md](content-guidelines.md#۶-منبع-مراکز-و-لوکیشن-در-مقالات-جدید) و `CLAUDE.md`.
- `FaqSection.astro` هنوز در مخزن است (بلااستفاده).
