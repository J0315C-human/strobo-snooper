import EL from './elements';
import { fabric } from 'fabric';

const getImgParams = (img: HTMLImageElement, size: number) => {
  const x = size / img.naturalWidth;
  const y = size / img.naturalHeight;
  const scale = Math.min(x, y);

  const displayWidth = img.naturalWidth * scale;
  const displayHeight = img.naturalHeight * scale;

  return {
    scaleX: scale,
    scaleY: scale,
    left: (size - displayWidth) / 2,
    top: (size - displayHeight) / 2,
    angle: 0,
    opacity: 1,
  };
};

class StroboSnoop {
  size: number;
  frameTime: number;
  rotationAngle: number;
  canvas: fabric.Canvas;
  lastRotation = 0;
  rotating = false;
  imgInstance: fabric.Image | undefined;

  constructor(canvasId: string, size: number) {
    this.size = size;
    this.frameTime = parseFloat(EL.rotationSpeed.value);
    this.rotationAngle = parseFloat(EL.rotationAngle.value);
    this.canvas = new fabric.Canvas(canvasId);
    this.canvas.setWidth(size);
    this.canvas.setHeight(size);
  }

  initialize = () => {
    this.initializeImageInstance();
    this.updateOutput();
  };

  initializeDefaultSettings = () => {
    EL.rotationAngle.value = `${this.rotationAngle}`;
    EL.rotationSpeed.value = `${this.frameTime}`;

    this.updateOutput();
  };

  initializeImageInstance = () => {
    this.canvas.remove(this.imgInstance);

    const imgParams = getImgParams(EL.imgElement, this.size);

    this.imgInstance = new fabric.Image(EL.imgElement, imgParams);
    this.imgInstance.centeredRotation = true;
    this.canvas.add(this.imgInstance);
  };

  checkRotate = () => {
    const now = Date.now();
    if (this.rotating && now - this.lastRotation > this.frameTime) {
      if (this.imgInstance) {
        const newAngle = this.imgInstance.angle + this.rotationAngle;
        this.imgInstance.rotate(newAngle);
        this.canvas.renderAll();
      }
      this.lastRotation = now;
    }
  };

  toggleRotating = () => {
    if (this.rotating) {
      EL.rotateButton.textContent = 'ROTATE';
    } else {
      EL.rotateButton.textContent = 'STOP';
    }
    this.rotating = !this.rotating;
  };

  setRotationAngle = () => {
    const value = EL.rotationAngle.value;
    this.rotationAngle = parseFloat(value);
    this.updateOutput();
  };

  setFrameSpeed = () => {
    const value = EL.rotationSpeed.value;
    this.frameTime = parseFloat(value);
    this.updateOutput();
  };

  setNewImageFromFile = (onFinish?: () => void) => {
    const file = EL.fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onloadend = () => {
      EL.imgElement.src = reader.result as string;
      setTimeout(() => {
        this.initializeImageInstance();
        if (onFinish) onFinish();
      }, 100);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      EL.imgElement.src = '';
    }
  };

  updateOutput = () => {
    const framesPerMinute = (60 * 1000) / this.frameTime;
    const degPerMinute = this.rotationAngle * framesPerMinute;
    EL.rpmOutput.textContent = (degPerMinute / 360).toFixed(2);

    EL.angleOutput.textContent = this.rotationAngle.toFixed(2);
    EL.speedOutput.textContent = this.frameTime.toFixed(2);
  };
}

export default StroboSnoop;
