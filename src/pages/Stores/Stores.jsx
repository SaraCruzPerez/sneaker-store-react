import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { stores } from '../../data/storesData';
import L from 'leaflet';
import './Stores.css';

const orangeIcon = new L.DivIcon({
  className: 'store-marker-custom',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (map) {
      map.setView(center, zoom);
      map.invalidateSize();
    }
  }, [center, zoom, map]);
  return null;
}

const Stores = () => {
  const SPAIN_CENTER = [40.4167, -3.7037];
  const [view, setView] = useState(SPAIN_CENTER);
  const [zoom, setZoom] = useState(5);
  
  const mapSectionRef = useRef(null);

  const scrollToMap = () => {
    if (window.innerWidth < 768) {
      mapSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStoreClick = (coords) => {
    setView(coords);
    setZoom(15);
    scrollToMap();
  };

  const handleReset = () => {
    setView(SPAIN_CENTER);
    setZoom(5);
    scrollToMap();
  };

  return (
    <main className="stores">
      <div className="stores__container">        
        <header className="stores__header">
          <div className="stores__text">
            <h1 className="stores__title">Our <span className="stores__title--orange">Stores</span></h1>
            <p className="stores__subtitle">Find us in the most iconic neighborhoods.</p>
          </div>
          <button className="stores__reset" onClick={handleReset}>
            View all on map
          </button>
        </header>

        <div className="stores__content">
          <section className="stores__info">
            <div className="stores__list">
              {stores.map(store => (
                <article 
                  key={store.id} 
                  className={`stores__item ${view[0] === store.coords[0] ? 'is-active' : ''}`}
                  onClick={() => handleStoreClick(store.coords)}
                >
                  <span className="stores__city">{store.city}</span>
                  <h3 className="stores__name">{store.name}</h3>
                  <p className="stores__address">{store.address}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="stores__map" ref={mapSectionRef}>
            <div className="stores__map-wrapper">
              <MapContainer center={view} zoom={zoom} zoomControl={false} scrollWheelZoom={false}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                <MapController center={view} zoom={zoom} />
                {stores.map(store => (
                  <Marker key={store.id} position={store.coords} icon={orangeIcon} />
                ))}
              </MapContainer>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Stores;