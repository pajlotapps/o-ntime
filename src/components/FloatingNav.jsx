import "../App.css";
import { React, useState } from "react";
import {
  FloatingMenu,
  MainButton,
  ChildButton,
  Directions
} from "react-floating-button-menu";
import MdMenu from '@mui/icons-material/Menu';
import MdClose from '@mui/icons-material/Clear';
import MdTarget from '@mui/icons-material/Adjust';
import MdFly from '@mui/icons-material/Flight';
import MdReset from '@mui/icons-material/RestartAlt';
import MdDisclaimer from '@mui/icons-material/Warning';

import { useNavigate } from "react-router-dom";


const FloatingNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  function handleClick(toDest) {
    navigate(toDest);
    setIsOpen((prev) => !prev);
    toDest === '/' &&  localStorage.clear()
  }

  return (
    <>
      <FloatingMenu
        slidespeed={500}
        isOpen={isOpen}
        spacing={20}
        direction={Directions.Left}
        className="menu-btn"
      >
        <MainButton
          isOpen={isOpen}
          iconResting={<MdMenu style={{ fontSize: 20 }} />}
          iconActive={<MdClose style={{ fontSize: 20 }} />}
          background="black"
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
          size={56}
        />
        <ChildButton
          icon={<MdTarget style={{ fontSize: 20 }} />}
          background="black"
          size={40}
          onClick={() => handleClick("/target")}

        />
        <ChildButton
          icon={<MdFly style={{ fontSize: 20 }} />}
          background="black"
          size={40}
          onClick={() => handleClick("/execute")}

        />
        <ChildButton
          icon={<MdDisclaimer style={{ fontSize: 20 }} />}
          background="black"
          size={40}
          onClick={() => handleClick("/disclaimer")}
        />
        <ChildButton
          icon={<MdReset style={{ fontSize: 20 }} />}
          background="black"
          size={40}
          onClick={() => handleClick("/")}
        />
      </FloatingMenu>
    </>
  );
};

export default FloatingNav;
