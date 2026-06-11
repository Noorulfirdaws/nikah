import { useState } from 'react'
import PageHero from '../components/PageHero'
import Modal from '../components/Modal'
import { Clock, User, Tag, ChevronRight, BookOpen } from 'lucide-react'
import { isValidEmail, LIMITS } from '../lib/security'

// ─── Types ────────────────────────────────────────────────────────────────────
// Each section holds a `content` array.
// • string  → rendered as a <p> paragraph
// • string[] → rendered as a <ul> bullet list
// This allows interleaving paragraphs and bullets without duplicate object keys.

interface ArticleSection {
  heading?: string
  content: (string | string[])[]
  quote?: string
  quoteSource?: string
}

interface Post {
  id: number
  category: string
  title: string
  excerpt: string
  author: string
  authorRole: string
  date: string
  readTime: string
  color: string
  initials: string
  article: ArticleSection[]
}

// ─── Full Articles ─────────────────────────────────────────────────────────────

const POSTS: Post[] = [
  // ── 1 ────────────────────────────────────────────────────────────────────────
  {
    id: 1,
    category: 'Islamic Marriage',
    title: 'The Prophetic Model of Marriage: What It Means for Modern Muslims',
    excerpt: "Looking at how the Prophet ﷺ approached marriage, partnership, and choosing a spouse — and what those lessons mean for Muslims navigating a digital age.",
    author: 'Sheikh Yusuf Al-Rashid',
    authorRole: 'Islamic Scholar & Marriage Counsellor',
    date: 'June 3, 2025',
    readTime: '7 min',
    color: '#1a6b4a',
    initials: 'YR',
    article: [
      {
        content: [
          "In an age of swipe culture, dating apps, and shifting definitions of partnership, Muslim singles navigating the path to marriage often find themselves caught between two worlds. On one side is the rich Islamic tradition of nikah — purposeful, family-anchored, and spiritually grounded. On the other is a modern landscape where meeting a potential spouse increasingly begins with a profile photo and a text message.",
          "The Prophet Muhammad ﷺ — the best of all human beings in character and conduct — left us with a model of marriage that speaks directly to both worlds. His relationships with his wives were not merely legal contracts; they were living examples of love, respect, patience, and partnership. For Muslims using platforms like Nikah today, that model is not a historical relic — it is a practical guide.",
        ],
      },
      {
        heading: 'The Exemplar of Marital Love',
        content: [
          '"The best of you are those who are best to their wives, and I am the best of you to my wives." (Ibn Majah)',
          "This single hadith overturns a great deal of cultural conditioning that has — incorrectly — been attributed to Islamic tradition. The Prophet ﷺ was not distant, domineering, or indifferent to his wives' emotional needs. He sat with Aisha RA while she watched the Abyssinian warriors perform. He raced with her. He listened to her. He publicly declared his love for her when asked who was most beloved to him.",
          "With Khadijah RA — his first wife, the first Muslim, and the person he described as the greatest of all women — he built a partnership of 25 years rooted in mutual support and unwavering loyalty. When Jibreel AS brought the first revelation and the Prophet ﷺ trembled, it was to Khadijah RA that he ran. And it was she who steadied him, believed in him, and sacrificed her wealth for the dawah.",
        ],
      },
      {
        heading: 'Choosing a Spouse: The Prophetic Criteria',
        content: [
          "The hadith of Abu Hurayrah RA sets out what people typically look for in a spouse: \"A woman is married for four reasons: her wealth, her lineage, her beauty, and her deen. Choose the one with deen, and you will prosper.\" (Bukhari & Muslim)",
          "This is not an instruction to ignore other qualities. It is a priority-setting. The Prophet ﷺ recognised that beauty, background, and financial stability are real human considerations — he simply reminded us which quality has the longest shelf life, and which one will shape the character of your home and the upbringing of your children.",
          "When choosing a spouse, the Prophet ﷺ advised looking at compatibility in piety and character. He also instructed men to look at the woman they intend to marry (halal viewing), and for the woman to have the right to refuse a match she finds unsuitable. The wali's role is protective, not coercive.",
        ],
        quote: '"When someone comes to you whose deen and character you are pleased with, then marry him. If you do not, there will be fitnah on earth and great corruption."',
        quoteSource: 'Tirmidhi',
      },
      {
        heading: 'Partnership and Consultation',
        content: [
          '"And their affair is [determined by] consultation among themselves." (Qur\'an 42:38)',
          "The Prophet ﷺ consulted Umm Salamah RA at Hudaybiyyah — a major strategic moment in Islamic history. He consulted Khadijah RA when revelation first came. He was known to listen to his wives, debate with them, and take their counsel seriously.",
          "Islamic marriage is not a hierarchy where one partner matters and the other obeys. It is a structure with defined roles — but within those roles, the Prophetic sunnah is one of shura (consultation), tenderness, and mutual regard. The husband's leadership is a responsibility, not a privilege. The wife's trust is earned, not assumed.",
        ],
      },
      {
        heading: 'Kindness as an Act of Worship',
        content: [
          "The Prophet ﷺ used to mend his own sandals, sew his own clothes, and help with household tasks. He was never too proud to serve his family. He said: \"The most complete of the believers in faith are those with the best character, and the best of you are those who are best to their women.\" (Tirmidhi)",
          "Gentleness in marriage — the kind word, the patience in difficulty, the smile that is described as sadaqah — is not a nicety. In the Prophetic model, it is an act of ibadah. Marriage itself is described as completing half of one's deen.",
        ],
      },
      {
        heading: 'What This Means for Muslims Using a Marriage App Today',
        content: [
          'What does all of this mean practically, when your journey to marriage begins with a profile on Nikah?',
          [
            'Prioritise deen and character above photos and status — let the profile summary tell you who someone truly is',
            'Enter every conversation with the intention of nikah — not curiosity, not loneliness',
            'Involve your wali early — this is Prophetic sunnah, not cultural backwardness',
            'Be honest in your profile — the Prophet ﷺ forbade deception in any transaction, and marriage is the most important of them',
            'Treat every prospective spouse with the dignity you would want for your sister or brother',
            'Make du\'a throughout the process — Istikharah is not a last resort; it is a first step',
          ],
          'The digital platform changes the medium, not the message. Whether you are meeting at a family gathering or through an app, the Prophetic model — deen first, kindness always, consultation throughout, and sincerity at every step — remains the truest compass.',
        ],
        quote: '"Take from the one whose deen and character pleases you." The platform is new. The standard is eternal.',
      },
    ],
  },

  // ── 2 ────────────────────────────────────────────────────────────────────────
  {
    id: 2,
    category: 'Tips & Advice',
    title: 'How to Write a Marriage Profile That Attracts Serious Matches',
    excerpt: "A good profile is honest, specific, and reflects who you actually are — not a curated version. Here's how to write one that attracts the right people.",
    author: 'Nikah Editorial Team',
    authorRole: 'Nikah Editorial',
    date: 'May 22, 2025',
    readTime: '5 min',
    color: '#c9a84c',
    initials: 'NE',
    article: [
      {
        content: [
          'Your profile is the first real impression you make on someone who could become your life partner. It is not a CV, a social media post, or a dating bio. It is an introduction — honest, purposeful, and reflective of who you actually are and what you are genuinely looking for.',
          'A weak profile attracts weak matches. A vague profile attracts confusion. But an honest, specific, and thoughtfully written profile attracts the kind of person you are actually hoping to find.',
        ],
      },
      {
        heading: 'Start With Honesty, Not Aspiration',
        content: [
          "The single biggest mistake people make is writing the profile of the person they want to be rather than the person they are. If you pray four times a day and are working toward consistency, say that. Do not say \"I pray five times daily\" to attract a more religiously practising partner — the mismatch will surface within a week of serious conversation.",
          'Honesty in a marriage profile is not just an ethical obligation (though it is that) — it is also practical wisdom. You want someone who chooses you as you actually are, not as a projected ideal.',
        ],
      },
      {
        heading: 'Be Specific — Vague Is Invisible',
        content: [
          '"Kind, religious, and family-oriented" describes everyone on a marriage app. It tells a prospective match nothing that helps them decide if you are compatible with them specifically.',
          'Compare these two bios:',
          [
            '❌  "I am a kind, religious person who loves family and wants to settle down."',
            '✅  "I teach Sunday school at my local masjid, try to read a portion of Quran every morning, and come from a large Moroccan family where Friday dinners are sacred. I am looking for someone who values community, is close to their family, and wants to build a home with a quiet Islamic rhythm."',
          ],
          'The second bio creates a picture. It gives a compatible match something to connect with, and it screens out those who are not aligned — which is exactly what a good profile should do.',
        ],
      },
      {
        heading: 'What to Include',
        content: [
          'A strong marriage profile covers four areas:',
          [
            '🕌 Your deen — How do you practice Islam day-to-day? Which school of thought do you follow? How important is it that your spouse shares your level of practice?',
            '👨‍👩‍👧 Your family context — Are you close to your family? Do you plan to live near them? Do you have dependents? Are your parents involved in your life?',
            '📍 Your daily life — What does a normal week look like for you? What do you do professionally? What do you do to decompress?',
            '💍 What you\'re looking for — Be clear without being prescriptive. You can say "I\'d prefer someone who shares my cultural background" without writing a list of 20 requirements.',
          ],
        ],
      },
      {
        heading: 'Your Photo',
        content: [
          'Use a clear, recent, respectful photo that looks like you on an average day. Not a heavily filtered selfie, not a group photo where you are hard to find, not a photo from six years ago.',
          'For sisters: a smiling headshot in appropriate hijab (if you wear one) or modest dress is both dignified and welcoming. You do not need to compromise modesty to have a warm and approachable photo.',
          'For brothers: a clear photo of your face — no sunglasses, no group shots as your main photo, no car-selfies if they can be avoided.',
          'Profiles with clear photos receive significantly more serious engagement. Avoiding a photo often signals to prospective matches that something is being hidden — even when that is not the intention.',
        ],
      },
      {
        heading: 'What to Leave Out',
        content: [
          'Avoid these common profile mistakes:',
          [
            'Long lists of requirements that read like a job description',
            'Negative statements ("I am not interested in time-wasters")',
            'Oversharing — save personal details for when trust has been established',
            'Clichés: "I love to laugh", "I enjoy travelling", "I\'m an open book"',
            'Boasting about wealth, status, or achievements as your primary selling point',
          ],
        ],
      },
      {
        heading: 'One Last Thought',
        content: [
          "Write your profile the same way you would describe yourself to a trusted friend who is trying to find you a match. Warmly, honestly, and with the details that actually matter.",
          "The right person is not looking for perfection. They are looking for sincerity, compatibility, and someone whose presence they can imagine in their daily life — for the rest of their life.",
        ],
        quote: 'You are not marketing yourself. You are introducing yourself. There is a profound difference.',
      },
    ],
  },

  // ── 3 ────────────────────────────────────────────────────────────────────────
  {
    id: 3,
    category: 'Community',
    title: 'Across Continents and Cultures: Love Stories from the Muslim Diaspora',
    excerpt: 'Three fictional stories of Muslim couples who found each other across borders — and what their journeys reveal about finding love in the ummah.',
    author: 'Nikah Editorial Team',
    authorRole: 'Nikah Editorial',
    date: 'May 10, 2025',
    readTime: '9 min',
    color: '#2d6fa5',
    initials: 'NE',
    article: [
      {
        content: [
          'The Muslim ummah is the most geographically diverse faith community on earth. There are Muslims in every country, every city, every village — speaking hundreds of languages, cooking thousands of dishes, practising Islam with beautiful regional variety. And in the age of migration, diaspora, and globalisation, more Muslims than ever are navigating marriage across not just families, but continents.',
          'The three stories below are fictional, but they are inspired by real experiences. They are stories of patience, du\'a, compromise, and connection — stories of Muslims who found each other not despite the distance, but in some ways because of it.',
          '⚠️ These are fictional illustrations created for Nikah editorial purposes. Any resemblance to real persons is coincidental.',
        ],
      },
      {
        heading: 'Story One: Fatima & Abdirahman — Birmingham and Nairobi',
        content: [
          "Fatima was born in Birmingham to Yemeni parents. She had spent her twenties building a career in healthcare and quietly making du'a for a husband who valued both her independence and her faith. At 29, she felt the pressure of family expectation keenly — but she refused to compromise on character for the sake of timeline.",
          "Abdirahman had grown up in Nairobi's Eastleigh district and moved to the UK for his Masters at 26. He was gentle, deliberate, and — by the time Fatima's wali was introduced to him — had already been making istikharah for six months.",
          "Their cultural differences were real. His family was Somali, hers Yemeni. Their food was different. Their Arabic accents were different. His mother's initial hesitation was honest. So was Fatima's father's.",
          "What overcame the distance was not romance — it was clarity. They knew what they wanted. Their deen was aligned. Their vision for family was shared. Eight months after their first introduction, they had a nikah ceremony attended by both families via video call and in person. Two years on, they live in Birmingham. He calls Nairobi every Friday. She has learned three Somali phrases, none of which she can pronounce correctly, which Abdirahman finds endlessly entertaining.",
        ],
        quote: '"We didn\'t fall in love first. We made a decision, together, in tawakkul. The love came after."',
        quoteSource: 'Fatima (fictional)',
      },
      {
        heading: 'Story Two: Nur & Aisyah — Istanbul and Jakarta',
        content: [
          "Nur was a Turkish architect who had never imagined marrying someone from Southeast Asia. He spoke Turkish, English, and conversational Arabic. When he matched with Aisyah, an Indonesian graphic designer who had been living in Dubai, neither of them expected it to go anywhere.",
          'Their first conversation lasted three hours. It was entirely in English — imperfect English on both sides, which made it somehow more honest. There was no performance, no eloquence. Just two people, a little uncertain and a lot sincere.',
          "The practical challenges were significant. Two different legal systems for registering a marriage. Families who had never met and lived nine time zones apart. Cultural expectations around weddings that were irreconcilable — his family wanted a Turkish ceremony, hers a Javanese one. They ended up doing both.",
          "What stayed constant was their shared foundation: Salah, Quran, community, and an absolute refusal to let logistics make the decision for them. They married in Kuala Lumpur — a neutral city both families could travel to — fourteen months after their first message.",
        ],
        quote: '"Language is not the barrier people think it is. Intention is the language."',
        quoteSource: 'Nur (fictional)',
      },
      {
        heading: 'Story Three: Hamza & Maryam — New Jersey and Lahore',
        content: [
          "Hamza was a second-generation Pakistani-American who had resisted his parents' proposals for three years. Not because he did not want to marry, but because the process felt transactional — a parade of meetings with women he had nothing to say to.",
          'When he joined Nikah, he wrote bluntly in his bio: "I want a partner, not a project. I want someone I can sit in silence with and not feel uncomfortable."',
          'Maryam, a researcher in Lahore, read that line and replied: "I have been trying to explain that to people for two years."',
          "They spoke every day for four months before Hamza flew to Lahore with his parents. The family meetings were the hardest part — his Americanness sat awkwardly in rooms calibrated for something more traditional. But Maryam's family, to their great credit, saw what mattered: that he was a good Muslim man with honourable intentions.",
          "They married in Lahore. Maryam immigrated to New Jersey eight months later. She says she still misses the mangoes. Hamza says he has become a better man because of her.",
        ],
        quote: '"I wasn\'t looking for perfection. I was looking for someone real. And she was exactly that."',
        quoteSource: 'Hamza (fictional)',
      },
      {
        heading: 'What These Stories Have in Common',
        content: [
          'Across the Muslim diaspora, the couples who navigate cultural and geographic difference successfully tend to share a few things:',
          [
            'Their deen is the shared foundation — everything cultural negotiates around that, not the other way around',
            'They involve their families respectfully but maintain their own clarity about what they want',
            'They are patient — none of these connections happened in weeks',
            'They make du\'a — the sincere, vulnerable, "Ya Allah, guide me to what is best" kind',
            'They do not let the perfect be the enemy of the real',
          ],
          "The ummah is wide. Your spouse might come from your street or from another hemisphere. What matters is not the distance — it is the direction you are both facing.",
        ],
      },
    ],
  },

  // ── 4 ────────────────────────────────────────────────────────────────────────
  {
    id: 4,
    category: 'Safety',
    title: 'Recognising and Avoiding Scams on Marriage Apps',
    excerpt: "Red flags to watch for, how to verify a profile, and what to do if something doesn't feel right. Stay safe on your journey to nikah.",
    author: 'Noor Karim, Head of Trust & Safety',
    authorRole: 'Head of Trust & Safety, Nikah',
    date: 'April 28, 2025',
    readTime: '6 min',
    color: '#c94a4a',
    initials: 'NK',
    article: [
      {
        content: [
          'Romance scams are among the fastest-growing forms of financial fraud globally — and Muslim marriage platforms are not immune. Fraudsters specifically target these communities because the members are often sincere, trusting, and emotionally invested in finding a halal relationship quickly.',
          'Understanding how scams work, what they look like, and what to do if you encounter one is not pessimism. It is wisdom. The Prophet ﷺ said: "The believer is not stung from the same hole twice." (Bukhari)',
        ],
      },
      {
        heading: 'How Marriage Scams Typically Work',
        content: [
          'Most romance scams on marriage apps follow a recognisable pattern, even if the specific story varies:',
          [
            '1. A profile appears — usually with an attractive photo and a compelling backstory (doctor abroad, engineer on a project, widower with children)',
            '2. They move fast — expressing strong interest quickly, often within the first few messages',
            '3. They push off-platform — asking you to move to WhatsApp, Telegram, or email very early',
            '4. They build emotional closeness — sharing personal stories and expressing deep connection before any real trust has been established',
            '5. The "crisis" arrives — a sudden financial emergency: a medical bill, a blocked bank account, a business deal gone wrong',
            '6. They ask for money — framed as a loan, a gift, or a temporary arrangement',
          ],
          'The financial request may come after weeks or months of "relationship building." By that point, the victim has invested emotionally and may feel too embarrassed to question it.',
        ],
      },
      {
        heading: '7 Red Flags to Watch For Immediately',
        content: [
          [
            '🚩 They claim to be working abroad in an unusual situation (oil rig, military deployment, UN mission)',
            '🚩 Their profile photos look like stock photos or model images — reverse-image search them',
            '🚩 They push to move off-platform within the first few messages',
            '🚩 They declare strong feelings very quickly — faster than is realistic',
            '🚩 They consistently avoid or delay video calls, citing connection problems',
            '🚩 Their story contains inconsistencies — details that change between conversations',
            '🚩 Any request for money, gift cards, or cryptocurrency — regardless of the reason given',
          ],
        ],
      },
      {
        heading: 'How to Verify a Profile',
        content: [
          'Verification takes five minutes and can protect you from significant harm:',
          [
            '🔍 Reverse-image search their profile photos using Google Images or TinEye',
            '📹 Request a video call early — a real person with genuine intentions will understand and comply',
            '🕌 Ask specific questions about their local masjid or neighbourhood that a real person would easily answer',
            '✅ Look for the Verified badge on Nikah — verified members have completed our ID check process',
            '🔗 Ask if they have a LinkedIn or any verifiable professional presence',
          ],
          'A genuine person with honest intentions will not be offended by reasonable verification requests. If someone reacts with hurt or pressure when you ask for a video call, that reaction itself is a red flag.',
        ],
        quote: '"Real people understand caution. Scammers pressure you past it."',
        quoteSource: 'Noor Karim, Nikah Trust & Safety Team',
      },
      {
        heading: 'If You Have Been Targeted',
        content: [
          'If you believe you have encountered a scam — or if money has already been sent — please do the following:',
          [
            'Stop all contact with the person immediately',
            'Do not send any further money regardless of what they say',
            'Report the profile on Nikah using the flag icon — our team responds within 2 hours',
            'Email our safety team directly at safety@nikahapp.com',
            'Report to your national fraud authority (Action Fraud in the UK, FTC in the US, ACCC ScamWatch in Australia)',
            'If money was wired, contact your bank immediately — some transfers can be recalled if caught early',
          ],
          'You are not alone and you are not foolish. These scammers are professional manipulators who have deceived people of all ages, backgrounds, and intelligence levels. The shame belongs entirely to them, not to you.',
        ],
      },
    ],
  },

  // ── 5 ────────────────────────────────────────────────────────────────────────
  {
    id: 5,
    category: 'Islamic Marriage',
    title: 'The Role of the Wali in Modern Muslim Marriage',
    excerpt: "What does Islamic scholarship say about the wali's role? How does it translate to digital platforms? A practical and scholarly look at a timeless institution.",
    author: 'Dr. Fatima Al-Zahra',
    authorRole: 'Islamic Studies Scholar',
    date: 'April 15, 2025',
    readTime: '8 min',
    color: '#1a6b4a',
    initials: 'FZ',
    article: [
      {
        content: [
          "Few concepts in Islamic marriage law generate as much confusion — and sometimes anxiety — among modern Muslims as the institution of the wali. Is it obligatory? Who can serve as one? What exactly is their role? And what does this mean for someone using a digital marriage platform in 2025?",
          "This article explores these questions through a scholarly and practical lens, drawing on the four Sunni schools of fiqh and offering guidance for Muslims navigating this process today.",
        ],
      },
      {
        heading: 'What Is a Wali?',
        content: [
          "The word wali (وَلِيّ) comes from the Arabic root meaning closeness, guardianship, and allegiance. In the context of marriage, the wali is the marriage guardian — the person who formally approves and facilitates the marriage contract on behalf of a woman.",
          "The primary wali is typically the father. In his absence, guardianship passes to the grandfather, then brothers, then uncles, and so on through the patrilineal line. A convert with no Muslim male relatives may appoint a respected male community member or an Islamic scholar as her wali.",
          "The wali's role is not to choose a husband for a woman against her will. The Prophet ﷺ explicitly prohibited this: \"A previously married woman has more right over herself than her guardian, and a virgin's consent must be sought.\" (Muslim)",
        ],
      },
      {
        heading: 'The Four Schools of Fiqh',
        content: [
          'The madhabs differ in their approach to the wali, and it is important for Muslims to know their own tradition:',
          [
            "📗 Hanafi: A woman who has reached puberty and is of sound mind may contract her own marriage. The wali's presence is recommended but not strictly a condition for validity in most scenarios.",
            "📘 Maliki: The wali is required and is a condition of a valid nikah. A judge (qadi) can serve as wali for a woman whose natural wali is absent, obstructing, or unreasonably refusing.",
            "📙 Shafi'i: The wali is obligatory. A marriage contracted without a wali is invalid. The closest living male relative serves this role, with the option of a qadi if needed.",
            "📕 Hanbali: The wali is required. Similar to the Shafi'i and Maliki positions. The qadi can override an obstructing wali if a suitable match is being refused without valid reason.",
          ],
          "Across all four schools, one principle is consistent: the wali is not a gatekeeper with veto power to impose or refuse matches according to personal preferences. His role is guardianship and facilitation — not control.",
        ],
      },
      {
        heading: 'Modern Challenges: When the System Is Complicated',
        content: [
          'Many Muslims today face genuinely complex situations:',
          [
            'Converts who have no Muslim male relatives at all',
            'Situations where the father is absent, deceased, or estranged',
            'Families where the wali is refusing a suitable match for cultural or financial reasons (not Islamic ones)',
            'Diaspora Muslims whose closest male relatives live on a different continent',
          ],
          "In all of these cases, Islamic scholarship provides solutions. A scholar, an Islamic centre, a community leader, or an appointed male Muslim can serve as wali. None of these complications mean a woman must forgo this protection or proceed without any guardian.",
          "The key message from all four madhabs: the absence of a willing family wali does not end the process — it redirects it to a community guardian.",
        ],
      },
      {
        heading: 'Wali Mode on Nikah',
        content: [
          "Nikah's Wali Mode is designed for the practical reality of 2025. When activated, it creates a shared conversation thread that includes your wali — meaning all communication with a prospective match is transparent and supervised.",
          "This is not a feature for the suspicious — it is a feature for the sincere. Many members activate Wali Mode precisely because they want the process to be above reproach from the beginning.",
          [
            'Activate at any point during a conversation — not just from the start',
            'Your wali receives an invitation link; they do not need a Nikah account to participate',
            'The thread is preserved for the record, which families may wish to review',
          ],
        ],
      },
      {
        heading: 'A Note for Women Whose Families Are Unsupportive',
        content: [
          "If your family wali is obstructing your marriage without valid Islamic reason — especially if you have found a suitable, practising Muslim man who is willing to approach your family respectfully — you have recourse in Islamic law.",
          "Consult a reputable Islamic scholar or an established Islamic organisation in your country. This is precisely what they exist for. You do not have to choose between your faith and your future.",
        ],
        quote: '"The wali who prevents his charge from marrying a suitable man without valid reason has exceeded his authority in the sight of Islamic law."',
        quoteSource: "Derived from classical fiqh positions on the 'adhl (obstructing wali)",
      },
    ],
  },

  // ── 6 ────────────────────────────────────────────────────────────────────────
  {
    id: 6,
    category: 'Tips & Advice',
    title: 'How to Have the First Conversation With a Potential Spouse',
    excerpt: "From icebreakers to important questions — how to navigate early conversations with purpose, respect, and the right boundaries.",
    author: 'Nikah Editorial Team',
    authorRole: 'Nikah Editorial',
    date: 'April 1, 2025',
    readTime: '4 min',
    color: '#7c4dbe',
    initials: 'NE',
    article: [
      {
        content: [
          "The first conversation with a potential spouse is one of the most nerve-wracking moments in the marriage process. You want to make a good impression, but you also want to be genuine. You want to ask the important questions, but you do not want to come across as interrogating someone.",
          "The good news: if you approach this conversation with the right mindset, it becomes much easier. This is not a job interview. It is not a date. It is a purposeful conversation between two Muslims trying to determine if they might be compatible for one of the most significant decisions of their lives.",
        ],
      },
      {
        heading: 'The Right Mindset Before You Begin',
        content: [
          'Settle yourself on a few things before you type the first message:',
          [
            "Your intention is nikah — and that's not something to be embarrassed about. State it clearly if asked.",
            "You are not trying to impress. You are trying to be known.",
            "This conversation does not have to lead anywhere. It is exploration, not commitment.",
            "Keep the conversation on-platform for now. Moving off-platform too early removes important safety protections.",
          ],
        ],
      },
      {
        heading: 'The First Message',
        content: [
          'The first message sets the tone for everything that follows. Avoid:',
          [
            '❌ Generic openers ("Hi, I liked your profile")',
            '❌ Compliments focused entirely on appearance',
            '❌ Very long first messages that overwhelm',
            '❌ Immediately diving into deep personal questions',
          ],
          "Instead, reference something specific from their profile — a shared interest, a value they mentioned, a language you both speak. Show that you actually read what they wrote.",
          'Example: "Assalamu alaykum. I noticed you mentioned teaching Sunday school — I spent three years doing that as well. I\'d love to hear more about your experience if you\'re open to chatting."',
        ],
      },
      {
        heading: 'Questions to Ask Early',
        content: [
          'Early conversations should build mutual understanding without becoming interrogations. These questions work well:',
          [
            '📍 "What does a normal week look like for you?" — Reveals lifestyle, priorities, and daily rhythm',
            '🕌 "What does your faith practice look like day-to-day?" — More revealing than "Are you religious?"',
            '👨‍👩‍👧 "How close are you with your family? Are they involved in this process?" — Sets expectations early',
            '📅 "What\'s your rough timeline in terms of marriage?" — Avoids misaligned expectations later',
            '🌍 "Where do you see yourself living in five years?" — Important for diaspora members especially',
          ],
        ],
      },
      {
        heading: 'Keeping It Halal',
        content: [
          'The purpose of these conversations is to determine suitability for marriage — not to build an emotional relationship outside of marriage. This means:',
          [
            'Keep conversations focused on understanding each other\'s life, values, and compatibility',
            'Avoid extended conversations about feelings, love, or emotional intimacy before any commitment',
            'If things become serious, involve your wali — this is both Islamically advisable and practically wise',
            'Do not share private photos, personal addresses, or financial information until after nikah',
          ],
          "The emotional warmth and romantic dimension of marriage has its proper place — within the nikah itself. The period before is for assessment, not attachment.",
        ],
      },
      {
        heading: 'When to Move Forward — and When to Step Back',
        content: [
          'Move toward the next step (family introduction, wali involvement) when:',
          [
            'Core values and life direction are clearly aligned',
            'Both parties genuinely feel that further exploration is worthwhile',
            'The conversation has been open, honest, and free of red flags',
          ],
          'Slow down or step back when:',
          [
            'There is inconsistency between the profile and what is said in conversation',
            'There is pressure to move off-platform or escalate faster than feels comfortable',
            'Something — even if you cannot name it — does not feel right. Trust that instinct.',
          ],
        ],
        quote: '"Every great marriage started with someone being brave enough to say the first word. Make that word honest."',
      },
    ],
  },
]

