import styled from '@/styles/rightSideContent.module.scss';
import SearchContent from '@/components/list/content/SearchContent';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useCallback } from 'react';

const ContentList = () => {
  const { markers } = useSelector((state: RootState) => state.map);
  const user = useSelector((state: RootState) => state.user);

  const userLoginCheck = useCallback(() => {
    if (!user.loginToggle) {
      alert('로그인 후 이용해주세요.');
    }

    return user.loginToggle;
  }, [user]);

  // useEffect(() => {
  //   if (user.loginToggle) {
  //     axios.get('/trip/bookmark').then((res) => {
  //       console.log('결과 : ' + res.data);
  //       setBookmarks([...res.data]);
  //     });
  //   }
  // }, []);

  return (
    <div className={styled.contentList}>
      {markers.map(
        (marker, index) =>
          marker.name && (
            <SearchContent
              key={index}
              placeResult={marker}
              userCheck={userLoginCheck}
            />
          )
      )}
    </div>
  );
};

export default ContentList;
