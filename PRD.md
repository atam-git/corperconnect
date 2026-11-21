# Product Requirements Document (PRD)
## NYSC Social & Community Platform

**Document status:** Consolidated product definition — draft for design and engineering  
**Version:** 1.0  
**Date:** 16 November 2026  
**Initial market:** Nigeria  
**Product type:** Mobile-first social networking and community platform

---

## Document conventions

This PRD consolidates decisions and recommendations from product discovery. It distinguishes:

- **Agreed baseline:** A product decision explicitly established in the discussion.
- **Recommended:** A proposed default that should guide the MVP unless discovery or implementation reveals a strong reason to change it.
- **To validate:** A dependency or unresolved detail that must be confirmed before implementation.

The PRD is intended to be the product source of truth for subsequent screen-by-screen specifications, technical architecture and delivery planning. It does not assume access to NYSC systems, APIs or official data unless that access is independently confirmed.

# 1. Executive Summary

## 1.1 Product overview

The product is a social and community platform built specifically around the Nigerian National Youth Service Corps (NYSC) experience.

It gives prospective, current and former corps members a digital home to connect, share experiences, discover useful information, participate in communities, find accommodation, buy and sell items, organise events, and preserve relationships formed during their service year.

The platform follows a member through the full NYSC journey:

1. Before orientation camp.
2. During orientation camp.
3. During posting and service at a Place of Primary Assignment (PPA).
4. During Community Development Service (CDS).
5. During redeployment, where applicable.
6. At completion of national service.
7. After passing out, as an alumnus.

The product has two equal pillars:

1. **A social network for corpers:** photos and videos from camp, stories, discussions, questions, polls and communities.
2. **An opportunity marketplace for corpers:** jobs and gigs, items for sale, accommodation and roommates, and events.

Users post whatever they need or want to share. Examples: a camp video, a roommate request, a job lead, an item for sale, a new community. Neither pillar is secondary. Onboarding, navigation, Explore and Create must show both from the first screen.

The product must feel native to the NYSC experience. It should not be a generic social network with an NYSC label, nor a generic classifieds site.

## 1.2 Product vision

To become the digital home of the NYSC experience in Nigeria, connecting corps members across batches, camps and states while preserving the relationships, communities and memories they build during service.

## 1.3 Core value proposition

The product combines two equal pillars, joined by NYSC communities:

- **Social connection:** Share camp photos and videos, experiences, discussions and questions. Follow people and build relationships.
- **Opportunities and marketplace:** Find and share jobs and gigs, accommodation and roommates, items for sale and events across Nigeria.
- **NYSC communities:** Connect with people from the same batch, camp, state, CDS activities and shared interests. Communities carry both social posts and opportunities.

These experiences should reinforce one another rather than operate as unrelated products.

## 1.4 Product principles

1. **NYSC-first:** Product structure, terminology and journeys should reflect the actual NYSC lifecycle.
2. **Two equal pillars:** Social participation and opportunities (jobs, marketplace, accommodation, events) carry equal weight in navigation, onboarding, Explore and Create. Neither is a side feature.
3. **Nationwide discovery:** Explore must expose users to relevant content and opportunities across Nigeria, not only their current state or batch.
4. **Low-friction onboarding:** Users should be able to create an account before they have every NYSC detail.
5. **Trust with clear limits:** Verification confirms membership, not the truthfulness of every post or the legitimacy of every transaction.
6. **Member-led communities:** Corps members can run communities, with platform oversight and clear separation from NYSC authority.
7. **No in-app messaging initially:** Keep interactions centred on posts, comments, community participation and permitted external contact.
8. **Continuity after service:** Passing out changes a member's status, not their right to retain their account and relationships.
9. **MVP before sophistication:** Start with understandable rules and operational tools; improve using actual usage and moderation data.

# 2. Goals, Non-goals and Success Measures

## 2.1 Primary goals

- Give corps members a place to share their NYSC experiences.
- Make it easy to find and connect with people from the same batch, camp and state.
- Encourage meaningful interaction through posts, discussions, comments, reactions and communities.
- Help members discover useful information and people across Nigeria.
- Support practical needs: finding and sharing jobs and gigs, accommodation and roommates, and buying or selling items.
- Make it easy to organise meetups, reunions and other events.
- Preserve friendships, communities and memories beyond the service year.
- Establish a trustworthy environment through membership verification, reporting and moderation.

## 2.2 Non-goals for the initial release

The initial product is not intended to provide:

- Applicant tracking, in-app applications, CV storage or recruiter tooling. Jobs are shared as listings with external contact (see section 11).
- In-app direct messaging or group chat.
- In-app payments, escrow or transaction processing.
- Complex ticketing and event-payment infrastructure.
- A fully automated AI recommendation engine.
- A requirement that NYSC officials manage every community.
- A separate alumni application.
- A mandatory community for every platoon.
- Nationwide physical recruitment of moderators.
- A guarantee that a verified member's listings or claims are legitimate.

## 2.3 Success measures

Instrument and monitor:

**Acquisition and activation**
- Account registrations.
- Registration completion rate.
- Percentage of new users who complete a basic profile.
- Verification submission and approval rates.
- Time from registration to first meaningful action.

**Social engagement**
- Daily and monthly active users.
- Posts, comments, likes and reposts per active user.
- Follow actions and mutual-follow rate.
- Percentage of users who return after their first week.
- Community joins and active participation.

**Discovery**
- Explore searches and result interactions.
- Listing views and saves.
- Event views and interest actions.
- Discovery of people and communities outside the user's immediate state or batch.

**Trust and safety**
- Reports per active user.
- Time to first review and resolution.
- Repeat-offender rate.
- Scam and impersonation reports.
- Appeals and overturned moderation decisions.

**Retention**
- 7-day and 30-day retention.
- Retention across transitions from camp to PPA.
- Continued use after service completion.

Targets should be set after baseline usage data is available rather than inventing arbitrary launch targets.

# 3. Target Users and Personas

## 3.1 Prospective corps member

A person who has registered for NYSC but has not received deployment details or reported to camp.

**Needs**
- Create an account before camp.
- Discover public NYSC content.
- Learn from current and former corps members.
- Prepare for orientation camp.
- Add NYSC details as they become available.

**Access**
- Can browse permitted public content.
- Can complete a profile and submit details.
- Member-only actions remain restricted until verification where appropriate.

## 3.2 Corps member in orientation camp

A newly deployed member attending orientation camp.

