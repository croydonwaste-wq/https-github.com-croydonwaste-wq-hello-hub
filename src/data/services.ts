import type { Service } from "./types";

/**
 * Service pages. The homepage owns "rubbish removal / rubbish clearance Watford",
 * so there is deliberately no separate /rubbish-removal/ page (see DO-NOT-CREATE list).
 * Each service URL owns one keyword cluster; synonyms (removal / collection / disposal)
 * are grouped on the same URL.
 */
export const services: Service[] = [
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
          "Landlords and letting agents between tenancies",
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
    related: ["probate-clearance", "furniture-removal", "shed-garage-clearance", "garden-waste-clearance"],
    customers: ["Homeowners", "Landlords", "Estate agents", "Executors"],
    keywords: {
      primary: "house clearance Watford",
      secondary: ["house clearance company Watford", "flat clearance Watford", "property clearance Watford", "home clearance Hertfordshire"],
      longTail: ["how long does a house clearance take", "house clearance before selling a house", "part house clearance near me", "loft clearance Watford"],
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
          "Most offices can't stop trading for a clearance. We can work early mornings, evenings or weekends by arrangement, clear floor by floor, and coordinate with building management on lifts, loading bays and parking.",
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
      { q: "Can you clear our office outside working hours?", a: "Evening and weekend clearances can be arranged — tell us your preferred window when you ask for a quote." },
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
    related: ["shed-garage-clearance", "builders-waste-removal", "house-clearance"],
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
    related: ["sofa-removal", "mattress-disposal", "bulky-waste-collection", "house-clearance"],
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
      "Old mattress collection and disposal in Watford — single, double, king and divan bases collected from inside your home and sent for recycling where possible.",
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
    related: ["furniture-removal", "sofa-removal", "bulky-waste-collection"],
    customers: ["Homeowners", "Landlords", "HMO managers", "Holiday let hosts"],
    keywords: {
      primary: "mattress disposal Watford",
      secondary: ["mattress collection Watford", "mattress removal Watford", "old mattress recycling Hertfordshire"],
      longTail: ["how to get rid of an old mattress in Watford", "mattress collection near me", "do mattresses get recycled"],
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
      "Private bulky waste collection in Watford — large household items collected from inside your home, including electricals and sofas the council may not take.",
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
    related: ["furniture-removal", "sofa-removal", "fridge-freezer-removal", "mattress-disposal"],
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
      { q: "Will the retailer take my old fridge?", a: "Many retailers offer take-back when delivering a new appliance, sometimes for a fee. If yours doesn't, or you're not replacing it, book a collection." },
    ],
    related: ["bulky-waste-collection", "house-clearance", "office-clearance"],
    customers: ["Homeowners", "Landlords", "Offices", "Pubs and cafés"],
    keywords: {
      primary: "fridge freezer removal Watford",
      secondary: ["fridge disposal Watford", "freezer collection Watford", "old fridge collection Hertfordshire"],
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
      "Builders waste and renovation rubbish removal in Watford — rubble, plasterboard, timber, old kitchens and bathrooms. A skip alternative with loading included.",
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
    h1: "Extra Domestic Rubbish Collection in Watford",
    metaTitle: "Domestic Bin Collection Watford | Extra Household Waste Pickups",
    metaDescription:
      "Extra household rubbish collections in Watford for overflowing bins, side waste and post-party clear-ups — one-off or regular. Ask us what suits your home.",
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
        h2: "One-off or regular",
        paras: [
          "Most people book a single collection. Landlords and managing agents with shared houses or blocks sometimes prefer a regular arrangement to keep bin stores tidy — ask us about the options for your property.",
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
    related: ["bulky-waste-collection", "commercial-bin-collection", "house-clearance"],
    customers: ["Homeowners", "Landlords", "HMO managers", "Managing agents"],
    keywords: {
      primary: "domestic waste collection Watford",
      secondary: ["household rubbish collection Watford", "extra bin collection Watford", "private bin collection Watford"],
      longTail: ["missed bin collection what to do with rubbish", "rubbish bags collection near me", "HMO waste collection"],
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
      "Trade and commercial waste collection for Watford businesses — scheduled bin collections and one-off pickups with waste transfer notes. Request a business quote.",
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
        h2: "Scheduled or one-off collections",
        paras: [
          "Some businesses need weekly bin collections; others just need occasional pickups of excess cardboard or stock waste after a refit. Tell us about your premises and the waste you produce and we'll suggest what fits.",
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
    related: ["office-clearance", "builders-waste-removal", "domestic-bin-collection"],
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
