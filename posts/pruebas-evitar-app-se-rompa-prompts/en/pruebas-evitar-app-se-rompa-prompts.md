---
title: "Testing & QA"
subtitle: "Testing so your app does not break: unit, integration and E2E with 8 prompts"
description: "Your app will break, the question is whether you or your users notice first. What unit, integration and E2E tests are in plain words, plus 8 prompts to review yours, create the missing ones and stop AI from breaking what works."
date: "17 September 2026"
image: "./pruebas-app-prompts.svg"
icon: "./pruebas-icon.svg"
language: "js"
---

![testing so your app does not break](./pruebas-app-prompts.svg)

# Testing: so your app does not break
## Unit, integration and E2E

17 September 2026

#### Your app will break, the question is whether you or your users notice first. What unit, integration and E2E tests are in plain words, plus 8 prompts to review yours, create the missing ones and stop AI from breaking what works.

### Why test when you build with AI

#### Building with AI adds one extra problem: every time you ask for a change, it can break what already worked without anyone noticing. Tests are what warn you. They do not replace opening your app and using it like a user. They warn when something that worked stopped working, which is exactly what happens most when building with AI.

### The 3 test types, simply

### 1. Unit or component tests

#### Small fast tests checking one piece alone: a function, a calc, a component. They run in seconds, so you run them all the time. Example: the cart-total function adding correctly with discount and shipping.

### 2. Integration tests

#### They check several pieces working together. This is where the bugs invisible to isolated tests appear. Example: the add button really updating the counter and the product showing in the cart.

### 3. End-to-end (E2E)

#### They simulate a real user with everything connected: UI, backend and database. Example: signing in, adding a product, paying and seeing the receipt. They are the slowest and flakiest, so you write few: only money flows or user-losing flows. Almost nobody automates them, yet they protect the most.

#### Simple rule: many unit, some integration, few E2E. If you only do one thing today, automate your main flow end to end.

### How to use these prompts

#### Run one prompt at a time inside your project, so the AI reads your code. Start with the first one, telling you where you stand, and go in order. Do not ask for 200 tests at once: start with the flow that would hurt most if it broke.

### 1. Does my app already have tests

#### Before creating anything, find out what you have. Many AI-made apps ship sample tests that test nothing real.

```
Act as a QA engineer reviewing a project for the first time.
Tell me what tests my app has today and how useful they are.

Here is what I have:
[PASTE HERE your file listing and package.json, or open this
prompt inside your project]

Review:
1. Which test tools are installed and truly configured
2. Which test files exist and of which type
3. Whether they check anything real or are empty samples
4. Which important parts have zero tests
5. Whether they run with one command and pass

Answer like this:
- Current state: one sentence
- What I have: list of what exists and whether it helps
- The 5 most dangerous gaps, by pain if they break
- Where to start: one single next step

No tests yet, diagnosis only.
```

### 2. What to test first

#### Not everything is worth the same. If your app charges, money flow comes first.

```
Act as a QA engineer protecting an app with little time.
Decide what gets tested first in my app.

Here is what I have:
[PASTE HERE what your app does, who uses it, how it makes money
and its main screens]

Do this:
1. List my most important user flows
2. For each, what breaks means: lose money, users, data, annoyance
3. Order them by real risk, not ease of testing
4. For each, which type fits: unit, integration or E2E, and why
5. A short plan: test this week vs can wait

Answer in a table, ending with the first test to write today.
```

### 3. Setting up the test environment

#### If you never ran a test, this step unblocks you.

```
Act as a QA engineer setting up tests from zero.
Get me ready to run tests in my project.

Here is what I have:
[PASTE HERE your package.json and stack: Next.js, Expo, Vue,
Django, etc.]

Do this:
1. Recommend one tool for unit plus integration and one for E2E,
   matching my stack
2. One line on why those, not others
3. Exact install commands
4. Config files ready to paste
5. package.json scripts
6. ONE minimal passing sample test proving it is wired

Explain how I know it worked and which common error may appear.
```

