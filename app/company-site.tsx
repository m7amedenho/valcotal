"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, FacadeDrawing, type IconName } from "./icons";
import { clients, milestones, photo, projects, sectors, slides, suppliers, values } from "./site-content";

type Article = { title: string; date: string; url: string; image: string };
const filters = ["كل الحلول", "الواجهات والزجاج", "الأبواب والحماية", "التشطيبات"];
const serviceGroups = [2, 1, 2, 2, 2, 3, 1, 1, 1, 3, 3, 3];
const serviceIcons: IconName[] = ["window","layers","window","shield","sun","tools","building","layers","sun","window","compass","spark"];
const valueIcons: IconName[] = ["ruler","shield","clock","compass","tools","message"];
const serviceDetails = [
  "حلول للفتحات الصغيرة والمساحات الواسعة، باختيار شكل القطاع وطريقة الفتح والتشطيب بما يتكامل مع طابع المبنى.",
  "تصميم شفاف يربط الداخل بالخارج. نراعي تقسيمات الواجهة وطبيعة الزجاج وتفاصيل التثبيت لتحقيق المظهر المطلوب.",
  "خيارات مناسبة للمساحات السكنية والإدارية، مع الاهتمام بتفاصيل الغلق والإكسسوارات ومتطلبات الاستخدام اليومي.",
  "حلول تساعد على تنظيم الضوء وتعزيز الخصوصية، مع اختيار نظام التشغيل المناسب للفتحات وطريقة الاستخدام.",
  "تفاصيل خفيفة تندمج مع الأبواب والنوافذ، وتتيح التهوية مع حركة سلسة تناسب الحياة اليومية.",
  "هاندريل ودرابزينات وأعمال معدنية تُكمل الحركة داخل المبنى، مع عناية بالوصلات والنهايات والتشطيب.",
  "واجهات للمشروعات الإدارية والتجارية، تبدأ بتقسيمات مدروسة وتنتهي بتكامل الألومنيوم والزجاج مع الكتلة المعمارية.",
  "ألواح وتفاصيل كسوة تمنح الواجهة هوية متجانسة، مع تنظيم الفواصل والزوايا والعناصر المكملة للتصميم.",
  "نفتح المجال للضوء الطبيعي عبر حلول زجاجية علوية، مع دراسة الشكل والقطاعات وطبيعة الفراغ أسفلها.",
  "تقسيمات زجاجية تحافظ على إحساس الاتساع داخل الحمام، وتجمع بين سهولة الاستخدام وجمال التفاصيل.",
  "تنظيم للمساحات وتفاصيل للواجهات تساعد على صناعة مطبخ عملي، يتناسب مع الأبعاد واحتياجات الاستخدام.",
  "معالجات بصرية للمسطحات والتابلوهات تمنح المساحات طابعًا خاصًا، وتُكمل لغة التصميم الداخلي.",
];
const steps: { title: string; desc: string; detail: string; icon: IconName }[] = [
  { title: "نفهم رؤيتك", desc: "الدراسة والمعاينة", detail: "نبدأ بالرسومات، وأبعاد الموقع، وطبيعة الاستخدام. نتناقش في الشكل والوظيفة للوصول إلى تصور واضح لنطاق العمل.", icon: "compass" },
  { title: "نضبط كل تفصيلة", desc: "الاختيار والتخطيط", detail: "نحدد الأنظمة والخامات والإكسسوارات المناسبة، ونراجع التقسيمات والتشطيبات وترتيب مراحل التنفيذ.", icon: "ruler" },
  { title: "نحوّلها إلى واقع", desc: "التصنيع والتركيب", detail: "تجهيز العناصر وفق القياسات ثم تنسيق تركيبها في الموقع، مع الاهتمام بالوصلات والمناسيب والتكامل مع باقي الأعمال.", icon: "tools" },
  { title: "نراجع النتيجة معك", desc: "التسليم والمتابعة", detail: "نراجع تفاصيل التنفيذ والتشغيل، ونوضح الاستخدام والعناية بالأنظمة للحفاظ على أدائها ومظهرها.", icon: "shield" },
];
const faqs = [
  ["كيف أختار النظام المناسب لمشروعي؟", "الاختيار يبدأ من طبيعة المبنى وأبعاد الفتحات وطريقة الاستخدام. نراجع معك الشكل المطلوب، ومتطلبات العزل والخصوصية، وظروف الموقع، ثم نحدد القطاعات والزجاج والإكسسوارات المناسبة."],
  ["هل يمكن تنفيذ أكثر من نوع من الأعمال في المشروع نفسه؟", "نعم، تشمل مجالاتنا الواجهات والأبواب والشبابيك والأعمال الزجاجية والمعدنية والتشطيبات المكملة. التنسيق بين هذه العناصر يساعد على الوصول إلى مظهر متجانس وتفاصيل متكاملة."],
  ["ما المعلومات المطلوبة لتجهيز عرض للمشروع؟", "يفضل إرسال الرسومات أو صور الموقع، والأبعاد التقريبية، ومكان المشروع، ونوع الأعمال المطلوبة. تُراجع التفاصيل والقياسات والمواصفات قبل الاتفاق على نطاق العمل والتكلفة."],
  ["هل تعملون في المشروعات الصناعية والتجارية؟", "تتضمن سابقة أعمال فالكوتال قطاعات سكنية وتجارية وصناعية ومشروعات للبنية التحتية، إلى جانب المطاعم والفنادق والصناعات الدوائية."],
  ["كيف تُحدد مدة التنفيذ؟", "ترتبط المدة بحجم الأعمال، وتوافر الخامات، والتشطيبات المختارة، وجاهزية الموقع. بعد مراجعة المشروع يمكن تحديد برنامج يناسب مراحل التصنيع والتوريد والتركيب."],
  ["أين يمكن التواصل مع الشركة؟", "يمكنك التواصل هاتفيًا أو عبر واتساب وإرسال تفاصيل مشروعك. توجد بيانات فرع الإسكندرية وفرع المنوفية في قسم التواصل أسفل الصفحة."],
];

