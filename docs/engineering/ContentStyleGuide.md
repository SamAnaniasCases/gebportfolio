# Content & Writing Style Guide

**Status:** Active  
**Owner:** Sam Ananias Cases  
**Version:** 1.0.0  
**Last reviewed:** 2026-07-25  
**Review cycle:** At least once per year or after a major change in professional direction

---

## 1. Purpose

This document defines the official content and writing standards for the personal portfolio of Sam Ananias Cases.

It exists to ensure that every page, project description, case study, button, tooltip, status message, and small piece of interface copy feels as though it comes from the same person—even when different developers or AI assistants contribute over time.

The portfolio should accurately reflect the author’s current experience, values, interests, and way of thinking. It should not create an exaggerated professional identity for the sake of appearing more impressive.

The central principle is:

> Be clear about what was built, honest about what was learned, and specific about the decisions behind the work.

Consistency does not mean every sentence must sound identical. It means every piece of content should share the same underlying character:

- Human
- Honest
- Thoughtful
- Curious
- Calm
- Approachable
- Evidence-driven
- Professional without being corporate
- Confident without being arrogant

---

## 2. Scope and authority

This guide governs all public-facing language in the portfolio, including:

- Page titles and headings
- Hero copy
- Biographical content
- Project summaries
- Case studies
- Research descriptions
- Experience entries
- Navigation labels
- Buttons and links
- Cards
- Tooltips
- Form labels
- Empty states
- Error and success messages
- Loading messages
- Footer text
- Metadata and social previews
- Accessibility labels
- Console messages
- Easter eggs
- Documentation written for portfolio visitors

When content guidance conflicts, use the following order:

1. Verified facts about the author, project, or experience
2. This Content & Writing Style Guide
3. Approved page or feature specifications
4. Content schemas and field constraints
5. Existing published content
6. Personal preference for a particular sentence

Architecture Decision Records remain authoritative for technical architecture. This guide is authoritative for how that architecture and its outcomes are communicated.

Existing content is not automatically correct simply because it already exists. If existing copy conflicts with this guide, revise it when the relevant page is next reviewed.

---

## 3. Author positioning

### 3.1 Current identity

The portfolio represents a recent graduate who is still early in the software development journey.

The author should be presented as someone who:

- Enjoys building and understanding software
- Thinks carefully before implementing
- Values maintainability and clear documentation
- Considers trade-offs instead of treating every decision as obvious
- Learns through projects, experiments, research, and reflection
- Uses AI responsibly as part of the development workflow
- Reviews and validates work rather than accepting generated output blindly
- Is honest about current strengths and areas still being developed

### 3.2 What the portfolio must not imply

The portfolio must not portray the author as:

- A senior engineer
- A software architect by professional title
- An industry authority
- A technical leader without supporting experience
- An expert in every technology listed
- An experienced professional with invented years of employment
- The sole creator of collaborative work
- Someone with production-scale experience that cannot be demonstrated

Words such as _expert_, _master_, _veteran_, _world-class_, _industry-leading_, and _seasoned professional_ require unusually strong evidence. They should generally not be used.

### 3.3 Intended impression

Visitors should leave with the impression that the author is:

- Serious about learning
- Careful with implementation
- Capable of explaining decisions
- Willing to verify assumptions
- Honest about limitations
- Comfortable documenting work
- Curious about how systems fit together
- Ready to contribute and continue growing

The goal is not to appear further ahead than reality. The goal is to make the current stage of the journey credible, clear, and worth following.

---

## 4. Core writing philosophy

### 4.1 Authenticity before impression

Write to communicate what is true, not what sounds impressive.

A smaller claim supported by evidence is stronger than a large claim supported only by adjectives.

**Prefer:**

> I used Astro’s static rendering model to keep most pages free from unnecessary client-side JavaScript.

**Avoid:**

> I engineered a revolutionary, next-generation web platform with unmatched performance.

The first statement explains a real decision. The second relies on inflated language and cannot be meaningfully verified.

### 4.2 Evidence before adjectives

Whenever possible, replace self-evaluative adjectives with observable actions, decisions, or outcomes.

**Prefer:**

> I added Playwright tests for navigation, search, and theme behavior.

**Avoid:**

> I am highly skilled at software testing.

**Prefer:**

> The content model uses validated schemas for projects, posts, research, skills, and experience.

**Avoid:**

> The portfolio has a powerful and advanced content system.

Evidence allows visitors to form their own judgment.

### 4.3 Clarity before cleverness

The reader should understand the message on the first pass.

Personality, chess references, and technical details are welcome only when they preserve clarity. If a metaphor or joke makes the sentence harder to understand, remove it.

### 4.4 Explanation before performance

The portfolio should explain thought processes without turning every page into a technical lecture.

Use enough detail to answer:

- What was the problem?
- Why did it matter?
- What approach was chosen?
- What trade-offs were considered?
- What was the result?
- What was learned?

Do not include complexity merely to demonstrate that complexity exists.

### 4.5 Reflection without self-deprecation

