import React, { FormEvent, ReactNode, useEffect, useState } from "react"

type IconName = "search" | "menu" | "close" | "arrow" | "clock" | "play" | "mail" | "check" | "facebook" | "youtube" | "instagram"

type Story = {
  category: string
  title: string
  image: string
  time: string
  featured?: boolean
  summary?: string
  body?: string[]
}

const stories: Story[] = [
  {
    category: "Philippines",
    title:
      "New local initiatives are creating pathways for Pampanga's next generation",
    image:
      "https://images.unsplash.com/photo-1603767311691-fa1943d078c0?auto=format&fit=crop&w=1400&q=85",
    time: "18 min ago",
    featured: true,
    summary:
      "Inside the people-led projects building opportunity, connection and lasting change across local communities.",
    body: [
      "Across Pampanga, educators, entrepreneurs and neighborhood organizers are developing practical programs that respond directly to local needs.",
      "The initiatives range from skills training and youth mentorship to new agricultural cooperatives. Organizers say their shared goal is to create durable opportunity while keeping decisions close to the communities they serve.",
      "Participants describe the work as a long-term investment in confidence, connection and a generation ready to shape the country's future.",
    ],
  },
  {
    category: "World",
    title: "Global leaders focus on economic resilience and new partnerships",
    image:
      "https://images.unsplash.com/photo-1560789299-12a60c2b7baa?auto=format&fit=crop&w=900&q=80",
    time: "36 min ago",
    summary:
      "Regional partnerships and long-term investment lead a renewed economic agenda.",
    body: [
      "Leaders meeting this week placed economic resilience, regional trade and workforce development at the center of a new round of talks.",
      "The discussions emphasized practical partnerships that can strengthen local businesses while helping communities adapt to global uncertainty.",
    ],
  },
  {
    category: "Technology",
    title: "The innovations shaping how people work, learn and connect",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80",
    time: "1 hr ago",
    summary:
      "New digital tools are changing access to education, services and opportunity.",
    body: [
      "Technology leaders are focusing on tools that make information and essential services easier to access.",
      "Experts say the next wave of innovation will be measured not only by speed, but by how effectively it improves everyday life.",
    ],
  },
  {
    category: "Sports",
    title: "A new season brings fresh ambition to the national game",
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=80",
    time: "2 hrs ago",
    summary:
      "Players, supporters and coaches look ahead to a season full of possibility.",
    body: [
      "Teams are returning to the field with renewed energy, new talent and a clear focus on development.",
      "Supporters say the competition is also an opportunity to bring communities together around a shared source of pride.",
    ],
  },
]

const latest = [
  [
    "Philippines",
    "Community leaders announce a new plan for neighborhood development",
    "12 min",
  ],
  [
    "Business",
    "Small businesses find new audiences through the digital economy",
    "44 min",
  ],
  [
    "Culture",
    "A new creative movement puts Filipino voices on the global stage",
    "1 hr",
  ],
  [
    "World",
    "Regional talks open with trade, climate and migration on the agenda",
    "2 hrs",
  ],
]

type PageContent = {
  eyebrow: string
  title: string
  body: string[]
  items?: Story[]
  action?: { label: string; href: string }
}

const companyPages: Record<string, PageContent> = {
  contact: {
    eyebrow: "Contact the JAD team",
    title: "Let's create something that moves people.",
    body: [
      "Visit JAD Multimedia Production at Unit 19, 2nd Floor, L Plaza Building, Barangay Lagundi, Mexico, Pampanga.",
      "Call 0917 791 4130 or (045) 901-9619. Email jadmultimediaproduction@gmail.com for production, campaign and partnership inquiries.",
    ],
    action: {
      label: "Email JAD Multimedia",
      href: "mailto:jadmultimediaproduction@gmail.com",
    },
  },
  privacy: {
    eyebrow: "Privacy",
    title: "Your trust matters.",
    body: [
      "JAD News uses essential site data to improve performance and understand which journalism serves readers best.",
      "Newsletter addresses are used only to deliver requested updates. We do not sell personal information, and readers can unsubscribe at any time.",
    ],
  },
  advertise: {
    eyebrow: "Partner with JAD",
    title: "Reach an attentive, growing audience.",
    body: [
      "Connect your organization with audiences through display advertising, sponsored editorial packages, Facebook promotion, campaign branding, video and photography.",
      "Every engagement is designed around clear objectives, the right audience and measurable communication goals.",
    ],
    action: {
      label: "Request the media kit",
      href: "mailto:jadmultimediaproduction@gmail.com?subject=JAD%20Media%20Kit",
    },
  },
}

