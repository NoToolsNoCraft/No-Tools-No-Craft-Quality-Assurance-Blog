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
        question: 'What are REST, API, and SOAP?',
        answer: `
            <p><strong>Key Integration Terms Explained:</strong></p>
            <ul>
                <li><strong>API</strong> – stands for <em>Application Programming Interface</em>. It defines a set of rules that allow different software systems to communicate and exchange data.</li>
                <li><strong>REST</strong> – stands for <em>Representational State Transfer</em>. It is a lightweight architecture for building web APIs using standard HTTP methods like GET, POST, PUT, and DELETE. REST APIs are stateless and widely used in modern web and banking systems.</li>
                <li><strong>SOAP</strong> – stands for <em>Simple Object Access Protocol</em>. It is an older protocol for exchanging structured data between systems using XML. SOAP APIs are more rigid but offer high security and transactional reliability, often used in legacy banking systems.</li>
            </ul>

            <p><strong>In Erste Bank Context:</strong></p>
            <ul>
                <li><strong>REST APIs</strong> – used in modern platforms like George for mobile and web banking integrations.</li>
                <li><strong>SOAP services</strong> – still exist in older core systems for internal data exchange and compliance reporting.</li>
            </ul>

        `
    },
        
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
        },

        {
        question: 'What is the difference between stateless and stateful systems?',
        answer: `
            <p><strong>Understanding Stateless vs Stateful Systems:</strong></p>
            <ul>
                <li><strong>Stateless:</strong> The server does not store any session information. Each request is independent and contains all the data needed for processing. This makes it highly scalable and fault-tolerant.</li>
                <li><strong>Stateful:</strong> The server remembers previous interactions and keeps session data (such as user login, transaction steps, or context). Each request depends on prior ones, which can make scaling more complex.</li>
            </ul>

            <p><strong>Key Differences:</strong></p>
            <table>
                <tr><th>Aspect</th><th>Stateless</th><th>Stateful</th></tr>
                <tr><td>Server Memory</td><td>No session storage</td><td>Keeps session info</td></tr>
                <tr><td>Each Request</td><td>Independent</td><td>Depends on previous requests</td></tr>
                <tr><td>Scalability</td><td>Easy to scale</td><td>Harder to scale</td></tr>
                <tr><td>Examples</td><td>REST APIs, HTTP, Microservices</td><td>FTP sessions, Legacy systems</td></tr>
                <tr><td>Failure Recovery</td><td>Simple – resend request</td><td>Complex – session may be lost</td></tr>
            </table>

            <p><strong>In Erste Bank Context:</strong></p>
            <ul>
                <li><strong>Stateless Example:</strong> REST APIs used by digital platforms like the George app are stateless. Each API call includes all necessary info (auth token, account ID), allowing scalability and resilience.</li>
                <li><strong>Stateful Example:</strong> Legacy core banking systems often maintain session context during multi-step transactions, such as loan approvals or account management.</li>
            </ul>

            <p><strong>Interview Answer Example:</strong></p>
            <blockquote>
                “Stateless means the server doesn’t keep session information — every request carries all required data, making it scalable and resilient, ideal for REST APIs.  
                Stateful systems remember previous interactions and are common in older banking systems where multi-step processes need session persistence.  
                At Erste Bank, new microservices typically use stateless APIs, while legacy integrations may remain stateful.”
            </blockquote>
        `
    },

        {
        question: 'What is event streaming and why is it used in banking systems?',
        answer: `
            <p><strong>Understanding Event Streaming:</strong></p>
            <ul>
                <li><strong>Definition:</strong> Event streaming is a way of continuously capturing, processing, and delivering data in real time as events occur.</li>
                <li><strong>Technology:</strong> Tools like <strong>Apache Kafka</strong> are commonly used to manage event streams — publishing events (like “payment processed” or “account updated”) and allowing other systems to consume them instantly.</li>
                <li><strong>Architecture:</strong> Instead of waiting for batch updates, systems react immediately to events as they happen.</li>
            </ul>

            <p><strong>How It Works:</strong></p>
            <ul>
                <li>Producer sends an event (e.g., a card transaction).</li>
                <li>Kafka or another streaming platform stores and distributes the event.</li>
                <li>Consumers (e.g., fraud detection, notifications, analytics) receive it instantly.</li>
            </ul>

            <p><strong>Benefits:</strong></p>
            <ul>
                <li>Real-time data flow between systems.</li>
                <li>Improved customer experience (instant transaction updates, alerts).</li>
                <li>Scalable integration between many systems (microservices, APIs, analytics tools).</li>
            </ul>

            <p><strong>In Erste Bank Context:</strong></p>
            <ul>
                <li>Erste Bank uses <strong>Kafka</strong> for real-time integration between core banking, mobile apps, and analytics services.</li>
                <li>For example, when a user makes a transaction in George, Kafka streams the event to multiple systems (transaction history, fraud monitoring, reporting) in real time.</li>
            </ul>

            <p><strong>Interview Answer Example:</strong></p>
            <blockquote>
                “Event streaming allows real-time data communication between systems. Erste Bank uses Kafka so that when an event like a transaction or payment occurs, multiple systems can process it instantly — such as updating balances, sending alerts, or running fraud checks. It improves performance, scalability, and data consistency across services.”
            </blockquote>
        `
    },
    {
        question: 'What is file transfer and how is it used in banking integrations?',
        answer: `
            <p><strong>Understanding File Transfer:</strong></p>
            <ul>
                <li><strong>Definition:</strong> File transfer refers to the process of moving structured data files (like CSV, XML, or flat files) between systems or organizations.</li>
                <li><strong>Protocols:</strong> Common methods include <strong>SFTP (Secure File Transfer Protocol)</strong>, <strong>FTPS</strong>, or secure shared folders.</li>
                <li><strong>Purpose:</strong> Often used when large data volumes or batch processing are needed instead of real-time exchange.</li>
            </ul>

            <p><strong>When File Transfer Is Used:</strong></p>
            <ul>
                <li>Batch updates between systems (e.g., end-of-day reports, transactions, or settlements).</li>
                <li>Data exchange with third parties who don’t have API or event streaming interfaces.</li>
                <li>Migration or data backup processes.</li>
            </ul>

            <p><strong>In Erste Bank Context:</strong></p>
            <ul>
                <li>Still widely used for integrations with external partners, government institutions, and financial reporting systems.</li>
                <li>For example, Erste may send daily settlement or interest reports via SFTP to regulatory bodies or clearinghouses.</li>
                <li>Modern systems are moving toward APIs and Kafka, but file transfer remains a secure and reliable legacy method.</li>
            </ul>

            <p><strong>Interview Answer Example:</strong></p>
            <blockquote>
                “File transfer is a traditional integration method used to exchange large or batch datasets securely — for example, via SFTP. In Erste Bank, it’s often used for end-of-day reports, settlements, or communication with external partners that don’t support APIs. While event streaming and REST APIs are replacing many of these cases, file transfer remains critical for certain regulatory and batch operations.”
            </blockquote>
        `
    }
    ],




    'manual': [
        {
            question: 'What is the difference between ad hoc testing and exploratory testing?',
            answer: `
                <p><strong>Key differences between ad hoc and exploratory testing:</strong></p>
                <ul>
                    <li><strong>Ad hoc testing</strong> – Performed without planning or documentation. Testers rely purely on intuition and experience, often trying random scenarios to "break" the system. It’s usually unstructured and not repeatable.</li>
                    <li><strong>Exploratory testing</strong> – More structured than ad hoc. Testers simultaneously design, execute, and learn about the application while testing. They often follow test charters or goals, take notes, and document findings for traceability.</li>
                    <li><strong>Documentation</strong> – Ad hoc testing rarely produces records, whereas exploratory testing encourages documenting observations, issues, and coverage.</li>
                    <li><strong>Use cases</strong> – Ad hoc testing is useful for quick sanity checks or when time is very limited. Exploratory testing is valuable for uncovering hidden defects, learning the system deeply, and supplementing scripted tests.</li>
                </ul>
                <p><strong>In short:</strong> Ad hoc testing is informal and random, while exploratory testing is structured, purposeful, and documented learning combined with test execution.</p>
            `
        }

    ]

    

};




