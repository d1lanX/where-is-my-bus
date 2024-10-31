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
      leafletMapRef.current = L.map(mapContainerRef.current).setView([3.9, -76.29], 16);

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
        <section className="flex justify-between p-2 m-2 gap-8">
          <section>
            <h1 className="text-2xl font-bold">where is my bus?</h1>
            <small className="text-gray-600">we'll help you find the answer!</small>
          </section>
          <section className='flex flex-col'>
            <h1 className="text-2xl text-gray-600 font-bold text-right" title='bus'>time until next</h1>
            <small className="text-gray-600 text-right animate-pulse delay-700 text-red-800">00:00</small>
          </section>
        </section>
        <section className="border border-black h-[500px]">
          <div id="map" ref={mapContainerRef} className="h-full w-full"></div>
        </section>
      </main>
    </MainContainer>
  );
}

export default App;
