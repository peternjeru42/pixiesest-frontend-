export type BlogSource = {
  id: string;
  name: string;
  url: string;
  verified: string;
};

export type BlogProduct = {
  id: string;
  name: string;
  bestFor: string;
  entry: string;
  storage: string;
  commerce: string;
  summary: string;
  strengths: string[];
  limitations: string[];
  sourceIds: string[];
};

export type ArticlePick = {
  productId: string;
  angle: string;
};

export type BlogArticle = {
  slug: string;
  seoTitle: string;
  h1: string;
  description: string;
  primaryQuery: string;
  audience: string;
  intent: string;
  dek: string;
  quickAnswer: string;
  hero: { src: string; alt: string; caption: string };
  picks: ArticlePick[];
  criteria: string[];
  workflow: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
  related: string[];
  imagePlan: string[];
  score: { research: number; usefulness: number; accuracy: number; seo: number; editorial: number };
};

export const researchDate = 'November 17, 2026';
export const publishedDate = '2026-11-17';

export const sources: BlogSource[] = [
  { id: 'droptop', name: 'Droptop pricing and product overview', url: '/#pricing', verified: researchDate },
  { id: 'pixieset', name: 'Pixieset Client Gallery pricing', url: 'https://pixieset.com/pricing/', verified: researchDate },
  { id: 'pixieset-downloads', name: 'Pixieset download settings', url: 'https://help.pixieset.com/hc/en-us/articles/115003795572-Collection-download-settings', verified: researchDate },
  { id: 'pixieset-favorites', name: 'Pixieset favorites export documentation', url: 'https://help.pixieset.com/hc/en-us/articles/115003003931-How-do-I-download-my-client-s-Favorites', verified: researchDate },
  { id: 'pixieset-billing', name: 'Pixieset subscription and cancellation documentation', url: 'https://help.pixieset.com/hc/en-us/articles/115003816812-Managing-your-Pixieset-subscription', verified: researchDate },
  { id: 'pictime', name: 'Pic-Time official pricing', url: 'https://onboarding.pic-time.com/pricing', verified: researchDate },
  { id: 'shootproof', name: 'ShootProof official plans', url: 'https://www.shootproof.com/plans/', verified: researchDate },
  { id: 'cloudspot', name: 'CloudSpot official pricing', url: 'https://cloudspot.io/pricing', verified: researchDate },
  { id: 'smugmug', name: 'SmugMug official plans', url: 'https://www.smugmug.com/plans', verified: researchDate },
  { id: 'zenfolio', name: 'Zenfolio official plans', url: 'https://zenfolio.com/plans-pricing/', verified: researchDate },
  { id: 'picflow', name: 'Picflow official pricing', url: 'https://picflow.com/pricing', verified: researchDate },
  { id: 'pixpa', name: 'Pixpa official pricing', url: 'https://www.pixpa.com/pricing', verified: researchDate },
  { id: 'format', name: 'Format official pricing', url: 'https://www.format.com/pricing-portfolio', verified: researchDate },
  { id: 'picdrop', name: 'picdrop official pricing', url: 'https://www.picdrop.com/web/pricing', verified: researchDate },
  { id: 'pass', name: 'PASS Gallery official pricing', url: 'https://passgallery.com/pricing', verified: researchDate },
  { id: 'photodeck', name: 'PhotoDeck official plans', url: 'https://www.photodeck.com/plans/', verified: researchDate },
  { id: 'photoshelter', name: 'PhotoShelter proofing documentation', url: 'https://support.photoshelter.com/hc/en-us/articles/204396664-Client-Proofing-Tool', verified: researchDate },
  { id: 'lightroom', name: 'Adobe Lightroom official plans', url: 'https://www.adobe.com/products/photoshop-lightroom/plans.html', verified: researchDate },
  { id: 'googlephotos', name: 'Google Photos official sharing overview', url: 'https://www.google.com/photos/about/', verified: researchDate },
  { id: 'dropbox', name: 'Dropbox official individual plans', url: 'https://www.dropbox.com/individual/', verified: researchDate },
  { id: 'flickr', name: 'Flickr official pricing FAQ', url: 'https://www.flickrhelp.com/hc/en-us/articles/4404064001812-Pricing-FAQ', verified: researchDate },
];