**Needs**
- Find people from the same batch and camp.
- Share photos, experiences and stories.
- Follow other corps members.
- Discover camp updates, activities and useful information.
- Participate in discussions and polls.
- See relevant announcements and highlights.

This is a key acquisition and engagement stage because members are actively looking for connections and information.

## 3.3 Corps member serving at a PPA

A member who has completed orientation and started service.

**Needs**
- Stay connected with camp and batch friends.
- Discover people serving in the same state or LGA.
- Find accommodation and potential roommates.
- Buy and sell useful items.
- Share PPA and service experiences.
- Discover local activities and events.
- Participate in CDS-related communities.

## 3.4 Redeployed corps member

A member whose state of deployment changes.

**Needs**
- Update service information without creating another account.
- Discover communities in the new state.
- Find accommodation and local recommendations.
- Retain original batch and camp relationships.
- Have current and historical service details represented accurately.

## 3.5 Alumni

A person who has completed national service.

**Needs**
- Retain their account, posts and connections.
- Participate in their batch community.
- Find former campmates and friends.
- Share memories, advice and experiences.
- Participate in reunions and interest-based communities.
- Display completed-service status accurately.

## 3.6 Community moderator

A verified corps member appointed to manage a particular community.

**Needs**
- Review community reports.
- Remove content that violates community rules.
- Pin useful posts.
- Manage community information.
- Escalate serious issues to platform administrators.

A moderator is not automatically an NYSC official.

## 3.7 Platform administrator or trust-and-safety reviewer

An internal team member responsible for verification, reports, community governance, account actions and platform integrity.

# 4. Product Structure and Navigation

## 4.1 Main navigation

The mobile application has five primary navigation items:

| Navigation | Purpose |
|---|---|
| Home | Personalised social feed |
| Community | Batch, camp, state and interest-based communities |
| Create | Publish social content, listings and events |
| Explore | Nationwide discovery and search |
| Profile | Personal identity, activity and NYSC history |

Notifications should be accessible from a notification icon in the main interface.

## 4.2 Information architecture

**Home**
- For You
- My Batch
- My State
- Followed accounts
- Relevant community highlights
- Important announcements

**Community**
- Official communities
- Member-created communities
- Community feed
- Discussions
- Members
- Pinned announcements

**Create**
- Photo/video post
- Discussion
- Question
- Poll
- Share a job
- Sell an item
- Accommodation
- Create an event

**Explore**
- Trending
- For You
- Nationwide
- Marketplace
- Jobs
- Accommodation
- Events
- Communities
- Search and filters

**Profile**
- Profile overview
- Posts
- Followers
- Following
- Communities
- NYSC journey and milestones
- Account and privacy settings

# 5. Registration, Onboarding and NYSC Verification

## 5.1 Onboarding principles

Onboarding should be progressive. Do not overwhelm users with a long form or require information they do not yet have.

A prospective corps member who has registered for NYSC but has not received a posting should still be able to create an account.

## 5.2 Recommended onboarding flow

1. Welcome and product introduction.
2. Account creation.
3. Basic profile setup.
4. NYSC journey information.
5. Verification submission or later completion.
6. Optional interest selection.
7. Suggested communities and feed setup.

## 5.3 Account creation

Supported initial methods:
- Email and password.
- Phone number with one-time passcode.
- Google sign-in, if supported by the implementation.

Required basic profile fields:
- Full name.
- Unique username.
- Profile photo (may be optional at initial registration).
- Email and/or phone contact for account recovery and security.

Users must accept the terms of service and privacy notice.

## 5.4 NYSC information

Collect information as applicable:
- NYSC batch.
- Stream, where applicable.
- Call-up or service identifier, if required by the chosen verification process.
- State of deployment.
- Orientation camp.
- Current service stage.
- Current state and LGA, where relevant.
- Service status: awaiting deployment, in camp, serving, completed.

Do not collect unnecessary sensitive information. The final list of required verification fields must be reviewed against the actual verification method, privacy obligations and operational need.

## 5.5 Verification approach

Use a combination of:
1. Automated verification against an authorised source, if access is available and permitted.
2. Document-based verification.
3. Manual review by the platform team.

Do not assume that an official NYSC verification API exists or that the company has access to it. Confirm availability and permission before designing an integration.

If automated verification is unavailable, launch with controlled manual verification.

### Verification is separate from sign-up (agreed baseline)

Sign-up must not block access. A new user reaches the app immediately after creating an account, profile and NYSC journey details. Verification is a separate step the user starts later from the "Get verified" banner or from Profile.

- The user uploads a photo of the NYSC ID card issued at camp, plus the call-up number.
- An admin reviews it manually. Approval grants the verified badge and unlocks member-only features.
- The same ID photo is an additional requirement to apply as a community moderator.
- Only authorised verification staff can see the ID. Community moderators and admins of communities never can. It is deleted after the decision.

## 5.6 Verification states

| State | Meaning | Access |
|---|---|---|
| Unverified | No successful verification yet | Browse permitted public content; complete profile |
| Pending | Details submitted and awaiting review | Limited participation |
| Verified | Membership accepted | Full corps-member features |
| Rejected | Submission not accepted | Correct details and resubmit or appeal |
| Alumni | Service completed | Retain account and participate under alumni status |

The UI should explain the current state and the next action clearly.

## 5.7 Feature access by verification state

Recommended policy:
- Browse public Explore content: allowed.
- Create a basic account and profile: allowed.
- Follow users: allowed, subject to anti-spam safeguards.
- Join official NYSC communities: verified members only.
- Create member communities: verified members only.
- Publish marketplace and accommodation listings: verified members only.
- Create events as a corps-member organiser: verified members only.
- Participate in restricted community spaces: verified members only.

The product may allow additional read-only access to public community content before verification.

## 5.8 Verification operations

The admin system must support:
- Review queues.
- View submitted information and permitted evidence.
- Approve or reject submissions.
- Record a reason for rejection.
- Request resubmission.
- Escalate uncertain cases.
- Maintain an audit trail of decisions.
- Limit access to identity documents to authorised staff.
- Define retention and deletion periods for verification evidence.

Verification documents must not be exposed publicly or to community moderators.

## 5.9 Redeployment and corrections

A redeployed member must not create a new account.

The user submits updated service information. The platform reviews or confirms the change and updates the relevant state and camp affiliations while retaining historical information.

The original batch and camp relationship should remain available where relevant.

# 6. Home Feed

