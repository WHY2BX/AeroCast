export type Location = {
    latitude: number;
    longitude: number;
    cityName?: string;
  };

  export interface SearchProps {
    setLocation?: (value: { latitude: number; longitude: number; cityName: string }) => void;
    setSearchResult: (value: string) => void;
    setSearch: (value: string) => void;
    search?: string;
    results?: any;
  }
  