export const products: BlogProduct[] = [
  {
    id: 'droptop', name: 'Droptop', bestFor: 'Affordable photo and video delivery', entry: 'Free; paid from $5/month', storage: '5 GB free; 10 GB, 100 GB, or 1,000 GB paid', commerce: 'No integrated print store yet',
    summary: 'Droptop is a focused client-gallery platform for photographers who want private sharing, favorites, photo and video delivery, and controlled downloads without paying for a larger studio suite.',
    strengths: ['Low monthly entry price', 'Password-protected galleries and download PINs', 'Photo and video delivery with client favorites'],
    limitations: ['No integrated print-lab storefront at publication time', 'Smaller ecosystem and track record than long-established platforms'], sourceIds: ['droptop'],
  },
  {
    id: 'pictime', name: 'Pic-Time', bestFor: 'Print sales and gallery marketing', entry: '$7/month billed yearly', storage: '20 GB entry; 100 GB Professional; unlimited Advanced', commerce: 'Print store, labs, campaigns; fee rules depend on plan and payment setup',
    summary: 'Pic-Time puts sales automation, worldwide labs, an album builder, and polished client galleries in one product. It is a strong fit when the gallery is expected to generate revenue after delivery.',
    strengths: ['Marketing automations and print-store workflow', 'Worldwide lab network and album tools', 'Unlimited tier available'],
    limitations: ['100 GB costs more than several delivery-first competitors', 'Commission-free sales require a qualifying setup'], sourceIds: ['pictime'],
  },
  {
    id: 'shootproof', name: 'ShootProof', bestFor: 'Galleries plus contracts and invoices', entry: 'Free; Starter $8.33/month billed yearly', storage: '3 GB photo-only free; 20 GB Starter; up to unlimited photos', commerce: 'Commission-free sales on every plan; processing fees still apply',
    summary: 'ShootProof combines galleries with invoicing, contracts, selling, mobile gallery apps, and optional booking. Its free plan is unusually practical for photographers who sell because ShootProof states that it takes no sales commission.',
    strengths: ['Zero platform commission on sales', 'Contracts and invoices on paid plans', 'Unlimited galleries and a free photo-only tier'],
    limitations: ['Free storage excludes video', 'Booking and archive services can add cost'], sourceIds: ['shootproof'],
  },
  {
    id: 'cloudspot', name: 'CloudSpot', bestFor: 'A combined gallery and studio workflow', entry: 'Free; Entry $7/month list price', storage: '5 GB free; 15 GB Entry; 100 GB Lite; unlimited tier', commerce: '15% on Free and Entry; commission-free from Lite, plus payment processing',
    summary: 'CloudSpot moves from a lightweight gallery product into contracts, questionnaires, invoices, scheduling, and mini-session tools on its suite tiers.',
    strengths: ['5 GB free tier', 'Studio tools from Lite', 'Unlimited galleries from Lite'],
    limitations: ['Free is limited to three galleries and JPEG files', 'The cheaper tiers carry a sales commission'], sourceIds: ['cloudspot'],
  },
  {
    id: 'smugmug', name: 'SmugMug', bestFor: 'Unlimited JPEG storage and a portfolio site', entry: '$20/month billed yearly', storage: 'Unlimited full-resolution JPEG storage; RAW storage is an add-on', commerce: 'Selling starts on Portfolio; SmugMug retains a share of markup',
    summary: 'SmugMug is the storage-led option: every current plan advertises unlimited full-resolution JPEG storage, with privacy controls and digital delivery. Higher tiers add a website and storefront.',
    strengths: ['Unlimited JPEG storage on every plan', 'Website, Lightroom integration, and human support', 'Mature privacy and delivery controls'],
    limitations: ['No permanent free plan', 'Commerce requires a higher tier and carries a markup share'], sourceIds: ['smugmug'],
  },
  {
    id: 'zenfolio', name: 'Zenfolio', bestFor: 'Website, delivery, sales, and volume events', entry: '$7/month billed yearly for Basic', storage: '15 GB Basic; 150 GB Professional; unlimited JPEG on Advanced', commerce: 'Store on Professional and Advanced; verify regional fees before committing',
    summary: 'Zenfolio combines a portfolio website, client galleries, proofing, selling, and higher-tier volume tools. Advanced adds booking and unlimited JPEG storage with a separate video allowance.',
    strengths: ['Strong storage value on annual billing', 'QR and volume workflows on higher tiers', 'Website and proofing included'],
    limitations: ['No permanent free plan', 'Annual and month-to-month prices differ substantially'], sourceIds: ['zenfolio'],
  },
  {
    id: 'picflow', name: 'Picflow', bestFor: 'Commercial proofing and approvals', entry: 'Free tier available', storage: '2 GB free; 100 GB Plus; 1 TB Pro', commerce: 'No print store',
    summary: 'Picflow is a review and approval workspace rather than a print-sales platform. It supports favorites, comments, annotations, approval states, version control, and unlimited reviewers.',
    strengths: ['Purpose-built approval workflow', 'Unlimited reviewers and galleries', 'Free plan has no stated time limit'],
    limitations: ['No integrated store', 'A wedding photographer selling prints would need a second service'], sourceIds: ['picflow'],
  },
  {
    id: 'pixpa', name: 'Pixpa', bestFor: 'Portfolio, galleries, and zero-commission sales', entry: 'All-in-one plans from $9/month before term discounts', storage: '3 GB to 100 GB on all-in-one plans; gallery-only tiers extend higher', commerce: 'Pixpa states zero platform commission; processor fees apply',
    summary: 'Pixpa pairs a portfolio website with private client galleries, proofing, downloads, and ecommerce. Standalone gallery plans are also available for photographers who already have a site.',
    strengths: ['Website and client galleries together', 'Favorites, comments, ratings, and selling', 'Zero stated platform commission'],
    limitations: ['Promotional and renewal prices differ', 'Storage on low all-in-one tiers is modest'], sourceIds: ['pixpa'],
  },
  {
    id: 'format', name: 'Format', bestFor: 'Portfolio-first photographers', entry: 'Pro $12/month billed yearly', storage: '100 GB Pro; 1 TB Pro Plus', commerce: 'Commission-free online store advertised',
    summary: 'Format is primarily a portfolio website builder, with client galleries, proofing, contracts, file transfer, and a store layered into its professional plans.',
    strengths: ['Strong portfolio presentation', '100 GB at the Pro annual price', 'Proofing and workflow tools in one site'],
    limitations: ['Not a free gallery service', 'Sales automation is less central than on Pic-Time or PASS'], sourceIds: ['format'],
  },
  {
    id: 'picdrop', name: 'picdrop', bestFor: 'Fast collaborative proofing and delivery', entry: 'Free tier; paid pricing varies by term and region', storage: '1 GB and 3 galleries free; 500 GB Pro; 1 TB Advanced', commerce: 'No integrated print store',
    summary: 'picdrop emphasizes quick review, client selections, direct uploads, delivery, and team workflows. It supports broad image and video formats and hosts customer data in Germany.',
    strengths: ['Generous paid storage', 'Collaboration and presentation modes', 'Broad file-format support'],
    limitations: ['Free plan is small', 'No print-sales workflow'], sourceIds: ['picdrop'],
  },
  {
    id: 'pass', name: 'PASS Gallery', bestFor: 'Automated print sales', entry: 'Starter $1/month billed yearly', storage: '10 GB introductory Starter; 20 GB Basic; 100 GB Standard; unlimited tier', commerce: 'Commission varies by tier; 0% on Basic according to current pricing',
    summary: 'PASS focuses on gallery presentation and a SmartStore with automated campaigns. Its low entry prices are attractive, but photographers should compare the storage changes and sales fee on each tier carefully.',
    strengths: ['Low subscription entry', 'Print-store marketing and gallery templates', 'Unlimited-storage tier'],
    limitations: ['Starter storage changes after the introductory period', 'Commission and store functionality vary by plan'], sourceIds: ['pass'],
  },
  {
    id: 'photodeck', name: 'PhotoDeck', bestFor: 'Multilingual delivery and image licensing', entry: '$12/month billed yearly', storage: '10 GB Essential; higher tiers add storage', commerce: 'No platform commission; payment processing and plan costs remain',
    summary: 'PhotoDeck combines a customizable website, private proofing galleries, file delivery, and image licensing. It is particularly relevant to commercial and editorial photographers who need more than consumer print sales.',
    strengths: ['Private galleries and proofing', 'Multilingual sites and licensing tools', 'No stated sales commission'],
    limitations: ['Entry storage is only 10 GB', 'More configuration than a delivery-only gallery'], sourceIds: ['photodeck'],
  },
  {
    id: 'photoshelter', name: 'PhotoShelter', bestFor: 'Editorial archives and licensing workflows', entry: 'Pricing varies by photographer or organization plan', storage: 'Plan-dependent', commerce: 'Supports licensing and sales; fees vary by account tier',
    summary: 'PhotoShelter is strongest where client proofing meets searchable archives, editorial distribution, or image licensing. Its proofing tool can isolate a gallery and return client selections to the photographer.',
    strengths: ['Professional proofing workflow', 'Licensing and archive orientation', 'Lightroom-friendly selection workflow'],
    limitations: ['Pricing is less straightforward than most gallery tools', 'Overkill for simple wedding delivery'], sourceIds: ['photoshelter'],
  },
  {
    id: 'lightroom', name: 'Adobe Lightroom shared albums', bestFor: 'Photographers already editing in Lightroom', entry: '$11.99/month annual plan, billed monthly', storage: '1 TB on the Lightroom plan', commerce: 'No integrated client print store',
    summary: 'Lightroom shared albums minimize export and upload friction for photographers already living in Adobe’s cloud workflow. They are useful for review and simple sharing, but are not a full branded gallery business system.',
    strengths: ['Editing and sharing in one workflow', '1 TB included on the current Lightroom plan', 'Easy collaborator invitations'],
    limitations: ['No print storefront or studio management', 'Less control over the branded client journey'], sourceIds: ['lightroom'],
  },
  {
    id: 'googlephotos', name: 'Google Photos', bestFor: 'Casual shared albums', entry: 'Free with Google account storage', storage: 'Uses the account’s Google storage allowance', commerce: 'No photographer storefront',
    summary: 'Google Photos makes it easy to create a shared album or link and is familiar to many clients. It is a practical zero-cost delivery fallback, not a branded proofing or sales system.',
    strengths: ['Familiar mobile experience', 'Simple album links and collaboration', 'Useful for informal delivery'],
    limitations: ['No custom branding, proofing workflow, or store', 'Storage is shared with other Google services'], sourceIds: ['googlephotos'],
  },
  {
    id: 'dropbox', name: 'Dropbox', bestFor: 'Simple file handoff', entry: '2 GB free', storage: '2 GB free; paid storage varies by plan', commerce: 'No photographer storefront',
    summary: 'Dropbox is dependable for transferring folders and accepting file requests. It does not reproduce the gallery presentation, favorites, proofing, or sales experience photographers expect from Pixieset.',
    strengths: ['Straightforward file and folder delivery', 'File requests and large transfers on qualifying plans', 'Widely understood by business clients'],
    limitations: ['Not a photography gallery', 'No favorites, print fulfillment, or visual storytelling'], sourceIds: ['dropbox'],
  },
  {
    id: 'flickr', name: 'Flickr Pro', bestFor: 'Unlimited sharing and a photography community', entry: '$82/year in the US', storage: 'Unlimited full-resolution photo storage on Pro', commerce: 'No client print-sales workflow comparable to Pixieset',
    summary: 'Flickr Pro offers unlimited full-resolution photo sharing and backup plus community discovery. It works as an archive and showcase, but not as a white-label client proofing system.',
    strengths: ['Unlimited Pro photo storage', 'Photography-focused community', 'Public and private sharing controls'],
    limitations: ['Not designed around private client delivery', 'No integrated studio or print-lab workflow'], sourceIds: ['flickr'],
  },
];