function SectionHeading({ eyebrow, title, accent, text }: { eyebrow: string; title: string; accent: string; text?: string }) {
  return <div className="section-head" data-reveal><div><span className="eyebrow"><i />{eyebrow}</span><h2>{title} <em>{accent}</em></h2></div>{text && <p>{text}</p>}</div>;
}

export default function CompanySite({ articles }: { articles: Article[] }) {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const root = useRef<HTMLElement>(null);
  const touchStart = useRef<number | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setSlide(s => (s + 1) % slides.length), 6500);
    return () => clearInterval(timer);
  }, [paused]);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 50);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    const node = root.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    node.querySelectorAll("[data-reveal]").forEach(el => observer.observe(el));
    node.classList.add("reveal-ready");
    return () => { observer.disconnect(); node.classList.remove("reveal-ready"); };
  }, []);
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setMenu(false); menuButton.current?.focus(); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu]);

  const displayedArticles = showAll ? articles : articles.slice(1, 4);
  const changeSlide = (direction: number) => setSlide(s => (s + direction + slides.length) % slides.length);

  return <main ref={root} dir="rtl">
    <a className="skip-link" href="#about">انتقل إلى المحتوى</a>
    <header className={`site-header ${scrolled || menu ? "is-scrolled" : ""}`}>
      <a href="#home" className="brand" aria-label="فالكوتال - الرئيسية"><img src="/logo-transparent.png" alt="VALCOTAL" width="154" height="75" /><span>ARCHITECTURAL SOLUTIONS</span></a>
      <nav id="main-nav" className={`nav ${menu ? "open" : ""}`} aria-label="التنقل الرئيسي">
        {[["#about","عن فالكوتال"],["#sectors","حلولنا"],["#projects","أعمالنا"],["#partners","شركاؤنا"],["#journal","المجلة"]].map(([href,title])=><a key={href} href={href} onClick={()=>setMenu(false)}>{title}</a>)}
        <a href="#contact" className="mobile-nav-contact" onClick={()=>setMenu(false)}>تحدث مع فريقنا <Icon name="arrow" /></a>
      </nav>
      <a className="header-cta" href="#contact">ناقش مشروعك <Icon name="arrow" /></a>
      <button ref={menuButton} className="menu-button" onClick={()=>setMenu(!menu)} aria-label={menu ? "إغلاق القائمة" : "فتح القائمة"} aria-controls="main-nav" aria-expanded={menu}><Icon name={menu ? "close" : "menu"} /></button>
    </header>
    {menu && <button className="menu-backdrop" onClick={()=>setMenu(false)} aria-label="إغلاق قائمة التنقل" tabIndex={-1} />}

    <section className="hero" id="home" aria-roledescription="عرض شرائح" aria-label="أبرز أعمال فالكوتال"
      onTouchStart={e=>{touchStart.current=e.touches[0].clientX;}}
      onTouchEnd={e=>{if(touchStart.current!==null){const delta=e.changedTouches[0].clientX-touchStart.current;if(Math.abs(delta)>55)changeSlide(delta>0?1:-1);}touchStart.current=null;}}>
      {slides.map((item,i)=><div className={`hero-slide ${i===slide?"active":""}`} key={item.label} aria-hidden={i!==slide}>
        <div className="hero-slide-backdrop" style={{backgroundImage:`url('${item.image}')`}} /><img className="hero-slide-image" src={item.image} alt="" fetchPriority={i===0?"high":"auto"} />
      </div>)}
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content wrap">
        <span className="hero-kicker"><span className="status-dot" /> نصنع التفاصيل. ونترك الأثر.</span>
        <h1 key={slide}>{slides[slide].title}</h1>
        <p>{slides[slide].text} من أول خط في الرسم، إلى آخر لمسة في التنفيذ.</p>
        <div className="hero-actions"><a className="button button-primary" href="#projects">استكشف أعمالنا <Icon name="arrow" /></a><a className="button button-ghost" href="#sectors">حلول لكل مساحة <Icon name="layers" /></a></div>
      </div>
      <div className="hero-bottom wrap">
        <div className="hero-pagination">{slides.map((s,i)=><button key={s.label} onClick={()=>setSlide(i)} className={i===slide?"on":""} aria-label={`اعرض ${s.label}`} aria-pressed={i===slide}><span>0{i+1}</span><i /></button>)}</div>
        <span className="slide-caption">0{slide+1}<i />{slides[slide].label}</span>
        <div className="hero-arrows"><button onClick={()=>changeSlide(-1)} aria-label="الشريحة السابقة"><Icon name="chevron" className="rotate-arrow" /></button><button onClick={()=>setPaused(!paused)} aria-label={paused?"تشغيل الشرائح":"إيقاف الشرائح مؤقتًا"}><Icon name={paused?"play":"pause"} /></button><button onClick={()=>changeSlide(1)} aria-label="الشريحة التالية"><Icon name="chevron" /></button></div>
      </div>
      <span className="hero-side">ENGINEERED WITH PRECISION — SINCE 2008</span>
    </section>

    <section className="stats-band" aria-label="فالكوتال في أرقام"><div className="wrap stats-grid">
      {[["18+","عامًا من الخبرة","clock"],["3000+","مشروع في سابقة أعمالنا","building"],["12","مجالًا وحلًا معماريًا","layers"],["2008","بداية حكايتنا","compass"]].map(([number,label,icon])=><div className="stat" key={label}><Icon name={icon as IconName} /><strong dir="ltr">{number}</strong><span>{label}</span></div>)}
    </div></section>

    <section className="intro section mesh-section" id="about"><div className="wrap">
      <SectionHeading eyebrow="01 / فالكوتال · آل عبدالله" title="وراء كل واجهة مميزة،" accent="تفاصيل مدروسة." />
      <div className="intro-grid">
        <div className="intro-copy" data-reveal><p className="lead">نؤمن أن المبنى الجيد يُعرف من تفاصيله. من قطاع الألومنيوم إلى انعكاس الضوء على الزجاج، كل اختيار يترك أثره في المساحة التي تعيش أو تعمل فيها.</p><p>في فالكوتال، نجمع أعمال الألومنيوم والزجاج والواجهات مع أنظمة UPVC والشتر والتشطيبات المكملة. نساعدك على تحويل التصور المعماري إلى حلول قابلة للتنفيذ، تناسب طبيعة المبنى وطريقة استخدامه.</p><p>بدأت حكايتنا عام ٢٠٠٨، واتسعت عبر المشروعات السكنية والتجارية والصناعية. ما يجمع أعمالنا هو الاهتمام بالتفاصيل، وحسن اختيار الخامات، والتنسيق بين مراحل التصنيع والتركيب.</p><div className="intro-points"><span><Icon name="check" /> دراسة وقياسات</span><span><Icon name="check" /> تصنيع وتركيب</span><span><Icon name="check" /> متابعة للتفاصيل</span></div><a className="text-link" href="#process">تعرّف على طريقة عملنا <Icon name="arrow" /></a></div>
        <div className="intro-art" data-reveal><img src={photo(66)} alt="تفاصيل واجهة زجاجية من أعمال فالكوتال" loading="lazy" /><div className="art-corner top" /><div className="art-corner bottom" /><div className="floating-note"><span className="icon-tile"><Icon name="ruler" /></span><div><strong>التفاصيل تصنع الفرق</strong><span>PRECISION IN EVERY LINE</span></div></div><div className="image-caption"><span>01 / ARCHITECTURE</span><Icon name="arrow" /></div></div>
      </div>
    </div></section>

    <section className="timeline-section section mesh-section" id="journey"><div className="wrap">
      <SectionHeading eyebrow="حكاية مستمرة" title="سنوات من العمل." accent="ومساحة أكبر للطموح." text="كل مرحلة أضافت إلى خبرتنا، وكل مشروع فتح أمامنا بابًا جديدًا للتطوير." />
      <ol className="history-timeline">{milestones.map((m,i)=><li className={`history-stop stop-${i}`} key={m.year} data-reveal>
        <div className="history-date"><span>CHAPTER 0{i+1}</span><strong>{m.year}</strong></div>
        <div className="history-node"><Icon name={["compass","layers","tools","building"][i] as IconName} /></div>
        <div className="history-card"><span className="mini-label">0{i+1} / {["الانطلاقة","التوسع","التطوير","المستقبل"][i]}</span><h3>{m.title}</h3><p>{m.text} {["بناء الأساس في أعمال التصنيع والتركيب، والاهتمام بالتفاصيل التي تظهر في المنتج النهائي.","توسيع نطاق الحلول لتلبية احتياجات متنوعة، ودمج الأبواب والنوافذ والحماية في منظومة واحدة.","تراكم الخبرة في تنسيق الخامات ومراحل العمل وتفاصيل المشروعات المختلفة.","نواصل تطوير خياراتنا، ونستفيد من خبرة التنفيذ في تقديم حلول تناسب رؤيتك القادمة."][i]}</p><span className="history-tag"><i />{["الألومنيوم والزجاج","أنظمة متكاملة","قدرات أوسع","رؤية تتجدد"][i]}</span></div>
      </li>)}</ol>
    </div></section>

    <section className="sectors section" id="sectors"><div className="wrap">
      <SectionHeading eyebrow="02 / حلولنا" title="لكل مساحة احتياج." accent="ولكل تفصيلة حل." text="استكشف مجالات عملنا، من الهيكل الخارجي للمبنى إلى التفاصيل التي تُكمل المساحات الداخلية." />
      <div className="filter-bar" role="group" aria-label="تصفية الحلول">{filters.map((f,i)=><button key={f} className={filter===i?"selected":""} onClick={()=>setFilter(i)} aria-pressed={filter===i}>{f}<span>{i===0?12:serviceGroups.filter(g=>g===i).length}</span></button>)}</div>
      <div className="sector-grid">{sectors.filter((_,i)=>filter===0||serviceGroups[i]===filter).map(s=>{const i=Number(s.n)-1;return <article className="sector-card" key={s.n}>
        <div className="sector-image"><img src={s.image} alt={s.title} loading="lazy" /><span className="service-number">{s.n} / SOLUTION</span><span className="service-icon"><Icon name={serviceIcons[i]} /></span></div>
        <div className="sector-content"><small>{s.en}</small><h3>{s.title}</h3><p>{serviceDetails[i]}</p><a href={`https://wa.me/201017766405?text=${encodeURIComponent("مرحبًا فالكوتال، أود الاستفسار عن "+s.title)}`} target="_blank" rel="noopener noreferrer">ناقش متطلباتك <Icon name="arrow" /></a></div>
      </article>;})}</div>
    </div></section>

    <section className="engineering section mesh-section"><div className="wrap engineering-grid">
      <div className="blueprint" data-reveal><span className="drawing-label"><Icon name="ruler" /> DESIGN / DETAIL / DELIVER</span><FacadeDrawing /><span className="drawing-chip chip-one"><i /> تقسيمات متوازنة</span><span className="drawing-chip chip-two"><i /> تفاصيل مترابطة</span><div className="drawing-footer"><span>VALCOTAL / DESIGN THINKING</span><span>01 — 04</span></div></div>
      <div className="engineering-copy" data-reveal><span className="eyebrow"><i /> هندسة الفكرة</span><h2>جمال يُرى.<br /><em>وعناية في كل طبقة.</em></h2><p>الواجهة ليست اختيار لون أو زجاج فقط. إنها مجموعة قرارات تعمل معًا: الأبعاد، وطريقة الفتح، والتثبيت، والتشطيب. نفكر في الصورة الكاملة، ونراجع التفاصيل التي تربط عناصرها.</p><div className="engineering-features">
        {[["ruler","ملاءمة للمكان","قياسات وتقسيمات تراعي أبعاد المبنى وطبيعة الاستخدام."],["layers","تكامل الخامات","اختيار العناصر بحيث تعمل معًا بصريًا ووظيفيًا."],["shield","عناية بالتنفيذ","مراجعة الوصلات والنهايات وتفاصيل التركيب بالموقع."]].map(([icon,title,text])=><div key={title}><span className="icon-tile"><Icon name={icon as IconName} /></span><div><h3>{title}</h3><p>{text}</p></div></div>)}
      </div></div>
    </div></section>

    <section className="projects section" id="projects"><div className="wrap">
      <SectionHeading eyebrow="03 / أعمالنا" title="من الرسم إلى الواقع." accent="هنا تتكلم التفاصيل." text="لقطات من أعمال الواجهات والفتحات والتشطيبات. لكل مشروع شخصيته، ولنا في كل مشروع عناية خاصة." />
      <div className="project-grid">{projects.map((p,i)=><article className={`project-card project-${i+1}`} key={p.title} data-reveal><img src={p.image} alt={p.title} loading="lazy" /><div className="project-info"><span className="project-index">0{i+1}</span><div><small>{p.detail}</small><h3>{p.title}</h3></div><Icon name="arrow" /></div></article>)}</div>
      <div className="project-callout"><span><Icon name="compass" /> لديك فكرة مشابهة؟ نبدأ من تفاصيل مشروعك.</span><a href="#contact">تحدث مع فريقنا <Icon name="arrow" /></a></div>
    </div></section>

    <section className="values-section section mesh-section"><div className="wrap">
      <SectionHeading eyebrow="ميثاق العمل" title="النتيجة الجيدة تبدأ" accent="بطريقة عمل واضحة." text="هذه المبادئ توجه قراراتنا، وتنظم علاقتنا بكل مشروع من الدراسة الأولى إلى مراجعة التنفيذ." />
      <div className="values-grid">{values.map((v,i)=><article className="value-card" key={v.n} data-reveal><div className="value-top"><span className="icon-tile"><Icon name={valueIcons[i]} /></span><span>{v.n}</span></div><h3>{v.title}</h3><p>{v.text}</p><div className="value-line" /></article>)}</div>
    </div></section>

    <section className="process section" id="process"><div className="wrap">
      <SectionHeading eyebrow="04 / رحلة مشروعك" title="خطوة بخطوة،" accent="حتى تكتمل الصورة." text="تسلسل واضح للعمل يتيح مناقشة كل قرار في وقته، ويساعد على تنسيق التفاصيل قبل انتقالها إلى الموقع." />
      <ol className="process-grid">{steps.map((s,i)=><li className="process-step" key={s.title} data-reveal><div className="process-marker"><Icon name={s.icon} /><span>0{i+1}</span></div><small>{s.desc}</small><h3>{s.title}</h3><p>{s.detail}</p></li>)}</ol>
    </div></section>

    <section className="partners section mesh-section" id="partners"><div className="wrap">
      <SectionHeading eyebrow="منظومة التوريد" title="خامات متخصصة." accent="وخيارات أوسع." text="تضم منظومة التوريد أسماء في قطاعات الألومنيوم والزجاج والشتر، لاختيار ما يناسب احتياجات كل مشروع." />
      <div className="logo-grid suppliers-grid">{suppliers.map(s=><div className="logo-card" key={s.logo}><div className="logo-image"><img src={`/brand/${s.logo}.webp`} alt={s.name} loading="lazy" /></div><strong>{s.name}</strong><small>{s.group}</small></div>)}</div>
      <div className="partners-divider"><Icon name="spark" /></div>
      <SectionHeading eyebrow="عملاء ومشروعات" title="خبرة تجمع" accent="قطاعات مختلفة." text="من الصناعات الدوائية والمقاولات إلى المنشآت التجارية والمطاعم. أسماء تضمها سابقة أعمال الشركة." />
      <div className="logo-grid clients-grid">{clients.map(c=><div className="client-logo" key={c.logo}><img src={`/brand/${c.logo}.webp`} alt={c.name} loading="lazy" /><span>{c.name}</span></div>)}</div>
    </div></section>

    <section className="journal section" id="journal"><div className="wrap">
      <SectionHeading eyebrow="05 / مجلة فالكوتال" title="أفكار وأعمال." accent="من داخل عالمنا." text="تعرّف على المزيد من الحلول وتابع لقطات أعمالنا ومنشوراتنا في الألومنيوم والزجاج والتشطيبات." />
      <div className="article-grid">{displayedArticles.map((a,i)=><a className="article-card" href={a.url} target="_blank" rel="noopener noreferrer" key={a.url}><div className="article-image"><img src={a.image || photo([57,65,66][i%3])} onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src=photo([57,65,66][i%3]);}} alt="" loading="lazy" /><span>من المجلة <Icon name="arrow" /></span></div><div className="article-body"><div className="article-meta"><span>فالكوتال / أعمال وأفكار</span><time dateTime={a.date}>{a.date}</time></div><h3>{a.title}</h3><span className="article-more">اقرأ المنشور <Icon name="arrow" /></span></div></a>)}</div>
      <button className="more-button" onClick={()=>setShowAll(!showAll)}>{showAll?"عرض أحدث المنشورات":`استكشف كل المنشورات (${articles.length})`}<Icon name={showAll?"chevron":"plus"} /></button>
    </div></section>

    <section className="faq section mesh-section"><div className="wrap faq-layout">
      <div className="faq-intro" data-reveal><span className="eyebrow"><i /> قبل أن نبدأ</span><h2>كل سؤال،<br /><em>خطوة أوضح.</em></h2><p>تفاصيل تساعدك على تجهيز فكرتك وتحديد احتياجات مشروعك. وإذا كان لديك سؤال خاص، يسعدنا أن نناقشه معك.</p><a className="text-link" href="https://wa.me/201017766405" target="_blank" rel="noopener noreferrer">اسأل فريقنا <Icon name="message" /></a><div className="faq-orbit" aria-hidden="true"><Icon name="message" /><i /><i /></div></div>
      <div className="faq-list">{faqs.map(([question,answer],i)=><div className={`faq-item ${openFaq===i?"expanded":""}`} key={question}><h3><button onClick={()=>setOpenFaq(openFaq===i?null:i)} aria-expanded={openFaq===i} aria-controls={`answer-${i}`}><span className="faq-number">0{i+1}</span><span>{question}</span><Icon name="plus" /></button></h3><div id={`answer-${i}`} className="faq-answer" hidden={openFaq!==i}><p>{answer}</p></div></div>)}</div>
    </div></section>

    <section className="contact section" id="contact"><div className="wrap">
      <div className="contact-panel"><div className="contact-mesh" aria-hidden="true" /><div className="contact-main"><span className="eyebrow"><i /> مشروعك القادم يبدأ بمحادثة</span><h2>لنبنِ شيئًا<br /><em>يستحق أن يبقى.</em></h2><p>شاركنا رؤيتك، أو أرسل رسوماتك وصور الموقع. نناقش التفاصيل ونساعدك في اختيار الحل الأقرب لاحتياجاتك.</p><a className="button button-white" href="https://wa.me/201017766405" target="_blank" rel="noopener noreferrer">ابدأ المحادثة <Icon name="message" /></a></div><div className="contact-links"><a href="tel:+201011159941"><span className="icon-tile"><Icon name="phone" /></span><span><small>تحدث معنا مباشرة</small><strong dir="ltr">010 111 59941</strong></span><Icon name="arrow" /></a><a href="https://wa.me/201017766405" target="_blank" rel="noopener noreferrer"><span className="icon-tile"><Icon name="message" /></span><span><small>أرسل تفاصيلك على واتساب</small><strong dir="ltr">010 177 66405</strong></span><Icon name="arrow" /></a><a href="mailto:mahmoudgomaa969@gmail.com"><span className="icon-tile"><Icon name="mail" /></span><span><small>البريد الإلكتروني</small><strong className="email-address">mahmoudgomaa969@gmail.com</strong></span><Icon name="arrow" /></a></div></div>
      <div className="office-grid"><div><Icon name="pin" /><span><small>الإسكندرية</small><strong>برج العرب القديم — شارع جمال عبد الناصر</strong></span></div><div><Icon name="pin" /><span><small>المنوفية</small><strong>أشمون — كازنة الخطاطبة</strong></span></div></div>
    </div></section>
    <footer><div className="wrap footer-inner"><div className="footer-brand"><img src="/logo-transparent.png" alt="VALCOTAL" width="160" height="78" /><p>حلول معمارية للألومنيوم والزجاج والتشطيبات.<br />شريكك في كل مشروع، منذ ٢٠٠٨.</p></div><div className="footer-links"><span>اكتشف فالكوتال</span><a href="#about">عن الشركة</a><a href="#sectors">حلولنا</a><a href="#projects">أعمالنا</a></div><div className="footer-links"><span>لنبدأ معًا</span><a href="#process">رحلة مشروعك</a><a href="#journal">المجلة</a><a href="#contact">تواصل معنا</a></div><a href="#home" className="back-top" aria-label="العودة لأعلى الصفحة"><Icon name="arrow" /><span>إلى الأعلى</span></a></div><div className="wrap footer-bottom"><span>© 2026 VALCOTAL — جميع الحقوق محفوظة.</span><span>BUILT ON DETAILS.</span></div></footer>
  </main>;
}
