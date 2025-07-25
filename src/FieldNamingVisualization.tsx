import React from 'react';
import { Composition, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

// Field naming visualization showing the difference between incorrect and correct naming
export const FieldNamingVisualization: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animation sequences
    const titleOpacity = spring({
        frame,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 20,
    });

    const incorrectFieldsProgress = spring({
        frame: frame - 30,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 30,
    });

    const arrowProgress = spring({
        frame: frame - 80,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 20,
    });

    const correctFieldsProgress = spring({
        frame: frame - 100,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 30,
    });

    const impactProgress = spring({
        frame: frame - 150,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 20,
    });

    const incorrectFields = [
        { wrong: 'FirstName', correct: 'firstName' },
        { wrong: 'LastName', correct: 'lastName' },
        { wrong: 'Birthdate', correct: 'birthdate' },
        { wrong: 'first_name', correct: 'firstName' },
        { wrong: 'drivers_license_number', correct: 'driversLicenseNumber' },
    ];

    return (
        <div style={{
            flex: 1,
            backgroundColor: '#0f172a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
        }}>
            {/* Title */}
            <h1 style={{
                fontSize: '48px',
                color: '#ffffff',
                marginBottom: '40px',
                opacity: titleOpacity,
                fontWeight: 'bold',
            }}>
                Field Naming Convention Issues
            </h1>

            {/* Main content container */}
            <div style={{
                display: 'flex',
                gap: '60px',
                alignItems: 'center',
            }}>
                {/* Incorrect naming column */}
                <div style={{
                    backgroundColor: '#7f1d1d',
                    padding: '30px',
                    borderRadius: '10px',
                    minWidth: '300px',
                    opacity: incorrectFieldsProgress,
                    transform: `translateX(${interpolate(incorrectFieldsProgress, [0, 1], [-50, 0])}px)`,
                }}>
                    <h2 style={{ color: '#fca5a5', marginBottom: '20px', fontSize: '24px' }}>
                        ❌ Current Implementation
                    </h2>
                    {incorrectFields.map((field, index) => (
                        <div
                            key={index}
                            style={{
                                color: '#fee2e2',
                                fontSize: '20px',
                                marginBottom: '15px',
                                fontFamily: 'monospace',
                                opacity: interpolate(
                                    incorrectFieldsProgress,
                                    [index * 0.1, (index + 1) * 0.1 + 0.5],
                                    [0, 1]
                                ),
                            }}
                        >
                            {field.wrong}
                        </div>
                    ))}
                </div>

                {/* Arrow */}
                <div style={{
                    fontSize: '60px',
                    color: '#60a5fa',
                    opacity: arrowProgress,
                    transform: `scale(${arrowProgress})`,
                }}>
                    →
                </div>

                {/* Correct naming column */}
                <div style={{
                    backgroundColor: '#064e3b',
                    padding: '30px',
                    borderRadius: '10px',
                    minWidth: '300px',
                    opacity: correctFieldsProgress,
                    transform: `translateX(${interpolate(correctFieldsProgress, [0, 1], [50, 0])}px)`,
                }}>
                    <h2 style={{ color: '#86efac', marginBottom: '20px', fontSize: '24px' }}>
                        ✅ API Requirement
                    </h2>
                    {incorrectFields.map((field, index) => (
                        <div
                            key={index}
                            style={{
                                color: '#dcfce7',
                                fontSize: '20px',
                                marginBottom: '15px',
                                fontFamily: 'monospace',
                                opacity: interpolate(
                                    correctFieldsProgress,
                                    [index * 0.1, (index + 1) * 0.1 + 0.5],
                                    [0, 1]
                                ),
                            }}
                        >
                            {field.correct}
                        </div>
                    ))}
                </div>
            </div>

            {/* Impact section */}
            <div style={{
                marginTop: '60px',
                backgroundColor: '#7c2d12',
                padding: '20px 40px',
                borderRadius: '10px',
                opacity: impactProgress,
                transform: `translateY(${interpolate(impactProgress, [0, 1], [30, 0])}px)`,
            }}>
                <h3 style={{ color: '#fed7aa', fontSize: '24px', marginBottom: '10px' }}>
                    Impact: 100% API Call Failure
                </h3>
                <p style={{ color: '#ffedd5', fontSize: '18px' }}>
                    Every single API request fails with 400 Bad Request
                </p>
            </div>
        </div>
    );
};

