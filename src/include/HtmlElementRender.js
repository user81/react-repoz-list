import React, { lazy, Suspense } from 'react';

function HtmlElementRender(props) {

  const pageComponent = (page = "Home") => {
    return lazy(() => import(`./pages/${page}.js`));
  };

  const LoadComponent = pageComponent(props.isPageDetals.page ?? 'Home');
  return (
    <Suspense>
      <LoadComponent
        isPageDetals={props.isPageDetals}
      />
    </Suspense>
  );
}


export default HtmlElementRender;