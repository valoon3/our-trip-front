import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import axios from 'axios';
import styled from '@/styles/rightSideContent.module.scss';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { HiChevronDoubleDown } from 'react-icons/hi';

type Props = {
  key: number;
  placeResult: any;
};

const START_SIZE = '22';

const Content = ({ placeResult }: Props) => {
  const [bookMarkStar, setBookmarkStar] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const contentType = useSelector(
    (state: RootState) => state.content.contentType
  );

  const bookmarkStarHandler = useCallback(async () => {
    // 로그인 관리
    if (!user.loginToggle) return alert('로그인 후 이용해 주세요.');

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
    setBookmarkStar(!bookMarkStar);
  }, [bookMarkStar, placeResult, user.loginToggle]);

  // 일정 추가 핸들러
  const addPlanHandler = useCallback(async () => {
    if (contentType !== 'plan') {
      // plan 추가
      await axios
        .get('/plan' /*placeResult*/)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.error(err));
    } else {
      // plan 삭제
      //
    }
  }, [placeResult, contentType]);

  useEffect(() => {
    axios.get('/trip/bookmarks').then((res) => {
      setBookmarkStar(true);
    });
  }, [contentType]);

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
          {contentType !== 'plan' ? '일정 추가' : '일정 삭제'}
        </div>
      </div>
    </div>
  );
};

export default Content;
