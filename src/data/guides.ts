import type { Guide } from "./types";

/**
 * Knowledge content. Each guide supports specific commercial pages and answers a
 * question cluster those pages don't own, to avoid cannibalisation.
 */
export const guides: Guide[] = [
  {
    slug: "skip-hire-vs-rubbish-removal",
    title: "Skip hire vs rubbish removal: which is better?",
    h1: "Skip Hire vs Man-and-Van Rubbish Removal: Which Should You Choose?",
    metaTitle: "Skip Hire vs Rubbish Removal in Watford | Which Is Better?",
    metaDescription:
      "Skip or rubbish removal collection? A plain comparison of cost, permits, loading, timing and what you can put in each — to help Watford households choose.",
    lead: "Both get rid of waste. Which one suits you depends on how much there is, how quickly it's produced and whether you have somewhere to put a skip.",
    answer:
      "For one-off clear-outs where the waste is ready now, a wait-and-load rubbish removal service is usually simpler and often cheaper: no permit, no skip on the drive and the loading is done for you. A skip can make more sense for long projects producing waste every day for weeks, where you have off-road space and are happy to load it yourself.",
    published: "2026-10-28",
    updated: "2026-10-28",
    blocks: [
      {
        h2: "The key differences",
        subs: [
          { h3: "Loading", text: "Skip: you load it yourself. Rubbish removal: the team carries items out from inside the property and loads the van." },
          { h3: "Space and permits", text: "Skip: needs a driveway, or a council permit if it sits on the road. Rubbish removal: nothing is left on site, so no permit is needed." },
          { h3: "Timing", text: "Skip: hired for a set period, and waste goes in as it's produced. Rubbish removal: waste is collected in one visit — same day if needed." },
          { h3: "What can go in", text: "Skips usually exclude items such as mattresses, fridges, TVs and sofas, or charge extra for them. A rubbish removal service can take these, sending each to the right treatment route." },
          { h3: "Paying for space you don't use", text: "Skips are priced by size whether you fill them or not. Rubbish removal is priced on the volume actually collected." },
        ],
      },
      {
        h2: "When a skip is the better choice",
        list: [
          "A long renovation producing waste every day for weeks",
          "Plenty of off-road space for the skip",
          "Mostly heavy inert waste (rubble, soil) and you're happy to load it",
        ],
      },
      {
        h2: "When rubbish removal is the better choice",
        list: [
          "The waste is already there and you want it gone in one go",
          "No driveway, or you'd need a road permit",
          "Bulky or awkward items: sofas, mattresses, fridges, wardrobes",
          "Items are upstairs, in a loft or at the back of the garden",
          "You need it cleared today — for a handover, sale or tenancy",
        ],
      },
      {
        h2: "Whichever you choose, check the licence",
        paras: [
          "Skip companies and rubbish collectors both need to be registered waste carriers. Householders can be fined if their waste ends up fly-tipped, so ask for the registration details before you book.",
        ],
      },
    ],
    faqs: [
      { q: "Is a man and van cheaper than a skip?", a: "For small and medium one-off loads it often is, because you only pay for what's collected and there's no permit. For very large, long-running projects a skip can work out cheaper. Compare quotes for your actual volume." },
      { q: "Do I need a permit for a skip in Watford?", a: "Only if the skip goes on the road or pavement rather than private land. The skip company normally applies to the council for you — check the cost and timescale with them." },
    ],
    related: ["builders-waste-removal", "house-clearance", "garden-waste-clearance"],
    keywords: {
      primary: "skip hire vs rubbish removal",
      secondary: ["skip or man and van", "skip alternative Watford", "is a man and van cheaper than a skip"],
      longTail: ["do I need a skip permit in Watford", "what can't go in a skip"],
    },
  },
  {
    slug: "check-waste-carrier-licence",
    title: "How to check a waste carrier licence",
    h1: "How to Check a Waste Carrier Licence (and Avoid a Fly-Tipping Fine)",
    metaTitle: "How to Check a Waste Carrier Licence | Avoid Fly-Tipping Fines",
    metaDescription:
      "Householders can be fined if their rubbish is fly-tipped by an unlicensed collector. Here's how to check a waste carrier licence in England in two minutes.",
    lead: "If someone you pay to take your rubbish dumps it, you can be fined. Checking their licence takes two minutes — here's how.",
    answer:
      "Ask the collector for their waste carrier registration number, then search for it on the Environment Agency's public register of waste carriers, brokers and dealers on GOV.UK. Check the name and address match, keep a receipt that describes the waste, and be wary of cash-only, no-paperwork offers.",
    published: "2026-10-27",
    updated: "2026-10-27",
    blocks: [
      {
        h2: "Why householders need to check",
        paras: [
          "Householders have a legal duty of care to make sure their household waste is only passed to someone authorised to take it. If your rubbish turns up fly-tipped and can be traced back to you, councils can issue a fixed penalty notice — commonly £400, with some councils charging up to £600 — and serious cases can go to court.",
          "Fly-tippers often advertise on social media and marketplace sites with prices that seem too good to be true. That's usually because the waste never reaches a licensed facility.",
        ],
      },
      {
        h2: "Checking a waste carrier in four steps",
        subs: [
          { h3: "1. Ask for the registration number", text: "Legitimate carriers will give it without hesitation. In England it usually begins with CBDU or CBDL." },
          { h3: "2. Search the public register", text: "Search 'waste carriers, brokers and dealers register' on GOV.UK, or call the Environment Agency on 03708 506 506." },
          { h3: "3. Check the details match", text: "The business name and address on the register should match the person or company you're dealing with." },
          { h3: "4. Get a receipt", text: "Ask for a receipt or waste transfer note showing the company name, registration number, what was taken and the date." },
        ],
      },
      {
        h2: "Warning signs",
        list: [
          "No registration number, or reluctance to give one",
          "Cash only, with no receipt",
          "No business name, address or landline",
          "Unmarked vehicle and a price far below others",
          "Contact only through a social media message",
        ],
      },
      {
        h2: "Businesses have extra obligations",
        paras: [
          "Businesses must keep waste transfer notes for their waste, and in England most workplaces now need to separate recyclables and food waste under Simpler Recycling. See our commercial waste collection page for more.",
        ],
      },
    ],
    faqs: [
      { q: "Can I be fined if someone else fly-tips my rubbish?", a: "Yes. If you didn't take reasonable steps to check they were authorised, councils can issue a fixed penalty notice to the householder." },
      { q: "What does an upper-tier waste carrier licence mean?", a: "Businesses that carry other people's waste as part of their trade need an upper-tier registration with the Environment Agency." },
    ],
    related: ["house-clearance", "commercial-bin-collection", "bulky-waste-collection"],
    keywords: {
      primary: "how to check a waste carrier licence",
      secondary: ["waste carrier licence check", "fly tipping fine householder", "duty of care household waste"],
      longTail: ["can I be fined if my rubbish is fly tipped", "waste carrier register search"],
    },
  },
  {
    slug: "council-bulky-waste-vs-private-collection",
    title: "Council bulky waste vs private collection in Watford",
    h1: "Council Bulky Waste Collection vs Private Rubbish Removal in Watford",
    metaTitle: "Watford Council Bulky Waste vs Private Collection | Which to Use",
    metaDescription:
      "Should you book Watford council's bulky waste collection or a private rubbish removal company? A plain-English comparison of cost, items and timing.",
    lead: "Both options have their place. Here's an honest comparison so you can pick the right one for what you're getting rid of.",
    answer:
      "Use the council's bulky waste service if you have a few eligible items, can put them outside and can wait for a slot. Use a private licensed collector if you have more items, items the council excludes (such as sofas or electricals), items that need carrying out from inside, or a deadline.",
    published: "2026-10-27",
    updated: "2026-10-27",
    blocks: [
      {
        h2: "Watford Borough Council's bulky waste service",
        paras: [
          "At the time of writing, Watford Borough Council's page listed £57 for up to three bulky items in one collection, excluding electricals and sofas or other upholstered items, with bookings handled through its contractor. Check watford.gov.uk for the latest price, eligible items and how to book — these change.",
          "If you live in Bushey, South Oxhey, Croxley Green, Rickmansworth or Abbots Langley, you're served by a different council (Hertsmere or Three Rivers), with its own rules.",
        ],
      },
      {
        h2: "Side-by-side comparison",
        subs: [
          { h3: "Number of items", text: "Council: limited per booking. Private: priced on volume, no fixed item limit." },
          { h3: "Item types", text: "Council: some categories excluded. Private: most household items, including electricals and upholstered seating." },
          { h3: "Where items are collected", text: "Council: usually from outside the property. Private: from any room, including upstairs and lofts." },
          { h3: "Timing", text: "Council: next available slot. Private: arranged around your dates where availability allows." },
          { h3: "Cost", text: "Council: often cheaper for a few eligible items. Private: better value for mixed or larger loads." },
        ],
      },
      {
        h2: "Other free or low-cost options",
        list: [
          "Hertfordshire household waste recycling centres, if you have transport (check booking and van rules first)",
          "Retailer take-back when buying a new appliance or mattress",
          "Charity furniture collections for items with fire labels and in good condition",
          "Giving items away locally",
        ],
      },
    ],
    faqs: [
      { q: "Will Watford council take a sofa?", a: "The standard bulky collection has excluded sofas and upholstered items — check watford.gov.uk for the current position." },
      { q: "Is a private collection always more expensive?", a: "For one or two eligible items the council is usually cheaper. For mixed loads, excluded items or items inside the house, a private collection is often the practical option." },
    ],
    related: ["bulky-waste-collection", "sofa-removal", "furniture-removal"],
    keywords: {
      primary: "Watford council bulky waste collection",
      secondary: ["Watford bulky waste alternative", "council vs private rubbish removal"],
      longTail: ["does Watford council collect sofas", "how much is bulky waste collection in Watford"],
    },
  },
  {
    slug: "clearing-a-house-after-a-bereavement",
    title: "Clearing a house after a bereavement",
    h1: "Clearing a Loved One's Home: A Practical Checklist",
    metaTitle: "Clearing a House After a Death | Practical Checklist for Families",
    metaDescription:
      "A practical, step-by-step checklist for families and executors clearing a parent's or relative's home after a death — from documents to the final handover.",
    lead: "There's no right speed for this. This checklist is here to make the practical side a little clearer.",
    answer:
      "Before clearing a relative's home, secure the property, find the will and important documents, check with the executor or solicitor whether contents need valuing, let family choose keepsakes, then arrange the clearance of what remains. Leave meter readings, utilities and key returns until the end.",
    published: "2026-10-27",
    updated: "2026-10-27",
    blocks: [
      {
        h2: "Before anything leaves the house",
        list: [
          "Secure the property and check insurance — empty homes often need different cover",
          "Find the will, bank statements, pension and insurance documents",
          "Check with the executor or solicitor before removing anything of value",
          "Redirect post so letters don't build up",
        ],
      },
      {
        h2: "Sorting the contents",
        subs: [
          { h3: "Keepsakes", text: "Give family members time to choose items, and agree how to handle disagreements before you start." },
          { h3: "Documents and photographs", text: "Go through drawers, books and pockets — important papers and cash often turn up in unexpected places." },
          { h3: "Things to sell or donate", text: "Furniture with fire labels, books, clothes and kitchenware can often go to charity." },
          { h3: "Everything else", text: "What remains can be cleared in one visit by a licensed clearance company." },
        ],
      },
      {
        h2: "Rented and council properties",
        paras: [
          "If the property was rented from a council, housing association or private landlord, there may be a deadline for clearing it and returning keys. Ask the landlord for the date in writing as early as possible.",
        ],
      },
      {
        h2: "The final handover",
        list: ["Take final meter readings and close utility accounts", "Photograph the empty property", "Return keys and get confirmation in writing"],
      },
    ],
    faqs: [
      { q: "How soon after a death should a house be cleared?", a: "There's no fixed rule for owned homes, though empty properties can have insurance implications. Rented homes often have a landlord deadline." },
      { q: "Should we clear the house ourselves or use a company?", a: "Many families sort keepsakes themselves and use a clearance company for the remainder, which saves several trips and the heavy lifting." },
    ],
    related: ["probate-clearance", "house-clearance", "furniture-removal"],
    keywords: {
      primary: "clearing a house after a death",
      secondary: ["house clearance after death checklist", "clearing parents house", "executor house clearance"],
      longTail: ["what to do with a deceased person's belongings", "how long to clear council house after death"],
    },
  },
];

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);
