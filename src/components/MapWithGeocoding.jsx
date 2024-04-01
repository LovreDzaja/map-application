import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import Filter from './filter/Filter'; // Import the Filter component

import './Map.scss';
import 'leaflet/dist/leaflet.css';

const MapWithGeocoding = () => {
  const [coordinates, setCoordinates] = useState();
  const [placeName, setPlaceName] = useState('');
  const [filters, setFilters] = useState({
    parks: false,
    historicalSites: false,
    natureParks: false,
    parking: false,
    restaurants: false,
    cafes: false,
    supermarkets: false,
    hospitals: false,
  });
  const mapRef = useRef(null);

  const handleSearch = async () => {
    try {
      let filterQuery = "";
      if (filters.parks) {
        filterQuery += '+park';
      }
      if (filters.historicalSites) {
        filterQuery += '+museum';
      }
      if (filters.natureParks) {
        filterQuery += '+nature+park';
      }
      if (filters.parking) {
        filterQuery += '+parking';
      }
      if (filters.restaurants) {
        filterQuery += '+restaurant';
      }
      if (filters.cafes) {
        filterQuery += '+caffe';
      }
      if (filters.supermarkets) {
        filterQuery += '+supermarkets';
      }
      if (filters.hospitals) {
        filterQuery += '+hospital';
      }

      const query = encodeURIComponent(`${filterQuery} in ${placeName}`);
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const markers = data
          .filter(item => item.lat && item.lon)
          .map(item => ({
            lat: parseFloat(item.lat),
            lon: parseFloat(item.lon),
          }));
        setCoordinates(markers);
        if (mapRef.current && markers.length > 0) {
          mapRef.current.setView([markers[0].lat, markers[0].lon], 12);
        }
      } else {
        setCoordinates([]);
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
    }
  };



  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const myIcon = L.icon({
    iconUrl: require('../marker.png'),
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    className: 'marker-icon'
  });

  return (
    <div>
      <Filter onFilterChange={handleFilterChange} />
      <div className="search-container">
        <input
          className=''
          type="text"
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
          placeholder="Enter a place name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="map-container">
        <MapContainer center={coordinates?.length ? [coordinates[0].lat, coordinates[0].lon] : [51.505, -0.09]} zoom={3} ref={mapRef} style={{ height: '100vh', zIndex: '0' }} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filters.parks || filters.historicalSites || filters.natureParks || filters.parking || filters.restaurants || filters.cafes || filters.supermarkets || filters.hospitals ? (
            coordinates &&
            coordinates.map((marker, index) => (
              <Marker key={index} icon={myIcon} position={[marker.lat, marker.lon]} />
            ))
          ) : (
            coordinates && coordinates.length > 0 && (
              <Marker key={0} icon={myIcon} position={[coordinates[0].lat, coordinates[0].lon]} />
            )
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapWithGeocoding;
