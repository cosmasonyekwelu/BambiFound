# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: screens.spec.ts >> BambiFound New Stitch Screens Navigation & Functionality >> Dashboard loads command center and match cards
- Location: e2e/screens.spec.ts:13:7

# Error details

```
TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('text=Elena Vance') to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - link "BambiFound" [ref=e7] [cursor=pointer]:
          - /url: /dashboard
        - navigation [ref=e8]:
          - link "Overview" [ref=e9] [cursor=pointer]:
            - /url: /dashboard
          - link "Discover Builders" [ref=e10] [cursor=pointer]:
            - /url: /discover
          - link "Venture Listings" [ref=e11] [cursor=pointer]:
            - /url: /ventures
          - link "Intros & Messages" [ref=e12] [cursor=pointer]:
            - /url: /messages
      - generic [ref=e13]:
        - link "FREE TIER" [ref=e14] [cursor=pointer]:
          - /url: /settings/membership
        - generic [ref=e15]:
          - link "User dash" [ref=e16] [cursor=pointer]:
            - /url: /profile/edit
          - button "Log Out" [ref=e17]
  - main [ref=e18]:
    - generic [ref=e19]:
      - generic [ref=e20]:
        - generic [ref=e21]: info
        - generic [ref=e22]:
          - heading "Onboarding Skipped" [level=4] [ref=e23]
          - paragraph [ref=e24]: Complete your builder profile to unlock personalized 95%+ vector match accuracy.
      - link "Complete Onboarding" [ref=e25] [cursor=pointer]:
        - /url: /onboarding
    - generic [ref=e26]:
      - generic [ref=e27]:
        - generic [ref=e28]: BUILDER COMMAND CENTER
        - heading "Welcome, User dash!" [level=1] [ref=e30]
        - paragraph [ref=e31]: Here are your high-conviction ecosystem matches and venture signal updates today.
      - generic [ref=e32]:
        - link "Explore Matches" [ref=e33] [cursor=pointer]:
          - /url: /discover
        - link "List Venture" [ref=e34] [cursor=pointer]:
          - /url: /ventures
    - generic [ref=e35]:
      - generic [ref=e36]:
        - generic [ref=e37]:
          - heading "High-Conviction Builder Matches" [level=2] [ref=e38]
          - link "View All Matches →" [ref=e39] [cursor=pointer]:
            - /url: /discover
        - generic [ref=e40]:
          - generic [ref=e41]:
            - generic [ref=e42]:
              - generic [ref=e43]:
                - generic [ref=e44]: UV
                - generic [ref=e45]:
                  - generic [ref=e46]:
                    - link "User vent" [ref=e47] [cursor=pointer]:
                      - /url: /profile/b07b34b6-2347-4ce9-b594-f3a8f581a392
                    - generic [ref=e48]: 82% MATCH
                  - paragraph [ref=e49]: User vent — Builder
                  - paragraph [ref=e50]: Remote
              - generic [ref=e51]:
                - link "View Profile" [ref=e52] [cursor=pointer]:
                  - /url: /profile/b07b34b6-2347-4ce9-b594-f3a8f581a392
                - button "Request Intro" [ref=e53]
            - paragraph [ref=e54]:
              - strong [ref=e55]: "AI Vector Insight:"
              - text: High alignment in complementary domains (Builder & Builder). High conviction vector fit for early-stage startup collaboration.
          - generic [ref=e56]:
            - generic [ref=e57]:
              - generic [ref=e58]:
                - generic [ref=e59]: UP
                - generic [ref=e60]:
                  - generic [ref=e61]:
                    - link "User persist" [ref=e62] [cursor=pointer]:
                      - /url: /profile/2af296fb-906a-47e9-b01c-609961819213
                    - generic [ref=e63]: 82% MATCH
                  - paragraph [ref=e64]: User persist — Builder
                  - paragraph [ref=e65]: Remote
              - generic [ref=e66]:
                - link "View Profile" [ref=e67] [cursor=pointer]:
                  - /url: /profile/2af296fb-906a-47e9-b01c-609961819213
                - button "Request Intro" [ref=e68]
            - paragraph [ref=e69]:
              - strong [ref=e70]: "AI Vector Insight:"
              - text: High alignment in complementary domains (Builder & Builder). High conviction vector fit for early-stage startup collaboration.
            - generic [ref=e71]:
              - generic [ref=e72]: Software Engineering
              - generic [ref=e73]: Distributed Systems
              - generic [ref=e74]: AI & LLM Architecture
              - generic [ref=e75]: Product Strategy
              - generic [ref=e76]: UI/UX Craft
              - generic [ref=e77]: Founder Operations
          - generic [ref=e78]:
            - generic [ref=e79]:
              - generic [ref=e80]:
                - generic [ref=e81]: UC
                - generic [ref=e82]:
                  - generic [ref=e83]:
                    - link "User complete" [ref=e84] [cursor=pointer]:
                      - /url: /profile/ec6af72e-73d7-4ad9-a259-81937d22e41a
                    - generic [ref=e85]: 82% MATCH
                  - paragraph [ref=e86]: User complete — Builder
                  - paragraph [ref=e87]: Remote
              - generic [ref=e88]:
                - link "View Profile" [ref=e89] [cursor=pointer]:
                  - /url: /profile/ec6af72e-73d7-4ad9-a259-81937d22e41a
                - button "Request Intro" [ref=e90]
            - paragraph [ref=e91]:
              - strong [ref=e92]: "AI Vector Insight:"
              - text: High alignment in complementary domains (Builder & Builder). High conviction vector fit for early-stage startup collaboration.
            - generic [ref=e93]:
              - generic [ref=e94]: Software Engineering
              - generic [ref=e95]: Distributed Systems
              - generic [ref=e96]: AI & LLM Architecture
              - generic [ref=e97]: Product Strategy
              - generic [ref=e98]: UI/UX Craft
              - generic [ref=e99]: Founder Operations
      - generic [ref=e100]:
        - generic [ref=e101]:
          - generic [ref=e102]:
            - heading "Ecosystem Ventures" [level=3] [ref=e103]
            - link "View All" [ref=e104] [cursor=pointer]:
              - /url: /ventures
          - generic [ref=e105]:
            - generic [ref=e106]:
              - generic [ref=e107]:
                - heading "Apex Compute AI" [level=4] [ref=e108]
                - generic [ref=e109]: Ideation / Prototype
              - paragraph [ref=e110]: GPU compute orchestration engine
            - generic [ref=e111]:
              - generic [ref=e112]:
                - heading "Apex Compute AI" [level=4] [ref=e113]
                - generic [ref=e114]: Ideation / Prototype
              - paragraph [ref=e115]: GPU compute orchestration engine
            - generic [ref=e116]:
              - generic [ref=e117]:
                - heading "Apex Compute AI" [level=4] [ref=e118]
                - generic [ref=e119]: Ideation / Prototype
              - paragraph [ref=e120]: GPU compute orchestration engine
        - generic [ref=e121]:
          - heading "Ecosystem Activity" [level=3] [ref=e122]
          - generic [ref=e123]:
            - generic [ref=e126]:
              - paragraph [ref=e127]: PostgreSQL data models synced with Neon.
              - text: Just now
            - generic [ref=e130]:
              - paragraph [ref=e131]: AI Synergy engine initialized with Brevo email notifications.
              - text: Active
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   |
  3   | test.describe('BambiFound New Stitch Screens Navigation & Functionality', () => {
  4   |   const getUniqueUser = (prefix: string) => {
  5   |     const timestamp = Date.now() + Math.floor(Math.random() * 10000);
  6   |     return {
  7   |       fullName: `User ${prefix}`,
  8   |       email: `${prefix}_${timestamp}@example.com`,
  9   |       password: 'Password123!',
  10  |     };
  11  |   };
  12  |
  13  |   test('Dashboard loads command center and match cards', async ({ page }) => {
  14  |     const user = getUniqueUser('dash');
  15  |     await page.goto('/auth/register');
  16  |     await page.fill('input[id="fullName"]', user.fullName);
  17  |     await page.fill('input[id="email"]', user.email);
  18  |     await page.fill('input[id="password"]', user.password);
  19  |     await page.click('button[type="submit"]');
  20  |
  21  |     await expect(page).toHaveURL(/\/onboarding/);
  22  |     await page.getByRole('button', { name: 'Skip for now' }).first().click();
  23  |     await page.click('button:has-text("Skip to Dashboard")');
  24  |     await expect(page).toHaveURL(/\/dashboard/);
  25  |
  26  |     await expect(page.locator('h1')).toContainText(`Welcome, ${user.fullName}!`);
> 27  |     await page.waitForSelector('text=Elena Vance', { timeout: 10000 });
      |                ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
  28  |     await expect(page.getByRole('link', { name: 'Elena Vance' }).first()).toBeVisible();
  29  |     await expect(page.getByRole('link', { name: 'Marcus Thorne' }).first()).toBeVisible();
  30  |   });
  31  |
  32  |   test('Discover Builders screen search and filtering', async ({ page }) => {
  33  |     const user = getUniqueUser('disc');
  34  |     await page.goto('/auth/register');
  35  |     await page.fill('input[id="fullName"]', user.fullName);
  36  |     await page.fill('input[id="email"]', user.email);
  37  |     await page.fill('input[id="password"]', user.password);
  38  |     await page.click('button[type="submit"]');
  39  |
  40  |     await expect(page).toHaveURL(/\/onboarding/);
  41  |     await page.getByRole('button', { name: 'Skip for now' }).first().click();
  42  |     await page.click('button:has-text("Skip to Dashboard")');
  43  |
  44  |     await page.goto('/discover');
  45  |     await expect(page.locator('h1')).toContainText('Discover Curated Builders');
  46  |
  47  |     // Search filter
  48  |     await page.fill('input[placeholder="Search skills, roles, names..."]', 'Elena');
  49  |     await expect(page.getByRole('link', { name: 'Elena Vance' }).first()).toBeVisible();
  50  |   });
  51  |
  52  |   test('Venture Listings screen listing new venture', async ({ page }) => {
  53  |     const user = getUniqueUser('vent');
  54  |     await page.goto('/auth/register');
  55  |     await page.fill('input[id="fullName"]', user.fullName);
  56  |     await page.fill('input[id="email"]', user.email);
  57  |     await page.fill('input[id="password"]', user.password);
  58  |     await page.click('button[type="submit"]');
  59  |
  60  |     await expect(page).toHaveURL(/\/onboarding/);
  61  |     await page.getByRole('button', { name: 'Skip for now' }).first().click();
  62  |     await page.click('button:has-text("Skip to Dashboard")');
  63  |
  64  |     await page.goto('/ventures');
  65  |     await expect(page.locator('h1')).toContainText('Venture Listings');
  66  |
  67  |     // Open new venture modal
  68  |     await page.click('button:has-text("Spin Out or List Venture")');
  69  |     await page.fill('input[placeholder="e.g. Apex Compute"]', 'Apex Compute AI');
  70  |     await page.fill('input[placeholder="e.g. Autonomous GPU compute marketplace"]', 'GPU compute orchestration engine');
  71  |     await page.click('button:has-text("Publish Venture Listing")');
  72  |
  73  |     // Verify venture appears
  74  |     await expect(page.getByRole('heading', { name: 'Apex Compute AI' }).first()).toBeVisible();
  75  |   });
  76  |
  77  |   test('Intros & Messages interface sends message', async ({ page }) => {
  78  |     const user = getUniqueUser('msg');
  79  |     await page.goto('/auth/register');
  80  |     await page.fill('input[id="fullName"]', user.fullName);
  81  |     await page.fill('input[id="email"]', user.email);
  82  |     await page.fill('input[id="password"]', user.password);
  83  |     await page.click('button[type="submit"]');
  84  |
  85  |     await expect(page).toHaveURL(/\/onboarding/);
  86  |     await page.getByRole('button', { name: 'Skip for now' }).first().click();
  87  |     await page.click('button:has-text("Skip to Dashboard")');
  88  |
  89  |     await page.goto('/messages');
  90  |     await expect(page.locator('h1')).toContainText('Intros & Dialogue');
  91  |     await expect(page.getByRole('heading', { name: 'Elena Vance' }).first()).toBeVisible();
  92  |
  93  |     // Send a message in chat
  94  |     await page.fill('input[placeholder^="Message"]', 'Hello from E2E test!');
  95  |     await page.click('button:has-text("Send")');
  96  |
  97  |     await expect(page.getByText('Hello from E2E test!').first()).toBeVisible();
  98  |   });
  99  |
  100 |   test('Peer Profile screen displays match insights and triggers intro modal', async ({ page }) => {
  101 |     const user = getUniqueUser('peer');
  102 |     await page.goto('/auth/register');
  103 |     await page.fill('input[id="fullName"]', user.fullName);
  104 |     await page.fill('input[id="email"]', user.email);
  105 |     await page.fill('input[id="password"]', user.password);
  106 |     await page.click('button[type="submit"]');
  107 |
  108 |     await expect(page).toHaveURL(/\/onboarding/);
  109 |     await page.getByRole('button', { name: 'Skip for now' }).first().click();
  110 |     await page.click('button:has-text("Skip to Dashboard")');
  111 |
  112 |     await page.goto('/profile/elena-vance');
  113 |     await expect(page.locator('h1').first()).toContainText('Elena Vance');
  114 |
  115 |     // Trigger Request Intro modal
  116 |     await page.click('button:has-text("Request Intro")');
  117 |     await expect(page.getByRole('heading', { name: 'Request Intro to Elena Vance' })).toBeVisible();
  118 |   });
  119 |
  120 |   test('Profile Edit screen updates user profile information', async ({ page }) => {
  121 |     const user = getUniqueUser('edit');
  122 |     await page.goto('/auth/register');
  123 |     await page.fill('input[id="fullName"]', user.fullName);
  124 |     await page.fill('input[id="email"]', user.email);
  125 |     await page.fill('input[id="password"]', user.password);
  126 |     await page.click('button[type="submit"]');
  127 |
```