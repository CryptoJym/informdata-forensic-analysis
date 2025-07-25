import React from 'react';
import { Composition, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

// Repository transformation animation showing the impact of PRD implementation
export const RepositoryTransformationVisualization: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animation phases
    const introProgress = spring({
        frame,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 20,
    });

    const currentStateProgress = spring({
        frame: frame - 30,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 30,
    });

    const prdApplicationProgress = spring({
        frame: frame - 80,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 20,
    });

    const transformationProgress = spring({
        frame: frame - 110,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 40,
    });

    const resultsProgress = spring({
        frame: frame - 160,
        fps,
        from: 0,
        to: 1,
        durationInFrames: 20,
    });

    // Repository states
    const repositories = [
        {
            name: 'vuplicity-api',
            status: 'incorrect',
            files: 12,
            issues: ['camelCase fields', 'No JWT auth', 'Generic handlers'],
            fixed: ['PascalCase fields', 'JWT token flow', 'Product-specific'],
        },
        {
            name: 'vuplicity-hr-portal',
            status: 'correct',
            files: 3,
            issues: [],
            fixed: ['Already correct', 'Reference implementation'],
        },
        {
            name: 'vuplicity-employee-portal',
            status: 'unknown',
            files: 5,
            issues: ['Unknown state', 'Needs audit'],
            fixed: ['Aligned with HR Portal', 'Fully compliant'],
        },
    ];

    const getRepoColor = (status: string, isFixed: boolean = false) => {
        if (isFixed) return '#10b981'; // Green for fixed
        switch (status) {
            case 'incorrect': return '#ef4444'; // Red
            case 'correct': return '#10b981'; // Green
            case 'unknown': return '#f59e0b'; // Amber
            default: return '#6b7280'; // Gray
        }
    };

    return (
        <div style={{
            flex: 1,
            backgroundColor: '#0a0a0a',
            display: 'flex',
            flexDirection: 'column',
            padding: '40px',
            overflow: 'hidden',
        }}>
            {/* Title */}
            <h1 style={{
                fontSize: '56px',
                color: '#ffffff',
                textAlign: 'center',
                marginBottom: '10px',
                opacity: introProgress,
                fontWeight: 'bold',
                textShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
            }}>
                Repository Transformation Flow
            </h1>
            <p style={{
                fontSize: '20px',
                color: '#94a3b8',
                textAlign: 'center',
                marginBottom: '40px',
                opacity: introProgress,
            }}>
                InformData API Integration Impact Across All Repositories
            </p>

            {/* Main visualization area */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
            }}>
                {/* Current State Section */}
                <div style={{
                    position: 'absolute',
                    left: '50px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    opacity: currentStateProgress,
                }}>
                    <h2 style={{
                        color: '#ef4444',
                        fontSize: '24px',
                        marginBottom: '20px',
                        textAlign: 'center',
                    }}>
                        Current State
                    </h2>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}>
                        {repositories.map((repo, index) => (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: '#1e293b',
                                    border: `2px solid ${getRepoColor(repo.status)}`,
                                    borderRadius: '12px',
                                    padding: '20px',
                                    minWidth: '280px',
                                    transform: `translateX(${interpolate(
                                        currentStateProgress,
                                        [index * 0.1, (index + 1) * 0.1 + 0.5],
                                        [-100, 0]
                                    )}px)`,
                                    boxShadow: `0 0 20px ${getRepoColor(repo.status)}40`,
                                }}>
                                <h3 style={{
                                    color: getRepoColor(repo.status),
                                    fontSize: '18px',
                                    marginBottom: '10px',
                                    fontFamily: 'monospace',
                                }}>
                                    {repo.name}
                                </h3>
                                <div style={{
                                    color: '#94a3b8',
                                    fontSize: '14px',
                                    marginBottom: '10px',
                                }}>
                                    {repo.files} files affected
                                </div>
                                {repo.issues.length > 0 && (
                                    <ul style={{
                                        margin: 0,
                                        paddingLeft: '20px',
                                        color: '#ef4444',
                                        fontSize: '14px',
                                    }}>
                                        {repo.issues.map((issue, i) => (
                                            <li key={i}>{issue}</li>
                                        ))}
                                    </ul>
                                )}
                                {repo.issues.length === 0 && (
                                    <div style={{ color: '#10b981', fontSize: '14px' }}>
                                        ✓ Already compliant
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* PRD Application Arrow */}
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    opacity: prdApplicationProgress,
                }}>
                    <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: `scale(${prdApplicationProgress})`,
                        boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)',
                    }}>
                        <div style={{
                            color: 'white',
                            fontSize: '48px',
                            fontWeight: 'bold',
                        }}>
                            PRD
                        </div>
                    </div>
                    <div style={{
                        marginTop: '20px',
                        fontSize: '16px',
                        color: '#3b82f6',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}>
                        Product Requirements
                        <br />
                        Documents Applied
                    </div>
                    <div style={{
                        fontSize: '60px',
                        color: '#3b82f6',
                        marginTop: '10px',
                        transform: `scaleX(${transformationProgress})`,
                    }}>
                        →
                    </div>
                </div>

                {/* Future State Section */}
                <div style={{
                    position: 'absolute',
                    right: '50px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    opacity: transformationProgress,
                }}>
                    <h2 style={{
                        color: '#10b981',
                        fontSize: '24px',
                        marginBottom: '20px',
                        textAlign: 'center',
                    }}>
                        After Transformation
                    </h2>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}>
                        {repositories.map((repo, index) => (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: '#1e293b',
                                    border: `2px solid #10b981`,
                                    borderRadius: '12px',
                                    padding: '20px',
                                    minWidth: '280px',
                                    transform: `translateX(${interpolate(
                                        transformationProgress,
                                        [index * 0.1, (index + 1) * 0.1 + 0.5],
                                        [100, 0]
                                    )}px)`,
                                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
                                }}>
                                <h3 style={{
                                    color: '#10b981',
                                    fontSize: '18px',
                                    marginBottom: '10px',
                                    fontFamily: 'monospace',
                                }}>
                                    {repo.name}
                                </h3>
                                <div style={{
                                    color: '#94a3b8',
                                    fontSize: '14px',
                                    marginBottom: '10px',
                                }}>
                                    100% compliant
                                </div>
                                <ul style={{
                                    margin: 0,
                                    paddingLeft: '20px',
                                    color: '#10b981',
                                    fontSize: '14px',
                                }}>
                                    {repo.fixed.map((fix, i) => (
                                        <li key={i}>✓ {fix}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Summary */}
            <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#1e293b',
                padding: '30px 60px',
                borderRadius: '16px',
                border: '2px solid #3b82f6',
                opacity: resultsProgress,
                boxShadow: '0 0 40px rgba(59, 130, 246, 0.3)',
            }}>
                <h3 style={{
                    color: '#3b82f6',
                    fontSize: '24px',
                    marginBottom: '20px',
                    textAlign: 'center',
                }}>
                    Transformation Results
                </h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '40px',
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ color: '#ef4444', fontSize: '32px', fontWeight: 'bold' }}>
                            60%
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '14px', marginTop: '5px' }}>
                            Files Incorrect
                        </div>
                    </div>
                    <div style={{ fontSize: '30px', color: '#475569', alignSelf: 'center' }}>
                        →
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ color: '#10b981', fontSize: '32px', fontWeight: 'bold' }}>
                            100%
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '14px', marginTop: '5px' }}>
                            Compliant
                        </div>
                    </div>
                    <div style={{
                        textAlign: 'center',
                        borderLeft: '2px solid #334155',
                        paddingLeft: '40px',
                    }}>
                        <div style={{ color: '#f59e0b', fontSize: '20px', fontWeight: 'bold' }}>
                            2-3 Days
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '14px', marginTop: '5px' }}>
                            Implementation Time
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// API Flow Comparison Animation
export const APIFlowComparisonVisualization: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animation timing
    const titleFade = spring({ frame, fps, from: 0, to: 1, durationInFrames: 20 });
    const currentFlowProgress = spring({ frame: frame - 20, fps, from: 0, to: 1, durationInFrames: 40 });
    const correctFlowProgress = spring({ frame: frame - 80, fps, from: 0, to: 1, durationInFrames: 40 });
    const comparisonProgress = spring({ frame: frame - 140, fps, from: 0, to: 1, durationInFrames: 20 });

    const steps = {
        current: [
            { step: 1, action: 'Create Order', status: 'error', detail: 'Uses camelCase (firstName)' },
            { step: 2, action: 'API Call', status: 'error', detail: '400 Bad Request' },
            { step: 3, action: 'Retry Logic', status: 'warning', detail: 'Manual intervention' },
            { step: 4, action: 'Order Failed', status: 'error', detail: '100% failure rate' },
        ],
        correct: [
            { step: 1, action: 'JWT Auth', status: 'success', detail: 'GET /authenticate' },
            { step: 2, action: 'Create Order', status: 'success', detail: 'PascalCase (FirstName)' },
            { step: 3, action: 'API Call', status: 'success', detail: '201 Created' },
            { step: 4, action: 'Process Response', status: 'success', detail: 'Triple pattern parsed' },
        ],
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'error': return '#ef4444';
            case 'warning': return '#f59e0b';
            case 'success': return '#10b981';
            default: return '#6b7280';
        }
    };

    return (
        <div style={{
            flex: 1,
            backgroundColor: '#0a0a0a',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <h1 style={{
                fontSize: '48px',
                color: '#ffffff',
                textAlign: 'center',
                marginBottom: '40px',
                opacity: titleFade,
                fontWeight: 'bold',
            }}>
                API Integration Flow Comparison
            </h1>

            <div style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '60px',
            }}>
                {/* Current Flow */}
                <div style={{ opacity: currentFlowProgress }}>
                    <h2 style={{
                        color: '#ef4444',
                        fontSize: '28px',
                        marginBottom: '30px',
                        textAlign: 'center',
                    }}>
                        ❌ Current Implementation
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {steps.current.map((step, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    opacity: interpolate(
                                        currentFlowProgress,
                                        [index * 0.2, index * 0.2 + 0.4],
                                        [0, 1]
                                    ),
                                    transform: `translateX(${interpolate(
                                        currentFlowProgress,
                                        [index * 0.2, index * 0.2 + 0.4],
                                        [-50, 0]
                                    )}px)`,
                                }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    backgroundColor: getStatusColor(step.status),
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    flexShrink: 0,
                                }}>
                                    {step.step}
                                </div>
                                <div style={{
                                    marginLeft: '20px',
                                    flex: 1,
                                    backgroundColor: '#1e293b',
                                    padding: '15px 20px',
                                    borderRadius: '8px',
                                    border: `1px solid ${getStatusColor(step.status)}40`,
                                }}>
                                    <div style={{
                                        color: getStatusColor(step.status),
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        marginBottom: '5px',
                                    }}>
                                        {step.action}
                                    </div>
                                    <div style={{ color: '#94a3b8', fontSize: '14px' }}>
                                        {step.detail}
                                    </div>
                                </div>
                                {index < steps.current.length - 1 && (
                                    <div style={{
                                        position: 'absolute',
                                        left: '30px',
                                        top: '70px',
                                        width: '2px',
                                        height: '40px',
                                        backgroundColor: getStatusColor(step.status),
                                        opacity: 0.5,
                                    }} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Correct Flow */}
                <div style={{ opacity: correctFlowProgress }}>
                    <h2 style={{
                        color: '#10b981',
                        fontSize: '28px',
                        marginBottom: '30px',
                        textAlign: 'center',
                    }}>
                        ✅ Correct Implementation
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {steps.correct.map((step, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    opacity: interpolate(
                                        correctFlowProgress,
                                        [index * 0.2, index * 0.2 + 0.4],
                                        [0, 1]
                                    ),
                                    transform: `translateX(${interpolate(
                                        correctFlowProgress,
                                        [index * 0.2, index * 0.2 + 0.4],
                                        [50, 0]
                                    )}px)`,
                                }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    backgroundColor: getStatusColor(step.status),
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    flexShrink: 0,
                                }}>
                                    {step.step}
                                </div>
                                <div style={{
                                    marginLeft: '20px',
                                    flex: 1,
                                    backgroundColor: '#1e293b',
                                    padding: '15px 20px',
                                    borderRadius: '8px',
                                    border: `1px solid ${getStatusColor(step.status)}40`,
                                }}>
                                    <div style={{
                                        color: getStatusColor(step.status),
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        marginBottom: '5px',
                                    }}>
                                        {step.action}
                                    </div>
                                    <div style={{ color: '#94a3b8', fontSize: '14px' }}>
                                        {step.detail}
                                    </div>
                                </div>
                                {index < steps.correct.length - 1 && (
                                    <div style={{
                                        position: 'absolute',
                                        left: '30px',
                                        top: '70px',
                                        width: '2px',
                                        height: '40px',
                                        backgroundColor: getStatusColor(step.status),
                                        opacity: 0.5,
                                    }} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Comparison Stats */}
            <div style={{
                marginTop: '40px',
                display: 'flex',
                justifyContent: 'center',
                opacity: comparisonProgress,
            }}>
                <div style={{
                    backgroundColor: '#1e293b',
                    padding: '20px 40px',
                    borderRadius: '12px',
                    border: '2px solid #3b82f6',
                    display: 'flex',
                    gap: '60px',
                    alignItems: 'center',
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ color: '#ef4444', fontSize: '36px', fontWeight: 'bold' }}>
                            0%
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '14px' }}>
                            Current Success Rate
                        </div>
                    </div>
                    <div style={{ color: '#3b82f6', fontSize: '40px' }}>
                        →
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ color: '#10b981', fontSize: '36px', fontWeight: 'bold' }}>
                            99%+
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '14px' }}>
                            After Implementation
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};