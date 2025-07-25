import React from 'react';
import { Composition } from 'remotion';
import { 
    FieldNamingVisualization, 
    ProductStructureVisualization,
    VerificationPatternVisualization,
    BusinessImpactVisualization 
} from './FieldNamingVisualization';

export const RemotionVideo: React.FC = () => {
    return (
        <>
            <Composition
                id="FieldNaming"
                component={FieldNamingVisualization}
                durationInFrames={180}
                fps={30}
                width={1280}
                height={720}
            />
            <Composition
                id="ProductStructure"
                component={ProductStructureVisualization}
                durationInFrames={180}
                fps={30}
                width={1280}
                height={720}
            />
            <Composition
                id="VerificationPattern"
                component={VerificationPatternVisualization}
                durationInFrames={180}
                fps={30}
                width={1280}
                height={720}
            />
            <Composition
                id="BusinessImpact"
                component={BusinessImpactVisualization}
                durationInFrames={180}
                fps={30}
                width={1280}
                height={720}
            />
        </>
    );
};