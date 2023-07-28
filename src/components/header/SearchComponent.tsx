import styled from '@/styles/header.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCoordinate } from '@/app/reduce/mapSlice';

let map: google.maps.Map;
let services: google.maps.places.PlacesService;

const SearchComponent = () => {
  const [searchText, setSearchText] = useState<string>('');
  const dispatch = useDispatch();

  // const onChange = (e: ChangeEvent<HTMLInputElement>) => {
  let onChange = (e: any) => {
    setSearchText(e.target.value);
  };

  let onClickHandler = useCallback(() => {
    if (searchText.length === 0) return console.log('검색어를 입력해주세요');

    // 구글 검색 기능
    console.log(window.document.getElementById('map')?.children[0]);
    const map = window.document.getElementById('map')?.children[0];
    const service = new google.maps.places.PlacesService(map);

    const request = {
      query: searchText,
      // fields(instance: google.maps.places.Autocomplete, fields: string[]) {
      //   return ['name', 'geometry'];
      // },
      fields: ['name', 'geometry'],
    };

    service.findPlaceFromQuery(request, (results, status) => {
      console.log('실행');

      if (results === null) return console.log('검색 결과가 없습니다.');
      else {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            console.log(results[i]);
          }

          console.log('asdfasdf');
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          // map.setCenter(results[0].geometry.location);
          dispatch(setCoordinate({ lat, lng }));
        }
      }
    });

    // 카카오 검색 기능
    // kakao.maps.load(() => {
    //   places = new kakao.maps.services.Places();
    //   places.keywordSearch(searchText, searchCallback);
    // });
  }, [searchText]);

  let submitHandler = useCallback(
    (e: any) => {
      e.preventDefault();
      onClickHandler();
    },
    [onClickHandler]
  );

  const searchCallback = useCallback(
    (
      result: kakao.maps.services.PlacesSearchResult,
      status: kakao.maps.services.Status
    ) => {
      if (status === kakao.maps.services.Status.ERROR) {
        console.log('searchCallback Error : ', status);
        return;
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        console.log('검색 결과가 없습니다.');
        return;
      }

      if (result.length === 1) {
        console.log(result);
        return;
      }

      console.log(result);
    },
    []
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
