// // app/home/forum.tsx
// "use client";

// import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
// import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
// import { Black_Ops_One, Open_Sans } from "next/font/google";
// import {
//   ArrowLeft,
//   ArrowUpRight,
//   Check,
//   Clock,
//   Flame,
//   Heart,
//   MessageSquare,
//   PenLine,
//   Pin,
//   Send,
//   Share2,
//   X,
// } from "lucide-react";

// /* ------------------------------------------------------------------ */
// /*  BRAND SVGs (same as signature wall)                                */
// /* ------------------------------------------------------------------ */

// function WhatsAppIcon({ size = 18 }: { size?: number }) {
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       width={size}
//       height={size}
//       fill="currentColor"
//       aria-hidden="true"
//     >
//       <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
//     </svg>
//   );
// }

// function XIcon({ size = 16 }: { size?: number }) {
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       width={size}
//       height={size}
//       fill="currentColor"
//       aria-hidden="true"
//     >
//       <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
//     </svg>
//   );
// }

// function FacebookIcon({ size = 18 }: { size?: number }) {
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       width={size}
//       height={size}
//       fill="currentColor"
//       aria-hidden="true"
//     >
//       <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//     </svg>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  FONTS                                                              */
// /* ------------------------------------------------------------------ */

// const blackOpsOne = Black_Ops_One({ weight: "400", subsets: ["latin"] });
// const openSans = Open_Sans({ subsets: ["latin"] });

// /* ------------------------------------------------------------------ */
// /*  TYPES                                                              */
// /* ------------------------------------------------------------------ */

// interface Comment {
//   id: string;
//   topicId: string;
//   author: string;
//   body: string;
//   timeAgo: string; // hard-coded for seeds, live for user comments
//   likes: number;
//   isUser?: boolean;
//   isOP?: boolean; // original poster
// }

// interface Topic {
//   id: string;
//   title: string;
//   category: string;
//   preview: string;
//   body: string[];
//   author: string;
//   authorRole?: string;
//   postedAgo: string;
//   tags: string[];
//   likes: number;
//   views: number;
//   comments: Comment[];
//   pinned?: boolean;
//   hot?: boolean;
//   isUser?: boolean;
// }

// interface UserIdentity {
//   name: string;
//   email: string;
// }

// /* ------------------------------------------------------------------ */
// /*  STORAGE                                                            */
// /* ------------------------------------------------------------------ */

// const STORAGE_KEY = "forum:state:v1";
// const USER_KEY = "forum:user:v1";
// const SIG_KEY = "sig-wall:user";

// interface PersistedState {
//   likedTopics: string[];
//   likedComments: string[];
//   userComments: Record<string, Comment[]>;
//   userTopics: Topic[];
// }

// const emptyState: PersistedState = {
//   likedTopics: [],
//   likedComments: [],
//   userComments: {},
//   userTopics: [],
// };

// function loadState(): PersistedState {
//   if (typeof window === "undefined") return emptyState;
//   try {
//     const raw = localStorage.getItem(STORAGE_KEY);
//     if (!raw) return emptyState;
//     const parsed = JSON.parse(raw);
//     return { ...emptyState, ...parsed };
//   } catch {
//     return emptyState;
//   }
// }

// function saveState(state: PersistedState) {
//   try {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
//   } catch {}
// }

// function loadIdentity(): UserIdentity | null {
//   if (typeof window === "undefined") return null;
//   try {
//     const raw = localStorage.getItem(USER_KEY);
//     if (raw) return JSON.parse(raw);
//     // fall back to signature wall identity
//     const sig = localStorage.getItem(SIG_KEY);
//     if (sig) {
//       const parsed = JSON.parse(sig);
//       if (parsed?.name) {
//         return { name: parsed.name, email: parsed.email ?? "" };
//       }
//     }
//   } catch {}
//   return null;
// }

// function saveIdentity(identity: UserIdentity) {
//   try {
//     localStorage.setItem(USER_KEY, JSON.stringify(identity));
//   } catch {}
// }

// /* ------------------------------------------------------------------ */
// /*  SEED DATA                                                          */
// /* ------------------------------------------------------------------ */

