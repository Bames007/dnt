export interface InlineImage {
  src: string;
  caption: string;
  afterParagraph: number;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  span: "large" | "medium" | "small" | "tall" | "wide";
  image: string;
  summary: string;
  content: string[];
  metrics?: { label: string; value: string };
  source?: { label: string; url: string };
  location?: string;
  author?: string;
  inlineImage?: InlineImage;
}

export const articlesData: Article[] = [
  {
    id: "1",
    title: "NIDEC 2026: Shifting from Remittances to Productive Investments",
    subtitle:
      "President Tinubu urges global Nigerians to move beyond family upkeep to building heavy corporate equity.",
    category: "Economic Policy",
    readTime: "4 min read",
    date: "August 2026",
    span: "large",
    image: "/chief.jpg",
    summary:
      "At the landmark Nigeria Diaspora Economic Conference in Toronto, federal leadership laid down a challenge: transform household remittances into structured production hubs.",
    metrics: { label: "Projected Inflows", value: "$23B+" },
    content: [
      "The narrative surrounding Nigerian diaspora contributions underwent a seismic shift at the Nigeria Diaspora Economic Conference (NIDEC) held in Toronto, Canada. Represented by Chief of Staff Femi Gbajabiamila, President Bola Tinubu challenged millions abroad to treat remittances as a foundation rather than a ceiling.",
      "While funds sent home have historically cushioned millions of households against inflation, school fees, and medical bills, the administration stressed that sustainable national scaling requires direct equity participation.",
      "Key sectors highlighted for institutional capital deployment include agro-processing, digital technology, energy infrastructure, export manufacturing, and healthcare. To facilitate this, mechanisms such as the Non-Resident Nigerian Investment Account and unique BVN frameworks have been streamlined to cut through bureaucratic red tape.",
    ],
  },
  {
    id: "2",
    title: "Foreign Reserves Climb to $48B+ on Robust Trade Surpluses",
    subtitle:
      "Macroeconomic realignment yields visible buffer growth amidst aggressive structural reforms.",
    category: "Finance & Reserves",
    readTime: "3 min read",
    date: "June 2026",
    span: "medium",
    image: "/chief.jpg",
    summary:
      "Central Bank metrics reveal a sharp expansion in current account balances driven by high hydrocarbon export yields and disciplined trade controls.",
    metrics: { label: "External Reserves", value: "$48.35B" },
    content: [
      "Nigeria's external buffers demonstrated strong resilience as foreign reserves climbed past $48.35 billion. This milestone was heavily propelled by a massive surge in the country's current account surplus, which widened past $4.98 billion.",
      " Analysts point to a drastic reduction in petroleum import bills coupled with stabilized crude and natural gas export values as primary catalysts.",
      "The stronger reserve position has afforded the Central Bank increased latitude to manage foreign exchange volatility, stabilizing the Naira across official windows and building long-term investor confidence.",
    ],
  },
  {
    id: "3",
    title: "The Rise of Digital IMTOs and Fintech Remittance Corridors",
    subtitle:
      "How technology is cutting transaction friction and capturing hidden dollar liquidity.",
    category: "Fintech & Trade",
    readTime: "5 min read",
    date: "September 2026",
    span: "tall",
    image: "/chief.jpg",
    summary:
      "Digital platforms are rewriting how money flows into Africa's largest remittance destination, driving transparency and competition.",
    metrics: { label: "2026 Estimate", value: "$23 Billion" },
    content: [
      "According to the Agusto & Co 2026 Diaspora Remittance Report, total remittance inflows are tracking toward an impressive $23 billion benchmark. This secures Nigeria's spot among the top global remittance-receiving nations.",
      "The digital transformation spearheaded by fintech-enabled International Money Transfer Operators (IMTOs) has eliminated traditional processing delays. Remitters can now execute instant mobile-to-bank transfers with transparent rate structures.",
      "Regulatory bodies continue to incentivize formal channels to curb leakages, ensuring that dollar liquidity directly feeds domestic production ecosystems rather than informal parallel markets.",
    ],
  },
  {
    id: "4",
    title: "Realizing the $1 Billion Monthly Inflow Target by Year-End",
    subtitle:
      "CBN Governor Olayemi Cardoso outlines aggressive targets for diaspora banking products.",
    category: "Banking",
    readTime: "3 min read",
    date: "July 2026",
    span: "small",
    image: "/chief.jpg",
    summary:
      "New non-resident account frameworks aim to rope global capital directly into structured domestic instruments.",
    metrics: { label: "Target Run-Rate", value: "$1B / Mo" },
    content: [
      "The Central Bank of Nigeria has set sights on hitting a monumental $1 billion in monthly diaspora inflows before the close of 2026.",
      "Through targeted instruments like the Non-Resident Nigerian Ordinary Account and specialized investment vehicles, the apex bank is banking on trust, security, and attractive yields to motivate millions of professionals abroad.",
    ],
  },
  {
    id: "5",
    title: "Scaling the Bank of Industry: N636 Billion Disbursed Locally",
    subtitle:
      "Industrial funding reaches record highs to bolster small businesses and manufacturing units.",
    category: "Industry",
    readTime: "4 min read",
    date: "Q1 2026",
    span: "small",
    image: "/chief.jpg",
    summary:
      "Domestic enterprise financing expands aggressively, providing matching opportunities for diaspora co-investors.",
    metrics: { label: "BOI Disbursement", value: "N636 Billion" },
    content: [
      "Empowering local enterprises remains a core pillar of current economic administration. The Bank of Industry recorded its highest annual financing volume, injecting N636 billion into key micro, small, and medium enterprises.",
      "This liquidity serves as an operational springboard for joint ventures between local manufacturers and returning diaspora partners looking for ready production lines.",
    ],
  },
  {
    id: "6",
    title: "IMF Projects 4.1% GDP Growth for Nigeria in 2026",
    subtitle:
      "International financial institutions validate three years of disciplined fiscal reforms.",
    category: "Global Economy",
    readTime: "3 min read",
    date: "August 2026",
    span: "wide",
    image: "/chief.jpg",
    summary:
      "Real GDP growth prints at 3.89% in Q1 2026 as macroeconomic stability takes firmer root across sectors.",
    metrics: { label: "Projected Growth", value: "4.1%" },
    content: [
      "International validation of Nigeria's structural overhaul continues to mount. The International Monetary Fund (IMF) and World Bank have both acknowledged substantial progress in restoring macroeconomic stability and tightening fiscal deficits.",
      "With real GDP growing by 3.89% in the first quarter and manufacturing expanding by 3.29%, the economic landscape is pivoting from recovery toward sustained, investment-led expansion.",
    ],
  },
  {
    id: "7",
    title: "Unifying Global Coalitions: The Journey of DNT",
    subtitle:
      "Grassroots mobilization across 40+ nations builds structural momentum.",
    category: "Diaspora Networks",
    readTime: "4 min read",
    date: "Archival",
    span: "small",
    image: "/chief.jpg",
    summary:
      "How organized international volunteers laid the structural foundation for cross-border policy advocacy.",
    metrics: { label: "Global Network", value: "40+ Nations" },
    content: [
      "Long before formal state conferences, international groups like the Diaspora Network for Tinubu began uniting professionals across Europe, the Americas, and Asia.",
      "These grassroots coalitions established vital communication lines, ensuring that Nigerians abroad remained informed, aligned, and integrated into national development blueprints.",
    ],
  },
  {
    id: "8",
    title: "Healthcare and Brain Gain: Reverse Migration Initiatives",
    subtitle:
      "Medical professionals abroad partner with local institutions to overhaul specialist care.",
    category: "Health & Human Capital",
    readTime: "4 min read",
    date: "Special Report",
    span: "small",
    image: "/chief.jpg",
    summary:
      "Targeted medical missions and telemedicine networks bridge critical clinical gaps across teaching hospitals.",
    metrics: { label: "Active Hubs", value: "6 Geo-Zones" },
    content: [
      "Beyond financial capital, the diaspora's intellectual capital is transforming Nigerian healthcare. Specialized medical missions, joint research grants, and telemedicine frameworks are actively transferring advanced clinical skills back home.",
      "Teaching hospitals across the six geopolitical zones are increasingly serving as nodes for global medical exchange.",
    ],
  },
  {
    id: "9",
    title: "Simplifying Compliance: The New Tax Architecture Explained",
    subtitle:
      "Lower burdens on small businesses and streamlined digital filing ease commercial friction.",
    category: "Tax Reform",
    readTime: "3 min read",
    date: "Policy Update",
    span: "medium",
    image: "/chief.jpg",
    summary:
      "Comprehensive tax overhauls remove redundancies to encourage formal business incorporation.",
    metrics: { label: "Compliance Cost", value: "Optimized" },
    content: [
      "A modernized tax architecture has been rolled out to reduce multi-layered taxation pressures on small businesses and low-income earners.",
      "By replacing convoluted levies with transparent digital filing systems, the government aims to expand the tax net organically while protecting emerging startups from early regulatory shocks.",
    ],
  },
  {
    id: "10",
    title: "Bridging the Geopolitical Divide: The Push for Diaspora Voting",
    subtitle:
      "How economic weight translates into formal political enfranchisement conversations.",
    category: "Civic Rights",
    readTime: "5 min read",
    date: "Analysis",
    span: "small",
    image: "/chief.jpg",
    summary:
      "As financial stakes multiply, the legislative debate around overseas ballot participation gains renewed momentum.",
    metrics: { label: "Political Leverage", value: "Growing" },
    content: [
      "Economic power has historically opened doors to political participation. With diaspora financial contributions scaling multi-billion dollar heights, advocates argue that formal voting rights are the logical next step.",
      "Legislative assemblies continue to review framework logistics to secure a tamper-proof mechanism for overseas ballots in future electoral cycles.",
    ],
  },
  {
    id: "11",
    title: "Agro-Allied Industrialization: Unlocking Agricultural Value Chains",
    subtitle:
      "Turning raw commodity exports into high-value processed goods for global markets.",
    category: "Agriculture",
    readTime: "4 min read",
    date: "Sector Focus",
    span: "small",
    image: "/chief.jpg",
    summary:
      "Strategic farming corridors attract private equity partnerships to replace raw export dependencies.",
    metrics: { label: "Growth Sector", value: "Agro-Export" },
    content: [
      "Agricultural modernization is drawing intense interest from foreign-based investors. Moving away from raw commodity export toward localized agro-processing yields high employment multipliers.",
      "Government-backed storage facilities, rural access roads, and cold-chain logistics are rapidly transforming agricultural belts into export powerhouses.",
    ],
  },
  {
    id: "12",
    title: "Energy Transition and Diaspora Capital in Power Infrastructure",
    subtitle:
      "Off-grid solar solutions and gas-to-power projects open lucrative investment windows.",
    category: "Energy",
    readTime: "4 min read",
    date: "Infrastructure",
    span: "medium",
    image: "/chief.jpg",
    summary:
      "Private power generation projects leverage green energy funds and diaspora co-investment syndicates.",
    metrics: { label: "Grid Capacity", value: "Expanding" },
    content: [
      "Power infrastructure remains a primary focus of public-private partnerships. Decentralized solar mini-grids and commercial gas expansion projects are opening up high-yield avenues for private institutional investors.",
      "Diaspora syndicates are increasingly pooling funds to finance localized industrial parks with dedicated, uninterrupted power supply.",
    ],
  },
  {
    id: "13",
    title:
      "The Creative Economy Explosion: Nollywood Meets Global Venture Capital",
    subtitle:
      "International streaming platforms and diaspora capital supercharge cultural export production.",
    category: "Creative Industry",
    readTime: "3 min read",
    date: "Culture & Tech",
    span: "small",
    image: "/chief.jpg",
    summary:
      "Nigerian entertainment secures global institutional financing and world-class studio infrastructure.",
    metrics: { label: "Global Reach", value: "Worldwide" },
    content: [
      "Nollywood and the Nigerian music scene are no longer just cultural exports; they represent bankable financial asset classes.",
      "With international streaming giants setting up permanent local hubs and diaspora venture funds backing state-of-the-art production studios, the creative economy is scaling unprecedented commercial heights.",
    ],
  },
  {
    id: "14",
    title: "Real Estate and Urban Renewal: Beyond Luxury Property Acquisition",
    subtitle:
      "Redirecting capital from speculative housing toward smart industrial real estate.",
    category: "Real Estate",
    readTime: "3 min read",
    date: "Urban Dev",
    span: "small",
    image: "/chief.jpg",
    summary:
      "A shift toward affordable housing developments and commercial tech hubs transforms metropolitan landscapes.",
    metrics: { label: "Housing Scheme", value: "Nationwide" },
    content: [
      "President Tinubu specifically cautioned against limiting diaspora real estate investments to speculative, empty luxury properties.",
      "The new wave of urban development emphasizes mass housing schemes, mixed-use commercial hubs, and smart city infrastructure that directly address urban housing deficits while generating steady rental yields.",
    ],
  },
  {
    id: "15",
    title:
      "Securing Trust: Corporate Governance and Due Diligence in Investments",
    subtitle:
      "Establishing audited accountability frameworks to protect cross-border investors from fraud.",
    category: "Governance",
    readTime: "4 min read",
    date: "Security & Trust",
    span: "wide",
    image: "/chief.jpg",
    summary:
      "Institutionalizing professional investment clubs and transparent project pipelines ensures long-term capital safety.",
    metrics: { label: "Protection Index", value: "Verified" },
    content: [
      "For diaspora capital to flow securely at scale, trust and regulatory transparency are non-negotiable prerequisites.",
      "Federal economic teams are actively working with legal bodies to enforce strict corporate governance standards, rigorous audit requirements, and transparent project pipelines.",
      "By encouraging professionally managed investment clubs rather than informal, personality-driven transactions, Nigeria is creating a safe, highly predictable financial climate for investors worldwide.",
    ],
  },

  {
    id: "16",
    title:
      "Tinubu Needs Second Term to Consolidate Reforms, Says Diaspora Coordinator",
    subtitle:
      "International Coordinator of the Diaspora Network for Tinubu (DNT), Chief Chukwuemeka Obielom, has said the group remains committed to mobilising Nigerians at home and abroad for the re-election of President Bola Ahmed Tinubu in the 2027 presidential election.",
    category: "Diaspora Networks",
    readTime: "12 min read",
    date: "September 2026",
    span: "wide",
    image: "/dubai.jpg",
    summary:
      "Chief Chukwuemeka Obielom says the Diaspora Network for Tinubu has begun extensive mobilisation across Europe, the Americas, Asia and the Middle East, arguing that the 2027 election is a referendum on policy continuity.",
    metrics: { label: "Election Cycle", value: "2027" },
    location: "London, United Kingdom",
    author: "Diaspora Desk",
    source: {
      label: "The Mirror Online",
      url: "https://themirroronline.com.ng/tinubu-needs-second-term-to-consolidate-reforms-says-diaspora-coordinator/",
    },
    inlineImage: {
      src: "/britain.jpg",
      caption:
        "Chief Chukwuemeka Obielom, International Coordinator of the Diaspora Network for Tinubu, speaking to journalists in London.",
      afterParagraph: 3,
    },
    content: [
      "Chief Chukwuemeka Obielom, International Coordinator of the Diaspora Network for Tinubu (DNT), has said the socio-political group has commenced extensive mobilisation among Nigerians in the Diaspora, insisting that the administration of President Bola Tinubu requires another term to consolidate what he described as the far-reaching reforms and policies introduced since the administration came into office.",
      "Speaking with journalists, Obielom said Nigerians living abroad had been following developments in the country and, according to him, had collectively resolved to support Tinubu's bid for a second term. The group, he disclosed, has members and offices across Europe, Asia, North and South America, and the Middle East, while structures are also being established across Nigeria's six geopolitical zones to strengthen coordination and mobilisation.",
      "According to Obielom, the objective of the organisation is not merely to campaign for a political candidate but to support what he described as policies capable of putting Nigeria on the path of sustainable economic growth, development and prosperity.",
      '"Nigeria is getting better. Tinubu is carrying out genuine reforms, and Nigerians will be better off at the end," he said. He argued that no country could achieve sustainable development without undertaking difficult but necessary reforms, adding that the policies of the Tinubu administration should be viewed as long-term measures rather than temporary interventions.',
      "Obielom said the reforms being implemented by the administration were designed, in his view, to address some of the structural challenges that had affected the Nigerian economy over the years. He maintained that Nigerians in the Diaspora had a responsibility to contribute to the development of their country and support policies and programmes they believe would create a better future for the younger generation.",
      '"Our interest is to see Nigeria work again for the benefit of our teeming youth population and the next generation. Every hand must be on deck to ensure the re-election of President Bola Tinubu in order to ensure the seamless continuation of the ongoing reforms," he said.',
      'The DNT coordinator further disclosed that he had been working with his team and other Nigerians living abroad to build a broad-based mobilisation network ahead of the 2027 elections. "I am working around the clock with my team here in the Diaspora. We are in touch with many Nigerians living abroad, and we have concluded that we will support the President en masse for a greater Nigeria," he said.',
      "Obielom also revealed that the group had established coordinating offices in Nigeria's six geopolitical zones to improve its engagement with Nigerians and other interest groups. The initiative, he said, was designed to promote effective synergy and a harmonious working relationship between the Diaspora Network for Tinubu, its supporters across the country and Nigerians living abroad.",
      "According to him, liaison structures have been established in Lagos, Abuja, Anambra, Rivers, Kano, Sokoto and Benue States, with plans to formally open the offices for liaison, coordination and other activities. He added that the organisation had already supported several projects, programmes and activities aimed at contributing to national development.",
      '"Our zeal to see the fixing of Nigeria under the current administration remains on course. We have also set up coordinating offices in Nigeria\'s six geopolitical zones for effective synergy and harmonious working relationship with other interest groups and Nigerians in general," he stated.',
      "The DNT coordinator said the group would intensify its mobilisation activities as the 2027 election approaches, including engaging Nigerians at the grassroots and members of the Diaspora. He urged Nigerians who support the President to ensure that they obtain and keep their Permanent Voter Cards (PVCs) ready for the 2027 election, and called on supporters to join the organisation's mobilisation efforts, including door-to-door campaigns and other grassroots engagements both in Nigeria and among Nigerians living abroad.",
      "According to him, the objective is to build a strong support base capable of communicating what he described as the achievements and policies of the current administration to voters. He appealed to Nigerians to remain united and support the President's re-election, arguing that continuity would enable the administration to complete and consolidate ongoing programmes.",
      '"Nigeria will be great again. A lot of reforms have been witnessed, and more are coming. The President is fixing the nation, and things will soon get better," he said.',
      "Obielom also highlighted developments in the petroleum and power sectors as areas where he believes the administration's policies would produce long-term benefits. He claimed that the era of fuel scarcity was gradually becoming a thing of the past and expressed optimism that the prices of goods and services would become more stable as economic reforms mature.",
      "He further expressed confidence that the administration would make significant progress in addressing Nigeria's longstanding electricity challenges. According to him, the restructuring and unbundling of aspects of the power sector would create greater opportunities for states to participate in electricity generation and distribution. Such reforms, if properly implemented, he said, could help improve electricity supply and stimulate economic activities across the country.",
      "The DNT coordinator also maintained that the Tinubu administration had demonstrated what he described as a commitment to ensuring that different parts of the country benefit from government programmes, projects and appointments. He said several projects had either been completed, initiated or were ongoing across the country, adding that the developments were publicly available for Nigerians to assess.",
      "Obielom stressed that his organisation's campaign for Tinubu's re-election was based largely on what he described as the need for policy continuity. He argued that major economic and institutional reforms often require time before their full benefits can be realised, noting that changing direction midway could affect the implementation of ongoing programmes.",
      "He therefore urged Nigerians to consider the long-term implications of the policies of the current administration when making their choices in 2027. The DNT coordinator said Nigerians in the Diaspora would continue to engage their communities, families and networks in Nigeria as part of efforts to mobilise support for Tinubu.",
      "He expressed optimism that the collective efforts of Nigerians at home and abroad could contribute to what he described as the emergence of a stronger, more prosperous and better-governed Nigeria.",
      "As the 2027 elections draw closer, political parties, support groups and various interest organisations are expected to intensify their mobilisation activities, with the Diaspora increasingly becoming an important constituency in Nigeria's political discourse.",
    ],
  },
];
