export type Locale = "en" | "am" | "ar";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  am: "አማ",
  ar: "ع",
};

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  am: "አማርኛ",
  ar: "العربية",
};

type Messages = {
  common: {
    etb: string;
    required: string;
    error: string;
    cancel: string;
    loading: string;
    retry: string;
  };
  navbar: {
    payment_options: string;
    review: string;
    contact: string;
    vat_notice: string;
    complaint: string;
    dev_credit: string;
    dev_credit_sub: string;
  };
  menu: {
    search_placeholder: string;
    no_results: string;
    clear_search: string;
    all_categories: string;
    out_of_stock: string;
    featured: string;
    sizes: string;
    starting_from: string;
  };
  menu_page: {
    loading_title: string;
    loading_subtitle: string;
    loading_quote: string;
    loading_error: string;
    connection_error: string;
    retry: string;
    no_results_title: string;
    no_results_desc: string;
    adjust_filters: string;
  };
  featured: {
    popular_order: string;
    price: string;
    from: string;
  };
  payment: {
    title: string;
    subtitle: string;
    account_name: string;
    copy: string;
    copied: string;
    show_qr: string;
    account_types: {
      savings: string;
      current: string;
      mobile_wallet: string;
    };
  };
  review: {
    title: string;
    subtitle: string;
    thank_you: string;
    thank_you_message: string;
    submit_another: string;
    tell_us_more: string;
    optional: string;
    placeholder_comment: string;
    how_important: string;
    add_details: string;
    details_hint: string;
    placeholder_name: string;
    placeholder_phone: string;
    placeholder_email: string;
    submitting: string;
    submit: string;
    rate_all: string;
    rating_labels: {
      poor: string;
      fair: string;
      good: string;
      great: string;
      excellent: string;
    };
    categories: {
      place: string;
      food: string;
      service: string;
    };
    urgency: {
      low: string;
      medium: string;
      high: string;
    };
  };
  complaint: {
    trigger_btn: string;
    title: string;
    description: string;
    full_name: string;
    full_name_placeholder: string;
    email: string;
    email_placeholder: string;
    phone: string;
    phone_placeholder: string;
    subject: string;
    subject_placeholder: string;
    message: string;
    message_placeholder: string;
    submit: string;
    submitting: string;
    success_title: string;
    success_message: string;
    error_message: string;
    optional: string;
  };
  footer: {
    tagline: string;
    get_in_touch: string;
    opening_hours: string;
    staff_login: string;
    all_rights: string;
    developed_by: string;
    want_business: string;
    address: string;
    days: {
      mon_fri: string;
      saturday: string;
      sunday: string;
    };
  };
};