## 6.1 Purpose

Home is the personalised view of what is happening across the user's social and NYSC circles.

The guiding distinction is:
- Home tells you what's happening.
- Community tells you where it's happening and who it's happening with.
- Explore tells you what's happening beyond your usual circles.

## 6.2 Feed filters

Recommended filters:
- For You.
- My Batch.
- My State.

Followed-account content must receive meaningful priority in Home. Following someone means the user wants to see that person's content.

## 6.3 Content sources

Home may contain:
1. Posts from followed accounts.
2. Relevant batch content.
3. Relevant camp content.
4. Relevant state content.
5. Posts from communities the user has joined.
6. Recommended content based on interests and activity.
7. Important announcements.

## 6.4 Feed ranking

Initial ranking should use understandable rules rather than a complex AI system.

Factors:
- Whether the author is followed.
- Relevance to batch, camp, state and joined communities.
- Recency.
- Meaningful engagement.
- User interest signals.
- Content quality and safety signals.

Engagement must not be the only ranking factor. Sensational or controversial content should not automatically dominate.

## 6.5 Lifecycle-sensitive content

During orientation camp, Home should surface useful camp-related content such as:
- Daily activities and schedules, when verified and available.
- Camp announcements.
- Parade or competition results, where appropriate.
- Winners and shout-outs.
- Camp experiences and photos.
- Relevant discussions and questions.

At night, lighter social content may naturally become more prominent, such as funny stories, photos and conversations. This is a product opportunity, not a requirement for a time-based algorithm at launch.

After camp, content should naturally include:
- PPA experiences.
- Accommodation and roommate requests.
- Apartment handovers.
- Items for sale.
- Local recommendations.
- Events and meetups.
- CDS experiences.

## 6.6 Feed quality rules

- Avoid showing the same post repeatedly.
- Limit excessive consecutive posts from the same author.
- Avoid flooding Home with near-identical event posts.
- Respect blocks, mutes and visibility settings.
- Label official or authorised announcements distinctly.
- Do not present unverified member claims as official information.

# 7. Community

## 7.1 Purpose

Community is where members participate in focused spaces organised around shared NYSC identity or interests.

Communities are feed-based, not chat-based. The product will not include community chat rooms or group messaging in the initial release.

## 7.2 Community types

### A. Platform-created official communities

These are created and managed by the platform.

Examples:
- Batch A 2026.
- Kano Orientation Camp.
- Kano Corps Members.

They are automatically suggested or joined based on verified NYSC details and the platform's membership rules.

Official communities must be protected from impersonation and duplicate member-created equivalents.

Members must not create duplicate official-sounding spaces such as "Batch A 2026 Official" or "Official Kano Orientation Camp" without authorisation.

### B. Member-created communities

Any verified corps member may create a community. The person does not need to be a platoon leader or hold an NYSC leadership position.

Examples:
- Tech Corpers.
- Batch A Football Community.
- Corps Members in Nasarawa LGA.
- Photographers in NYSC.
- Anime Fans.
- Roommate Groups.

## 7.3 Community creation requirements

The creation form should collect:
- Community name.
- Description or purpose.
- Category.
- Optional cover image.
- Visibility and joining settings.
- Basic community rules.

Initial safeguards:
- Limit the number of communities a user can create.
- Prevent impersonation of official NYSC spaces.
- Detect or review duplicate names.
- Require a clear purpose.
- Make the creator the initial administrator.
- Provide reporting for problematic communities.

The initial creation limit should be configurable by administrators.

## 7.4 Discovery and joining

Members can discover communities through:
- Explore.
- Search.
- Recommendations.
- Community suggestions.
- Direct invitations and shareable invitation links.

Discovery must not be limited to invitation-only access.

## 7.5 Community membership

A community may support:
- Open joining.
- Request-to-join, where appropriate.
- Invitation-based access, where justified.

The joining model should be visible before a user attempts to join.

## 7.6 Inside a community

Recommended sections:
- Feed.
- Discussions.
- Members.
- Pinned announcements.

The community feed supports:
- Photo and video posts.
- Discussions.
- Questions.
- Polls.
- Comments and likes on social posts.
- Reposts and sharing.
- Saving posts.

Community posts should be clearly associated with their community and author.

## 7.7 Official announcements and misinformation

A member's verified status does not make every claim they publish true.

A post claiming that a parade has been cancelled, for example, remains an ordinary member post unless an authorised source or moderator confirms it.

The platform should distinguish:
- Ordinary member posts.
- Community moderator notices.
- Platform announcements.
- Authorised official announcements, where the platform has a legitimate basis to designate them as such.

Only specifically authorised accounts should be able to publish content carrying an official authority label.

## 7.8 Community moderation governance

Communities should be run primarily by corps members, with platform oversight.

Being a platoon leader or holding another NYSC position must not automatically grant moderator status.

### Moderator recruitment

Candidates may:
- Apply.
- Be nominated by other members.
- Be recommended by the community.

The process should be remotely manageable; the company should not need to physically visit every camp or state.

Applicants may be asked to provide:
- Proof of NYSC membership.
- Relevant community participation history.
- Evidence of leadership or relevant experience, where applicable.

Collect only the evidence necessary and protect sensitive information.

### Selection and approval

The platform team reviews applications and makes the final appointment.

Community polls or voting may be introduced once a community has sufficient size and stability. Member voting should inform recommendations, not automatically confer authority.

Elections may be more appropriate after the initial camp period than during the early, potentially chaotic stage of a batch.

### Moderator permissions

Moderators may:
- Review community reports.
- Remove posts or comments that violate rules.
- Pin appropriate content.
- Manage community rules and descriptions.
- Escalate serious issues.

Moderator permissions apply only to assigned communities.

Moderators do not automatically have authority to:
- Issue platform-wide bans.
- Make official NYSC announcements.
- Access private user information.
- Override platform administrators.

Serious sanctions remain under platform-team control.

### Moderator accountability

- Members can report moderators.
- The platform team reviews moderator complaints.
- Moderator status is periodically reviewed.
- Moderators can be suspended or removed.
- A community can operate without a moderator while platform moderation remains available.

The exact structure of platoon-level communities is not settled and should not be assumed as a launch requirement.

# 8. Create and Publishing

## 8.1 Purpose

Create is the central publishing experience. It should let users select what they intend to share without presenting an unnecessarily complicated composer.

The composer begins with:

**"What would you like to share?"**

Two broad intentions:
1. Share something.
2. Offer or organise something.

