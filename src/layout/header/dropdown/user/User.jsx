import React, { useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { useRecoilState } from "recoil";
import { useLogout } from "../../../../api/authentication";
import { userState } from "../../../../atoms/userState";
import { Icon } from "../../../../components/Component";
import { LinkItem, LinkList } from "../../../../components/links/Links";
import UserAvatar from "../../../../components/user/UserAvatar";
import { findUpper } from "../../../../utils/Utils";
const User = () => {
  const [open, setOpen] = useState(false);
  const [user] = useRecoilState(userState);

  const { mutate } = useLogout();
  const toggle = () => setOpen((prevState) => !prevState);

  const handleSignout = () => {
    mutate();
  };

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <UserAvatar className="sm" text={user?.name && findUpper(user.name)} image={user?.avatar} />
          <div className="user-info d-none d-md-block">
            <div className="user-status">Administrator</div>
            <div className="user-name dropdown-indicator">{user?.name}</div>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              {user?.avatar ? (
                <img src={user?.avatar} alt="avatar" />
              ) : (
                <span>{user?.name && findUpper(user?.name)}</span>
              )}
            </div>
            <div className="user-info">
              <span className="lead-text">{user?.name}</span>
              <span className="sub-text">{user?.email}</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <LinkItem link="/settings" icon="user-alt" onClick={toggle}>
              View Profile
            </LinkItem>
            <LinkItem link="/settings" icon="setting-alt" onClick={toggle}>
              Account Setting
            </LinkItem>
            <LinkItem link="/settings" icon="activity-alt" onClick={toggle}>
              Login Activity
            </LinkItem>
          </LinkList>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <a
              href={`/signout`}
              onClick={(ev) => {
                ev.preventDefault();
                handleSignout();
              }}
            >
              <Icon name="signout"></Icon>
              <span>Sign Out</span>
            </a>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
