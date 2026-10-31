import type { Service } from "./types";

/**
 * Service pages. The homepage owns "rubbish removal / rubbish clearance Watford",
 * so there is deliberately no separate /rubbish-removal/ page (see DO-NOT-CREATE list).
 * Each service URL owns one keyword cluster; synonyms (removal / collection / disposal)
 * are grouped on the same URL.
 */
export const services: Service[] = [
  {
    slug: "same-day-rubbish-removal",
    name: "Same-Day & 24/7 Rubbish Removal",
    short: "Same-day removal",
    icon: "clock",
    group: "home",
    h1: "Same-Day & 24 Hour Rubbish Removal in Watford",
    metaTitle: "Same-Day Rubbish Removal Watford | 24/7 Waste Collection",
    metaDescription:
      "Same-day and 24 hour rubbish removal in Watford — evenings, weekends and urgent clear-outs. Licensed and insured. Call 01293 549164 or request a quote.",
    lead:
      "Rubbish that can't wait — a deadline on a key handover, a skip that didn't turn up, a tenant who left everything behind. We operate around the clock, 7 days a week, and offer same-day collections across Watford.",
    answer:
      "Yes — Watford Rubbish Clearance offers same-day rubbish removal and operates 24 hours a day, 7 days a week. The quickest way to secure a same-day slot is to call early and send photos of what needs to go, so the right van and team can be sent straight away.",
    cardText: "Urgent, same-day and out-of-hours collections — 24 hours a day, 7 days a week.",
    takes: [
      "Urgent end-of-tenancy clear-outs",
      "Rubbish before a sale completion or key return",
      "Overflowing bins and bags",
      "Furniture and appliances",
      "Builders' waste holding up the next trade",
      "Out-of-hours commercial clear-outs",
    ],
    blocks: [
      {
        h2: "When same-day rubbish removal makes sense",
        list: [
          "Keys must be returned to a landlord, agent or council today or tomorrow",
          "A house sale is completing and the property must be empty",
          "Tenants have moved out and left belongings or rubbish behind",
          "Waste is blocking a renovation and the next trade arrives in the morning",
          "A shop or office needs clearing outside trading hours",
          "Rubbish is attracting pests or blocking a fire exit or shared hallway",
        ],
      },
      {
        h2: "How to get a same-day collection",
        subs: [
          { h3: "1. Call as early as you can", text: "Same-day slots depend on where our vans already are, so the earlier you call, the better the chance of a slot that suits you." },
          { h3: "2. Send photos", text: "Photos let us confirm the price and send the right size van and team without a site visit." },
          { h3: "3. Confirm access", text: "Tell us about parking, stairs, lifts and who will let us in — or arrange a key safe if you can't be there." },
        ],
      },
      {
        h2: "Evenings, nights and weekends",
        paras: [
          "Because we operate 24/7, collections can be arranged outside normal working hours — useful for businesses that can't have vans outside during trading, for blocks of flats with daytime parking pressure, and for anyone who can't take time off work.",
          "Out-of-hours work is planned with noise and neighbours in mind; let us know about any building rules on quiet hours.",
        ],
      },
    ],
    faqs: [
      { q: "Can you really collect today?", a: "We offer same-day collections and operate 24/7. Availability depends on the time you call and the size of the job, so call early and we'll confirm the earliest slot straight away." },
      { q: "Do you charge more for same-day or out-of-hours collections?", a: "Your quote reflects the job, the timing and the waste involved. We'll always confirm the full price before we start." },
      { q: "Can you collect at night or on a Sunday?", a: "Yes. We operate 24 hours a day, 7 days a week — tell us the time that works for you." },
    ],
    related: ["house-clearance", "bulky-waste-collection", "domestic-bin-collection", "builders-waste-removal"],
    customers: ["Tenants", "Landlords", "Estate agents", "Businesses", "Builders"],
    keywords: {
      primary: "same day rubbish removal Watford",
      secondary: ["24 hour rubbish removal Watford", "urgent rubbish collection Watford", "emergency waste removal Hertfordshire"],
      longTail: ["rubbish removal today near me", "weekend rubbish collection Watford", "out of hours waste collection"],
    },
  },
  {
    slug: "house-clearance",
    name: "House Clearance",
    short: "House clearance",
    icon: "home",
    group: "home",
    h1: "House Clearance in Watford",
    metaTitle: "House Clearance Watford | Full & Part Property Clearances",
    metaDescription:
      "Full and partial house clearances in Watford and across Hertfordshire. Loft-to-garden clearing, careful handling, reuse and recycling first. Request a free quote.",
    lead:
      "Full or partial clearances of houses, flats and bungalows — from a single packed room to a whole property, loft and garden included. We do the lifting, loading and responsible disposal so the property is left empty and ready for its next stage.",
    answer:
      "A house clearance is the removal of unwanted contents from a property — furniture, appliances, boxes, loft and garden items — followed by sorting for reuse, recycling and licensed disposal. Price depends on how much there is, access and the types of item, so we quote from photos or a visit.",
    cardText: "Whole-property or room-by-room clearances, including lofts, cellars and gardens.",
    takes: [
      "Furniture, beds and wardrobes",
      "White goods and small electricals",
      "Boxes, clothes and household items",
      "Loft and cellar contents",
      "Garden furniture and green waste",
      "Carpets and underlay",
    ],
    blocks: [
      {
        h2: "What a house clearance includes",
        paras: [
          "Every clearance starts with what you want to keep. We agree which rooms and items are staying, then clear everything else — including the awkward spaces people tend to forget, such as loft hatches, under-stairs cupboards, sheds and the side return.",
          "Once items are out we sweep through so the property is left tidy. If you need a deeper clean for an end of tenancy or a sale, tell us at the quote stage so we can plan around your cleaner.",
        ],
        subs: [
          { h3: "Full house clearance", text: "Everything out, top to bottom. Common before a sale, after a bereavement or when a landlord takes back a property." },
          { h3: "Part clearance", text: "Selected rooms or items only — clearing a spare room for a lodger, emptying a loft before conversion or decluttering before a move." },
          { h3: "Flats and blocks", text: "Upper-floor flats need planning for lifts, stairs and parking. Let us know the floor level and whether there is a lift when you ask for a quote." },
        ],
      },
      {
        h2: "Who we clear houses for",
        list: [
          "Homeowners downsizing or moving abroad",
          "Families clearing a relative's home (see probate clearance)",
          "Landlords and letting agents (see end of tenancy clearance)",
          "Estate agents preparing a property for sale",
          "Housing associations and property managers",
        ],
      },
      {
        h2: "Reuse and recycling before disposal",
        paras: [
          "Good-condition furniture and household items can often be reused rather than thrown away. Metals, cardboard, wood, electricals and garden waste are separated for recycling, and only what cannot be reused or recycled goes for licensed disposal.",
          "Upholstered sofas and armchairs are handled separately because of the persistent organic pollutants (POPs) rules — more on that on our sofa removal page.",
        ],
      },
      {
        h2: "Loft, cellar and under-stairs clearances",
        paras: [
          "Lofts are where decades of belongings end up — and where clearances get awkward: narrow hatches, loose boarding and heat in summer. We bring the right number of people to pass items down safely, and can clear just the loft ahead of a conversion, insulation work or a sale.",
        ],
      },
      {
        h2: "How long does a house clearance take?",
        paras: [
          "A single room or a small flat is often a few hours. A full three-bedroom house with a loft and garage is more likely to take a full day, and very full properties can take longer. We give you a realistic timeframe with your quote so you can plan key handovers.",
        ],
      },
    ],
    faqs: [
      { q: "Do I need to be at the property during the clearance?", a: "Not necessarily. Many clients give access via a key holder, estate agent or key safe. We agree exactly what is being cleared beforehand and can send photos when the job is finished." },
      { q: "Can you clear a property that is being sold?", a: "Yes. Tell us your completion or viewing dates and we will work to them. Clearing before photos and viewings often helps a property present better." },
      { q: "What happens to items in good condition?", a: "Where items are suitable for reuse we aim to pass them on rather than dispose of them. Items that can't be reused are sorted for recycling first, with licensed disposal as the last resort." },
      { q: "Can you take everything, including the garden and shed?", a: "Yes — tell us about outbuildings, lofts and gardens at the quote stage so they are included in the price. Hazardous materials such as asbestos, gas bottles and chemicals need specialist handling and are quoted separately or referred on." },
    ],
    related: ["probate-clearance", "end-of-tenancy-clearance", "hoarder-clearance", "furniture-removal"],
    customers: ["Homeowners", "Landlords", "Estate agents", "Executors"],
    keywords: {
      primary: "house clearance Watford",
      secondary: ["house clearance company Watford", "flat clearance Watford", "property clearance Watford", "home clearance Hertfordshire"],
      longTail: ["how long does a house clearance take", "house clearance before selling a house", "part house clearance near me", "loft clearance Watford"],
    },
  },
  {
    slug: "end-of-tenancy-clearance",
    name: "End of Tenancy Clearance",
    short: "End of tenancy clearance",
    icon: "key",
    group: "home",
    h1: "End of Tenancy Clearance in Watford",
    metaTitle: "End of Tenancy Clearance Watford | Landlords & Letting Agents",
    metaDescription:
      "End of tenancy clearances in Watford for landlords, letting agents and tenants — left-behind furniture, rubbish and garden waste cleared fast. Call 01293 549164.",
    lead:
      "Tenants gone, belongings and rubbish left behind, new tenants due in. We clear flats, houses and HMOs between lets — furniture, mattresses, bags, white goods and garden waste — so your cleaner and inventory clerk can get in on time.",
    answer:
      "An end of tenancy clearance removes everything left in a rental property when a tenancy ends — furniture, mattresses, appliances, rubbish and garden waste — so it can be cleaned, inspected and re-let. We work 24/7 with same-day collections, liaise with agents and key holders, and send photos of the cleared property.",
    cardText: "Left-behind furniture and rubbish cleared between lets — for landlords, agents and tenants.",
    takes: [
      "Abandoned furniture and mattresses",
      "Bags of rubbish and food waste",
      "White goods and small electricals",
      "Garden waste and broken garden furniture",
      "Shed, loft and cupboard contents",
      "Carpets removed ahead of refurbishment",
    ],
    blocks: [
      {
        h2: "Fast turnarounds between tenancies",
        paras: [
          "Every empty day costs rent. Because we operate 24 hours a day, 7 days a week and offer same-day collections, a clearance can usually be fitted in between check-out and the cleaner arriving — including evenings and weekends when agents' offices are closed.",
          "Send photos of each room (or ask your agent or inventory clerk to) and we'll price the job before anyone travels.",
        ],
      },
      {
        h2: "Working with landlords and letting agents",
        subs: [
          { h3: "Key collection and return", text: "We can collect keys from your letting agent, use a key safe or meet a property manager on site, then return the keys afterwards." },
          { h3: "Photo confirmation", text: "Before-and-after photos give you and the agent a record that the property was cleared, useful alongside the check-out report." },
          { h3: "Portfolio landlords and HMOs", text: "Several properties or rooms can be cleared in one route. Shared houses often need bins and communal areas sorting too — see domestic waste collection." },
          { h3: "Invoices", text: "Invoices can be made out to the landlord, the agent or the property management company." },
        ],
      },
      {
        h2: "Before you clear a former tenant's belongings",
        paras: [
          "Rubbish is one thing; a tenant's personal possessions are another. If a tenant has left belongings behind, landlords usually need to give written notice and a reasonable time to collect them before disposal (under the Torts (Interference with Goods) Act 1977). If the tenancy ended unusually — abandonment, eviction or a death — take advice from your agent or a solicitor before arranging a full clearance.",
          "Anything that looks personal or valuable that we find during a clearance — documents, photos, keys, jewellery — is set aside and handed to you rather than cleared.",
        ],
      },
      {
        h2: "Clearances for outgoing tenants",
        paras: [
          "Moving out and running out of time? Tenants book us too — to avoid deductions from a deposit for items left behind, or to clear a garden or shed before the check-out inspection.",
        ],
      },
    ],
    faqs: [
      { q: "How quickly can you clear a rental property?", a: "We operate 24/7 and offer same-day collections. Call early with photos and we'll confirm the earliest slot — often the same day." },
      { q: "Can you work with our letting agent rather than us?", a: "Yes. We can take instructions and keys from your agent or property manager and send them photos once the property is clear." },
      { q: "Can I just throw away what my tenant left behind?", a: "Not always. Personal belongings usually require written notice to the former tenant first. Rubbish and clearly abandoned waste are simpler — check with your agent or a solicitor if you're unsure." },
      { q: "Do you also clean the property?", a: "We clear and sweep. If you need an end of tenancy clean, tell us when it's booked and we'll schedule the clearance first." },
    ],
    related: ["house-clearance", "mattress-disposal", "domestic-bin-collection", "same-day-rubbish-removal"],
    customers: ["Landlords", "Letting agents", "Property managers", "HMO landlords", "Tenants"],
    keywords: {
      primary: "end of tenancy clearance Watford",
      secondary: ["end of tenancy rubbish removal Watford", "rental property clearance Watford", "landlord clearance Hertfordshire", "tenant left belongings clearance"],
      longTail: ["clearance for letting agents Watford", "what to do with belongings left by a tenant", "same day end of tenancy clearance", "HMO clearance Watford"],
    },
  },
  {
    slug: "hoarder-clearance",
    name: "Hoarder House Clearance",
    short: "Hoarder clearance",
    icon: "stack",
    group: "home",
    h1: "Hoarder House Clearance in Watford",
    metaTitle: "Hoarder Clearance Watford | Discreet, Non-Judgemental Clearances",
    metaDescription:
      "Discreet, non-judgemental hoarder house clearances in Watford and within 30 miles — for families, landlords, councils and support workers. Call 01293 549164.",
    lead:
      "Clearing a hoarded home takes more than a van. We work patiently and without judgement — with the person living there, their family, or the landlord, council or support worker involved — so the property becomes safe and liveable again.",
    answer:
      "A hoarder clearance removes accumulated belongings and waste from a property where hoarding has made rooms unusable or unsafe. It is usually done in stages, with the occupant or family deciding what is kept, and often alongside cleaners, pest control or support services. Hoarding disorder is a recognised mental health condition, so the work should be led by the person's needs, not speed alone.",
    cardText: "Patient, discreet clearances of hoarded homes — for occupants, families, landlords and councils.",
    takes: [
      "Accumulated belongings and papers",
      "Bags and boxes of household waste",
      "Furniture and appliances",
      "Food and packaging waste",
      "Garden, garage and loft contents",
      "Items set aside for keeping, donation or sale",
    ],
    blocks: [
      {
        h2: "How a hoarder clearance works",
        subs: [
          { h3: "1. A private conversation first", text: "We talk through the property, the people involved and what success looks like — a full clearance, making one room usable, or creating safe access routes." },
          { h3: "2. Agree what stays", text: "Where the occupant is involved, they decide. We work at a pace they can manage and set aside anything to keep, check or pass on." },
          { h3: "3. Clear in stages", text: "Most hoarder clearances are done room by room over one or more visits, so progress is visible and nothing important is lost." },
          { h3: "4. Sort responsibly", text: "Belongings that can be reused or recycled are separated; only what's left goes for licensed disposal." },
        ],
      },
      {
        h2: "Who we work with",
        list: [
          "People who want help clearing their own home",
          "Families supporting a relative",
          "Landlords and letting agents facing a tenancy breach or inspection",
          "Councils, housing associations and social or support workers",
          "Executors clearing a property after a death",
        ],
      },
      {
        h2: "Safety in hoarded properties",
        paras: [
          "Heavily hoarded homes can have blocked exits, unstable piles, damp, mould or pests. We assess the risks before starting, plan safe routes through the property, and recommend specialist cleaning or pest control where it's needed, working alongside them so the property is ready for the next step.",
          "If you find needles, human or animal waste, or anything you suspect is hazardous, mention it before the clearance so the right arrangements can be made.",
        ],
      },
      {
        h2: "Discretion",
        paras: [
          "Hoarding is personal. We keep conversations confidential, don't publicise jobs, and can schedule work at quieter times — including evenings and weekends, as we operate 24/7.",
        ],
      },
    ],
    faqs: [
      { q: "Does the person living there have to agree?", a: "Wherever possible, yes. Clearances go best when the occupant is involved and decides what stays. Where a landlord, council or court is involved, we follow the instructions of whoever has legal authority over the property." },
      { q: "How long does a hoarder clearance take?", a: "It depends on the size of the property and how full it is. A single room may take a few hours; a whole house can take several days, often spread over separate visits." },
      { q: "Do you also deep clean the property?", a: "We clear and sweep. Where a specialist deep clean, sanitisation or pest control is needed, we'll say so and can coordinate with those specialists." },
      { q: "Will you go through everything or just throw it away?", a: "We sort as we go. Documents, photographs, cash, jewellery and anything that looks personal are set aside rather than cleared." },
    ],
    related: ["house-clearance", "probate-clearance", "end-of-tenancy-clearance", "contract-waste-services"],
    customers: ["Occupants", "Families", "Landlords", "Councils", "Housing associations", "Support workers"],
    keywords: {
      primary: "hoarder clearance Watford",
      secondary: ["hoarder house clearance Hertfordshire", "hoarding clearance Watford", "compulsive hoarding clearance"],
      longTail: ["how to help a hoarder clear their house", "hoarder clearance for landlords", "how long does a hoarder clearance take", "council hoarder clearance contractor"],
    },
  },
  {
    slug: "probate-clearance",
    name: "Probate & Bereavement Clearance",
    short: "Probate clearance",
    icon: "key",
    group: "home",
    h1: "Probate & Bereavement House Clearance in Watford",
    metaTitle: "Probate Clearance Watford | Sensitive Bereavement Clearances",
    metaDescription:
      "Respectful probate and bereavement house clearances in Watford and Hertfordshire. We work around executors, solicitors and family. Ask for a free, no-pressure quote.",
    lead:
      "Clearing the home of someone who has died is rarely just a logistics job. We work at your pace, set aside anything that matters, and liaise with executors, solicitors and estate agents so the family has one less thing to manage.",
    answer:
      "A probate clearance empties a deceased person's property so it can be sold, returned to a landlord or handed back to a council or housing association. Families or executors decide what is kept first; we then clear, sort for reuse and recycling, and leave the property empty and swept.",
    cardText: "Respectful clearances for executors and families, working around probate timelines.",
    takes: [
      "Full contents of houses and flats",
      "Personal items set aside for family review",
      "Furniture and white goods",
      "Garden and outbuilding contents",
      "Papers kept for executor review",
    ],
    blocks: [
      {
        h2: "Clearing a loved one's home, step by step",
        subs: [
          { h3: "1. Keep, share, clear", text: "Family members take what they want first. If several relatives are involved we can work to a list or labelled rooms." },
          { h3: "2. Papers and valuables", text: "Paperwork, photographs, jewellery and anything that looks personal is set aside for you rather than cleared, even if you have asked for a full clearance." },
          { h3: "3. Clearance and sorting", text: "Remaining contents are removed and sorted for reuse, recycling and licensed disposal." },
          { h3: "4. Handover", text: "The property is left empty and swept, ready for valuation, sale or return of the keys." },
        ],
      },
      {
        h2: "Working with executors, solicitors and landlords",
        paras: [
          "If you are an executor living some distance from Watford, we can collect keys from a solicitor or estate agent, complete the clearance and return them, with photos of the empty property for your records. Invoices can be addressed to the estate.",
          "Council and housing association tenancies often have a fixed deadline for returning keys after a death. Tell us the date when you get in touch so we can plan around it.",
        ],
      },
      {
        h2: "Should a clearance happen before or after probate is granted?",
        paras: [
          "Executors generally should not sell or give away significant estate assets before they have authority to do so, and the property contents may need to be valued for inheritance tax purposes. If you are unsure, check with the solicitor handling the estate before arranging a full clearance. Removing obvious rubbish, perishables and items the family is keeping is usually less of a concern — but your solicitor's advice comes first.",
        ],
      },
    ],
    faqs: [
      { q: "Can you clear a property before probate is granted?", a: "Practically, yes — but executors should check with the solicitor handling the estate first, as contents may need valuing and executors' authority matters. We are happy to schedule the clearance for after the grant." },
      { q: "What if we find something valuable during the clearance?", a: "Anything that looks personal or potentially valuable — documents, photos, jewellery, cash — is set aside and handed to you, not cleared." },
      { q: "Can you work with a solicitor rather than the family?", a: "Yes. We can take instructions and keys from a solicitor or estate agent and invoice the estate." },
    ],
    related: ["house-clearance", "furniture-removal", "fridge-freezer-removal"],
    customers: ["Executors", "Families", "Solicitors", "Housing associations"],
    keywords: {
      primary: "probate clearance Watford",
      secondary: ["bereavement clearance Watford", "deceased estate clearance Hertfordshire", "probate house clearance"],
      longTail: ["clearing a parent's house after death", "can you clear a house before probate", "council flat clearance after death deadline"],
    },
  },
  {
    slug: "office-clearance",
    name: "Office Clearance",
    short: "Office clearance",
    icon: "office",
    group: "commercial",
    h1: "Office Clearance in Watford",
    metaTitle: "Office Clearance Watford | Office Furniture & IT Removal",
    metaDescription:
      "Office and commercial clearances in Watford and Hertfordshire — desks, chairs, IT equipment and strip-outs, scheduled around your business. Free quote on request.",
    lead:
      "Office moves, downsizes and end-of-lease exits — we clear desks, chairs, storage, kitchen appliances and old IT, scheduled around your trading hours so your team isn't disrupted.",
    answer:
      "An office clearance removes unwanted furniture, equipment and waste from commercial premises, typically before a move, refurbishment or lease end. Businesses must make sure waste goes to an authorised carrier and is documented with a waste transfer note, so ask any contractor for theirs.",
    cardText: "Desks, chairs, IT and full strip-outs for moves, downsizes and lease exits.",
    takes: [
      "Desks, chairs and workstations",
      "Filing cabinets and storage",
      "Computers, monitors and printers (WEEE)",
      "Kitchen and breakout furniture",
      "Boxes, archive and general waste",
      "Partitioning and fit-out waste (on survey)",
    ],
    blocks: [
      {
        h2: "Office clearances planned around your business",
        paras: [
          "Most offices can't stop trading for a clearance. Because we operate 24/7, we can work early mornings, evenings, overnight or at weekends, clear floor by floor, and coordinate with building management on lifts, loading bays and parking.",
        ],
      },
      {
        h2: "IT equipment and data",
        paras: [
          "Computers, monitors and printers are waste electrical and electronic equipment (WEEE) and must go for proper treatment, not general waste. Before anything leaves your premises, make sure hard drives are wiped or removed — your data protection obligations stay with you.",
          "If you need certified data destruction, tell us at the quote stage so the right arrangement is in place.",
        ],
      },
      {
        h2: "Your duty of care as a business",
        paras: [
          "Businesses have a legal duty of care for the waste they produce. In practice that means using a registered waste carrier and keeping a waste transfer note describing the waste. Ask us for our paperwork with your quote.",
        ],
      },
      {
        h2: "Types of commercial premises we clear",
        list: ["Offices and serviced suites", "Shops and showrooms", "Schools and nurseries (outside term time where possible)", "Warehouses and storage units", "Surgeries and clinics (non-clinical waste only)"],
      },
    ],
    faqs: [
      { q: "Can you clear our office outside working hours?", a: "Yes. We operate 24 hours a day, 7 days a week, so evening, overnight and weekend clearances are all possible — tell us your preferred window when you ask for a quote." },
      { q: "Do you provide a waste transfer note?", a: "Commercial waste needs a waste transfer note, and we will provide the paperwork for your records with the job." },
      { q: "What about confidential paper?", a: "Confidential documents should be shredded securely. Let us know the volume and we will advise on the right route before the clearance." },
    ],
    related: ["commercial-bin-collection", "furniture-removal", "builders-waste-removal"],
    customers: ["Offices", "Retailers", "Schools", "Facilities managers", "Landlords"],
    keywords: {
      primary: "office clearance Watford",
      secondary: ["office furniture removal Watford", "commercial clearance Watford", "office clearance Hertfordshire"],
      longTail: ["office clearance at weekends", "IT equipment disposal for businesses", "end of lease office clearance"],
    },
  },
  {
    slug: "garden-waste-clearance",
    name: "Garden Waste Clearance",
    short: "Garden waste",
    icon: "leaf",
    group: "home",
    h1: "Garden Waste Clearance in Watford",
    metaTitle: "Garden Waste Clearance Watford | Green Waste Removal",
    metaDescription:
      "Garden waste removal in Watford — branches, hedge cuttings, turf, soil and old garden furniture cleared and recycled. Bagged or loose. Get a free quote today.",
    lead:
      "Hedge trimmings, branches, turf, soil and the pile behind the shed — collected bagged or loose and taken for composting and recycling where possible.",
    answer:
      "Garden waste clearance is the collection of green waste (cuttings, branches, leaves, turf) and garden rubbish (old furniture, pots, fencing, soil) that is too much for a household brown bin. Green waste is normally composted; soil and rubble are handled separately.",
    cardText: "Branches, cuttings, turf, soil, fencing and old garden furniture.",
    takes: ["Branches and hedge cuttings", "Grass, leaves and weeds", "Turf and soil (priced by weight)", "Old fencing and decking", "Garden furniture and pots", "Broken sheds and greenhouses"],
    blocks: [
      {
        h2: "When your brown bin isn't enough",
        paras: [
          "Household garden waste bins are designed for regular maintenance, not a season's worth of hedge cutting or a garden overhaul. One collection can clear what would take months of bin collections.",
        ],
      },
      {
        h2: "Clearances for gardeners, landscapers and landlords",
        paras: [
          "Gardeners and landscapers often have the time to do the work but not the van or licence to take the waste away. We can collect after you finish, so you leave a client's garden clear.",
          "Landlords and letting agents use garden clearances to bring overgrown gardens back to a lettable standard between tenancies.",
        ],
      },
      {
        h2: "Heavy garden waste: soil, turf and rubble",
        paras: [
          "Soil, turf and hardcore are very heavy for their volume, which affects disposal costs and how much can be legally carried per load. Tell us roughly how much you have and send a photo so the quote is accurate.",
        ],
      },
    ],
    faqs: [
      { q: "Does garden waste need to be bagged?", a: "No. We can load it bagged or loose — loose is often quicker if it's piled in one place." },
      { q: "Can you take Japanese knotweed?", a: "Japanese knotweed is controlled waste and must be handled by a specialist. We don't include it in a standard garden clearance." },
      { q: "Can you remove an old shed as well?", a: "Yes, see shed and garage clearance — we can dismantle and remove most timber sheds." },
    ],
    related: ["shed-garage-clearance", "hot-tub-removal", "builders-waste-removal", "house-clearance"],
    customers: ["Homeowners", "Gardeners", "Landscapers", "Landlords"],
    keywords: {
      primary: "garden waste removal Watford",
      secondary: ["garden clearance Watford", "green waste collection Watford", "garden rubbish removal Hertfordshire"],
      longTail: ["hedge cuttings collection", "who takes away garden waste", "garden waste collection for landscapers"],
    },
  },
  {
    slug: "furniture-removal",
    name: "Furniture Removal & Disposal",
    short: "Furniture removal",
    icon: "chair",
    group: "items",
    h1: "Furniture Removal & Disposal in Watford",
    metaTitle: "Furniture Removal Watford | Old Furniture Collection",
    metaDescription:
      "Old furniture collected from any room in Watford — wardrobes, beds, tables, desks and more. We carry it out, dismantle if needed and recycle. Free quotes.",
    lead:
      "Wardrobes, beds, chests of drawers, dining sets and desks collected from any room — we carry them out and dismantle if needed, so you don't have to.",
    answer:
      "Furniture removal is the collection and disposal of unwanted furniture from your home or business. Good-condition pieces can be reused; wood and metal are recycled; upholstered seating has to be handled under specific rules. We collect from inside the property, not just the kerb.",
    cardText: "Wardrobes, beds, tables and more, carried out from any room and dismantled if needed.",
    takes: ["Wardrobes and chests of drawers", "Bed frames and headboards", "Dining tables and chairs", "Desks and bookcases", "Flat-pack and solid wood furniture", "Garden furniture"],
    blocks: [
      {
        h2: "Collected from inside — not left on the kerb",
        paras: [
          "Unlike many collection services, we carry items out from where they are — upstairs bedrooms, lofts, flats with stairs. Large wardrobes and beds are dismantled on site where needed to get them out safely without damaging walls or banisters.",
        ],
      },
      {
        h2: "Single items or a full load",
        paras: [
          "Whether it's one wardrobe or a room's worth of furniture, the price reflects the volume and the effort to get it out. Combining several items in one visit is usually better value than separate collections.",
        ],
      },
      {
        h2: "Reuse, recycling and upholstered items",
        paras: [
          "Furniture in reusable condition is set aside for reuse where possible. Solid wood and metal frames are recycled. Sofas, armchairs and other upholstered seating are covered by POPs regulations and are dealt with separately — see our sofa removal page.",
        ],
      },
    ],
    faqs: [
      { q: "Do I need to dismantle furniture before collection?", a: "No. We dismantle wardrobes, beds and similar items on site where it's needed to get them out." },
      { q: "Can you collect just one item?", a: "Yes. Single-item collections are available; adding other items to the same visit is usually more cost-effective." },
      { q: "Is this cheaper than the council?", a: "Council bulky collections can be cheaper for a few kerbside items, but have limits on item types and usually require items to be outside. See our council vs private collection guide." },
    ],
    related: ["sofa-removal", "piano-removal", "mattress-disposal", "bulky-waste-collection"],
    customers: ["Homeowners", "Tenants", "Landlords", "Offices"],
    keywords: {
      primary: "furniture removal Watford",
      secondary: ["furniture disposal Watford", "old furniture collection Watford", "wardrobe removal"],
      longTail: ["get rid of old furniture Watford", "furniture collection from upstairs", "who takes old furniture away"],
    },
  },
  {
    slug: "sofa-removal",
    name: "Sofa Removal",
    short: "Sofa removal",
    icon: "sofa",
    group: "items",
    h1: "Sofa Removal & Disposal in Watford",
    metaTitle: "Sofa Removal Watford | Old Sofa Collection (POPs Compliant)",
    metaDescription:
      "Old sofa and armchair collection in Watford, handled under the POPs rules for upholstered seating. Corner sofas, recliners and sofa beds. Get a free quote.",
    lead:
      "Corner sofas, recliners, sofa beds and armchairs collected from inside your home and disposed of correctly under the rules for upholstered seating.",
    answer:
      "Old sofas and armchairs can't simply go in general waste. Upholstered domestic seating may contain persistent organic pollutants (POPs) from flame retardants, so the Environment Agency requires it to be kept separate and destroyed, usually by incineration, rather than landfilled or shredded with other waste.",
    cardText: "Sofas, armchairs, recliners and sofa beds, disposed of under POPs rules.",
    takes: ["Two and three-seater sofas", "Corner and modular sofas", "Sofa beds", "Recliners (manual and electric)", "Armchairs and footstools", "Upholstered dining and office chairs"],
    blocks: [
      {
        h2: "Why sofa disposal has its own rules",
        paras: [
          "Many sofas and armchairs contain flame-retardant chemicals classed as persistent organic pollutants (POPs). Environment Agency guidance requires waste upholstered domestic seating to be kept separate from other waste and destroyed, rather than sent to landfill or recycled. That's why sofa disposal can cost more than a table or wardrobe of the same size.",
          "It applies whether the sofa is fabric or leather, and includes items like upholstered office chairs, footstools and futons.",
        ],
      },
      {
        h2: "Awkward sofas and tight spaces",
        subs: [
          { h3: "Corner and modular sofas", text: "Usually separated into sections before carrying out." },
          { h3: "Electric recliners", text: "Mechanisms and motors are disconnected and handled as part of the collection." },
          { h3: "Upstairs flats", text: "Let us know the floor and whether there is a lift so we bring enough hands." },
        ],
      },
      {
        h2: "Can my old sofa be donated?",
        paras: [
          "Charities can only accept upholstered furniture that still carries its fire safety label. If yours has a label and is in good condition, donating is worth a try. If not, it needs disposal under the POPs rules.",
        ],
      },
    ],
    faqs: [
      { q: "Why is sofa removal more expensive than other furniture?", a: "Upholstered seating has to be separated and destroyed under the POPs rules, which costs more than general waste or wood recycling." },
      { q: "How much does sofa removal cost in Watford?", a: "It depends on the size and number of pieces (a corner sofa costs more than an armchair), access, and whether other items are going too. Send a photo and we'll give you a fixed price — see our pricing page for what affects the cost." },
      { q: "Will the council take my sofa?", a: "Watford Borough Council's standard bulky waste service has excluded sofas and upholstered items, so check watford.gov.uk for the current position or book a private collection." },
      { q: "Can you take a sofa bed with the metal frame?", a: "Yes. Sofa beds are collected whole and handled as upholstered seating." },
    ],
    related: ["furniture-removal", "mattress-disposal", "bulky-waste-collection"],
    customers: ["Homeowners", "Tenants", "Landlords", "Furniture retailers"],
    keywords: {
      primary: "sofa removal Watford",
      secondary: ["sofa collection Watford", "sofa disposal Watford", "old sofa removal Hertfordshire", "armchair disposal"],
      longTail: ["how to get rid of an old sofa", "why does sofa disposal cost more", "POPs sofa disposal rules", "corner sofa removal"],
    },
  },
  {
    slug: "mattress-disposal",
    name: "Mattress Disposal",
    short: "Mattress disposal",
    icon: "bed",
    group: "items",
    h1: "Mattress Collection & Disposal in Watford",
    metaTitle: "Mattress Disposal Watford | Old Mattress Collection",
    metaDescription:
      "Mattress collection in Watford — single to super-king mattresses and divans collected from inside your home and recycled where possible. Call 01293 549164.",
    lead:
      "Single, double, king and super-king mattresses and divan bases collected from inside your home. We aim to send mattresses for recycling rather than landfill where a recycler can take them.",
    answer:
      "To get rid of an old mattress you can book a council bulky collection, take it to a household waste recycling centre, use a retailer take-back scheme when buying new, or book a licensed collector. Mattresses can be stripped and recycled — springs, foam and fabric are separated.",
    cardText: "Mattresses and divan bases collected and sent for recycling where possible.",
    takes: ["Single and double mattresses", "King and super-king mattresses", "Divan bases and headboards", "Memory foam and pocket sprung", "Cot and children's mattresses", "Bed frames (see furniture removal)"],
    blocks: [
      {
        h2: "Mattress collection without the hassle",
        paras: [
          "Mattresses are heavy, floppy and awkward on stairs. We carry them out from the bedroom, so you don't have to wrestle one into a car or leave it outside to get wet — which can make it harder to recycle.",
        ],
      },
      {
        h2: "What happens to your old mattress",
        paras: [
          "Where we can, mattresses go to a recycler where the steel springs, foam and textiles are separated. Mattresses that are wet, contaminated or damaged may not be accepted for recycling and are disposed of through licensed routes.",
        ],
      },
      {
        h2: "Landlords and holiday lets",
        paras: [
          "Landlords, HMOs and short-let hosts often replace several mattresses at once. Multiple mattress collections can be booked in one visit, including from different flats in the same building.",
        ],
      },
    ],
    faqs: [
      { q: "Does the mattress need to be in a bag?", a: "No, but keeping it dry helps — a wet mattress is much harder to recycle." },
      { q: "Can you take the bed frame too?", a: "Yes, bed frames and divan bases can be collected in the same visit." },
      { q: "Can you take a stained or damaged mattress?", a: "Yes. It may not be suitable for recycling, but it will still be disposed of through licensed routes." },
    ],
    related: ["furniture-removal", "sofa-removal", "end-of-tenancy-clearance"],
    customers: ["Homeowners", "Landlords", "HMO managers", "Holiday let hosts"],
    keywords: {
      primary: "mattress disposal Watford",
      secondary: ["mattress collection Watford", "mattress removal Watford", "old mattress recycling Hertfordshire"],
      longTail: ["how to get rid of an old mattress in Watford", "mattress collection near me", "do mattresses get recycled"],
    },
  },
  {
    slug: "hot-tub-removal",
    name: "Hot Tub Removal",
    short: "Hot tub removal",
    icon: "tub",
    group: "items",
    h1: "Hot Tub Removal & Disposal in Watford",
    metaTitle: "Hot Tub Removal Watford | Old Hot Tub & Spa Disposal",
    metaDescription:
      "Hot tub removal in Watford and within 30 miles — hard-shell spas cut up and removed through side gates, inflatables collected. Call 01293 549164 for a quote.",
    lead:
      "Old hard-shell hot tubs, swim spas and inflatable tubs taken away — dismantled on site where needed so they can come out through side gates and gardens, with the cabinet, cover, pump and shell all disposed of properly.",
    answer:
      "To remove an old hot tub, it needs to be drained and electrically disconnected first. A hard-shell tub is usually too big and heavy to lift whole, so it is cut into sections on site and carried out; the acrylic shell, timber or composite cabinet, foam insulation, cover, pumps and heater are then separated for recycling or disposal.",
    cardText: "Hard-shell and inflatable hot tubs dismantled on site and removed — cover, pump and all.",
    takes: [
      "Hard-shell acrylic hot tubs",
      "Swim spas (on survey)",
      "Inflatable and soft-sided tubs",
      "Covers, steps and cover lifters",
      "Pumps, heaters and control units",
      "Gazebos and surrounding decking",
    ],
    blocks: [
      {
        h2: "Before we arrive",
        list: [
          "Drain the hot tub fully — ideally a day or two before",
          "Have a qualified electrician isolate and disconnect the power supply",
          "Clear a path from the tub to the road or driveway",
          "Tell us the gate width and any steps along the route",
        ],
      },
      {
        h2: "Cutting up and removing a hard-shell hot tub",
        paras: [
          "A typical hard-shell hot tub is wider than most side gates and weighs several hundred kilograms even when empty. Rather than craning it out, we cut it into manageable sections on site, then carry them through the garden — leaving the base clear and the area swept.",
          "If you'd like the concrete base, decking or a gazebo removed as well, mention it at the quote stage so it's included.",
        ],
      },
      {
        h2: "What happens to an old hot tub",
        paras: [
          "Hot tubs are made of mixed materials. Timber and metal are recycled, pumps, heaters and controls are handled as electrical waste (WEEE), and the remaining acrylic shell and foam go through licensed disposal routes.",
        ],
      },
    ],
    faqs: [
      { q: "Do I need to drain the hot tub first?", a: "Yes. A full tub is far too heavy to move, and water damages the route through your garden. Drain it a day or two before collection." },
      { q: "Can you disconnect the electrics?", a: "Hot tubs are usually hard-wired, so the supply should be isolated and disconnected by a qualified electrician before we arrive." },
      { q: "Will it fit through my side gate?", a: "Usually not in one piece — which is why hard-shell tubs are cut into sections on site. Tell us your gate width when you ask for a quote." },
      { q: "How much does hot tub removal cost?", a: "It depends on the size of the tub, how far it has to be carried, and whether decking, steps or a base are going too. Send photos for a fixed price." },
    ],
    related: ["garden-waste-clearance", "builders-waste-removal", "bulky-waste-collection"],
    customers: ["Homeowners", "Landlords", "Holiday let owners", "Hotels and leisure"],
    keywords: {
      primary: "hot tub removal Watford",
      secondary: ["hot tub disposal Watford", "old hot tub removal Hertfordshire", "spa removal Watford", "hot tub collection"],
      longTail: ["how to get rid of an old hot tub", "hot tub cut up and removal", "how much does hot tub removal cost", "do I need to drain a hot tub before removal"],
    },
  },
  {
    slug: "piano-removal",
    name: "Piano Removal & Disposal",
    short: "Piano removal",
    icon: "piano",
    group: "items",
    h1: "Piano Removal & Disposal in Watford",
    metaTitle: "Piano Removal Watford | Old Piano Collection & Disposal",
    metaDescription:
      "Old piano removal and disposal in Watford and within 30 miles — upright pianos and organs carried out safely, dismantled where needed. Call 01293 549164.",
    lead:
      "Unwanted upright pianos, organs and keyboards taken out of homes, schools, churches and halls — carried out safely by a full team, and dismantled on site where that's the only way out.",
    answer:
      "To get rid of an old piano, first check whether anyone wants it — many older pianos have little resale value, but some can be rehomed. If not, a removal team carries it out (or dismantles it on site) and the wood, metal strings and cast-iron frame are separated for recycling, with the remainder disposed of through licensed routes.",
    cardText: "Unwanted upright pianos and organs carried out safely, rehomed or recycled.",
    takes: [
      "Upright pianos",
      "Baby grand and grand pianos (on survey)",
      "Pianolas and player pianos",
      "Electric organs and keyboards",
      "Piano stools",
      "Other heavy furniture in the same visit",
    ],
    blocks: [
      {
        h2: "Pianos are heavy — and awkward",
        paras: [
          "A typical upright piano weighs a couple of hundred kilograms, with most of that weight in its cast-iron frame. Moving one safely takes enough people, the right equipment and care for floors, door frames and steps. Tell us about stairs, steps up to the front door and doorway widths when you ask for a quote.",
        ],
      },
      {
        h2: "Rehome, recycle or dispose",
        subs: [
          { h3: "Rehoming", text: "If your piano is in playable condition, it's worth asking local schools, churches, community groups or listing it free before arranging disposal." },
          { h3: "Recycling", text: "When a piano can't be rehomed, the timber, steel strings and iron frame are separated so most of it can be recycled." },
          { h3: "Dismantling on site", text: "Where a piano can't come out whole — tight stairs or a narrow doorway — it can be taken apart where it stands." },
        ],
      },
      {
        h2: "Schools, churches and halls",
        paras: [
          "Schools, churches and community halls replacing an old instrument can book a collection too. Collections can be scheduled outside opening hours, including evenings and weekends, and invoiced to the organisation.",
        ],
      },
    ],
    faqs: [
      { q: "Is my old piano worth anything?", a: "Many older uprights have little or no resale value, but some are wanted by schools, community groups or individuals. It's worth checking before you arrange disposal." },
      { q: "Can you take a piano down stairs?", a: "Yes, with the right team and equipment. Let us know about stairs and steps so we bring enough people." },
      { q: "Do you move pianos to a new home?", a: "This service is for removing and disposing of unwanted pianos. For moving a piano you're keeping, use a specialist piano mover." },
    ],
    related: ["furniture-removal", "house-clearance", "bulky-waste-collection"],
    customers: ["Homeowners", "Schools", "Churches", "Community halls", "Executors"],
    keywords: {
      primary: "piano removal Watford",
      secondary: ["piano disposal Watford", "old piano collection Hertfordshire", "upright piano removal", "organ disposal"],
      longTail: ["how to get rid of an old piano", "is my old piano worth anything", "piano disposal near me", "who takes old pianos"],
    },
  },
  {
    slug: "bulky-waste-collection",
    name: "Bulky Waste Collection",
    short: "Bulky waste",
    icon: "box",
    group: "items",
    h1: "Bulky Waste Collection in Watford",
    metaTitle: "Bulky Waste Collection Watford | Large Item Removal",
    metaDescription:
      "Bulky waste collection in Watford — large items collected from inside your home, including sofas and electricals the council won't take. Call 01293 549164.",
    lead:
      "Large household items that won't fit in your bin — furniture, appliances, sofas, carpets, bikes and exercise equipment — collected from wherever they are in the home.",
    answer:
      "Bulky waste means large household items too big for normal bin collections. In Watford you can book the council's bulky collection for a limited number of eligible items left outside, or book a private licensed collector who can take mixed items, including electricals and sofas, from inside the property.",
    cardText: "Large items the bin men won't take — collected from inside, mixed loads welcome.",
    takes: ["Furniture and sofas", "Washing machines and dryers", "Carpets and rugs", "Exercise equipment", "Bikes, prams and toys", "TVs and electricals"],
    blocks: [
      {
        h2: "Council bulky collection or a private collection?",
        paras: [
          "At the time of writing, Watford Borough Council's bulky waste service listed £57 for up to three items, excluding electricals and sofas or other upholstered items, with items collected from outside the property. Prices and rules change, so check watford.gov.uk for the current details.",
          "A private collection makes more sense when you have more than a few items, items the council excludes, items that need carrying out from upstairs, or a deadline the council's booking slots can't meet.",
        ],
      },
      {
        h2: "Mixed loads in one visit",
        paras: [
          "Most people don't have just one bulky item. We can take furniture, appliances, carpets and boxed items together, priced on the total volume rather than per item.",
        ],
      },
    ],
    faqs: [
      { q: "Do items need to be left outside?", a: "No. We collect from inside the property, including upstairs rooms and lofts." },
      { q: "Is there a limit on the number of items?", a: "No fixed limit — the price is based on volume and item types." },
      { q: "Can you take electricals?", a: "Yes, electricals are separated and sent for proper WEEE treatment." },
    ],
    related: ["furniture-removal", "sofa-removal", "hot-tub-removal", "piano-removal"],
    customers: ["Homeowners", "Tenants", "Landlords"],
    keywords: {
      primary: "bulky waste collection Watford",
      secondary: ["large item collection Watford", "bulky item removal Watford", "bulky rubbish collection Hertfordshire"],
      longTail: ["Watford council bulky waste alternative", "bulky waste collection same week", "council won't take sofa Watford"],
    },
  },
  {
    slug: "fridge-freezer-removal",
    name: "Fridge & Freezer Removal",
    short: "Fridge freezer removal",
    icon: "fridge",
    group: "items",
    h1: "Fridge Freezer Removal & Disposal in Watford",
    metaTitle: "Fridge Freezer Removal Watford | Safe Appliance Disposal",
    metaDescription:
      "Fridge and freezer removal in Watford — American-style, integrated and chest freezers collected and sent for proper WEEE treatment. Request a free quote.",
    lead:
      "Fridges, freezers, fridge-freezers and American-style units collected and sent for specialist treatment, so refrigerant gases and insulation are dealt with properly.",
    answer:
      "Fridges and freezers contain refrigerant gases and insulation foam that must be removed at an authorised treatment facility. They count as waste electrical and electronic equipment (WEEE) and should never be dumped or broken up. A licensed collector will take them for proper treatment.",
    cardText: "Fridges, freezers and American-style units sent for specialist WEEE treatment.",
    takes: ["Fridge-freezers", "American-style fridges", "Chest and upright freezers", "Under-counter fridges", "Integrated units (once disconnected)", "Wine coolers and drinks fridges"],
    blocks: [
      {
        h2: "Why fridges need special handling",
        paras: [
          "Refrigeration appliances contain gases in the cooling circuit and often in the insulation foam. These must be recovered in a controlled process at a permitted treatment facility. Damaging the pipework — for example by dragging a fridge down stairs carelessly — can release them.",
        ],
      },
      {
        h2: "Before we arrive",
        list: [
          "Empty and defrost the appliance — ideally 24 hours before",
          "Mop up any water so it isn't carried through the house",
          "For integrated or plumbed-in units, have them disconnected first",
        ],
      },
      {
        h2: "Other appliances in the same visit",
        paras: ["Washing machines, dryers, cookers, microwaves and dishwashers can be collected at the same time — all are WEEE and handled for recycling."],
      },
    ],
    faqs: [
      { q: "Do I need to defrost the freezer first?", a: "Yes please — an empty, defrosted unit is safer to move and avoids water leaking through your home." },
      { q: "Can you disconnect an integrated fridge?", a: "Plumbed-in or integrated appliances should be disconnected by a qualified person before collection." },
      { q: "Can you take a washing machine or cooker as well?", a: "Yes. Washing machines, tumble dryers, dishwashers, cookers and microwaves can all be collected in the same visit and sent for WEEE recycling. Have them disconnected first." },
      { q: "Will the retailer take my old fridge?", a: "Many retailers offer take-back when delivering a new appliance, sometimes for a fee. If yours doesn't, or you're not replacing it, book a collection." },
    ],
    related: ["bulky-waste-collection", "house-clearance", "office-clearance"],
    customers: ["Homeowners", "Landlords", "Offices", "Pubs and cafés"],
    keywords: {
      primary: "fridge freezer removal Watford",
      secondary: ["fridge disposal Watford", "freezer collection Watford", "old fridge collection Hertfordshire", "washing machine removal Watford", "appliance disposal Watford"],
      longTail: ["how to dispose of a fridge freezer", "American fridge freezer removal", "do I need to defrost a fridge before collection"],
    },
  },
  {
    slug: "builders-waste-removal",
    name: "Builders Waste Removal",
    short: "Builders waste",
    icon: "brick",
    group: "commercial",
    h1: "Builders Waste Removal in Watford",
    metaTitle: "Builders Waste Removal Watford | Rubble & Renovation Waste",
    metaDescription:
      "Builders waste removal in Watford — rubble, plasterboard, timber and kitchen strip-outs. A skip alternative with loading included. Call 01293 549164 24/7.",
    lead:
      "Rubble, timber, plasterboard, old kitchens and bathroom suites removed from building sites and renovations — loaded by us, with no skip permit and no skip sitting on your drive.",
    answer:
      "Builders waste removal is a wait-and-load alternative to skip hire for construction and renovation waste. It suits jobs where there's no room for a skip, a permit would be needed on the road, or the waste is ready now. Rubble, plasterboard and timber are kept separate where possible because they're treated differently.",
    cardText: "Rubble, timber, plasterboard and strip-out waste — loading included, no skip needed.",
    takes: ["Bricks, rubble and hardcore", "Timber and old doors", "Plasterboard (kept separate)", "Kitchen and bathroom strip-outs", "Tiles, carpet and underlay", "Packaging and offcuts"],
    blocks: [
      {
        h2: "Skip hire or a waste collection?",
        subs: [
          { h3: "When a collection makes sense", text: "No off-road space for a skip, waste is already bagged and waiting, you want it gone today rather than over a hire period, or you want the loading done for you." },
          { h3: "When a skip may be better", text: "Large ongoing projects producing waste daily over several weeks, where a skip on a driveway is practical." },
        ],
      },
      {
        h2: "Why we separate plasterboard and rubble",
        paras: [
          "Gypsum-based waste such as plasterboard shouldn't be mixed with general biodegradable waste in landfill, so it's kept apart. Heavy inert waste like rubble and soil is priced differently to bulky, lighter waste, so separating loads keeps costs down.",
        ],
      },
      {
        h2: "For trades and for homeowners",
        paras: [
          "We work with builders, kitchen fitters, bathroom installers and decorators who would rather spend their time on the next job than a trip to a transfer station, and with homeowners clearing up after DIY projects.",
        ],
      },
    ],
    faqs: [
      { q: "Can you take asbestos?", a: "No. Asbestos must be handled by a licensed specialist. If you suspect asbestos, don't disturb it — get it tested." },
      { q: "Is rubble more expensive to remove?", a: "Rubble and soil are heavy, so a load is priced by weight as well as volume. Send a photo and rough quantity for an accurate quote." },
      { q: "Do I need a permit?", a: "No permit is needed for a collection, as nothing is left on the road." },
    ],
    related: ["garden-waste-clearance", "office-clearance", "shed-garage-clearance"],
    customers: ["Builders", "Kitchen and bathroom fitters", "Decorators", "Homeowners"],
    keywords: {
      primary: "builders waste removal Watford",
      secondary: ["rubble removal Watford", "construction waste collection Watford", "renovation waste removal Hertfordshire"],
      longTail: ["skip alternative Watford", "plasterboard disposal", "kitchen strip out waste removal"],
    },
  },
  {
    slug: "shed-garage-clearance",
    name: "Shed & Garage Clearance",
    short: "Shed & garage clearance",
    icon: "shed",
    group: "home",
    h1: "Shed & Garage Clearance in Watford",
    metaTitle: "Garage Clearance Watford | Shed Clearance & Removal",
    metaDescription:
      "Garage and shed clearances in Watford — years of clutter cleared, old sheds dismantled and removed, recyclables separated. Get a free, no-obligation quote.",
    lead:
      "Years of tools, tins, bikes, boxes and broken furniture cleared from garages, sheds, outbuildings and lock-ups — and the shed itself taken down and removed if you want it gone.",
    answer:
      "A garage or shed clearance removes accumulated contents and, if needed, the structure itself. Most contents can be recycled — metals, wood, cardboard and electricals — but paint, chemicals and gas bottles need separate handling, so mention them when you ask for a quote.",
    cardText: "Garages, sheds, lock-ups and outbuildings cleared — sheds dismantled if needed.",
    takes: ["Tools and garden equipment", "Bikes and sports equipment", "Boxes and stored furniture", "Scrap metal", "Timber sheds (dismantled)", "Old shelving and workbenches"],
    blocks: [
      {
        h2: "Clearing a garage, shed or lock-up",
        paras: [
          "Garages tend to fill up over years with things that 'might be useful'. We clear the lot, or work through it with you so anything worth keeping is put aside first.",
        ],
      },
      {
        h2: "Shed dismantling and removal",
        paras: [
          "Timber sheds, summerhouses and small greenhouses can be dismantled and removed, leaving the base clear. Concrete bases and asbestos-cement roofs are specialist jobs and need assessing first.",
        ],
      },
      {
        h2: "Things to mention when you ask for a quote",
        list: ["Paint tins and chemicals", "Gas bottles", "Car batteries and tyres", "Anything you suspect may contain asbestos (common in older garage roofs)"],
      },
    ],
    faqs: [
      { q: "Can you take paint tins?", a: "Dried-out paint tins can usually be taken; liquid paints and chemicals need separate handling. Tell us what you have." },
      { q: "Can you remove the shed itself?", a: "Yes, most timber sheds can be dismantled and removed in the same visit." },
      { q: "My garage roof might be asbestos — can you help?", a: "Asbestos-cement roofs must be dealt with by a licensed specialist. We can clear the contents once it's been assessed." },
    ],
    related: ["garden-waste-clearance", "house-clearance", "builders-waste-removal"],
    customers: ["Homeowners", "Landlords", "Estate agents"],
    keywords: {
      primary: "garage clearance Watford",
      secondary: ["shed clearance Watford", "shed removal Watford", "lock-up clearance Hertfordshire"],
      longTail: ["shed dismantling and removal", "how much to clear a garage", "garage clearance before conversion"],
    },
  },
  {
    slug: "domestic-bin-collection",
    name: "Domestic Waste Collection",
    short: "Domestic bin collection",
    icon: "bin",
    group: "home",
    h1: "Domestic Bin & Overflow Waste Collection in Watford",
    metaTitle: "Domestic Bin Collection Watford | Overflow & Extra Waste Pickups",
    metaDescription:
      "Extra household rubbish collections in Watford for overflowing bins, side waste and post-party clear-ups — one-off or regular. Call 01293 549164, 24/7.",
    lead:
      "When your household bins aren't enough — after a clear-out, a party, a missed collection or with a busy shared house — we collect the extra bagged waste, one-off or on a regular arrangement.",
    answer:
      "Your council collects standard household bins on a set schedule. A private domestic waste collection picks up the extra: overflowing bags, side waste the council won't take, and build-ups after a missed collection. It can be booked as a one-off or as a regular arrangement.",
    cardText: "Extra household rubbish, overflowing bins and side waste — one-off or regular.",
    takes: ["Bagged household rubbish", "Overflowing and side waste", "Recycling build-ups", "Post-party waste", "HMO and shared-house waste", "End-of-tenancy bags"],
    blocks: [
      {
        h2: "When a private household collection helps",
        list: [
          "After a missed council collection, when bags have piled up",
          "After a big clear-out, party or family gathering",
          "Shared houses and HMOs that regularly produce more than the bins hold",
          "End of tenancy, when bags have been left behind",
        ],
      },
      {
        h2: "Overflow collections",
        paras: [
          "When bins are full before collection day, bags end up beside them — attracting foxes and pests and, in some areas, enforcement letters. We collect overflowing and side waste as a one-off or on a regular arrangement, so bins and bin stores stay under control.",
        ],
      },
      {
        h2: "One-off or regular",
        paras: [
          "Most households book a single collection. Landlords and managing agents with shared houses or blocks often prefer a regular arrangement on account — see our contract and account waste services.",
        ],
      },
      {
        h2: "Council collections still come first",
        paras: [
          "This doesn't replace your council bin service — it supplements it. For regular household recycling, food and garden waste, Watford residents should use Watford Borough Council's collections.",
        ],
      },
    ],
    faqs: [
      { q: "Do you replace my council bin collection?", a: "No — this is for extra waste on top of the council's service." },
      { q: "Can you collect from a bin store in a block of flats?", a: "Yes, with access arranged with the building's managing agent." },
      { q: "Do you clean bins?", a: "Bin cleaning is a separate service — ask us if you need it and we'll confirm whether it's available in your area." },
    ],
    related: ["bulky-waste-collection", "commercial-bin-collection", "contract-waste-services", "house-clearance"],
    customers: ["Homeowners", "Landlords", "HMO managers", "Managing agents"],
    keywords: {
      primary: "domestic waste collection Watford",
      secondary: ["household rubbish collection Watford", "extra bin collection Watford", "private bin collection Watford", "overflow waste collection Watford"],
      longTail: ["missed bin collection what to do with rubbish", "rubbish bags collection near me", "HMO waste collection"],
    },
  },
  {
    slug: "contract-waste-services",
    name: "Contract & Account Waste Services",
    short: "Contracts & accounts",
    icon: "handshake",
    group: "commercial",
    h1: "Contract & Account Waste Services in Watford",
    metaTitle: "Waste Contracts & Trade Accounts Watford | Managed Collections",
    metaDescription:
      "Waste contracts and trade accounts for agents, landlords, housing providers, facilities managers and trades within 30 miles of Watford. Call 01293 549164.",
    lead:
      "For organisations that need waste handled again and again — scheduled collections, bin store and overflow clearances, void property clearances and call-out work, set up on contract or a credit account with one point of contact.",
    answer:
      "A waste contract or trade account lets a business or property manager book recurring or on-demand collections without quoting each job from scratch. Work is carried out to agreed terms, documented with waste transfer notes, and invoiced on account. Watford Rubbish Clearance offers contract and account work across a 30-mile radius of Watford, 24/7.",
    cardText: "Scheduled collections, overflow clearances and call-out work on contract or account.",
    takes: [
      "Scheduled commercial bin collections",
      "Bin store and overflow clearances",
      "Void and end of tenancy clearances",
      "Fly-tipped waste on private land",
      "Office and site clear-outs",
      "Out-of-hours and same-day call-outs",
    ],
    blocks: [
      {
        h2: "Who uses contract and account work",
        subs: [
          { h3: "Managing agents and block managers", text: "Regular bin store checks and overflow collections, bulky items dumped in communal areas, and clear-outs of shared spaces." },
          { h3: "Letting agents and portfolio landlords", text: "End of tenancy and void clearances across multiple properties, booked with one call and invoiced monthly." },
          { h3: "Housing associations and councils", text: "Void clearances, hoarder clearances and removal of items from communal areas, with photo records of completed work." },
          { h3: "Facilities managers and businesses", text: "Scheduled trade waste collections plus ad-hoc clear-outs after refits, moves or stock changes." },
          { h3: "Builders and trades", text: "Wait-and-load collections from sites as jobs progress, without skip hire or permits." },
        ],
      },
      {
        h2: "Overflow and bin store collections",
        paras: [
          "Overflowing bin stores attract pests, block access and lead to complaints. We clear excess bagged waste, side waste and dumped bulky items from bin stores and communal areas — as a one-off, on a regular schedule, or on call when residents or site staff report a problem.",
        ],
      },
      {
        h2: "What an account includes",
        list: [
          "Agreed rates for repeat work",
          "One phone number, available 24/7, for bookings and urgent call-outs",
          "Waste transfer notes and photo records for each job",
          "Invoicing to the business, agent or client on account",
          "Cover across a 30-mile radius of Watford town centre",
        ],
      },
    ],
    faqs: [
      { q: "How do I open an account?", a: "Call us or use the quote form with your organisation's details, the properties or sites involved and the type of work you expect. We'll agree terms and set up the account." },
      { q: "Can you work on a fixed schedule as well as on call?", a: "Yes. Contracts can combine scheduled collections — weekly, fortnightly or monthly — with same-day or out-of-hours call-outs when needed." },
      { q: "Do you provide paperwork for compliance?", a: "Yes. Each job is documented with a waste transfer note, and photo records can be provided for your files or your clients." },
    ],
    related: ["commercial-bin-collection", "domestic-bin-collection", "end-of-tenancy-clearance", "office-clearance"],
    customers: ["Managing agents", "Letting agents", "Housing associations", "Councils", "Facilities managers", "Builders"],
    keywords: {
      primary: "waste collection contract Watford",
      secondary: ["trade waste account Watford", "managing agent waste services Hertfordshire", "bin store clearance Watford", "commercial waste contract Hertfordshire"],
      longTail: ["overflowing bin store clearance", "void property clearance contractor", "waste contractor for letting agents", "regular rubbish collection for blocks of flats"],
    },
  },
  {
    slug: "commercial-bin-collection",
    name: "Commercial Waste Collection",
    short: "Commercial bin collection",
    icon: "binCommercial",
    group: "commercial",
    h1: "Commercial Waste & Bin Collection in Watford",
    metaTitle: "Commercial Waste Collection Watford | Trade Bin Collections",
    metaDescription:
      "Commercial waste and trade bin collections in Watford — scheduled contracts, overflow and one-off pickups, with waste transfer notes. Call 01293 549164, 24/7.",
    lead:
      "Trade waste collection for shops, offices, cafés, salons and small businesses in Watford — scheduled bin collections or one-off pickups, with the paperwork your business needs.",
    answer:
      "Businesses in England can't use household bins for trade waste. They must use a registered waste carrier, keep waste transfer notes, and — under Simpler Recycling — separate recyclables and food waste (from 31 March 2025 for businesses with 10 or more employees; micro-firms from 31 March 2027).",
    cardText: "Scheduled trade bins and one-off pickups for Watford businesses, with paperwork.",
    takes: ["General trade waste", "Dry mixed recycling", "Cardboard", "Glass (by arrangement)", "Food waste (by arrangement)", "One-off excess waste"],
    blocks: [
      {
        h2: "What businesses must do with their waste",
        subs: [
          { h3: "Duty of care", text: "Every business is responsible for its waste until it's passed to an authorised person, and should keep waste transfer notes as a record." },
          { h3: "Simpler Recycling", text: "In England, workplaces with 10 or more full-time-equivalent employees have had to separate dry recyclables, food waste and residual waste since 31 March 2025. Micro-businesses (fewer than 10) have until 31 March 2027." },
          { h3: "No household bins", text: "Trade waste can't go into household bins or council recycling banks, even for home-based businesses." },
        ],
      },
      {
        h2: "Scheduled contracts or one-off collections",
        paras: [
          "Some businesses need weekly bin collections on contract; others just need occasional pickups of excess cardboard or stock waste after a refit. Both are available, and regular customers can be set up on account — see contract and account waste services.",
        ],
      },
      {
        h2: "Commercial overflow collections",
        paras: [
          "Busy weeks, deliveries and seasonal peaks can leave trade bins overflowing. We collect the excess — bagged waste, cardboard and side waste — on call or on a schedule, 24/7, so it doesn't sit outside your premises.",
        ],
      },
      {
        h2: "Businesses we work with",
        list: ["Shops and retail units", "Offices", "Cafés, takeaways and pubs", "Hair and beauty salons", "Schools and nurseries", "Trades with yards and units"],
      },
    ],
    faqs: [
      { q: "Do I need a waste transfer note?", a: "Yes. Businesses should keep waste transfer notes for their waste, and we will provide the documentation for collections." },
      { q: "Can a home-based business use household bins?", a: "No — business waste is commercial waste even if it's produced at home." },
      { q: "Can you collect food waste?", a: "Food waste collections depend on your location and volume — ask us and we'll confirm what's available." },
    ],
    related: ["contract-waste-services", "office-clearance", "builders-waste-removal", "domestic-bin-collection"],
    customers: ["Shops", "Offices", "Hospitality", "Salons", "Schools"],
    keywords: {
      primary: "commercial waste collection Watford",
      secondary: ["trade waste collection Watford", "commercial bin collection Watford", "business waste collection Hertfordshire"],
      longTail: ["Simpler Recycling rules for small businesses", "do businesses need a waste transfer note", "trade waste for home business"],
    },
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export const serviceGroups: { key: Service["group"]; label: string }[] = [
  { key: "home", label: "Home & property clearances" },
  { key: "items", label: "Item collections" },
  { key: "commercial", label: "Business & trade waste" },
];
