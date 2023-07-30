import { Loader } from '@googlemaps/js-api-loader';

const mapLoaderHook = function (): Loader {
  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    version: 'weekly',
    libraries: ['maps', 'places'],
  });

  return loader;
};

export default mapLoaderHook;