export const messages: Record<Locale, Messages> = {
  en: {
    common: {
      etb: "ETB",
      required: "This field is required",
      error: "Something went wrong",
      cancel: "Close",
      loading: "Loading...",
      retry: "Retry",
    },
    navbar: {
      payment_options: "Payment Options",
      review: "Review",
      contact: "Contact",
      vat_notice: "All prices include VAT & Service Charge",
      complaint: "Complaint",
      dev_credit: "Contact Developer",
      dev_credit_sub: "Want this for your business?",
    },
    menu: {
      search_placeholder: "Search for dishes, drinks...",
      no_results: "No items found",
      clear_search: "Clear search",
      all_categories: "All",
      out_of_stock: "Not available",
      featured: "Featured",
      sizes: "Size Options",
      starting_from: "Starting from",
    },
    menu_page: {
      loading_title: "Preparing Your Menu",
      loading_subtitle: "Fresh ingredients loading...",
      loading_quote: "Great food and drinks bring people together and create memorable moments.",
      loading_error: "Unable to load menu",
      connection_error: "We couldn't connect to our servers. Please check your internet connection.",
      retry: "Retry Connection",
      no_results_title: "Sorry, No items found",
      no_results_desc: "We couldn't find anything matching",
      adjust_filters: "Please try adjusting your search or filters.",
    },
    featured: {
      popular_order: "Popular Order",
      price: "Price",
      from: "from",
    },
    payment: {
      title: "Payment Transfer Accounts",
      subtitle: "Transfer your payment to any of the accounts below",
      account_name: "Account Name",
      copy: "Copy",
      copied: "Copied!",
      show_qr: "Show QR Code",
      account_types: {
        savings: "Savings",
        current: "Current",
        mobile_wallet: "Mobile Wallet",
      },
    },
    review: {
      title: "Share Your Experience",
      subtitle: "Your honest feedback helps us serve you better every visit.",
      thank_you: "Thank you so much!",
      thank_you_message:
        "Your feedback means the world to us. We'll use it to make your next visit even better.",
      submit_another: "Submit another review",
      tell_us_more: "Tell us more",
      optional: "(optional)",
      placeholder_comment: "What did you love? What could be improved? We read every single message...",
      how_important: "How important is this feedback?",
      add_details: "Add your details",
      details_hint: "(optional - helps us follow up)",
      placeholder_name: "Your name",
      placeholder_phone: "Phone number",
      placeholder_email: "Email address",
      submitting: "Submitting...",
      submit: "Submit Review",
      rate_all: "Please rate all three categories to submit",
      rating_labels: {
        poor: "Poor",
        fair: "Fair",
        good: "Good",
        great: "Great",
        excellent: "Excellent",
      },
      categories: {
        place: "Place & Ambiance",
        food: "Food & Drinks",
        service: "Customer Service",
      },
      urgency: {
        low: "Just sharing",
        medium: "Needs attention",
        high: "Urgent",
      },
    },
    complaint: {
      trigger_btn: "Complaint",
      title: "Submit a Complaint",
      description: "We're sorry something went wrong. Tell us what happened and we'll look into it.",
      full_name: "Full Name",
      full_name_placeholder: "Enter your full name",
      email: "Email Address",
      email_placeholder: "Enter your email address (optional)",
      phone: "Phone Number",
      phone_placeholder: "Enter your phone number (optional)",
      subject: "Subject",
      subject_placeholder: "What is this about?",
      message: "Message",
      message_placeholder: "Tell us what happened in detail...",
      submit: "Submit Complaint",
      submitting: "Submitting...",
      success_title: "Complaint Submitted!",
      success_message: "Thank you for reaching out. We will look into this and get back to you shortly.",
      error_message: "Something went wrong. Please try again.",
      optional: "(optional)",
    },
    footer: {
      tagline: "Crafting moments of joy, one cup at a time. Visit us for the perfect blend of taste and ambiance.",
      get_in_touch: "Get in Touch",
      opening_hours: "Opening Hours",
      staff_login: "Staff Login",
      all_rights: "All rights reserved.",
      developed_by: "Contact Developer",
      want_business: "Want this for your business?",
      address: "Sarbet, Next to Canadian Embassy, Addis Ababa, Ethiopia",
      days: {
        mon_fri: "Mon - Fri",
        saturday: "Saturday",
        sunday: "Sunday",
      },
    },
  },
  am: {
    common: {
      etb: "ብር",
      required: "ይህ መስክ ያስፈልጋል",
      error: "ችግር ተፈጥሯል",
      cancel: "ዝጋ",
      loading: "እየጫነ ነው...",
      retry: "እንደገና ይሞክሩ",
    },
    navbar: {
      payment_options: "የክፍያ አማራጮች",
      review: "አስተያየት",
      contact: "አድራሻ",
      vat_notice: "ሁሉም ዋጋዎች ታክስ እና የአገልግሎት ክፍያ ያካትታሉ",
      complaint: "ቅሬታ",
      dev_credit: "ዲቨሎፐሩን ያግኙ",
      dev_credit_sub: "እንደዚህ ማሰራት ይፈልጋሉ?",
    },
    menu: {
      search_placeholder: "ምግቦችን ወይም መጠጦችን ይፈልጉ...",
      no_results: "ምንም የተገኘ ነገር የለም",
      clear_search: "ፍለጋውን አጽዳ",
      all_categories: "ሁሉም",
      out_of_stock: "አይገኝም",
      featured: "ተለይቶ የቀረበ",
      sizes: "የመጠን አማራጭ",
      starting_from: "መነሻ",
    },
    menu_page: {
      loading_title: "ምናሌዎን እያዘጋጀን ነው",
      loading_subtitle: "ትኩስ ንጥረ ነገሮች እየተጫኑ ነው...",
      loading_quote: "ጥሩ ምግብና መጠጥ ሰዎችን ያገናኛል እና የማይረሱ ጊዜያትን ይፈጥራል።",
      loading_error: "ሜኑውን መጫን አልተቻለም",
      connection_error: "ከሰርቨር ጋር መገናኘት አልተቻለም። እባክዎ የኢንተርኔት ግንኙነትዎን ያረጋግጡ።",
      retry: "እንደገና ይሞክሩ",
      no_results_title: "ይቅርታ፣ ምንም የተገኘ ነገር የለም",
      no_results_desc: "ከዚህ ፍለጋ ጋር የሚሄድ ነገር ማግኘት አልቻልንም",
      adjust_filters: "እባክዎን ፍለጋዎን ወይም ማጣሪያዎን ያስተካክሉ።",
    },
    featured: {
      popular_order: "ታዋቂ ትዕዛዝ",
      price: "ዋጋ",
      from: "ከ",
    },
    payment: {
      title: "የክፍያ ማስተላለፊያ አካውንቶች",
      subtitle: "ክፍያዎን ወደ ከሚከተሉት አካውንቶች ያስተላልፉ",
      account_name: "የአካውንት ስም",
      copy: "ቅዳ",
      copied: "ተቀድቷል!",
      show_qr: "QR ኮድ አሳይ",
      account_types: {
        savings: "ቁጠባ",
        current: "እንቅስቃሴ",
        mobile_wallet: "ሞባይል ዋሌት",
      },
    },
    review: {
      title: "ልምድዎን ያጋሩ",
      subtitle: "እውነተኛ አስተያየትዎ በእያንዳንዱ ጉብኝት የተሻለ እንድናገለግልዎ ይረዳናል።",
      thank_you: "በጣም እናመሰግናለን!",
      thank_you_message: "አስተያየትዎ ለእኛ ትልቅ ነው። ቀጣይ ጉብኝትዎን የተሻለ ለማድረግ እንጠቀምበታለን።",
      submit_another: "ሌላ አስተያየት ይስጡ",
      tell_us_more: "ተጨማሪ ይንገሩን",
      optional: "(አማራጭ)",
      placeholder_comment: "ምን ወደዱ? ምን ሊሻሻል ይችላል?",
      how_important: "ይህ አስተያየት ምን ያህል አስፈላጊ ነው?",
      add_details: "ዝርዝሮችዎን ያክሉ",
      details_hint: "(አማራጭ - ለመከታተል ይረዳናል)",
      placeholder_name: "ስምዎ",
      placeholder_phone: "ስልክ ቁጥር",
      placeholder_email: "ኢሜይል",
      submitting: "እየተላከ ነው...",
      submit: "አስተያየት ላክ",
      rate_all: "እባክዎ ሶስቱንም ምድቦች ይገምግሙ",
      rating_labels: {
        poor: "ደካማ",
        fair: "መካከለኛ",
        good: "ጥሩ",
        great: "በጣም ጥሩ",
        excellent: "እጅግ በጣም ጥሩ",
      },
      categories: {
        place: "ቦታ እና አየር",
        food: "ምግብ እና መጠጥ",
        service: "የደንበኛ አገልግሎት",
      },
      urgency: {
        low: "ማጋራት ብቻ",
        medium: "ትኩረት ያስፈልጋል",
        high: "አስቸኳይ",
      },
    },
    complaint: {
      trigger_btn: "ቅሬታ",
      title: "ቅሬታ ያስገቡ",
      description: "ይቅርታ ነገር ተሳስቷል። ምን እንደተከሰተ ይንገሩን።",
      full_name: "ሙሉ ስም",
      full_name_placeholder: "ሙሉ ስምዎን ያስገቡ",
      email: "ኢሜይል",
      email_placeholder: "ኢሜይል (አማራጭ)",
      phone: "ስልክ",
      phone_placeholder: "ስልክ (አማራጭ)",
      subject: "ርዕስ",
      subject_placeholder: "ስለ ምን ነው?",
      message: "መልዕክት",
      message_placeholder: "በዝርዝር ይንገሩን...",
      submit: "ቅሬታ ላክ",
      submitting: "እየተላከ ነው...",
      success_title: "ቅሬታ ተልኳል!",
      success_message: "እናመሰግናለን። በቅርቡ እንመለስልዎታለን።",
      error_message: "ችግር ተፈጥሯል። እባክዎ እንደገና ይሞክሩ።",
      optional: "(አማራጭ)",
    },
    footer: {
      tagline: "በእያንዳንዱ ኩባያ ደስታን እንፈጥራለን። ለምርጥ ጣዕምና ድባብ ይጎብኙን።",
      get_in_touch: "ያግኙን",
      opening_hours: "የሥራ ሰዓታት",
      staff_login: "የሠራተኞች መግቢያ",
      all_rights: "መብቱ በሕግ የተጠበቀ ነው።",
      developed_by: "ዲቨሎፐሩን ያግኙ",
      want_business: "እንደዚህ ማሰራት ይፈልጋሉ?",
      address: "ሳርቤት፣ ከካናዳ ኤምባሲ አጠገብ፣ አዲስ አበባ፣ ኢትዮጵያ",
      days: {
        mon_fri: "ሰኞ - ዓርብ",
        saturday: "ቅዳሜ",
        sunday: "እሑድ",
      },
    },
  },
  ar: {
    common: {
      etb: "بر",
      required: "هذا الحقل مطلوب",
      error: "حدث خطأ ما",
      cancel: "إغلاق",
      loading: "جاري التحميل...",
      retry: "إعادة المحاولة",
    },
    navbar: {
      payment_options: "خيارات الدفع",
      review: "تقييم",
      contact: "تواصل",
      vat_notice: "جميع الأسعار تشمل الضريبة ورسوم الخدمة",
      complaint: "شكوى",
      dev_credit: "تواصل مع المطور",
      dev_credit_sub: "هل تريد هذا لعملك؟",
    },
    menu: {
      search_placeholder: "ابحث عن أطباق ومشروبات...",
      no_results: "لا توجد نتائج",
      clear_search: "مسح البحث",
      all_categories: "الكل",
      out_of_stock: "غير متوفر",
      featured: "مميز",
      sizes: "خيارات الحجم",
      starting_from: "يبدأ من",
    },
    menu_page: {
      loading_title: "نحضّر قائمتك",
      loading_subtitle: "المكونات الطازجة تُحمَّل...",
      loading_quote: "الطعام والشراب الجيد يجمع الناس ويخلق لحظات لا تُنسى.",
      loading_error: "تعذر تحميل القائمة",
      connection_error: "تعذر الاتصال بالخادم. يرجى التحقق من الإنترنت.",
      retry: "إعادة الاتصال",
      no_results_title: "عذراً، لا توجد نتائج",
      no_results_desc: "لم نجد ما يطابق",
      adjust_filters: "يرجى تعديل البحث أو الفلاتر.",
    },
    featured: {
      popular_order: "طلب شائع",
      price: "السعر",
      from: "من",
    },
    payment: {
      title: "حسابات التحويل",
      subtitle: "حوّل دفعتك إلى أي من الحسابات أدناه",
      account_name: "اسم الحساب",
      copy: "نسخ",
      copied: "تم النسخ!",
      show_qr: "إظهار رمز QR",
      account_types: {
        savings: "توفير",
        current: "جاري",
        mobile_wallet: "محفظة موبايل",
      },
    },
    review: {
      title: "شارك تجربتك",
      subtitle: "ملاحظاتك الصادقة تساعدنا على خدمتك بشكل أفضل.",
      thank_you: "شكراً جزيلاً!",
      thank_you_message: "ملاحظاتك تعني لنا الكثير. سنستخدمها لتحسين زيارتك القادمة.",
      submit_another: "إرسال تقييم آخر",
      tell_us_more: "أخبرنا المزيد",
      optional: "(اختياري)",
      placeholder_comment: "ماذا أحببت؟ وما الذي يمكن تحسينه؟",
      how_important: "ما أهمية هذه الملاحظة؟",
      add_details: "أضف تفاصيلك",
      details_hint: "(اختياري - يساعدنا على المتابعة)",
      placeholder_name: "اسمك",
      placeholder_phone: "رقم الهاتف",
      placeholder_email: "البريد الإلكتروني",
      submitting: "جاري الإرسال...",
      submit: "إرسال التقييم",
      rate_all: "يرجى تقييم الفئات الثلاث للإرسال",
      rating_labels: {
        poor: "ضعيف",
        fair: "مقبول",
        good: "جيد",
        great: "رائع",
        excellent: "ممتاز",
      },
      categories: {
        place: "المكان والأجواء",
        food: "الطعام والمشروبات",
        service: "خدمة العملاء",
      },
      urgency: {
        low: "مجرد مشاركة",
        medium: "يحتاج اهتماماً",
        high: "عاجل",
      },
    },
    complaint: {
      trigger_btn: "شكوى",
      title: "تقديم شكوى",
      description: "نأسف لحدوث مشكلة. أخبرنا بما حدث وسننظر فيه.",
      full_name: "الاسم الكامل",
      full_name_placeholder: "أدخل اسمك الكامل",
      email: "البريد الإلكتروني",
      email_placeholder: "البريد (اختياري)",
      phone: "رقم الهاتف",
      phone_placeholder: "الهاتف (اختياري)",
      subject: "الموضوع",
      subject_placeholder: "بماذا تتعلق الشكوى؟",
      message: "الرسالة",
      message_placeholder: "أخبرنا بالتفاصيل...",
      submit: "إرسال الشكوى",
      submitting: "جاري الإرسال...",
      success_title: "تم إرسال الشكوى!",
      success_message: "شكراً لتواصلك. سنراجع الأمر ونعود إليك قريباً.",
      error_message: "حدث خطأ. يرجى المحاولة مرة أخرى.",
      optional: "(اختياري)",
    },
    footer: {
      tagline: "نصنع لحظات من الفرح مع كل فنجان. زورونا لمزيج مثالي من الطعم والأجواء.",
      get_in_touch: "تواصل معنا",
      opening_hours: "ساعات العمل",
      staff_login: "دخول الموظفين",
      all_rights: "جميع الحقوق محفوظة.",
      developed_by: "تواصل مع المطور",
      want_business: "هل تريد هذا لعملك؟",
      address: "ساربيت، بجانب السفارة الكندية، أديس أبابا، إثيوبيا",
      days: {
        mon_fri: "الإثنين - الجمعة",
        saturday: "السبت",
        sunday: "الأحد",
      },
    },
  },
};

export type MessageKey = Messages;