### 4. Unit or component tests

```
Act as a QA engineer writing unit tests.
Write small fast tests for this piece of my app.

Here is what I have:
[PASTE HERE the function or component to test]

Do this:
1. List what this piece should do, edge cases included: empty,
   zero, negatives, long text, network errors
2. Write the tests with my projects tool
3. Cover the normal case, edge cases and errors
4. Use names explaining the expected behavior
5. Tell me what you are NOT testing here and why

End with the command running only these tests.
Do not change the function: report bugs separately.
```

```javascript
// Example of the expected style: Vitest, clear cases
import { describe, it, expect } from 'vitest';
import { calcTotal } from './cart';

describe('calcTotal', () => {
  it('adds items with discount and shipping', () => {
    expect(calcTotal([{ price: 100, qty: 2 }], 0.1, 5)).toBe(185);
  });
  it('empty cart returns shipping only', () => {
    expect(calcTotal([], 0.1, 5)).toBe(5);
  });
});
```

### 5. Integration tests

```
Act as a QA engineer writing integration tests.
Prove several pieces of my app work together.

Here is what I have:
[PASTE HERE the flow plus participant code: components,
state, API calls]

Do this:
1. Explain the pieces in this flow and where they usually break
2. Assert what the user sees, not implementation internals
3. Mock external calls instead of calling them for real
4. Include API failure and slowness cases
5. Avoid tests breaking over a class rename or copy change

End with what stays uncovered in this flow.
```

### 6. End-to-end (E2E) tests

#### The one almost nobody automates. Start with a single flow, the most important.

```
Act as a QA engineer writing end-to-end tests.
Automate a full real-user journey in my app.

Here is what I have:
[PASTE HERE the step-by-step flow: sign in, search, add to cart,
pay, see the receipt. With URLs, screens and login]

Do this:
1. Write it with my projects E2E tool, or recommend one with config
2. Cover the full happy path, end to end
3. Assert what matters: visible confirmation, created order,
   correct total
4. Use stable selectors, not copy that changes often
5. Explain test data plus cleanup afterwards
6. Tell me how to keep it from failing with no real bug

Important: run against a test environment, never production or
real user data. Tell me how to guarantee that.
```

### 7. Stop AI from breaking what works

#### This prompt turns your tests into a safety net while building with AI. Paste it as a project rule.

```
From now on, work like this in this project:

1. Before changing code, run the tests and tell me if they pass
2. With every new function, also write its test
3. When fixing a bug, first write a test failing because of it,
   then fix it
4. After every change, run the full suite again
5. If a passing test now fails, STOP and tell me what you broke.
   Do not edit the test to make it pass

Confirm you understood and tell me the test status right now.
```

### 8. Running tests automatically on every change

```
Act as a QA engineer setting up continuous integration.
Make my tests run alone on every push.

Here is what I have:
[PASTE HERE your test scripts and repo host: GitHub, GitLab, etc.]

Do this:
1. Full config file, ready to paste
2. Unit plus integration on every push and pull request
3. E2E included too, or why running them separately is better
4. Where I see results and what to do on failure
5. How to handle keys and env vars without exposing them

Explain it for someone who never set this up.
```

### FAQ

#### Which tool for each type?

#### For unit and integration, whatever matches your stack: Vitest or Jest in JavaScript, Pytest in Python. For E2E, Playwright or Cypress. Prompt 3 recommends based on your actual project.

#### How many E2E tests do I write?

#### Few: only money flows or user-losing flows. Everything else is covered by fast stable unit and integration tests.

#### Do tests replace manual testing?

#### No. Nothing replaces opening your app and using it like a user. Tests warn when something that worked stopped working after a change.

### Conclusions

#### Many unit, some integration, few E2E. Automate your main flow end to end first, set prompt 7 as the rule so AI breaks nothing, and leave prompt 8 CI running alone. That way every AI change stays protected.
