import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { stores } from '../../data/storesData.js';
import L from 'leaflet';
import type { LatLngExpression } from 'leaflet';
import './Stores.css';

import type { Store } from '../../types/models.js';

const orangeIcon = new L.DivIcon({
  className: 'store-marker-custom',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

interface MapControllerProps {
  center: LatLngExpression;
  zoom: number;
}

function MapController({ center, zoom }: MapControllerProps) {
  const map = useMap();
  useEffect(() => {
    if (map) {
      map.setView(center, zoom);
      map.invalidateSize();
    }
  }, [center, zoom, map]);
  return null;
}

const Stores: React.FC = () => {
  const SPAIN_CENTER: LatLngExpression = [40.4167, -3.7037];
  const [view, setView] = useState<LatLngExpression>(SPAIN_CENTER);
  const [zoom, setZoom] = useState<number>(5);  
  const mapSectionRef = useRef<HTMLElement>(null);

  const scrollToMap = (): void => {
    if (window.innerWidth < 768) {
      mapSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStoreClick = (coords: LatLngExpression): void => {
    setView(coords);
    setZoom(15);
    scrollToMap();
  };

  const handleReset = (): void => {
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
          <button type="button" className="stores__reset" onClick={handleReset}>
            View all on map
          </button>
        </header>

        <div className="stores__content">
          <nav className="stores__info" aria-label="Stores list">
            <ul className="stores__list">
              {stores.map((store: Store) => {
                const storeCoords = store.coords as [number, number];
                const currentView = view as [number, number];
                const isActive = currentView[0] === storeCoords[0] && currentView[1] === storeCoords[1];

                return (
                  <li key={store.id} className="stores__list-item">
                    <button 
                      type="button"
                      className={`stores__item ${isActive ? 'is-active' : ''}`}
                      onClick={() => handleStoreClick(store.coords as LatLngExpression)}
                      aria-current={isActive ? 'location' : undefined}
                    >
                      <span className="stores__city">{store.city}</span>
                      <h3 className="stores__name">{store.name}</h3>
                      <p className="stores__address">{store.address}</p>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <section className="stores__map" ref={mapSectionRef} aria-label="Map location">
            <div className="stores__map-wrapper">
              <MapContainer 
                center={view} 
                zoom={zoom} 
                zoomControl={false} 
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                <MapController center={view} zoom={zoom} />
                {stores.map((store: Store) => (
                  <Marker 
                    key={store.id} 
                    position={store.coords as LatLngExpression} 
                    icon={orangeIcon}
                  />
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