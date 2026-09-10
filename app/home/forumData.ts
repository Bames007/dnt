/* ------------------------------------------------------------------ */
/*  TYPES                                                              */
/* ------------------------------------------------------------------ */

export interface Comment {
  id: string;
  topicId: string;
  author: string;
  body: string;
  timeAgo: string;
  likes: number;
  isUser?: boolean;
  isOP?: boolean;
}

export interface Topic {
  id: string;
  title: string;
  category: string;
  preview: string;
  body: string[];
  author: string;
  authorRole?: string;
  postedAgo: string;
  tags: string[];
  likes: number;
  views: number;
  comments: Comment[];
  pinned?: boolean;
  hot?: boolean;
  isUser?: boolean;
}

export interface UserIdentity {
  name: string;
  email: string;
}

export interface PersistedState {
  likedTopics: string[];
  likedComments: string[];
  userComments: Record<string, Comment[]>;
  userTopics: Topic[];
}

/* ------------------------------------------------------------------ */
/*  STORAGE KEYS                                                       */
/* ------------------------------------------------------------------ */

export const STORAGE_KEY = "forum:state:v1";
export const USER_KEY = "forum:user:v1";
export const SIG_KEY = "sig-wall:user";

export const emptyState: PersistedState = {
  likedTopics: [],
  likedComments: [],
  userComments: {},
  userTopics: [],
};

/* ------------------------------------------------------------------ */
/*  STORAGE HELPERS (safe on both server & client)                     */
/* ------------------------------------------------------------------ */

export function loadState(): PersistedState {
  if (typeof window === "undefined") return emptyState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState;
    const parsed = JSON.parse(raw);
    return { ...emptyState, ...parsed };
  } catch {
    return emptyState;
  }
}

export function saveState(state: PersistedState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export function loadIdentity(): UserIdentity | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) return JSON.parse(raw);
    const sig = localStorage.getItem(SIG_KEY);
    if (sig) {
      const parsed = JSON.parse(sig);
      if (parsed?.name) {
        return { name: parsed.name, email: parsed.email ?? "" };
      }
    }
  } catch {}
  return null;
}

export function saveIdentity(identity: UserIdentity) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(identity));
  } catch {}
}

/* ------------------------------------------------------------------ */
/*  UTILITIES                                                          */
/* ------------------------------------------------------------------ */

