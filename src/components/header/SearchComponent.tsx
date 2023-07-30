import styled from '@/styles/header.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import mapLoaderHook from '@/coustomHook/mapLoaderHook';
import { setCoordinate } from '@/app/reduce/mapSlice';

let map: google.maps.Map;

const SearchComponent = () => {
  const [searchText, setSearchText] = useState<string>('');

  const dispatch = useDispatch();
  let loader = mapLoaderHook();

  let onChange = (e: any) => {
    setSearchText(e.target.value);
    console.log(searchText);
  };

  const findPlace = (request: google.maps.places.FindPlaceFromQueryRequest) => {
    loader
      .importLibrary('places')
      .then(({ PlacesService }) => {
        const services = new PlacesService(document.getElementById('map'));
        services.findPlaceFromQuery(
          request,
          (
            a: google.maps.places.PlaceResult[] | null,
            b: google.maps.places.PlacesServiceStatus
          ) => {
            console.log(a);
            console.log(b);
          }
        );
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
  }, [searchText, loader]);

  let submitHandler = useCallback(
    (e: any) => {
      e.preventDefault();
      onClickHandler();
    },
    [onClickHandler]
  );

  useEffect(() => {
    console.log('검색 컴포넌트');
    console.log(loader);
  }, [loader]);

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