// Product structure visualization
export const ProductStructureVisualization: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleOpacity = spring({
        frame,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 20,
    });

    const genericProgress = spring({
        frame: frame - 30,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 30,
    });

    const specificProgress = spring({
        frame: frame - 80,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 40,
    });

    return (
        <div style={{
            flex: 1,
            backgroundColor: '#0f172a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
        }}>
            <h1 style={{
                fontSize: '48px',
                color: '#ffffff',
                marginBottom: '40px',
                opacity: titleOpacity,
                fontWeight: 'bold',
            }}>
                Product-Specific Structure Requirements
            </h1>

            {/* Generic handler (wrong) */}
            <div style={{
                backgroundColor: '#7f1d1d',
                padding: '30px',
                borderRadius: '10px',
                marginBottom: '30px',
                opacity: genericProgress,
                transform: `scale(${genericProgress})`,
            }}>
                <h2 style={{ color: '#fca5a5', marginBottom: '20px' }}>
                    ❌ Generic Handler (Current)
                </h2>
                <pre style={{
                    color: '#fee2e2',
                    fontSize: '16px',
                    fontFamily: 'monospace',
                    margin: 0,
                }}>
{`function createOrder(data) {
    return {
        order: {
            subject: data.subject,
            product: { category: data.category }
            // Same for all products!
        }
    };
}`}
                </pre>
            </div>

            {/* Product-specific handlers (correct) */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px',
                opacity: specificProgress,
            }}>
                <div style={{
                    backgroundColor: '#064e3b',
                    padding: '20px',
                    borderRadius: '10px',
                    transform: `translateY(${interpolate(specificProgress, [0, 1], [50, 0])}px)`,
                }}>
                    <h3 style={{ color: '#86efac', marginBottom: '15px' }}>
                        ✅ Criminal Order
                    </h3>
                    <pre style={{
                        color: '#dcfce7',
                        fontSize: '14px',
                        fontFamily: 'monospace',
                        margin: 0,
                    }}>
{`{
  order: {
    subject: {...},
    product: {
      category: "CRIMINAL"
    },
    jurisdiction: {...}
    // No verification object
  }
}`}
                    </pre>
                </div>

                <div style={{
                    backgroundColor: '#064e3b',
                    padding: '20px',
                    borderRadius: '10px',
                    transform: `translateY(${interpolate(specificProgress, [0, 1], [50, 0])}px)`,
                }}>
                    <h3 style={{ color: '#86efac', marginBottom: '15px' }}>
                        ✅ Employment Order
                    </h3>
                    <pre style={{
                        color: '#dcfce7',
                        fontSize: '14px',
                        fontFamily: 'monospace',
                        margin: 0,
                    }}>
{`{
  order: {
    subject: {...},
    product: {
      category: "EMPLOYMENT_VERIFICATION"
    },
    employmentVerification: {
      employer: "Company",
      title: "Developer"
    }
  }
}`}
                    </pre>
                </div>
            </div>
        </div>
    );
};

