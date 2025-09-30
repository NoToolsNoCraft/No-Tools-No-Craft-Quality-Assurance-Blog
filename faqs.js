const faqsData = [
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
];