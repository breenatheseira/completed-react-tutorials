import { useRouteError } from "react-router-dom";
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <div id="error-page">
        <div style={{display: 'inline'}}>
          <img src={viteLogo} className="logo" alt="Vite logo" />
          <img src={reactLogo} className="logo react" alt="React logo" />
        </div>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </>
  );
}