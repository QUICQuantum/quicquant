import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const GptSection = () => {
    const [scale, setScale] = useState({ widthScale: 1, heightScale: 1 });

    useEffect(() => {
        const handleResize = () => {
            const image = document.getElementById('interactive-image');
            const widthScale = image.offsetWidth / 1897; // 1897 is the original width
            const heightScale = image.offsetHeight / 920; // 920 is the original height

            setScale({ widthScale, heightScale });
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial calculation
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const calculateCoords = (originalCoords) => {
        const [x1, y1, x2, y2] = originalCoords;
        const { widthScale, heightScale } = scale;

        return [
            Math.round(x1 * widthScale),
            Math.round(y1 * heightScale),
            Math.round(x2 * widthScale),
            Math.round(y2 * heightScale),
        ].join(',');
    };

    return (
        <div>
            <Image
                id="interactive-image"
                style={{
                    objectFit: 'contain',
                    marginTop: '-50px',
                    width: '100%',
                }}
                src="/images/bg/GptSection.svg"
                useMap="#planetmap"
                alt="YES"
                height={1015} // Fixed height
                width={100} // Fixed width
            />
            <map name="planetmap">
                <area
                    shape="rect"
                    coords={calculateCoords([560, 100, 330, 50])}
                    href="text-generator"
                    alt="Text"
                />
                <area
                    shape="rect"
                    coords={calculateCoords([1620, 140, 1370, 80])}
                    href="image-generator"
                    alt="Image"
                />
                <area
                    shape="rect"
                    coords={calculateCoords([1235, 65, 1000, 10])}
                    href="speech-to-text"
                    alt="Audio"
                />
            </map>
        </div>
    );
};

export default GptSection;
