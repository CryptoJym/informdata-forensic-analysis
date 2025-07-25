// Remotion player integration for the HTML page
let currentVisualization = null;

// Initialize Remotion player
function initRemotionPlayer() {
    const playerContainer = document.getElementById('remotion-player');
    
    // Create player UI
    playerContainer.innerHTML = `
        <div id="video-container" style="position: relative; width: 100%; height: 100%;">
            <div id="video-placeholder" style="
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                background: #1a1a1a;
                color: #666;
                font-size: 18px;
            ">
                Select a visualization to play
            </div>
            <video id="remotion-video" style="width: 100%; height: 100%; display: none;" controls></video>
        </div>
    `;
}

// Play specific visualization
function playVisualization(type) {
    const video = document.getElementById('remotion-video');
    const placeholder = document.getElementById('video-placeholder');
    
    // Map visualization types to video files
    const videoMap = {
        'field-naming': 'out/FieldNaming.mp4',
        'structure': 'out/ProductStructure.mp4',
        'verification': 'out/VerificationPattern.mp4',
        'impact': 'out/BusinessImpact.mp4'
    };
    
    if (videoMap[type]) {
        placeholder.style.display = 'none';
        video.style.display = 'block';
        video.src = videoMap[type];
        video.play();
        currentVisualization = type;
    }
}

// Button click handlers
function playFieldNamingViz() {
    playVisualization('field-naming');
}

function playStructureViz() {
    playVisualization('structure');
}

function playVerificationViz() {
    playVisualization('verification');
}

function playImpactViz() {
    playVisualization('impact');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initRemotionPlayer();
});

// Export functions to global scope
window.playFieldNamingViz = playFieldNamingViz;
window.playStructureViz = playStructureViz;
window.playVerificationViz = playVerificationViz;
window.playImpactViz = playImpactViz;