import styled from '@/styles/rightSideContent.module.scss';
import SearchContent from '@/components/list/content/SearchContent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { setBookmarks } from '@/app/reduce/contentSlice';
import Content from '@/components/list/content/content';
import 'react-datepicker/dist/react-datepicker.css';
import CreateTripPlan from '@/components/popup/tripPlanPopup/createTripPlan';
import ContentPlanListDetail from '@/components/list/content/ContentPlanListDetail';
import { TravelPlanI } from '@/types/TravelPlan.type';

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
  const [planList, setPlanList] = useState<TravelPlanI[]>([]);

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
      axios
        .get('/trip/bookmarks')
        .then((res) => {
          dispatch(setBookmarks(res.data));
        })
        .catch((err) => console.error(err));
    } else if (contentType === 'plan') {
      // plan data 저장
      axios
        .get('/plan')
        .then((res) => {
          if (res.data) {
            const planArr = res.data;
            const planArrSet = planArr.map((plan: any) => ({
              title: plan.title,
              description: plan.description,
              startDate: new Date(plan.startDate),
              endDate: new Date(plan.endDate),
              createdAt: new Date(plan.createdAt),
              updatedAt: new Date(plan.updatedAt),
              planDetail: plan.planDetail,
            }));
            setPlanList(planArrSet);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [contentType]);

  const [isClicked, setIsClicked] = useState(false);
  const createNewPlanPopup = useCallback(() => {
    setIsClicked(true);
  }, []);

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
        <div>
          <div>
            {!planList.length ? (
              <div>
                <button
                  onClick={createNewPlanPopup}
                  className={styled.planContentList}
                >
                  일정 생성
                </button>
                {/*팝업 생성 버튼*/}
                {isClicked && (
                  <CreateTripPlan
                    isPopupOpen={isClicked}
                    setIsPopupOpen={setIsClicked}
                    setPlanList={setPlanList}
                  />
                )}
              </div>
            ) : (
              <div>
                <button
                  onClick={createNewPlanPopup}
                  className={styled.planContentList}
                >
                  일정 생성
                </button>
                {/*팝업 생성 버튼*/}
                {isClicked && (
                  <CreateTripPlan
                    isPopupOpen={isClicked}
                    setIsPopupOpen={setIsClicked}
                    setPlanList={setPlanList}
                  />
                )}
                <ContentPlanListDetail contentList={planList} />
              </div>
            )}
            <br />
          </div>
        </div>
      ) : (
        <div>셀렉트 박스</div>
      )}
    </div>
  );
};

export default ContentList;