It is acceptable to discuss mistakes, uncertainty, and lessons. This makes the work more credible.

However, honesty should not become unnecessary self-criticism.

**Prefer:**

> My first approach coupled the content too closely to the page layout. I later moved it into validated collections so it could be reused more safely.

**Avoid:**

> My first implementation was terrible because I did not know what I was doing.

Discuss the limitation, correction, and lesson. Do not insult past work or undermine genuine progress.

---

## 5. Voice

The portfolio voice is the stable personality behind all content.

### 5.1 Voice attributes

| Attribute       | Meaning                                                                  |
| --------------- | ------------------------------------------------------------------------ |
| Human           | Sentences should sound written by a real person with genuine experience. |
| Honest          | Claims must match available evidence and current experience.             |
| Thoughtful      | Important decisions should include reasoning, not only conclusions.      |
| Curious         | Learning and investigation should be treated as strengths.               |
| Calm            | Avoid hype, urgency, and excessive excitement.                           |
| Approachable    | Explain ideas without making readers feel excluded.                      |
| Precise         | Use specific facts, technologies, decisions, and outcomes.               |
| Reflective      | Discuss lessons and improvements where they add value.                   |
| Professional    | Maintain respect, clarity, and care without sounding corporate.          |
| Lightly playful | Allow occasional humor or chess references in appropriate places.        |

### 5.2 Voice versus tone

The voice remains consistent, but tone changes according to context.

| Context         | Appropriate tone                        |
| --------------- | --------------------------------------- |
| Hero            | Clear, warm, and quietly confident      |
| About page      | Personal, reflective, and honest        |
| Project summary | Direct, concrete, and outcome-focused   |
| Case study      | Analytical, transparent, and structured |
| Research        | Careful, curious, and precise           |
| Experience      | Factual, respectful, and evidence-based |
| Error message   | Calm, helpful, and non-judgmental       |
| Empty state     | Friendly and lightly playful            |
| Contact page    | Open, respectful, and low-pressure      |
| Documentation   | Structured, concise, and explanatory    |
| 404 page        | Helpful first, playful second           |

---

## 6. Tone boundaries

### 6.1 The portfolio should sound like

- A developer explaining work to an interested visitor
- A thoughtful conversation with another developer
- A clear walkthrough for a hiring manager
- An honest reflection on a project
- A calm explanation of a technical decision
- A person who is still learning but takes the work seriously

### 6.2 The portfolio should not sound like

- Corporate advertising
- A startup landing page selling exaggerated outcomes
- A résumé made entirely of buzzwords
- A generic AI-generated biography
- An academic paper
- Internal technical documentation copied without adaptation
- A social media post
- A motivational speech
- A comedy page
- A senior professional speaking beyond demonstrated experience

### 6.3 Words and phrases to avoid

Avoid these unless they are part of a quotation or can be specifically demonstrated:

- Cutting-edge
- Revolutionary
- Game-changing
- World-class
- Best-in-class
- Industry-leading
- Rock star
- Ninja
- Guru
- Thought leader
- Disruptive
- Innovative solution
- Seamless experience
- Leveraged synergies
- Robust and scalable, without explaining how
- Passionate developer, without supporting context
- Results-driven, without describing results
- Pixel-perfect
- Expert
- Mastered
- Flawless
- Bug-free
- Production-ready, unless the production criteria are defined and met

Also avoid vague filler such as:

- Various technologies
- Many projects
- Numerous improvements
- A lot of experience
- And much more
- State-of-the-art tools

Name the relevant technology, project, improvement, or experience instead.

---

## 7. Perspective and grammar

### 7.1 Use first person for personal work

Use `I` when describing personal decisions, learning, and responsibility.

**Preferred:**

> I chose static generation because the portfolio does not require a runtime database.

Avoid referring to the author in the third person throughout normal page copy unless structured metadata or a formal biography requires it.

### 7.2 Use `we` only for genuine collaboration

Do not use `we` to make an individual project sound like a company or team.

Use `we` only when describing work completed with actual collaborators. Clearly state the author’s individual contribution.

### 7.3 Prefer active voice

**Prefer:**

> I tested the navigation with Playwright.

**Avoid:**

> The navigation was tested using Playwright.

Passive voice is acceptable when the action matters more than the actor, but it should not hide responsibility.

### 7.4 Use natural contractions

Contractions such as `I’m`, `I’ve`, `don’t`, and `it’s` are acceptable in conversational content.

Use fewer contractions in formal research summaries, decision records, and technical specifications.

### 7.5 Keep sentences focused

Prefer one main idea per sentence. Break apart sentences that contain several qualifications, claims, or technical concepts.

Paragraphs should generally contain two to four sentences. Long paragraphs should be divided by idea rather than by arbitrary length.

### 7.6 Use sentence case

Use sentence case for:

- Headings
- Buttons
- Navigation labels
- Form labels
- Tooltips
- Status messages

**Prefer:**

> View case study

**Avoid:**

> View Case Study

