import React, { useState, useEffect, useContext } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import ConfettiExplosion from 'react-confetti-explosion';

import ConfContext from '../context/ConfContext'
import '../css/Body.css'

export default function Body() {
  const { ca } = useContext(ConfContext);
  const [caOld, setCaOld] = useState(155000);
  const [stepActive, setStepActive] = useState(1);
  const [isExploding, setIsExploding] = useState(false);

  const palierModel = [
    { id: 1, name: "Junior", ca: 165000 },
    { id: 2, name: "Senior", ca: 170000 },
    { id: 3, name: "Big Boss", ca: 185000 },
  ]

  useEffect(() => {
    for (const palierItem of palierModel) {
      if (ca >= palierItem.ca) {
        setStepActive(palierItem.id + 1);
        setCaOld(palierItem.ca);
      } else {
        break;
      }
    }
  }, []);

  useEffect(() => {
    setIsExploding(true)
  }, [stepActive]);

  return (
    <div id='body'>
      <div id='body_text'>
        <h2>Vers le succès !</h2>
      </div>
      <div id="body_steps">
        {palierModel.map((palier) => (
          <div className={stepActive === palier.id ? "body_step active" : "body_step"} key={palier.id} onClick={() => {setStepActive(palier.id)}}>
            <div className={stepActive === palier.id ? 'body_step_left active_left' : 'body_step_left'}>
              <span className={stepActive >= palier.id ? 'body_step_icon_size yellow' : 'body_step_icon_size gray'}>
                <i class="fa-solid fa-medal"/>
              </span>
              <span>
                <h3>{palier.name}</h3>
              </span>
            </div>
            <div className={stepActive === palier.id ? 'body_step_right active_right' : 'body_step_right'}>
              {stepActive === palier.id ?
                <>
                  {isExploding && <ConfettiExplosion />}
                  <div id='body_step_progressbar'>
                    <CircularProgress
                      color="primary"
                      determinate
                      size="lg"
                      // value={ca / palier.ca * 100}
                      value={(ca - caOld / palier.ca - caOld) * 100 / (palier.ca - caOld)}
                      variant="soft"
                      sx={{
                        "--CircularProgress-size": "105px",
                        "--CircularProgress-trackThickness": "15px",
                        "--CircularProgress-progressThickness": "15px"
                      }}
                    />
                  </div>
                  <div id='body_step_palette'>
                    <span style={{color: "#3d8959"}}>
                      <span className="step_icon_text active_icon_text">
                        <i class="fa-solid fa-square"/>
                        <span id="step_text_percentage">
                          <a>En cours</a>
                          {/* <a className='palette_percentage'>{(ca / palier.ca * 100).toFixed(0)}%</a> */}
                          <a className='palette_percentage'>{((ca - caOld / palier.ca - caOld) * 100 / (palier.ca - caOld)).toFixed(0)}%</a>
                        </span>
                      </span>
                    </span>
                    <span style={{color: "#97caae"}}>
                      <span className="step_icon_text">
                        <i class="fa-solid fa-square"/>
                        <span id="step_text_percentage">
                          <a>Objectif</a>
                          {/* <a className='palette_percentage'>{100 - (ca / palier.ca * 100).toFixed(0)}%</a> */}
                          <a className='palette_percentage'>{(100 - (ca - caOld / palier.ca - caOld) * 100 / (palier.ca - caOld)).toFixed(0)}%</a>
                        </span>
                      </span>
                    </span>
                  </div>
                </>
              : stepActive < palier.id ?
                <span className='body_step_text' >
                  <i class="fa-solid fa-lock"/>
                  <h3>Atteindre l'objectif du palier {palierModel[stepActive - 1].name}</h3>
                </span>
              :
                <span className='body_step_text' >
                  <i class="fa-solid fa-check"/>
                  <h3>Atteint le 00/00/2023</h3>
                </span>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}