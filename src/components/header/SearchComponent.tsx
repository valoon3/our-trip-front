import styled from '@/styles/header.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMapOption, SetMapOptionType } from '@/app/reduce/mapSlice';
import mapLoaderHook from '@/coustomHook/mapLoaderHook';
import { RootState } from '@/app/store';

const SearchComponent = () => {
  const [searchText, setSearchText] = useState<string>('');
  const loader = mapLoaderHook.getInstance();
  let { lng, lat, zoom } = useSelector((state: RootState) => state.map);

  const dispatch = useDispatch();

  let onChange = useCallback(
    (e: any) => {
      setSearchText(e.target.value);
      console.log(searchText);
    },
    [searchText]
  );

  const googleFindPlaceCallback = useCallback(
    (
      placeResultArray: google.maps.places.PlaceResult[] | null,
      status: google.maps.places.PlacesServiceStatus
    ) => {
      console.log(placeResultArray);
      console.log(status);
      if (status === 'OK' && placeResultArray !== null) {
        const placeArray = new Array<SetMapOptionType>();

        placeResultArray.forEach((place, index) => {
          const location = place.geometry?.location;
          const lat = location?.lat();
          const lng = location?.lng();

          const point: SetMapOptionType = {
            name: place.name,
            lat: lat,
            lng: lng,
            zoom: 13,
          };

          placeArray.push(point);
        });

        dispatch(
          setMapOption({
            lat: placeResultArray[0].geometry?.location?.lat() || lat,
            lng: placeResultArray[0].geometry?.location?.lng() || lng,
            markers: placeArray,
            zoom: 14,
          })
        );
      }
    },
    []
  );

  const findPlace = (request: google.maps.places.FindPlaceFromQueryRequest) => {
    (async function searchPlace() {
      const { PlacesService } = await loader.importLibrary('places');

      try {
        const services = new PlacesService(
          document.getElementById('map') as HTMLDivElement
        );
        services.findPlaceFromQuery(request, googleFindPlaceCallback);
      } catch (err) {
        console.error('검색 에러 : ', err);
      }
    })();
  };

  let onClickHandler = useCallback(() => {
    const request = {
      query: searchText,
      fields: ['ALL'],
    };
    findPlace(request);
  }, [searchText, loader]);

  let submitHandler = useCallback(
    (e: any) => {
      e.preventDefault();
      onClickHandler();
    },
    [onClickHandler]
  );

  return (
    <>
      <form onSubmit={submitHandler} className={styled.headerSearch}>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchText}
          onChange={onChange}
        />
        <AiOutlineSearch
          onClick={onClickHandler}
          style={{ cursor: 'pointer' }}
        />
      </form>
    </>
  );
};

export default SearchComponent;
