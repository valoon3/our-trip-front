import styled from '@/styles/rightSideContent.module.scss';
import SearchContent from '@/components/list/content/SearchContent';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useCallback } from 'react';

const ContentList = () => {
  const { markers } = useSelector((state: RootState) => state.map);

  const user = useSelector((state: RootState) => state.user);

  const userCheck = useCallback(() => {
    if (!user.loginToggle) {
      alert('로그인 후 이용해주세요.');
    }

    return user.loginToggle;
  }, [user]);

  console.log(markers);

  return (
    <div className={styled.contentList}>
      {markers.map(
        (marker, index) =>
          marker.name && (
            <SearchContent
              key={index}
              placeResult={marker}
              userCheck={userCheck}
            />
          )
      )}
    </div>
  );
};

export default ContentList;