// const SEED_TOPICS: Topic[] = [
//   {
//     id: "t1",
//     title: "The Subsidy Gamble: Two Years In, Would You Do It Again?",
//     category: "Economy",
//     preview:
//       "Tinubu removed the petrol subsidy on day one. Prices tripled, transport costs doubled, and the promised savings never quite reached the streets. Was it the only way forward?",
//     body: [
//       "The petrol subsidy was removed on May 29, 2023 — the very first act of the new administration. Within weeks, the pump price jumped from around ₦185 to over ₦500. Transport, food, and every input tied to diesel followed.",
//       "The argument was straightforward: the subsidy was bleeding $10B+ annually, mostly into the hands of importers and arbitrageurs. Freeing that money, the administration said, would fund infrastructure, education, and health.",
//       "Two years later, the savings side remains disputed. State allocations have grown, but households are still absorbing the shock. Was this the only route to fiscal sanity, or was there a softer path?",
//       "This is the debate. Real numbers, real pain, real tradeoffs — weigh in below.",
//     ],
//     author: "Moderator",
//     authorRole: "Admin",
//     postedAgo: "2d ago",
//     tags: ["subsidy", "fuel", "economy"],
//     likes: 342,
//     views: 4211,
//     pinned: true,
//     comments: [
//       {
//         id: "t1-c1",
//         topicId: "t1",
//         author: "Tunde A.",
//         body: "I drive for a living. My monthly fuel bill went from 90k to almost 300k. Yes the policy is right in principle, but the transition support promised never came. That's the part that hurt.",
//         timeAgo: "1d ago",
//         likes: 87,
//       },
//       {
//         id: "t1-c2",
//         topicId: "t1",
//         author: "Adaeze O.",
//         body: "The subsidy was largely theft dressed as welfare. I'd rather pay real prices than fund a scheme that mostly enriched importers. Slow pain over permanent rot.",
//         timeAgo: "22h ago",
//         likes: 64,
//       },
//       {
//         id: "t1-c3",
//         topicId: "t1",
//         author: "Ibrahim M.",
//         body: "Both of you are right. Subsidy had to go. But if you don't reinvest the savings into visible benefits — power, roads, wages — people will just remember the pain.",
//         timeAgo: "18h ago",
//         likes: 112,
//       },
//       {
//         id: "t1-c4",
//         topicId: "t1",
//         author: "Ngozi E.",
//         body: "I want to see an actual breakdown of where the freed money went. Not press statements. Line items. That's what would settle this debate for me.",
//         timeAgo: "12h ago",
//         likes: 41,
//       },
//     ],
//   },
//   {
//     id: "t2",
//     title:
//       "Naira Freefall: Unification Was Right, But What Actually Fixes the Rate?",
//     category: "Currency",
//     preview:
//       "One window was textbook correct. But over a year later, the Naira is still searching for a floor. What's the missing piece — reserves, exports, or confidence?",
//     body: [
//       "The CBN collapsed the multiple exchange rate windows into a single market in mid-2023. The theory: end arbitrage, let price discovery work, attract dollar inflows.",
//       "The practice has been messier. The Naira slid from ~₦460/$ to over ₦1,500/$ at its worst before clawing back some ground. Volatility has been brutal for importers and long-term planners.",
//       "Some argue the fix is simply time — let exports grow, let confidence return, and the rate stabilises naturally. Others say the structural issues (low oil production, weak non-oil exports, thin reserves) are the actual constraint.",
//       "What do you think is the missing piece?",
//     ],
//     author: "Tunde A.",
//     postedAgo: "3d ago",
//     tags: ["naira", "fx", "cbn"],
//     likes: 218,
//     views: 3104,
//     comments: [
//       {
//         id: "t2-c1",
//         topicId: "t2",
//         author: "Emeka N.",
//         body: "You can't stabilise a currency by decree. You stabilise it by exporting more than you import. Full stop. The rate will find its floor when the trade balance does.",
//         timeAgo: "2d ago",
//         likes: 76,
//       },
//       {
//         id: "t2-c2",
//         topicId: "t2",
//         author: "Zainab I.",
//         body: "Also — confidence. Nobody wants to keep dollars in Nigeria if they think policy could reverse overnight. We need credible, boring, predictable policy for a decade.",
//         timeAgo: "1d ago",
//         likes: 93,
//       },
//       {
//         id: "t2-c3",
//         topicId: "t2",
//         author: "Segun O.",
//         body: "The real issue is oil production. We pump under 1.4m barrels/day vs the 2m we're capable of. That's billions in missing dollars every month.",
//         timeAgo: "20h ago",
//         likes: 58,
//       },
//     ],
//   },
//   {
//     id: "t3",
//     title: "10 Million Jobs — Realistic Target or Campaign Rhetoric?",
//     category: "Jobs",
//     preview:
//       "The administration keeps pointing at 10 million jobs as the endpoint of every reform. Where exactly do those jobs come from, sector by sector?",
//     body: [
//       "Ten million jobs. It's the number that shows up in almost every economic speech — the promised dividend of subsidy removal, FX reform, tax simplification, and infrastructure spending.",
//       "For context, Nigeria's total formal workforce is around 60 million. Adding 10 million in a single term would require roughly doubling the pace of formal job creation seen in any prior administration.",
//       "The administration's roadmap cites agro-processing, digital services, construction, the creative economy, and energy as core engines. Each is plausible in isolation, but the aggregate math is aggressive.",
//       "Is this a real plan with costed inputs, or a number designed to sound big? Let's discuss.",
//     ],
//     author: "Adaeze O.",
//     postedAgo: "1d ago",
//     tags: ["jobs", "employment", "reform"],
//     likes: 289,
//     views: 3822,
//     comments: [
//       {
//         id: "t3-c1",
//         topicId: "t3",
//         author: "Kelechi U.",
//         body: "If MSMEs get credit, if power stabilises, if ports work — 10m is not crazy over 4-6 years. But all three of those 'ifs' are doing enormous lifting.",
//         timeAgo: "20h ago",
//         likes: 71,
//       },
//       {
//         id: "t3-c2",
//         topicId: "t3",
//         author: "Folake B.",
//         body: "The creative economy alone could absorb millions. Nollywood, music, content creation, esports. But we need to formalise it, tax it sensibly, and export it.",
//         timeAgo: "16h ago",
//         likes: 55,
//       },
//       {
//         id: "t3-c3",
//         topicId: "t3",
//         author: "Yusuf D.",
//         body: "I'll believe it when I see county-by-county breakdowns with sector attribution. Until then it's a headline, not a plan.",
//         timeAgo: "8h ago",
//         likes: 89,
//       },
//     ],
//   },
//   {
//     id: "t4",
//     title: "Should Nigerians Abroad Get a Vote? Let's Actually Debate It.",
//     category: "Civic Rights",
//     preview:
//       "Over $20B in annual remittances. Zero ballots. If the diaspora is funding the country's growth, should they have a formal say in it?",
//     body: [
//       "Nigeria receives more than $20 billion in remittances every year — more than most sectors contribute to GDP. That money funds school fees, hospital bills, small businesses, and household survival across the country.",
//       "Yet Nigerians abroad cannot vote. They must physically return to cast a ballot, which is impractical for the vast majority.",
//       "Advocates argue that economic contribution without political voice is untenable. Critics counter that voting from abroad is logistically complex and opens doors to fraud.",
//       "The real question: is diaspora voting a logical extension of democratic rights, or a change that requires constitutional surgery that isn't ready yet?",
//     ],
//     author: "Chiamaka E.",
//     postedAgo: "4d ago",
//     tags: ["diaspora", "voting", "constitution"],
//     likes: 176,
//     views: 2418,
//     comments: [
//       {
//         id: "t4-c1",
//         topicId: "t4",
//         author: "Obinna K.",
//         body: "If I pay taxes when I visit, if I send money that builds schools and roads, then yes — I should have a say in who runs the place. That's not controversial to me.",
//         timeAgo: "3d ago",
//         likes: 92,
//       },
//       {
//         id: "t4-c2",
//         topicId: "t4",
//         author: "Halima S.",
//         body: "Logistics are hard, but 'hard' isn't 'impossible'. Ghana, Kenya, and others are moving on this. We can't keep saying it's too difficult forever.",
//         timeAgo: "2d ago",
//         likes: 61,
//       },
//       {
//         id: "t4-c3",
//         topicId: "t4",
//         author: "Bisi A.",
//         body: "The question I never see addressed: how do you verify residency? A lot of people abroad still vote in their home state. That's the real can of worms.",
//         timeAgo: "1d ago",
//         likes: 48,
//       },
//     ],
//   },
//   {
//     id: "t5",
//     title: "Student Loans: Has Anyone Actually Received One Yet?",
//     category: "Education",
//     preview:
//       "The scheme launched with fanfare. But between NELFUND delays, verification bottlenecks, and school-level confusion, how many students actually got money?",
//     body: [
//       "The Student Loan Scheme was meant to be one of the flagship wins of the reform era. Zero-interest loans for Nigerian students, funded by the state, disbursed via NELFUND.",
//       "The rollout has been slow. Verification bottlenecks, university-level confusion, and unclear eligibility rules have kept the actual number of beneficiaries smaller than the headline promised.",
//       "To be fair, this is a complex programme with genuine logistics to solve. But the gap between announcement and disbursement matters — students don't get to wait two years for their fees.",
//       "Has anyone here actually gotten a loan? Or know someone who has? Let's get real data.",
//     ],
//     author: "Emeka N.",
//     postedAgo: "18h ago",
//     tags: ["loans", "education", "youth"],
//     likes: 134,
//     views: 1955,
//     comments: [
//       {
//         id: "t5-c1",
//         topicId: "t5",
//         author: "Damilola O.",
//         body: "My cousin applied in October, got verified in January, and received the disbursement in February. So it works — but the queue is long and the process is slow.",
//         timeAgo: "12h ago",
//         likes: 44,
//       },
//       {
//         id: "t5-c2",
//         topicId: "t5",
//         author: "Nneka A.",
//         body: "The problem is that a lot of students don't even know they qualify or how to apply. Universities need to be actively pushing this, not waiting for students to figure it out.",
//         timeAgo: "8h ago",
//         likes: 37,
//       },
//     ],
//   },
//   {
//     id: "t6",
//     title: "The Power Sector After Devolution — Are States Delivering?",
//     category: "Infrastructure",
//     preview:
//       "The Electricity Act handed states the grid. Lagos and a few others are moving. But is this solving the problem, or just splitting it?",
//     body: [
//       "The Electricity Act 2023 was one of the most consequential legal changes in decades. It removed the federal monopoly on generation and distribution and handed control to states.",
//       "Lagos, Enugu, and a few others have moved fast — establishing their own electricity markets and encouraging embedded generation. Others are still figuring out the framework.",
//       "The upside: local accountability, tailored solutions, faster decisions. The downside: risk of a patchwork, uneven quality, and states that can't afford the transition falling further behind.",
//       "Is this the right structural answer, or a shift of the same problem to a new level of government?",
//     ],
//     author: "Moderator",
//     authorRole: "Admin",
//     postedAgo: "5d ago",
//     tags: ["power", "electricity", "states"],
//     likes: 201,
//     views: 2780,
//     hot: true,
//     comments: [
//       {
//         id: "t6-c1",
//         topicId: "t6",
//         author: "Gbenga T.",
//         body: "Lagos will win. That's the whole point of devolution — states that are serious will move, states that aren't will get left behind. That's accountability.",
//         timeAgo: "4d ago",
//         likes: 68,
//       },
//       {
//         id: "t6-c2",
//         topicId: "t6",
//         author: "Amina Y.",
//         body: "And what about states that can't afford it? They'll fall further behind. Federal support has to remain part of the picture, not disappear entirely.",
//         timeAgo: "3d ago",
//         likes: 79,
//       },
//       {
//         id: "t6-c3",
//         topicId: "t6",
//         author: "Uche I.",
//         body: "Bottom line: if I get 20 hours of power a day under a state government instead of 8 under the federal one, I don't care what level it comes from. Just deliver.",
//         timeAgo: "2d ago",
//         likes: 105,
//       },
//     ],
//   },
//   {
//     id: "t7",
//     title:
//       "Remittances vs Investments: What Should Returnees Actually Do With Their Money?",
//     category: "Diaspora",
//     preview:
//       "Sending money home is easy. Building something with it is hard. What are the honest tradeoffs between quick transfers and long-term stakes?",
//     body: [
//       "Every month, millions of Nigerians abroad send money home. Some goes to family support, some to school fees, some to hospital bills. It's a lifeline.",
//       "But the conversation has shifted. Should that money do more than support? Should it build equity, fund businesses, and create jobs?",
//       "The honest answer is: both. Family support remains essential and shouldn't be dismissed. But there's real room for structured investments that compound over decades.",
//       "The catch is that investment is hard — due diligence, fraud risk, currency risk, and the challenge of monitoring something from 6,000 miles away.",
//       "For those who've done both: what's the honest tradeoff? What worked? What would you never do again?",
//     ],
//     author: "Oluchi B.",
//     postedAgo: "2d ago",
//     tags: ["remittances", "investment", "diaspora"],
//     likes: 267,
//     views: 3401,
//     hot: true,
//     comments: [
//       {
//         id: "t7-c1",
//         topicId: "t7",
//         author: "Kunle A.",
//         body: "Family support is not optional. That's cultural and non-negotiable for most of us. But whatever's left over — invest it into things you can verify, in industries you understand.",
//         timeAgo: "1d ago",
//         likes: 84,
//       },
//       {
//         id: "t7-c2",
//         topicId: "t7",
//         author: "Rukayat O.",
//         body: "I built a small agro-processing business with a cousin on the ground. Structured, audited, quarterly reports. Not fancy, but it works. Never invest informally — get paperwork.",
//         timeAgo: "20h ago",
//         likes: 111,
//       },
//       {
//         id: "t7-c3",
//         topicId: "t7",
//         author: "Sadiq M.",
//         body: "The biggest barrier is trust. Until there's reliable legal recourse for cross-border investors, most people will keep sending cash to family instead of building assets. It's rational.",
//         timeAgo: "14h ago",
//         likes: 76,
//       },
//     ],
//   },
//   {
//     id: "t8",
//     title:
//       "Tax Reform: Genuine Relief or Repackaged Burden on the Middle Class?",
//     category: "Policy",
//     preview:
//       "The new tax code was sold as simplification. But did it lift the burden, or just move it around? The receipts are still coming in.",
//     body: [
//       "The tax reform package was one of the largest in recent memory. Levies consolidated, thresholds raised, digital filing mandated.",
//       "The pitch was simple: fewer, clearer taxes. Easier compliance. More businesses formalising because the cost of formality dropped.",
//       "The reality is more mixed. Some small businesses genuinely pay less. Others see new fees disguised as 'administrative charges'. The middle class still carries a large share of the actual revenue base.",
//       "Is this reform doing what it promised? Or is the middle class, as usual, footing the bill?",
//     ],
//     author: "Babatunde S.",
//     postedAgo: "3d ago",
//     tags: ["tax", "policy", "middle-class"],
//     likes: 145,
//     views: 1877,
//     comments: [
//       {
//         id: "t8-c1",
//         topicId: "t8",
//         author: "Ifeanyi N.",
//         body: "As a small business owner, I've seen the difference. The consolidation is real. But agencies still find ways to invent new fees. The law changes; the hustlers adapt.",
//         timeAgo: "2d ago",
//         likes: 62,
//       },
//       {
//         id: "t8-c2",
//         topicId: "t8",
//         author: "Yemi T.",
//         body: "Middle class always pays. Salaried, PAYE, no deductions, no dodges. The reform didn't touch that reality. If anything it made it more transparent, which stings more.",
//         timeAgo: "1d ago",
//         likes: 88,
//       },
//     ],
//   },
//   {
//     id: "t9",
//     title:
//       "Nollywood to Silicon Valley: Is Nigeria's Real Export Culture and Code?",
//     category: "Creative & Tech",
//     preview:
//       "Forget oil for a second. Nigerian music, film, and fintech are reaching global markets on their own steam. Should policy treat them as primary exports?",
//     body: [
//       "Nigerian music streams globally. Nollywood films stream on Netflix. Nigerian fintech companies operate across Africa and beyond. This is happening without the kind of state support that oil or agriculture receives.",
//       "The question is whether policy is treating these sectors as priorities, or still as side shows to the 'real' economy.",
//       "Some argue the culture and tech sectors are Nigeria's true comparative advantage in the 21st century — young, English-speaking, digitally native, globally connected.",
//       "Others point to infrastructural gaps: power, internet penetration, IP protection, and financing for creators.",
//       "Should Nigeria pivot to treat its cultural and tech exports as strategic national assets?",
//     ],
//     author: "Aisha M.",
//     postedAgo: "6d ago",
//     tags: ["nollywood", "tech", "exports"],
//     likes: 198,
//     views: 2562,
//     comments: [
//       {
//         id: "t9-c1",
//         topicId: "t9",
//         author: "Onyeka A.",
//         body: "Afrobeats is doing more for Nigeria's global image than any government PR could. It deserves the same policy weight as oil. Seriously.",
//         timeAgo: "5d ago",
//         likes: 119,
//       },
//       {
//         id: "t9-c2",
//         topicId: "t9",
//         author: "Musa I.",
//         body: "The problem is IP enforcement. You can't scale a creative industry if every film gets pirated within a week. Fix that and you'll unlock billions.",
//         timeAgo: "4d ago",
//         likes: 73,
//       },
//       {
//         id: "t9-c3",
//         topicId: "t9",
//         author: "Chinedu E.",
//         body: "Fintech is the stealth weapon. Nigerian-built products now serve millions across Africa. That's not culture, that's infrastructure — but it's Nigerian-made. Own that.",
//         timeAgo: "3d ago",
//         likes: 92,
//       },
//     ],
//   },
// ];