Title case may be used for the official title of a project, article, publication, or named document.

### 7.7 Punctuation

- Use the Oxford comma in lists.
- Use exclamation marks sparingly.
- Do not use repeated punctuation.
- Avoid decorative ellipses unless they communicate a genuine pause or loading state.
- Use em dashes sparingly. A period is often clearer.
- Do not place periods at the end of buttons or short navigation labels.
- Use periods in complete error, empty-state, and explanatory sentences.

---

## 8. Plain-language and technical communication

### 8.1 Write for mixed audiences

The portfolio serves:

- Recruiters
- Hiring managers
- Clients
- Developers
- Students
- Non-technical visitors

Do not assume that every visitor understands framework names, rendering models, testing terminology, or architectural patterns.

### 8.2 Introduce technical concepts through purpose

Explain why a technology or pattern matters before expanding on how it works.

**Prefer:**

> Most pages are generated ahead of time, which reduces the amount of work required in the visitor’s browser. Astro provides the static-generation model behind this approach.

**Avoid:**

> The application uses an Astro SSG architecture with selectively hydrated islands.

The technical version may follow the plain-language explanation when the audience benefits from the detail.

### 8.3 Define uncommon terms

At first use, briefly explain terms that may be unfamiliar:

> A content collection is a group of structured files checked against a shared schema.

Do not define familiar words unnecessarily or make explanations feel patronizing.

### 8.4 Use progressive disclosure

Present information in layers:

1. Plain-language summary
2. Important decision or result
3. Technical details
4. Links to deeper documentation

This allows non-technical visitors to understand the work while giving developers access to implementation depth.

---

## 9. Authenticity and claim standards

### 9.1 Every claim needs a basis

A claim should be supported by at least one of the following:

- Source code
- A working demonstration
- Test results
- Documentation
- A repository history
- A certificate or official record
- A named project
- A clearly described personal observation
- A measurable and reproducible result

If evidence is unavailable, reduce the strength of the claim or describe it as a goal.

### 9.2 Distinguish facts, interpretations, and goals

**Fact:**

> The project uses Playwright for browser-level tests.

**Interpretation:**

> This gives me more confidence that important navigation behavior continues to work.

**Goal:**

> I want to expand the test coverage as the portfolio gains more interactive features.

Do not present goals as completed outcomes.

### 9.3 Use experience labels accurately

Clearly distinguish among:

- Professional employment
- Internship experience
- Freelance or client work
- Academic work
- Personal projects
- Volunteer work
- Experiments
- Tutorials or guided exercises
- Research
- Contributions to collaborative projects

A personal project should not be written as professional employment. A guided tutorial should not be presented as an independently designed system.

### 9.4 Describe skills through evidence

Avoid arbitrary percentages, star ratings, or unsupported proficiency levels.

**Prefer:**

> Used TypeScript strict mode to define content schemas and component interfaces across the portfolio.

**Avoid:**

> TypeScript — 90%

### 9.5 Do not invent metrics

Never invent:

- Performance improvements
- User counts
- Conversion rates
- Time saved
- Accessibility scores
- Test coverage
- Contribution counts
- Lines of code
- Business outcomes

If a metric is approximate, label it as approximate and explain how it was obtained.

### 9.6 Use careful status language

Use status terms consistently:

- **Planned:** Approved or intended but not started
- **In progress:** Currently being implemented or researched
- **Completed:** The defined scope has been finished
- **Verified:** The relevant checks have been run successfully
- **Published:** Publicly available
- **Archived:** Retained for reference but no longer active

Do not use _completed_ when the feature exists but has not passed its defined verification process.

---

## 10. AI usage and disclosure

### 10.1 Position AI as a tool and development partner

The portfolio may openly acknowledge AI-assisted work. There is no need to hide AI usage or make it the main identity of the project.

Appropriate uses include:

- Exploring approaches
- Brainstorming
- Research assistance
- Drafting documentation
- Reviewing copy
- Decomposing tasks
- Generating implementation options
- Identifying possible edge cases
- Refining code after review

### 10.2 Preserve human ownership

Content should make clear that the author remains responsible for:

- Defining the problem
- Selecting the final approach
- Evaluating trade-offs
- Deciding the architecture
- Reviewing generated output
- Testing implementations
- Verifying claims
- Accepting the final result

### 10.3 Preferred AI language

**Good:**

> I used AI to explore implementation options and identify edge cases. I reviewed the alternatives, selected the final approach, and verified the behavior through tests.

**Good:**

> AI assisted with the initial documentation structure. I revised the content to match the project’s actual decisions and constraints.

**Good:**

> AI accelerated parts of the research and iteration process, while final decisions and verification remained my responsibility.

### 10.4 AI language to avoid

**Bad:**

> AI built this portfolio for me.

**Bad:**

> This entire project was generated automatically.

**Bad:**

> AI handled all of the complex work.

**Bad:**

> I built everything myself.

The final example is also misleading when AI materially contributed to the workflow.

### 10.5 Disclosure frequency