const commonCriteria = [
  'Price the plan you will actually need after twelve months, including annual-billing requirements and renewal rates.',
  'Compare photo storage, video allowances, file-size limits, gallery limits, and whether archived work still counts.',
  'Separate platform commission from card-processing fees, lab costs, taxes, and shipping.',
  'Test the client journey on a phone: access, favorites, single downloads, full-gallery ZIPs, and checkout.',
  'Keep your own independent archive. A client gallery is a delivery layer, not your only backup.',
];

const standardFaqs = [
  { question: 'Is there one best Pixieset alternative for everyone?', answer: 'No. Delivery-first photographers, print sellers, commercial proofing teams, and high-volume event studios have different constraints. Choose by the workflow that generates revenue or saves the most time, then compare the storage tier that matches your real annual volume.' },
  { question: 'Should a client gallery replace my backup?', answer: 'No. Keep at least one independent copy of originals and exports. Gallery platforms are optimized for presentation, proofing, sales, and delivery; subscription changes or account problems should never be able to remove your only copy.' },
  { question: 'Are annual prices directly comparable?', answer: 'Only when the billing term and renewal price are the same. Several services show an effective monthly price that requires a full-year payment, while others use introductory discounts. The tables here label annual pricing and link to the vendor page for a final checkout check.' },
];

