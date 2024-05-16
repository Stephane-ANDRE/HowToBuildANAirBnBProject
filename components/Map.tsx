// Hook to manage client-side functionality
"use client"

// Import necessary modules and components
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useCountries } from "@/app/lib/getCountries"
import { icon } from "leaflet"


const ICON = icon({
    iconUrl: "https://emassi.fr/wp-content/uploads/2017/10/Map-Marker-PNG-File.png",
    iconSize: [25, 25],
})

// Export the Map component as a function
export default function Map({ locationValue }: { locationValue: string }) {
    // Use the useCountries hook to get the country by value
    const { getCountryByValue } = useCountries()
    const latLang = getCountryByValue(locationValue)?.latLang

    // Return the MapContainer component with the relevant props and child components
    return (
        <MapContainer 
            // Disable scroll wheel zoom
            scrollWheelZoom={false} 
            // Set the className for styling
            className="h-[50vh] rounded-lg relative z-0"
            // Set the center of the map based on the latLang value
            center={ latLang?? [51.505, -0.09]}
            // Set the initial zoom level
            zoom={7}
        >
            {/* Add a TileLayer component for the map tiles*/}
            <TileLayer
                // Set the attribution for the map data
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                // Set the URL for the map tiles
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={latLang ?? [51.505, -0.09]} icon={ICON}/>
        </MapContainer>
    )
}