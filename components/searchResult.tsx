import {SearchProps} from "@/app/lib/definitions"


export default function SearchResultList({ results, setLocation, setSearchResult, setSearch }: SearchProps) {

  function selectLocation(latitude: number, longitude: number, cityName: string) {
    const location = ({
      latitude: latitude,
      longitude: longitude,
      cityName: cityName
    })
    setLocation(location)
    setSearchResult('')
    setSearch('')
  }

  return (
    <div id='root'>
      <div className="absolute top-full left-0 w-full bg-white shadow-lg z-[9999] border border-gray-200">
        {
          Array.isArray(results?.data) &&
          results.data.map((result, index) => {
            if (result?.name?.toLowerCase() !== 'unknown' && result?.LocalizedName?.toLowerCase() !== 'unknown') {
              return (                                                                  //เนื่องจาก api การsearch เเบบชื่อเมือง(Openweather)เเละ zip code(AccuWeather) มาจากคนละที่ทำให้ต้องใช้ condition check
                <div key={index} className="p-2 hover:bg-gray-100" onClick={() => selectLocation(result?.lat||result?.GeoPosition?.Latitude, result?.lon || result?.GeoPosition?.Longitude , result?.name || result?.LocalizedName)}>
                  {result?.name || result?.LocalizedName}, {result?.Country?.LocalizedName || result?.country}
                </div>
              );
            }
            return null;
          })
        }
      </div>
    </div>
  );
}
