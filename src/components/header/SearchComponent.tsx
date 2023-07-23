import styled from '@/styles/header.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import React, { ChangeEvent, FormEvent, useState } from 'react';

const SearchComponent = () => {
  const [searchText, setSearchText] = useState<string>('');
  let places: kakao.maps.services.Places;

  let [kakaoMapOnload, setkakaoMapOnload] = useState(false);

  let onClickSearch = () => {};

  kakao.maps.load(() => {
    setkakaoMapOnload(true);
    places = new kakao.maps.services.Places();

    onClickSearch = () => {
      console.log(searchText);
      places.keywordSearch(searchText, searchCallback);
    };
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const searchCallback = (
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
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClickSearch();
  };

  return (
    <form className={styled.headerSearch} onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchText}
        onChange={onChange}
      />
      {kakaoMapOnload ? (
        <p>now loading</p>
      ) : (
        <AiOutlineSearch
          onClick={onClickSearch}
          style={{ cursor: 'pointer' }}
        />
      )}
    </form>
  );
};

export default SearchComponent;
