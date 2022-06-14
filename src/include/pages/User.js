import React, { lazy, Suspense } from 'react';

function User(props) {
  const fragmentsComponent = (reposExist) => {
    let fragments = reposExist ? 'ReposList' : 'ReposNotFound';
    return lazy(() => import(`./fragments/${fragments}.js`));
  };

  const LoadComponent = fragmentsComponent(props.isPageDetals.reposExist ?? false);

  return (
    <div className="card">
      <div className="user">
        <div className="user__detals">
          <div className="user__avatar user__avatar_color_grey">
            <img className="user__avatar" src={props.isPageDetals.userDetal.avatar_url} alt="avatar" />
          </div>

          <div className="user__avatar-info">
            <h1 className="user__user-name">{props.isPageDetals.userDetal.name}</h1>
            <a href={props.isPageDetals.userDetal.html_url} className="user__nic-name" target="_blank">{props.isPageDetals.userDetal.login}</a>

            <div className="user__followers">
              <div className="user__group-icon"></div>
              <span className="user__followers-following">{props.isPageDetals.userDetal.followers} followers</span>
            </div>
            <div className="user__following">
              <div className="user__person-icon"></div>
              <span className="user__followers-following">{props.isPageDetals.userDetal.following} following</span>
            </div>

          </div>
        </div>
      </div>
      <div className="works_size">
        <Suspense>
          <LoadComponent
            isPageDetals={props.isPageDetals}
          />
        </Suspense>
      </div>
    </div>
  );
}
export default User;