// /* ------------------------------------------------------------------ */
// /*  UTILITIES                                                          */
// /* ------------------------------------------------------------------ */

// function formatNumber(n: number) {
//   return n.toLocaleString("en-US");
// }

// function initials(name: string) {
//   const parts = name.trim().split(/\s+/);
//   return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
// }

// function timeAgoFromTs(ts: number): string {
//   const diff = Math.max(0, Date.now() - ts);
//   const mins = Math.floor(diff / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins}m ago`;
//   const hours = Math.floor(mins / 60);
//   if (hours < 24) return `${hours}h ago`;
//   const days = Math.floor(hours / 24);
//   if (days < 30) return `${days}d ago`;
//   const months = Math.floor(days / 30);
//   return `${months}mo ago`;
// }

// /* ------------------------------------------------------------------ */
// /*  IDENTITY MODAL                                                     */
// /* ------------------------------------------------------------------ */

// function IdentityModal({
//   open,
//   onClose,
//   onSubmit,
//   pendingAction,
// }: {
//   open: boolean;
//   onClose: () => void;
//   onSubmit: (name: string, email: string) => void;
//   pendingAction?: string;
// }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (open) setTimeout(() => inputRef.current?.focus(), 250);
//     else {
//       setError(null);
//     }
//   }, [open]);

