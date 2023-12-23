import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useCallback } from 'react';
import { setIsPopupOpen } from '@/app/reduce/popupSlice';

interface Props {
  isOpen: boolean;
}

const CreateTripPlan = () => {
  const isPopupOpen = useSelector(
    (state: RootState) => state.popup.isPopupOpen
  );

  const closeCallback = useCallback(() => {
    setIsPopupOpen();
  }, []);

  // return <>{isPopupOpen && <div className="modal-overlay"></div>}</>;
  return (
    <>
      {true && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>여행 일정</p>
            <p>여행 일정</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTripPlan;
