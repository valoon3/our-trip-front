import styled from '@/styles/rightSideContent.module.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { setContentType } from '@/app/reduce/contentSlice';

type Props = {
  item: string;
  onClickHandler?: (e: any) => void;
  active: boolean;
};

const SelectList = ({ item, onClickHandler, active }: Props) => {
  return active ? (
    <div onClick={onClickHandler} className={styled.toggleActive}>
      {item}
    </div>
  ) : (
    <div onClick={onClickHandler} className={styled.toggle}>
      {item}
    </div>
  );
};

const ListSelectBox = () => {
  const items = ['search', 'bookmark', 'plan'];
  const itemsDefault = 'search';
  const _contentType = useSelector(
    (state: RootState) => state.content.contentType
  );

  const [btnActive, setBtnActive] = useState(itemsDefault);
  const dispatch = useDispatch();

  const onClickHandler = (e: any) => {
    dispatch(setContentType(e.target.innerText));
  };

  return (
    <div className={styled.listSelectBox}>
      {items.map((item, index) => (
        <SelectList
          item={item}
          onClickHandler={onClickHandler}
          key={index}
          active={_contentType === item}
        />
      ))}
    </div>
  );
};

export default ListSelectBox;