//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [onClose]);

//   const submit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const trimmed = name.trim().replace(/\s+/g, " ");
//     if (trimmed.length < 2) return setError("Please enter your name.");
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
//       return setError("Please enter a valid email address.");
//     setError(null);
//     onSubmit(trimmed, email.trim());
//   };

//   return (
//     <AnimatePresence>
//       {open && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
//         >
//           <div
//             onClick={onClose}
//             className="absolute inset-0 bg-black/60 backdrop-blur-md"
//           />
//           <motion.div
//             initial={{ y: 60, opacity: 0, scale: 0.97 }}
//             animate={{ y: 0, opacity: 1, scale: 1 }}
//             exit={{ y: 40, opacity: 0, scale: 0.97 }}
//             transition={{ type: "spring", stiffness: 260, damping: 26 }}
//             className={`relative w-full max-w-md bg-white rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden ${openSans.className}`}
//           >
//             <button
//               onClick={onClose}
//               aria-label="Close"
//               className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors z-10"
//             >
//               <X size={16} />
//             </button>

//             <div className="p-6 sm:p-8">
//               <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
//                 <PenLine size={12} />
//                 Join the Conversation
//               </span>
//               <h3
//                 className={`${blackOpsOne.className} text-2xl sm:text-3xl uppercase leading-tight text-gray-900 mb-2`}
//               >
//                 Introduce Yourself
//               </h3>
//               <p className="text-sm text-gray-500 font-light mb-6">
//                 {pendingAction
//                   ? `Just your name and email to ${pendingAction}. One time only — saved on this device.`
//                   : "Just your name and email. One time only — saved on this device."}
//               </p>

//               <form onSubmit={submit} className="space-y-4">
//                 <div>
//                   <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">
//                     Display Name
//                   </label>
//                   <input
//                     ref={inputRef}
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="e.g. Adaeze O."
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900 font-medium"
//                     maxLength={32}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="you@example.com"
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900 font-medium"
//                     maxLength={64}
//                   />
//                 </div>
//                 {error && (
//                   <motion.p
//                     initial={{ opacity: 0, y: -4 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="text-sm text-red-600 font-medium"
//                   >
//                     {error}
//                   </motion.p>
//                 )}
//                 <button
//                   type="submit"
//                   className="w-full mt-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_10px_30px_-8px_rgba(16,185,129,0.6)] transition-all active:scale-[0.98]"
//                 >
//                   <Check size={16} />
//                   Continue
//                 </button>
//                 <p className="text-[11px] text-gray-400 text-center pt-1">
//                   Stored only in your browser. Never sent anywhere.
//                 </p>
//               </form>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  TOPIC CARD                                                         */
// /* ------------------------------------------------------------------ */

// function TopicCard({
//   topic,
//   liked,
//   onOpen,
//   onLike,
//   index,
//   reduceMotion,
// }: {
//   topic: Topic;
//   liked: boolean;
//   onOpen: () => void;
//   onLike: (e: React.MouseEvent) => void;
//   index: number;
//   reduceMotion: boolean;
// }) {
//   const totalComments = topic.comments.length;

//   return (
//     <motion.article
//       initial={
//         reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(6px)" }
//       }
//       whileInView={
//         reduceMotion ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }
//       }
//       viewport={{ once: true, margin: "-40px" }}
//       transition={{
//         duration: 0.5,
//         delay: Math.min(index * 0.05, 0.5),
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       whileHover={{ y: -4 }}
//       className={`group relative flex flex-col rounded-3xl border bg-white transition-all duration-300 cursor-pointer overflow-hidden ${
//         topic.pinned
//           ? "border-amber-300/80 shadow-[0_10px_30px_-12px_rgba(245,158,11,0.25)] hover:shadow-[0_20px_50px_-15px_rgba(245,158,11,0.35)]"
//           : "border-gray-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_-15px_rgba(16,185,129,0.25)] hover:border-emerald-400/60"
//       }`}
//       onClick={onOpen}
//     >
//       {/* Top strip */}
//       <div className="flex items-center justify-between gap-2 px-5 sm:px-6 pt-5">
//         <div className="flex items-center gap-2 min-w-0">
//           <span
//             className={`text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full whitespace-nowrap ${
//               topic.pinned
//                 ? "bg-amber-100 text-amber-800 border border-amber-200"
//                 : "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
//             }`}
//           >
//             {topic.category}
//           </span>
//           {topic.pinned && (
//             <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
//               <Pin size={11} strokeWidth={2.5} />
//               Pinned
//             </span>
//           )}
//           {topic.hot && !topic.pinned && (
//             <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red-600">
//               <Flame size={11} strokeWidth={2.5} />
//               Hot
//             </span>
//           )}
//         </div>
//         <div className="flex items-center gap-1 text-[10px] font-semibold text-gray-400 whitespace-nowrap">
//           <Clock size={11} />
//           {topic.postedAgo}
//         </div>
//       </div>

//       {/* Title */}
//       <div className="px-5 sm:px-6 pt-4">
//         <h3
//           className={`${blackOpsOne.className} text-lg sm:text-xl uppercase leading-tight tracking-wide text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-3`}
//         >
//           {topic.title}
//         </h3>
//       </div>

