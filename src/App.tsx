import { useEffect, useRef, useState, useCallback } from 'react'
import Globe from 'globe.gl'
import './App.css'

interface CountryData {
  name: string
  timezone: string
  coordinates: [number, number]
  country_code: string
}


const COUNTRIES: CountryData[] = [
  // Major World Capitals - Americas
  { name: "United States - Washington DC", timezone: "America/New_York", coordinates: [38.9072, -77.0369], country_code: "US" },
  { name: "Canada - Ottawa", timezone: "America/Toronto", coordinates: [45.4215, -75.6972], country_code: "CA" },
  { name: "Mexico - Mexico City", timezone: "America/Mexico_City", coordinates: [19.4326, -99.1332], country_code: "MX" },
  { name: "Brazil - Brasília", timezone: "America/Sao_Paulo", coordinates: [-15.7939, -47.8828], country_code: "BR" },
  { name: "Argentina - Buenos Aires", timezone: "America/Argentina/Buenos_Aires", coordinates: [-34.6118, -58.3960], country_code: "AR" },
  { name: "Chile - Santiago", timezone: "America/Santiago", coordinates: [-33.4489, -70.6693], country_code: "CL" },
  { name: "Colombia - Bogotá", timezone: "America/Bogota", coordinates: [4.7110, -74.0721], country_code: "CO" },
  { name: "Peru - Lima", timezone: "America/Lima", coordinates: [-12.0464, -77.0428], country_code: "PE" },
  { name: "Venezuela - Caracas", timezone: "America/Caracas", coordinates: [10.4806, -66.9036], country_code: "VE" },
  { name: "Ecuador - Quito", timezone: "America/Guayaquil", coordinates: [-0.1807, -78.4678], country_code: "EC" },
  { name: "Uruguay - Montevideo", timezone: "America/Montevideo", coordinates: [-34.9011, -56.1645], country_code: "UY" },
  { name: "Paraguay - Asunción", timezone: "America/Asuncion", coordinates: [-25.2637, -57.5759], country_code: "PY" },
  { name: "Bolivia - La Paz", timezone: "America/La_Paz", coordinates: [-16.5000, -68.1193], country_code: "BO" },
  { name: "Guatemala - Guatemala City", timezone: "America/Guatemala", coordinates: [14.6349, -90.5069], country_code: "GT" },
  { name: "Costa Rica - San José", timezone: "America/Costa_Rica", coordinates: [9.9281, -84.0907], country_code: "CR" },
  { name: "Panama - Panama City", timezone: "America/Panama", coordinates: [8.9824, -79.5199], country_code: "PA" },

  // Europe
  { name: "United Kingdom - London", timezone: "Europe/London", coordinates: [51.5074, -0.1278], country_code: "GB" },
  { name: "France - Paris", timezone: "Europe/Paris", coordinates: [48.8566, 2.3522], country_code: "FR" },
  { name: "Germany - Berlin", timezone: "Europe/Berlin", coordinates: [52.5200, 13.4050], country_code: "DE" },
  { name: "Italy - Rome", timezone: "Europe/Rome", coordinates: [41.9028, 12.4964], country_code: "IT" },
  { name: "Spain - Madrid", timezone: "Europe/Madrid", coordinates: [40.4168, -3.7038], country_code: "ES" },
  { name: "Russia - Moscow", timezone: "Europe/Moscow", coordinates: [55.7558, 37.6176], country_code: "RU" },
  { name: "Netherlands - Amsterdam", timezone: "Europe/Amsterdam", coordinates: [52.3676, 4.9041], country_code: "NL" },
  { name: "Belgium - Brussels", timezone: "Europe/Brussels", coordinates: [50.8503, 4.3517], country_code: "BE" },
  { name: "Austria - Vienna", timezone: "Europe/Vienna", coordinates: [48.2082, 16.3738], country_code: "AT" },
  { name: "Switzerland - Bern", timezone: "Europe/Zurich", coordinates: [46.9481, 7.4474], country_code: "CH" },
  { name: "Poland - Warsaw", timezone: "Europe/Warsaw", coordinates: [52.2297, 21.0122], country_code: "PL" },
  { name: "Czech Republic - Prague", timezone: "Europe/Prague", coordinates: [50.0755, 14.4378], country_code: "CZ" },
  { name: "Hungary - Budapest", timezone: "Europe/Budapest", coordinates: [47.4979, 19.0402], country_code: "HU" },
  { name: "Portugal - Lisbon", timezone: "Europe/Lisbon", coordinates: [38.7223, -9.1393], country_code: "PT" },
  { name: "Greece - Athens", timezone: "Europe/Athens", coordinates: [37.9755, 23.7348], country_code: "GR" },
  { name: "Turkey - Ankara", timezone: "Europe/Istanbul", coordinates: [39.9334, 32.8597], country_code: "TR" },
  { name: "Sweden - Stockholm", timezone: "Europe/Stockholm", coordinates: [59.3293, 18.0686], country_code: "SE" },
  { name: "Norway - Oslo", timezone: "Europe/Oslo", coordinates: [59.9139, 10.7522], country_code: "NO" },
  { name: "Denmark - Copenhagen", timezone: "Europe/Copenhagen", coordinates: [55.6761, 12.5683], country_code: "DK" },
  { name: "Finland - Helsinki", timezone: "Europe/Helsinki", coordinates: [60.1695, 24.9354], country_code: "FI" },
  { name: "Iceland - Reykjavik", timezone: "Atlantic/Reykjavik", coordinates: [64.1466, -21.9426], country_code: "IS" },
  { name: "Ireland - Dublin", timezone: "Europe/Dublin", coordinates: [53.3498, -6.2603], country_code: "IE" },
  { name: "Romania - Bucharest", timezone: "Europe/Bucharest", coordinates: [44.4268, 26.1025], country_code: "RO" },
  { name: "Bulgaria - Sofia", timezone: "Europe/Sofia", coordinates: [42.6977, 23.3219], country_code: "BG" },

  // Asia
  { name: "China - Beijing", timezone: "Asia/Shanghai", coordinates: [39.9042, 116.4074], country_code: "CN" },
  { name: "Japan - Tokyo", timezone: "Asia/Tokyo", coordinates: [35.6762, 139.6503], country_code: "JP" },
  { name: "India - New Delhi", timezone: "Asia/Kolkata", coordinates: [28.6139, 77.2090], country_code: "IN" },
  { name: "South Korea - Seoul", timezone: "Asia/Seoul", coordinates: [37.5665, 126.9780], country_code: "KR" },
  { name: "Thailand - Bangkok", timezone: "Asia/Bangkok", coordinates: [13.7563, 100.5018], country_code: "TH" },
  { name: "Vietnam - Hanoi", timezone: "Asia/Ho_Chi_Minh", coordinates: [21.0285, 105.8542], country_code: "VN" },
  { name: "Indonesia - Jakarta", timezone: "Asia/Jakarta", coordinates: [-6.2088, 106.8456], country_code: "ID" },
  { name: "Malaysia - Kuala Lumpur", timezone: "Asia/Kuala_Lumpur", coordinates: [3.1390, 101.6869], country_code: "MY" },
  { name: "Singapore", timezone: "Asia/Singapore", coordinates: [1.3521, 103.8198], country_code: "SG" },
  { name: "Philippines - Manila", timezone: "Asia/Manila", coordinates: [14.5995, 120.9842], country_code: "PH" },
  { name: "Pakistan - Islamabad", timezone: "Asia/Karachi", coordinates: [33.6844, 73.0479], country_code: "PK" },
  { name: "Bangladesh - Dhaka", timezone: "Asia/Dhaka", coordinates: [23.8103, 90.4125], country_code: "BD" },
  { name: "Iran - Tehran", timezone: "Asia/Tehran", coordinates: [35.6892, 51.3890], country_code: "IR" },
  { name: "Iraq - Baghdad", timezone: "Asia/Baghdad", coordinates: [33.3152, 44.3661], country_code: "IQ" },
  { name: "Saudi Arabia - Riyadh", timezone: "Asia/Riyadh", coordinates: [24.7136, 46.6753], country_code: "SA" },
  { name: "UAE - Abu Dhabi", timezone: "Asia/Dubai", coordinates: [24.4539, 54.3773], country_code: "AE" },
  { name: "Israel - Jerusalem", timezone: "Asia/Jerusalem", coordinates: [31.7683, 35.2137], country_code: "IL" },
  { name: "Kazakhstan - Nur-Sultan", timezone: "Asia/Almaty", coordinates: [51.1694, 71.4491], country_code: "KZ" },
  { name: "Uzbekistan - Tashkent", timezone: "Asia/Tashkent", coordinates: [41.2995, 69.2401], country_code: "UZ" },
  { name: "Afghanistan - Kabul", timezone: "Asia/Kabul", coordinates: [34.5553, 69.2075], country_code: "AF" },
  { name: "Nepal - Kathmandu", timezone: "Asia/Kathmandu", coordinates: [27.7172, 85.3240], country_code: "NP" },
  { name: "Sri Lanka - Colombo", timezone: "Asia/Colombo", coordinates: [6.9271, 79.8612], country_code: "LK" },
  { name: "Myanmar - Naypyidaw", timezone: "Asia/Yangon", coordinates: [19.7633, 96.0785], country_code: "MM" },
  { name: "Cambodia - Phnom Penh", timezone: "Asia/Phnom_Penh", coordinates: [11.5564, 104.9282], country_code: "KH" },
  { name: "Laos - Vientiane", timezone: "Asia/Vientiane", coordinates: [17.9757, 102.6331], country_code: "LA" },

  // Africa
  { name: "Egypt - Cairo", timezone: "Africa/Cairo", coordinates: [30.0444, 31.2357], country_code: "EG" },
  { name: "South Africa - Cape Town", timezone: "Africa/Johannesburg", coordinates: [-33.9249, 18.4241], country_code: "ZA" },
  { name: "Nigeria - Abuja", timezone: "Africa/Lagos", coordinates: [9.0765, 7.3986], country_code: "NG" },
  { name: "Kenya - Nairobi", timezone: "Africa/Nairobi", coordinates: [-1.2921, 36.8219], country_code: "KE" },
  { name: "Morocco - Rabat", timezone: "Africa/Casablanca", coordinates: [34.0209, -6.8416], country_code: "MA" },
  { name: "Algeria - Algiers", timezone: "Africa/Algiers", coordinates: [36.7538, 3.0588], country_code: "DZ" },
  { name: "Tunisia - Tunis", timezone: "Africa/Tunis", coordinates: [36.8065, 10.1815], country_code: "TN" },
  { name: "Libya - Tripoli", timezone: "Africa/Tripoli", coordinates: [32.8872, 13.1913], country_code: "LY" },
  { name: "Sudan - Khartoum", timezone: "Africa/Khartoum", coordinates: [15.5007, 32.5599], country_code: "SD" },
  { name: "Ethiopia - Addis Ababa", timezone: "Africa/Addis_Ababa", coordinates: [9.1450, 40.4897], country_code: "ET" },
  { name: "Ghana - Accra", timezone: "Africa/Accra", coordinates: [5.6037, -0.1870], country_code: "GH" },
  { name: "Senegal - Dakar", timezone: "Africa/Dakar", coordinates: [14.7167, -17.4677], country_code: "SN" },
  { name: "Tanzania - Dodoma", timezone: "Africa/Dar_es_Salaam", coordinates: [-6.1630, 35.7516], country_code: "TZ" },
  { name: "Uganda - Kampala", timezone: "Africa/Kampala", coordinates: [0.3476, 32.5825], country_code: "UG" },
  { name: "Zimbabwe - Harare", timezone: "Africa/Harare", coordinates: [-17.8252, 31.0335], country_code: "ZW" },
  { name: "Zambia - Lusaka", timezone: "Africa/Lusaka", coordinates: [-15.3875, 28.3228], country_code: "ZM" },

  // Oceania
  { name: "Australia - Canberra", timezone: "Australia/Sydney", coordinates: [-35.2809, 149.1300], country_code: "AU" },
  { name: "New Zealand - Wellington", timezone: "Pacific/Auckland", coordinates: [-41.2865, 174.7762], country_code: "NZ" },
  { name: "Fiji - Suva", timezone: "Pacific/Fiji", coordinates: [-18.1248, 178.4501], country_code: "FJ" },
  { name: "Papua New Guinea - Port Moresby", timezone: "Pacific/Port_Moresby", coordinates: [-9.4438, 147.1803], country_code: "PG" },

  // Additional Major Cities for Better Time Zone Coverage
  { name: "Hawaii - Honolulu", timezone: "Pacific/Honolulu", coordinates: [21.3099, -157.8581], country_code: "US" },
  { name: "Alaska - Anchorage", timezone: "America/Anchorage", coordinates: [61.2181, -149.9003], country_code: "US" },
  { name: "California - Los Angeles", timezone: "America/Los_Angeles", coordinates: [34.0522, -118.2437], country_code: "US" },
  { name: "Greenland - Nuuk", timezone: "America/Godthab", coordinates: [64.1836, -51.7214], country_code: "GL" }
]

