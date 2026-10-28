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
    nearby: ["rubbish-removal-oxhey", "rubbish-removal-borehamwood", "rubbish-removal-harrow"],
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
    popular: ["end-of-tenancy-clearance", "furniture-removal", "mattress-disposal", "bulky-waste-collection"],
    nearby: ["rubbish-removal-bushey", "rubbish-removal-harrow", "rubbish-removal-croxley-green", "rubbish-removal-rickmansworth"],
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
    nearby: ["rubbish-removal-croxley-green", "rubbish-removal-oxhey", "rubbish-removal-amersham"],
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
    nearby: ["rubbish-removal-abbots-langley", "rubbish-removal-hemel-hempstead", "rubbish-removal-berkhamsted"],
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
    nearby: ["rubbish-removal-st-albans", "rubbish-removal-hatfield", "rubbish-removal-luton"],
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
    popular: ["end-of-tenancy-clearance", "mattress-disposal", "furniture-removal", "house-clearance"],
    nearby: ["rubbish-removal-st-albans", "rubbish-removal-harpenden", "rubbish-removal-stevenage"],
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
    nearby: ["rubbish-removal-kings-langley", "rubbish-removal-hemel-hempstead", "rubbish-removal-amersham"],
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
  {
    slug: "rubbish-removal-hemel-hempstead",
    town: "Hemel Hempstead",
    county: "Hertfordshire",
    h1: "Rubbish Removal in Hemel Hempstead",
    metaTitle: "Rubbish Removal Hemel Hempstead | House & Business Clearances",
    metaDescription:
      "Rubbish removal in Hemel Hempstead — house, garden and office clearances, furniture and bulky waste. Open 24/7 with same-day collections. Call 01293 549164.",
    lead: "Household, garden and business waste cleared across Hemel Hempstead — from Boxmoor and the Old Town to Adeyfield, Leverstock Green and the Maylands business area.",
    answer:
      "Watford Rubbish Clearance collects household, garden and commercial waste across Hemel Hempstead (HP1, HP2, HP3). We operate 24/7 with same-day collections, load everything from inside the property, and quote a fixed price from photos before we start.",
    areas: ["Old Town", "Boxmoor", "Apsley", "Adeyfield", "Leverstock Green", "Grovehill", "Gadebridge", "Bennetts End", "Warners End", "Maylands"],
    postcodes: ["HP1", "HP2", "HP3"],
    blocks: [
      {
        h2: "New Town homes and gardens",
        paras: [
          "Much of Hemel Hempstead was built as a post-war New Town, organised into neighbourhoods of family houses with gardens, garages and lofts. That makes garden clearances, garage clear-outs and furniture collections the most common jobs here — often combined into a single visit.",
          "Hemel sits in Dacorum, so council bulky collection rules differ from Watford's. If what you need to get rid of doesn't fit the council service — too many items, sofas, electricals or items inside the house — a private collection takes the lot in one go.",
        ],
      },
      {
        h2: "Business waste in Maylands",
        paras: [
          "The Maylands business area on the east of the town is home to offices, warehouses and trade units. We handle office clearances, one-off excess waste after refits or stock clear-outs, and out-of-hours collections so loading bays stay free during the working day.",
        ],
      },
      {
        h2: "Boxmoor and the Old Town",
        paras: [
          "Older terraces and cottages in Boxmoor and around the Old Town High Street can mean narrow streets and limited parking. Let us know about access when you ask for a quote so we can plan the right van and team.",
        ],
      },
    ],
    popular: ["garden-waste-clearance", "shed-garage-clearance", "office-clearance", "house-clearance"],
    nearby: ["rubbish-removal-kings-langley", "rubbish-removal-berkhamsted", "rubbish-removal-st-albans"],
    faqs: [
      { q: "Do you cover the Maylands business area?", a: "Yes — offices, warehouses and units in Maylands are covered for clearances and commercial waste, including out-of-hours collections." },
      { q: "Is Hemel Hempstead covered by Watford council?", a: "No, Hemel Hempstead is in Dacorum, which runs its own waste services. Our private collections work the same anywhere within 30 miles of Watford." },
    ],
    keywords: {
      primary: "rubbish removal Hemel Hempstead",
      secondary: ["rubbish clearance Hemel Hempstead", "house clearance Hemel Hempstead", "waste removal Hemel Hempstead"],
      longTail: ["office clearance Maylands Hemel", "garden waste collection Hemel Hempstead", "same day rubbish removal Hemel"],
    },
  },
  {
    slug: "rubbish-removal-borehamwood",
    town: "Borehamwood & Radlett",
    county: "Hertfordshire",
    h1: "Rubbish Removal in Borehamwood, Elstree & Radlett",
    metaTitle: "Rubbish Removal Borehamwood & Radlett | Waste Clearance",
    metaDescription:
      "Rubbish removal in Borehamwood, Elstree, Radlett and Shenley — house, garden and office clearances and bulky items. Open 24/7. Call 01293 549164 for a quote.",
    lead: "Rubbish collections and clearances across Borehamwood, Elstree, Radlett and Shenley, just east of Bushey.",
    answer:
      "We provide rubbish removal across Borehamwood and Elstree (WD6) and Radlett and Shenley (WD7) — household clearances, garden waste, furniture and bulky items, and business waste. Available 24/7 with same-day collections and fixed quotes from photos.",
    areas: ["Borehamwood", "Elstree", "Radlett", "Shenley", "Well End"],
    postcodes: ["WD6", "WD7"],
    blocks: [
      {
        h2: "Borehamwood and Elstree",
        paras: [
          "Borehamwood mixes flats near Shenley Road with family houses on the estates around it. Flat clearances, mattress and sofa collections and end of tenancy clear-outs are common, as are out-of-hours collections for businesses and production companies working around the town's film and TV studios.",
        ],
      },
      {
        h2: "Radlett and Shenley",
        paras: [
          "Radlett's larger detached houses and long gardens bring bigger jobs: downsizing clearances, garden overhauls and garage clear-outs. We plan these around sales and completion dates and can work through a property room by room so anything being kept is set aside first.",
        ],
      },
      {
        h2: "Hertsmere council collections vs private removal",
        paras: [
          "Borehamwood, Elstree, Radlett and Shenley are all in Hertsmere, which runs its own bulky waste service. For a few eligible items left outside, that can be the cheapest option; for mixed loads, upholstered seating or items that need carrying out, a private collection is usually simpler.",
        ],
      },
    ],
    popular: ["house-clearance", "end-of-tenancy-clearance", "furniture-removal", "garden-waste-clearance"],
    nearby: ["rubbish-removal-bushey", "rubbish-removal-edgware", "rubbish-removal-harrow"],
    faqs: [
      { q: "Do you cover Elstree and Shenley?", a: "Yes — Elstree, Shenley and the whole WD6 and WD7 area." },
      { q: "Can you clear a property for a production or studio company?", a: "Yes. We collect commercial waste with the paperwork businesses need, and can work out of hours to suit filming or set schedules." },
    ],
    keywords: {
      primary: "rubbish removal Borehamwood",
      secondary: ["rubbish removal Radlett", "rubbish clearance Elstree", "house clearance Borehamwood", "waste removal Shenley"],
      longTail: ["flat clearance Borehamwood", "garden waste removal Radlett", "same day rubbish removal Borehamwood"],
    },
  },
  {
    slug: "rubbish-removal-harrow",
    town: "Harrow & Stanmore",
    county: "North London",
    h1: "Rubbish Removal in Harrow, Stanmore & Pinner",
    metaTitle: "Rubbish Removal Harrow, Stanmore & Pinner | Clearances",
    metaDescription:
      "Rubbish removal in Harrow, Stanmore, Pinner and Wealdstone — house clearances, furniture, garden and builders waste. 24/7, same-day. Call 01293 549164.",
    lead: "House clearances, furniture and bulky item collections, garden waste and builders' rubbish across Harrow, Stanmore, Pinner, Wealdstone and Harrow Weald.",
    answer:
      "Watford Rubbish Clearance covers the London Borough of Harrow — including Harrow, Stanmore, Pinner, Wealdstone and Harrow Weald (HA1, HA2, HA3, HA5, HA7). We collect from inside the property, operate 24/7 with same-day collections, and quote a fixed price before we start.",
    areas: ["Harrow on the Hill", "Wealdstone", "Harrow Weald", "Stanmore", "Pinner", "Hatch End", "Kenton", "Rayners Lane"],
    postcodes: ["HA1", "HA2", "HA3", "HA5", "HA7"],
    blocks: [
      {
        h2: "Interwar semis, lofts and extensions",
        paras: [
          "Much of Harrow, Pinner and Stanmore is 1920s–30s suburban housing — semi-detached homes with lofts, garages and rear gardens, many of which are being extended or converted. That means a steady mix of loft clearances, renovation waste and garden clearances, often where there's no room for a skip on the drive.",
        ],
      },
      {
        h2: "Parking zones and access",
        paras: [
          "Parts of Harrow have controlled parking zones, particularly around town centres and stations. Tell us the parking situation when you ask for a quote — a visitor permit or a driveway space can make a collection quicker.",
        ],
      },
      {
        h2: "Council or private collection?",
        paras: [
          "Harrow Council runs its own bulky waste service with its own rules on items and collection points. A private collection suits mixed loads, items that need carrying out from upstairs, and anything you need gone the same day.",
        ],
      },
    ],
    popular: ["house-clearance", "builders-waste-removal", "garden-waste-clearance", "furniture-removal"],
    nearby: ["rubbish-removal-bushey", "rubbish-removal-edgware", "rubbish-removal-uxbridge", "rubbish-removal-borehamwood"],
    faqs: [
      { q: "Do you cover Pinner and Hatch End?", a: "Yes — Pinner, Hatch End and the HA5 area, along with the rest of the London Borough of Harrow." },
      { q: "Can you collect where there's permit parking?", a: "Yes. Let us know the parking rules and whether a visitor permit is available, and we'll plan the collection around them." },
    ],
    keywords: {
      primary: "rubbish removal Harrow",
      secondary: ["rubbish removal Stanmore", "rubbish removal Pinner", "house clearance Harrow", "rubbish clearance Wealdstone"],
      longTail: ["loft clearance Harrow", "builders waste removal Harrow", "same day rubbish collection Harrow"],
    },
  },
  {
    slug: "rubbish-removal-amersham",
    town: "Amersham & Chesham",
    county: "Buckinghamshire",
    h1: "Rubbish Removal in Amersham & Chesham",
    metaTitle: "Rubbish Removal Amersham & Chesham | House & Garden Clearances",
    metaDescription:
      "Rubbish removal in Amersham, Chesham and Little Chalfont — house clearances, garden waste, furniture and garage clear-outs. Open 24/7. Call 01293 549164.",
    lead: "House clearances, garden waste, furniture collections and garage clear-outs across Amersham, Chesham, Little Chalfont and the surrounding Chiltern villages.",
    answer:
      "We cover Amersham (HP6, HP7) and Chesham (HP5) in Buckinghamshire, along with Little Chalfont and nearby villages. Typical jobs are full house clearances, large garden clearances and garage clear-outs, available 24/7 with same-day collections.",
    areas: ["Amersham-on-the-Hill", "Old Amersham", "Chesham", "Chesham Bois", "Little Chalfont", "Chalfont St Giles"],
    postcodes: ["HP5", "HP6", "HP7", "HP8"],
    blocks: [
      {
        h2: "Larger homes and Chiltern gardens",
        paras: [
          "Homes around Amersham, Chesham Bois and the Chalfonts often have big, mature gardens and outbuildings — so hedge and tree cuttings, old sheds and summerhouses, and garage clear-outs make up much of our work here. Combining them into one visit keeps costs down.",
        ],
      },
      {
        h2: "Old Amersham and Chesham town centres",
        paras: [
          "Old Amersham's historic high street and Chesham's older terraces can mean tight access and limited parking. We plan around this, and send the right size van and team for the job.",
        ],
      },
      {
        h2: "Buckinghamshire Council or a private collection?",
        paras: [
          "Amersham and Chesham are served by Buckinghamshire Council, which has its own bulky waste and recycling arrangements. A private collection is the practical option for mixed loads, upholstered seating and items that need carrying out from inside.",
        ],
      },
    ],
    popular: ["house-clearance", "garden-waste-clearance", "shed-garage-clearance", "probate-clearance"],
    nearby: ["rubbish-removal-rickmansworth", "rubbish-removal-high-wycombe", "rubbish-removal-berkhamsted"],
    faqs: [
      { q: "Do you cover Little Chalfont and Chalfont St Giles?", a: "Yes — both are covered along with Amersham, Chesham and the surrounding villages." },
      { q: "Can you remove an old summerhouse or shed?", a: "Yes, most timber sheds and summerhouses can be dismantled and removed in the same visit." },
    ],
    keywords: {
      primary: "rubbish removal Amersham",
      secondary: ["rubbish removal Chesham", "house clearance Amersham", "garden clearance Chesham", "rubbish clearance Little Chalfont"],
      longTail: ["shed removal Amersham", "garden waste collection Chesham", "house clearance Chesham"],
    },
  },
  {
    slug: "rubbish-removal-luton",
    town: "Luton & Dunstable",
    county: "Bedfordshire",
    h1: "Rubbish Removal in Luton, Dunstable & Houghton Regis",
    metaTitle: "Rubbish Removal Luton & Dunstable | House & Business Clearances",
    metaDescription:
      "Rubbish removal in Luton, Dunstable and Houghton Regis — house, flat and office clearances, bulky items and trade waste. Open 24/7. Call 01293 549164.",
    lead: "House and flat clearances, bulky item collections, end of tenancy clear-outs and trade waste across Luton, Dunstable, Houghton Regis and the surrounding villages.",
    answer:
      "Watford Rubbish Clearance covers Luton (LU1–LU4) and Dunstable and Houghton Regis (LU5, LU6) for household, garden and commercial waste. We operate 24/7 with same-day collections and quote a fixed price from photos before we start.",
    areas: ["Luton town centre", "Stopsley", "Leagrave", "Wigmore", "Bushmead", "Dunstable", "Houghton Regis", "Caddington", "Toddington"],
    postcodes: ["LU1", "LU2", "LU3", "LU4", "LU5", "LU6"],
    blocks: [
      {
        h2: "Rented homes, flats and student lets",
        paras: [
          "Luton has a large private rented sector, including shared houses and student lets near the university. That makes end of tenancy clearances, mattress and furniture collections and overflowing bin clear-ups some of our most frequent jobs here — often booked by landlords and agents on account.",
        ],
      },
      {
        h2: "Industrial estates and trade waste",
        paras: [
          "Luton and Dunstable have extensive industrial and trade estates. We handle one-off clear-outs after refits or stock changes, warehouse and office clearances, and scheduled or overflow trade waste collections with the waste transfer notes businesses need.",
        ],
      },
      {
        h2: "Two councils",
        paras: [
          "Luton is a unitary authority, while Dunstable, Houghton Regis, Caddington and Toddington are in Central Bedfordshire — so bulky waste rules differ depending on where you are. A private collection works the same across both, with no limit on item types or numbers.",
        ],
      },
    ],
    popular: ["end-of-tenancy-clearance", "furniture-removal", "commercial-bin-collection", "house-clearance"],
    nearby: ["rubbish-removal-harpenden", "rubbish-removal-st-albans", "rubbish-removal-stevenage"],
    faqs: [
      { q: "Do you cover Houghton Regis, Caddington and Toddington?", a: "Yes — along with Luton and Dunstable, we cover Houghton Regis and the surrounding villages." },
      { q: "Can you clear several rental properties in Luton on account?", a: "Yes. Landlords and agents can book clearances across multiple properties and be invoiced on account — see contract and account waste services." },
    ],
    keywords: {
      primary: "rubbish removal Luton",
      secondary: ["rubbish removal Dunstable", "house clearance Luton", "rubbish clearance Houghton Regis", "waste removal Luton"],
      longTail: ["end of tenancy clearance Luton", "office clearance Luton", "same day rubbish removal Luton"],
    },
  },
  {
    slug: "rubbish-removal-stevenage",
    town: "Stevenage & Hitchin",
    county: "Hertfordshire",
    h1: "Rubbish Removal in Stevenage, Hitchin & Letchworth",
    metaTitle: "Rubbish Removal Stevenage & Hitchin | Waste Clearance Services",
    metaDescription:
      "Rubbish removal in Stevenage, Hitchin and Letchworth — house and garden clearances, furniture, office and trade waste. Open 24/7. Call 01293 549164.",
    lead: "Household clearances, garden waste, furniture collections and business waste across Stevenage, Hitchin, Letchworth Garden City and the surrounding North Hertfordshire villages.",
    answer:
      "We provide rubbish removal across Stevenage (SG1, SG2), Hitchin (SG4, SG5) and Letchworth (SG6) — household, garden and commercial waste, with 24/7 availability, same-day collections and fixed quotes from photos.",
    areas: ["Stevenage Old Town", "Shephall", "Bedwell", "Great Ashby", "Hitchin", "Letchworth Garden City", "Baldock"],
    postcodes: ["SG1", "SG2", "SG4", "SG5", "SG6"],
    blocks: [
      {
        h2: "Stevenage New Town neighbourhoods",
        paras: [
          "Stevenage was the first post-war New Town, built as neighbourhoods of family homes with gardens and garages. Garden clearances, garage clear-outs and furniture collections make up much of the work here, often combined into a single visit.",
        ],
      },
      {
        h2: "Business waste around Gunnels Wood",
        paras: [
          "The Gunnels Wood Road employment area is home to offices, engineering firms and warehouses. We carry out office clearances and one-off commercial clear-outs, and set up scheduled or overflow collections on account.",
        ],
      },
      {
        h2: "Hitchin and Letchworth",
        paras: [
          "Hitchin's period town-centre streets and Letchworth's garden-city houses with long gardens bring different jobs — careful access on narrow streets in Hitchin, and larger garden and shed clearances in Letchworth.",
        ],
      },
    ],
    popular: ["house-clearance", "garden-waste-clearance", "office-clearance", "shed-garage-clearance"],
    nearby: ["rubbish-removal-hatfield", "rubbish-removal-luton", "rubbish-removal-harpenden"],
    faqs: [
      { q: "Do you cover Letchworth and Baldock?", a: "Yes — Letchworth Garden City, Baldock and the surrounding North Hertfordshire villages are covered along with Stevenage and Hitchin." },
      { q: "How far is Stevenage from your base?", a: "Stevenage is around 20 miles from Watford, comfortably within our 30-mile service area." },
    ],
    keywords: {
      primary: "rubbish removal Stevenage",
      secondary: ["rubbish removal Hitchin", "house clearance Stevenage", "rubbish clearance Letchworth", "waste removal Stevenage"],
      longTail: ["garden waste removal Stevenage", "office clearance Stevenage", "same day rubbish removal Hitchin"],
    },
  },
  {
    slug: "rubbish-removal-high-wycombe",
    town: "High Wycombe",
    county: "Buckinghamshire",
    h1: "Rubbish Removal in High Wycombe & Beaconsfield",
    metaTitle: "Rubbish Removal High Wycombe | House, Garden & Trade Clearances",
    metaDescription:
      "Rubbish removal in High Wycombe, Hazlemere and Beaconsfield — house clearances, furniture, garden and builders waste. Open 24/7. Call 01293 549164.",
    lead: "House clearances, furniture collections, garden waste and builders' rubbish across High Wycombe, Hazlemere, Beaconsfield and the surrounding Chiltern villages.",
    answer:
      "Watford Rubbish Clearance covers High Wycombe (HP10–HP13), Hazlemere (HP15) and Beaconsfield (HP9) for household, garden, building and commercial waste — 24/7, with same-day collections and fixed quotes from photos.",
    areas: ["High Wycombe town centre", "Hazlemere", "Downley", "Booker", "Cressex", "Loudwater", "Flackwell Heath", "Beaconsfield"],
    postcodes: ["HP9", "HP10", "HP11", "HP12", "HP13", "HP15"],
    blocks: [
      {
        h2: "Hillside streets and access",
        paras: [
          "High Wycombe sits in a steep-sided valley, and many homes are on hillside roads with steps and long front paths. We factor access into the quote and send enough people to carry items out safely, so there are no surprises on the day.",
        ],
      },
      {
        h2: "Furniture town, furniture clear-outs",
        paras: [
          "Known for its furniture-making history, Wycombe still has plenty of solid older furniture in its homes. When it's time to clear it, we separate pieces that can be reused from those that need recycling or disposal.",
        ],
      },
      {
        h2: "Cressex and trade customers",
        paras: [
          "Businesses on the Cressex and other trade estates use us for warehouse and office clear-outs and for regular or overflow trade waste collections on account.",
        ],
      },
    ],
    popular: ["furniture-removal", "house-clearance", "builders-waste-removal", "garden-waste-clearance"],
    nearby: ["rubbish-removal-amersham", "rubbish-removal-rickmansworth", "rubbish-removal-uxbridge"],
    faqs: [
      { q: "Do you cover Beaconsfield and Marlow?", a: "Yes — Beaconsfield, Marlow and the villages around High Wycombe are within our 30-mile service area." },
      { q: "Can you remove old solid furniture from upstairs?", a: "Yes. We carry heavy furniture down stairs and dismantle it on site where needed." },
    ],
    keywords: {
      primary: "rubbish removal High Wycombe",
      secondary: ["rubbish removal Beaconsfield", "house clearance High Wycombe", "rubbish clearance Hazlemere", "waste removal High Wycombe"],
      longTail: ["furniture removal High Wycombe", "builders waste removal High Wycombe", "same day rubbish removal High Wycombe"],
    },
  },
  {
    slug: "rubbish-removal-uxbridge",
    town: "Uxbridge & Ruislip",
    county: "North London",
    h1: "Rubbish Removal in Uxbridge, Ruislip & Hillingdon",
    metaTitle: "Rubbish Removal Uxbridge & Ruislip | Hillingdon Waste Clearance",
    metaDescription:
      "Rubbish removal in Uxbridge, Ruislip, Ickenham and Hillingdon — house and student-let clearances, furniture and garden waste. 24/7. Call 01293 549164.",
    lead: "House clearances, student-let and end of tenancy clear-outs, furniture and garden waste across Uxbridge, Ruislip, Ickenham, Hillingdon and Harefield.",
    answer:
      "We cover the London Borough of Hillingdon's northern towns — Uxbridge (UB8), Hillingdon and Ickenham (UB10), Harefield (UB9) and Ruislip (HA4) — for household, garden and commercial waste, with 24/7 availability and same-day collections.",
    areas: ["Uxbridge town centre", "Hillingdon", "Ickenham", "Ruislip", "Ruislip Manor", "Eastcote", "Harefield"],
    postcodes: ["UB8", "UB9", "UB10", "HA4"],
    blocks: [
      {
        h2: "Student lets around Brunel",
        paras: [
          "With Brunel University in Uxbridge, many landlords run shared houses that need clearing at the end of each academic year — mattresses, desks, bags and left-behind belongings. Book early for summer turnovers; portfolio landlords can work with us on account.",
        ],
      },
      {
        h2: "Ruislip and Ickenham family homes",
        paras: [
          "Ruislip, Eastcote and Ickenham are largely interwar suburban homes with lofts, garages and gardens — so loft and garage clear-outs, garden clearances and renovation waste are common here.",
        ],
      },
      {
        h2: "Hillingdon Council or a private collection?",
        paras: [
          "Hillingdon Council runs its own bulky waste service. A private collection suits mixed loads, items that need carrying from inside, and anything that needs to go the same day.",
        ],
      },
    ],
    popular: ["end-of-tenancy-clearance", "house-clearance", "garden-waste-clearance", "builders-waste-removal"],
    nearby: ["rubbish-removal-harrow", "rubbish-removal-rickmansworth", "rubbish-removal-high-wycombe"],
    faqs: [
      { q: "Do you cover Eastcote and Harefield?", a: "Yes — Eastcote, Harefield and the rest of the northern Hillingdon area are covered." },
      { q: "Can you clear several student houses at the end of term?", a: "Yes. Give us the addresses and dates and we'll plan a route — invoicing can be set up on account." },
    ],
    keywords: {
      primary: "rubbish removal Uxbridge",
      secondary: ["rubbish removal Ruislip", "house clearance Uxbridge", "rubbish clearance Ickenham", "waste removal Hillingdon"],
      longTail: ["student house clearance Uxbridge", "loft clearance Ruislip", "same day rubbish removal Uxbridge"],
    },
  },
  {
    slug: "rubbish-removal-edgware",
    town: "Edgware & Barnet",
    county: "North London",
    h1: "Rubbish Removal in Edgware, Mill Hill & Barnet",
    metaTitle: "Rubbish Removal Edgware & Barnet | House & Flat Clearances",
    metaDescription:
      "Rubbish removal in Edgware, Mill Hill, Burnt Oak and Barnet — house and flat clearances, furniture, garden and builders waste. 24/7. Call 01293 549164.",
    lead: "House and flat clearances, furniture and bulky items, garden waste and renovation rubbish across Edgware, Mill Hill, Burnt Oak, High Barnet and New Barnet.",
    answer:
      "Watford Rubbish Clearance covers Edgware (HA8), Mill Hill (NW7) and Barnet (EN4, EN5) in North London for household, garden and commercial waste — 24/7, with same-day collections and fixed quotes from photos.",
    areas: ["Edgware", "Burnt Oak", "Mill Hill", "High Barnet", "New Barnet", "Totteridge", "Arkley"],
    postcodes: ["HA8", "NW7", "EN4", "EN5"],
    blocks: [
      {
        h2: "Flats, maisonettes and family houses",
        paras: [
          "Edgware and Burnt Oak have plenty of flats and maisonettes, where furniture and mattress collections mean stairs and shared bin areas. Mill Hill and Barnet's larger family homes bring full house, loft and garden clearances.",
        ],
      },
      {
        h2: "Parking and access in North London",
        paras: [
          "Many streets near Edgware and Barnet town centres have controlled parking. Let us know the restrictions and whether a visitor permit is available, and we'll plan the collection to keep it quick.",
        ],
      },
      {
        h2: "Barnet Council or a private collection?",
        paras: [
          "Barnet Council runs its own bulky waste service. A private collection is the practical choice for mixed loads, items inside the property, or when you need it cleared today.",
        ],
      },
    ],
    popular: ["house-clearance", "furniture-removal", "garden-waste-clearance", "end-of-tenancy-clearance"],
    nearby: ["rubbish-removal-borehamwood", "rubbish-removal-harrow", "rubbish-removal-bushey"],
    faqs: [
      { q: "Do you cover Mill Hill and Totteridge?", a: "Yes — Mill Hill, Totteridge, Arkley and the surrounding areas are covered along with Edgware and Barnet." },
      { q: "Can you collect from a flat with no lift?", a: "Yes. Tell us the floor level and we'll bring enough people to carry items down safely." },
    ],
    keywords: {
      primary: "rubbish removal Edgware",
      secondary: ["rubbish removal Barnet", "rubbish removal Mill Hill", "house clearance Edgware", "rubbish clearance Burnt Oak"],
      longTail: ["flat clearance Edgware", "garden waste removal Barnet", "same day rubbish removal Edgware"],
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
/** Business-confirmed coverage: a 30-mile radius of Watford town centre. */
export const COVERAGE_RADIUS_MILES = 30;

/** Further towns within the radius, listed on the Areas hub without standalone pages. */
export const widerAreas: { region: string; towns: string[] }[] = [
  { region: "Hertfordshire", towns: ["Hertford", "Welwyn Garden City", "Potters Bar", "Baldock", "Tring", "Redbourn", "Wheathampstead"] },
  { region: "Bedfordshire", towns: ["Leighton Buzzard", "Houghton Regis", "Toddington", "Caddington"] },
  { region: "Buckinghamshire", towns: ["Aylesbury", "Marlow", "Gerrards Cross", "Great Missenden", "Princes Risborough"] },
  { region: "North & West London", towns: ["Enfield", "Hendon", "Finchley", "Southgate", "Hampstead", "St John's Wood"] },
];
