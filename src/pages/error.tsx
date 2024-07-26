import { useRouteError } from "react-router-dom";

export function Error(): JSX.Element {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {(error as { statusText?: string }).statusText ||
            (error as { message?: string }).message}
        </i>
      </p>
    </div>
  );
}
