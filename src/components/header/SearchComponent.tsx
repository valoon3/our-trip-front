import styled from '@/styles/header.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import React, { useCallback, useState } from 'react';
import mapLoaderHook from '@/coustomHook/mapLoaderHook';
import { SearchService } from '@/components/header/searchService';

const SearchComponent = () => {
  const [searchText, setSearchText] = useState<string>('');
  const loader = mapLoaderHook.getInstance();
  const searchService = new SearchService();

  let onChange = useCallback(
    (e: any) => {
      setSearchText(e.target.value);
      console.log(searchText);
    },
    [searchText]
  );

  let onClickHandler = useCallback(() => {
    const request = {
      query: searchText,
      fields: ['ALL'],
    };
    searchService.findPlace(request).then(() => {});
  }, [searchText, searchService]);

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
