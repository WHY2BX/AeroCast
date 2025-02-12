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
  

  export interface WeatherProps {
    wind: any;
    main: any;
    weather: {
      main: {
        temp: number;
        temp_max: number;
        temp_min: number;
        humidity: number;
        feels_like: number;
      };
      weather: {
        main: string;
      }[];
      wind: {
        speed: number;
      };
    };
  }

  export interface ForecastProps {
    forecast: Array<{
      dt: number;
      weather: Array<{
        main: string;
        icon: string;
      }>;
      temp: {
        min: number;
        max: number;
      };
    }>;
  }

  export interface HistoryProp {
    city: Location;
    list: WeatherProps[];
  }
  
  interface PmData {
    components: {
      pm2_5: number;
    };
  }