import React, { useState } from 'react';
import { NavLink as Link } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import menus from './sideMenu';


const MainListItem = () => {
  const [openSet, setOpenSet] = useState({});

  const handleSetClick = key => {
    setOpenSet({ ...openSet, [key]: !openSet[key] });
  };


  const menuFunction = e => {
    let showChildren = false;
    if (e.menu) {
      // TODO: can be optimized to break when if condition is fulfilled
      e.menu.map(each => {
        showChildren = true;
      });
    }
    const isVisible = e.menu ? showChildren : e.link;
    if (!isVisible) return null;
    return (
      <div key={e.key}>
        {e.menu ? (
          <>
            <div
              key={e.key}
              className={`p-2 cursor-pointer flex items-center justify-between text-gray-200 hover:bg-gray-800 text-sm pl-${e.key.split(
                '.',
              ).length * 2}`}
              onClick={() => handleSetClick(e.key)}
            >
              <div className="flex items-center">
                <i
                  key={e}
                  className="material-icons mr-3 text-sm text-gray-100"
                >
                  {e.icon}
                </i>
                <span className="dropdown-title text-gray-100">{e.name}</span>
              </div>
              <i
                className={`material-icons text-gray-200 opacity-50 ease-in-out ${
                  !openSet[e.key] ? 'rotate-90' : ''
                }`}
              >
                arrow_drop_down
              </i>
            </div>
            <Collapse in={openSet[e.key]} timeout="auto" unmountOnExit>
              {e.menu.map(el => (
                <div key={el.key}>{menuFunction(el)}</div>
              ))}
            </Collapse>
          </>
        ) : (
          <div
            // selected={pathname === e.link}
            className={e.key.split('.').length === 1 ? '' : ''}
          >
            <Link
              to={`${e.link}`}
              className={`text-gray-200 text-sm no-underline flex items-center hover:bg-gray-800 py-2 pl-${e.key.split(
                '.',
              ).length * 2}`}
            >
              <i key={e} className="material-icons mr-3 text-sm">
                {e.icon}
              </i>
              {e.name}
            </Link>
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="select-none pt-12 pb-8">
      {menus.map(e => (
        <div key={e.key}>{menuFunction(e)}</div>
      ))}
    </div>
  );
};



export default MainListItem
