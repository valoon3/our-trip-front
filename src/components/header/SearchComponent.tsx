import styled from '@/styles/header.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import React, { ChangeEvent, FormEvent, useState } from 'react';

const SearchComponent = () => {
  const [searchText, setSearchText] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClickSearch();
  };

  const onClickSearch = () => {
    console.log(searchText);
  };

  return (
    <form className={styled.headerSearch} onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchText}
        onChange={onChange}
      />
      <AiOutlineSearch onClick={onClickSearch} style={{ cursor: 'pointer' }} />
    </form>
  );
};

export default SearchComponent;