// ─── Constants ─────────────────────────────────────────────────────────────────

const CATEGORIES = ['All', 'Islamic Marriage', 'Tips & Advice', 'Safety', 'Community']

const TOPICS = [
  { icon: '🕌', label: 'Islamic Marriage', desc: 'Fiqh, prophetic guidance, the wali system, and marriage as ibadah.', color: '#1a6b4a' },
  { icon: '💡', label: 'Tips & Advice', desc: 'Practical guidance for your profile, conversations, and the search process.', color: '#c9a84c' },
  { icon: '🛡️', label: 'Safety', desc: 'How to protect yourself from scams, verify profiles, and report abuse.', color: '#c94a4a' },
  { icon: '🌍', label: 'Community', desc: 'Stories from the Muslim ummah — diaspora, cross-cultural love, and more.', color: '#2d6fa5' },
]

const AUTHORS = [
  { initials: 'YR', name: 'Sheikh Yusuf Al-Rashid', role: 'Islamic Scholar & Marriage Counsellor', color: '#1a6b4a', bio: "Sheikh Yusuf has over 20 years of experience in Islamic family counselling across the UK, UAE, and Canada. He specialises in marriage preparation and conflict resolution from a fiqh perspective." },
  { initials: 'FZ', name: 'Dr. Fatima Al-Zahra', role: 'Islamic Studies Scholar', color: '#7c4dbe', bio: "Dr. Fatima holds a doctorate in Islamic Law and Gender Studies. She lectures at a European Islamic university and writes widely on Muslim women's rights within classical fiqh frameworks." },
  { initials: 'NK', name: 'Noor Karim', role: 'Head of Trust & Safety, Nikah', color: '#c94a4a', bio: "Noor leads Nikah's trust and safety operations, with a background in fraud prevention and digital safeguarding. She oversees our 24/7 safety team and trains moderators worldwide." },
  { initials: 'NE', name: 'Nikah Editorial Team', role: 'Editors & Writers', color: '#2d6fa5', bio: "The Nikah editorial team is a group of Muslim writers, researchers, and community contributors who create practical, faith-grounded content for our members." },
]