//       {/* Preview */}
//       <div className="px-5 sm:px-6 pt-3 pb-5 flex-1">
//         <p className="text-sm text-gray-600 leading-relaxed font-light line-clamp-3">
//           {topic.preview}
//         </p>
//       </div>

//       {/* Tags */}
//       {topic.tags.length > 0 && (
//         <div className="px-5 sm:px-6 pb-4 flex flex-wrap gap-1.5">
//           {topic.tags.slice(0, 3).map((t) => (
//             <span
//               key={t}
//               className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"
//             >
//               #{t}
//             </span>
//           ))}
//         </div>
//       )}

//       {/* Bottom bar */}
//       <div className="flex items-center justify-between gap-2 px-5 sm:px-6 py-4 border-t border-gray-100 bg-gray-50/60">
//         <div className="flex items-center gap-3 text-[11px] font-semibold text-gray-500">
//           <button
//             onClick={onLike}
//             className={`inline-flex items-center gap-1 transition-colors ${
//               liked ? "text-red-500" : "hover:text-red-500"
//             }`}
//             aria-label="Like topic"
//           >
//             <Heart
//               size={13}
//               fill={liked ? "currentColor" : "none"}
//               strokeWidth={2.5}
//             />
//             {formatNumber(topic.likes + (liked ? 1 : 0))}
//           </button>
//           <span className="inline-flex items-center gap-1">
//             <MessageSquare size={13} strokeWidth={2.5} />
//             {totalComments}
//           </span>
//         </div>
//         <div className="flex items-center gap-2 min-w-0">
//           <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center shrink-0">
//             {initials(topic.author)}
//           </div>
//           <span className="text-[11px] font-semibold text-gray-600 truncate max-w-[110px]">
//             {topic.author}
//           </span>
//         </div>
//       </div>

//       {/* Hover arrow */}
//       <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-emerald-700 group-hover:border-emerald-400 transition-all pointer-events-none">
//         <ArrowUpRight size={14} />
//       </div>
//     </motion.article>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  COMMENT ITEM                                                       */
// /* ------------------------------------------------------------------ */

// function CommentItem({
//   comment,
//   liked,
//   onLike,
// }: {
//   comment: Comment;
//   liked: boolean;
//   onLike: () => void;
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 12 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
//       className={`flex gap-3 sm:gap-4 ${
//         comment.isUser
//           ? "bg-emerald-50/40 -mx-3 px-3 sm:-mx-4 sm:px-4 py-4 rounded-2xl"
//           : ""
//       }`}
//     >
//       <div
//         className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
//           comment.isUser
//             ? "bg-emerald-600 text-white"
//             : "bg-gray-100 text-gray-700"
//         }`}
//       >
//         {initials(comment.author)}
//       </div>
//       <div className="min-w-0 flex-1">
//         <div className="flex items-center flex-wrap gap-2 mb-1">
//           <span className="text-sm font-bold text-gray-900">
//             {comment.author}
//           </span>
//           {comment.isUser && (
//             <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
//               You
//             </span>
//           )}
//           {comment.isOP && (
//             <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
//               OP
//             </span>
//           )}
//           <span className="text-[11px] text-gray-400 font-medium">
//             · {comment.timeAgo}
//           </span>
//         </div>
//         <p className="text-sm text-gray-700 leading-relaxed font-light">
//           {comment.body}
//         </p>
//         <div className="mt-2 flex items-center gap-3">
//           <button
//             onClick={onLike}
//             className={`inline-flex items-center gap-1 text-[11px] font-semibold transition-colors ${
//               liked ? "text-red-500" : "text-gray-400 hover:text-red-500"
//             }`}
//           >
//             <Heart
//               size={12}
//               fill={liked ? "currentColor" : "none"}
//               strokeWidth={2.5}
//             />
//             {comment.likes + (liked ? 1 : 0)}
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  TOPIC DETAIL VIEW                                                  */
// /* ------------------------------------------------------------------ */

// function TopicDetail({
//   topic,
//   liked,
//   likedComments,
//   identity,
//   onBack,
//   onLike,
//   onLikeComment,
//   onComment,
//   onShare,
//   reduceMotion,
// }: {
//   topic: Topic;
//   liked: boolean;
//   likedComments: string[];
//   identity: UserIdentity | null;
//   onBack: () => void;
//   onLike: () => void;
//   onLikeComment: (id: string) => void;
//   onComment: (body: string) => void;
//   onShare: (channel: "whatsapp" | "x" | "facebook" | "copy") => void;
//   reduceMotion: boolean;
// }) {
//   const [draft, setDraft] = useState("");
//   const [copied, setCopied] = useState(false);
//   const [shareOpen, setShareOpen] = useState(false);
//   const commentsEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "auto" });
//   }, [topic.id]);

//   const submitComment = (e: React.FormEvent) => {
//     e.preventDefault();
//     const trimmed = draft.trim();
//     if (trimmed.length < 2) return;
//     onComment(trimmed);
//     setDraft("");
//     setTimeout(
//       () =>
//         commentsEndRef.current?.scrollIntoView({
//           behavior: "smooth",
//           block: "end",
//         }),
//       100,
//     );
//   };

//   const handleCopy = async () => {
//     await onShare("copy");
//     setCopied(true);
//     setTimeout(() => setCopied(false), 1800);
//   };

//   return (
//     <main
//       className={`min-h-screen bg-gradient-to-b from-white via-[#fafcfb] to-white ${openSans.className}`}
//     >
//       <div className="relative max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-20">
//         {/* Top bar */}
//         <div className="flex items-center justify-between gap-4 mb-8">
//           <button
//             onClick={onBack}
//             className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-800 bg-white border border-emerald-200 px-4 py-2.5 rounded-full hover:bg-emerald-50 hover:border-emerald-300 transition-all shadow-sm"
//           >
//             <ArrowLeft size={14} />
//             <span>Back to Forum</span>
//           </button>

//           <button
//             onClick={() => setShareOpen((v) => !v)}
//             className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-700 bg-white border border-gray-200 px-4 py-2.5 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
//           >
//             <Share2 size={14} />
//             <span>Share</span>
//           </button>
//         </div>