Do not insert an AI disclaimer into every page or project card.

Mention AI when:

- It materially affected the workflow
- The case study discusses process
- AI usage is relevant to a decision
- Transparency would help the reader understand authorship
- A dedicated methodology section exists

AI disclosure should be factual, proportional, and free from defensiveness.

---

## 11. Documentation philosophy

Documentation is part of the work, not decoration added after implementation.

The portfolio values:

- Architecture documents
- Sources of truth
- Design specifications
- Implementation plans
- Changelogs
- Decision records
- Verification notes
- Post-project reflections

### 11.1 Why documentation matters

Documentation should help:

- Preserve the reason behind decisions
- Reduce repeated investigation
- Make future changes safer
- Separate requirements from implementation
- Give collaborators and AI assistants reliable context
- Show how the project evolved
- Make assumptions visible
- Help the author learn from previous decisions

### 11.2 How documentation should appear publicly

Do not present raw internal documentation without context.

When linking to a specification or decision record, explain:

- What the document governs
- Why it was created
- What decision or problem it addresses
- Whether it is current, historical, or superseded

**Prefer:**

> Before implementing the homepage, I wrote an information architecture specification to define its audience, section order, content limits, and accessibility requirements.

**Avoid:**

> See specification 0001.

### 11.3 Documentation should not be used to inflate complexity

The number of documents is not itself an achievement.

Focus on what the documentation made clearer, safer, or easier to maintain.

**Prefer:**

> The decision record explains why the project uses static generation and what limitations come with that choice.

**Avoid:**

> The project includes an extensive enterprise-grade documentation ecosystem.

### 11.4 Keep public and internal writing distinct

Public portfolio writing should summarize the important reasoning.

Internal documentation may contain:

- Detailed requirements
- Implementation constraints
- File paths
- Test procedures
- Migration steps
- Historical context

Do not force every visitor to read implementation-level documentation to understand a project.

---

## 12. Content standards by surface

## 12.1 Hero section

### Purpose

The hero should quickly explain:

- Who the author is
- What the author builds or studies
- What makes the approach distinctive
- Where the visitor should go next

### Tone

Clear, warm, direct, and quietly confident.

### Recommended length

- Eyebrow: 4–12 words
- Headline: 6–14 words
- Supporting copy: 20–45 words
- Primary actions: 2–4 words each
- Maximum actions: 2 primary actions, with an optional low-emphasis link

### Include

- Current professional or educational positioning
- Primary area of interest
- A concrete working philosophy
- A clear next step

### Avoid

- Life story
- Long technology lists
- Unsupported claims
- Generic greetings
- Multiple competing messages
- Titles that imply unearned seniority

### Good example

> **Building software with thought before code.**  
> I’m a recent Computer-focused Industrial Technology graduate exploring maintainable web development, accessible interfaces, and carefully documented engineering decisions.

### Bad example

> **Visionary software architect transforming ideas into revolutionary digital experiences.**  
> I leverage cutting-edge technologies to create world-class solutions that disrupt industries.

The bad example exaggerates experience and communicates no verifiable information.

---

## 12.2 About page

### Purpose

Explain the person behind the work, the current stage of the journey, and the values guiding future growth.

### Tone

Personal, reflective, approachable, and honest.

### Recommended length

Approximately 400–900 words, divided into short sections.

### Include

- Current background
- Education or relevant path into development
- Genuine interests
- How the author approaches problems
- What the author is learning
- What kind of opportunities or collaboration may be relevant
- A limited amount of personal context where comfortable

### Avoid

- Repeating the résumé word for word
- A complete chronological autobiography
- Generic passion statements
- Self-assigned senior titles
- Overly personal information
- Claims without examples

### Good example

> I’m still early in my development journey, so I approach projects as opportunities to build and to understand. I enjoy the implementation itself, but I’m equally interested in the decisions around it: what belongs in the system, what can remain simple, and how the reasoning can be preserved for future changes.

### Bad example

> I have always been a technology enthusiast with an unmatched passion for innovation and solving complex problems.

The bad example could describe almost anyone and provides no personal evidence.

---

## 12.3 Project descriptions

### Purpose

Help visitors decide whether they want to open the complete case study.

### Tone

Concrete, concise, and outcome-oriented.

### Recommended length

- Title: 2–8 words
- Summary: 25–60 words
- Outcomes: 2–4 bullets
- Technology list: only technologies materially used

### Include

- What the project is
- What problem or need it addresses
- The author’s role
- Current status
- One meaningful technical or design characteristic

### Avoid

- Full implementation history
- Exhaustive package lists
- Vague claims such as “modern and powerful”
- Technologies that were only briefly explored
- Outcomes that have not been verified

### Good example

> A statically generated portfolio built to document projects, experiments, and engineering decisions. It uses validated content collections and selectively hydrated interactions to keep most pages lightweight.

### Bad example

> A cutting-edge portfolio platform built with the latest and greatest technologies for maximum scalability and performance.

---

## 12.4 Case studies

### Purpose

