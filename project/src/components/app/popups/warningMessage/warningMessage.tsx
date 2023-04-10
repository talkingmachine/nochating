import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useStoreSelectors';
import { setWarningMessageInfo } from '../../../../store/actions';

function WarningMessage(): JSX.Element {

  const dispatch = useAppDispatch();
  const warningMessageInfo = useAppSelector((state) => state.warningMessageInfo);

  const closeWarningMessage = () => {
    dispatch(setWarningMessageInfo({...warningMessageInfo, isOpen: false}));
  };
  const warningMessageClickHandler = () => {
    closeWarningMessage();
  };

  useEffect(() => {
    const removeWarningMessage = () => {
      dispatch(setWarningMessageInfo({...warningMessageInfo, isOpen: false}));
    };
    setTimeout(removeWarningMessage, 3000);
  }, [dispatch, warningMessageInfo]);


  return (
    <article onClick={warningMessageClickHandler} className="popups__warning-message">
      <svg className="warning-message__sign" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 525 525"><defs><style dangerouslySetInnerHTML={{__html: '.cls-1{fill:#ffcc33;}' }} /></defs><title>noun-alert-circle</title><path className="cls-1" d="M262.5,0C117.53,0,0,117.53,0,262.51S117.54,525,262.51,525,525,407.47,525,262.49A262.5,262.5,0,0,0,262.5,0Zm0,490C136.85,490,35,388.14,35,262.49S136.85,35,262.5,35,490,136.84,490,262.49A227.51,227.51,0,0,1,262.5,490Z" transform="translate(-0.01)" /><path className="cls-1" d="M262.5,315A17.49,17.49,0,0,0,280,297.54v-175a17.5,17.5,0,0,0-35,0v175A17.51,17.51,0,0,0,262.5,315Z" transform="translate(-0.01)" /><path className="cls-1" d="M262.5,367.5a17.5,17.5,0,1,0,12.38,5.13A17.51,17.51,0,0,0,262.5,367.5Z" transform="translate(-0.01)" /></svg>
      <div className="warning-message__text">
        <span className="text__title">Title</span>
        <span className="text__description">Description long text</span>
      </div>
      <button className="warning-message__exit">
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M18 18L6 6" stroke="#CCCCCC" strokeWidth={2} strokeLinecap="round" /></svg>
      </button>
    </article>
  );
}

export default WarningMessage;
