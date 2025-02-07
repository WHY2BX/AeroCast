interface SearchResultListProps {

  results: any;

  setLocation: (value: { latitude: number; longitude: number; cityName: string }) => void;
  setSearchResult: (value: string) => void;
  setSearch: (value: string) => void;
}
export default function SearchResultList({ results, setLocation, setSearchResult, setSearch }: SearchResultListProps) {

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
            if (result.name.toLowerCase() !== 'unknown') {
              return (
                <div key={index} className="p-2 hover:bg-gray-100" onClick={() => selectLocation(result.lat, result.lon, result.name)}>
                  {result.name}, {result.country}
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
