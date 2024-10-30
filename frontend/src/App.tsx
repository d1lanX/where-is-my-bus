import { useRef, useEffect, MutableRefObject } from 'react';
import MainContainer from './components/MainContainer';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './index.css';

function App() {
  const mapContainerRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const leafletMapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapContainerRef.current && !leafletMapRef.current) {
      leafletMapRef.current = L.map(mapContainerRef.current).setView([51.505, -0.09], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(leafletMapRef.current);
    }

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  return (
    <MainContainer>
      <main className="flex flex-col border border-black">
        <section className="p-2 m-2">
          <h1 className="text-2xl font-bold">where is my bus?</h1>
          <small className="text-gray-600">we'll help you find the answer!</small>
        </section>
        <section className="border border-black h-[500px]">
          <div id="map" ref={mapContainerRef} className="h-full w-full"></div>
        </section>
      </main>
    </MainContainer>
  );
}

export default App;
