import React from 'react'
import "../map.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default function Map({ lat, lng }) {
    return (
        <>
            {
                lat && lng &&
                <div><MapContainer id="map" center={[lat, lng]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[lat, lng]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer></div>
            }</>
    )
}