const services = [
  {
    number: "01",
    title: "Campaign strategic consulting",
    summary:
      "Expert strategy for organizations, candidates and companies working toward a specific goal.",
    details: [
      "We develop campaign objectives, identify priority audiences and define the most effective ways to reach them.",
      "Each engagement can include messaging, branding, public-opinion analysis and a coordinated digital strategy.",
    ],
  },
  {
    number: "02",
    title: "Campaign planning",
    summary:
      "A practical roadmap connecting campaign goals, audiences, actions and measurement.",
    details: [
      "JAD builds comprehensive plans informed by situation analysis, SWOT analysis, the current political or market landscape and relevant historical context.",
      "The result is a focused campaign framework that teams can understand and execute.",
    ],
  },
  {
    number: "03",
    title: "Campaign branding",
    summary:
      "Distinctive visual and verbal identities designed to build recognition, trust and connection.",
    details: [
      "We develop cohesive campaign messages and identities that make communication more consistent and memorable.",
      "Strong branding helps a campaign stand out while keeping every audience touchpoint aligned.",
    ],
  },
  {
    number: "04",
    title: "Facebook ads boosting",
    summary:
      "Targeted promotion that increases reach, engagement and visibility beyond existing followers.",
    details: [
      "JAD helps clients launch accessible, budget-conscious Facebook promotion and monitor reach, engagement and audience demographics.",
      "Campaigns can begin with a focused budget and scale based on performance.",
    ],
  },
  {
    number: "05",
    title: "Videography",
    summary:
      "Creative and technical video production for campaigns, events, advertising and digital platforms.",
    details: [
      "Our team combines technical production skills with creative direction to capture moving stories with purpose.",
      "Projects can support film, television, marketing, events and online distribution.",
    ],
  },
  {
    number: "06",
    title: "Photography",
    summary:
      "Purposeful imagery for storytelling, documentation, marketing and public communication.",
    details: [
      "We create photographs that communicate clearly, preserve important moments and strengthen a brand's visual presence.",
      "Coverage is available for campaigns, events, commercial work and editorial storytelling.",
    ],
  },
  {
    number: "07",
    title: "Editing",
    summary:
      "Thoughtful refinement of video, photography and written content for clarity and professional quality.",
    details: [
      "Editing turns raw material into coherent communication by improving structure, pacing, clarity and visual polish.",
      "JAD supports complete post-production workflows across media formats.",
    ],
  },
]

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14M14 7l5 5-5 5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    play: <path d="m9 7 8 5-8 5V7Z" fill="currentColor" stroke="none" />,
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    facebook: (
      <path
        d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v7h4v-7h3l1-4h-4V9c0-.7.3-1 1-1Z"
        fill="currentColor"
        stroke="none"
      />
    ),
    youtube: (
      <>
        <rect x="2.5" y="6" width="19" height="12" rx="3" />
        <path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

function Link({
  children,
  className = "",
  href = "#",
  onClick,
}: {
  children: ReactNode
  className?: string
  href?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}) {
  return React.createElement("a", { className, href, onClick }, children)
}

function Button({
  children,
  className = "",
  onClick,
  type = "button",
  ariaLabel,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  type?: "button" | "submit"
  ariaLabel?: string
}) {
  return React.createElement(
    "button",
    { "aria-label": ariaLabel, className, onClick, type },
    children,
  )
}

function Input({
  ariaLabel,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { ariaLabel: string }) {
  return React.createElement("input", {
    ...props,
    "aria-label": ariaLabel,
  })
}

function Title({
  level = 2,
  children,
  className = "",
}: {
  level?: 1 | 2 | 3
  children: ReactNode
  className?: string
}) {
  const Tag = level === 1 ? "h1" : level === 2 ? "h2" : "h3"
  return <Tag className={className}>{children}</Tag>
}

function AdSlot({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      className={`ad-slot ${compact ? "ad-slot--compact" : ""}`}
      aria-label="Advertisement"
    >
      <span>Advertisement</span>
      <div>
        <strong>Your brand belongs here.</strong>
        <small>Reach an informed, engaged audience</small>
      </div>
      <Link href="mailto:jadmultimediaproduction@gmail.com?subject=Advertising%20with%20JAD">
        Advertise with us <Icon name="arrow" size={15} />
      </Link>
    </aside>
  )
}

function StoryCard({
  story,
  onOpen,
}: {
  story: Story
  onOpen: (story: Story) => void
}) {
  const open = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onOpen(story)
  }

  return (
    <article className="story-card">
      <Link className="story-card__image" href="#story" onClick={open}>
        <img src={story.image} alt="" />
        <span className="category-pill">{story.category}</span>
      </Link>
      <div className="story-card__content">
        <Title level={3}>
          <Link href="#story" onClick={open}>
            {story.title}
          </Link>
        </Title>
        <span className="story-time">
          <Icon name="clock" size={14} />
          {story.time}
        </span>
      </div>
    </article>
  )
}

export default function App() {
  const [view, setView] = useState<"home" | "services" | "company">(() => {
    if (window.location.pathname.startsWith("/services")) return "services"
    if (window.location.pathname.startsWith("/company")) return "company"
    return "home"
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [language, setLanguage] = useState("EN")
  const [subscribed, setSubscribed] = useState(false)
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [activePage, setActivePage] = useState<PageContent | null>(null)

  useEffect(() => {
    document.title = "JAD News & Multimedia Production"

    const description =
      document.querySelector<HTMLMetaElement>('meta[name="description"]') ??
      document.head.appendChild(document.createElement("meta"))
    description.name = "description"
    description.content =
      "JAD delivers news, campaign strategy, advertising, video, photography and editing from Mexico, Pampanga."

    const structuredData = document.createElement("script")
    structuredData.type = "application/ld+json"
    structuredData.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "NewsMediaOrganization",
      name: "JAD News",
      alternateName: "JAD Multimedia Production",
      logo: "/jad-logo.png?v=2",
      description:
        "News, campaign strategy, advertising, video, photography and editing from Mexico, Pampanga.",
    })
    document.head.appendChild(structuredData)

    return () => structuredData.remove()
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname.startsWith("/services")) {
        setView("services")
      } else if (window.location.pathname.startsWith("/company")) {
        setView("company")
      } else {
        setView("home")
      }
      setSelectedStory(null)
      setActivePage(null)
      window.scrollTo({ top: 0 })
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubscribed(true)
  }

  function openStory(story: Story) {
    setActivePage(null)
    setSelectedStory(story)
  }

  function openPage(key: keyof typeof companyPages) {
    setSelectedStory(null)
    setActivePage(companyPages[key])
  }

  function openPageFromLink(
    event: React.MouseEvent<HTMLAnchorElement>,
    key: keyof typeof companyPages,
  ) {
    event.preventDefault()
    openPage(key)
  }

  function navigateView(nextView: "home" | "services" | "company") {
    setView(nextView)
    setMenuOpen(false)
    setSelectedStory(null)
    setActivePage(null)
    const path =
      nextView === "home"
        ? "/"
        : nextView === "services"
          ? "/services"
          : "/company"
    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path)
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function openCategory(
    event: React.MouseEvent<HTMLAnchorElement>,
    category: string,
  ) {
    event.preventDefault()
    setMenuOpen(false)

    if (category === "Home") {
      navigateView("home")
      return
    }

    if (category === "Video") {
      navigateView("home")
      window.setTimeout(() => document.querySelector("#video")?.scrollIntoView({
            behavior: "smooth",
          }), 50)
      return
    }

    if (category === "Services" || category === "Company") {
      navigateView(category === "Services" ? "services" : "company")
      return
    }

    const matches = stories.filter((story) => story.category === category)
    setSelectedStory(null)
    setActivePage({
      eyebrow: `${category} desk`,
      title: `Latest ${category} stories`,
      body: [
        `Reporting, analysis and context from the JAD News ${category.toLowerCase()} desk.`,
      ],
      items:
        matches.length > 0
          ? matches
          : [
              {
                category,
                title: `${category} updates from the Philippines and around the world`,
                image: stories[0].image,
                time: "Updated today",
                summary: `The JAD News team is following the developments shaping ${category.toLowerCase()} and their impact on our communities.`,
              },
            ],
    })
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const term = searchQuery.trim().toLowerCase()
    const matches = stories.filter((story) =>
      `${story.category} ${story.title} ${story.summary ?? ""}`
        .toLowerCase()
        .includes(term),
    )

    setSearchOpen(false)
    setSelectedStory(null)
    setActivePage({
      eyebrow: "Search results",
      title: term ? `Results for “${searchQuery.trim()}”` : "All JAD stories",
      body: [
        matches.length
          ? `${matches.length} matching ${
              matches.length === 1 ? "story" : "stories"
            } found.`
          : "No exact match was found. Explore our latest reporting below.",
      ],
      items: matches.length ? matches : stories,
    })
  }

  function closeReader() {
    setSelectedStory(null)
    setActivePage(null)
  }

  return (
    <div className="site-shell">
      <div className="topline">
        <div className="container topline__inner">
          <p>
            Sunday, May 25, 2025 <span>•</span> Mexico, Pampanga
          </p>
          <div className="topline__links">
            <Link
              href="#contact"
              onClick={(event) => openPageFromLink(event, "contact")}
            >
              Contact
            </Link>
            <Link
              href="#advertise"
              onClick={(event) => openPageFromLink(event, "advertise")}
            >
              Advertise
            </Link>
          </div>
        </div>
      </div>

      <header className="header">
        <div className="container header__main">
          <Link
            className="brand"
            href="/"
            onClick={(event) => {
              event.preventDefault()
              navigateView("home")
            }}
          >
            <img src="/jad-logo.png?v=2" alt="JAD Multimedia Production logo" />
            <span>
              <strong>
                JAD<span>NEWS</span>
              </strong>
              <small>Clarity. Context. Community.</small>
            </span>
          </Link>
          <div className="header__actions">
            <Button
              className="language"
              onClick={() => setLanguage(language === "EN" ? "FR" : "EN")}
            >
              {language} <span>⌄</span>
            </Button>
            <Button
              className="icon-button"
              ariaLabel="Search"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Icon name="search" />
            </Button>
            <Button
              className="menu-button"
              ariaLabel="Menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "close" : "menu"} />
            </Button>
          </div>
        </div>
        {searchOpen && (
          <div className="search-panel">
            <form className="container" onSubmit={handleSearch}>
              <Icon name="search" />
              <Input
                autoFocus
                ariaLabel="Search JAD News"
                placeholder="Search stories, topics and people..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <Button type="submit">Search</Button>
            </form>
          </div>
        )}
        <nav
          className={`nav ${menuOpen ? "nav--open" : ""}`}
          aria-label="Primary navigation"
        >
          <div className="container nav__inner">
            {[
              "Home",
              "Philippines",
              "World",
              "Politics",
              "Business",
              "Technology",
              "Culture",
              "Sports",
              "Video",
              "Services",
              "Company",
            ].map((item, i) => (
              <Link
                className={
                  (item === "Home" && view === "home") ||
                  (item === "Services" && view === "services") ||
                  (item === "Company" && view === "company")
                    ? "active"
                    : ""
                }
                href={
                  item === "Home"
                    ? "/"
                    : item === "Services"
                      ? "/services"
                      : item === "Company"
                        ? "/company"
                        : `#${item.toLowerCase()}`
                }
                key={item}
                onClick={(event) => openCategory(event, item)}
              >
                {item}
                {item === "Video" && <span className="live-dot" />}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main id="top" className={`site-main view-${view}`}>
        <div className="container">
          <AdSlot />
        </div>

        <section className="breaking">
          <div className="container breaking__inner">
            <strong>Breaking</strong>
            <p>
              <Link
                href="#breaking"
                onClick={(event) => {
                  event.preventDefault()
                  openStory({
                    category: "Breaking news",
                    title:
                      "Caribbean leaders gather for high-level regional summit",
                    image: stories[1].image,
                    time: "Updated 8 min ago",
                    summary:
                      "Regional leaders are meeting to discuss trade, climate resilience and cooperation.",
                    body: [
                      "Delegations from across the Caribbean have opened a new round of high-level talks focused on shared regional priorities.",
                      "JAD News will update this report as statements and agreements are announced.",
                    ],
                  })
                }}
              >
                Caribbean leaders gather for high-level regional summit
              </Link>
            </p>
            <span>Updated 8 min ago</span>
          </div>
        </section>

        <section className="container hero-grid">
          <article className="lead-story">
            <img
              src={stories[0].image}
              alt="A local market vendor holding fresh produce"
            />
            <div className="lead-story__overlay">
              <span className="category-pill">Top story</span>
              <Title level={1}>
                <Link
                  href="#story"
                  onClick={(event) => {
                    event.preventDefault()
                    openStory(stories[0])
                  }}
                >
                  {stories[0].title}
                </Link>
              </Title>
              <p>
                Inside the people-led projects building opportunity, connection
                and lasting change across local communities.
              </p>
              <span className="byline">
                By JAD Newsroom <i /> 18 min ago
              </span>
            </div>
          </article>
          <div className="side-stories">
            {stories.slice(1, 3).map((story) => (
              <StoryCard
                story={story}
                onOpen={openStory}
                key={story.category}
              />
            ))}
          </div>
        </section>

        <section className="container content-layout" id="latest">
          <div className="main-feed">
            <div className="section-heading">
              <div>
                <span>Stay informed</span>
                <Title level={2}>Latest news</Title>
              </div>
              <Link
                href="#all"
                onClick={(event) => {
                  event.preventDefault()
                  setActivePage({
                    eyebrow: "All stories",
                    title: "The latest from JAD News",
                    body: [
                      "Essential reporting and context from the Philippines and around the world.",
                    ],
                    items: stories,
                  })
                }}
              >
                View all stories <Icon name="arrow" size={16} />
              </Link>
            </div>
            <div className="latest-list">
              {latest.map(([category, title, time], index) => (
                <article className="latest-item" key={title}>
                  <span className="latest-item__number">0{index + 1}</span>
                  <div>
                    <span className="eyebrow">{category}</span>
                    <Title level={3}>
                      <Link
                        href="#story"
                        onClick={(event) => {
                          event.preventDefault()
                          openStory({
                            category,
                            title,
                            time: `${time} ago`,
                            image: stories[index % stories.length].image,
                            summary:
                              "JAD News explains the people, decisions and developments behind this story.",
                            body: [
                              "Our newsroom is following this developing story and speaking with the people closest to it.",
                              "This report brings together the key facts, local context and what readers should watch next.",
                            ],
                          })
                        }}
                      >
                        {title}
                      </Link>
                    </Title>
                    <span className="story-time">
                      <Icon name="clock" size={14} />
                      {time} ago
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <aside className="sidebar">
            <AdSlot compact />
            <div className="newsletter">
              <div className="newsletter__icon">
                <Icon name={subscribed ? "check" : "mail"} />
              </div>
              <span className="eyebrow">The daily briefing</span>
              <Title level={2}>
                {subscribed ? "You're on the list." : "News worth knowing."}
              </Title>
              <p>
                {subscribed
                  ? "Watch your inbox for the next JAD Brief."
                  : "Start your morning informed. The day's essential stories, delivered with clarity."}
              </p>
              {!subscribed && (
                <form onSubmit={subscribe}>
                  <Input
                    ariaLabel="Email address"
                    required
                    type="email"
                    placeholder="Your email address"
                  />
                  <Button type="submit">
                    Subscribe <Icon name="arrow" size={16} />
                  </Button>
                </form>
              )}
              <small>Free newsletter. Unsubscribe anytime.</small>
            </div>
          </aside>
        </section>

        <section className="video-section" id="video">
          <div className="container">
            <div className="section-heading section-heading--light">
              <div>
                <span>Watch now</span>
                <Title level={2}>JAD News video</Title>
              </div>
              <Link
                href="#videos"
                onClick={(event) => openCategory(event, "Video")}
              >
                Explore all videos <Icon name="arrow" size={16} />
              </Link>
            </div>
            <div className="video-grid">
              <article className="video-feature">
                <img
                  src="https://images.unsplash.com/photo-1583029364705-25981646947c?auto=format&fit=crop&w=1400&q=85"
                  alt="Tropical coastline seen from above"
                />
                <div className="video-feature__content">
                  <Button
                    className="play-button"
                    ariaLabel="Play video"
                    onClick={() =>
                      setActivePage({
                        eyebrow: "JAD Original · 12:48",
                        title:
                          "Beyond the headlines: the places and people defining modern Pampanga",
                        body: [
                          "This JAD Original travels beyond the daily news cycle to meet the people building, creating and leading across Pampanga.",
                          "The full video player will be connected to the JAD Multimedia video channel.",
                        ],
                      })
                    }
                  >
                    <Icon name="play" size={24} />
                  </Button>
                  <span>JAD Original</span>
                  <Title level={2}>
                    Beyond the headlines: the places and people defining modern
                    Pampanga
                  </Title>
                  <p>12:48</p>
                </div>
              </article>
              <div className="video-aside">
                <span>JAD Live</span>
                <Title level={2}>News as it happens</Title>
                <p>Live reports, interviews and analysis from our newsroom.</p>
                <Link
                  href="#live"
                  onClick={(event) => {
                    event.preventDefault()
                    setActivePage({
                      eyebrow: "JAD Live",
                      title: "News as it happens.",
                      body: [
                        "The live stream is currently offline. Return during scheduled broadcasts for reporting, interviews and analysis from the JAD newsroom.",
                        "Subscribe to the JAD Brief to receive upcoming broadcast alerts.",
                      ],
                    })
                  }}
                >
                  Watch live <Icon name="arrow" size={17} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="container more-stories">
          <div className="section-heading">
            <div>
              <span>More to explore</span>
              <Title level={2}>Across JAD News</Title>
            </div>
          </div>
          <div className="story-row">
            {[stories[2], stories[3], stories[1]].map((story, index) => (
              <StoryCard
                story={{
                  ...story,
                  category: ["Technology", "Sports", "Business"][index],
                }}
                onOpen={openStory}
                key={index}
              />
            ))}
          </div>
        </section>

        <section className="company-intro" id="company">
          <div className="container company-intro__grid">
            <div className="company-intro__copy">
              <span className="eyebrow">Beyond the newsroom</span>
              <Title level={2}>
                Strategy, stories and production that move people.
              </Title>
              <p>
                JAD Multimedia Production creates and distributes media across
                websites, video, television, film and advertising. We pair
                strategic thinking with hands-on production to help clients
                communicate with clarity and confidence.
              </p>
              <Link
                href="/services"
                onClick={(event) => {
                  event.preventDefault()
                  navigateView("services")
                }}
              >
                Explore our services <Icon name="arrow" size={17} />
              </Link>
            </div>
            <div className="company-principles">
              <article>
                <span>Our vision</span>
                <Title level={3}>Positive impact. Shared achievement.</Title>
                <p>
                  We aim to drive client satisfaction and success while
                  fostering sustainable growth for every team we work with.
                </p>
              </article>
              <article>
                <span>Our mission</span>
                <Title level={3}>Solutions backed by unwavering support.</Title>
                <p>
                  We build long-term relationships through innovation, trust,
                  collaboration and mutual growth.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="container">
            <div className="section-heading">
              <div>
                <span>What JAD offers</span>
                <Title level={2}>Integrated media services</Title>
              </div>
              <Link href="mailto:jadmultimediaproduction@gmail.com">
                Start a project <Icon name="arrow" size={16} />
              </Link>
            </div>
            <div className="services-grid">
              {services.map((service) => (
                <Link
                  className="service-card"
                  href={`#service-${service.number}`}
                  key={service.number}
                  onClick={(event) => {
                    event.preventDefault()
                    setSelectedStory(null)
                    setActivePage({
                      eyebrow: `Service ${service.number}`,
                      title: service.title,
                      body: service.details,
                      action: {
                        label: "Discuss this service",
                        href: `mailto:jadmultimediaproduction@gmail.com?subject=${encodeURIComponent(service.title)}`,
                      },
                    })
                  }}
                >
                  <span className="service-card__number">{service.number}</span>
                  <Title level={3}>{service.title}</Title>
                  <p>{service.summary}</p>
                  <span className="service-card__link">
                    Learn more <Icon name="arrow" size={15} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="container leadership-section">
          <div className="section-heading">
            <div>
              <span>Company leadership</span>
              <Title level={2}>Vision backed by experience</Title>
            </div>
          </div>
          <div className="leadership-grid">
            <article className="leader-card">
              <img src="/jake-flores.jpeg" alt="Jake G. Flores" />
              <div>
                <span>Chairman</span>
                <Title level={3}>Jake G. Flores</Title>
                <p>
                  A visionary leader guiding innovative strategy and effective
                  company governance.
                </p>
              </div>
            </article>
            <article className="leader-card">
              <img src="/adrian-tolentino.jpg" alt="Adrian F. Tolentino" />
              <div>
                <span>Chief Finance Officer</span>
                <Title level={3}>Adrian F. Tolentino</Title>
                <p>
                  Responsible for financial planning, risk management,
                  record-keeping and reporting.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="container credentials-section">
          <div className="office-card">
            <div>
              <span className="eyebrow">Visit our office</span>
              <Title level={2}>JAD Multimedia Production</Title>
              <p>
                Unit 19, 2nd Floor, L Plaza Building, Barangay Lagundi, Mexico,
                Pampanga
              </p>
              <p>
                0917 791 4130 <span>•</span> (045) 901-9619
              </p>
              <Link href="mailto:jadmultimediaproduction@gmail.com">
                jadmultimediaproduction@gmail.com
                <Icon name="arrow" size={16} />
              </Link>
            </div>
            <img src="/jad-location.png" alt="JAD office at L Plaza Mexico" />
          </div>
        </section>

        <section className="container sponsor-banner" id="advertise">
          <div>
            <span>Partner with JAD</span>
            <Title level={2}>
              Put your message in front of people who pay attention.
            </Title>
          </div>
          <Link
            href="#media-kit"
            onClick={(event) => openPageFromLink(event, "advertise")}
          >
            View media kit <Icon name="arrow" size={17} />
          </Link>
        </section>
      </main>

      {(selectedStory || activePage) && (
        <div
          className="reader-backdrop"
          role="presentation"
          onClick={closeReader}
        >
          <section
            className="reader"
            role="dialog"
            aria-modal="true"
            aria-label={selectedStory?.title ?? activePage?.title}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="reader__top">
              <Link
                className="reader__brand"
                href="#top"
                onClick={(event) => {
                  event.preventDefault()
                  closeReader()
                }}
              >
                JAD<span>NEWS</span>
              </Link>
              <Button
                className="reader__close"
                ariaLabel="Close content"
                onClick={closeReader}
              >
                <Icon name="close" size={21} />
              </Button>
            </div>

            {selectedStory ? (
              <article className="reader__article">
                <span className="eyebrow">{selectedStory.category}</span>
                <Title level={1}>{selectedStory.title}</Title>
                <div className="reader__meta">
                  <span>By JAD Newsroom</span>
                  <span>{selectedStory.time}</span>
                </div>
                <img src={selectedStory.image} alt="" />
                <p className="reader__standfirst">
                  {selectedStory.summary ??
                    "JAD News brings you the context behind today's essential stories."}
                </p>
                {(
                  selectedStory.body ?? [
                    "Our newsroom is following this story and gathering the facts, voices and local context readers need.",
                    "Check back for updates as new verified information becomes available.",
                  ]
                ).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <AdSlot />
              </article>
            ) : (
              activePage && (
                <div className="reader__page">
                  <span className="eyebrow">{activePage.eyebrow}</span>
                  <Title level={1}>{activePage.title}</Title>
                  {activePage.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {activePage.action && (
                    <Link
                      className="reader__action"
                      href={activePage.action.href}
                    >
                      {activePage.action.label}
                      <Icon name="arrow" size={17} />
                    </Link>
                  )}
                  {activePage.items && (
                    <div className="reader__results">
                      {activePage.items.map((story) => (
                        <StoryCard
                          story={story}
                          onOpen={openStory}
                          key={`${story.category}-${story.title}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
          </section>
        </div>
      )}

      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <Link
              className="brand brand--footer"
              href="/"
              onClick={(event) => {
                event.preventDefault()
                navigateView("home")
              }}
            >
              <img src="/jad-logo.png?v=2" alt="JAD Multimedia" />
              <span>
                <strong>
                  JAD<span>NEWS</span>
                </strong>
              </span>
            </Link>
            <p>
              Independent reporting for the Philippines and the world. Clarity,
              context and community — every day.
            </p>
          </div>
          <div>
            <Title level={3}>Sections</Title>
            {["Philippines", "World", "Business", "Sports"].map((item) => (
              <Link
                href={`#${item.toLowerCase()}`}
                key={item}
                onClick={(event) => openCategory(event, item)}
              >
                {item}
              </Link>
            ))}
          </div>
          <div>
            <Title level={3}>Company</Title>
            <Link
              href="#contact"
              onClick={(event) => openPageFromLink(event, "contact")}
            >
              Contact
            </Link>
            <Link
              href="#advertise"
              onClick={(event) => openPageFromLink(event, "advertise")}
            >
              Advertise
            </Link>
            <Link
              href="/services"
              onClick={(event) => openCategory(event, "Services")}
            >
              Services
            </Link>
            <Link
              href="#privacy"
              onClick={(event) => openPageFromLink(event, "privacy")}
            >
              Privacy
            </Link>
          </div>
          <div>
            <Title level={3}>Follow JAD</Title>
            <div className="socials">
              <Link href="https://www.facebook.com/">
                <Icon name="facebook" />
              </Link>
              <Link href="https://www.youtube.com/">
                <Icon name="youtube" />
              </Link>
              <Link href="https://www.instagram.com/">
                <Icon name="instagram" />
              </Link>
            </div>
          </div>
        </div>
        <div className="container footer__bottom">
          <p>© 2025 JAD Multimedia Production. All rights reserved.</p>
          <p>Reporting with purpose.</p>
        </div>
      </footer>
    </div>
  )
}
