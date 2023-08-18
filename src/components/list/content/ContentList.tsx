import styled from '@/styles/rightSideContent.module.scss';
import SearchContent from '@/components/list/content/SearchContent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useCallback, useEffect } from 'react';
import axios from 'axios';
import { setBookmarks } from '@/app/reduce/contentSlice';

type Props = {
  // contentType: string;
};

const ContentList = () => {
  const { markers } = useSelector((state: RootState) => state.map);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { contentType, bookmarks } = useSelector(
    (state: RootState) => state.content
  );

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
      {bookmarks.map((bookmark, index) => (
        <SearchContent
          key={index}
          placeResult={bookmark}
          userCheck={userLoginCheck}
          contentType={contentType}
        />
      ))}
    </div>
  );
};

export default ContentList;
