import styled from '@/styles/rightSideContent.module.scss';
import SearchContent from '@/components/list/content/SearchContent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useCallback, useEffect, useMemo } from 'react';
import axios from 'axios';
import { setBookmarks, setPlans } from '@/app/reduce/contentSlice';
import Content from '@/components/list/content/content';

type Props = {
  // contentType: string;
};

const ContentList = () => {
  const { markers } = useSelector((state: RootState) => state.map);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { contentType, bookmarks, plans } = useSelector(
    (state: RootState) => state.content
  );

  const contents = useMemo(() => {
    if (contentType === 'bookmark') return bookmarks;
    else return plans;
  }, [bookmarks, contentType, plans]);

  const userLoginCheck = useCallback(() => {
    if (!user.loginToggle) {
      alert('로그인 후 이용해주세요.');
    }

    return user.loginToggle;
  }, [user]);

  // default contentType: bookmark

  useEffect(() => {
    if (contentType === 'bookmark') {
      axios.get('/trip/bookmarks').then((res) => {
        dispatch(setBookmarks(res.data));
      });
    } else if (contentType === 'plan') {
      // plan data 저장
      axios.get('/plan').then((res) => {
        if (res.data) {
          dispatch(setPlans(res.data));
        }
      });
    }
  }, [contentType]);

  // default contentType: search
  return contentType === 'search' ? (
    <div className={styled.contentList}>
      {markers.map((marker, index) => (
        <SearchContent
          key={index}
          placeResult={marker}
          userCheck={userLoginCheck}
          contentType={contentType}
        />
      ))}
    </div>
  ) : (
    <div className={styled.contentList}>
      {contentType === 'bookmark' ? (
        contents.map((bookmark, index) => (
          <Content key={index} placeResult={bookmark} />
        ))
      ) : contents.length === 0 ? (
        <div>계획 추가하기</div>
      ) : (
        <div>셀렉트 박스</div>
      )}
      {/*{contentType === 'plan' && contents.length === 0 ? (*/}
      {/*  <div style={{ backgroundColor: 'blue' }}>계획 추가하기</div>*/}
      {/*) : (*/}
      {/*  */}
      {/*)}*/}
      {}
    </div>
  );
};

export default ContentList;