export const articles: BlogArticle[] = [
  {
    slug: 'best-pixieset-alternatives', seoTitle: '15 Best Pixieset Alternatives for Photographers in 2027', h1: '15 Best Pixieset Alternatives for Photographers in 2027',
    description: 'Compare 15 Pixieset alternatives by storage, pricing, proofing, sales, video, and workflow. Official sources checked November 2026.', primaryQuery: 'best Pixieset alternatives 2027', audience: 'Professional and emerging photographers comparing client-gallery platforms', intent: 'Commercial comparison: build a shortlist and choose a replacement',
    dek: 'The right replacement depends on whether you need a storefront, a proofing workspace, unlimited storage, or simply a polished way to deliver files.',
    quickAnswer: 'For print-led galleries, start with Pic-Time or ShootProof. For unlimited JPEG storage, compare SmugMug and Zenfolio Advanced. For commercial approvals, Picflow or picdrop is a better fit. Droptop is the low-cost delivery-first option when you need private photo and video galleries but not an integrated print store.',
    hero: { src: 'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=1800&q=85', alt: 'Photographer reviewing images on a camera beside a laptop', caption: 'Choose the platform around the work clients do after delivery—not around the longest feature list.' },
    picks: [
      ['droptop', 'Best low-cost delivery-first alternative.'], ['pictime', 'Best for automated print revenue.'], ['shootproof', 'Best for business tools and commission-free sales.'], ['cloudspot', 'Best all-in-one studio workflow.'], ['smugmug', 'Best mature unlimited-storage option.'], ['zenfolio', 'Best for a website plus volume-event tools.'], ['picflow', 'Best for approvals and annotated feedback.'], ['pixpa', 'Best value portfolio-and-gallery bundle.'], ['format', 'Best for a design-led portfolio.'], ['picdrop', 'Best collaborative delivery tool.'], ['pass', 'Best store automation at a low entry price.'], ['photodeck', 'Best for multilingual licensing.'], ['photoshelter', 'Best for editorial archives.'], ['lightroom', 'Best for Adobe-native sharing.'], ['googlephotos', 'Best informal no-frills sharing.'],
    ].map(([productId, angle]) => ({ productId, angle })), criteria: commonCriteria,
    workflow: [
      { title: 'Start with the client action', body: 'Write down what a client must do: select proofs, download originals, buy prints, find themselves in a large event, or approve a commercial layout. This removes products that are impressive but irrelevant.' },
      { title: 'Model two years of storage', body: 'Multiply average delivered gallery size by annual jobs and retention period. Include video separately. Compare the tier you reach, not the free tier used for a trial.' },
      { title: 'Run one real delivery test', body: 'Upload a representative gallery, open it on a phone without being logged in, make selections, download files, and—if relevant—place a test order. We did not create paid accounts for every vendor, so product-level findings in this guide are documentation-based unless stated otherwise.' },
    ], faqs: standardFaqs, related: ['free-pixieset-alternatives', 'affordable-pixieset-alternatives', 'switch-from-pixieset'],
    imagePlan: ['A real Droptop public-gallery screenshot showing mobile and desktop layouts.', 'A neutral workflow diagram: upload → client review → favorites → download or purchase.', 'A storage-cost chart generated from current official plan data.'], score: { research: 19, usefulness: 19, accuracy: 20, seo: 18, editorial: 17 },
  },
  {
    slug: 'free-pixieset-alternatives', seoTitle: '10 Best Free Pixieset Alternatives for Client Photo Galleries', h1: '10 Best Free Pixieset Alternatives for Client Photo Galleries',
    description: 'A fact-checked guide to free Pixieset alternatives, including storage, gallery, video, branding, and sales limits.', primaryQuery: 'free Pixieset alternatives', audience: 'New photographers and low-volume studios that cannot justify a paid gallery yet', intent: 'Find a usable free client gallery and understand its limits',
    dek: 'Free is useful only when its first limit matches your workflow. Storage, gallery count, branding, video, and sales fees matter more than the $0 price.',
    quickAnswer: 'Droptop offers 5 GB for private delivery, ShootProof offers 3 GB of photos with zero stated sales commission, CloudSpot offers 5 GB but caps free users at three galleries, and Picflow offers 2 GB for review work. Google Photos and Dropbox cost nothing to start but do not provide a professional proofing or store experience.',
    hero: { src: 'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&w=1800&q=85', alt: 'Camera and photographs arranged on a clean desk', caption: 'A free plan is a workflow test—not a substitute for calculating the paid tier you will eventually need.' },
    picks: [
      ['droptop', 'Best free balance for polished delivery with 5 GB.'], ['shootproof', 'Best free choice when you want to sell without platform commission.'], ['cloudspot', 'Best free storage if three galleries are enough.'], ['picflow', 'Best free proofing workspace.'], ['picdrop', 'Best for three small collaborative galleries.'], ['googlephotos', 'Best for familiar family or community sharing.'], ['dropbox', 'Best for a straightforward folder handoff.'], ['pictime', 'Best product to trial when print marketing is the eventual goal.'], ['flickr', 'Best free community showcase, not private proofing.'], ['pixpa', 'Best no-card trial for a website-and-gallery bundle.'],
    ].map(([productId, angle]) => ({ productId, angle })),
    criteria: ['Count active galleries, not just gigabytes.', 'Check whether free storage accepts video and original-resolution downloads.', 'Calculate the cost of sales commission before assuming free is cheaper.', 'Confirm whether your logo, domain, and password controls require payment.', 'Export or delete completed jobs so a tiny free account remains manageable.'],
    workflow: [
      { title: 'Use a representative gallery', body: 'A 20-image test hides the limits that appear with a full wedding or event. Upload the file types and approximate count you normally deliver.' },
      { title: 'Check the first paid step', body: 'The free tier is temporary for most working photographers. Compare the next tier now so you do not have to migrate during a busy season.' },
      { title: 'Know what free does not buy', body: 'A Google Photos album or Dropbox folder can deliver files, but it does not provide the branded proofing and sales experience of a dedicated client-gallery platform.' },
    ], faqs: [
      { question: 'Is Pixieset itself free?', answer: 'Yes. Pixieset lists a free Client Gallery plan with 3 GB, unlimited galleries, and a 15% platform commission on store sales. Paid Client Gallery plans remove that commission.' },
      { question: 'Which free alternative has the most verified storage?', answer: 'Among the dedicated gallery products in this guide, Droptop and CloudSpot each list 5 GB. CloudSpot limits the free plan to three galleries; Droptop is delivery-first and does not yet provide an integrated print store.' },
      ...standardFaqs.slice(1),
    ], related: ['best-pixieset-alternatives', 'affordable-pixieset-alternatives', 'websites-like-pixieset'],
    imagePlan: ['Side-by-side captures of free-plan limit screens after account creation.', 'A calculator graphic showing when a 15% sales fee exceeds a paid subscription.', 'A mobile client-download test on Droptop, ShootProof, and CloudSpot.'], score: { research: 19, usefulness: 20, accuracy: 19, seo: 18, editorial: 17 },
  },
  {
    slug: 'affordable-pixieset-alternatives', seoTitle: 'Best Affordable Pixieset Alternatives for Professional Photographers', h1: 'Best Affordable Pixieset Alternatives for Professional Photographers',
    description: 'Compare affordable Pixieset alternatives using real storage tiers, annual prices, commerce fees, and workflow tradeoffs.', primaryQuery: 'affordable Pixieset alternatives', audience: 'Working photographers reducing recurring software costs without downgrading client delivery', intent: 'Compare total cost at realistic professional usage',
    dek: 'The least expensive subscription is not always the least expensive workflow. Sales commission, storage upgrades, and a second CRM can reverse the result.',
    quickAnswer: 'Droptop is the lowest-cost focused option at $5 for 10 GB, $12 for 100 GB, and $20 for 1,000 GB. Pic-Time starts at $7 for 20 GB, while ShootProof starts at $8.33 billed annually and includes business tools. Format is unusually competitive when you also need a portfolio site: its Pro annual plan lists 100 GB at $12 per month.',
    hero: { src: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1800&q=85', alt: 'Notebook, calculator, and camera budget planning', caption: 'Compare the whole workflow cost: gallery, storage, commerce fees, website, and studio tools.' },
    picks: [
      ['droptop', 'Best storage-per-dollar for delivery-only studios.'], ['pictime', 'Best inexpensive entry into automated print sales.'], ['shootproof', 'Best value when contracts and invoices replace separate subscriptions.'], ['cloudspot', 'Best value when Lite can replace a gallery and studio manager.'], ['zenfolio', 'Best annual value for 150 GB plus a website.'], ['format', 'Best affordable portfolio bundle.'], ['pass', 'Best low entry price for store-led galleries.'], ['photodeck', 'Best affordable licensing-oriented website.'],
    ].map(([productId, angle]) => ({ productId, angle })), criteria: commonCriteria,
    workflow: [
      { title: 'Calculate an effective monthly cost', body: 'Add annual subscription cost, expected platform commission, required add-ons, and any separate website or contract software. Divide by twelve only after including upfront annual payments.' },
      { title: 'Put a value on migration', body: 'A $3 monthly saving is not worthwhile if it takes two working days to rebuild active galleries. Migrate only live jobs and recent archives unless a client contract requires longer availability.' },
      { title: 'Choose the narrowest complete product', body: 'Delivery-only studios should not pay for booking tools they will not use. Conversely, a more expensive suite can be cheaper if it replaces contracts, invoicing, and scheduling services.' },
    ], faqs: standardFaqs, related: ['free-pixieset-alternatives', 'best-pixieset-alternatives', 'switch-from-pixieset'],
    imagePlan: ['A two-year cost chart at 10 GB, 100 GB, and 1 TB.', 'Screenshots of annual-versus-monthly toggles on official pricing pages.', 'A Droptop pricing and gallery-delivery workflow capture.'], score: { research: 19, usefulness: 19, accuracy: 20, seo: 18, editorial: 17 },
  },
  {
    slug: 'websites-like-pixieset', seoTitle: '7 Websites Like Pixieset for Sharing Photos With Clients', h1: '7 Websites Like Pixieset for Sharing Photos With Clients',
    description: 'Seven websites like Pixieset compared for private links, proofing, favorites, downloads, video, branding, and stores.', primaryQuery: 'websites like Pixieset', audience: 'Photographers moving beyond Drive folders or comparing direct gallery replacements', intent: 'Find a close functional substitute for sharing client photos',
    dek: 'A true Pixieset-like service should do more than host files: it should present a gallery, control access, collect selections, and deliver the right resolution.',
    quickAnswer: 'Droptop, Pic-Time, ShootProof, CloudSpot, Picflow, Pixpa, and Format are the closest choices in this comparison. Droptop is best for focused delivery; Pic-Time and ShootProof for selling; CloudSpot for studio tools; Picflow for approvals; Pixpa and Format for a portfolio site plus galleries.',
    hero: { src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1800&q=85', alt: 'Professional camera beside a laptop used to share client photos', caption: 'The closest alternative is the one that preserves your client’s familiar path from link to selection to download.' },
    picks: [
      ['droptop', 'Closest lean alternative for photos, video, favorites, and downloads.'], ['pictime', 'Closest sales-focused alternative.'], ['shootproof', 'Closest gallery-plus-business alternative.'], ['cloudspot', 'Closest suite-style alternative.'], ['picflow', 'Closest proofing alternative for commercial work.'], ['pixpa', 'Closest website-and-gallery bundle at a modest price.'], ['format', 'Closest design-led portfolio alternative.'],
    ].map(([productId, angle]) => ({ productId, angle })),
    criteria: ['A private or password-protected gallery link', 'Client favorites, comments, or approval states', 'Single-file and full-gallery download controls', 'Mobile-friendly layouts and useful branding controls', 'A store only if clients actually buy through galleries'],
    workflow: [
      { title: 'Map Pixieset features you use today', body: 'Review recent galleries and mark which settings were enabled: sets, favorites, download PIN, web-size files, originals, store, video, or email capture.' },
      { title: 'Ignore unused equivalence', body: 'A replacement does not need every Pixieset module. It needs the smaller set of functions that your clients and team use repeatedly.' },
      { title: 'Test a client without instructions', body: 'Send the trial gallery to someone who has never used the platform. If they cannot find favorites and downloads on a phone, the feature list is irrelevant.' },
    ], faqs: standardFaqs, related: ['best-pixieset-alternatives', 'free-pixieset-alternatives', 'switch-from-pixieset'],
    imagePlan: ['Phone screenshots of the same five-step client journey on each finalist.', 'A visual checklist for password, favorites, download, and store testing.', 'A real Droptop gallery with photo and video tiles.'], score: { research: 18, usefulness: 20, accuracy: 20, seo: 18, editorial: 17 },
  },
  {
    slug: 'pixieset-alternatives-wedding-photographers', seoTitle: 'Best Pixieset Alternatives for Wedding Photographers in 2027', h1: 'Best Pixieset Alternatives for Wedding Photographers',
    description: 'Compare wedding gallery platforms for delivery, video, favorites, albums, print sales, mobile clients, and long-term storage.', primaryQuery: 'Pixieset alternatives for wedding photographers', audience: 'Wedding photographers delivering hundreds of images and optional films or print products', intent: 'Select a gallery that supports a complete wedding delivery and sales workflow',
    dek: 'Wedding galleries must handle emotional presentation, large downloads, family sharing, album selections, and—often—post-delivery print sales.',
    quickAnswer: 'Pic-Time is the strongest fit for automated print and album sales. ShootProof is better when contracts and invoices belong in the same system. SmugMug and Zenfolio suit long-term archives. Droptop is the affordable option for private photo and video delivery when integrated print fulfillment is not required.',
    hero: { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85', alt: 'Wedding couple walking outdoors after their ceremony', caption: 'A wedding gallery is both a delivery product and, for many studios, a post-wedding storefront.' },
    picks: [
      ['pictime', 'Best for post-wedding print campaigns and albums.'], ['shootproof', 'Best for tying contracts, invoices, galleries, and sales together.'], ['cloudspot', 'Best for mini-sessions and studio administration around weddings.'], ['droptop', 'Best budget delivery option for photo and video.'], ['smugmug', 'Best for retaining a large JPEG archive.'], ['zenfolio', 'Best for a website, store, and long-term wedding archive.'], ['pass', 'Best for an automated storefront with a low starting subscription.'],
    ].map(([productId, angle]) => ({ productId, angle })),
    criteria: ['Upload one full wedding, not a styled-shoot sample.', 'Check separate video quotas and playback quality.', 'Test family sharing, favorites, album selections, and ZIP downloads on mobile.', 'Model print revenue after platform commission and processing costs.', 'Decide how many years finished galleries remain available.'],
    workflow: [
      { title: 'Build a wedding test gallery', body: 'Include 600–800 JPEGs, at least two sets, a short film if you deliver video, and the same download rules used for a paying client.' },
      { title: 'Invite the couple and a parent', body: 'Different generations expose navigation problems quickly. Ask both people to favorite ten images and download the full gallery without coaching.' },
      { title: 'Test the post-delivery month', body: 'Schedule a print campaign or create a mock album selection. If you never sell from galleries, prefer lower-cost delivery over features that add complexity.' },
    ], faqs: standardFaqs, related: ['best-pixieset-alternatives', 'sell-digital-photos-pixieset-alternatives', 'switch-from-pixieset'],
    imagePlan: ['A real 700-image gallery loading test on mobile.', 'Album-selection and favorite-list screenshots.', 'A video playback and download demonstration in Droptop.'], score: { research: 18, usefulness: 20, accuracy: 19, seo: 19, editorial: 17 },
  },
  {
    slug: 'pixieset-alternatives-event-photographers', seoTitle: 'Best Pixieset Alternatives for Event Photographers in 2027', h1: 'Best Pixieset Alternatives for Event Photographers',
    description: 'Event gallery alternatives compared for QR access, high-volume delivery, search, registration, storage, video, and sales.', primaryQuery: 'Pixieset alternatives for event photographers', audience: 'Corporate, school, sports, nightlife, and high-volume event photographers', intent: 'Choose a gallery that can distribute large event jobs efficiently',
    dek: 'Event photography changes the evaluation: one-to-many access, QR workflows, search, registration, fast publishing, and high image counts matter more than album design.',
    quickAnswer: 'Zenfolio is the strongest documented option here for QR and volume workflows. ShootProof is strong for commission-free sales and gallery administration. SmugMug is useful when storage dominates. Droptop works for straightforward private event delivery, but studios needing face or bib search should choose a platform that explicitly documents those tools.',
    hero: { src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1800&q=85', alt: 'Large concert crowd under blue event lighting', caption: 'At event scale, discoverability and distribution can matter more than gallery decoration.' },
    picks: [
      ['zenfolio', 'Best documented volume and QR workflow.'], ['shootproof', 'Best for event sales without platform commission.'], ['smugmug', 'Best when a large archive drives the decision.'], ['droptop', 'Best for simple private event delivery at low cost.'], ['cloudspot', 'Best for event galleries attached to a studio workflow.'], ['pictime', 'Best when event galleries should drive print revenue.'], ['picdrop', 'Best for rapid team review and client delivery.'],
    ].map(([productId, angle]) => ({ productId, angle })),
    criteria: ['QR access, pre-registration, or bulk invitation capability', 'Search by face, bib, metadata, or gallery section where required', 'Upload and publishing behavior for thousands of files', 'Guest privacy and consent for public or semi-public events', 'Per-event profitability after storage and sales fees'],
    workflow: [
      { title: 'Classify the event', body: 'A private corporate gala, a youth sports tournament, and a nightclub gallery have different privacy and discovery requirements. Do not choose one workflow for all three.' },
      { title: 'Load-test discovery', body: 'Upload a representative high-volume set and ask a guest to find their images. If manual scrolling is unacceptable, require a documented search or registration workflow.' },
      { title: 'Plan the publishing cadence', body: 'Test whether the team can publish during the event, after each session, or only after a complete upload. Fast access is part of the product for event clients.' },
    ], faqs: standardFaqs, related: ['best-pixieset-alternatives', 'unlimited-storage-pixieset-alternatives', 'sell-digital-photos-pixieset-alternatives'],
    imagePlan: ['A QR-to-gallery workflow recorded at an actual event.', 'A 5,000-image search and loading benchmark.', 'Guest registration and privacy-setting screenshots.'], score: { research: 18, usefulness: 20, accuracy: 19, seo: 19, editorial: 17 },
  },
  {
    slug: 'pixieset-alternatives-portrait-photographers', seoTitle: 'Best Pixieset Alternatives for Portrait Photographers in 2027', h1: 'Best Pixieset Alternatives for Portrait Photographers',
    description: 'Portrait gallery alternatives compared for proofing, selection limits, retouching notes, downloads, print sales, and branding.', primaryQuery: 'Pixieset alternatives for portrait photographers', audience: 'Portrait, headshot, family, newborn, and branding photographers', intent: 'Find a proofing and sales workflow suited to smaller, high-touch galleries',
    dek: 'Portrait photographers usually need fewer files than event studios, but more precise proofing: selection limits, retouch notes, versions, and a controlled final delivery.',
    quickAnswer: 'Picflow is strongest for approvals and annotations, while ShootProof and Pic-Time are stronger for selling. Pixpa combines a site, proofing, and zero stated platform commission. Droptop suits photographers who want a clean, inexpensive favorites-and-delivery workflow without a store.',
    hero: { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1800&q=85', alt: 'Portrait subject photographed in soft natural light', caption: 'For portrait work, the quality of selection and feedback often matters more than raw storage.' },
    picks: [
      ['picflow', 'Best for detailed selections, comments, and approvals.'], ['shootproof', 'Best for proofing plus contracts and sales.'], ['pictime', 'Best for turning portrait galleries into print campaigns.'], ['pixpa', 'Best portfolio, proofing, and store combination.'], ['droptop', 'Best affordable favorites and final delivery flow.'], ['cloudspot', 'Best for mini-session administration.'], ['zenfolio', 'Best for portrait studios that also need a website and booking.'],
    ].map(([productId, angle]) => ({ productId, angle })),
    criteria: ['Preset selection limits for package-based sessions', 'Per-image comments or annotations for retouch requests', 'A clear path from proofs to replaced final files', 'Watermarks and download rules before payment or approval', 'Print and digital pricing controls when gallery sales matter'],
    workflow: [
      { title: 'Recreate a real package', body: 'Set a selection limit that matches a current portrait package, upload proofs, and ask a test client for two retouch notes.' },
      { title: 'Replace or version finals', body: 'Confirm whether edited files can replace proofs without breaking the client’s selections. Version history matters for commercial headshots and agency work.' },
      { title: 'Separate proofing from delivery', body: 'Clients should not accidentally download unretouched files. Test the permissions on the proof gallery and final gallery as two distinct stages.' },
    ], faqs: standardFaqs, related: ['websites-like-pixieset', 'free-pixieset-alternatives', 'sell-digital-photos-pixieset-alternatives'],
    imagePlan: ['A proof-to-final replacement demonstration.', 'Selection-limit and retouch-note screenshots.', 'A mobile portrait gallery showing favorites and download controls.'], score: { research: 18, usefulness: 20, accuracy: 20, seo: 18, editorial: 17 },
  },
  {
    slug: 'pixieset-alternatives-unlimited-storage', seoTitle: 'Best Pixieset Alternatives With Unlimited Photo Storage', h1: 'Best Pixieset Alternatives With Unlimited Photo Storage',
    description: 'Compare unlimited-storage Pixieset alternatives, fair-use limits, RAW and video exceptions, storefront fees, and archive tradeoffs.', primaryQuery: 'Pixieset alternatives unlimited photo storage', audience: 'High-volume photographers and studios retaining years of client work', intent: 'Find predictable storage costs without overlooking format restrictions',
    dek: '“Unlimited” almost always applies to a defined media type and acceptable-use policy. RAW files, video, teams, and commerce may still be metered.',
    quickAnswer: 'SmugMug includes unlimited full-resolution JPEG storage on every plan. Zenfolio Advanced advertises unlimited JPEG storage plus a separate 150 GB video allowance. Pic-Time Advanced, CloudSpot Unlimited, PASS Unlimited, Pixpa’s gallery tier, and Flickr Pro also advertise unlimited options, but their gallery, store, and professional-client features differ sharply.',
    hero: { src: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=1800&q=85', alt: 'Rows of storage servers representing large photo archives', caption: 'Unlimited storage is useful only after checking file types, acceptable use, video, RAW, and retrieval workflow.' },
    picks: [
      ['smugmug', 'Best straightforward unlimited JPEG archive.'], ['zenfolio', 'Best unlimited JPEG option with website and volume tools.'], ['pictime', 'Best unlimited tier for gallery-led print sales.'], ['cloudspot', 'Best unlimited plan with studio tools.'], ['pass', 'Best unlimited option for automated store campaigns.'], ['pixpa', 'Best unlimited gallery tier paired with zero stated platform commission.'], ['flickr', 'Best inexpensive unlimited community archive, not client proofing.'],
    ].map(([productId, angle]) => ({ productId, angle })),
    criteria: ['Read the fair-use or acceptable-use policy.', 'Confirm whether unlimited applies to JPEG only, and price RAW and video separately.', 'Check whether full-resolution originals remain downloadable.', 'Understand what happens to files after cancellation or downgrade.', 'Time a bulk export before treating any service as an archive.'],
    workflow: [
      { title: 'Inventory by file type', body: 'Separate delivered JPEGs, RAW originals, video masters, previews, and exports. An unlimited JPEG plan does not solve a 4K video or RAW archive problem.' },
      { title: 'Keep an exit copy', body: 'Maintain a local or independent cloud archive with the original folder structure. Unlimited hosting should reduce delivery costs, not create lock-in.' },
      { title: 'Test restore, not just upload', body: 'Download a large old gallery and verify filenames, metadata, folder grouping, and transfer speed. Archive value is measured when files must come back.' },
    ], faqs: [
      { question: 'Does unlimited include RAW and video?', answer: 'Usually not automatically. SmugMug lists RAW storage as a paid add-on. Zenfolio separates unlimited JPEG from a 150 GB video allowance on Advanced. Check the exact file-type language for every plan.' },
      { question: 'Is unlimited storage a backup?', answer: 'Not by itself. Keep an independent copy and test restoration. A gallery account can be cancelled, suspended, changed, or become inaccessible even when storage is advertised as unlimited.' },
      ...standardFaqs.slice(2),
    ], related: ['best-pixieset-alternatives', 'pixieset-alternatives-event-photographers', 'switch-from-pixieset'],
    imagePlan: ['A file-type matrix for JPEG, RAW, video, and project files.', 'A restore-speed test from a 100 GB sample gallery.', 'Official fair-use language captured with verification date.'], score: { research: 19, usefulness: 20, accuracy: 19, seo: 18, editorial: 17 },
  },
  {
    slug: 'sell-digital-photos-pixieset-alternatives', seoTitle: 'Best Pixieset Alternatives for Selling Digital Photos Online', h1: 'Best Pixieset Alternatives for Selling Digital Photos Online',
    description: 'Compare Pixieset alternatives for digital downloads, print fulfillment, commissions, payment processing, campaigns, and licensing.', primaryQuery: 'Pixieset alternatives for selling digital photos online', audience: 'Photographers earning from digital downloads, prints, albums, or image licenses', intent: 'Choose a gallery storefront with the right economics and fulfillment workflow',
    dek: 'The key number is net revenue, not the advertised subscription. Platform commission, card fees, lab costs, refunds, tax handling, and campaign tools all change the result.',
    quickAnswer: 'ShootProof is the clearest commission-free option in this group. Pic-Time is strongest for marketing automation and labs. Pixpa states zero platform commission and combines a website with galleries. PASS emphasizes automated store campaigns. PhotoDeck and PhotoShelter are more relevant when digital sales mean commercial licensing rather than family prints.',
    hero: { src: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1800&q=85', alt: 'Photographer packing a framed print for a customer', caption: 'A store should be compared on net profit and operational fit, not commission alone.' },
    picks: [
      ['shootproof', 'Best for zero stated platform commission across plans.'], ['pictime', 'Best for automated campaigns, albums, and lab fulfillment.'], ['cloudspot', 'Best when the store belongs beside contracts and scheduling.'], ['smugmug', 'Best for a storefront attached to an unlimited archive.'], ['zenfolio', 'Best annual-value website and store bundle.'], ['pixpa', 'Best for zero stated platform commission and a portfolio site.'], ['pass', 'Best store-first automation at a low entry price.'], ['photodeck', 'Best for direct licensing and multilingual sales.'], ['photoshelter', 'Best for editorial licensing and archive-driven commerce.'], ['format', 'Best for a portfolio-led, commission-free store.'],
    ].map(([productId, angle]) => ({ productId, angle })),
    criteria: ['Platform commission and the base used to calculate it', 'Card processing, payout timing, refunds, taxes, and currency support', 'Digital license terms and download delivery controls', 'Lab availability, wholesale cost, shipping, and order support', 'Campaign automation, coupons, packages, and abandoned-cart tools'],
    workflow: [
      { title: 'Run the net-revenue formula', body: 'For a sample order, subtract product cost, platform commission, payment processing, tax obligations, shipping subsidies, and expected support or refund cost.' },
      { title: 'Place a complete test order', body: 'Buy one digital file and one print. Check checkout on mobile, confirmation emails, download expiry, color or crop approval, packaging, and payout reporting.' },
      { title: 'Choose the correct sales model', body: 'Wedding print fulfillment, school-event downloads, and commercial image licensing are different businesses. PhotoDeck or PhotoShelter may fit licensing; Pic-Time or ShootProof is more natural for client prints.' },
    ], faqs: [
      { question: 'Does zero commission mean zero fees?', answer: 'No. Card processors still charge transaction fees, and print orders include lab and shipping costs. Some services also charge for booking, archive storage, or other add-ons.' },
      { question: 'Is Droptop recommended for selling photos?', answer: 'Not yet. Droptop currently focuses on private gallery delivery and does not offer an integrated print-lab storefront. Choose a commerce-focused platform if gallery sales are part of the requirement.' },
      ...standardFaqs.slice(2),
    ], related: ['best-pixieset-alternatives', 'pixieset-alternatives-wedding-photographers', 'affordable-pixieset-alternatives'],
    imagePlan: ['A real end-to-end digital purchase with fee breakdown.', 'A print order from gallery to delivered package.', 'A net-revenue calculator using vendor-published fees.'], score: { research: 19, usefulness: 20, accuracy: 19, seo: 18, editorial: 17 },
  },
  {
    slug: 'switch-from-pixieset', seoTitle: 'How to Switch From Pixieset to Another Gallery Platform', h1: 'How to Switch From Pixieset to Another Photography Gallery Platform',
    description: 'A practical Pixieset migration checklist covering exports, favorites, client links, domains, stores, downloads, testing, and cancellation.', primaryQuery: 'how to switch from Pixieset', audience: 'Photographers who have chosen or are testing a replacement platform', intent: 'Complete a low-risk migration without breaking active client galleries',
    dek: 'Treat migration as a client-service project: preserve files and selections, overlap both systems, test every link, and cancel only after the last active job has moved.',
    quickAnswer: 'First inventory active galleries, custom domains, download rules, favorites, store products, and contracts. Download independent copies of every original you need, export favorite filenames or CSVs, rebuild one pilot gallery, and run both platforms in parallel. Pixieset says cancellation ends access to the product, so do not cancel before validation and client communication are complete.',
    hero: { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=85', alt: 'Laptop displaying a project migration checklist and analytics', caption: 'A safe migration preserves client access first and optimizes the archive second.' },
    picks: [
      ['droptop', 'Choose when lower-cost photo and video delivery is the destination.'], ['pictime', 'Choose when the replacement must drive print and album sales.'], ['shootproof', 'Choose when contracts, invoices, and selling should move together.'], ['cloudspot', 'Choose when consolidating gallery and studio management.'], ['smugmug', 'Choose when archive size is the main reason for leaving.'], ['picflow', 'Choose when approvals matter more than a store.'],
    ].map(([productId, angle]) => ({ productId, angle })),
    criteria: ['Active galleries and contractual retention dates', 'Original files, video, sets, cover images, and filenames', 'Favorite lists, notes, and CSV or Lightroom copy lists', 'Passwords, download PINs, email capture, and resolution rules', 'Custom domains, email templates, store products, taxes, and outstanding orders'],
    workflow: [
      { title: '1. Freeze and inventory', body: 'Choose a cutoff date for new Pixieset galleries. Export a spreadsheet of active collection URLs, clients, passwords, PINs, expiry dates, storage, and features used. Pixieset documents CSV export for folder information, but photos and videos are not included in that CSV.' },
      { title: '2. Preserve files and selections', body: 'Download originals at the highest available resolution and compare file counts. Export client favorites as CSV or a Lightroom Copy List before moving anything. Keep the Pixieset export and your local master catalog unchanged until validation is complete.' },
      { title: '3. Build one pilot gallery', body: 'Select a cooperative recent client and reproduce sets, cover, privacy, favorites, web-size and original downloads, and video. Test on desktop and mobile with a clean browser session.' },
      { title: '4. Migrate active work first', body: 'Move current proofing jobs and unfulfilled orders before old archives. Leave original galleries online during an overlap period and send clients a clear replacement link with any new password or PIN.' },
      { title: '5. Change the domain carefully', body: 'If galleries use a custom subdomain, lower DNS TTL before the change, document the existing records, update the target, and verify HTTPS. Keep a rollback record until the new host is stable.' },
      { title: '6. Reconcile commerce', body: 'Export order and tax records required for accounting, complete outstanding fulfillment, recreate products and prices, and place a real test transaction. Store settings rarely transfer automatically.' },
      { title: '7. Cancel last', body: 'Pixieset states that cancellation ends access to the product and does not issue refunds for account cancellation. Cancel only after files, favorites, client links, domain, downloads, and orders have been checked.' },
    ], faqs: [
      { question: 'Can I automatically transfer every Pixieset gallery?', answer: 'Do not assume so. Import tools vary and may not preserve passwords, favorite lists, store settings, notes, or download rules. Ask the destination vendor exactly what migrates and test one gallery before committing.' },
      { question: 'What should I export from client favorites?', answer: 'Pixieset documents downloading favorited photos and exporting filenames through CSV or Lightroom Copy List. Save both the list and the corresponding master files so selections remain usable outside Pixieset.' },
      { question: 'When should I cancel Pixieset?', answer: 'After the overlap period, client communication, file-count checks, domain verification, download tests, favorite exports, and outstanding order reconciliation are complete.' },
    ], related: ['best-pixieset-alternatives', 'affordable-pixieset-alternatives', 'websites-like-pixieset'],
    imagePlan: ['A migration inventory spreadsheet with private values redacted.', 'A before-and-after client journey on Pixieset and the chosen destination.', 'A file-count and checksum validation report for one pilot gallery.'], score: { research: 20, usefulness: 20, accuracy: 20, seo: 18, editorial: 17 },
  },
];

export function getArticle(slug: string) {
  return articles.find(article => article.slug === slug);
}

export function getProduct(id: string) {
  return products.find(product => product.id === id);
}

export function getSource(id: string) {
  return sources.find(source => source.id === id);
}