//         {/* Share dropdown */}
//         <AnimatePresence>
//           {shareOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -8 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -8 }}
//               className="absolute right-4 sm:right-12 z-30 mt-[-12px] bg-white rounded-2xl border border-gray-200 shadow-xl p-2 flex gap-1.5"
//             >
//               <button
//                 onClick={() => onShare("whatsapp")}
//                 className="w-10 h-10 rounded-xl bg-[#25D366] hover:bg-[#1eb856] text-white flex items-center justify-center transition-all"
//                 aria-label="Share on WhatsApp"
//               >
//                 <WhatsAppIcon size={17} />
//               </button>
//               <button
//                 onClick={() => onShare("x")}
//                 className="w-10 h-10 rounded-xl bg-black hover:bg-gray-800 text-white flex items-center justify-center transition-all"
//                 aria-label="Share on X"
//               >
//                 <XIcon size={15} />
//               </button>
//               <button
//                 onClick={() => onShare("facebook")}
//                 className="w-10 h-10 rounded-xl bg-[#1877F2] hover:bg-[#0f65d1] text-white flex items-center justify-center transition-all"
//                 aria-label="Share on Facebook"
//               >
//                 <FacebookIcon size={17} />
//               </button>
//               <button
//                 onClick={handleCopy}
//                 className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-all"
//                 aria-label="Copy link"
//               >
//                 {copied ? <Check size={16} /> : <Share2 size={16} />}
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Topic header */}
//         <div className="mb-8">
//           <div className="flex flex-wrap items-center gap-2 mb-4">
//             <span
//               className={`text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full ${
//                 topic.pinned
//                   ? "bg-amber-100 text-amber-800 border border-amber-200"
//                   : "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
//               }`}
//             >
//               {topic.category}
//             </span>
//             {topic.hot && (
//               <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200/60 px-2.5 py-1 rounded-full">
//                 <Flame size={11} strokeWidth={2.5} />
//                 Hot
//               </span>
//             )}
//             <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-400 ml-auto">
//               <Clock size={12} />
//               {topic.postedAgo}
//             </span>
//           </div>

//           <h1
//             className={`${blackOpsOne.className} text-3xl sm:text-5xl uppercase leading-[1.05] tracking-wide text-gray-900 mb-5`}
//           >
//             {topic.title}
//           </h1>

//           {/* Author row */}
//           <div className="flex items-center gap-3">
//             <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold flex items-center justify-center">
//               {initials(topic.author)}
//             </div>
//             <div>
//               <div className="text-sm font-bold text-gray-900 flex items-center gap-2">
//                 {topic.author}
//                 {topic.authorRole && (
//                   <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
//                     {topic.authorRole}
//                   </span>
//                 )}
//               </div>
//               <div className="text-[11px] text-gray-500 font-medium mt-0.5">
//                 {formatNumber(topic.views)} views ·{" "}
//                 {formatNumber(topic.likes + (liked ? 1 : 0))} likes
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Body */}
//         <div className="space-y-5 text-gray-700 text-base sm:text-lg leading-[1.8] font-light mb-8">
//           {topic.body.map((p, i) => (
//             <p key={i}>{p}</p>
//           ))}
//         </div>

//         {/* Tags */}
//         {topic.tags.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-8">
//             {topic.tags.map((t) => (
//               <span
//                 key={t}
//                 className="text-[11px] font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
//               >
//                 #{t}
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Action bar */}
//         <div className="flex items-center gap-3 py-5 border-y border-gray-100 mb-10">
//           <button
//             onClick={onLike}
//             className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all ${
//               liked
//                 ? "bg-red-50 text-red-600 border border-red-200"
//                 : "bg-gray-50 hover:bg-red-50 hover:text-red-600 text-gray-700 border border-gray-200 hover:border-red-200"
//             }`}
//           >
//             <Heart
//               size={16}
//               fill={liked ? "currentColor" : "none"}
//               strokeWidth={2.5}
//             />
//             {liked ? "Liked" : "Like"} ·{" "}
//             {formatNumber(topic.likes + (liked ? 1 : 0))}
//           </button>
//           <button
//             onClick={() =>
//               document
//                 .getElementById("comments")
//                 ?.scrollIntoView({ behavior: "smooth", block: "start" })
//             }
//             className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 text-gray-700 border border-gray-200 hover:border-emerald-200 transition-all"
//           >
//             <MessageSquare size={16} strokeWidth={2.5} />
//             Weigh In · {topic.comments.length}
//           </button>
//         </div>

//         {/* Comments */}
//         <section id="comments" className="scroll-mt-6">
//           <div className="flex items-center gap-3 mb-6">
//             <h2
//               className={`${blackOpsOne.className} text-xl sm:text-2xl uppercase tracking-wide text-gray-900`}
//             >
//               Your Take
//             </h2>
//             <span className="h-px flex-1 bg-gray-200" />
//             <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
//               {topic.comments.length}{" "}
//               {topic.comments.length === 1 ? "voice" : "voices"}
//             </span>
//           </div>

//           {/* Comment composer */}
//           <form
//             onSubmit={submitComment}
//             className="mb-8 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.08)] focus-within:border-emerald-400 focus-within:shadow-[0_12px_32px_-12px_rgba(16,185,129,0.25)] transition-all"
//           >
//             <div className="flex gap-3">
//               <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0">
//                 {identity ? initials(identity.name) : "?"}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <textarea
//                   value={draft}
//                   onChange={(e) => setDraft(e.target.value)}
//                   placeholder="Add your take on this…"
//                   rows={3}
//                   maxLength={600}
//                   className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-sm sm:text-base leading-relaxed resize-none font-light"
//                 />
//                 <div className="flex items-center justify-between pt-2 border-t border-gray-100">
//                   <span className="text-[10px] font-medium text-gray-400">
//                     {draft.length}/600
//                   </span>
//                   <button
//                     type="submit"
//                     disabled={draft.trim().length < 2}
//                     className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 text-white text-[11px] font-bold uppercase tracking-wider transition-all active:scale-[0.97]"
//                   >
//                     <Send size={12} strokeWidth={2.5} />
//                     Post
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </form>

//           {/* Comment list */}
//           {topic.comments.length === 0 ? (
//             <div className="text-center py-12 rounded-2xl border border-dashed border-gray-200">
//               <MessageSquare
//                 size={28}
//                 className="mx-auto text-gray-300 mb-3"
//                 strokeWidth={1.5}
//               />
//               <p className="text-sm text-gray-500 font-medium">
//                 No one has weighed in yet.
//               </p>
//               <p className="text-xs text-gray-400 mt-1">
//                 Be the first to share your take.
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-5 sm:space-y-6">
//               {topic.comments.map((c) => (
//                 <CommentItem
//                   key={c.id}
//                   comment={c}
//                   liked={likedComments.includes(c.id)}
//                   onLike={() => onLikeComment(c.id)}
//                 />
//               ))}
//               <div ref={commentsEndRef} />
//             </div>
//           )}
//         </section>

//         {/* Footer back link */}
//         <div className="mt-16 pt-8 border-t border-gray-200 flex justify-center">
//           <button
//             onClick={onBack}
//             className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-emerald-700 transition-colors"
//           >
//             <ArrowLeft size={13} />
//             Back to all topics
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  NEW TOPIC MODAL                                                    */
// /* ------------------------------------------------------------------ */

// function NewTopicModal({
//   open,
//   onClose,
//   onSubmit,
// }: {
//   open: boolean;
//   onClose: () => void;
//   onSubmit: (data: { title: string; category: string; body: string }) => void;
// }) {
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("General");
//   const [body, setBody] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const titleRef = useRef<HTMLInputElement>(null);

//   const categories = [
//     "General",
//     "Economy",
//     "Currency",
//     "Jobs",
//     "Civic Rights",
//     "Education",
//     "Infrastructure",
//     "Diaspora",
//     "Policy",
//     "Creative & Tech",
//   ];

//   useEffect(() => {
//     if (open) {
//       setTimeout(() => titleRef.current?.focus(), 250);
//     } else {
//       setTitle("");
//       setBody("");
//       setCategory("General");
//       setError(null);
//     }
//   }, [open]);

