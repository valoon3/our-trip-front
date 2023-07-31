import { Loader } from '@googlemaps/js-api-loader';

interface MapLoaderHook {
  getInstance: () => Loader;
}

const mapLoaderHook = (function (): MapLoaderHook {
  let loader: Loader | null = null;

  function init() {
    return (loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      version: 'weekly',
      libraries: ['maps', 'places'],
    }));
  }

  return {
    getInstance: function (): Loader {
      if (!loader) {
        loader = init();
      }
      return loader;
    },
  };
})();

export default mapLoaderHook;
