import type { BlogArticle } from './content';

type ArticleInput = Omit<
  BlogArticle,
  'category' | 'publishedDate' | 'modifiedDate' | 'criteria' | 'workflow' | 'imagePlan' | 'score'
>;

const publishedDate = '2026-11-19';

function article(input: ArticleInput): BlogArticle {
  return {
    ...input,
    category: 'Platform comparisons',
    publishedDate,
    modifiedDate: publishedDate,
    criteria: [],
    workflow: [],
    imagePlan: [],
    score: { research: 19, usefulness: 19, accuracy: 19, seo: 18, editorial: 17 },
  };
}

const galleryHero = {
  src: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1800&q=85',
  alt: 'Photographer reviewing a client gallery at a desk',
  caption: 'The best gallery platform is the one that matches how you deliver, sell, and retain client work.',
};

const printHero = {
  src: 'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&w=1800&q=85',
  alt: 'Printed photographs arranged on a table',
  caption: 'Store automation matters when galleries are expected to keep earning after delivery.',
};

const archiveHero = {
  src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=85',
  alt: 'Rows of illuminated data servers representing a photo archive',
  caption: 'Storage comparisons need to account for file types, retrieval, and the cost of keeping years of work online.',
};

const studioHero = {
  src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=85',
  alt: 'Creative team comparing photography workflows around a table',
  caption: 'Gallery software can be a delivery tool, a storefront, or a complete studio system—and those are different jobs.',
};

const proofingHero = {
  src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=85',
  alt: 'Creative professional reviewing an approval dashboard',
  caption: 'Favorites, comments, annotations, approvals, and version control solve different kinds of proofing work.',
};

