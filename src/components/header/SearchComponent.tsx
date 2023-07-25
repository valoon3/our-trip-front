import styled from '@/styles/header.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import React, { useCallback, useState } from 'react';

const SearchComponent = () => {
  const [searchText, setSearchText] = useState<string>('');
  let places: kakao.maps.services.Places;

  // const onChange = (e: ChangeEvent<HTMLInputElement>) => {
  let onChange = (e: any) => {
    setSearchText(e.target.value);
  };

  let onClickHandler = useCallback(() => {
    if (searchText.length === 0) return console.log('검색어를 입력해주세요');

    kakao.maps.load(() => {
      places = new kakao.maps.services.Places();
      places.keywordSearch(searchText, searchCallback);
    });
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
