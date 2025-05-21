import Map from '../../utils/map';

export async function storyMapper(data) {
  return {
    ...data,
    location: {
      ...data.location,
      placeName: await Map.getPlaceNameByCoordinate(data.location.lat, data.location.lon),
    },
  };
}