function App() {
  const globeEl = useRef<HTMLDivElement>(null)
  const globeRef = useRef<any>()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [countriesInRange, setCountriesInRange] = useState<string[]>([])
  const [pointsData, setPointsData] = useState<any[]>([])
  const [startHour, setStartHour] = useState(16) // 4 PM
  const [endHour, setEndHour] = useState(17) // 5 PM
  const [showSettings, setShowSettings] = useState(false)
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [nearestCity, setNearestCity] = useState<string>('')
  // Panel open/close (collapsed on mobile by default)
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(() => (typeof window !== 'undefined' ? window.innerWidth > 768 : true))

  // Keep panel open on desktop widths; start collapsed on mobile
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) {
        setIsPanelOpen(true)
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const getTimeInTimezone = (timezone: string): Date => {
    return new Date(new Date().toLocaleString("en-US", {timeZone: timezone}))
  }

  const isTimeInRange = (timezone: string): boolean => {
    try {
      const timeInZone = getTimeInTimezone(timezone)
      const hour = timeInZone.getHours()

      // Debug log
      console.log(`Checking ${timezone}: ${hour}:${timeInZone.getMinutes().toString().padStart(2, '0')} (Range: ${startHour}-${endHour})`)

      // Handle time range properly (including cross-midnight ranges)
      if (startHour <= endHour) {
        // Normal range (e.g., 9-17 for 9 AM to 5 PM)
        return hour >= startHour && hour < endHour
      } else {
        // Cross-midnight range (e.g., 22-02 for 10 PM to 2 AM)
        return hour >= startHour || hour < endHour
      }
    } catch (error) {
      console.error(`Error checking time for ${timezone}:`, error)
      return false
    }
  }

  const getTimeRangeDisplay = (): string => {
    const formatHour = (h: number) => `${h.toString().padStart(2,'0')}:00`
    return `${formatHour(startHour)} - ${formatHour(endHour)}`
  }

  // Haversine distance between two lat/lng points in km
  const haversine = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371
    const toRad = (v: number) => v * Math.PI / 180
    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const findNearestCity = (lat: number, lng: number): CountryData | null => {
    let best: CountryData | null = null
    let bestDist = Number.POSITIVE_INFINITY
    for (const c of COUNTRIES) {
      const [clat, clng] = c.coordinates
      const d = haversine(lat, lng, clat, clng)
      if (d < bestDist) {
        bestDist = d
        best = c
      }
    }
    return best
  }

  const updatePointsData = useCallback(() => {
    let activeCount = 0

    const updatedPoints = COUNTRIES.map(country => {
      const isActive = isTimeInRange(country.timezone)
      if (isActive) {
        activeCount++
      }
      const shouldBlink = country.name === nearestCity && isActive

      return {
        lat: country.coordinates[0],
        lng: country.coordinates[1],
        name: country.name,
        timezone: country.timezone,
        country_code: country.country_code,
        isInRange: isActive,
        emoji: isActive ? '🍺' : '😢',
        size: isActive ? 5.0 : 2.0,
        shouldBlink
      }
    })

    console.log(`Found ${activeCount} active locations in range ${startHour}-${endHour}`)

    setPointsData(updatedPoints)

    const activeCities = COUNTRIES.filter(country =>
      isTimeInRange(country.timezone)
    ).map(country => country.name)

    setCountriesInRange(activeCities)
  }, [startHour, endHour, nearestCity])


  useEffect(() => {
    updatePointsData()
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      updatePointsData()
    }, 1000) // Update every second for real-time clock

    return () => clearInterval(timer)
  }, [updatePointsData]) // Re-run when updatePointsData changes

  // Initialize globe only once (cities only, no country polygons)
  useEffect(() => {
    if (!globeEl.current || globeRef.current) return

    const globe = Globe()

    globe
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .width(window.innerWidth)
      .height(window.innerHeight)
      .showGlobe(true)
      .showAtmosphere(true)
      .atmosphereColor('#ff8c00')
      .atmosphereAltitude(0.3)

    globe.pointOfView({ lat: 20, lng: 0, altitude: 2.5 })

    globe
      .htmlElement((d: any) => {
        const el = document.createElement('div')
        el.innerHTML = d.emoji
        el.style.fontSize = `${d.size * 12}px`
        el.style.textAlign = 'center'
        el.style.cursor = 'pointer'
        el.style.userSelect = 'none'
        el.style.pointerEvents = 'auto'
        el.style.textShadow = '2px 2px 4px rgba(0,0,0,0.8)'
        el.style.filter = d.isInRange ? 'drop-shadow(0 0 8px #ffb000)' : 'none'
        // Ensure globe markers are below UI panels
        el.style.zIndex = '0'
        if (d.shouldBlink) {
          el.style.animation = 'blink 1s steps(1, end) infinite'
        } else {
          el.style.animation = ''
        }
        el.title = `${d.name}\nTimezone: ${d.timezone}\nCurrent time: ${getTimeInTimezone(d.timezone).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}\nTime range: ${getTimeRangeDisplay()}\n${d.isInRange ? `🍺 It's happy hour time!` : '🥨 Waiting for happy hour...'}`
        return el
      })
      .htmlAltitude(0.03)

    globe(globeEl.current)
    globeRef.current = globe

    setTimeout(() => {
      if (globe.controls && globe.controls()) {
        globe.controls().autoRotate = true
        globe.controls().autoRotateSpeed = 0.1
        globe.controls().enableDamping = true
        globe.controls().dampingFactor = 0.1
        globe.controls().enableZoom = true
        globe.controls().enablePan = true
      }
    }, 100)

    globe.onGlobeClick(() => {
      if (globe.controls && globe.controls()) {
        globe.controls().autoRotate = false
        setTimeout(() => {
          if (globe.controls && globe.controls()) {
            globe.controls().autoRotate = true
          }
        }, 8000)
      }
    })

    const handleResize = () => {
      globe.width(window.innerWidth).height(window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (globeEl.current) {
        globeEl.current.innerHTML = ''
      }
      globeRef.current = null
    }
  }, [])

  // Update HTML elements when pointsData changes
  useEffect(() => {
    if (globeRef.current && pointsData.length > 0) {
      // console.log('Updating HTML elements data')
      globeRef.current.htmlElementsData([...pointsData])
    }
  }, [pointsData])

  // Request user location and fly to nearest city
  useEffect(() => {
    if (!('geolocation' in navigator)) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setUserLocation({ lat: latitude, lng: longitude })
        const nearest = findNearestCity(latitude, longitude)
        if (nearest) {
          setNearestCity(nearest.name)
          if (globeRef.current) {
            globeRef.current.pointOfView({ lat: nearest.coordinates[0], lng: nearest.coordinates[1], altitude: 1.5 }, 2000)
          }
        }
      },
      (err) => {
        console.warn('Geolocation permission denied or error:', err)
      },
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }, [])


  return (
    <div className="app beer-theme">
      <button
        className="panel-toggle"
        aria-label="Toggle panel"
        onClick={() => setIsPanelOpen(prev => !prev)}
      >
        {isPanelOpen ? '◀' : '▶'}
      </button>
      <div className={`info-panel beer-panel ${isPanelOpen ? 'open' : 'collapsed'}`}>
        <div className="header-section">
          <h1>4 uur tracker</h1>
          {nearestCity && (
            <div className="nearest-info">📍 Stad bij jou in de buurt: <strong>{nearestCity}</strong></div>
          )}
          <button
            className="settings-toggle"
            onClick={() => setShowSettings(!showSettings)}
          >
            ⚙️ {showSettings ? 'Inklappen' : 'Instellings'}
          </button>
        </div>

        {showSettings && (
          <div className="settings-section">
            <h4>⏰ Time Range Settings</h4>
            <div className="time-inputs">
              <div className="time-input-group">
                <label>Van:</label>
                <select value={startHour} onChange={(e) => setStartHour(parseInt(e.target.value))}>
                  {Array.from({length: 24}, (_, i) => (
                    <option key={i} value={i}>
                      {`${i.toString().padStart(2,'0')}:00`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="time-input-group">
                <label>Tot:</label>
                <select value={endHour} onChange={(e) => setEndHour(parseInt(e.target.value))}>
                  {Array.from({length: 24}, (_, i) => (
                    <option key={i} value={i}>
                      {`${i.toString().padStart(2,'0')}:00`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="current-range">
              Huidige check tijden: <strong>{getTimeRangeDisplay()}</strong>
            </div>
          </div>
        )}

        <div className="current-time">
          <div className="time-label">🕐 Nu in UTC Time</div>
          <div className="time-display">{currentTime.toUTCString()}</div>
        </div>

        <div className="legend beer-legend">
          <h3>🍻 Status Legend</h3>
          <div className="legend-item">
            <div className="emoji-box">😢</div>
            <span>Bijna bijna...</span>
          </div>
          <div className="legend-item">
            <div className="emoji-box">🍺</div>
            <span>Jaaaaaa 🍻</span>
          </div>
        </div>

        <div className="countries-list beer-list">
          <h3>🍺 Active Locations ({getTimeRangeDisplay()}):</h3>
          {countriesInRange.length > 0 ? (
            <ul>
              {countriesInRange.map((country, index) => (
                <li key={index}>{country}</li>
              ))}
            </ul>
          ) : (
            <p className="no-beer">Niemand heeft geluk op dit moment...</p>
          )}
        </div>

        <div className="instructions beer-instructions">
          <h4>🌍 Wereldse instructies:</h4>
          <p>🖱️ Sleep aan de planeet</p>
          <p>🔍 Zoom all the things</p>
          <p>🍺 Gloeiende bier is 🍻</p>
          <p>😢 Sad face = nog niet...</p>
          <p>🔄 Auto-rotates peacefully</p>
        </div>
      </div>
      <div ref={globeEl} className="globe-container beer-globe" />
    </div>
  )
}

export default App