Show how the author approaches a real problem from context through reflection.

### Tone

Analytical, transparent, and readable.

### Recommended length

Approximately 800–2,500 words, depending on project complexity.

### Recommended structure

1. Summary
2. Context
3. Problem
4. Constraints
5. Role and responsibilities
6. Approach
7. Important decisions
8. Alternatives considered
9. Implementation
10. Verification
11. Outcome
12. Limitations
13. Lessons learned
14. Next steps

### Include

- The author’s specific contribution
- Constraints and uncertainties
- Decisions and their reasoning
- Trade-offs
- What was tested
- What did not work
- What changed during implementation
- Honest limitations
- Evidence or links where available

### Avoid

- Retelling the commit history
- Hiding mistakes
- Presenting every choice as obviously correct
- Claiming team accomplishments as individual work
- Excessive code without explanation
- Treating unfinished goals as completed results

### Good example

> I initially considered adding a runtime database for project content. The portfolio did not require user-generated data, so that approach would have introduced deployment and maintenance work without solving a current problem. I kept the content in version-controlled files instead.

### Bad example

> I selected the optimal architecture and implemented it flawlessly.

---

## 12.5 Research content

### Purpose

Document investigation, questions, methods, findings, and uncertainty.

### Tone

Curious, careful, and precise.

### Recommended length

- Abstract: 75–150 words
- Research note: 600–2,000 words
- Full report: As required by the subject

### Include

- Research question
- Motivation
- Scope
- Method
- Sources
- Findings
- Limitations
- Current status
- Unanswered questions

### Avoid

- Presenting exploration as peer-reviewed research
- Claiming certainty beyond the evidence
- Hiding contradictory findings
- Copying academic language unnecessarily
- Using technical complexity to appear authoritative

### Good example

> This experiment explores whether Astro’s content model can support a small Git-managed portfolio without a runtime database. The result reflects this project’s requirements and should not be treated as a general benchmark for every content platform.

### Bad example

> This research conclusively proves that static content systems are superior to databases.

---

## 12.6 Experience entries

### Purpose

Describe relevant work, education, internships, volunteer activity, and project responsibilities accurately.

### Tone

Factual, concise, and respectful.

### Recommended length

- Summary: 30–70 words
- Achievements: 2–5 bullets
- Each bullet: approximately 10–25 words

### Include

- Organization or context
- Accurate role
- Dates
- Employment or activity type
- Responsibilities
- Contributions
- Tools materially used
- Outcomes that can be supported

### Avoid

- Inflated titles
- Responsibilities not personally held
- Invented business outcomes
- Listing routine participation as leadership
- Hiding whether an experience was academic, personal, or professional

### Good example

> Built and documented a project prototype as part of an academic requirement, with responsibility for the interface structure, content model, and implementation testing.

### Bad example

> Led cross-functional engineering efforts and delivered enterprise-grade solutions.

---

## 12.7 Navigation labels

### Purpose

Help visitors predict where a link will lead.

### Tone

Neutral, familiar, and direct.

### Recommended length

One or two words whenever possible.

### Prefer

- Home
- Projects
- Experience
- Writing
- Research
- Lab
- About
- Contact
- Search

### Avoid

- Clever labels that hide meaning
- Long phrases
- Unexplained chess terminology as the only label
- Different labels for the same destination

### Good example

> Projects

### Bad example

> My strategic moves

Chess imagery may accompany navigation, but the text label must remain understandable.

---

## 12.8 Cards

### Purpose

Provide a scannable preview that helps visitors decide whether to continue.

### Tone

Concise and specific.

### Recommended length

- Eyebrow: 2–6 words
- Title: 3–10 words
- Description: 20–50 words
- Metadata: only what helps the decision

### Include

- Clear title
- One central idea
- Relevant status or date
- A destination or next action

### Avoid

- Multiple paragraphs
- Repeating the page heading
- Excessive tags
- Descriptions that end without communicating value

### Good example

> **Portfolio content architecture**  
> A Git-managed content system with validated schemas for projects, posts, research, and experience.

### Bad example

> **Amazing project**  
> Click here to learn more about this incredible project and all of its features.

---

## 12.9 Buttons and action links

### Purpose

Tell visitors exactly what will happen.

### Tone

Direct and action-oriented.

### Recommended length

Two to five words.

### Use verb-first labels

- View case study
- Explore projects
- Read the specification
- Download résumé
- Send message
- Copy email address
- Return home
- Try again

### Avoid

- Click here
- Learn more, when a more specific label is possible
- Submit, when the specific action can be named
- Go
- Continue, without context
- Clever chess labels for important actions

### Good example

> View case study

### Bad example

> Make your next move

The bad example fits the theme but does not clearly describe the action.

---

## 12.10 Tooltips

### Purpose

Provide optional clarification for an icon, unfamiliar control, or secondary detail.

### Tone

Short, literal, and helpful.

### Recommended length

Two to ten words. Use one short sentence only when necessary.

### Include