// ─── Article Modal ─────────────────────────────────────────────────────────────

function ArticleModal({ post, onClose }: { post: Post; onClose: () => void }) {
  return (
    <Modal open onClose={onClose} size="xl">
      {/* Colour strip */}
      <div className="h-2 w-full rounded-t-3xl" style={{ background: post.color }} />

      <div className="px-6 sm:px-8 pt-6 pb-10">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: `${post.color}18`, color: post.color }}>
            <Tag size={10} className="inline mr-1" />{post.category}
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={11} /> {post.readTime} read</span>
          <span className="text-xs text-gray-400">{post.date}</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-5">{post.title}</h1>

        {/* Author */}
        <div className="flex items-center gap-3 pb-6 mb-6 border-b border-gray-100">
          <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0" style={{ background: post.color }}>
            {post.initials}
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-800">{post.author}</p>
            <p className="text-xs text-gray-400">{post.authorRole}</p>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-5 text-gray-700 leading-relaxed text-sm sm:text-[15px]">
          {post.article.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mt-8 mb-3">
                  {section.heading}
                </h2>
              )}
              {section.content.map((item, j) =>
                Array.isArray(item) ? (
                  <ul key={j} className="space-y-2 my-3 pl-1">
                    {item.map((b, k) => (
                      <li key={k} className="text-sm text-gray-600 leading-relaxed">{b}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={j} className="mb-3 leading-relaxed">{item}</p>
                )
              )}
              {section.quote && (
                <blockquote
                  className="border-l-4 pl-5 py-2 italic my-5 rounded-r-xl"
                  style={{ borderColor: post.color, background: `${post.color}08` }}
                >
                  <p className="font-medium text-gray-700">"{section.quote}"</p>
                  {section.quoteSource && (
                    <footer className="text-xs text-gray-400 mt-1.5 not-italic">— {section.quoteSource}</footer>
                  )}
                </blockquote>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between flex-wrap gap-3">
          <span className="text-xs text-gray-400 flex items-center gap-1.5">
            <BookOpen size={12} /> Nikah Blog · Content always in English
          </span>
          <button
            onClick={onClose}
            className="text-sm font-semibold px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90"
            style={{ background: `linear-gradient(135deg, ${post.color}, ${post.color}bb)` }}
          >
            Close article
          </button>
        </div>
      </div>
    </Modal>
  )
}

// ─── Newsletter ─────────────────────────────────────────────────────────────────

function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [err, setErr] = useState('')

  const submit = () => {
    if (!isValidEmail(email)) { setErr('Please enter a valid email address.'); return }
    setErr(''); setDone(true)
  }

  if (done) {
    return (
      <div className="mt-16 rounded-3xl p-8 text-center" style={{ background: 'rgba(26,107,74,0.06)' }}>
        <div className="text-3xl mb-2">✅</div>
        <p className="text-lg font-bold text-gray-900 mb-1">You're subscribed!</p>
        <p className="text-gray-500 text-sm">We'll send new articles to <strong>{email}</strong> every week.</p>
      </div>
    )
  }

  return (
    <div className="mt-16 rounded-3xl p-8 text-center" style={{ background: 'rgba(26,107,74,0.06)' }}>
      <p className="text-2xl font-bold text-gray-900 mb-2">Stay inspired</p>
      <p className="text-gray-500 mb-5 text-sm">
        Get new articles on Islamic marriage, relationships, and community stories every week.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); setErr('') }}
          placeholder="Your email address"
          maxLength={LIMITS.newsletter}
          className={`flex-1 px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${err ? 'border-red-400' : 'border-gray-200 focus:border-emerald-500'}`}
        />
        <button
          onClick={submit}
          className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)' }}
        >
          Subscribe
        </button>
      </div>
      {err && <p className="text-xs text-red-500 mt-2">{err}</p>}
      <p className="text-xs text-gray-400 mt-3">No spam. Unsubscribe anytime.</p>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [openPost, setOpenPost] = useState<Post | null>(null)

  const filtered = activeCategory === 'All' ? POSTS : POSTS.filter(p => p.category === activeCategory)
  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <div style={{ paddingTop: 64 }}>
      <PageHero
        label="📖 Nikah Blog"
        title="Guidance for Your"
        titleHighlight="Marriage Journey"
        subtitle="Insights, advice, and stories to help you on your path to nikah — rooted in faith."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">

        {/* Language note ── content never changes regardless of app language setting */}
        <p className="text-center text-xs text-gray-400 mb-6 flex items-center justify-center gap-1.5">
          <BookOpen size={12} />
          All articles are written in English · Language preferences affect the app interface only, not blog content
        </p>

        {/* ── Category Filter ── */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={
                activeCategory === c
                  ? { background: 'linear-gradient(135deg, #1a6b4a, #2d9b6f)', color: 'white' }
                  : { background: 'white', color: '#555', border: '1px solid #e5e5e5' }
              }
            >
              {c}
            </button>
          ))}
        </div>

        {/* ── Featured Post ── */}
        {featured && (
          <div
            className="rounded-3xl p-8 mb-8 text-white cursor-pointer hover:opacity-96 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #0a2e1f, #1a6b4a)' }}
            onClick={() => setOpenPost(featured)}
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 text-white/90">✦ Featured</span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(201,168,76,0.25)', color: '#e8c96e' }}>
                {featured.category}
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-3 leading-snug">{featured.title}</h2>
            <p className="text-white/70 mb-5 leading-relaxed">{featured.excerpt}</p>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: 'rgba(255,255,255,0.2)' }}>
                  {featured.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{featured.author}</p>
                  <p className="text-white/50 text-xs">{featured.date} · {featured.readTime} read</p>
                </div>
              </div>
              <button
                onClick={e => { e.stopPropagation(); setOpenPost(featured) }}
                className="px-5 py-2 rounded-xl bg-white/15 hover:bg-white/25 transition-colors text-sm font-medium text-white flex items-center gap-1.5"
              >
                Read article <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* ── Post Grid ── */}
        {rest.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {rest.map(post => (
              <div
                key={post.id}
                onClick={() => setOpenPost(post)}
                className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer overflow-hidden group"
              >
                <div className="h-1.5 w-full" style={{ background: post.color }} />
                <div className="p-5">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full mb-3 inline-block" style={{ background: `${post.color}12`, color: post.color }}>
                    {post.category}
                  </span>
                  <h3 className="font-bold text-gray-800 mb-2 leading-snug group-hover:text-emerald-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: post.color }}>
                        {post.initials}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-700 truncate max-w-[110px]">{post.author}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1"><Clock size={9} />{post.readTime} read</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{post.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── What We Cover ── */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">What we write about</h2>
          <p className="text-gray-500 text-sm text-center mb-8 max-w-xl mx-auto">
            Every article on the Nikah Blog is written with one goal: to help you navigate your marriage journey with wisdom, confidence, and faith.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOPICS.map(t => (
              <button
                key={t.label}
                onClick={() => setActiveCategory(t.label)}
                className="p-5 rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-all text-left group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3" style={{ background: `${t.color}12` }}>
                  {t.icon}
                </div>
                <p className="font-bold text-sm mb-1.5 transition-colors" style={{ color: t.color }}>{t.label}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* ── Quick Reads ── */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Quick reads</h2>
          <p className="text-gray-500 text-sm text-center mb-8">Short, practical takeaways you can act on today.</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: '🤲',
                title: 'Make Istikharah Before Every Step',
                tip: 'Before your first message, before agreeing to meet, before accepting — pray Istikharah. It is not a one-time prayer; it is a continuous conversation with Allah about this decision.',
              },
              {
                icon: '📋',
                title: 'Write Your Own Criteria List First',
                tip: "Before you browse, write down your five non-negotiables and your five preferences. Know the difference between the two. This prevents you from being swayed by superficial attraction.",
              },
              {
                icon: '⏳',
                title: "Don't Let Urgency Drive Decisions",
                tip: "The feeling that time is running out is one of the most common causes of poor marriage decisions. Your timeline is between you and Allah. Trust the process and trust du'a.",
              },
            ].map(item => (
              <div key={item.title} className="p-5 rounded-2xl bg-white border border-gray-100 hover:shadow-sm transition-all">
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="font-bold text-sm text-gray-800 mb-2">{item.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Trusted Voices ── */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Trusted voices</h2>
          <p className="text-gray-500 text-sm text-center mb-8 max-w-xl mx-auto">
            Our writers are scholars, practitioners, and community experts committed to grounded, authentic guidance.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {AUTHORS.map(a => (
              <div key={a.name} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 hover:shadow-sm transition-all">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ background: a.color }}>
                  {a.initials}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{a.name}</p>
                  <p className="text-xs font-medium mb-2" style={{ color: a.color }}>{a.role}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{a.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Newsletter ── */}
        <Newsletter />

        {/* ── Disclaimer ── */}
        <p className="text-center text-xs text-gray-400 mt-10 leading-relaxed max-w-xl mx-auto">
          <User size={11} className="inline mr-1" />
          Authors marked "Nikah Editorial Team" represent our in-house writers. Named contributors are fictional personas created for editorial purposes. All content is for informational guidance only and does not constitute a fatwa or legal ruling.
        </p>

      </div>

      {/* ── Article Modal ── */}
      {openPost && <ArticleModal post={openPost} onClose={() => setOpenPost(null)} />}
    </div>
  )
}
