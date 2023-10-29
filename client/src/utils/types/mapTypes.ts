interface MapType {
  from?: string;
  to?: string;

  positions?: {
    start?: {
      side?: string;
    };
    end?: {
      side?: string;
    };
  };
  style?: string;
}
export default MapType;
