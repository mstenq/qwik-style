import { Playground } from "./components/playground/playground";
import "./global.css";

export default () => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        <Playground />
        {/* <Counter /> */}
      </body>
    </>
  );
};
