/**
 * تنظیمات مرکزی سایت — هر اطلاعاتی که در چند صفحه تکرار می‌شود فقط اینجا تعریف شود.
 */
export const SITE = {
  /** نام رسمی سایت؛ برای «نام سایت» در نتایج گوگل همه‌جا (title، og:site_name، اسکیمای WebSite) یکسان بماند */
  name: "کجا هست",
  /** شکل‌های دیگری که کاربران می‌نویسند؛ در اسکیمای WebSite و Organization */
  alternateName: ["کجاهست", "Kojahast", "kojahast.com"],
  url: "https://kojahast.com",
  tagline: "راهنمای انتخاب مراکز خدمات و تعمیرات در تهران",
  description:
    "کجا هست راهنمای مقایسه‌ای مراکز خدمات و تعمیرات تهران است؛ لیست تعمیرگاه‌های موبایل، لپ‌تاپ و گجت با آدرس، تلفن، ساعت کاری و نقاط قوت و ضعف هر مرکز.",
  locale: "fa_IR",
  lang: "fa-IR",
  phone: "02191300348",
  phoneDisplay: "۰۲۱-۹۱۳۰۰۳۴۸",
  email: "support@kojahast.ir",
  address: "تهران، خیابان مطهری، خیابان قائم‌مقام فراهانی، پلاک ۱۵۸",
  hours: "شنبه تا پنجشنبه، ۹ تا ۱۸",
  defaultImage: "/images/best-mobile-phone-repairs-in-tehran.webp",
  /** لوگوی مربعی (نماد ذره‌بین) برای اسکیمای Organization — گوگل حداقل ۱۱۲×۱۱۲ می‌خواهد */
  logo: "/images/logo-square-512.png",
  /** لوگوی کامل با نوشته «کجا هست» برای هدر و فوتر */
  logoWide: "/images/logo-kojahast.webp",
  /** شبکه‌های اجتماعی رسمی — فقط موارد واقعی را پر کنید؛ خالی‌ها نمایش داده نمی‌شوند */
  socials: {
    instagram: "",
    telegram: "",
    whatsapp: "",
    linkedin: "",
  } as Record<string, string>,
} as const;

export type CategorySlug = "mobile-repairs" | "laptop-and-computer-repair";

export const CATEGORIES: Record<
  CategorySlug,
  {
    slug: CategorySlug;
    name: string;
    shortName: string;
    pillar: string; // slug مقاله مادر
    icon: string;
    title: string;
    description: string;
    intro: string;
  }
> = {
  "mobile-repairs": {
    slug: "mobile-repairs",
    name: "موبایل و گجت‌های دیجیتال",
    shortName: "تعمیرات موبایل",
    pillar: "mobile-repair-tehran",
    icon: "lucide:smartphone",
    title: "تعمیرات موبایل و گجت در تهران | لیست مراکز بر اساس برند",
    description:
      "راهنمای تعمیرگاه‌های موبایل، آیپد، اپل واچ و ایرپاد در تهران به تفکیک برند؛ آدرس، تلفن، ساعت کاری و مقایسه نقاط قوت و ضعف مراکز.",
    intro:
      "گوشی که خراب می‌شود، معمولاً وقت زیادی برای گشتن نداریم. اینجا مراکز تعمیر موبایل و گجت تهران را برند به برند جمع کرده‌ایم؛ از نمایندگی‌ها تا تعمیرگاه‌های پاساژ علاءالدین و چارسو، با اطلاعات تماس و نقاط قوت و ضعف هر کدام.",
  },
  "laptop-and-computer-repair": {
    slug: "laptop-and-computer-repair",
    name: "لپ‌تاپ و کامپیوتر",
    shortName: "تعمیرات لپ‌تاپ",
    pillar: "laptop-repair-in-tehran",
    icon: "lucide:laptop",
    title: "تعمیر لپ‌تاپ در تهران | مراکز تخصصی هر برند",
    description:
      "لیست مراکز تعمیر لپ‌تاپ ایسوس، لنوو، اچ‌پی، دل، ایسر، سونی، سرفیس و مک‌بوک در تهران با آدرس، تلفن، ساعت کاری و مقایسه نقاط قوت و ضعف.",
    intro:
      "تعمیر لپ‌تاپ یعنی سپردن اطلاعات و ابزار کارتان به یک نفر دیگر؛ پس انتخاب درست مهم است. مراکز تخصصی هر برند را جدا کرده‌ایم تا بدانید برای ایسوس، لنوو، اچ‌پی یا مک‌بوک سراغ چه کسی بروید.",
  },
};

/** آیکون برند برای کاشی‌ها (simple-icons) */
export const BRAND_ICONS: Record<string, string> = {
  شیائومی: "simple-icons:xiaomi",
  سامسونگ: "simple-icons:samsung",
  هوآوی: "simple-icons:huawei",
  آیفون: "simple-icons:apple",
  اپل: "simple-icons:apple",
  آیپد: "simple-icons:apple",
  "اپل واچ": "simple-icons:apple",
  ایرپاد: "simple-icons:apple",
  "مک‌بوک": "simple-icons:apple",
  "مک بوک": "simple-icons:apple",
  نوکیا: "simple-icons:nokia",
  ایسوس: "simple-icons:asus",
  ایسر: "simple-icons:acer",
  دل: "simple-icons:dell",
  "اچ‌پی": "simple-icons:hp",
  "اچ پی": "simple-icons:hp",
  HP: "simple-icons:hp",
  لنوو: "simple-icons:lenovo",
  سونی: "simple-icons:sony",
  سرفیس: "simple-icons:microsoft",
};

export const NAV = [
  { label: "خانه", href: "/" },
  { label: "تعمیرات موبایل", href: "/blog/category/mobile-repairs/" },
  { label: "تعمیرات لپ‌تاپ", href: "/blog/category/laptop-and-computer-repair/" },
  { label: "همه راهنماها", href: "/blog/" },
  { label: "درباره ما", href: "/about/" },
  { label: "تماس", href: "/contact/" },
];