- The control’s purpose
- A keyboard shortcut when relevant
- Clarification not already visible

### Avoid

- Essential instructions
- Long explanations
- Humor that hides meaning
- Repeating the visible label

### Good example

> Switch to dark theme

### Bad example

> Enter the dark side of the board

A playful tooltip may be used only when the control’s meaning is already unambiguous from another accessible label.

---

## 12.11 Empty states

### Purpose

Explain why no content appears and what the visitor can do next.

### Tone

Friendly, calm, and occasionally playful.

### Recommended length

One heading and one or two short sentences.

### Include

- What is missing
- Whether this is expected
- A useful next action, if available

### Good example

> **No research notes yet**  
> I’m still developing this part of the portfolio. In the meantime, the lab contains smaller experiments and learning notes.

### Good playful example

> **No moves recorded yet**  
> This project is still in its opening phase. Progress will appear here as the work develops.

### Bad example

> Nothing here lol.

---

## 12.12 Error messages

### Purpose

Explain what went wrong and help the visitor recover.

### Tone

Calm, respectful, and non-technical.

### Recommended length

One short sentence plus a recovery action.

### Include

- What could not be completed
- What the visitor can do
- Whether their input was preserved, when relevant

### Avoid

- Blaming the visitor
- Raw stack traces
- Internal error codes without explanation
- Jokes during serious failures
- Vague messages such as “Something happened”

### Good example

> The message could not be sent. Your text is still here, so you can try again.

### Bad example

> Error 500: Invalid request payload.

---

## 12.13 Loading messages

### Purpose

Confirm that the system is working when an action takes noticeable time.

### Tone

Brief and neutral.

### Recommended length

One to five words.

### Prefer

- Loading projects…
- Preparing results…
- Sending message…
- Checking activity…

### Optional playful use

For a non-critical chess interaction:

> Calculating the position…

Do not use a themed message if it makes the current operation unclear.

### Avoid

- Fake progress
- Long jokes
- Repeated changing messages
- Claims about speed

---

## 12.14 Footer

### Purpose

Provide orientation, ownership, useful links, and a quiet closing note.

### Tone

Simple, personal, and understated.

### Recommended length

One or two short lines plus navigation or legal links.

### Good example

> Designed, built, and documented by Sam Ananias Cases.  
> Still learning. Still refining the position.

### Bad example

> Crafted with passion, innovation, coffee, and endless lines of code to change the world.

Avoid automatically using phrases such as “made with coffee” unless they are personally meaningful and still fit the professional tone.

---

## 12.15 Contact page

### Purpose

Make it easy for visitors to understand why and how to make contact.

### Tone

Welcoming, respectful, and low-pressure.

### Recommended length

Approximately 100–250 words before the form or contact methods.

### Include

- Appropriate reasons to get in touch
- Available contact channels
- A realistic expectation about responses, if needed
- Privacy information when collecting form data

### Avoid

- Desperate job-seeking language
- Aggressive sales language
- Promises of immediate availability
- Asking for unnecessary personal information
- Excessive contact methods

### Good example

> I’m open to conversations about entry-level software opportunities, project collaboration, and constructive feedback on my work. Email is the most direct way to reach me.

### Bad example

> Ready to transform your business? Contact me today and let’s build something revolutionary!

---

## 13. Human touch and personality

Personality should appear in small, deliberate moments. It should never compete with the work.

The desired effect is recognition, not performance:

> This feels like a real person made it.

### 13.1 Frequency

- Use no more than one noticeable chess metaphor in a major section.
- Do not place a joke in every card or page.
- Keep most humor in optional or low-risk surfaces.
- Allow serious content to remain serious.
- Never use personality to hide missing information.
- Never sacrifice accessibility or clarity for theme.

### 13.2 Humor

Humor should be:

- Brief
- Observational
- Self-aware without being self-defeating
- Related to development, learning, documentation, or chess
- Understandable without knowledge of a current trend
- Appropriate in a professional interview

**Good examples:**

> Documentation today saves future me from becoming a detective.

> The bug was not in the code. It was in my assumption.

> Every project teaches me something, often one commit later than expected.

> Sometimes the best optimization is deleting code.

**Avoid:**

- Memes
- Internet slang
- Mocking users
- Mocking other developers
- Mocking competing tools
- Jokes about incompetence
- Offensive or exclusionary humor
- Humor in privacy, security, or destructive-action warnings

### 13.3 Chess references

Chess should function as a metaphorical layer, not a vocabulary replacement system.

Appropriate concepts include:

- Strategy before execution
- Thinking ahead
- Every move has a purpose
- Position over speed
- Opening principles
- Calculated risks
- Developing the position
- Reviewing the game
- Long-term planning
- Endgame reflections

**Good:**

> I planned the content model before building the pages. A stable position made the later moves easier.

**Forced:**

> Checkmate your communication goals by castling your project requirements into a winning content strategy.

Use chess language only when the connection is natural and immediately understandable.

### 13.4 Easter eggs

Easter eggs may appear in:

