const SAMPLE_DATA = [
    {
        prompt: 'Generate a flow chart for a simple client server model',
        diagram:
            'graph TD\n    A[Client] -->|1. Initiate Request| B(Network);\n    B -->|2. Transmit Request| C{Server};\n    C -->|3. Receive Request| D{Process Request};\n    D -->|4. Prepare Response| E(Generate Response);\n    E -->|5. Send Response| B;\n    B -->|6. Transmit Response| A;\n    A -->|7. Receive Response| F(Display/Use Response);\n    \n    style A fill:#f9f,stroke:#333,stroke-width:2px\n    style C fill:#ccf,stroke:#333,stroke-width:2px',
    },
    {
        prompt: 'Generate sequence diagram for simple LLM app',
        diagram:
            'sequenceDiagram\n    participant User\n    participant Application\n    participant LLM API\n    participant Model\n\n    User->>Application: Input prompt\n    activate Application\n    Application->>LLM API: Send prompt request\n    activate LLM API\n    LLM API->>Model: Forward prompt\n    activate Model\n    Model-->>LLM API: Generate response\n    deactivate Model\n    LLM API-->>Application: Return response\n    deactivate LLM API\n    Application-->>User: Display response\n    deactivate Application',
    },
    {
        prompt: 'Generate a user journey of people going to work',
        diagram:
            'graph TD\n    A[Start] --> B{Wake Up};\n    B -- Alarm goes off --> C{Snooze Alarm?};\n    B -- No alarm --> C;\n    C -- Yes --> B;\n    C -- No --> D{Get Out of Bed};\n    D --> E{Bathroom Routine};\n    E --> F{Get Dressed};\n    F --> G{Eat Breakfast?};\n    G -- Yes --> H{Prepare/Eat Breakfast};\n    G -- No --> I{Prepare for Commute};\n    H --> I;\n    I --> J{Choose Commute Method};\n    J -- Drive --> K{Drive to Work};\n    J -- Public Transport --> L{Walk to Station/Stop};\n    J -- Walk/Bike --> M{Walk/Bike to Work};\n    L --> N{Wait for Transport};\n    N --> O{Ride Transport};\n    O --> P{Get off at Destination};\n    P --> Q{Walk to Workplace};\n    K --> R{Park Car};\n    R --> Q;\n    M --> Q;\n    Q --> S[Arrive at Work];\n    S --> T{Start Workday};',
    },
    {
        prompt: 'Generate a simple state diagram visualizing human life',
        diagram:
            'stateDiagram-v2\n    [*] --> Birth\n    Birth --> Infancy\n    Infancy --> Childhood\n    Childhood --> Adolescence\n    Adolescence --> Adulthood\n    Adulthood --> MiddleAge\n    MiddleAge --> OldAge\n    OldAge --> Death\n    Death --> [*]',
    },
]

export { SAMPLE_DATA }
