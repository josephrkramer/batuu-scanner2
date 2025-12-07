import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

declare global {
    interface Window {
        MINDAR: any;
        THREE: any;
    }
}

export default function HolocronReveal() {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const mindarThreeRef = useRef<any>(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (!containerRef.current || started) return;

        const startAR = async () => {
            // Helper function to wait for MindAR
            const waitForMindAR = () => {
                return new Promise<void>((resolve, reject) => {
                    const startTime = Date.now();
                    const check = () => {
                        if (window.MINDAR && window.MINDAR.IMAGE) {
                            resolve();
                        } else if (Date.now() - startTime > 10000) { // 10s timeout
                            reject(new Error("MindAR library failed to load within timeout"));
                        } else {
                            setTimeout(check, 100);
                        }
                    };
                    check();
                });
            };

            try {
                await waitForMindAR();

                const MindARThree = window.MINDAR.IMAGE.MindARThree;
                const THREE = window.THREE;

                if (!THREE) {
                    throw new Error("Three.js not found");
                }

                const mindarThree = new MindARThree({
                    container: containerRef.current,
                    imageTargetSrc: '/assets/holocron/card.mind',
                    uiLoading: "no",
                    uiScanning: "no",
                    uiError: "no",
                });
                mindarThreeRef.current = mindarThree;

                // Ensure renderer and scene are transparent so video shows through
                const { renderer, scene, camera } = mindarThree;
                renderer.setClearColor(0x000000, 0);
                scene.background = null;

                const anchor = mindarThree.addAnchor(0);

                const loader = new THREE.GLTFLoader();
                loader.load('/assets/holocron/scene.gltf', (gltf: any) => {
                    gltf.scene.scale.set(0.1, 0.1, 0.1);
                    gltf.scene.position.set(0, -0.4, 0);
                    anchor.group.add(gltf.scene);
                });

                await mindarThree.start();

                // Inject persistent styles to override MindAR's animation loop
                const styleId = 'mindar-override-styles';
                if (!document.getElementById(styleId)) {
                    const style = document.createElement('style');
                    style.id = styleId;
                    style.innerHTML = `
                        html, body, #root {
                            background: transparent !important;
                            background-color: transparent !important;
                        }
                        
                        #root video, body > video {
                            position: fixed !important;
                            top: 50% !important;
                            left: 50% !important;
                            transform: translate(-50%, -50%) !important;
                            min-width: 100vw !important;
                            min-height: 100vh !important;
                            width: auto !important;
                            height: auto !important;
                            object-fit: fill !important; 
                            z-index: -2 !important;
                            max-width: none !important;
                            max-height: none !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            /* border: 5px solid red !important; */ /* DEBUG: Red border on video (Hidden) */
                        }
                        
                        #root canvas, body > canvas {
                            position: fixed !important;
                            top: 0 !important;
                            left: 0 !important;
                            width: 100vw !important;
                            height: 100vh !important;
                            z-index: -1 !important;
                            /* border: 5px solid blue !important; */ /* DEBUG: Blue border on canvas (Hidden) */
                        }
                    `;
                    document.head.appendChild(style);
                }

                // Append video to container if found
                const video = document.querySelector('video');
                if (video) {
                    if (containerRef.current && video.parentElement !== containerRef.current) {
                        containerRef.current.appendChild(video);
                    }
                }

                renderer.setAnimationLoop(() => {
                    renderer.render(scene, camera);
                });
                setStarted(true);
            } catch (error) {
                console.error("Failed to start MindAR", error);
            }
        };

        startAR();

        return () => {
            // Cleanup function
            const cleanup = async () => {
                const mindar = mindarThreeRef.current;
                if (mindar) {
                    try {
                        mindar.stop();
                        mindar.renderer.setAnimationLoop(null);
                    } catch (e) {
                        console.error("Error stopping MindAR", e);
                    }
                }

                // Aggressive DOM cleanup
                const videos = document.querySelectorAll('video');
                videos.forEach(v => {
                    v.srcObject = null;
                    v.remove();
                });

                const overlays = document.querySelectorAll('.mindar-ui-overlay');
                overlays.forEach(o => o.remove());

                // Remove debug overlay
                const debug = document.getElementById('debug-overlay');
                if (debug) debug.remove();

                // Remove override styles
                const styles = document.getElementById('mindar-override-styles');
                if (styles) styles.remove();
            };
            cleanup();
        };
    }, []); // Empty dependency array ensures this only runs on mount/unmount. 
    // NOT when 'started' changes, which was causing immediate cleanup!

    // Helper to inspect video style
    const getVideoDebug = () => {
        const v = document.querySelector('video');
        if (!v) return "No Video";
        const rect = v.getBoundingClientRect();
        const computed = window.getComputedStyle(v);
        return `Pos: ${Math.round(rect.top)},${Math.round(rect.left)} | Fit: ${computed.objectFit}`;
    };

    const [debugInfo, setDebugInfo] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDebugInfo(getVideoDebug());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden', background: 'transparent' }}>
            {/* Debug Overlay (Hidden by default, un-comment display to view) */}
            <div id="debug-overlay" style={{
                position: 'absolute', top: 50, right: 10,
                background: 'rgba(0,0,0,0.5)', color: 'lime',
                padding: '10px', width: '250px', zIndex: 9999,
                fontSize: '12px', pointerEvents: 'none',
                display: 'none' // HIDDEN
            }}>
                <div>AR Status: {started ? "Running" : "Initializing"}</div>
                <div>Video Elements: {document.querySelectorAll('video').length}</div>
                <div>Screen: {window.innerWidth}x{window.innerHeight}</div>
                <div>Video Rect: {debugInfo}</div>
            </div>

            <div
                ref={containerRef}
                style={{ width: '100%', height: '100%', zIndex: 1, background: 'transparent' }}
            />

            {/* Simple Loading Indicator since we disabled default UI */}
            {!started && (
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    color: 'white', zIndex: 10, fontSize: '20px'
                }}>
                    Initializing AR...
                </div>
            )}

            <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 1000 }}>
                <Button
                    type="primary"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    Back
                </Button>
            </div>
        </div>
    );
}
