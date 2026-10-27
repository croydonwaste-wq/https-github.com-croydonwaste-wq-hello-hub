import type { Location } from "./types";

/**
 * Location pages are only created where there is a distinct, commercially useful
 * search market close to Watford. Watford neighbourhoods (North/West Watford,
 * Leavesden, Garston…) are covered by the homepage and the Areas hub rather than
 * thin standalone pages. Outlying areas (Bedfordshire, Buckinghamshire, North
 * London) are listed on the hub until coverage and demand are confirmed.
 */
export const locations: Location[] = [
  {
    slug: "rubbish-removal-bushey",
    town: "Bushey",
    county: "Hertfordshire",
    h1: "Rubbish Removal in Bushey & Bushey Heath",
    metaTitle: "Rubbish Removal Bushey | Clearances in Bushey & Bushey Heath",
    metaDescription:
      "Rubbish removal and clearances in Bushey, Bushey Heath and Bushey Village — furniture, garden waste, house and garage clearances. Request a free quote.",
    lead: "Rubbish collections and clearances across Bushey, from the village centre and Bushey Heath to Little Bushey and the roads towards Oxhey.",
    answer:
      "Watford Rubbish Clearance collects household, garden and business waste across Bushey (WD23), including Bushey Heath and Bushey Village. We load from inside the property and quote in advance based on the volume and type of waste.",
    areas: ["Bushey Village", "Bushey Heath", "Little Bushey", "Hartsbourne", "Bushey Mead"],
    postcodes: ["WD23"],
    blocks: [
      {
        h2: "Clearances for Bushey homes",
        paras: [
          "Bushey has a mix of family houses with large gardens, Victorian and Edwardian terraces and newer flats, so the jobs vary: garden overhauls and garage clearances on the bigger plots, and furniture and mattress collections from flats where stairs are the challenge.",
          "Bushey sits in Hertsmere rather than Watford borough, so council bulky waste and recycling arrangements are different from Watford's. If the council service doesn't fit what you need to get rid of, we can collect mixed loads in one visit.",
        ],
      },
      {
        h2: "Parking and access",
        paras: [
          "Some roads around the High Street and Bushey Heath are narrow or busy. Mention any parking restrictions or a long carry from the van when you ask for a quote so we can plan the job properly.",
        ],
      },
    ],
    popular: ["garden-waste-clearance", "house-clearance", "furniture-removal", "shed-garage-clearance"],
    nearby: ["rubbish-removal-oxhey", "rubbish-removal-st-albans"],
    faqs: [
      { q: "Do you cover Bushey Heath as well as Bushey?", a: "Yes — Bushey, Bushey Heath and the surrounding WD23 area." },
      { q: "Is Bushey covered by Watford council?", a: "No, Bushey is in Hertsmere, which runs its own waste services. Our private collections work the same either way." },
    ],
    keywords: {
      primary: "rubbish removal Bushey",
      secondary: ["rubbish clearance Bushey", "house clearance Bushey", "waste removal Bushey Heath"],
      longTail: ["garden waste collection Bushey", "furniture removal Bushey WD23"],
    },
  },
  {
    slug: "rubbish-removal-oxhey",
    town: "Oxhey & South Oxhey",
    county: "Hertfordshire",
    h1: "Rubbish Removal in Oxhey & South Oxhey",
    metaTitle: "Rubbish Removal Oxhey & South Oxhey | Waste Clearance WD19",
    metaDescription:
      "Rubbish removal in Oxhey, South Oxhey and Carpenders Park — bulky items, house and flat clearances and garden waste. Loaded from inside. Free quotes.",
    lead: "Household rubbish, bulky items and full clearances across Oxhey, South Oxhey, Carpenders Park and Oxhey Hall.",
    answer:
      "We provide rubbish removal across the WD19 area — Oxhey (Watford borough) and South Oxhey and Carpenders Park (Three Rivers). Collections include furniture, appliances, garden waste and full property clearances, loaded by our team.",
    areas: ["Oxhey", "Oxhey Village", "South Oxhey", "Carpenders Park", "Oxhey Hall"],
    postcodes: ["WD19"],
    blocks: [
      {
        h2: "Two councils, one postcode",
        paras: [
          "Oxhey falls under Watford Borough Council, while South Oxhey and Carpenders Park are in Three Rivers. That means different bulky waste rules and booking systems depending on which side of the boundary you're on. A private collection avoids the question entirely: one booking, mixed items, collected from inside.",
        ],
      },
      {
        h2: "Flats, maisonettes and end-of-tenancy clearances",
        paras: [
          "South Oxhey has a large number of flats and maisonettes, where furniture and mattress removal often means stairs and shared bin areas. Landlords and tenants use us for end-of-tenancy clearances when items have been left behind.",
        ],
      },
    ],
    popular: ["furniture-removal", "mattress-disposal", "bulky-waste-collection", "house-clearance"],
    nearby: ["rubbish-removal-bushey", "rubbish-removal-croxley-green", "rubbish-removal-rickmansworth"],
    faqs: [
      { q: "Do you cover Carpenders Park?", a: "Yes, Carpenders Park and the wider WD19 area are covered." },
      { q: "Can you clear a flat after tenants move out?", a: "Yes — tell us what has been left and send photos for a quick quote." },
    ],
    keywords: {
      primary: "rubbish removal South Oxhey",
      secondary: ["rubbish removal Oxhey", "rubbish clearance Carpenders Park", "waste collection WD19"],
      longTail: ["flat clearance South Oxhey", "sofa collection Oxhey"],
    },
  },
  {
    slug: "rubbish-removal-croxley-green",
    town: "Croxley Green",
    county: "Hertfordshire",
    h1: "Rubbish Removal in Croxley Green",
    metaTitle: "Rubbish Removal Croxley Green | House & Garden Clearances",
    metaDescription:
      "Rubbish removal and clearances in Croxley Green — garden waste, garage clearances, furniture and house clearances. Licensed disposal. Request a free quote.",
    lead: "Garden waste, garage clear-outs, furniture collections and house clearances across Croxley Green and towards Croxley Business Park.",
    answer:
      "Watford Rubbish Clearance covers Croxley Green (WD3) for household and business waste removal. Popular jobs include garden clearances, garage and loft clear-outs and collections ahead of home renovations.",
    areas: ["Croxley Green", "Dickinson Square", "Croxley Business Park", "Baldwins Lane area"],
    postcodes: ["WD3"],
    blocks: [
      {
        h2: "Garden, garage and loft clear-outs",
        paras: [
          "Croxley Green's semi-detached and detached homes tend to come with gardens, garages and lofts — which is where most of our work here comes from. We can combine green waste, a garage clear-out and a few bulky items into one collection.",
        ],
      },
      {
        h2: "Renovation waste without a skip",
        paras: [
          "Kitchen and bathroom replacements and loft conversions produce waste in bursts. A wait-and-load collection removes it when it's ready, without a skip on the drive or a permit on the road.",
        ],
      },
    ],
    popular: ["garden-waste-clearance", "shed-garage-clearance", "builders-waste-removal", "house-clearance"],
    nearby: ["rubbish-removal-rickmansworth", "rubbish-removal-oxhey", "rubbish-removal-abbots-langley"],
    faqs: [
      { q: "Do you collect from businesses in Croxley Business Park?", a: "Yes — see our office clearance and commercial waste services." },
      { q: "Can you remove builders' waste from a renovation?", a: "Yes, rubble, timber and strip-out waste can be collected without a skip." },
    ],
    keywords: {
      primary: "rubbish removal Croxley Green",
      secondary: ["rubbish clearance Croxley Green", "garden clearance Croxley Green"],
      longTail: ["skip alternative Croxley Green", "garage clearance WD3"],
    },
  },
  {
    slug: "rubbish-removal-rickmansworth",
    town: "Rickmansworth",
    county: "Hertfordshire",
    h1: "Rubbish Removal in Rickmansworth",
    metaTitle: "Rubbish Removal Rickmansworth | House & Garden Clearances",
    metaDescription:
      "Rubbish removal in Rickmansworth, Mill End, Moor Park and Chorleywood — house clearances, garden waste and furniture removal. Request a free, no-obligation quote.",
    lead: "Household and garden waste, house clearances and furniture collections across Rickmansworth, Mill End, Batchworth, Moor Park and Chorleywood.",
    answer:
      "We collect rubbish and carry out clearances across Rickmansworth and the WD3 area, including Mill End, Moor Park and Chorleywood. Larger homes and gardens here often mean bigger garden clearances and full-house clearances when downsizing.",
    areas: ["Rickmansworth town centre", "Mill End", "Batchworth", "Moor Park", "Chorleywood", "Loudwater"],
    postcodes: ["WD3"],
    blocks: [
      {
        h2: "Downsizing and larger-home clearances",
        paras: [
          "Many of our Rickmansworth and Moor Park enquiries come from families downsizing from larger homes, where decades of contents, lofts and outbuildings need clearing before a sale. We work room by room so anything being kept, sold or given to family is set aside first.",
        ],
      },
      {
        h2: "Mature gardens",
        paras: [
          "Big, established gardens produce big volumes of hedge cuttings and branches. We can collect after your gardener or tree surgeon has finished, so the waste doesn't sit on the drive for weeks.",
        ],
      },
    ],
    popular: ["house-clearance", "probate-clearance", "garden-waste-clearance", "furniture-removal"],
    nearby: ["rubbish-removal-croxley-green", "rubbish-removal-oxhey"],
    faqs: [
      { q: "Do you cover Chorleywood and Moor Park?", a: "Yes, both are covered as part of our Rickmansworth area." },
      { q: "Can you clear a large house before it goes on the market?", a: "Yes — tell us your marketing or completion date and we'll plan around it." },
    ],
    keywords: {
      primary: "rubbish removal Rickmansworth",
      secondary: ["house clearance Rickmansworth", "rubbish clearance Chorleywood", "waste removal Moor Park"],
      longTail: ["downsizing clearance Rickmansworth", "garden waste collection Rickmansworth"],
    },
  },
  {
    slug: "rubbish-removal-abbots-langley",
    town: "Abbots Langley & Leavesden",
    county: "Hertfordshire",
    h1: "Rubbish Removal in Abbots Langley & Leavesden",
    metaTitle: "Rubbish Removal Abbots Langley & Leavesden | Waste Clearance",
    metaDescription:
      "Rubbish removal in Abbots Langley, Leavesden, Bedmond and Garston — furniture, garden waste and full clearances. Collected from inside. Get a free quote.",
    lead: "Rubbish collections and clearances across Abbots Langley, Leavesden, Bedmond and Garston, on Watford's northern edge.",
    answer:
      "Watford Rubbish Clearance covers Abbots Langley (WD5) and Leavesden and Garston (WD25). We collect household, garden and business waste and carry out full or partial property clearances.",
    areas: ["Abbots Langley village", "Leavesden", "Bedmond", "Garston"],
    postcodes: ["WD5", "WD25"],
    blocks: [
      {
        h2: "New-build moves and settling in",
        paras: [
          "The newer developments around Leavesden mean a lot of people moving in — and a lot of packaging, old furniture that didn't fit and flat-pack waste. A single collection clears it in one go.",
        ],
      },
      {
        h2: "Village homes and gardens",
        paras: [
          "In Abbots Langley and Bedmond, older cottages and family homes bring loft and garden clearances. Narrow village roads can affect where we park, so mention access when you get in touch.",
        ],
      },
    ],
    popular: ["furniture-removal", "garden-waste-clearance", "house-clearance", "bulky-waste-collection"],
    nearby: ["rubbish-removal-kings-langley", "rubbish-removal-croxley-green", "rubbish-removal-st-albans"],
    faqs: [
      { q: "Do you cover Garston and Leavesden?", a: "Yes — Garston, Leavesden and the WD25 area are covered." },
      { q: "Can you take packaging and cardboard after a move?", a: "Yes, cardboard and packaging are collected and recycled." },
    ],
    keywords: {
      primary: "rubbish removal Abbots Langley",
      secondary: ["rubbish removal Leavesden", "rubbish clearance Garston", "waste collection WD5"],
      longTail: ["furniture removal Leavesden", "garden clearance Abbots Langley"],
    },
  },
  {
    slug: "rubbish-removal-kings-langley",
    town: "Kings Langley",
    county: "Hertfordshire",
    h1: "Rubbish Removal in Kings Langley",
    metaTitle: "Rubbish Removal Kings Langley | Clearances & Waste Collection",
    metaDescription:
      "Rubbish removal and clearances in Kings Langley and Hunton Bridge — garden waste, furniture, garage and house clearances. Request a free quote today.",
    lead: "Household and garden waste removal, garage clear-outs and house clearances in Kings Langley and the surrounding WD4 villages.",
    answer:
      "We cover Kings Langley (WD4) for rubbish removal and clearances, including garden waste, furniture collections and full house clearances. Kings Langley sits in Dacorum, so council collection rules differ from Watford's — a private collection works the same either way.",
    areas: ["Kings Langley village", "Hunton Bridge", "Chipperfield", "Langleybury"],
    postcodes: ["WD4"],
    blocks: [
      {
        h2: "Village and rural-edge properties",
        paras: [
          "Homes around Kings Langley and Chipperfield often have larger gardens, outbuildings and driveways, which suit bigger one-visit clearances. Rural lanes can have limited turning space — let us know if access is tight.",
        ],
      },
      {
        h2: "Small businesses and workshops",
        paras: [
          "Local businesses and workshops use us for one-off waste removal after refits or stock clear-outs, with the waste paperwork businesses need.",
        ],
      },
    ],
    popular: ["garden-waste-clearance", "shed-garage-clearance", "house-clearance", "commercial-bin-collection"],
    nearby: ["rubbish-removal-abbots-langley", "rubbish-removal-berkhamsted"],
    faqs: [
      { q: "Do you cover Chipperfield?", a: "Yes, Chipperfield and the villages around Kings Langley are covered." },
      { q: "Can you remove an old shed in Kings Langley?", a: "Yes — most timber sheds can be dismantled and removed in one visit." },
    ],
    keywords: {
      primary: "rubbish removal Kings Langley",
      secondary: ["rubbish clearance Kings Langley", "house clearance Kings Langley"],
      longTail: ["garden waste removal Kings Langley", "shed removal WD4"],
    },
  },
  {
    slug: "rubbish-removal-st-albans",
    town: "St Albans",
    county: "Hertfordshire",
    h1: "Rubbish Removal in St Albans",
    metaTitle: "Rubbish Removal St Albans | Clearances & Builders Waste",
    metaDescription:
      "Rubbish removal in St Albans, London Colney, Park Street and Redbourn — house clearances, furniture, garden and builders waste. Get a free quote.",
    lead: "House clearances, furniture collections, garden waste and builders' rubbish across St Albans and nearby villages including London Colney, Park Street, Redbourn and Wheathampstead.",
    answer:
      "Watford Rubbish Clearance covers St Albans (AL1–AL4) and surrounding villages for household, garden, builders and business waste. Many St Albans jobs involve terraced streets with limited parking, so we plan access in advance.",
    areas: ["St Albans city centre", "Fleetville", "Marshalswick", "London Colney", "Park Street", "Redbourn", "Wheathampstead"],
    postcodes: ["AL1", "AL2", "AL3", "AL4"],
    blocks: [
      {
        h2: "Terraced streets and tight parking",
        paras: [
          "Much of central St Albans and Fleetville is Victorian and Edwardian terraces with on-street permit parking. That shapes how a clearance is done — how close the van can get, and how long it can stay. Tell us about parking when you request a quote and we'll plan around it.",
        ],
      },
      {
        h2: "Renovations and extensions",
        paras: [
          "Loft conversions and kitchen extensions are common in St Albans' older housing stock, and there's often no space for a skip. Our wait-and-load builders' waste service takes the rubbish away as it's produced, with nothing left on the street.",
        ],
      },
      {
        h2: "Redbourn and Wheathampstead",
        paras: [
          "We also cover the villages around St Albans, including Redbourn and Wheathampstead, for garden clearances, garage clear-outs and furniture collections.",
        ],
      },
    ],
    popular: ["builders-waste-removal", "house-clearance", "furniture-removal", "garden-waste-clearance"],
    nearby: ["rubbish-removal-harpenden", "rubbish-removal-hatfield", "rubbish-removal-abbots-langley"],
    faqs: [
      { q: "Do you cover Redbourn and Wheathampstead?", a: "Yes, both villages are covered from St Albans." },
      { q: "Can you work with permit parking?", a: "Yes — let us know the parking situation and we'll arrange the job to suit, such as a visitor permit if you have one." },
    ],
    keywords: {
      primary: "rubbish removal St Albans",
      secondary: ["house clearance St Albans", "rubbish clearance St Albans", "waste removal St Albans"],
      longTail: ["builders waste removal St Albans", "rubbish removal Redbourn", "rubbish removal Wheathampstead"],
    },
  },
  {
    slug: "rubbish-removal-harpenden",
    town: "Harpenden",
    county: "Hertfordshire",
    h1: "Rubbish Removal in Harpenden",
    metaTitle: "Rubbish Removal Harpenden | Garden, Garage & House Clearances",
    metaDescription:
      "Rubbish removal in Harpenden and Batford — garden waste, garage clear-outs, furniture and full house clearances. Licensed disposal. Request a free quote.",
    lead: "Garden waste, garage and loft clear-outs, furniture collections and house clearances across Harpenden, Batford and Kinsbourne Green.",
    answer:
      "We provide rubbish removal across Harpenden (AL5), including garden waste, furniture and appliance collections and full property clearances. Jobs are priced on volume and type of waste, with a quote agreed before we start.",
    areas: ["Harpenden town centre", "Batford", "Southdown", "Kinsbourne Green", "West Common"],
    postcodes: ["AL5"],
    blocks: [
      {
        h2: "Larger homes, larger clear-outs",
        paras: [
          "Harpenden's family homes tend to come with lofts, garages and generous gardens — and the clear-outs to match. Whether it's preparing for a move or reclaiming the garage, we can take everything in one or two loads.",
        ],
      },
      {
        h2: "Garden waste after landscaping",
        paras: [
          "If you've had trees cut back or a garden redesigned, we can collect the green waste, old fencing, paving offcuts and soil once the work is done.",
        ],
      },
    ],
    popular: ["garden-waste-clearance", "shed-garage-clearance", "house-clearance", "furniture-removal"],
    nearby: ["rubbish-removal-st-albans", "rubbish-removal-hatfield"],
    faqs: [
      { q: "Do you cover Batford and Kinsbourne Green?", a: "Yes, all of Harpenden and the AL5 area." },
      { q: "Can you take soil and paving after landscaping?", a: "Yes — heavy waste is priced by weight, so send a photo for an accurate quote." },
    ],
    keywords: {
      primary: "rubbish removal Harpenden",
      secondary: ["rubbish clearance Harpenden", "house clearance Harpenden", "garden waste removal Harpenden"],
      longTail: ["garage clearance Harpenden", "loft clearance AL5"],
    },
  },
  {
    slug: "rubbish-removal-hatfield",
    town: "Hatfield",
    county: "Hertfordshire",
    h1: "Rubbish Removal in Hatfield & Welwyn",
    metaTitle: "Rubbish Removal Hatfield & Welwyn | Student Let Clearances",
    metaDescription:
      "Rubbish removal in Hatfield, Welwyn and Welwyn Garden City — student let clear-outs, furniture, mattresses and house clearances. Request a free quote.",
    lead: "End-of-tenancy and student-let clear-outs, furniture and mattress collections and house clearances across Hatfield, Welwyn and Welwyn Garden City.",
    answer:
      "Watford Rubbish Clearance covers Hatfield (AL9, AL10) and Welwyn (AL6–AL8) for household and business waste. Hatfield's large student rental market means end-of-tenancy clearances are a common job, particularly at the end of the academic year.",
    areas: ["Hatfield town centre", "Hatfield Garden Village", "Old Hatfield", "Welwyn", "Welwyn Garden City"],
    postcodes: ["AL9", "AL10", "AL6", "AL7", "AL8"],
    blocks: [
      {
        h2: "Student lets and HMOs",
        paras: [
          "With the University of Hertfordshire in Hatfield, many landlords manage shared houses that need clearing between tenancies — mattresses, broken furniture, bags of rubbish and left-behind belongings. Book early for June and July, when many tenancies end at once.",
        ],
      },
      {
        h2: "Welwyn and Welwyn Garden City",
        paras: [
          "We also cover Welwyn and Welwyn Garden City for furniture removal, garden waste and full property clearances.",
        ],
      },
    ],
    popular: ["mattress-disposal", "furniture-removal", "domestic-bin-collection", "house-clearance"],
    nearby: ["rubbish-removal-st-albans", "rubbish-removal-harpenden"],
    faqs: [
      { q: "Can you clear several student houses in one day?", a: "Often, yes — give us the addresses and dates and we'll plan a route." },
      { q: "Do you cover Welwyn Garden City?", a: "Yes, Welwyn and Welwyn Garden City are covered from Hatfield." },
    ],
    keywords: {
      primary: "rubbish removal Hatfield",
      secondary: ["rubbish removal Welwyn Garden City", "house clearance Hatfield", "rubbish clearance Welwyn"],
      longTail: ["student house clearance Hatfield", "end of tenancy rubbish removal Hatfield"],
    },
  },
  {
    slug: "rubbish-removal-berkhamsted",
    town: "Berkhamsted",
    county: "Hertfordshire",
    h1: "Rubbish Removal in Berkhamsted & Tring",
    metaTitle: "Rubbish Removal Berkhamsted & Tring | Clearances & Collections",
    metaDescription:
      "Rubbish removal in Berkhamsted, Northchurch and Tring — house clearances, garden waste, furniture and builders waste. Licensed carrier. Request a free quote.",
    lead: "House clearances, garden waste, furniture collections and builders' rubbish across Berkhamsted, Northchurch and Tring.",
    answer:
      "We cover Berkhamsted and Northchurch (HP4) and Tring (HP23) for household, garden and building waste. Period properties and hillside streets here mean access is planned carefully before collection day.",
    areas: ["Berkhamsted town centre", "Northchurch", "Potten End", "Tring", "Wigginton"],
    postcodes: ["HP4", "HP23"],
    blocks: [
      {
        h2: "Period homes and steep streets",
        paras: [
          "Berkhamsted's Victorian terraces, cottages and hillside roads can make loading slower — steps, long front paths and narrow streets. We factor this into the quote so there are no surprises on the day.",
        ],
      },
      {
        h2: "Tring and the surrounding villages",
        paras: [
          "Tring and nearby villages are covered for garden clearances, garage clear-outs and furniture collections. For larger rural properties, photos of outbuildings help us quote accurately.",
        ],
      },
    ],
    popular: ["house-clearance", "builders-waste-removal", "garden-waste-clearance", "probate-clearance"],
    nearby: ["rubbish-removal-kings-langley"],
    faqs: [
      { q: "Do you cover Tring?", a: "Yes, Tring and the HP23 area are covered." },
      { q: "Can you clear a cottage with no parking outside?", a: "Yes — tell us how far the van will be from the door so we bring the right team." },
    ],
    keywords: {
      primary: "rubbish removal Berkhamsted",
      secondary: ["rubbish removal Tring", "house clearance Berkhamsted", "rubbish clearance Northchurch"],
      longTail: ["garden waste removal Berkhamsted", "builders waste removal Tring"],
    },
  },
];

export const locationBySlug = (slug: string) => locations.find((l) => l.slug === slug);

/** Watford neighbourhoods served from the homepage (no standalone pages). */
export const watfordAreas = [
  "Watford town centre",
  "North Watford",
  "West Watford",
  "Cassiobury",
  "Callowland",
  "Nascot",
  "Garston",
  "Meriden",
  "Holywell",
  "Woodside",
  "Kingswood",
  "Leggatts",
];

/** Wider areas the business has listed as served. Coverage depth: BUSINESS CONFIRMATION REQUIRED. */
export const widerAreas: { region: string; towns: string[] }[] = [
  { region: "Hertfordshire", towns: ["Hitchin", "Welwyn", "Wheathampstead", "Redbourn", "Tring"] },
  { region: "Bedfordshire", towns: ["Leighton Buzzard", "Houghton Regis", "Toddington", "Caddington"] },
  { region: "Buckinghamshire", towns: ["Chesham"] },
  { region: "North London", towns: ["Enfield", "St John's Wood", "Hampstead"] },
];