// Verification pattern visualization
export const VerificationPatternVisualization: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleOpacity = spring({
        frame,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 20,
    });

    const baseFieldProgress = spring({
        frame: frame - 30,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 20,
    });

    const tripleFieldProgress = spring({
        frame: frame - 60,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 40,
    });

    const exampleFields = [
        { base: 'employer', value: 'Sendoso' },
        { base: 'title', value: 'Send Curator' },
        { base: 'employedFrom', value: '2021-11-01' },
    ];

    return (
        <div style={{
            flex: 1,
            backgroundColor: '#0f172a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
        }}>
            <h1 style={{
                fontSize: '48px',
                color: '#ffffff',
                marginBottom: '40px',
                opacity: titleOpacity,
                fontWeight: 'bold',
            }}>
                Verification Triple Field Pattern
            </h1>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
                width: '100%',
                maxWidth: '800px',
            }}>
                {exampleFields.map((field, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                    }}>
                        {/* Base field */}
                        <div style={{
                            backgroundColor: '#1e40af',
                            padding: '15px',
                            borderRadius: '8px',
                            minWidth: '200px',
                            opacity: baseFieldProgress,
                            transform: `translateX(${interpolate(baseFieldProgress, [0, 1], [-50, 0])}px)`,
                        }}>
                            <div style={{ color: '#93bbfb', fontSize: '14px', marginBottom: '5px' }}>
                                Base Field
                            </div>
                            <div style={{ color: '#dbeafe', fontSize: '18px', fontFamily: 'monospace' }}>
                                {field.base}: "{field.value}"
                            </div>
                        </div>

                        {/* Arrow */}
                        <div style={{
                            color: '#60a5fa',
                            fontSize: '30px',
                            opacity: tripleFieldProgress,
                        }}>
                            →
                        </div>

                        {/* Triple fields */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            flex: 1,
                            opacity: tripleFieldProgress,
                            transform: `translateX(${interpolate(tripleFieldProgress, [0, 1], [50, 0])}px)`,
                        }}>
                            <div style={{
                                backgroundColor: '#047857',
                                padding: '10px',
                                borderRadius: '6px',
                            }}>
                                <span style={{ color: '#a7f3d0', fontFamily: 'monospace' }}>
                                    {field.base}
                                </span>
                                <span style={{ color: '#d1fae5' }}> = "{field.value}"</span>
                            </div>
                            <div style={{
                                backgroundColor: '#047857',
                                padding: '10px',
                                borderRadius: '6px',
                            }}>
                                <span style={{ color: '#a7f3d0', fontFamily: 'monospace' }}>
                                    {field.base}Verified
                                </span>
                                <span style={{ color: '#d1fae5' }}> = true</span>
                            </div>
                            <div style={{
                                backgroundColor: '#047857',
                                padding: '10px',
                                borderRadius: '6px',
                            }}>
                                <span style={{ color: '#a7f3d0', fontFamily: 'monospace' }}>
                                    {field.base}Discovered
                                </span>
                                <span style={{ color: '#d1fae5' }}> = "{field.value}"</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{
                marginTop: '40px',
                backgroundColor: '#7c2d12',
                padding: '20px 40px',
                borderRadius: '10px',
                opacity: interpolate(frame, [120, 140], [0, 1]),
            }}>
                <p style={{ color: '#fed7aa', fontSize: '20px', textAlign: 'center' }}>
                    Every verification field becomes 3 fields in the response!
                </p>
            </div>
        </div>
    );
};