//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [onClose]);

//   const submit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (title.trim().length < 8)
//       return setError("Give your topic a clear title (8+ characters).");
//     if (body.trim().length < 20)
//       return setError("Add at least a sentence or two of context.");
//     setError(null);
//     onSubmit({
//       title: title.trim(),
//       category,
//       body: body.trim(),
//     });
//   };

//   return (
//     <AnimatePresence>
//       {open && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
//         >
//           <div
//             onClick={onClose}
//             className="absolute inset-0 bg-black/60 backdrop-blur-md"
//           />
//           <motion.div
//             initial={{ y: 60, opacity: 0, scale: 0.97 }}
//             animate={{ y: 0, opacity: 1, scale: 1 }}
//             exit={{ y: 40, opacity: 0, scale: 0.97 }}
//             transition={{ type: "spring", stiffness: 260, damping: 26 }}
//             className={`relative w-full max-w-lg bg-white rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto ${openSans.className}`}
//           >
//             <button
//               onClick={onClose}
//               aria-label="Close"
//               className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors z-10"
//             >
//               <X size={16} />
//             </button>

//             <div className="p-6 sm:p-8">
//               <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
//                 <PenLine size={12} />
//                 New Topic
//               </span>
//               <h3
//                 className={`${blackOpsOne.className} text-2xl sm:text-3xl uppercase leading-tight text-gray-900 mb-2`}
//               >
//                 Start the Discussion
//               </h3>
//               <p className="text-sm text-gray-500 font-light mb-6">
//                 Post a hot take or a genuine question. Keep it civil — no
//                 personal attacks.
//               </p>

//               <form onSubmit={submit} className="space-y-4">
//                 <div>
//                   <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">
//                     Title
//                   </label>
//                   <input
//                     ref={titleRef}
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     placeholder="What's your take?"
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900 font-medium"
//                     maxLength={110}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">
//                     Category
//                   </label>
//                   <select
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900 font-medium"
//                   >
//                     {categories.map((c) => (
//                       <option key={c} value={c}>
//                         {c}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">
//                     Your Take
//                   </label>
//                   <textarea
//                     value={body}
//                     onChange={(e) => setBody(e.target.value)}
//                     placeholder="Give context. What's the position? What's the question?"
//                     rows={5}
//                     maxLength={1200}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900 font-medium resize-none"
//                   />
//                   <div className="text-right text-[10px] text-gray-400 font-medium mt-1">
//                     {body.length}/1200
//                   </div>
//                 </div>

//                 {error && (
//                   <motion.p
//                     initial={{ opacity: 0, y: -4 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="text-sm text-red-600 font-medium"
//                   >
//                     {error}
//                   </motion.p>
//                 )}

//                 <button
//                   type="submit"
//                   className="w-full mt-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_10px_30px_-8px_rgba(16,185,129,0.6)] transition-all active:scale-[0.98]"
//                 >
//                   <Send size={15} strokeWidth={2.5} />
//                   Post Topic
//                 </button>
//               </form>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  MAIN FORUM                                                         */
// /* ------------------------------------------------------------------ */

// type View = { kind: "grid" } | { kind: "detail"; topicId: string };

// export default function Forum() {
//   const reduceMotion = useReducedMotion() ?? false;

//   const [view, setView] = useState<View>({ kind: "grid" });
//   const [state, setState] = useState<PersistedState>(emptyState);
//   const [identity, setIdentity] = useState<UserIdentity | null>(null);
//   const [hydrated, setHydrated] = useState(false);

//   const [identityModalOpen, setIdentityModalOpen] = useState(false);
//   const [pendingAction, setPendingAction] = useState<string>("");
//   const [newTopicOpen, setNewTopicOpen] = useState(false);
//   const [filter, setFilter] = useState<string>("All");

//   /* Load from storage on mount */
//   useEffect(() => {
//     setState(loadState());
//     setIdentity(loadIdentity());
//     setHydrated(true);
//   }, []);

//   /* Persist state changes */
//   useEffect(() => {
//     if (hydrated) saveState(state);
//   }, [state, hydrated]);

//   /* Merge seeds + user topics */
//   const topics = useMemo(() => {
//     const merged = [...state.userTopics, ...SEED_TOPICS];
//     return merged.map((t) => {
//       const userComments = state.userComments[t.id] ?? [];
//       return { ...t, comments: [...userComments, ...t.comments] };
//     });
//   }, [state.userTopics, state.userComments]);

//   /* Categories for filter */
//   const categories = useMemo(() => {
//     const set = new Set<string>();
//     topics.forEach((t) => set.add(t.category));
//     return ["All", ...Array.from(set)];
//   }, [topics]);

//   const filteredTopics = useMemo(() => {
//     if (filter === "All") return topics;
//     return topics.filter((t) => t.category === filter);
//   }, [topics, filter]);

//   /* Stats */
//   const stats = useMemo(() => {
//     const totalLikes = topics.reduce((s, t) => s + t.likes, 0);
//     const totalComments = topics.reduce((s, t) => s + t.comments.length, 0);
//     return {
//       topics: topics.length,
//       votes: totalLikes + state.likedTopics.length,
//       comments: totalComments,
//     };
//   }, [topics, state.likedTopics]);

//   /* Identity gate */
//   const requireIdentity = (action: string): boolean => {
//     if (identity) return true;
//     setPendingAction(action);
//     setIdentityModalOpen(true);
//     return false;
//   };

//   const handleIdentitySubmit = (name: string, email: string) => {
//     const id = { name, email };
//     setIdentity(id);
//     saveIdentity(id);
//     setIdentityModalOpen(false);
//   };

//   /* Actions */
//   const toggleTopicLike = (topicId: string) => {
//     if (!requireIdentity("like this topic")) return;
//     setState((s) => ({
//       ...s,
//       likedTopics: s.likedTopics.includes(topicId)
//         ? s.likedTopics.filter((id) => id !== topicId)
//         : [...s.likedTopics, topicId],
//     }));
//   };

//   const toggleCommentLike = (commentId: string) => {
//     if (!requireIdentity("like this comment")) return;
//     setState((s) => ({
//       ...s,
//       likedComments: s.likedComments.includes(commentId)
//         ? s.likedComments.filter((id) => id !== commentId)
//         : [...s.likedComments, commentId],
//     }));
//   };

//   const addComment = (topicId: string, body: string) => {
//     if (!identity) return;
//     const comment: Comment = {
//       id: `uc-${Date.now()}`,
//       topicId,
//       author: identity.name,
//       body,
//       timeAgo: timeAgoFromTs(Date.now()),
//       likes: 0,
//       isUser: true,
//     };
//     setState((s) => ({
//       ...s,
//       userComments: {
//         ...s.userComments,
//         [topicId]: [...(s.userComments[topicId] ?? []), comment],
//       },
//     }));
//   };

