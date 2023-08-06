import styled from '@/styles/rightSideContent.module.scss';
import { useCallback, useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';

type Props = {
  title: string;
};

const SearchContent = ({ title }: Props) => {
  const [bookMarkStar, setBookMarkStar] = useState(false);

  const bookMarkStarHandler = useCallback(() => {
    setBookMarkStar(!bookMarkStar);
  }, [bookMarkStar]);

  return (
    <div className={styled.searchContent}>
      <div className={styled.sort}>
        <div>{title}</div>
        {bookMarkStar ? (
          <BsStarFill onClick={bookMarkStarHandler} size="22" color="gold" />
        ) : (
          <BsStar onClick={bookMarkStarHandler} size="22" />
        )}
      </div>

      <hr />
      <div>내용</div>
    </div>
  );
};

export default SearchContent;
