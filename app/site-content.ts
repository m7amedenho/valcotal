export const photo = (n: number) => `/media/project-${String(n).padStart(3, "0")}.jpg`;
export const slides = [
  { image: photo(77), label: "واجهات معمارية", title: "واجهات تصنع\nانطباعًا يدوم", text: "حلول الألومنيوم والزجاج للمباني التي تستحق حضورًا استثنائيًا." },
  { image: photo(65), label: "أبواب وشبابيك", title: "تفاصيل تُكمل\nكل مساحة", text: "تصنيع وتركيب بدقة، من الفكرة الأولى حتى آخر تفصيلة." },
  { image: photo(29), label: "مشروعات متكاملة", title: "خبرة تُرى\nعلى أرض الواقع", text: "فالكوتال شريكك في تنفيذ أعمال الواجهات والتشطيبات المعدنية." },
];
export const sectors = [
  { n: "01", title: "الألومنيوم", en: "ALUMINUM SYSTEMS", desc: "قطاعات وأبواب وشبابيك تجمع المتانة مع جمال التصميم.", image: photo(66) },
  { n: "02", title: "الزجاج والواجهات", en: "GLASS & FACADES", desc: "واجهات زجاجية تمنح المبنى ضوءًا وحضورًا عصريًا.", image: photo(67) },
  { n: "03", title: "UPVC", en: "UPVC SOLUTIONS", desc: "أنظمة للنوافذ والأبواب توازن بين الراحة والعزل والشكل.", image: photo(78) },
  { n: "04", title: "الشتر وشيش الحصيرة", en: "ROLLER SHUTTERS", desc: "خصوصية وتحكم وحماية بلمسات تناسب كل مشروع.", image: photo(33) },
  { n: "05", title: "سلك البليسيه", en: "PLEATED SCREENS", desc: "حلول أنيقة للتهوية والحماية، سهلة الاستخدام.", image: photo(65) },
  { n: "06", title: "الأعمال المعدنية", en: "METAL WORKS", desc: "سلالم ودرابزينات وتفاصيل معدنية مصنوعة بعناية.", image: photo(45) },
  { n: "07", title: "واجهات Curtain Wall", en: "CURTAIN WALL SYSTEMS", desc: "واجهات إنشائية زجاجية للمباني التجارية والإدارية بمظهر متكامل.", image: photo(67) },
  { n: "08", title: "تجاليد الكلادينج", en: "ACP CLADDING", desc: "كسوة معمارية تضيف عمقًا وحضورًا واضحًا لكتلة المبنى.", image: photo(60) },
  { n: "09", title: "القباب والسكاي لايت", en: "SKYLIGHTS & DOMES", desc: "حلول للضوء الطبيعي تمنح الفراغات اتساعًا ووضوحًا.", image: photo(73) },
  { n: "10", title: "الكبائن الزجاجية", en: "SHOWER ENCLOSURES", desc: "كبائن حمامات زجاجية بتفاصيل أنيقة وعملية.", image: photo(56) },
  { n: "11", title: "المطابخ", en: "KITCHEN SYSTEMS", desc: "تصميم وتنفيذ المطابخ وواجهاتها وفق احتياجات المساحة.", image: photo(61) },
  { n: "12", title: "الطباعة على الأسطح", en: "SURFACE PRINTING", desc: "تشطيبات وطباعة للمسطحات والتابلوهات ضمن أعمال الشركة.", image: photo(58) },
];
export const projects = [
  { image: photo(27), title: "مشروعات سكنية", detail: "واجهات وأبواب وشبابيك" },
  { image: photo(54), title: "مشروعات تجارية", detail: "مداخل وواجهات زجاجية" },
  { image: photo(45), title: "تفاصيل التنفيذ", detail: "سلالم وأعمال معدنية" },
  { image: photo(57), title: "مساحات داخلية", detail: "زجاج وتشطيبات" },
];
export const milestones = [
  { year: "2008", title: "البداية والتأسيس", text: "انطلاق فالكوتال في أعمال الألومنيوم والزجاج." },
  { year: "2012", title: "التوسع في الأنظمة", text: "إضافة حلول UPVC والشيش وأنظمة الواجهات." },
  { year: "2018", title: "تصنيع وتوريد أوسع", text: "تطوير قدرات التنفيذ للمشروعات السكنية والتجارية." },
  { year: "اليوم", title: "شريك للمشروعات", text: "حلول للواجهات والأعمال المعمارية على نطاق واسع." },
];
export const suppliers = [
  { name: "دلمار", group: "الألومنيوم", logo: "delemar" }, { name: "الدولية 21", group: "الألومنيوم", logo: "dawlia" },
  { name: "ألوميل", group: "الألومنيوم", logo: "alumil" }, { name: "مركز ماكينات الألومنيوم", group: "الألومنيوم", logo: "mac" },
  { name: "سان جوبان", group: "الزجاج", logo: "saint-gobain" }, { name: "د. جريش", group: "الزجاج", logo: "greiche" },
  { name: "الاتحاد العربي للزجاج", group: "الزجاج", logo: "arab-union" }, { name: "مدار", group: "الشتر", logo: "madar" }, { name: "النيل", group: "الشتر", logo: "nile" },
];
export const clients = [
  { name: "أبو دنقل", logo: "abo-donkol" }, { name: "الفتح للمقاولات", logo: "alfath" }, { name: "عسكر للمقاولات", logo: "askar" },
  { name: "فاركو", logo: "pharco" }, { name: "ميديزن", logo: "medizen" }, { name: "تحرير فارما", logo: "altahrir" },
  { name: "شاهيناز", logo: "shahnaz" }, { name: "أليكس", logo: "alex" }, { name: "بروتك", logo: "protec" },
  { name: "فالكون", logo: "falcon" }, { name: "T.U", logo: "tu" },
];
export const values = [
  { n: "01", title: "هندسة دقيقة", text: "قياسات ورسومات تنفيذية تسبق كل خطوة في المشروع." },
  { n: "02", title: "جودة المواد", text: "خامات وأنظمة توريد موثقة وفق متطلبات كل مشروع." },
  { n: "03", title: "التزام بالمواعيد", text: "تنسيق أعمال التوريد والتصنيع والتركيب وفق جدول واضح." },
  { n: "04", title: "شفافية كاملة", text: "متابعة مباشرة للتفاصيل والمراحل من البداية حتى التسليم." },
  { n: "05", title: "السلامة المهنية", text: "انتباه لإجراءات الموقع وسلامة فرق العمل." },
  { n: "06", title: "شراكة مستمرة", text: "دعم فني ومتابعة بعد التنفيذ للمشروعات المختلفة." },
];