//   const addTopic = (data: {
//     title: string;
//     category: string;
//     body: string;
//   }) => {
//     if (!identity) return;
//     const newTopic: Topic = {
//       id: `ut-${Date.now()}`,
//       title: data.title,
//       category: data.category,
//       preview: data.body.slice(0, 180) + (data.body.length > 180 ? "…" : ""),
//       body: data.body.split(/\n\n+/).filter(Boolean),
//       author: identity.name,
//       postedAgo: "just now",
//       tags: [],
//       likes: 0,
//       views: 0,
//       comments: [],
//       isUser: true,
//     };
//     setState((s) => ({ ...s, userTopics: [newTopic, ...s.userTopics] }));
//     setNewTopicOpen(false);
//     setView({ kind: "detail", topicId: newTopic.id });
//   };

//   const shareTopic = async (
//     topic: Topic,
//     channel: "whatsapp" | "x" | "facebook" | "copy",
//   ) => {
//     const url =
//       typeof window !== "undefined"
//         ? `${window.location.origin}${window.location.pathname}#${topic.id}`
//         : "";
//     const text = `"${topic.title}" — join the conversation on the forum.`;
//     const eT = encodeURIComponent(text);
//     const eU = encodeURIComponent(url);

//     if (channel === "copy") {
//       try {
//         await navigator.clipboard.writeText(`${text} ${url}`);
//       } catch {}
//       return;
//     }

//     const target =
//       channel === "whatsapp"
//         ? `https://wa.me/?text=${eT}%20${eU}`
//         : channel === "x"
//           ? `https://twitter.com/intent/tweet?text=${eT}&url=${eU}`
//           : `https://www.facebook.com/sharer/sharer.php?u=${eU}`;
//     window.open(target, "_blank", "noopener,noreferrer");
//   };

//   /* --- Detail view --- */
//   if (view.kind === "detail") {
//     const topic = topics.find((t) => t.id === view.topicId);
//     if (!topic) {
//       setView({ kind: "grid" });
//       return null;
//     }
//     return (
//       <>
//         <TopicDetail
//           topic={topic}
//           liked={state.likedTopics.includes(topic.id)}
//           likedComments={state.likedComments}
//           identity={identity}
//           onBack={() => setView({ kind: "grid" })}
//           onLike={() => toggleTopicLike(topic.id)}
//           onLikeComment={toggleCommentLike}
//           onComment={(body) => {
//             if (!requireIdentity("weigh in")) return;
//             addComment(topic.id, body);
//           }}
//           onShare={(channel) => shareTopic(topic, channel)}
//           reduceMotion={reduceMotion}
//         />
//         <IdentityModal
//           open={identityModalOpen}
//           onClose={() => setIdentityModalOpen(false)}
//           onSubmit={handleIdentitySubmit}
//           pendingAction={pendingAction}
//         />
//       </>
//     );
//   }

//   /* --- Grid view --- */
//   return (
//     <section
//       className={`relative py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-20 bg-gradient-to-b from-white via-[#f6faf7] to-white overflow-hidden ${openSans.className}`}
//     >
//       <div className="absolute top-0 right-1/4 w-[500px] sm:w-[700px] h-[300px] sm:h-[400px] bg-emerald-500/[0.06] blur-[120px] rounded-full pointer-events-none" />
//       <div className="absolute bottom-0 left-1/4 w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] bg-amber-400/[0.05] blur-[120px] rounded-full pointer-events-none" />
//       <div
//         className="absolute inset-0 opacity-[0.3] pointer-events-none"
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
//           backgroundSize: "80px 80px",
//         }}
//       />

//       <div className="relative max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14 border-b border-gray-200 pb-6 sm:pb-8">
//           <div>
//             <motion.span
//               initial={{ opacity: 0, y: 10 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//               className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase mb-4 shadow-sm"
//             >
//               <MessageSquare size={12} />
//               Open Forum
//             </motion.span>
//             <h2
//               className={`${blackOpsOne.className} text-3xl sm:text-5xl lg:text-6xl uppercase leading-[1.05] tracking-wide text-gray-900`}
//             >
//               Hot Takes <span className="text-emerald-600">& Debates</span>
//             </h2>
//           </div>
//           <div className="flex flex-col items-start lg:items-end gap-4 max-w-md">
//             <p className="text-gray-600 text-sm sm:text-base font-normal lg:text-right">
//               Real opinions on what&apos;s actually happening. Weigh in on any
//               topic — your name and comments are saved on this device.
//             </p>
//             <button
//               onClick={() => {
//                 if (!requireIdentity("post a topic")) return;
//                 setNewTopicOpen(true);
//               }}
//               className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-[0_12px_28px_-10px_rgba(16,185,129,0.6)] transition-all active:scale-[0.97]"
//             >
//               <PenLine size={14} />
//               Start a Topic
//             </button>
//           </div>
//         </div>

//         {/* Stats strip */}
//         <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-12">
//           {[
//             { label: "Topics", value: stats.topics },
//             { label: "Voices", value: stats.comments },
//             { label: "Votes", value: stats.votes },
//           ].map((s, i) => (
//             <motion.div
//               key={s.label}
//               initial={{ opacity: 0, y: 12 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.4, delay: i * 0.06 }}
//               className="rounded-2xl border border-gray-200/80 bg-white/70 backdrop-blur-sm px-4 py-4 text-center shadow-[0_8px_24px_-16px_rgba(0,0,0,0.15)]"
//             >
//               <div
//                 className={`${blackOpsOne.className} text-2xl sm:text-3xl text-gray-900`}
//               >
//                 {formatNumber(s.value)}
//               </div>
//               <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 mt-1">
//                 {s.label}
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Category filters */}
//         <div className="flex items-center gap-2 mb-6 sm:mb-8 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
//           {categories.map((c) => (
//             <button
//               key={c}
//               onClick={() => setFilter(c)}
//               className={`shrink-0 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
//                 filter === c
//                   ? "bg-emerald-600 text-white shadow-[0_8px_20px_-8px_rgba(16,185,129,0.6)]"
//                   : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-700"
//               }`}
//             >
//               {c}
//             </button>
//           ))}
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
//           {filteredTopics.map((topic, i) => (
//             <TopicCard
//               key={topic.id}
//               topic={topic}
//               index={i}
//               liked={state.likedTopics.includes(topic.id)}
//               onOpen={() => {
//                 setView({ kind: "detail", topicId: topic.id });
//                 window.scrollTo({ top: 0, behavior: "smooth" });
//               }}
//               onLike={(e) => {
//                 e.stopPropagation();
//                 toggleTopicLike(topic.id);
//               }}
//               reduceMotion={reduceMotion}
//             />
//           ))}
//         </div>

//         {filteredTopics.length === 0 && (
//           <div className="text-center py-16 rounded-2xl border border-dashed border-gray-200">
//             <MessageSquare
//               size={32}
//               className="mx-auto text-gray-300 mb-3"
//               strokeWidth={1.5}
//             />
//             <p className="text-sm text-gray-500 font-medium">
//               No topics in this category yet.
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Modals */}
//       <IdentityModal
//         open={identityModalOpen}
//         onClose={() => setIdentityModalOpen(false)}
//         onSubmit={handleIdentitySubmit}
//         pendingAction={pendingAction}
//       />
//       <NewTopicModal
//         open={newTopicOpen}
//         onClose={() => setNewTopicOpen(false)}
//         onSubmit={addTopic}
//       />
//     </section>
//   );
// }
