import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@/styles/rightSideContent.module.scss';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { HiChevronDoubleDown } from 'react-icons/hi';

type Props = {
  key: number;
  placeResult: any;
  userCheck: () => boolean;
};

const START_SIZE = '22';

const BookmarkContent = ({ placeResult, userCheck }: Props) => {
  const [bookMarkStar, setBookMarkStar] = useState(false);

  const bookmarkStarHandler = useCallback(async () => {
    if (!userCheck()) {
      return alert('로그인 후 이용해주세요.');
    } else {
      bookMarkStar
        ? await axios.delete('/trip/bookmark/' + placeResult.id).then((res) => {
            console.log(res);
          })
        : await axios
            .post('/trip/bookmark', {
              placeResult,
            })
            .then((res) => {
              console.log(res);
            });
    }

    setBookMarkStar(!bookMarkStar);
  }, [bookMarkStar, placeResult]);

  const addPlanHandler = useCallback(async () => {}, [placeResult]);

  useEffect(() => {
    axios.get('/trip/bookmarks').then((res) => {
      setBookMarkStar(true);
    });
  }, []);

  return (
    <div className={styled.searchContent}>
      <div className={styled.sort}>
        {bookMarkStar ? (
          <BsStarFill
            onClick={bookmarkStarHandler}
            size={START_SIZE}
            color="gold"
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <BsStar
            onClick={bookmarkStarHandler}
            size={START_SIZE}
            style={{ cursor: 'pointer' }}
          />
        )}
        <div style={{ cursor: 'pointer' }}>{placeResult.name}</div>
      </div>
      <hr />
      <div className={styled.sort}>
        <HiChevronDoubleDown
          // onClick={detailOnClickHandler}
          style={{ cursor: 'pointer' }}
        />
        <div onClick={addPlanHandler} style={{ cursor: 'pointer' }}>
          일정 추가
        </div>
      </div>
    </div>
  );
};

export default BookmarkContent;
