import styled from '@/styles/header.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCoordinate, setZoom } from '@/app/reduce/mapSlice';
import { Loader } from '@googlemaps/js-api-loader';
import mapLoaderHook from '@/coustomHook/mapLoaderHook';

let map: google.maps.Map;

type Props = {
  loader: Loader;
};

const SearchComponent = () => {
  const [searchText, setSearchText] = useState<string>('');
  const loader = mapLoaderHook.getInstance();

  const dispatch = useDispatch();

  let onChange = (e: any) => {
    setSearchText(e.target.value);
    console.log(searchText);
  };

  const googleFindPlaceCallback = (
    placeResultArray: google.maps.places.PlaceResult[] | null,
    status: google.maps.places.PlacesServiceStatus
  ) => {
    if (status === 'OK' && placeResultArray !== null) {
      const location = placeResultArray[0].geometry?.location;
      dispatch(
        setCoordinate({
          lat: location?.lat() || 101,
          lng: location?.lng() || 101,
        })
      );
      console.log(placeResultArray[0].geometry?.location?.lat());
    }
  };

  const findPlace = (request: google.maps.places.FindPlaceFromQueryRequest) => {
    loader
      .importLibrary('places')
      .then(async ({ PlacesService }) => {
        const services = new PlacesService(
          document.getElementById('map') as HTMLDivElement
        );

        services.findPlaceFromQuery(request, googleFindPlaceCallback);

        dispatch(setCoordinate({ lat: 1, lng: 1 }));
      })
      .catch((err) => {
        console.error('검색 에러: ', err);
      });
  };

  let onClickHandler = useCallback(() => {
    const request = {
      fields: ['ALL'],
      query: searchText,
    };
    findPlace(request);
    dispatch(setZoom(13));
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