## 8.2 Initial creation types

**Social content**
1. Photo/video post.
2. Discussion.
3. Question.
4. Poll.

**Opportunities and listings**
5. Share a job.
6. Sell an item.
7. Accommodation.
8. Create an event.

## 8.3 Photo/video post

Fields and capabilities:
- Photo or video attachment.
- Caption.
- Optional location.
- Destination selection.
- Visibility selection.

## 8.4 Discussion

Supports:
- Text.
- Optional photo or video.
- Community or feed destination.
- Comments and reactions.

## 8.5 Question

Supports:
- Question text.
- Optional supporting media.
- Destination selection.
- Comments and reactions.

## 8.6 Poll

Supports:
- Poll question.
- Multiple answer options.
- Optional description.
- Optional media.
- Configurable poll duration, if implemented.
- One vote per eligible user per poll, unless a future poll type explicitly supports multiple selections.

Ordinary members may create polls. Moderator elections must use a controlled process managed by the relevant community administrators, not an unrestricted ordinary poll.

## 8.6a Share a job

Suggested fields:
- Job title.
- Employer or company.
- Type: full-time, part-time, contract, internship, gig.
- Pay in Nigerian naira and pay period.
- Description, including whether it fits around CDS and PPA hours.
- Location (state and area).
- Optional logo or photo.
- Contact method (WhatsApp or phone, owner's choice).
- Listing status: open, filled, closed.

Rules:
- Applicants are never asked to pay. Listings that charge to apply are removed.
- Applications happen outside the app through the contact method. No CV storage or applicant tracking.

## 8.7 Sell an item

Suggested fields:
- Item title.
- Photos.
- Price in Nigerian naira.
- Description.
- Item condition.
- Location.
- Contact method.
- Listing status.

## 8.8 Accommodation

Suggested fields:
- Property or accommodation title.
- Photos.
- Location.
- Accommodation type.
- Rent or price.
- Relevant fees.
- Description.
- Availability.
- Contact method.
- Listing status.

The form should make recurring rent and additional fees clear so users do not mistake one for another.

## 8.9 Event creation

Suggested fields:
- Event title.
- Description.
- Cover image.
- Date and time.
- Location.
- Organiser information.
- Optional external registration link or contact details.

## 8.10 Publishing destinations

A creator may choose to publish a social post to:
- Home/public feed.
- A selected community.
- Both, where the user's permissions and visibility settings allow.

The same underlying post should be referenced in each relevant surface. The platform must not create duplicate records merely because a post appears in Home, a community and Explore.

Structured listings should also surface in their relevant Explore category and may appear in relevant feeds without creating duplicate listings.

## 8.11 Future creation types

Potential later additions include:
- Service offers.
- Business promotions.
- Lost-and-found notices.

These are not launch requirements and should be added only when there is demonstrated user need.

# 9. Social Interactions and Relationships

## 9.1 Follow model

Follow is the only social relationship action in the initial release.

There is no separate Connect button or connection request.

Following someone means:

**"I want to see your content on my screen."**

Followed accounts receive priority in the user's Home feed.

## 9.2 Mutual follows

If User A follows User B and User B follows User A, the relationship is considered a mutual follow.

This is a derived state, not a separate action or feature.

## 9.3 Relationship lists

Profiles should show:
- Followers: people who follow this user.
- Following: people this user follows.

The intersection of those two lists represents mutual follows.

## 9.4 Social actions

For ordinary social posts:
- Like.
- Comment.
- Repost.
- Share.
- Save.

For structured listings:
- Like.
- Repost or share.
- Save.

**Listings do not have comments.** This is an explicit product decision.

## 9.5 No direct messaging initially

The application will not include direct messaging in the initial release.

This may be reconsidered later based on actual usage. A future mutual-follow messaging rule is a possibility, not an approved launch requirement.

# 10. Explore and Nationwide Discovery

## 10.1 Purpose

Explore is an intentional discovery surface. It must not be restricted to the user's current batch, camp or state.

Users should be able to see what is happening across Nigeria and then narrow results using filters.

## 10.2 Explore sections

Recommended sections:
- For You.
- Trending.
- Nationwide.
- Marketplace.
- Jobs.
- Accommodation.
- Events.
- Communities.

## 10.3 Search coverage

Global search should cover:
- People.
- Posts.
- Communities.
- Marketplace listings.
- Accommodation.
- Events.
- Locations.

## 10.4 Filters

Depending on the selected content type, filters may include:
- State.
- LGA.
- Batch.
- Category.
- Date or recency.
- Listing status.
- Price range, for relevant listings.

## 10.5 Nationwide discovery

A member in one state must be able to discover:
- Posts from another state.
- Communities in another state.
- Accommodation in a destination state.
- Marketplace listings elsewhere.
- Events across Nigeria.

A redeployed member should be able to explore their destination state before or while updating their service information.

Explore should support both personalised recommendations and intentional search.

# 11. Marketplace and Accommodation

## 11.1 Purpose

Jobs, marketplace and accommodation form the opportunity pillar. They carry equal weight with the social pillar.

They allow corps members to offer and discover jobs and gigs, useful items and accommodation.

## 11.2 Listing detail

A listing detail page should show:
- Photos.
- Title.
- Description.
- Price and relevant fees.
- Location.
- Condition or accommodation type.
- Listing date.
- Seller or advertiser profile.
- Member verification status.
- Availability status.
- Save and share actions.
- Contact options.
- Report listing action.
- Safety reminder.

## 11.3 Contacting the advertiser

Contact occurs externally through WhatsApp or phone call, according to the listing owner's selected contact options.

The phone number must not be exposed automatically. The owner chooses which contact methods to enable.

For WhatsApp, open a conversation with a prefilled contextual message, for example:

"Hello, I saw your [listing title] on the NYSC app. Is it still available?"

For jobs: "Hello, I saw the [job title] role on the app. I'd like to apply. Is it still open?"

No in-app messaging is required.

## 11.4 Listing status

The owner should be able to mark a listing:
- Available (shown as Hiring for jobs).
- Sold.
- Rented.
- Filled (jobs).
- Closed or unavailable.

Listings may also have an expiry or renewal mechanism. Exact expiry duration should be configurable.

## 11.5 Listing interactions

Listings support:
- Likes.
- Reposts or sharing.
- Saves.

Listings do not support comments.

## 11.6a Job safety

Display clear warnings encouraging users to:
- Never pay a fee to get a job or interview.
- Confirm the employer exists before sharing documents.
- Be wary of pay that looks too good to be true.
- Report listings that ask for money.

Fake-job and pay-to-apply reports receive priority review, like accommodation scams.

## 11.6 Accommodation safety

Display clear warnings encouraging users to:
- Inspect the property.
- Verify the advertiser's identity and authority to rent.
- Confirm the tenancy terms and all fees.
- Avoid sending deposits before appropriate verification.
- Report suspicious listings.

Member verification is not a guarantee that the property or advertiser is legitimate.

# 12. Events

## 12.1 Purpose

Events support the social and community experience, including:
- Batch reunions.
- Football competitions.
- CDS outreach activities.
- Hangouts.
- State corps-member meetups.
- Birthdays and celebrations.
- Post-service reunions.

## 12.2 Event detail page

Display:
- Event title and description.
- Cover image.
- Date and time.
- Location and map where available.
- Organiser profile.
- Interested and Going actions.
- Share action.
- Report event action.
- External registration link or contact details, if supplied.

## 12.3 Event management

The organiser should be able to:
- Edit event details.
- Change date, time or location.
- Cancel the event.
- Mark it completed.

Users who indicated interest or Going should receive relevant updates when important event details change.

## 12.4 Initial scope

Do not build complex ticketing, payments or in-app registration infrastructure initially. External registration links are sufficient.

# 13. Notifications

## 13.1 Purpose

Notifications bring users back to relevant activity without overwhelming them.

## 13.2 Notification categories

**Social**
- New follower.
- Like.
- Comment.
- Repost.
- Mention.

**Community**
- Important announcement.
- Pinned post.
- Community invitation.
- Relevant community update.

**Service**
- Important camp update.
- State-level announcement.
- Relevant CDS update, where supported.

**Listings and events**
- Listing interest, if implemented.
- Listing expiry or renewal reminder.
- Event changes.
- Event reminders, if enabled.

## 13.3 Notification centre

Provide an in-app notification history with filters:
- All.
- Social.
- Communities.

Service and platform-critical notifications should be visually distinguished even if they appear in the All view.

## 13.4 Push and email

Initial recommendation:
- In-app notifications.
- Push notifications for selected meaningful activity.
- Email for account security, verification and important account notices.

Do not send a push notification for every like. Aggregate frequent activity where appropriate.

## 13.5 User controls

Users should be able to:
- Enable or disable push notifications.
- Configure social notifications.
- Configure community notifications.
- Mute individual communities.
- Configure quiet hours.
- Control optional email notifications.

Critical account-security notices may be exempt from ordinary promotional notification preferences where legally and operationally appropriate.

# 14. Safety, Trust and Moderation

## 14.1 Reporting

Reporting should be available from relevant content and profile surfaces.

Users can report:
- Users.
- Posts.
- Comments.
- Communities.
- Community moderators.
- Marketplace listings.
- Accommodation listings.
- Events.

Report reasons should be context-specific and may include:
- Harassment or bullying.
- Impersonation.
- Scam or fraud.
- Spam.
- Inappropriate content.
- Misinformation presented as official information.
- Threats or harmful behaviour.
- Other, with an optional explanation.

Users may attach supporting evidence where appropriate.

## 14.2 Blocking

Blocking should prevent further interaction between the accounts and hide the blocked person's content from the blocker's experience. Reciprocal visibility and interaction behaviour must be defined consistently in implementation.

## 14.3 Muting

Muting hides a person's content from the user's feed without notifying the muted person. It does not automatically constitute a report or block.

## 14.4 Moderation workflow

1. User submits a report.
2. Report enters the moderation queue.
3. Automated checks may prioritise or flag urgent cases.
4. A human reviewer assesses the report.
5. The reviewer closes the report or takes an appropriate action.
6. The action and rationale are recorded.
7. The affected user may be notified where appropriate.
8. An appeal route is provided for significant moderation actions.

## 14.5 Moderation actions

Depending on severity:
- No action.
- Content warning or restriction.
- Remove content.
- Temporarily restrict an account.
- Suspend an account.
- Permanently ban an account.
- Remove a community.
- Suspend or remove a moderator.
- Escalate serious matters to the platform's designated team.

Actions should be proportionate and auditable.

## 14.6 Moderation responsibilities

**Community moderators**
- Handle ordinary community-level reports.
- Remove rule-breaking community content.
- Pin or correct community information.
- Escalate serious issues.

**Platform moderation team**
- Review serious reports.
- Review moderator complaints.
- Handle repeated violations.
- Review suspicious listings and communities.

**Platform administrators**
- Manage verification and account status.
- Handle appeals and serious sanctions.
- Manage official communities and authorised announcements.
- Oversee platform-wide governance.

## 14.7 Scam handling

Scam reports, especially involving accommodation and sales, should receive priority review.

The platform should not claim to guarantee transactions or verify property ownership merely because an advertiser has a verified member badge.

## 14.8 Appeals

Users should have a way to appeal significant moderation decisions. Appeals should be reviewed by someone other than the original decision-maker where practical.

## 14.9 Safety education

Display contextual safety guidance, especially around:
- Accommodation.
- Marketplace transactions.
- External contact.
- Meetups and events.
- Requests for personal information.

# 15. Profile and NYSC Journey

## 15.1 Profile information

A profile may contain:
- Profile photo.
- Name.
- Username.
- Bio.
- Interests.
- Followers count.
- Following count.
- Posts.
- Communities.
- NYSC information.
- Service status.
- Journey milestones.

## 15.2 NYSC information

Potential profile details:
- Batch and stream.
- Camp history.
- Current state and LGA.
- Service status.
- Redeployment history, where relevant.

PPA details and sensitive posting information should be private by default. Users control the visibility of personal service information.

## 15.3 Timeline and milestones

Suggested milestones:
- Joined NYSC.
- Received deployment.
- Reported to camp.
- Completed orientation.
- Posted to PPA.
- Redeployed.
- Completed service.

Verified milestones must be distinguishable from optional personal milestones added by the user.

## 15.4 Other people's profiles

A public profile may show:
- Shared journey information.
- Public posts.
- Communities.
- Followers and following.
- Follow action.
- Verification or alumni status.

Visibility must respect the profile owner's privacy settings.

# 16. Privacy, Account Controls and Data Protection

## 16.1 Privacy controls

Users should control visibility of:
- Profile information.
- Service information.
- Posts.
- Followers and following lists.
- Location information.

Precise location and PPA details must not be public by default.

## 16.2 Account controls

Users should be able to:
- Edit profile information.
- Change profile picture.
- Change account credentials.
- Manage notification preferences.
- Deactivate account.
- Request account deletion.
- Request or download personal data, subject to applicable requirements.

## 16.3 Data minimisation

Collect only information necessary to provide the service, verify membership, protect the platform or meet applicable obligations.

Identity documents and verification evidence must have restricted access and defined retention rules.

## 16.4 Security

Engineering should implement:
- Secure authentication and session management.
- Appropriate password storage.
- Rate limiting and abuse protection.
- Secure document upload and access controls.
- Audit logs for privileged actions.
- Protection against common web and mobile application vulnerabilities.
- Secure handling of external contact information.

Legal and privacy requirements should be reviewed for the Nigerian operating context before launch.

# 17. Alumni and Post-Service Experience

## 17.1 Account continuity

Passing out does not terminate the account.

The member retains:
- Profile.
- Posts and media, subject to normal retention and deletion rules.
- Followers and following.
- Communities.
- Batch and camp relationships.
- Service timeline and memories.

## 17.2 Status transition

The user's status changes to Service Completed or Alumni once completion is confirmed or appropriately recorded.

The platform should distinguish current corps members from alumni.

## 17.3 Alumni participation

Alumni can:
- Participate in their batch communities.
- Remain connected with former campmates.
- Share experiences and advice.
- Join interest-based communities.
- Discover and participate in reunions and events.

Alumni must not be represented as currently serving corps members.

## 17.4 No separate alumni app

The alumni experience remains within the same product and account.

# 18. Platform Administration Dashboard

## 18.1 Overview

A separate web-based administration dashboard is required for internal platform operations.

## 18.2 Main modules

| Module | Responsibilities |
|---|---|
| Overview | Membership, activity, reports and operational metrics |
| Verification | Pending, approved and rejected applications |
| Members | Accounts, restrictions, suspensions and appeals |
| Communities | Official and member-created communities |
| Moderation | Reports involving users, posts, listings and moderators |
| Announcements | Platform and authorised community notices |
| Marketplace | Suspicious or reported listings |
| Events | Reported events and administrative actions |
| Analytics | Engagement, retention and usage trends |

## 18.3 Verification management

Administrators can:
- Review submissions.
- Approve or reject verification.
- Request additional evidence.
- Record decision reasons.
- Review resubmissions and appeals.
- Inspect verification history.

## 18.4 Community management

Administrators can:
- Create and archive official communities.
- Correct community information.
- Appoint or remove moderators.
- Review member-created communities.
- Resolve duplicate or impersonating communities.
- Review moderator complaints.
- Authorise official announcements where appropriate.

## 18.5 Announcement permissions

The platform must distinguish platform announcements, community moderator notices and authorised official announcements.

An ordinary verified member must not be able to make a post appear to be an official NYSC announcement.

## 18.6 Auditability

Privileged actions should record:
- Actor.
- Action.
- Target.
- Timestamp.
- Reason, where applicable.
- Relevant before-and-after state.

Access to sensitive member information must be role-restricted.

# 19. Content Visibility and Distribution Rules

## 19.1 Visibility options

Recommended post visibility:
- **Public:** Eligible for nationwide Explore discovery.
- **Followers:** Visible to the author's followers.
- **Community:** Visible within the selected community.

The final implementation must define how community posts interact with public sharing and cross-posting.

## 19.2 Distribution principles

- Followed accounts receive priority in Home.
- Batch, camp and state relevance influence Home.
- Community content is surfaced in the relevant community and may be highlighted in Home.
- Explore supports nationwide discovery.
- Private or restricted content must not leak into public search or recommendations.
- Blocks, mutes and moderation restrictions must be respected across all surfaces.

## 19.3 Trending

Trending should be based on meaningful activity over a relevant period, with spam and manipulation controls. Popularity must not override safety or visibility rules.

# 20. Non-functional Requirements

## 20.1 Performance

- Core screens should load quickly under typical mobile network conditions.
- Feed pagination should avoid loading excessive content at once.
- Media should be optimised for mobile data usage.
- Image and video uploads should provide progress and failure feedback.
- Search should return useful results without unnecessary delays.

Exact performance targets should be established during technical design and validated through testing.

## 20.2 Reliability

- Core account, feed and community functions should be monitored.
- Failed uploads should be recoverable where practical.
- Important user actions should not silently fail.
- Backups and recovery procedures should be defined.

## 20.3 Scalability

The architecture should accommodate growth across:
- Multiple concurrent batches.
- Multiple orientation camps.
- All states and relevant LGAs.
- Large public feeds.
- High-volume media.
- Member-created communities.

## 20.4 Accessibility and usability

- Clear labels and readable typography.
- Accessible contrast and touch targets.
- Helpful empty states.
- Clear error messages.
- Consistent navigation.
- Forms that work on common mobile screen sizes.
- Avoidance of unnecessary steps.

## 20.5 Mobile data awareness

Because users may rely on mobile data:
- Optimise image sizes.
- Avoid automatic high-resolution video playback.
- Consider data-saving controls.
- Load media progressively.
- Avoid unnecessary background refreshes.

# 21. Initial Release Scope and Phasing

## Phase 1 — Product foundation
- Account registration and authentication.
- Basic profile.
- NYSC information.
- Verification workflow.
- User privacy and account settings.
- Official community creation rules.

## Phase 2 — Core social experience
- Home feed.
- Follow and mutual-follow logic.
- Photo/video posts.
- Discussions.
- Questions.
- Polls.
- Comments, likes, reposts and saves on social posts.
- Community feed and membership.
- Member-created communities.
- Explore and nationwide search.

## Phase 3 — Trust and operational controls
- Reporting.
- Blocking and muting.
- Moderation queues.
- Admin dashboard.
- Community moderator permissions.
- Verification management.
- Listing safety and review workflows.

## Phase 4 — Opportunities and utility
- Job listings.
- Marketplace listings.
- Accommodation listings.
- External WhatsApp and phone contact.
- Listing saves, likes and sharing.
- Listing status management.
- Events and event updates.

## Phase 5 — Engagement and lifecycle enhancements
- Notification centre.
- Push notification preferences.
- Improved feed ranking.
- More advanced recommendations.
- Alumni status and journey refinements.
- Analytics and product optimisation.

Some work can run in parallel, but dependencies must be respected. For example, official community membership depends on reliable NYSC information and verification.

# 22. Functional Requirements Summary

| ID | Requirement | Priority |
|---|---|---|
| AUTH-01 | Users can register using supported account methods | Must |
| AUTH-02 | Users can create and edit a basic profile | Must |
| AUTH-03 | Users can register before receiving all NYSC details | Must |
| VER-01 | Users can submit NYSC verification details | Must |
| VER-02 | Admins can review and decide verification submissions | Must |
| VER-03 | Verification status controls restricted features | Must |
| VER-04 | Users can correct or appeal rejected submissions | Should |
| VER-05 | Redeployed users can update service information without a new account | Must |
| HOME-01 | Users see a personalised Home feed | Must |
| HOME-02 | Followed accounts receive feed priority | Must |
| HOME-03 | Home offers For You, My Batch and My State filters | Should |
| SOC-01 | Users can follow and unfollow other users | Must |
| SOC-02 | Mutual follows are derived from follower/following relationships | Must |
| SOC-03 | Social posts support likes, comments, reposts and saves | Must |
| COM-01 | Platform can create protected official communities | Must |
| COM-02 | Verified members can create member communities | Must |
| COM-03 | Communities are feed-based, not chat-based | Must |
| COM-04 | Communities support posts, discussions, members and pinned notices | Must |
| COM-05 | Platform can appoint and remove community moderators | Must |
| CRT-01 | Users can create photo/video posts | Must |
| CRT-02 | Users can create discussions, questions and polls | Must |
| CRT-03 | Verified users can create marketplace listings | Must |
| CRT-06 | Verified users can share job listings | Must |
| CRT-04 | Verified users can create accommodation listings | Must |
| CRT-05 | Verified users can create events | Should |
| LST-01 | Listings support likes, repost/share and saves | Must |
| LST-02 | Listings do not support comments | Must |
| LST-03 | Listing owners can update listing status | Must |
| LST-04 | Listings can link to external WhatsApp or phone contact | Must |
| EXP-01 | Explore supports nationwide discovery | Must |
| EXP-02 | Search covers people, posts, communities and listings | Must |
| EXP-03 | Explore supports relevant state, LGA, batch and category filters | Should |
| EVT-01 | Users can view event details and indicate interest | Should |
| EVT-02 | Organisers can update or cancel events | Should |
| NTF-01 | Users have an in-app notification centre | Must |
| NTF-02 | Users can configure optional notification categories | Should |
| SAFE-01 | Users can report users and content | Must |
| SAFE-02 | Users can block and mute accounts | Must |
| SAFE-03 | Admins can review reports and apply sanctions | Must |
| SAFE-04 | Significant moderation decisions support appeals | Should |
| PROF-01 | Profiles show NYSC status and relevant journey details | Must |
| PROF-02 | Users control visibility of sensitive profile information | Must |
| ALM-01 | Accounts remain active after service completion | Must |
| ALM-02 | Alumni status is distinguishable from current service status | Must |
| ADM-01 | Admin dashboard supports member and verification management | Must |
| ADM-02 | Admin dashboard supports community and moderation management | Must |
| ADM-03 | Privileged administrative actions are auditable | Must |

# 23. Explicit Product Decisions

The following decisions were established during product discovery and form the current baseline:

1. The product is an NYSC social network and opportunity marketplace with two equal pillars. Opportunities include jobs and gigs, items, accommodation and events. It has no applicant tracking or in-app hiring.
2. The main navigation consists of Home, Community, Create, Explore and Profile.
3. Home is personalised and gives meaningful priority to followed accounts.
4. Explore is nationwide and is not limited to the user's state or batch.
5. Official batch, camp and state communities are platform-created and protected.
6. Verified corps members can create their own communities without needing an NYSC leadership position.
7. Communities are feed-based; no community chat is included initially.
8. Community moderators are not automatically NYSC officials.
9. Being a platoon leader does not automatically grant moderator privileges.
10. Moderator appointments are approved by the platform, with member recommendations or voting potentially introduced later.
11. Create supports photo/video posts, discussions, questions, polls, job listings, item listings, accommodation and events.
12. Structured listings are distinct from ordinary social posts that happen to mention an item or apartment.
13. Listings can surface in multiple app locations without duplicating the underlying record.
14. Social posts support comments; marketplace and accommodation listings do not.
15. Follow is the only social relationship action initially. Mutual follow is derived from reciprocal follows.
16. There is no separate Connect button or connection request.
17. There is no in-app direct messaging initially.
18. Marketplace and accommodation contacts use external WhatsApp or phone options selected by the listing owner.
19. Phone numbers are not exposed automatically.
20. Passing out does not delete or terminate an account; the member transitions to alumni status.
21. A redeployed member updates their existing account rather than creating a new one.
22. PPA and sensitive location details are private by default.
23. Verification confirms membership, not the truth of every claim or the legitimacy of every listing.
24. The platform team retains oversight of official communities, verification, serious moderation and moderator appointments.

# 24. Recommendations and Items to Validate

These recommendations should guide implementation but require confirmation where noted.

## 24.1 Verification source and evidence
- Confirm whether any authorised NYSC verification integration is available.
- If not, define acceptable documents and a manual review procedure.
- Confirm which identifiers are necessary and how they will be protected.
- Define document retention and deletion rules.

## 24.2 Account and access policy
- Confirm exact feature access for unverified and pending users.
- Decide whether prospective members can follow, comment or publish ordinary posts before verification.
- Define how alumni status is confirmed.

**Access by status (Recommended; to validate)**

Access is decided by verification state, not by service status.

| Status | Allowed | Blocked until verified |
|---|---|---|
| Awaiting deployment | Ask questions, comment, polls, discussions, ordinary photo posts, follow, like, save, join public communities, browse everything | Jobs, item and accommodation listings, events, creating communities, official camp/batch/state communities |
| Verified, in camp or serving | Everything | None |
| Alumni (confirmed) | Everything a verified member can do, including posting jobs and handovers. Keeps batch and camp communities | None. Posts carry an "Alumni" label |

- Label posts from users awaiting deployment as "Awaiting deployment" so readers know the author has not reached camp.
- Alumni can stay in official state and "currently serving" communities as readers and commenters, with their posts labelled "Alumni". Decide whether they may start new posts there.
- Never present alumni as currently serving.
- Rate-limit posts and follows on new accounts to deter spam.

**Alumni confirmation (To validate)**
- A user who signs up as "Completed" is shown as Unverified, not Alumni, until an admin confirms the status.
- Evidence for moving from serving to alumni: passing-out certificate, reviewed manually. Decide the exact document and retention.
- A self-declared status in the profile dropdown is never shown as a verified status.

## 24.3 Community governance
- Set the initial community-creation limit.
- Define minimum community rules.
- Define open, request-to-join and invitation-only policies.
- Set moderator eligibility and review criteria.
- Decide whether any platoon-level structure is needed; this is not currently a launch requirement.

## 24.4 Feed and visibility
- Confirm final visibility options and how they interact with community posts.
- Define the initial ranking weights and recency windows.
- Define trending thresholds and anti-manipulation controls.

## 24.5 Listings
- Define listing expiry periods.
- Define required fields for each accommodation category.
- Confirm whether listing owners can receive an in-app indication of interest without introducing messaging.
- Define external contact privacy and abuse safeguards.

## 24.6 Notifications
- Finalise which events trigger push notifications.
- Define quiet-hour defaults.
- Decide whether event reminders are included in the first release.

## 24.7 Events
- Confirm whether Interested and Going are both needed at launch.
- Decide whether event location pins and external registration links are sufficient for MVP.

## 24.8 Legal, privacy and operations
- Review applicable Nigerian data protection and consumer-protection requirements.
- Prepare terms of service, privacy notice, community guidelines and marketplace safety guidance.
- Define moderation staffing, escalation coverage and response targets.
- Define incident response and account appeal procedures.

## 24.9 Gaps identified during prototype review

**Verification and identity**
- One ID per account. Detect the same ID card used on more than one account.
- Edited or fake ID photos. Manual review has limits. Define reviewer guidance and an escalation route.
- Account recovery for phone-only users who lose their number.
- Re-verification when a verified user changes batch, state or status (redeployment, passing out).

**Jobs**
- Who may post jobs. Today only verified members can. Decide whether external employers or businesses may post, and how they are vetted.
- Job listing expiry and renewal period, and how to handle roles marked filled.
- Handling of applicant data. Applications happen outside the app, so state what the platform does and does not store.
- Priority review and a "pay to apply" report reason are in the prototype. Define response targets.

**Moderators**
- Term length, review cadence and the maximum number of communities one person may moderate.
- What a moderator's removal notice tells the author, and how the appeal reaches a different reviewer.
- Moderator ID retention. Same rules as member verification evidence.

**Media**
- Video limits (length, size, format), upload moderation and storage cost. The prototype uses short sample clips only.
- Image and video review for explicit or harmful content before wide distribution.

**Platform and operations**
- Admin dashboard is required (section 18) but is not yet designed or prototyped.
- Nigerian data protection obligations for storing ID photos, including registration and breach procedure.
- Low-bandwidth behaviour: offline reading, data saver defaults, and a progressive web app option.
- Languages: whether to support Hausa, Yoruba, Igbo or Pidgin interface text.
- Accessibility review (contrast, touch targets, screen readers) before launch.
- Anti-spam thresholds for new accounts, follows and listings.
- Analytics events to instrument for the success measures in section 2.3.

# 25. Dependencies and Risks

| Risk or dependency | Potential impact | Mitigation |
|---|---|---|
| No authorised NYSC verification integration | Manual verification workload | Start with controlled document review; design an adapter for future integration |
| Fake or misleading listings | Financial harm and loss of trust | Member verification, reporting, safety prompts and priority review |
| Official-community impersonation | Confusion and misinformation | Protected naming, platform-created official spaces and clear authority labels |
| Moderator abuse or inactivity | Community quality declines | Scoped permissions, platform oversight, reporting and periodic review |
| Low activity in new communities | Empty or unhelpful experience | Seed official spaces and recommend relevant existing communities |
| Feed becomes repetitive | Reduced engagement | Ranking diversity, deduplication and user controls |
| Sensitive NYSC information exposed | Privacy and safety harm | Data minimisation, private defaults and restricted admin access |
| High media/data costs | Poor experience for users | Media optimisation, progressive loading and data-saving controls |
| Unclear alumni verification | Incorrect status labels | Define completion evidence and allow controlled review |

# 26. Acceptance Criteria for Product Readiness

The product should not be considered ready for a public launch until the following are demonstrably working:

## Identity and verification
- A user can register without already having every NYSC detail.
- A user can submit verification information.
- Administrators can review and decide submissions.
- Verification status changes feature access correctly.
- A redeployed member can update their existing account.

## Social and community
- A user can publish supported social content.
- A user can follow and unfollow another user.
- Mutual follow is correctly derived.
- Followed accounts are meaningfully prioritised in Home.
- Official communities are protected from member impersonation.
- Verified members can create member communities.
- Community feeds support the agreed social interactions.
- There is no chat functionality in the initial release.

## Listings and events
- A verified member can create a job, item or accommodation listing.
- Listings can be saved, liked and shared.
- Listings have no comments.
- Contact options open the selected external channel.
- Listing owners can update availability.
- Users can report suspicious listings.
- Event details and organiser updates work if events are included in the release.

## Discovery
- Explore can surface nationwide content.
- Search covers the agreed entity types.
- Filters narrow results appropriately.
- Restricted content does not appear in public discovery.

## Safety and administration
- Users can report relevant users and content.
- Users can block and mute.
- Reports reach an admin queue.
- Administrators can take and audit moderation actions.
- Sensitive verification evidence is not visible to community moderators.

## Lifecycle
- Service completion does not delete the account.
- Alumni status is distinguishable from active service.
- Existing posts, follows and communities remain available subject to privacy and moderation rules.

# 27. Glossary

| Term | Meaning |
|---|---|
| NYSC | National Youth Service Corps |
| Corps member / Corper | A participant serving under the NYSC programme |
| Batch | NYSC intake cohort |
| Stream | A subdivision of an NYSC batch |
| Orientation camp | The initial residential orientation programme |
| PPA | Place of Primary Assignment |
| CDS | Community Development Service |
| LGA | Local Government Area |
| Redeployment | Approved change of state of service |
| Passing out | Completion of national service |
| Alumni | A person who has completed service |
| Official community | A community created and governed by the platform |
| Member-created community | A community created by an eligible verified member |

---

## End of PRD

This document captures the current product direction and decisions from discovery. It is the baseline for the next deliverable: a screen-by-screen product specification covering layouts, states, interactions, permissions, validation, empty states and error handling.