export function formatNumber(n: number) {
  return n.toLocaleString("en-US");
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

export function timeAgoFromTs(ts: number): string {
  const diff = Math.max(0, Date.now() - ts);
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export function findTopicById(id: string, state: PersistedState): Topic | null {
  const user = state.userTopics.find((t) => t.id === id);
  if (user) {
    const extra = state.userComments[id] ?? [];
    return { ...user, comments: [...extra, ...user.comments] };
  }
  const seed = SEED_TOPICS.find((t) => t.id === id);
  if (seed) {
    const extra = state.userComments[id] ?? [];
    return { ...seed, comments: [...extra, ...seed.comments] };
  }
  return null;
}

/* ------------------------------------------------------------------ */
/*  SEED TOPICS                                                        */
/* ------------------------------------------------------------------ */

export const SEED_TOPICS: Topic[] = [
  {
    id: "subsidy-gamble",
    title: "The Subsidy Gamble: Two Years In, Would You Do It Again?",
    category: "Economy",
    preview:
      "Tinubu removed the petrol subsidy on day one. Prices tripled, transport costs doubled, and the promised savings never quite reached the streets. Was it the only way forward?",
    body: [
      "The petrol subsidy was removed on May 29, 2023 the very first act of the new administration. Within weeks, the pump price jumped from around ₦185 to over ₦500. Transport, food, and every input tied to diesel followed.",
      "The argument was straightforward: the subsidy was bleeding $10B+ annually, mostly into the hands of importers and arbitrageurs. Freeing that money, the administration said, would fund infrastructure, education, and health.",
      "Two years later, the savings side remains disputed. State allocations have grown, but households are still absorbing the shock. Was this the only route to fiscal sanity, or was there a softer path?",
      "This is the debate. Real numbers, real pain, real tradeoffs weigh in below.",
    ],
    author: "Moderator",
    authorRole: "Admin",
    postedAgo: "2d ago",
    tags: ["subsidy", "fuel", "economy"],
    likes: 342,
    views: 4211,
    pinned: true,
    comments: [
      {
        id: "subsidy-c1",
        topicId: "subsidy-gamble",
        author: "Tunde A.",
        body: "I drive for a living. My monthly fuel bill went from 90k to almost 300k. Yes the policy is right in principle, but the transition support promised never came. That's the part that hurt.",
        timeAgo: "1d ago",
        likes: 87,
      },
      {
        id: "subsidy-c2",
        topicId: "subsidy-gamble",
        author: "Adaeze O.",
        body: "The subsidy was largely theft dressed as welfare. I'd rather pay real prices than fund a scheme that mostly enriched importers. Slow pain over permanent rot.",
        timeAgo: "22h ago",
        likes: 64,
      },
      {
        id: "subsidy-c3",
        topicId: "subsidy-gamble",
        author: "Ibrahim M.",
        body: "Both of you are right. Subsidy had to go. But if you don't reinvest the savings into visible benefits power, roads, wages people will just remember the pain.",
        timeAgo: "18h ago",
        likes: 112,
      },
      {
        id: "subsidy-c4",
        topicId: "subsidy-gamble",
        author: "Ngozi E.",
        body: "I want to see an actual breakdown of where the freed money went. Not press statements. Line items. That's what would settle this debate for me.",
        timeAgo: "12h ago",
        likes: 41,
      },
    ],
  },
  {
    id: "naira-freefall",
    title:
      "Naira Freefall: Unification Was Right, But What Actually Fixes the Rate?",
    category: "Currency",
    preview:
      "One window was textbook correct. But over a year later, the Naira is still searching for a floor. What's the missing piece reserves, exports, or confidence?",
    body: [
      "The CBN collapsed the multiple exchange rate windows into a single market in mid-2023. The theory: end arbitrage, let price discovery work, attract dollar inflows.",
      "The practice has been messier. The Naira slid from ~₦460/$ to over ₦1,500/$ at its worst before clawing back some ground. Volatility has been brutal for importers and long-term planners.",
      "Some argue the fix is simply time let exports grow, let confidence return, and the rate stabilises naturally. Others say the structural issues (low oil production, weak non-oil exports, thin reserves) are the actual constraint.",
      "What do you think is the missing piece?",
    ],
    author: "Tunde A.",
    postedAgo: "3d ago",
    tags: ["naira", "fx", "cbn"],
    likes: 218,
    views: 3104,
    comments: [
      {
        id: "naira-c1",
        topicId: "naira-freefall",
        author: "Emeka N.",
        body: "You can't stabilise a currency by decree. You stabilise it by exporting more than you import. Full stop. The rate will find its floor when the trade balance does.",
        timeAgo: "2d ago",
        likes: 76,
      },
      {
        id: "naira-c2",
        topicId: "naira-freefall",
        author: "Zainab I.",
        body: "Also confidence. Nobody wants to keep dollars in Nigeria if they think policy could reverse overnight. We need credible, boring, predictable policy for a decade.",
        timeAgo: "1d ago",
        likes: 93,
      },
      {
        id: "naira-c3",
        topicId: "naira-freefall",
        author: "Segun O.",
        body: "The real issue is oil production. We pump under 1.4m barrels/day vs the 2m we're capable of. That's billions in missing dollars every month.",
        timeAgo: "20h ago",
        likes: 58,
      },
    ],
  },
  {
    id: "10m-jobs",
    title: "10 Million Jobs Realistic Target or Campaign Rhetoric?",
    category: "Jobs",
    preview:
      "The administration keeps pointing at 10 million jobs as the endpoint of every reform. Where exactly do those jobs come from, sector by sector?",
    body: [
      "Ten million jobs. It's the number that shows up in almost every economic speech the promised dividend of subsidy removal, FX reform, tax simplification, and infrastructure spending.",
      "For context, Nigeria's total formal workforce is around 60 million. Adding 10 million in a single term would require roughly doubling the pace of formal job creation seen in any prior administration.",
      "The administration's roadmap cites agro-processing, digital services, construction, the creative economy, and energy as core engines. Each is plausible in isolation, but the aggregate math is aggressive.",
      "Is this a real plan with costed inputs, or a number designed to sound big? Let's discuss.",
    ],
    author: "Adaeze O.",
    postedAgo: "1d ago",
    tags: ["jobs", "employment", "reform"],
    likes: 289,
    views: 3822,
    comments: [
      {
        id: "jobs-c1",
        topicId: "10m-jobs",
        author: "Kelechi U.",
        body: "If MSMEs get credit, if power stabilises, if ports work 10m is not crazy over 4-6 years. But all three of those 'ifs' are doing enormous lifting.",
        timeAgo: "20h ago",
        likes: 71,
      },
      {
        id: "jobs-c2",
        topicId: "10m-jobs",
        author: "Folake B.",
        body: "The creative economy alone could absorb millions. Nollywood, music, content creation, esports. But we need to formalise it, tax it sensibly, and export it.",
        timeAgo: "16h ago",
        likes: 55,
      },
      {
        id: "jobs-c3",
        topicId: "10m-jobs",
        author: "Yusuf D.",
        body: "I'll believe it when I see county-by-county breakdowns with sector attribution. Until then it's a headline, not a plan.",
        timeAgo: "8h ago",
        likes: 89,
      },
    ],
  },
  {
    id: "diaspora-vote",
    title: "Should Nigerians Abroad Get a Vote? Let's Actually Debate It.",
    category: "Civic Rights",
    preview:
      "Over $20B in annual remittances. Zero ballots. If the diaspora is funding the country's growth, should they have a formal say in it?",
    body: [
      "Nigeria receives more than $20 billion in remittances every year more than most sectors contribute to GDP. That money funds school fees, hospital bills, small businesses, and household survival across the country.",
      "Yet Nigerians abroad cannot vote. They must physically return to cast a ballot, which is impractical for the vast majority.",
      "Advocates argue that economic contribution without political voice is untenable. Critics counter that voting from abroad is logistically complex and opens doors to fraud.",
      "The real question: is diaspora voting a logical extension of democratic rights, or a change that requires constitutional surgery that isn't ready yet?",
    ],
    author: "Chiamaka E.",
    postedAgo: "4d ago",
    tags: ["diaspora", "voting", "constitution"],
    likes: 176,
    views: 2418,
    comments: [
      {
        id: "vote-c1",
        topicId: "diaspora-vote",
        author: "Obinna K.",
        body: "If I pay taxes when I visit, if I send money that builds schools and roads, then yes I should have a say in who runs the place. That's not controversial to me.",
        timeAgo: "3d ago",
        likes: 92,
      },
      {
        id: "vote-c2",
        topicId: "diaspora-vote",
        author: "Halima S.",
        body: "Logistics are hard, but 'hard' isn't 'impossible'. Ghana, Kenya, and others are moving on this. We can't keep saying it's too difficult forever.",
        timeAgo: "2d ago",
        likes: 61,
      },
      {
        id: "vote-c3",
        topicId: "diaspora-vote",
        author: "Bisi A.",
        body: "The question I never see addressed: how do you verify residency? A lot of people abroad still vote in their home state. That's the real can of worms.",
        timeAgo: "1d ago",
        likes: 48,
      },
    ],
  },
  {
    id: "student-loans",
    title: "Student Loans: Has Anyone Actually Received One Yet?",
    category: "Education",
    preview:
      "The scheme launched with fanfare. But between NELFUND delays, verification bottlenecks, and school-level confusion, how many students actually got money?",
    body: [
      "The Student Loan Scheme was meant to be one of the flagship wins of the reform era. Zero-interest loans for Nigerian students, funded by the state, disbursed via NELFUND.",
      "The rollout has been slow. Verification bottlenecks, university-level confusion, and unclear eligibility rules have kept the actual number of beneficiaries smaller than the headline promised.",
      "To be fair, this is a complex programme with genuine logistics to solve. But the gap between announcement and disbursement matters students don't get to wait two years for their fees.",
      "Has anyone here actually gotten a loan? Or know someone who has? Let's get real data.",
    ],
    author: "Emeka N.",
    postedAgo: "18h ago",
    tags: ["loans", "education", "youth"],
    likes: 134,
    views: 1955,
    comments: [
      {
        id: "loans-c1",
        topicId: "student-loans",
        author: "Damilola O.",
        body: "My cousin applied in October, got verified in January, and received the disbursement in February. So it works but the queue is long and the process is slow.",
        timeAgo: "12h ago",
        likes: 44,
      },
      {
        id: "loans-c2",
        topicId: "student-loans",
        author: "Nneka A.",
        body: "The problem is that a lot of students don't even know they qualify or how to apply. Universities need to be actively pushing this, not waiting for students to figure it out.",
        timeAgo: "8h ago",
        likes: 37,
      },
    ],
  },
  {
    id: "power-devolution",
    title: "The Power Sector After Devolution Are States Delivering?",
    category: "Infrastructure",
    preview:
      "The Electricity Act handed states the grid. Lagos and a few others are moving. But is this solving the problem, or just splitting it?",
    body: [
      "The Electricity Act 2023 was one of the most consequential legal changes in decades. It removed the federal monopoly on generation and distribution and handed control to states.",
      "Lagos, Enugu, and a few others have moved fast establishing their own electricity markets and encouraging embedded generation. Others are still figuring out the framework.",
      "The upside: local accountability, tailored solutions, faster decisions. The downside: risk of a patchwork, uneven quality, and states that can't afford the transition falling further behind.",
      "Is this the right structural answer, or a shift of the same problem to a new level of government?",
    ],
    author: "Moderator",
    authorRole: "Admin",
    postedAgo: "5d ago",
    tags: ["power", "electricity", "states"],
    likes: 201,
    views: 2780,
    hot: true,
    comments: [
      {
        id: "power-c1",
        topicId: "power-devolution",
        author: "Gbenga T.",
        body: "Lagos will win. That's the whole point of devolution states that are serious will move, states that aren't will get left behind. That's accountability.",
        timeAgo: "4d ago",
        likes: 68,
      },
      {
        id: "power-c2",
        topicId: "power-devolution",
        author: "Amina Y.",
        body: "And what about states that can't afford it? They'll fall further behind. Federal support has to remain part of the picture, not disappear entirely.",
        timeAgo: "3d ago",
        likes: 79,
      },
      {
        id: "power-c3",
        topicId: "power-devolution",
        author: "Uche I.",
        body: "Bottom line: if I get 20 hours of power a day under a state government instead of 8 under the federal one, I don't care what level it comes from. Just deliver.",
        timeAgo: "2d ago",
        likes: 105,
      },
    ],
  },
  {
    id: "remittances-vs-investment",
    title:
      "Remittances vs Investments: What Should Returnees Actually Do With Their Money?",
    category: "Diaspora",
    preview:
      "Sending money home is easy. Building something with it is hard. What are the honest tradeoffs between quick transfers and long-term stakes?",
    body: [
      "Every month, millions of Nigerians abroad send money home. Some goes to family support, some to school fees, some to hospital bills. It's a lifeline.",
      "But the conversation has shifted. Should that money do more than support? Should it build equity, fund businesses, and create jobs?",
      "The honest answer is: both. Family support remains essential and shouldn't be dismissed. But there's real room for structured investments that compound over decades.",
      "The catch is that investment is hard due diligence, fraud risk, currency risk, and the challenge of monitoring something from 6,000 miles away.",
      "For those who've done both: what's the honest tradeoff? What worked? What would you never do again?",
    ],
    author: "Oluchi B.",
    postedAgo: "2d ago",
    tags: ["remittances", "investment", "diaspora"],
    likes: 267,
    views: 3401,
    hot: true,
    comments: [
      {
        id: "remit-c1",
        topicId: "remittances-vs-investment",
        author: "Kunle A.",
        body: "Family support is not optional. That's cultural and non-negotiable for most of us. But whatever's left over invest it into things you can verify, in industries you understand.",
        timeAgo: "1d ago",
        likes: 84,
      },
      {
        id: "remit-c2",
        topicId: "remittances-vs-investment",
        author: "Rukayat O.",
        body: "I built a small agro-processing business with a cousin on the ground. Structured, audited, quarterly reports. Not fancy, but it works. Never invest informally get paperwork.",
        timeAgo: "20h ago",
        likes: 111,
      },
      {
        id: "remit-c3",
        topicId: "remittances-vs-investment",
        author: "Sadiq M.",
        body: "The biggest barrier is trust. Until there's reliable legal recourse for cross-border investors, most people will keep sending cash to family instead of building assets. It's rational.",
        timeAgo: "14h ago",
        likes: 76,
      },
    ],
  },
  {
    id: "tax-reform",
    title:
      "Tax Reform: Genuine Relief or Repackaged Burden on the Middle Class?",
    category: "Policy",
    preview:
      "The new tax code was sold as simplification. But did it lift the burden, or just move it around? The receipts are still coming in.",
    body: [
      "The tax reform package was one of the largest in recent memory. Levies consolidated, thresholds raised, digital filing mandated.",
      "The pitch was simple: fewer, clearer taxes. Easier compliance. More businesses formalising because the cost of formality dropped.",
      "The reality is more mixed. Some small businesses genuinely pay less. Others see new fees disguised as 'administrative charges'. The middle class still carries a large share of the actual revenue base.",
      "Is this reform doing what it promised? Or is the middle class, as usual, footing the bill?",
    ],
    author: "Babatunde S.",
    postedAgo: "3d ago",
    tags: ["tax", "policy", "middle-class"],
    likes: 145,
    views: 1877,
    comments: [
      {
        id: "tax-c1",
        topicId: "tax-reform",
        author: "Ifeanyi N.",
        body: "As a small business owner, I've seen the difference. The consolidation is real. But agencies still find ways to invent new fees. The law changes; the hustlers adapt.",
        timeAgo: "2d ago",
        likes: 62,
      },
      {
        id: "tax-c2",
        topicId: "tax-reform",
        author: "Yemi T.",
        body: "Middle class always pays. Salaried, PAYE, no deductions, no dodges. The reform didn't touch that reality. If anything it made it more transparent, which stings more.",
        timeAgo: "1d ago",
        likes: 88,
      },
    ],
  },
  {
    id: "culture-and-code",
    title:
      "Nollywood to Silicon Valley: Is Nigeria's Real Export Culture and Code?",
    category: "Creative & Tech",
    preview:
      "Forget oil for a second. Nigerian music, film, and fintech are reaching global markets on their own steam. Should policy treat them as primary exports?",
    body: [
      "Nigerian music streams globally. Nollywood films stream on Netflix. Nigerian fintech companies operate across Africa and beyond. This is happening without the kind of state support that oil or agriculture receives.",
      "The question is whether policy is treating these sectors as priorities, or still as side shows to the 'real' economy.",
      "Some argue the culture and tech sectors are Nigeria's true comparative advantage in the 21st century young, English-speaking, digitally native, globally connected.",
      "Others point to infrastructural gaps: power, internet penetration, IP protection, and financing for creators.",
      "Should Nigeria pivot to treat its cultural and tech exports as strategic national assets?",
    ],
    author: "Aisha M.",
    postedAgo: "6d ago",
    tags: ["nollywood", "tech", "exports"],
    likes: 198,
    views: 2562,
    comments: [
      {
        id: "culture-c1",
        topicId: "culture-and-code",
        author: "Onyeka A.",
        body: "Afrobeats is doing more for Nigeria's global image than any government PR could. It deserves the same policy weight as oil. Seriously.",
        timeAgo: "5d ago",
        likes: 119,
      },
      {
        id: "culture-c2",
        topicId: "culture-and-code",
        author: "Musa I.",
        body: "The problem is IP enforcement. You can't scale a creative industry if every film gets pirated within a week. Fix that and you'll unlock billions.",
        timeAgo: "4d ago",
        likes: 73,
      },
      {
        id: "culture-c3",
        topicId: "culture-and-code",
        author: "Chinedu E.",
        body: "Fintech is the stealth weapon. Nigerian-built products now serve millions across Africa. That's not culture, that's infrastructure but it's Nigerian-made. Own that.",
        timeAgo: "3d ago",
        likes: 92,
      },
    ],
  },
];
