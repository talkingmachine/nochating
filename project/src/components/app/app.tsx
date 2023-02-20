import {Chat} from '../chat/chat';
import { Header } from '../header/header';

export function App(): JSX.Element {

  return (
    <>
      <Header/>
      <aside className="sidebar">
        <nav className="sidebar__icons-list sidebar__navigation">
          <a href="/#" className="navigation__library">
            <svg id="icon" data-name="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 26.98"><defs><style dangerouslySetInnerHTML={{__html: '.cls-1{fill:none;stroke:#ccc;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.91px;}' }} /></defs><title>lib-icon</title><path className="cls-1" d="M973.09,537.7v-5a1.65,1.65,0,0,0-1.65-1.65h-11a1.65,1.65,0,0,1-1.17-.48l-2.37-2.37a1.65,1.65,0,0,0-1.17-.48h-9.36a1.65,1.65,0,0,0-1.65,1.65V551.1a1.65,1.65,0,0,0,1.65,1.65h1.94a1.41,1.41,0,0,0,1.41-1.41h0a1.43,1.43,0,0,1,.09-.5l4.52-12.05a1.64,1.64,0,0,1,1.55-1.07h18.28a1.66,1.66,0,0,1,1.57,2.18l-3.91,11.73a1.65,1.65,0,0,1-1.57,1.13H948" transform="translate(-943.73 -526.73)" /></svg>
          </a>
          <a href="/#" className="navigation__plan">
            <svg id="icon" data-name="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.44 24.63"><defs><style dangerouslySetInnerHTML={{__html: '.cls-1{fill:none;stroke:#ccc;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.91px;}' }} /></defs><title>plan-icon</title><path className="cls-1" d="M953.44,528.86H976m-22.56,11.35H976m-22.56,11.35H976m-31.53-22.7v0m0,11.33v0m0,11.33v0" transform="translate(-943.52 -527.91)" /></svg>
          </a>
          <a href="/#" className="navigation__favorites">
            <svg id="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36.49 34.89"><defs><style dangerouslySetInnerHTML={{__html: '.cls-1{fill:none;stroke:#ccc;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.76px;}' }} /></defs><title>fav-icon</title><path className="cls-1" d="M959.38,524.2a1,1,0,0,1,1.74,0l4.61,9.35a.94.94,0,0,0,.73.53l10.31,1.5a1,1,0,0,1,.54,1.66l-7.46,7.28a1,1,0,0,0-.28.86l1.76,10.27a1,1,0,0,1-1.41,1l-9.23-4.85a1,1,0,0,0-.9,0l-9.23,4.85a1,1,0,0,1-1.41-1l1.76-10.27a1,1,0,0,0-.28-.86l-7.46-7.28a1,1,0,0,1,.54-1.66l10.31-1.5a1,1,0,0,0,.73-.53Z" transform="translate(-941.99 -522.78)" /></svg>
          </a>
          <a href="/#" className="navigation__calendar">
            <svg id="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.54 32.47"><defs><style dangerouslySetInnerHTML={{__html: '.cls-1{fill:none;stroke:#ccc;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.91px;}' }} /></defs><title>cal-icon</title><path className="cls-1" d="M952.34,533.92h16.45m-17.19-9v2.93m0,0h17.27m-17.27,0a5.18,5.18,0,0,0-5.18,5.18v17.27a5.18,5.18,0,0,0,5.18,5.18h17.27a5.18,5.18,0,0,0,5.18-5.18V533.05a5.18,5.18,0,0,0-5.18-5.18m0-2.93v2.93m-12.09,21.59V539.1l-3.45,2.59m12.95,7.77V539.1l-3.45,2.59" transform="translate(-945.47 -523.99)" /></svg>
          </a>
          <a href="/#" className="navigation__add-action">
            <svg id="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.15 16.15"><defs><style dangerouslySetInnerHTML={{__html: '.cls-1{stroke:#ccc;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.91px;}' }} /></defs><title>add-action-icon</title><path className="cls-1" d="M960.23,533.1v7.12m0,0v7.12m0-7.12h7.12m-7.12,0h-7.12" transform="translate(-952.16 -532.15)" /></svg>
          </a>
        </nav>
        <div className="sidebar__icons-list sidebar__app-control">
          <a href="/#" className="app-control__settings">
            <svg id="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.79 31.42"><defs><style dangerouslySetInnerHTML={{__html: '.cls-1{stroke:#ccc;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.91px;}' }} /></defs><title>settings-icon</title><path className="cls-1" d="M955.79,528.82l1.89-2.71a1.49,1.49,0,0,1,1.22-.64h2.68a1.52,1.52,0,0,1,1.22.63l1.87,2.66m-8.88.06a2.52,2.52,0,0,1-2.28,1m2.28-1a2.51,2.51,0,0,1-2.28,1m0,0-3.34-.21a1.47,1.47,0,0,0-1.24.54l-1.69,2.06a1.48,1.48,0,0,0-.26,1.4l1,3m0,0a2.57,2.57,0,0,1,0,1.32m0-1.32a2.57,2.57,0,0,1,0,1.32m0,0a2.51,2.51,0,0,1-.61,1.16M948,538h0m-.6,1.16-2.21,2.37a1.5,1.5,0,0,0-.36,1.36l.6,2.48a1.53,1.53,0,0,0,.93,1l3,1.11a2.56,2.56,0,0,1,1.06.76m-3.05-9.13A2.37,2.37,0,0,0,948,538m2.46,10.28a2.54,2.54,0,0,1,.53,1.18m-.53-1.18a2.44,2.44,0,0,1,.53,1.18m-.53-1.18h0l-.06-.07m.59,1.25.52,3.17a1.48,1.48,0,0,0,.84,1.11l2.42,1.12a1.5,1.5,0,0,0,1.35-.05l2.84-1.59m0,0a2.59,2.59,0,0,1,1.27-.33m-1.27.33a2.33,2.33,0,0,1,.49-.21,2.61,2.61,0,0,1,.79-.12m0,0a2.59,2.59,0,0,1,.68.09,3.13,3.13,0,0,1,.6.24m-1.28-.33a2.65,2.65,0,0,1,1.28.33m0,0,3,1.61a1.46,1.46,0,0,0,1.35,0l2.4-1.15a1.48,1.48,0,0,0,.83-1.12l.46-3.08m0,0a2.48,2.48,0,0,1,.53-1.19m-.53,1.19a2.48,2.48,0,0,1,.53-1.19m0,0a2.54,2.54,0,0,1,1.05-.77m-1.05.77a2.54,2.54,0,0,1,1.05-.77m0,0,3.06-1.2a1.48,1.48,0,0,0,.91-1.05l.57-2.51a1.47,1.47,0,0,0-.36-1.34l-2.22-2.4m0,0a2.53,2.53,0,0,1-.63-1.14m.63,1.14a2.23,2.23,0,0,1-.37-.5,2.53,2.53,0,0,1-.26-.64m0,0a2.42,2.42,0,0,1,0-1.28l1-3.08a1.46,1.46,0,0,0-.27-1.38l-1.65-2a1.51,1.51,0,0,0-1.26-.54l-3.3.24m0,0a2.57,2.57,0,0,1-1.29-.24m1.29.24a2.57,2.57,0,0,1-1.29-.24m0,0a2.65,2.65,0,0,1-1-.84m1,.84a2.57,2.57,0,0,1-1-.84M948,538h0m17.26,2.36a5.12,5.12,0,1,1-5.12-5A5.06,5.06,0,0,1,965.26,540.33Z" transform="translate(-943.84 -524.51)" /></svg>
          </a>
          <a href="/#" className="app-control__login-logout">
            <svg id="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.85 29.73"><defs><style dangerouslySetInnerHTML={{__html: '.cls-1{fill:none;stroke:#ccc;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.91px;}' }} /></defs><title>logout-icon</title><path className="cls-1" d="M954.9,526.31h-6.13a3.54,3.54,0,0,0-2.48,1,3.46,3.46,0,0,0-1,2.46v20.86a3.46,3.46,0,0,0,1,2.46,3.54,3.54,0,0,0,2.48,1h6.13m20.3-13.92H955.33m12.28,7.95,7.59-7.95m-7.59-7.94,7.59,8" transform="translate(-944.31 -525.36)" /></svg>
          </a>
        </div>
      </aside>
      <Chat/>
    </>
  );
}

