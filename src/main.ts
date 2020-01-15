import './assets/styles.css';
import StroboSnoop from './StroboSnoop';
import EL from './elements';
import Thumbs from './Thumbs';

const stroboSnoop = new StroboSnoop('c', 800);
stroboSnoop.initialize();

const thumbs = new Thumbs(stroboSnoop.initialize);

EL.fileInput.onchange = () => {
  stroboSnoop.setNewImageFromFile(thumbs.addPreset);
};

EL.rotateButton.onclick = stroboSnoop.toggleRotating;
EL.rotationAngle.oninput = stroboSnoop.setRotationAngle;
EL.rotationSpeed.oninput = stroboSnoop.setFrameSpeed;

const onFrame = () => {
  stroboSnoop.checkRotate();
  requestAnimationFrame(onFrame);
};

onFrame();