- Hover text
- Optional tooltips
- Console messages
- Empty states
- Loading states
- The 404 page
- Decorative coordinates
- Hidden visual interactions
- Footer details
- Source comments that do not affect users

Easter eggs must:

- Remain optional
- Avoid interfering with navigation
- Avoid hiding required information
- Work with keyboard navigation when interactive
- Respect reduced-motion preferences
- Avoid collecting visitor data
- Remain professional and timeless

### 13.5 Developer jokes

Developer jokes should be understandable without requiring knowledge of a specific programming language or online community.

**Good:**

> Future me left a note. Past me was finally helpful.

**Avoid:**

> It works on my machine ¯\\_(ツ)_/¯

The avoided example is overused, visually noisy, and suggests indifference toward reliability.

### 13.6 Console messages

Console messages are optional and should not create false security warnings or imitate browser errors.

Do not:

- Advertise job openings that do not exist
- Request visitors to paste code
- Print personal data
- Produce repeated logs
- Claim that opening developer tools is suspicious

### 13.7 Hover interactions

Hover copy should supplement an interaction, not contain required information.

Any information revealed on hover must also be available through:

- Keyboard focus
- Touch interaction
- Visible text
- An accessible label

The writing may be slightly playful if the primary meaning is already clear.

### 13.8 The 404 page

The 404 page should first explain that the requested page was not found. Personality comes second.

**Good example:**

> **This move leads off the board.**  
> The page may have moved, changed names, or never existed. Return home or explore the current projects.

**Bad example:**

> Checkmate! You lost.

Never frame a navigation error as the visitor’s failure.

---

## 14. Accessibility and inclusive language

### 14.1 Write for scanning

Use:

- Descriptive headings
- Short paragraphs
- Lists for groups of related information
- Meaningful link text
- Clear status labels
- Consistent terminology

### 14.2 Do not rely on theme knowledge

A visitor should not need to understand chess to navigate or understand the portfolio.

Chess icons must have understandable labels where meaning is not purely decorative.

### 14.3 Avoid ableist and exclusionary language

Do not use disability, mental health, or physical conditions as metaphors for poor software or bad decisions.

Avoid language that assumes:

- Gender
- Age
- Technical ability
- Cultural background
- Device type
- Input method

Use `they` when a person’s pronouns are unknown.

### 14.4 Write meaningful links

**Prefer:**

> Read the portfolio architecture case study

**Avoid:**

> Click here

Link text should make sense when read independently.

### 14.5 Alt text

Alt text should explain the image’s purpose in context.

- Describe meaningful information.
- Keep decorative images silent.
- Do not begin with “Image of” unless the medium itself matters.
- Do not repeat nearby captions.
- For diagrams, provide a concise summary and a longer explanation when necessary.

---

## 15. Metadata and search descriptions

### Page titles

Page titles should be accurate, specific, and understandable outside the website.

**Preferred pattern:**

### Meta descriptions

Recommended length: approximately 120–160 characters.

A meta description should:

- Describe the actual page
- Include the main subject naturally
- Avoid calls to action that overpromise
- Avoid keyword stuffing
- Avoid describing unfinished work as complete

### Social-preview copy

Social-preview text should use the same voice as the website. Do not become more promotional merely because the content appears on social platforms.

---

## 16. Maintenance and future-proofing

This guide is designed to remain useful for at least five years.

### 16.1 Prefer principles over trends

Do not rewrite the portfolio voice to match temporary online writing styles.

Avoid:

- Trend-dependent slang
- Meme formats
- Excessive one-line fragments
- Artificially provocative headings
- Engagement bait
- Overuse of emojis
- Writing designed primarily for algorithms

### 16.2 Allow the author’s positioning to evolve

The author’s experience will change over time. Update factual positioning as new experience is gained, but preserve the foundational voice.

Future growth may justify language such as:

- Software developer
- Frontend developer
- Full-stack developer
- Software engineer
- Technical lead

Use these only when they accurately reflect real work or an official role.

Do not preserve “recent graduate” indefinitely after it stops being useful or accurate. Authenticity requires updating old humility as well as removing exaggeration.

### 16.3 Keep historical case studies historically accurate

Do not rewrite an old project as though the author had current knowledge at the time.

It is appropriate to add a later reflection:

> Looking back, I would now separate this responsibility into a smaller module.

Make clear that this is a later assessment.

### 16.4 Review triggers

Review this guide when:

- The author’s professional role changes significantly
- The target audience changes
- A new major content type is introduced
- The portfolio undergoes a substantial redesign
- Recurring copy inconsistencies appear
- AI-generated content repeatedly requires the same corrections
- The existing voice no longer feels authentic

---

## 17. Contributor rules

Every contributor must:

1. Verify factual claims before publishing.
2. Preserve the author’s early-career positioning unless verified experience changes it.
3. Use first person for the author’s personal decisions.
4. Avoid inventing emotions, motivations, achievements, or outcomes.
5. Keep technical explanations understandable to mixed audiences.
6. Prefer specific evidence over flattering adjectives.
7. Preserve content status accurately.
8. Keep chess references optional and restrained.
9. Use humor only where failure would not harm clarity.
10. Match the purpose and length of the relevant content surface.
11. Keep terminology consistent across pages.
12. Update related content when a factual change affects multiple pages.
13. Flag missing information rather than filling gaps with assumptions.
14. Distinguish editing for clarity from changing the meaning of a claim.
15. Preserve the author’s final authority over personal representation.

---

## 18. AI agent rules

AI assistants may help draft, review, organize, and refine content, but they must not invent the author’s identity or experience.

### 18.1 Required pre-writing process

Before generating or modifying content, an AI assistant must:

1. Read this guide.
2. Read the specification for the relevant page or component.
3. Inspect the current content source.
4. Identify which claims require verification.
5. Determine the audience and content surface.
6. Preserve established terminology.
7. Check whether the content is personal, technical, historical, or status-sensitive.
8. Ask for missing personal facts when they cannot be verified.
9. Avoid changing unrelated content.
10. Preserve the intended meaning while improving clarity.

### 18.2 AI assistants must never

- Invent employment history
- Invent project outcomes
- Invent metrics
- Invent technologies used
- Invent collaborators
- Invent testimonials
- Invent motivations or personal stories
- Upgrade the author’s title
- Present planned work as completed
- Hide material AI involvement when disclosure is relevant
- Add generic praise to make content sound stronger
- Insert chess metaphors into every section
- Add jokes to serious errors or accessibility instructions
- Replace precise content with marketing language
- Assume a technical audience when the page serves general visitors
- copy personal content from unrelated sources
- broaden a claim beyond the available evidence

### 18.3 AI content checklist

Before proposing or publishing copy, confirm:

#### Authenticity

- [ ] Does every factual statement have a reliable basis?
- [ ] Does the content accurately represent the author’s current experience?
- [ ] Does it avoid implying unearned seniority or expertise?
- [ ] Are professional, academic, personal, and collaborative experiences distinguished?
- [ ] Are goals clearly separated from completed results?
- [ ] Are metrics verified?

#### Voice

- [ ] Does this sound human?
- [ ] Does it sound like the same person as the rest of the portfolio?
- [ ] Is it thoughtful without sounding academic?
- [ ] Is it confident without being arrogant?
- [ ] Is it professional without sounding corporate?
- [ ] Has generic AI phrasing been removed?

#### Clarity

- [ ] Can a non-technical visitor understand the main point?
- [ ] Are technical terms explained when necessary?
- [ ] Is the most important information presented first?
- [ ] Are the sentences concise?
- [ ] Can unnecessary words be removed?
- [ ] Does each paragraph have one clear purpose?

#### Personality

- [ ] Is any humor subtle and appropriate?
- [ ] Does a chess reference genuinely fit the context?
- [ ] Would the writing still feel appropriate in a professional interview?
- [ ] Will the reference remain understandable several years from now?
- [ ] Does personality remain secondary to communication?

#### Interface writing

- [ ] Does the button describe the resulting action?
- [ ] Does the error explain how to recover?
- [ ] Does the empty state explain why it is empty?
- [ ] Is essential information available without hover?
- [ ] Does the copy remain understandable without the chess theme?
- [ ] Are labels consistent with the rest of the website?

#### AI disclosure

- [ ] Is AI mentioned only when relevant?
- [ ] Does the wording accurately describe AI’s contribution?
- [ ] Is human responsibility for decisions and validation clear?
- [ ] Does the content avoid implying either full automation or no assistance?

### 18.4 AI final test

Before completing a content task, an AI assistant should ask:

> Could the author comfortably explain and defend every sentence in a professional conversation?

If the answer is no, the content is not ready.

---

## 19. Quick reference

### Always

- Tell the truth
- Show evidence
- Explain important reasoning
- Use clear language
- Respect mixed audiences
- Distinguish current work from future plans
- State the author’s actual contribution
- Keep personality subtle
- Make actions predictable
- Write like a thoughtful person

### Usually

- Use first person
- Use active voice
- Keep paragraphs short
- Explain technical terms through their purpose
- Include limitations and lessons
- Prefer plain language before implementation detail
- Use chess as a light metaphor

### Never

- Invent achievements
- Inflate titles
- Fabricate metrics
- Hide uncertainty
- Present goals as outcomes
- Use corporate filler
- Force humor
- Force chess terminology
- Blame visitors
- Publish AI-generated claims without review
- Sacrifice clarity for personality

---

## 20. The final standard

Every piece of portfolio content should pass three tests.

### The truth test

> Is this accurate, supportable, and honest about the author’s contribution and experience?

### The clarity test

> Can the intended audience understand what this means and why it matters?

### The human test

> Does this sound like a real developer thoughtfully sharing their work?

If content fails any of these tests, revise it before publication.

The portfolio does not need to pretend that the journey is complete. Its value comes from showing how the author thinks, builds, documents, verifies, and improves—one deliberate move at a time.
