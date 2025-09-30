const faqsData = {
    'cypress-component': [
        {
            question: 'When writing component tests, should I always ignore styles?',
            answer: `
                <p><strong>Why you usually ignore styles:</strong></p>
                <ul>
                    <li><strong>Brittleness</strong> – Styles change often (spacing, colors, layout tweaks). If your tests depend on exact CSS values, they’ll break too easily.</li>
                    <li><strong>Not user behavior</strong> – Users don’t care if a button has <code>margin: 12px</code>; they care if the button is clickable and does the right thing.</li>
                    <li><strong>Visual testing is another category</strong> – If you want to check layout, colors, or responsiveness, that’s usually done with visual regression testing tools (e.g., Percy, Applitools, Happo), not Cypress unit/component tests.</li>
                </ul>
                <p><strong>When styles do matter in tests:</strong></p>
                <p>There are exceptions where CSS directly impacts usability. For example:</p>
                <ul>
                    <li><strong>Visibility / hiding</strong> – e.g., a dropdown menu appears with <code>display: block</code> only when a button is clicked.</li>
                    <li><strong>Disabled state</strong> – e.g., a button looks disabled and has <code>pointer-events: none</code>.</li>
                    <li><strong>Overflow / scroll</strong> – e.g., ensuring a modal covers the full viewport.</li>
                </ul>
                <p>In these cases, it’s fair to check styles, but you’d usually test them by user outcome (e.g., “the modal is visible” rather than “it has <code>top: 0</code>”). Cypress can check <code>should('be.visible')</code> or <code>should('not.be.visible')</code> without digging into CSS rules.</p>
            `
        },
        
        {
            question: 'When writing component tests, should I use a real API or simulate it?',
            answer: `
                <p><strong>Why you usually simulate APIs:</strong></p>
                <ul>
                    <li><strong>Speed</strong> – Component tests should run fast and in isolation, without waiting on real servers.</li>
                    <li><strong>Stability</strong> – Real APIs may be down, slow, or return unpredictable data. Mocking keeps your tests consistent.</li>
                    <li><strong>Focus</strong> – Component tests verify rendering and logic, not backend correctness. The backend is tested separately with integration or e2e tests.</li>
                </ul>
                <p><strong>How to simulate an API in Cypress:</strong></p>
                <pre><code class="language-js">
        cy.intercept('GET', 'http://localhost:3001/jobs/1', {
          statusCode: 200,
          body: {
            id: 1,
            title: 'Software Engineer',
            company: 'Tech Corp',
            location: 'Remote',
            salary: 120000,
            description: 'Build amazing software!'
          }
        }).as('getJob');
        
        cy.mount(<MemoryRouter initialEntries={['/jobs/1']}><JobDetails /></MemoryRouter>);
        cy.wait('@getJob');
        cy.contains('Software Engineer');
                </code></pre>
                <p><strong>When to use a real API:</strong></p>
                <p>You might hit the real backend in a small number of smoke or end-to-end tests to ensure integration works. But for most component tests, mocking keeps things fast, reliable, and isolated.</p>
            `
        }

    ],
    'cypress-e2e': [
        {
            question: 'What is the difference between Cypress component and E2E testing?',
            answer: `
                <p><strong>Component Testing:</strong></p>
                <ul>
                    <li>Focuses on individual components in isolation (e.g., a React or Vue component).</li>
                    <li>Runs in a browser but without a full app context, using tools like Cypress Component Testing to mount components.</li>
                    <li>Ideal for testing UI logic, state changes, and interactions within a single component.</li>
                </ul>
                <p><strong>E2E Testing:</strong></p>
                <ul>
                    <li>Tests the entire application flow, simulating real user scenarios (e.g., navigating pages, submitting forms).</li>
                    <li>Runs the full app in a browser, interacting with the DOM as a user would.</li>
                    <li>Ensures all parts of the app (frontend, backend, database) work together correctly.</li>
                </ul>
                <p><strong>When to use each:</strong> Use component testing for fast, isolated unit tests of UI components. Use E2E testing for validating complete user journeys and integration.</p>
            `
        }
    ],
    'github': [
        {
            question: 'How should I structure my GitHub Actions workflows for testing?',
            answer: `
                <p><strong>Best practices for structuring GitHub Actions workflows:</strong></p>
                <ul>
                    <li><strong>Separate jobs for different tasks</strong> – Create distinct jobs for unit tests, integration tests, and deployment to keep workflows modular and easier to debug.</li>
                    <li><strong>Use matrix builds</strong> – Test across multiple environments (e.g., Node.js versions, operating systems) using a matrix strategy to ensure compatibility.</li>
                    <li><strong>Cache dependencies</strong> – Use actions/cache to cache dependencies (e.g., npm or Yarn) to speed up workflow execution.</li>
                    <li><strong>Fail fast and provide feedback</strong> – Configure jobs to stop on failure (<code>fail-fast: true</code>) and use actions to notify teams (e.g., Slack notifications).</li>
                </ul>
                <p><strong>Example structure:</strong></p>
                <pre><code>
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: \${{ matrix.node-version }}
      - name: Cache dependencies
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: \${{ runner.os }}-node-\${{ matrix.node-version }}
      - run: npm ci
      - run: npm test
                </code></pre>
                <p>This structure ensures scalability, maintainability, and efficient CI/CD pipelines.</p>
            `
        }
    ],
    'postman': [
        {
            question: 'How can I automate API testing with Postman?',
            answer: `
                <p><strong>Automating API tests in Postman:</strong></p>
                <ul>
                    <li><strong>Create test scripts</strong> – Use Postman’s scripting feature (JavaScript) to write tests for responses (e.g., <code>pm.test</code> to check status codes, response data).</li>
                    <li><strong>Use collections</strong> – Group related API requests into collections for organized, reusable tests.</li>
                    <li><strong>Run with Newman</strong> – Use Newman, Postman’s CLI tool, to run collections in CI/CD pipelines (e.g., GitHub Actions, Jenkins).</li>
                    <li><strong>Environment variables</strong> – Store base URLs, tokens, or other dynamic data in environments to make tests portable.</li>
                </ul>
                <p><strong>Example Newman command:</strong></p>
                <pre><code>
newman run "YourCollection.json" -e "YourEnvironment.json" --reporters cli,html
                </code></pre>
                <p>This approach enables automated, repeatable API testing integrated with your development workflow.</p>
            `
        }
    ]

};
