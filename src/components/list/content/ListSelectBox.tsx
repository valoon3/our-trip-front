import styled from '@/styles/rightSideContent.module.scss';
import React, { useState } from 'react';

type Props = {
  key?: number;
  item: string;
  onClickHandler?: (e: any) => void;
  active: boolean;
};

const SelectList = ({ item, onClickHandler, key, active }: Props) => {
  console.log(item + ' : ' + active);

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

  const [btnActive, setBtnActive] = useState(itemsDefault);

  const onClickHandler = (e: any) => {
    // console.log(e.target.innerText);
    setBtnActive(e.target.innerText);
  };

  return (
    <div className={styled.listSelectBox}>
      {items.map((item, index) => (
        <SelectList
          item={item}
          onClickHandler={onClickHandler}
          key={index}
          active={btnActive === item ? true : false}
        />
      ))}
    </div>
  );
};

export default ListSelectBox;