export const competitorArticles: BlogArticle[] = [
  article({
    slug: 'pictime-vs-pixieset',
    seoTitle: 'Pic-Time vs Pixieset: Which Is Better in 2027?',
    h1: 'Pic-Time vs Pixieset: Which Is Better for Photographers?',
    description: 'Compare Pic-Time and Pixieset pricing, storage, galleries, print sales, automation, websites, and studio tools using current official plan details.',
    primaryQuery: 'Pic-Time vs Pixieset',
    audience: 'Photographers choosing between two established client-gallery platforms',
    intent: 'Compare features, pricing, and fit before subscribing',
    dek: 'Pic-Time is the stronger sales engine. Pixieset is the more flexible photography-business suite. The right choice depends on what the gallery must do after delivery.',
    quickAnswer: 'Choose Pic-Time when automated print campaigns, worldwide labs, albums, and post-delivery sales are central to your business. Choose Pixieset when you want a polished gallery that can expand into a website, studio manager, store, or mobile gallery apps. For delivery without a store, Droptop is the lower-cost option: it starts free with 5 GB and its paid plans begin at $5 per month.',
    hero: printHero,
    picks: [
      { productId: 'pictime', angle: 'Best when galleries are expected to generate print and album revenue.' },
      { productId: 'pixieset', angle: 'Best when you want a modular gallery, website, store, and studio ecosystem.' },
      { productId: 'droptop', angle: 'Best low-cost choice for private photo and video delivery without a print store.' },
    ],
    sections: [
      {
        heading: 'The biggest difference is what happens after delivery',
        paragraphs: [
          'Pic-Time is built around turning a delivered gallery into an ongoing sales channel. Its plans combine client galleries with store campaigns, lab fulfillment, album tools, and marketing automations. That makes it especially compelling for wedding and family photographers whose clients are likely to buy prints after seeing the finished gallery.',
          'Pixieset treats Client Gallery as one part of a broader suite. A photographer can add Website, Studio Manager, Store, and Mobile Gallery Apps as the business grows. That modular approach is useful when booking, contracts, a portfolio site, and delivery need to share one visual ecosystem, even if print automation is not the main priority.',
        ],
      },
      {
        heading: 'Pic-Time and Pixieset pricing compared',
        paragraphs: [
          'Pic-Time currently lists Beginner at $7 per month billed annually with 20 GB, Professional at $21 with 100 GB, and Advanced at $42 with unlimited storage. Pixieset Client Gallery lists a 3 GB free plan, Basic at $8 per month billed annually with 10 GB, Plus at $16 with 100 GB, and Pro at $24 with 1 TB. Monthly billing costs more on both services.',
          'Storage alone does not decide the value. A Pic-Time campaign that produces profitable print orders can justify the higher 100 GB price. A Pixieset subscription may be more economical when its wider suite replaces other studio tools. If you only need secure delivery, paying for either commerce ecosystem may be unnecessary.',
        ],
      },
    ],
    faqs: [
      { question: 'Is Pic-Time cheaper than Pixieset?', answer: 'At the entry level, Pic-Time lists 20 GB for $7 per month billed annually, while Pixieset Basic lists 10 GB for $8. At 100 GB, Pixieset Plus is less expensive than Pic-Time Professional. Compare the tools included, not storage alone.' },
      { question: 'Which has better print sales tools?', answer: 'Pic-Time has the clearer advantage for sales automation, lab choice, campaigns, and albums. Pixieset also has a store and commission-free selling on paid Client Gallery plans, but its positioning is broader than gallery marketing.' },
      { question: 'Can I deliver video on both?', answer: 'Yes, but plan limits apply. Pixieset publishes video resolution and duration allowances by plan. Confirm current Pic-Time video terms for the plan and workflow you intend to use.' },
    ],
    related: ['best-pictime-alternatives', 'pictime-pricing', 'smugmug-vs-pixieset'],
  }),
  article({
    slug: 'best-pictime-alternatives',
    seoTitle: '10 Best Pic-Time Alternatives for Photographers in 2027',
    h1: '10 Best Pic-Time Alternatives for Photographers',
    description: 'Compare the best Pic-Time alternatives for client galleries, proofing, print sales, studio management, video delivery, and affordable storage.',
    primaryQuery: 'Pic-Time alternatives',
    audience: 'Photographers who like client galleries but need different pricing, commerce, or workflow tools',
    intent: 'Find and compare a suitable replacement for Pic-Time',
    dek: 'The best Pic-Time replacement depends on whether you are replacing its storefront, its delivery experience, its automation, or all three.',
    quickAnswer: 'Pixieset is the best broad alternative for a polished modular photography suite. ShootProof is strongest when contracts, invoices, and zero stated platform commission matter. CloudSpot combines galleries with studio and mini-session tools. SmugMug is best for unlimited JPEG storage. Droptop is the affordable option for photographers who need private photo and video delivery but do not need an integrated print store.',
    hero: galleryHero,
    picks: [
      { productId: 'pixieset', angle: 'Best overall alternative for a polished, expandable photography suite.' },
      { productId: 'shootproof', angle: 'Best for galleries, contracts, invoices, and zero stated platform commission.' },
      { productId: 'cloudspot', angle: 'Best for studio management and mini-session workflows.' },
      { productId: 'smugmug', angle: 'Best for unlimited full-resolution JPEG storage.' },
      { productId: 'droptop', angle: 'Best affordable alternative for straightforward photo and video delivery.' },
      { productId: 'pass', angle: 'Best for a low entry price and automated store campaigns.' },
      { productId: 'picflow', angle: 'Best for commercial review, comments, annotations, and approvals.' },
      { productId: 'pixpa', angle: 'Best for an all-in-one portfolio website, store, blog, and galleries.' },
      { productId: 'format', angle: 'Best for a design-led portfolio with lighter client-gallery needs.' },
      { productId: 'photoshelter', angle: 'Best for editorial archives, metadata, proofing, and licensing workflows.' },
    ],
    sections: [
      {
        heading: 'Choose the alternative based on the feature you actually use',
        paragraphs: [
          'Photographers who rely on Pic-Time automations should shortlist store-led platforms such as PASS, ShootProof, CloudSpot, or Pixieset. A cheaper gallery can become more expensive if it removes the campaigns that produce print revenue. Compare a typical order after lab costs, platform commission, card fees, and subscription cost.',
          'If clients mainly download finished files, a focused delivery platform is usually better value. Droptop includes private galleries, favorites, controlled downloads, and video delivery without bundling a lab storefront. SmugMug is more suitable when the real requirement is keeping a very large JPEG archive online.',
        ],
      },
      {
        heading: 'There is no universal Pic-Time replacement',
        paragraphs: [
          'Commercial teams may prefer Picflow because its approval states, annotations, comments, and versions are designed for collaborative review. Studios trying to consolidate contracts and invoicing may get more value from ShootProof or CloudSpot. Portfolio-first photographers should compare Pixpa and Format.',
          'Before moving, rebuild one active gallery on the shortlisted service. Test upload speed, cover design, mobile viewing, favorites, original and web-size downloads, password access, email delivery, and a real store order if commerce matters. Keep Pic-Time live until clients, selections, and outstanding orders have been reconciled.',
        ],
      },
    ],
    faqs: [
      { question: 'What is the closest alternative to Pic-Time?', answer: 'Pixieset is the closest broad competitor. ShootProof, CloudSpot, and PASS are closer when selling and studio workflow matter. No alternative reproduces every Pic-Time automation exactly.' },
      { question: 'Is there a free Pic-Time alternative?', answer: 'Droptop and CloudSpot currently offer 5 GB free tiers, Pixieset offers 3 GB, Picflow offers 2 GB, and ShootProof offers a free plan capped at 100 photos. Free-plan restrictions differ.' },
      { question: 'Which alternative is best for video?', answer: 'Droptop is a delivery-first photo and video option. Pixieset publishes defined HD and 4K video allowances by plan. Check file-size, duration, playback, and download behavior with your own footage before migrating.' },
    ],
    related: ['pictime-vs-pixieset', 'pictime-pricing', 'pictime-vs-smugmug'],
  }),
  article({
    slug: 'pictime-pricing',
    seoTitle: 'Pic-Time Pricing in 2027: Plans, Storage and Value',
    h1: 'Pic-Time Pricing: Is It Worth It for Photographers?',
    description: 'Understand Pic-Time pricing, annual and monthly plan costs, storage, sales tools, and when a less expensive gallery platform makes more sense.',
    primaryQuery: 'Pic-Time pricing',
    audience: 'Photographers budgeting for Pic-Time or reviewing an existing subscription',
    intent: 'Understand the real plan cost and choose the right tier',
    dek: 'Pic-Time can be excellent value when its sales tools earn money. It is comparatively expensive when the gallery is used only as a download page.',
    quickAnswer: 'Pic-Time lists Beginner at $7 per month billed annually for 20 GB, Professional at $21 for 100 GB, and Advanced at $42 for unlimited storage. Monthly billing is $8, $25, and $50 respectively. The right tier depends on storage, brand controls, video, team needs, and whether its store campaigns contribute enough revenue to cover the subscription.',
    hero: printHero,
    picks: [
      { productId: 'pictime', angle: 'Best value when print campaigns and album sales are active parts of the workflow.' },
      { productId: 'pixieset', angle: 'A lower-cost 100 GB comparison with a broader modular suite.' },
      { productId: 'droptop', angle: 'A lower-cost comparison for delivery without an integrated store.' },
      { productId: 'smugmug', angle: 'A higher-entry comparison that includes unlimited JPEG storage.' },
    ],
    sections: [
      {
        heading: 'What each Pic-Time plan changes',
        paragraphs: [
          'Beginner is the low-cost starting point and currently includes 20 GB. Professional raises storage to 100 GB and is the tier many working photographers will compare against other paid gallery plans. Advanced removes the stated storage ceiling and is aimed at higher-volume businesses that need the platform’s deeper capabilities.',
          'Annual billing reduces the advertised monthly rate but commits more cash upfront. Monthly prices are currently $8 for Beginner, $25 for Professional, and $50 for Advanced. Verify taxes, renewal terms, file-type rules, and any commission conditions in your account before treating the headline price as the complete cost.',
        ],
      },
      {
        heading: 'When Pic-Time is worth the price',
        paragraphs: [
          'Pic-Time makes the strongest financial case when automated campaigns, lab fulfillment, albums, and store presentation increase sales without adding much manual work. Measure actual annual gallery revenue and gross profit rather than assuming the automations pay for themselves.',
          'If the store is rarely used, compare delivery-first costs. Droptop offers 5 GB free, 10 GB for $5, 100 GB for $12, and 1 TB for $20 per month. Pixieset also offers 100 GB for less than Pic-Time Professional on annual billing, while SmugMug charges more at entry but removes the full-resolution JPEG storage limit.',
        ],
      },
    ],
    faqs: [
      { question: 'Does Pic-Time have a free plan?', answer: 'Pic-Time’s official pricing page should be checked for the current trial or free-gallery offer in your region. Its main paid tiers are Beginner, Professional, and Advanced.' },
      { question: 'Is Pic-Time Advanced really unlimited?', answer: 'Advanced is advertised with unlimited storage. Review its current terms, supported file types, video rules, and acceptable-use conditions for the exact scope.' },
      { question: 'Does Pic-Time charge commission?', answer: 'Pic-Time’s commission treatment depends on plan and payment setup. Its pricing page says commission-free sales require a qualifying setup, so verify the exact arrangement available in your country.' },
    ],
    related: ['pictime-vs-pixieset', 'best-pictime-alternatives', 'smugmug-pricing'],
  }),
  article({
    slug: 'pictime-vs-smugmug',
    seoTitle: 'Pic-Time vs SmugMug: Galleries, Sales and Storage Compared',
    h1: 'Pic-Time vs SmugMug: Which Platform Fits Your Photography Business?',
    description: 'Compare Pic-Time and SmugMug on client galleries, unlimited storage, print sales, websites, pricing, RAW files, and delivery workflows.',
    primaryQuery: 'Pic-Time vs SmugMug',
    audience: 'Photographers deciding between sales automation and storage-led hosting',
    intent: 'Choose between Pic-Time and SmugMug',
    dek: 'Pic-Time is a client-sales platform with galleries attached. SmugMug is a large online photo home that adds websites and commerce as plans rise.',
    quickAnswer: 'Choose Pic-Time for polished client galleries, automated print campaigns, album tools, and a worldwide lab workflow. Choose SmugMug when unlimited full-resolution JPEG storage, a long-term portfolio, and Lightroom integration matter more. SmugMug starts at $20 per month billed annually; Pic-Time starts at $7 with 20 GB and reaches unlimited storage on its $42 Advanced tier.',
    hero: archiveHero,
    picks: [
      { productId: 'pictime', angle: 'Best for gallery marketing, print automation, albums, and client sales.' },
      { productId: 'smugmug', angle: 'Best for unlimited JPEG storage, portfolio hosting, and a large archive.' },
      { productId: 'droptop', angle: 'Best affordable option when the job is private photo and video delivery.' },
    ],
    sections: [
      {
        heading: 'Storage favors SmugMug; sales automation favors Pic-Time',
        paragraphs: [
          'Every current SmugMug plan advertises unlimited full-resolution JPEG storage. RAW storage is separate: SmugMug lists an add-on priced at $10 per month for the first terabyte and $6 for each additional terabyte. This makes SmugMug easier to budget for a large delivered-JPEG archive, but it is not automatically an unlimited original-file backup.',
          'Pic-Time meters storage on Beginner and Professional, then advertises unlimited storage on Advanced. Its advantage is not the cheapest archive; it is the connection between gallery presentation, store campaigns, labs, and albums. A studio with healthy print sales may value that workflow more than unlimited JPEG space.',
        ],
      },
      {
        heading: 'The entry prices solve different problems',
        paragraphs: [
          'Pic-Time Beginner costs $7 per month billed annually for 20 GB. SmugMug Direct costs $20 per month billed annually and includes unlimited JPEG storage, privacy controls, and delivery; Portfolio at $23.50 adds the website and selling tools. SmugMug Pro costs $37 and adds stronger client and commerce features.',
          'A photographer delivering a modest number of weddings may spend less with Pic-Time and gain better sales automation. A landscape photographer keeping a very large public and private JPEG collection online may get more predictable storage value from SmugMug. For small private galleries without commerce, both can be more platform than necessary.',
        ],
      },
    ],
    faqs: [
      { question: 'Is SmugMug cheaper than Pic-Time?', answer: 'No at entry: SmugMug Direct starts at $20 per month billed annually, while Pic-Time Beginner starts at $7. SmugMug includes unlimited JPEG storage, so it can cost less for very large archives.' },
      { question: 'Which is better for selling prints?', answer: 'Pic-Time is stronger for automated campaigns, labs, and albums. SmugMug supports selling on Portfolio and Pro, but retains a share of markup. Compare net profit with a real sample order.' },
      { question: 'Can SmugMug store RAW files?', answer: 'Yes through its separate RAW storage add-on. The unlimited storage included with normal plans is described as full-resolution JPEG storage.' },
    ],
    related: ['pictime-vs-pixieset', 'smugmug-vs-pixieset', 'best-pictime-alternatives'],
  }),
  article({
    slug: 'smugmug-vs-pixieset',
    seoTitle: 'SmugMug vs Pixieset: Pricing, Storage and Galleries Compared',
    h1: 'SmugMug vs Pixieset: Which Is Better for Photographers?',
    description: 'Compare SmugMug and Pixieset pricing, unlimited photo storage, client galleries, downloads, websites, stores, video, and RAW support.',
    primaryQuery: 'SmugMug vs Pixieset',
    audience: 'Photographers choosing between archive-led hosting and a client-gallery suite',
    intent: 'Compare SmugMug and Pixieset before subscribing',
    dek: 'SmugMug wins on predictable JPEG storage. Pixieset wins on low-cost entry and a gallery experience built around client delivery.',
    quickAnswer: 'Choose SmugMug if unlimited full-resolution JPEG storage is the deciding factor or you want a portfolio and archive under one subscription. Choose Pixieset if you want a free starting tier, polished client proofing, video allowances, and a modular suite that extends into studio management. Droptop is less expensive than both for focused photo and video delivery.',
    hero: archiveHero,
    picks: [
      { productId: 'smugmug', angle: 'Best for unlimited JPEG storage and a portfolio connected to a large archive.' },
      { productId: 'pixieset', angle: 'Best for polished client galleries and an expandable photography-business suite.' },
      { productId: 'droptop', angle: 'Best for lower-cost delivery with private galleries, favorites, and video.' },
    ],
    sections: [
      {
        heading: 'SmugMug gives every plan unlimited JPEG storage',
        paragraphs: [
          'SmugMug Direct starts at $20 per month billed annually and includes unlimited full-resolution JPEG storage. Portfolio, at $23.50, adds a customizable website and selling. Pro, at $37, adds deeper client controls and business features. RAW storage costs extra and should be budgeted separately.',
          'Pixieset starts with 3 GB free. Its paid Client Gallery plans currently provide 10 GB for $8 per month billed annually, 100 GB for $16, and 1 TB for $24. That tiered structure is cheaper for a modest working set, while SmugMug becomes compelling when the JPEG archive would exceed the meter.',
        ],
      },
      {
        heading: 'Pixieset feels more like a client-delivery workspace',
        paragraphs: [
          'Pixieset’s collection design, favorites, downloads, store, and video allowances are closely aligned with wedding, portrait, and event delivery. The separate Website and Studio Manager products make it possible to keep the client experience visually consistent across booking and delivery.',
          'SmugMug is better understood as a permanent photo home with privacy, sharing, portfolio, and commerce layers. It can serve clients, but its strongest differentiator is the absence of a JPEG storage ceiling. The right choice depends on whether a gallery is primarily an active project or part of a long-lived archive.',
        ],
      },
    ],
    faqs: [
      { question: 'Does Pixieset offer unlimited storage?', answer: 'The current Client Gallery plans top out at 1 TB on Pro. SmugMug advertises unlimited full-resolution JPEG storage on every current plan.' },
      { question: 'Which is cheaper, SmugMug or Pixieset?', answer: 'Pixieset is cheaper for free, 10 GB, 100 GB, and 1 TB tiers. SmugMug costs more at entry but can be better value for a JPEG archive larger than Pixieset’s limits.' },
      { question: 'Which is better for video?', answer: 'Pixieset publishes HD and 4K video allowances across paid gallery plans. Check SmugMug’s current supported video formats and limits with your typical files before choosing it for video delivery.' },
    ],
    related: ['best-smugmug-alternatives', 'smugmug-pricing', 'pictime-vs-smugmug'],
  }),
  article({
    slug: 'best-smugmug-alternatives',
    seoTitle: '10 Best SmugMug Alternatives for Photographers in 2027',
    h1: '10 Best SmugMug Alternatives for Photographers',
    description: 'Compare SmugMug alternatives for client proofing, affordable storage, print sales, video delivery, portfolios, commercial approvals, and licensing.',
    primaryQuery: 'SmugMug alternatives',
    audience: 'Photographers seeking a cheaper or more client-focused alternative to SmugMug',
    intent: 'Find the most suitable SmugMug replacement',
    dek: 'SmugMug’s unlimited JPEG archive is difficult to match. The alternatives are stronger when proofing, sales automation, studio operations, video, or price matters more.',
    quickAnswer: 'Pixieset is the best all-round SmugMug alternative for client galleries. Pic-Time is best for print automation. Zenfolio is strongest for website, galleries, and volume-event tools. Droptop is the affordable photo-and-video delivery choice. Picflow is better for commercial approvals, while PhotoShelter is better for metadata-heavy editorial archives and licensing.',
    hero: galleryHero,
    picks: [
      { productId: 'pixieset', angle: 'Best overall alternative for client galleries and a modular studio ecosystem.' },
      { productId: 'pictime', angle: 'Best for automated print sales and lab fulfillment.' },
      { productId: 'zenfolio', angle: 'Best for website, selling, and higher-tier volume workflows.' },
      { productId: 'droptop', angle: 'Best affordable choice for private photo and video delivery.' },
      { productId: 'shootproof', angle: 'Best for combining galleries with contracts and invoices.' },
      { productId: 'cloudspot', angle: 'Best for a studio suite with mini-session tools.' },
      { productId: 'picflow', angle: 'Best for commercial review, versions, and approvals.' },
      { productId: 'pixpa', angle: 'Best all-in-one portfolio, blog, store, and gallery website.' },
      { productId: 'format', angle: 'Best for a design-first portfolio with selective client galleries.' },
      { productId: 'photoshelter', angle: 'Best for editorial metadata, proofing, archive, and licensing.' },
    ],
    sections: [
      {
        heading: 'Why photographers look beyond SmugMug',
        paragraphs: [
          'SmugMug’s $20-per-month annual entry price is higher than many gallery tools, and selling requires the $23.50 Portfolio tier or above. Photographers with only a few active galleries may prefer a metered service that costs less. Others move because they want contracts, automated print campaigns, annotations, or more explicit video workflows.',
          'The tradeoff is storage. Most alternatives meter capacity, limit file types, or reserve unlimited storage for expensive tiers. Estimate the delivered JPEG archive separately from RAW and video. A cheaper gallery may not remain cheaper after several years of retained work.',
        ],
      },
      {
        heading: 'The best replacement depends on the job',
        paragraphs: [
          'Wedding and portrait studios should compare Pixieset, Pic-Time, ShootProof, and CloudSpot. Commercial teams should put Picflow near the top because comments, annotations, versions, and approval states are more important than a print store. Editorial photographers with licensing and metadata needs should investigate PhotoShelter.',
          'Droptop fits photographers who do not need an integrated store and want an affordable place to deliver photos and videos. Its 1 TB Pro plan costs $20 per month—the same advertised annual entry price as SmugMug Direct—but Droptop also has smaller $5 and $12 plans. SmugMug remains stronger for an unlimited JPEG archive and longer platform history.',
        ],
      },
    ],
    faqs: [
      { question: 'What is the best free alternative to SmugMug?', answer: 'Droptop and CloudSpot each offer 5 GB free, Pixieset offers 3 GB, Picflow offers 2 GB, and ShootProof offers 100 photos. Check gallery-count, file-type, branding, and sales restrictions.' },
      { question: 'Which SmugMug alternative has unlimited storage?', answer: 'Pic-Time Advanced, CloudSpot Unlimited, Zenfolio Advanced for JPEGs, and PASS Unlimited advertise unlimited options. The included media types and acceptable-use terms differ.' },
      { question: 'Can I move from SmugMug without breaking client links?', answer: 'Existing URLs generally will not transfer. Run both services in parallel, rebuild one gallery, verify downloads and favorites, then communicate new links before closing the old account.' },
    ],
    related: ['smugmug-vs-pixieset', 'smugmug-pricing', 'smugmug-vs-zenfolio'],
  }),
  article({
    slug: 'smugmug-pricing',
    seoTitle: 'SmugMug Pricing in 2027: Plans, Fees and Storage Explained',
    h1: 'SmugMug Pricing: What Each Plan Actually Includes',
    description: 'Understand SmugMug Direct, Portfolio, and Pro pricing, unlimited JPEG storage, RAW add-on costs, selling access, and cheaper alternatives.',
    primaryQuery: 'SmugMug pricing',
    audience: 'Photographers comparing SmugMug plans and total cost',
    intent: 'Choose a plan and understand additional fees',
    dek: 'All SmugMug plans include unlimited full-resolution JPEG storage. The price differences are mainly about the website, selling, and professional client tools.',
    quickAnswer: 'SmugMug currently lists Direct at $20 per month billed annually, Portfolio at $23.50, and Pro at $37. Direct covers unlimited JPEG storage, privacy, and delivery. Portfolio adds a customizable website and selling. Pro adds stronger client and commerce controls. RAW storage is a separate add-on at $10 per month for the first terabyte and $6 for each additional terabyte.',
    hero: archiveHero,
    picks: [
      { productId: 'smugmug', angle: 'The reference choice for unlimited JPEG storage on every plan.' },
      { productId: 'pixieset', angle: 'A lower-entry alternative for metered client galleries.' },
      { productId: 'droptop', angle: 'A lower-cost alternative for private photo and video delivery.' },
      { productId: 'zenfolio', angle: 'A website and gallery alternative with an unlimited JPEG tier.' },
    ],
    sections: [
      {
        heading: 'Direct, Portfolio, and Pro serve different businesses',
        paragraphs: [
          'Direct is primarily for storing, organizing, privately sharing, and delivering a large JPEG library. Portfolio is the minimum current plan for photographers who want a customizable public website and the ability to sell. Pro adds features intended for client-facing businesses, including stronger favorites and download controls.',
          'SmugMug does not currently advertise a permanent free plan. The official page presents annual-billing prices, so photographers who want month-to-month flexibility should confirm the higher monthly rate at checkout. Taxes and any promotional period can also change the first invoice.',
        ],
      },
      {
        heading: 'Unlimited does not include every original file',
        paragraphs: [
          'The included unlimited storage is for full-resolution JPEG files. RAW storage uses a separate paid add-on, currently listed at $10 per month for the first terabyte and $6 for each additional terabyte. Video support and limits should be checked separately rather than inferred from the JPEG promise.',
          'For a delivery-only workflow, compare how many files remain online at once. Pixieset, Droptop, CloudSpot, and other metered services start much lower. SmugMug becomes easier to justify as the retained JPEG archive grows or when its site and store replace other subscriptions.',
        ],
      },
    ],
    faqs: [
      { question: 'Does SmugMug have a free plan?', answer: 'No permanent free plan is listed on the current plans page. SmugMug may offer a trial; confirm current trial terms on the official site.' },
      { question: 'Does SmugMug charge commission on sales?', answer: 'SmugMug retains a share of the markup on fulfilled sales. Review the current selling and profit documentation and calculate net revenue after product and payment costs.' },
      { question: 'Is SmugMug worth $20 per month?', answer: 'It can be for a large JPEG archive because storage is unlimited on Direct. It is harder to justify for a small number of temporary client galleries that could fit on a cheaper metered plan.' },
    ],
    related: ['best-smugmug-alternatives', 'smugmug-vs-pixieset', 'smugmug-vs-zenfolio'],
  }),
  article({
    slug: 'smugmug-vs-zenfolio',
    seoTitle: 'SmugMug vs Zenfolio: Storage, Websites and Sales Compared',
    h1: 'SmugMug vs Zenfolio: Which Photography Platform Is Better?',
    description: 'Compare SmugMug and Zenfolio pricing, unlimited storage, client galleries, portfolio websites, stores, video, booking, and volume photography tools.',
    primaryQuery: 'SmugMug vs Zenfolio',
    audience: 'Photographers choosing a long-term website, gallery, and selling platform',
    intent: 'Compare two mature photography hosting platforms',
    dek: 'SmugMug makes unlimited JPEG storage available immediately. Zenfolio reserves it for Advanced but bundles a wider set of studio and volume tools there.',
    quickAnswer: 'Choose SmugMug for unlimited JPEG storage on the lowest plan, a mature photo archive, and a portfolio connected to that archive. Choose Zenfolio when you want galleries and a website to expand into booking, video allowance, QR codes, and volume-event tools. Pricing varies by region for Zenfolio, so compare the checkout total in your market with SmugMug’s $20, $23.50, and $37 annual-billing tiers.',
    hero: studioHero,
    picks: [
      { productId: 'smugmug', angle: 'Best for unlimited JPEG storage from the entry plan.' },
      { productId: 'zenfolio', angle: 'Best for a website, gallery, store, and higher-tier volume workflow.' },
      { productId: 'pixieset', angle: 'Best alternative for a polished modular client-gallery suite.' },
      { productId: 'droptop', angle: 'Best affordable alternative for focused delivery rather than a website suite.' },
    ],
    sections: [
      {
        heading: 'Storage is simpler on SmugMug',
        paragraphs: [
          'SmugMug advertises unlimited full-resolution JPEG storage on Direct, Portfolio, and Pro. Zenfolio currently meters Basic at 15 GB and Professional at 150 GB, then advertises unlimited JPEG storage plus a separate 150 GB video allowance on Advanced.',
          'This gives SmugMug an advantage for a large JPEG archive at entry. Zenfolio Advanced may be more useful for a high-volume studio because the higher tier combines storage with business and event capabilities rather than selling storage alone.',
        ],
      },
      {
        heading: 'The website and business tools decide the winner',
        paragraphs: [
          'SmugMug Portfolio and Pro focus on showcasing and selling photographs from the same archive. Zenfolio Professional and Advanced combine portfolio pages, client galleries, proofing, selling, and additional business tools. Advanced adds booking and volume-oriented features such as QR workflows.',
          'Regional pricing makes a universal price winner difficult to name. Compare the annual checkout total, sales fees, video, RAW treatment, and the exact business tools you would otherwise buy elsewhere. If neither platform’s website or store is needed, a focused gallery service will usually cost less.',
        ],
      },
    ],
    faqs: [
      { question: 'Which is cheaper, SmugMug or Zenfolio?', answer: 'It depends on location, billing term, and tier because Zenfolio localizes prices. SmugMug’s current annual rates begin at $20 per month. Compare the final checkout totals in the same currency.' },
      { question: 'Which has unlimited storage?', answer: 'SmugMug includes unlimited full-resolution JPEG storage on all current plans. Zenfolio advertises unlimited JPEG storage on Advanced, with video separately limited to 150 GB.' },
      { question: 'Which is better for school or sports events?', answer: 'Zenfolio Advanced deserves closer consideration because of its higher-tier volume and QR workflow features. Test roster, privacy, ordering, and fulfillment with a real sample event.' },
    ],
    related: ['smugmug-pricing', 'zenfolio-vs-pixieset', 'best-zenfolio-alternatives'],
  }),
  article({
    slug: 'shootproof-vs-pixieset',
    seoTitle: 'ShootProof vs Pixieset: Galleries, Pricing and Sales Compared',
    h1: 'ShootProof vs Pixieset: Which Is Better for Your Studio?',
    description: 'Compare ShootProof and Pixieset client galleries, free plans, contracts, invoices, selling fees, storage, websites, booking, and delivery.',
    primaryQuery: 'ShootProof vs Pixieset',
    audience: 'Portrait, wedding, and event photographers choosing a gallery and studio workflow',
    intent: 'Compare ShootProof and Pixieset before subscribing',
    dek: 'ShootProof connects galleries to the back office. Pixieset gives the client-facing brand a broader modular home.',
    quickAnswer: 'Choose ShootProof when contracts, invoices, booking, gallery sales, and zero stated platform commission are central to your workflow. Choose Pixieset when you prioritize polished gallery presentation, a portfolio website, defined storage tiers, and a wider modular product family. Both offer free starting points, but ShootProof counts photos while Pixieset meters gigabytes.',
    hero: studioHero,
    picks: [
      { productId: 'shootproof', angle: 'Best for contracts, invoices, booking, galleries, and commission-free selling claims.' },
      { productId: 'pixieset', angle: 'Best for polished galleries and an expandable website and studio ecosystem.' },
      { productId: 'droptop', angle: 'Best when you only need affordable private delivery and client favorites.' },
    ],
    sections: [
      {
        heading: 'Their free plans measure capacity differently',
        paragraphs: [
          'ShootProof’s free plan is capped at 100 photos but allows unlimited galleries and advertises zero platform commission. That can be useful for testing the complete client and sales experience with a small portfolio. Pixieset’s free Client Gallery plan provides 3 GB and applies a 15% store commission.',
          'Paid ShootProof plans increase photo capacity and can reach unlimited photos. Pixieset uses 10 GB, 100 GB, and 1 TB storage tiers. Photo count is easier to understand for JPEG-only work; gigabytes are usually clearer when file sizes vary or videos are involved.',
        ],
      },
      {
        heading: 'ShootProof is more operational; Pixieset is more modular',
        paragraphs: [
          'ShootProof places contracts, invoices, mobile gallery apps, selling, and optional booking around the gallery workflow. It is a practical choice for a small studio that wants fewer separate administrative tools and values a zero-commission platform claim.',
          'Pixieset separates Client Gallery, Website, Studio Manager, Store, and Mobile Gallery Apps into products that can be combined. This creates more room to build a branded client journey, but the total suite price should be compared with the specific ShootProof tools you would use.',
        ],
      },
    ],
    faqs: [
      { question: 'Does ShootProof take commission?', answer: 'ShootProof currently advertises zero platform commission on sales. Card processing, lab, shipping, tax, and other costs can still apply.' },
      { question: 'Which free plan is better?', answer: 'ShootProof is attractive for a small number of photos and sales testing; Pixieset’s 3 GB allowance fits more images but its free store carries a 15% commission. Test your real gallery size.' },
      { question: 'Which is better for video delivery?', answer: 'Pixieset publishes video limits by paid plan. Verify ShootProof’s current video support with your file type and expected playback/download workflow before choosing it for mixed media.' },
    ],
    related: ['best-shootproof-alternatives', 'shootproof-pricing', 'cloudspot-vs-pixieset'],
  }),
  article({
    slug: 'best-shootproof-alternatives',
    seoTitle: '10 Best ShootProof Alternatives for Photographers in 2027',
    h1: '10 Best ShootProof Alternatives for Photographers',
    description: 'Compare ShootProof alternatives for client galleries, print sales, studio management, video, approvals, portfolios, unlimited storage, and lower-cost delivery.',
    primaryQuery: 'ShootProof alternatives',
    audience: 'Photographers seeking a replacement for ShootProof galleries or business tools',
    intent: 'Find a ShootProof alternative with the right workflow and price',
    dek: 'Replacing ShootProof means deciding whether the new service must replace its galleries, its back-office tools, its store—or all of them.',
    quickAnswer: 'Pixieset is the best broad ShootProof alternative. CloudSpot is the closest choice for galleries plus studio operations and mini sessions. Pic-Time is better for sales automation, while SmugMug is better for unlimited JPEG storage. Droptop is best for affordable photo and video delivery when contracts, invoices, and a store are not required.',
    hero: galleryHero,
    picks: [
      { productId: 'pixieset', angle: 'Best overall replacement for a polished gallery and modular suite.' },
      { productId: 'cloudspot', angle: 'Best for galleries, contracts, invoices, scheduling, and mini sessions.' },
      { productId: 'pictime', angle: 'Best for automated print sales, labs, and albums.' },
      { productId: 'smugmug', angle: 'Best for unlimited JPEG storage and portfolio hosting.' },
      { productId: 'droptop', angle: 'Best affordable replacement for private photo and video delivery.' },
      { productId: 'pass', angle: 'Best low-cost storefront alternative with campaign tools.' },
      { productId: 'picflow', angle: 'Best for collaborative comments, annotations, versions, and approvals.' },
      { productId: 'pixpa', angle: 'Best for an all-in-one portfolio, gallery, blog, and store.' },
      { productId: 'zenfolio', angle: 'Best for a website, store, and volume-event workflow.' },
      { productId: 'format', angle: 'Best for a design-led portfolio with lighter proofing needs.' },
    ],
    sections: [
      {
        heading: 'Decide which ShootProof tools must move together',
        paragraphs: [
          'A photographer using only ShootProof galleries can switch to almost any client-gallery platform. A studio using contracts, invoices, booking, lab fulfillment, and sales reports has a larger migration. CloudSpot and Pixieset Studio Manager deserve closer review because they can replace more of the operating workflow.',
          'Pic-Time and PASS are stronger candidates when store automation is the reason for changing. Picflow is the better fit for agencies and commercial clients who need comments, annotations, versions, and explicit approvals instead of print fulfillment.',
        ],
      },
      {
        heading: 'Compare total cost, not the promotional banner',
        paragraphs: [
          'ShootProof’s official plans page can feature promotional first-term pricing. Record the renewal rate shown at checkout before comparing it with an alternative’s standard annual cost. Include card fees, lab margins, booking add-ons, storage growth, and any replacement contract or invoicing service.',
          'Run one real job through each finalist. Send the contract or questionnaire, collect payment if relevant, upload the gallery, receive client favorites, deliver files, place a store order, and export records. Missing one frequently used step can erase the savings from a cheaper subscription.',
        ],
      },
    ],
    faqs: [
      { question: 'What is most similar to ShootProof?', answer: 'CloudSpot and Pixieset are the closest broad alternatives because both can connect client galleries with studio workflows. Feature coverage still differs, so map the exact tools you use.' },
      { question: 'Which ShootProof alternative has no platform commission?', answer: 'Pixpa and Format state zero platform commission, and paid Pixieset Client Gallery plans advertise commission-free store sales. Payment processing and fulfillment costs remain.' },
      { question: 'Is there a cheaper alternative just for delivery?', answer: 'Droptop starts free with 5 GB and paid plans begin at $5 per month. It does not replace ShootProof contracts, invoices, or print store.' },
    ],
    related: ['shootproof-vs-pixieset', 'shootproof-pricing', 'best-cloudspot-alternatives'],
  }),
  article({
    slug: 'shootproof-pricing',
    seoTitle: 'ShootProof Pricing in 2027: Plans, Limits and Fees',
    h1: 'ShootProof Pricing: Plans, Photo Limits and Selling Fees',
    description: 'Understand ShootProof pricing, its 100-photo free plan, paid photo limits, unlimited galleries, commission claims, promotions, and alternatives.',
    primaryQuery: 'ShootProof pricing',
    audience: 'Photographers comparing ShootProof plans or renewal costs',
    intent: 'Understand plan limits and total subscription cost',
    dek: 'ShootProof prices capacity by photo count rather than gigabytes. That is simple for JPEG galleries but makes direct storage comparisons less exact.',
    quickAnswer: 'ShootProof offers a free plan for up to 100 photos and paid tiers that increase capacity to an unlimited-photo option. The official page advertises unlimited galleries and zero platform commission across its plans. Because ShootProof frequently displays introductory promotions, check the normal renewal rate and billing term shown at checkout before making a long-term comparison.',
    hero: studioHero,
    picks: [
      { productId: 'shootproof', angle: 'The reference choice for photo-count plans and a gallery-plus-business workflow.' },
      { productId: 'pixieset', angle: 'A storage-metered comparison with 3 GB free and paid suite options.' },
      { productId: 'cloudspot', angle: 'A gallery and studio-suite comparison with gigabyte tiers.' },
      { productId: 'droptop', angle: 'A lower-cost delivery comparison with transparent GB-based plans.' },
    ],
    sections: [
      {
        heading: 'The free plan is useful, but 100 photos goes quickly',
        paragraphs: [
          'ShootProof’s free tier is enough to build a sample gallery, test favorites and selling, or serve a small portrait session. Unlimited gallery count does not remove the account-wide 100-photo capacity. Wedding and event photographers will normally need a paid tier after the first complete job.',
          'The zero-platform-commission claim is meaningful for sellers, but it does not eliminate payment processing, lab costs, shipping, taxes, refunds, or optional services. Compare a typical order’s net profit rather than treating commission as the only store expense.',
        ],
      },
      {
        heading: 'Promotional pricing needs a renewal check',
        paragraphs: [
          'ShootProof’s current pricing presentation may show time-limited discounts. That makes a single evergreen dollar figure misleading. At checkout, note the introductory total, subscription length, standard renewal total, cancellation terms, and whether booking or other capabilities cost extra.',
          'Compare capacity using a real job. A 100-photo limit and a 5 GB limit are not equivalent because JPEG size varies. Export a finished gallery, calculate its photo count and total bytes, then compare it against ShootProof, Pixieset, CloudSpot, and Droptop on the same annual workload.',
        ],
      },
    ],
    faqs: [
      { question: 'Is ShootProof free?', answer: 'Yes, the current free plan supports up to 100 photos and unlimited galleries. Storage capacity, branding, and business features increase on paid tiers.' },
      { question: 'Does ShootProof charge a sales commission?', answer: 'ShootProof advertises zero platform commission. Card processing and the underlying cost of lab products, shipping, taxes, and refunds still affect profit.' },
      { question: 'Why does the ShootProof price I see differ?', answer: 'The plans page may display a promotion, and annual and monthly billing differ. Confirm the standard renewal total in checkout rather than relying only on the promotional headline.' },
    ],
    related: ['shootproof-vs-pixieset', 'best-shootproof-alternatives', 'cloudspot-vs-pixieset'],
  }),
  article({
    slug: 'cloudspot-vs-pixieset',
    seoTitle: 'CloudSpot vs Pixieset: Galleries, Pricing and Studio Tools',
    h1: 'CloudSpot vs Pixieset: Which Is Better for Photographers?',
    description: 'Compare CloudSpot and Pixieset pricing, free storage, gallery limits, commission, contracts, invoices, mini sessions, websites, and video.',
    primaryQuery: 'CloudSpot vs Pixieset',
    audience: 'Photographers choosing a client gallery with optional studio tools',
    intent: 'Compare CloudSpot and Pixieset plans and workflow',
    dek: 'CloudSpot’s strongest story is studio operations and mini sessions. Pixieset’s is a polished, modular client experience with clearer expansion across products.',
    quickAnswer: 'Choose CloudSpot when its contracts, invoices, questionnaires, scheduling, and mini-session workflow can replace separate studio tools. Choose Pixieset when you want a polished gallery with a portfolio website and modular Studio Manager. Both have free plans; CloudSpot provides 5 GB but limits free accounts to three galleries and JPEGs, while Pixieset provides 3 GB.',
    hero: studioHero,
    picks: [
      { productId: 'cloudspot', angle: 'Best for galleries paired with studio management and mini sessions.' },
      { productId: 'pixieset', angle: 'Best for a polished modular gallery, website, store, and studio ecosystem.' },
      { productId: 'droptop', angle: 'Best affordable option for focused delivery without studio administration.' },
    ],
    sections: [
      {
        heading: 'The free tiers look similar until you inspect the limits',
        paragraphs: [
          'CloudSpot provides 5 GB free, but the free plan is limited to three galleries and JPEG uploads. Its Entry tier currently has a $7 list price and 15 GB, while the full studio suite begins higher up the plan family. Free and Entry store sales carry a 15% platform commission.',
          'Pixieset provides 3 GB free with a 15% store commission. Basic starts at $8 per month billed annually for 10 GB and removes the platform sales commission. Plus provides 100 GB for $16, and Pro provides 1 TB for $24. Plan value changes when Studio Manager or Website is added.',
        ],
      },
      {
        heading: 'CloudSpot is compelling when mini sessions are a core product',
        paragraphs: [
          'CloudSpot’s broader suite connects galleries with contracts, questionnaires, invoices, scheduling, and mini-session tools. A seasonal portrait business may save time when slot selection, payment, paperwork, and delivery live in one workflow.',
          'Pixieset’s product family is broader and visually cohesive, but photographers should compare the exact Studio Manager capabilities and total suite price. Businesses outside the United States should also confirm CloudSpot’s invoicing and payment availability for their location before migrating.',
        ],
      },
    ],
    faqs: [
      { question: 'Does CloudSpot have more free storage than Pixieset?', answer: 'Yes. CloudSpot currently lists 5 GB free versus Pixieset’s 3 GB. CloudSpot Free is limited to three galleries and JPEG files, so capacity is not the only difference.' },
      { question: 'Which is better for mini sessions?', answer: 'CloudSpot deserves the closer look because mini-session tools are a prominent part of its studio suite. Test booking, payment, reminders, contracts, and gallery delivery as one workflow.' },
      { question: 'Which has lower store fees?', answer: 'CloudSpot Free and Entry and Pixieset Free list 15% platform commissions. CloudSpot Lite and above and paid Pixieset Client Gallery plans advertise commission-free selling, excluding payment and fulfillment costs.' },
    ],
    related: ['best-cloudspot-alternatives', 'shootproof-vs-pixieset', 'pictime-vs-pixieset'],
  }),
  article({
    slug: 'best-cloudspot-alternatives',
    seoTitle: '10 Best CloudSpot Alternatives for Photographers in 2027',
    h1: '10 Best CloudSpot Alternatives for Photographers',
    description: 'Compare CloudSpot alternatives for galleries, studio management, mini sessions, print sales, video delivery, approvals, portfolios, and storage.',
    primaryQuery: 'CloudSpot alternatives',
    audience: 'Photographers seeking a different gallery or studio-management platform',
    intent: 'Find the best replacement for CloudSpot',
    dek: 'The right CloudSpot alternative depends on whether its galleries, studio suite, mini-session workflow, or storefront is the part you need to replace.',
    quickAnswer: 'Pixieset is the strongest all-round CloudSpot alternative. ShootProof is best for galleries tied to contracts and invoices. Pic-Time is best for print automation. Droptop is the affordable choice for photo and video delivery without studio tools. Picflow is best for commercial approvals, while SmugMug is best for unlimited JPEG storage.',
    hero: galleryHero,
    picks: [
      { productId: 'pixieset', angle: 'Best overall alternative for a modular client-gallery and studio ecosystem.' },
      { productId: 'shootproof', angle: 'Best for contracts, invoices, booking, and gallery selling.' },
      { productId: 'pictime', angle: 'Best for automated print sales, labs, and albums.' },
      { productId: 'droptop', angle: 'Best affordable alternative for private photo and video delivery.' },
      { productId: 'smugmug', angle: 'Best for unlimited full-resolution JPEG storage.' },
      { productId: 'zenfolio', angle: 'Best for websites, selling, and volume-event workflows.' },
      { productId: 'pass', angle: 'Best for low-cost store campaigns and unlimited higher tiers.' },
      { productId: 'picflow', angle: 'Best for commercial review and approval workflows.' },
      { productId: 'pixpa', angle: 'Best for an all-in-one website, blog, store, and galleries.' },
      { productId: 'format', angle: 'Best for a design-focused portfolio with client galleries.' },
    ],
    sections: [
      {
        heading: 'Gallery-only users have the most alternatives',
        paragraphs: [
          'If CloudSpot is only being used to deliver JPEG galleries, Pixieset, Droptop, Pic-Time, PASS, and SmugMug can all replace the core sharing job. Compare gallery count, storage, password access, favorites, download sizes, video, branding, and the experience of receiving email on a phone.',
          'Droptop provides the simplest cost ladder for delivery: 5 GB free, then 10 GB for $5, 100 GB for $12, and 1 TB for $20 per month. It is not a replacement for CloudSpot contracts, invoices, scheduling, mini sessions, or print fulfillment.',
        ],
      },
      {
        heading: 'Studio-suite users should migrate a full client journey',
        paragraphs: [
          'Photographers using CloudSpot’s contracts, questionnaires, invoices, and scheduling should compare ShootProof and Pixieset Studio Manager first. Mini-session businesses need to test slot limits, deposits, rescheduling, reminders, tax handling, and what happens when a client books multiple children or groups.',
          'Do not cancel after testing only the gallery design. Move one live lead from inquiry to delivered files and accounting export. Keep independent copies of contracts, invoices, questionnaires, payment records, client selections, and original media because those records may not transfer automatically.',
        ],
      },
    ],
    faqs: [
      { question: 'What is the closest alternative to CloudSpot?', answer: 'Pixieset and ShootProof are the closest broad alternatives because they combine galleries with business tools. Their mini-session, payment, and store details differ.' },
      { question: 'Which alternative is best outside the United States?', answer: 'Availability varies by feature. Verify payment processing, invoicing, taxes, currency, labs, and payouts in your country directly with each provider before moving.' },
      { question: 'Is there a free CloudSpot alternative?', answer: 'Droptop offers 5 GB free, Pixieset offers 3 GB, Picflow offers 2 GB, and ShootProof offers 100 photos. Each free plan has different limits.' },
    ],
    related: ['cloudspot-vs-pixieset', 'best-shootproof-alternatives', 'best-pictime-alternatives'],
  }),
  article({
    slug: 'zenfolio-vs-pixieset',
    seoTitle: 'Zenfolio vs Pixieset: Pricing, Storage and Features Compared',
    h1: 'Zenfolio vs Pixieset: Which Photography Platform Is Better?',
    description: 'Compare Zenfolio and Pixieset on client galleries, websites, storage, video, proofing, stores, booking, pricing, and volume-event features.',
    primaryQuery: 'Zenfolio vs Pixieset',
    audience: 'Photographers choosing an all-in-one website and client-gallery platform',
    intent: 'Compare Zenfolio and Pixieset before subscribing',
    dek: 'Pixieset is easier to enter and assemble one product at a time. Zenfolio becomes more distinctive at the high end, where volume tools and unlimited JPEG storage meet.',
    quickAnswer: 'Choose Pixieset for a free starting plan, polished client galleries, and a modular suite that can grow through Website and Studio Manager. Choose Zenfolio if its higher-tier booking, QR, volume-event, and unlimited-JPEG capabilities match your business. Zenfolio pricing varies by region; compare the actual checkout total with Pixieset’s published annual rates.',
    hero: studioHero,
    picks: [
      { productId: 'zenfolio', angle: 'Best for higher-tier volume events, QR workflows, booking, and unlimited JPEG storage.' },
      { productId: 'pixieset', angle: 'Best for polished client galleries and modular growth from a free plan.' },
      { productId: 'droptop', angle: 'Best affordable alternative when you need delivery rather than an all-in-one suite.' },
    ],
    sections: [
      {
        heading: 'Zenfolio’s strongest advantages appear on Advanced',
        paragraphs: [
          'Zenfolio Basic includes 15 GB, while Professional provides 150 GB and adds stronger selling capabilities. Advanced advertises unlimited JPEG storage, a separate 150 GB video allowance, booking, and volume-oriented features. That combination is relevant to school, sports, and event businesses that need more than a beautiful gallery.',
          'Pixieset Client Gallery progresses from 3 GB free to 10 GB, 100 GB, and 1 TB paid plans. Its Website and Studio Manager can be added separately. This is useful when a photographer wants to begin with delivery and adopt the rest of the suite only when needed.',
        ],
      },
      {
        heading: 'Regional pricing makes feature value more important',
        paragraphs: [
          'Zenfolio displays different prices by market and billing term, so a fixed global comparison can be inaccurate. Open both checkouts in the same currency and compare the annual total, renewal price, taxes, sales fees, storage, video, and business features.',
          'For wedding and portrait delivery, judge the mobile gallery, favorites, proofing, download sizes, privacy, and presentation. For volume work, test QR assignment, participant privacy, batch communication, ordering, and fulfillment with a real small event. The better platform may differ between those two businesses.',
        ],
      },
    ],
    faqs: [
      { question: 'Which has more storage?', answer: 'Zenfolio Advanced advertises unlimited JPEG storage plus 150 GB of video. Pixieset Client Gallery currently tops out at 1 TB on Pro.' },
      { question: 'Does Zenfolio have a free plan?', answer: 'Zenfolio does not currently list a permanent free plan. Pixieset Client Gallery includes 3 GB free with limitations including a store commission.' },
      { question: 'Which is better for volume photography?', answer: 'Zenfolio Advanced deserves closer review because it includes higher-tier QR and volume tools. Run a test event before depending on it for school or sports operations.' },
    ],
    related: ['best-zenfolio-alternatives', 'smugmug-vs-zenfolio', 'smugmug-vs-pixieset'],
  }),
  article({
    slug: 'best-zenfolio-alternatives',
    seoTitle: '10 Best Zenfolio Alternatives for Photographers in 2027',
    h1: '10 Best Zenfolio Alternatives for Photographers',
    description: 'Compare Zenfolio alternatives for client galleries, portfolio websites, print sales, volume events, studio management, video, approvals, and storage.',
    primaryQuery: 'Zenfolio alternatives',
    audience: 'Photographers looking for a modern, cheaper, or more specialized alternative to Zenfolio',
    intent: 'Find a suitable Zenfolio replacement',
    dek: 'Zenfolio spans websites, galleries, sales, booking, and volume work. Most alternatives are better at one of those jobs rather than identical across all of them.',
    quickAnswer: 'Pixieset is the best overall Zenfolio alternative for polished galleries and modular studio tools. SmugMug is best for unlimited JPEG storage from the entry plan. Pic-Time is strongest for print automation, while CloudSpot suits studio and mini-session operations. Droptop is the affordable delivery choice, and Picflow is better for commercial review and approvals.',
    hero: galleryHero,
    picks: [
      { productId: 'pixieset', angle: 'Best overall replacement for polished galleries and modular business tools.' },
      { productId: 'smugmug', angle: 'Best for unlimited JPEG storage on every current plan.' },
      { productId: 'pictime', angle: 'Best for automated print campaigns, labs, and albums.' },
      { productId: 'cloudspot', angle: 'Best for a studio suite and mini-session workflow.' },
      { productId: 'droptop', angle: 'Best affordable replacement for private photo and video delivery.' },
      { productId: 'shootproof', angle: 'Best for galleries, contracts, invoices, and commission-free sales claims.' },
      { productId: 'pixpa', angle: 'Best all-in-one website, blog, store, and gallery builder.' },
      { productId: 'format', angle: 'Best for a design-led portfolio and lighter client galleries.' },
      { productId: 'picflow', angle: 'Best for commercial review, versioning, and approvals.' },
      { productId: 'pass', angle: 'Best for a low-cost storefront and campaign-led sales.' },
    ],
    sections: [
      {
        heading: 'Match the alternative to the part of Zenfolio you use',
        paragraphs: [
          'A portfolio photographer should compare Pixpa, Format, SmugMug, and Pixieset Website. A wedding studio should focus on Pixieset, Pic-Time, ShootProof, and CloudSpot. Commercial teams should consider Picflow, while high-volume operators need to verify that an alternative can handle roster, QR, privacy, and fulfillment requirements.',
          'There is little value in replacing an all-in-one subscription with four disconnected services unless the resulting workflow is materially better. List the website, forms, booking, payments, contracts, gallery, favorites, store, archive, and reporting functions that are used each month, then price their replacements together.',
        ],
      },
      {
        heading: 'Storage comparisons need a file-type check',
        paragraphs: [
          'Zenfolio Advanced advertises unlimited JPEG storage but meters video separately at 150 GB. SmugMug also advertises unlimited JPEG storage and sells RAW capacity as an add-on. Pic-Time, CloudSpot, and PASS reserve unlimited offers for higher tiers. Droptop uses transparent fixed capacities up to 1 TB.',
          'Before moving, download a full-resolution copy of every original that must be retained. Rebuild one gallery and compare file counts, metadata, cover presentation, favorites, download permissions, and mobile behavior. Client links and selections do not necessarily migrate with the files.',
        ],
      },
    ],
    faqs: [
      { question: 'What is the closest alternative to Zenfolio?', answer: 'Pixieset is the closest broad alternative for galleries, website, selling, and studio tools. SmugMug is closer if the main requirement is an unlimited JPEG archive and portfolio.' },
      { question: 'Which Zenfolio alternative is cheapest?', answer: 'For delivery, Droptop starts free and paid plans begin at $5 per month. The cheapest complete replacement depends on whether you also need a website, store, booking, and contracts.' },
      { question: 'Which alternative is best for school photography?', answer: 'Do not choose from a general feature list alone. Test roster import, QR assignment, privacy, packages, tax, payment, fulfillment, and parent support with a small event.' },
    ],
    related: ['zenfolio-vs-pixieset', 'smugmug-vs-zenfolio', 'best-smugmug-alternatives'],
  }),
  article({
    slug: 'pixpa-vs-pixieset',
    seoTitle: 'Pixpa vs Pixieset: Websites, Galleries and Pricing Compared',
    h1: 'Pixpa vs Pixieset: Which Is Better for Photographers?',
    description: 'Compare Pixpa and Pixieset on portfolio websites, client galleries, proofing, stores, blogging, commission, storage, studio tools, and pricing.',
    primaryQuery: 'Pixpa vs Pixieset',
    audience: 'Photographers choosing between an all-in-one website builder and a modular photography suite',
    intent: 'Compare Pixpa and Pixieset before choosing a platform',
    dek: 'Pixpa puts the website, blog, store, and galleries into one subscription. Pixieset lets photographers assemble a deeper client ecosystem product by product.',
    quickAnswer: 'Choose Pixpa when you want an all-in-one portfolio website, blog, ecommerce, and client galleries with zero stated platform commission. Choose Pixieset when client-gallery presentation, proofing, video allowances, and integration with Studio Manager matter more. Compare final storage and annual checkout totals because Pixpa promotions and plan details can change.',
    hero: galleryHero,
    picks: [
      { productId: 'pixpa', angle: 'Best for an all-in-one portfolio website, blog, store, and client galleries.' },
      { productId: 'pixieset', angle: 'Best for polished client galleries and an expandable studio ecosystem.' },
      { productId: 'droptop', angle: 'Best affordable choice when a website and store are not required.' },
      { productId: 'format', angle: 'A useful design-led portfolio comparison.' },
    ],
    sections: [
      {
        heading: 'Pixpa is the simpler website bundle',
        paragraphs: [
          'Pixpa combines portfolio pages, blogging, ecommerce, and client galleries in a single website product. It states that it charges no platform commission, although payment processors still charge fees. This can be attractive to a photographer who wants one subscription and does not need a separate studio-management system.',
          'Pixieset offers a more specialized product family. Client Gallery can be used alone, then Website, Store, Studio Manager, and Mobile Gallery Apps can be added. The result can be deeper for a photography studio, but pricing should include every selected product rather than only the Client Gallery tier.',
        ],
      },
      {
        heading: 'Pixieset has the clearer gallery-first path',
        paragraphs: [
          'Pixieset publishes distinct Client Gallery storage and video allowances and is widely oriented around delivery, favorites, downloads, and store presentation. Pixpa client galleries sit inside a broader website builder, which is convenient but may feel less specialized for studios delivering frequent high-volume jobs.',
          'Build the same portfolio page and client gallery on both trials. Compare theme flexibility, mobile performance, image quality, proofing, password access, download controls, blog publishing, SEO fields, store checkout, and how long routine updates take. The better site is the one the photographer can keep current.',
        ],
      },
    ],
    faqs: [
      { question: 'Does Pixpa charge commission?', answer: 'Pixpa states that it charges zero platform commission. Payment processing, tax, fulfillment, and other transaction costs can still apply.' },
      { question: 'Which is better for blogging?', answer: 'Pixpa includes blogging as part of its all-in-one website proposition. Pixieset should be evaluated through its current Website features if editorial publishing is important.' },
      { question: 'Which is cheaper?', answer: 'It depends on which Pixieset products are combined and the current Pixpa plan or promotion. Compare annual renewal totals with the storage, store, blog, and studio tools you actually need.' },
    ],
    related: ['format-vs-pixieset', 'pictime-vs-pixieset', 'best-pixieset-alternatives'],
  }),
  article({
    slug: 'format-vs-pixieset',
    seoTitle: 'Format vs Pixieset: Portfolios, Galleries and Pricing Compared',
    h1: 'Format vs Pixieset: Which Is Better for Your Photography Website?',
    description: 'Compare Format and Pixieset portfolio websites, client galleries, storage, video, stores, commission, studio tools, pricing, and ideal users.',
    primaryQuery: 'Format vs Pixieset',
    audience: 'Photographers choosing a portfolio site with client-gallery capabilities',
    intent: 'Choose between Format and Pixieset',
    dek: 'Format leads with portfolio design. Pixieset leads with the client-delivery journey and then extends outward into the rest of the studio.',
    quickAnswer: 'Choose Format when the public portfolio is the main product and client galleries are a supporting feature. Choose Pixieset when private proofing, favorites, delivery, store workflows, and studio tools are more important. Format Basic normally starts at $10 per month billed annually with 70 portfolio images, 10 client galleries, and 2 GB of file transfers; Pixieset Client Gallery starts free with 3 GB.',
    hero: galleryHero,
    picks: [
      { productId: 'format', angle: 'Best for a design-led portfolio with a modest client-gallery workflow.' },
      { productId: 'pixieset', angle: 'Best for client delivery, proofing, stores, and modular studio growth.' },
      { productId: 'pixpa', angle: 'A useful all-in-one website, blog, store, and gallery comparison.' },
      { productId: 'droptop', angle: 'Best affordable companion when only private delivery is needed.' },
    ],
    sections: [
      {
        heading: 'Format’s limits are tied to the portfolio and transfers',
        paragraphs: [
          'Format Basic currently lists a normal annual-billing price of $10 per month and includes 70 portfolio images, 10 client galleries, and 2 GB of file transfers. Pro increases capacity to 100 GB with 50 galleries and 5 GB of transfers. Pro Plus reaches 1 TB and includes more hosted video and store capacity.',
          'Pixieset Client Gallery meters account storage instead: 3 GB free, 10 GB Basic, 100 GB Plus, and 1 TB Pro. Its paid plans publish video duration and resolution limits. The two pricing models should be tested with a typical year of portfolio updates and client deliveries, not a single sample gallery.',
        ],
      },
      {
        heading: 'Choose based on where clients spend their time',
        paragraphs: [
          'Format is compelling when art directors, editors, or prospective clients spend most of their time on the public site. Its templates and portfolio workflow are the center of the product, while client galleries and commerce support the main presentation.',
          'Pixieset is more natural when booked clients spend most of their time selecting, downloading, and buying from private collections. Its separate Website can still present a portfolio, but the platform’s broader value comes from connecting the client journey across gallery and studio products.',
        ],
      },
    ],
    faqs: [
      { question: 'Is Format cheaper than Pixieset?', answer: 'Format Basic’s normal annual rate is $10 per month; Pixieset Client Gallery has a free plan and paid plans from $8 per month annually. Their included website and gallery capabilities differ.' },
      { question: 'Does Format charge sales commission?', answer: 'Format states zero platform commission on its store. Payment processors and product or fulfillment costs still apply.' },
      { question: 'Which is better for client proofing?', answer: 'Pixieset is generally the more gallery-focused option. Test both with favorites, password access, mobile viewing, download sizes, and a real client email before deciding.' },
    ],
    related: ['pixpa-vs-pixieset', 'smugmug-vs-pixieset', 'best-pixieset-alternatives'],
  }),
  article({
    slug: 'picflow-vs-pixieset',
    seoTitle: 'Picflow vs Pixieset: Proofing and Client Galleries Compared',
    h1: 'Picflow vs Pixieset: Which Proofing Workflow Is Better?',
    description: 'Compare Picflow and Pixieset on proofing, comments, annotations, approvals, versions, favorites, client galleries, stores, storage, and pricing.',
    primaryQuery: 'Picflow vs Pixieset',
    audience: 'Commercial and portrait photographers comparing two different proofing models',
    intent: 'Choose between collaborative approval and traditional client galleries',
    dek: 'Picflow is built for teams discussing and approving creative work. Pixieset is built for photographers presenting and delivering finished galleries to clients.',
    quickAnswer: 'Choose Picflow for commercial review: it supports comments, annotations, approval states, versions, and unlimited reviewers. Choose Pixieset for polished consumer client galleries, favorites, downloads, video delivery, and an integrated store. Picflow starts free with 2 GB and scales to 100 GB, 1 TB, and 5 TB tiers; it does not provide a print store.',
    hero: proofingHero,
    picks: [
      { productId: 'picflow', angle: 'Best for comments, annotations, versions, approvals, and agency review.' },
      { productId: 'pixieset', angle: 'Best for polished delivery, favorites, downloads, and print sales.' },
      { productId: 'droptop', angle: 'Best affordable option for simple private delivery after approval is complete.' },
      { productId: 'photoshelter', angle: 'A useful alternative for metadata-heavy editorial proofing.' },
    ],
    sections: [
      {
        heading: 'Picflow provides a richer feedback loop',
        paragraphs: [
          'Picflow’s review tools go beyond a favorites list. Reviewers can comment, annotate images, move work through approval states, and compare versions. Unlimited reviewers reduce friction when an agency, client team, retoucher, and producer all need to participate.',
          'Pixieset favorites are more natural for a portrait or wedding client choosing images. Its strength is the presentation that follows: finished collections, controlled downloads, video allowances, and store access. It is not designed to behave like a creative production review workspace.',
        ],
      },
      {
        heading: 'Commerce is the dividing line',
        paragraphs: [
          'Picflow has no print store. A commercial team often does not need one, because the deliverable is approved media rather than consumer products. Its paid storage ladder—100 GB Plus, 1 TB Pro, and 5 TB Business—also fits a project-review model.',
          'Pixieset includes store capabilities and applies a 15% commission on its free plan, while paid Client Gallery tiers advertise commission-free selling. Photographers who expect clients to buy prints should choose Pixieset or another commerce platform. Teams that need precise feedback should value the hours saved in revision cycles instead.',
        ],
      },
    ],
    faqs: [
      { question: 'Does Picflow have a print store?', answer: 'No. Picflow focuses on proofing, feedback, approvals, and delivery rather than print fulfillment.' },
      { question: 'Which is better for commercial photography?', answer: 'Picflow is usually stronger when several stakeholders need comments, annotations, versions, and explicit approvals. Pixieset is stronger for a polished end-client gallery and store.' },
      { question: 'Can clients favorite images in both?', answer: 'Yes, but Picflow places selections inside a broader review workflow. Pixieset favorites are closely tied to traditional client-gallery proofing and delivery.' },
    ],
    related: ['photoshelter-vs-pixieset', 'format-vs-pixieset', 'best-pixieset-alternatives'],
  }),
  article({
    slug: 'pass-gallery-vs-pixieset',
    seoTitle: 'PASS Gallery vs Pixieset: Pricing, Storage and Sales',
    h1: 'PASS Gallery vs Pixieset: Which Client Gallery Is Better?',
    description: 'Compare PASS Gallery and Pixieset pricing, storage, commissions, Smart Store campaigns, unlimited plans, client delivery, video, and studio tools.',
    primaryQuery: 'PASS Gallery vs Pixieset',
    audience: 'Photographers comparing affordable galleries with selling tools',
    intent: 'Choose between PASS Gallery and Pixieset',
    dek: 'PASS keeps the entry price low and emphasizes automated store sales. Pixieset offers a more expansive product family and a clearer premium storage ladder.',
    quickAnswer: 'Choose PASS when you want a low-cost gallery with Smart Store campaigns and the option to move to unlimited storage. Choose Pixieset when you want a polished gallery connected to Website and Studio Manager, plus explicitly published photo and video tiers. PASS Starter is $1 per month billed annually for 10 GB but carries a 15% sales fee; Pixieset offers 3 GB free with the same percentage commission.',
    hero: printHero,
    picks: [
      { productId: 'pass', angle: 'Best for a very low entry price and store campaign automation.' },
      { productId: 'pixieset', angle: 'Best for polished delivery and a broader modular studio ecosystem.' },
      { productId: 'pictime', angle: 'A stronger premium comparison for automated sales and labs.' },
      { productId: 'droptop', angle: 'Best affordable alternative when a store is not required.' },
    ],
    sections: [
      {
        heading: 'PASS has the lower paid entry price',
        paragraphs: [
          'PASS currently lists Starter at $1 per month billed annually with 10 GB and a 15% sales fee. Basic costs $6 annually or $8 monthly with 20 GB. Standard costs $20 annually or $24 monthly with 100 GB and a 3% fee. Unlimited is listed at $38 annually or $44 monthly.',
          'Pixieset starts free with 3 GB and a 15% store commission. Basic costs $8 per month annually for 10 GB, Plus costs $16 for 100 GB, and Pro costs $24 for 1 TB. Paid Client Gallery plans advertise commission-free sales, although card and fulfillment costs remain.',
        ],
      },
      {
        heading: 'Commission changes the comparison for active sellers',
        paragraphs: [
          'PASS Starter can cost almost nothing as a subscription, but a photographer with meaningful sales should model the 15% fee. Standard lowers the listed fee to 3%, while the official pricing page should be checked for the current treatment of other tiers and payment setup.',
          'Pixieset may cost more each month but can produce a lower total platform cost for a store with enough revenue. PASS remains attractive when its Smart Store campaigns generate incremental orders. Compare net profit over a full year, including subscription, commission, processing, lab cost, refunds, and the time spent creating campaigns.',
        ],
      },
    ],
    faqs: [
      { question: 'Is PASS cheaper than Pixieset?', answer: 'PASS has a lower paid entry price. Its Starter plan lists 10 GB for $1 per month billed annually, but carries a 15% sales fee. Total cost depends on store revenue.' },
      { question: 'Does PASS offer unlimited storage?', answer: 'PASS currently lists an Unlimited plan. Review supported file types, acceptable-use terms, video, and billing conditions on the official pricing page.' },
      { question: 'Which has lower selling fees?', answer: 'Paid Pixieset Client Gallery plans advertise commission-free selling. PASS lists 15% on Starter and 3% on Standard. Payment processing and fulfillment remain on both.' },
    ],
    related: ['pictime-vs-pixieset', 'pictime-pricing', 'sell-digital-photos-pixieset-alternatives'],
  }),
  article({
    slug: 'photoshelter-vs-pixieset',
    seoTitle: 'PhotoShelter vs Pixieset: Proofing, Archive and Galleries',
    h1: 'PhotoShelter vs Pixieset: Which Is Better for Photographers?',
    description: 'Compare PhotoShelter and Pixieset for client proofing, favorites, metadata, archive, licensing, galleries, stores, video, downloads, and pricing.',
    primaryQuery: 'PhotoShelter vs Pixieset',
    audience: 'Editorial, commercial, portrait, and event photographers choosing a proofing platform',
    intent: 'Choose between archive-led professional tools and consumer client galleries',
    dek: 'PhotoShelter is strongest when photographs live inside an archive, metadata, and licensing workflow. Pixieset is strongest when a client needs a beautiful, simple gallery.',
    quickAnswer: 'Choose PhotoShelter for editorial archives, metadata, searchable assets, commercial proofing, and licensing-oriented workflows. Choose Pixieset for wedding, portrait, and event galleries with polished presentation, favorites, downloads, video allowances, and a consumer print store. PhotoShelter’s photographer proofing tool supports favorites, custom sets, notes, and filename-based workflows; confirm current pricing directly because plan availability can vary.',
    hero: proofingHero,
    picks: [
      { productId: 'photoshelter', angle: 'Best for editorial archives, metadata, proofing, and licensing-oriented work.' },
      { productId: 'pixieset', angle: 'Best for polished wedding, portrait, and event client galleries.' },
      { productId: 'picflow', angle: 'Best alternative for collaborative annotations, versions, and approvals.' },
      { productId: 'droptop', angle: 'Best affordable option for straightforward private delivery.' },
    ],
    sections: [
      {
        heading: 'The proofing experiences serve different clients',
        paragraphs: [
          'PhotoShelter documents a client proofing tool where recipients can favorite images, build custom sets, add notes, and return selections using filenames. That fits editorial and commercial workflows in which metadata, archive structure, and the photographer’s master catalog remain important after approval.',
          'Pixieset is more natural for consumers choosing wedding, portrait, family, and event photographs. Collections emphasize cover presentation, sets, favorites, password access, controlled downloads, video, and store products. A client can move from first view to download or purchase without needing to understand an archive system.',
        ],
      },
      {
        heading: 'PhotoShelter is an archive decision as much as a gallery decision',
        paragraphs: [
          'PhotoShelter should be evaluated on search, metadata preservation, licensing, access control, and how efficiently an old image can be found and delivered. Its value is easier to justify for a working editorial library than for a photographer who only needs temporary private galleries.',
          'Pixieset publishes straightforward Client Gallery storage tiers from 3 GB free to 1 TB Pro. It is easier to budget for active client work, but it is not designed to replace a metadata-rich editorial asset library. If collaborative annotations and formal approval states matter more than either platform’s strengths, Picflow is the more specialized comparison.',
        ],
      },
    ],
    faqs: [
      { question: 'Which is better for editorial photographers?', answer: 'PhotoShelter is generally better aligned with metadata, archive search, proofing, and licensing. Verify the current photographer plan and the exact delivery workflow you need.' },
      { question: 'Which is better for weddings and portraits?', answer: 'Pixieset is usually the more natural fit because its collections, favorites, downloads, video allowances, and store are designed for consumer clients.' },
      { question: 'Can PhotoShelter clients select favorites?', answer: 'Yes. PhotoShelter’s official proofing documentation describes favorites, custom sets, notes, and filename-based selection workflows.' },
    ],
    related: ['picflow-vs-pixieset', 'best-pixieset-alternatives', 'format-vs-pixieset'],
  }),
];