// Business impact visualization
export const BusinessImpactVisualization: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleOpacity = spring({
        frame,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 20,
    });

    const metricsProgress = spring({
        frame: frame - 30,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 40,
    });

    const chartProgress = spring({
        frame: frame - 80,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 30,
    });

    const metrics = [
        { label: 'Failed Orders/Day', current: '~500', future: '<5', color: '#dc2626' },
        { label: 'Customer Complaints', current: '~50/day', future: 'Minimal', color: '#f59e0b' },
        { label: 'Manual Intervention', current: '100%', future: '<1%', color: '#8b5cf6' },
        { label: 'Success Rate', current: '0%', future: '99%+', color: '#16a34a' },
    ];

    return (
        <div style={{
            flex: 1,
            backgroundColor: '#0f172a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
        }}>
            <h1 style={{
                fontSize: '48px',
                color: '#ffffff',
                marginBottom: '40px',
                opacity: titleOpacity,
                fontWeight: 'bold',
            }}>
                Business Impact Analysis
            </h1>

            {/* Metrics comparison */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '40px',
                marginBottom: '40px',
            }}>
                {/* Current state */}
                <div style={{
                    backgroundColor: '#7f1d1d',
                    padding: '30px',
                    borderRadius: '10px',
                    opacity: metricsProgress,
                    transform: `translateX(${interpolate(metricsProgress, [0, 1], [-50, 0])}px)`,
                }}>
                    <h2 style={{ color: '#fca5a5', marginBottom: '20px', fontSize: '28px' }}>
                        Current State
                    </h2>
                    {metrics.map((metric, index) => (
                        <div key={index} style={{ marginBottom: '15px' }}>
                            <div style={{ color: '#fee2e2', fontSize: '16px', marginBottom: '5px' }}>
                                {metric.label}
                            </div>
                            <div style={{ 
                                color: '#fca5a5', 
                                fontSize: '24px', 
                                fontWeight: 'bold',
                                opacity: interpolate(
                                    metricsProgress,
                                    [index * 0.1, (index + 1) * 0.1 + 0.5],
                                    [0, 1]
                                ),
                            }}>
                                {metric.current}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Future state */}
                <div style={{
                    backgroundColor: '#064e3b',
                    padding: '30px',
                    borderRadius: '10px',
                    opacity: metricsProgress,
                    transform: `translateX(${interpolate(metricsProgress, [0, 1], [50, 0])}px)`,
                }}>
                    <h2 style={{ color: '#86efac', marginBottom: '20px', fontSize: '28px' }}>
                        After Remediation
                    </h2>
                    {metrics.map((metric, index) => (
                        <div key={index} style={{ marginBottom: '15px' }}>
                            <div style={{ color: '#dcfce7', fontSize: '16px', marginBottom: '5px' }}>
                                {metric.label}
                            </div>
                            <div style={{ 
                                color: '#86efac', 
                                fontSize: '24px', 
                                fontWeight: 'bold',
                                opacity: interpolate(
                                    metricsProgress,
                                    [index * 0.1, (index + 1) * 0.1 + 0.5],
                                    [0, 1]
                                ),
                            }}>
                                {metric.future}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ROI Timeline */}
            <div style={{
                backgroundColor: '#1e293b',
                padding: '30px',
                borderRadius: '10px',
                width: '80%',
                opacity: chartProgress,
                transform: `translateY(${interpolate(chartProgress, [0, 1], [30, 0])}px)`,
            }}>
                <h3 style={{ color: '#e2e8f0', marginBottom: '20px', fontSize: '24px' }}>
                    Implementation Timeline & ROI
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ color: '#60a5fa', fontSize: '20px', fontWeight: 'bold' }}>
                            Week 1
                        </div>
                        <div style={{ color: '#cbd5e1', fontSize: '14px' }}>
                            Field Naming Fixes
                        </div>
                        <div style={{ color: '#86efac', fontSize: '16px', marginTop: '5px' }}>
                            40% improvement
                        </div>
                    </div>
                    <div style={{ color: '#475569', fontSize: '30px' }}>→</div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ color: '#60a5fa', fontSize: '20px', fontWeight: 'bold' }}>
                            Week 2
                        </div>
                        <div style={{ color: '#cbd5e1', fontSize: '14px' }}>
                            Structure Fixes
                        </div>
                        <div style={{ color: '#86efac', fontSize: '16px', marginTop: '5px' }}>
                            75% improvement
                        </div>
                    </div>
                    <div style={{ color: '#475569', fontSize: '30px' }}>→</div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ color: '#60a5fa', fontSize: '20px', fontWeight: 'bold' }}>
                            Week 3
                        </div>
                        <div style={{ color: '#cbd5e1', fontSize: '14px' }}>
                            Core Features
                        </div>
                        <div style={{ color: '#86efac', fontSize: '16px', marginTop: '5px' }}>
                            99%+ success
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};