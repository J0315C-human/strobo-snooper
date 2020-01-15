const EL = {
  rotateButton: document.getElementById('rotate') as HTMLButtonElement,
  rotationAngle: document.getElementById('rotation-angle') as HTMLInputElement,
  rotationSpeed: document.getElementById('rotation-speed') as HTMLInputElement,
  angleOutput: document.getElementById('angle') as HTMLSpanElement,
  rpmOutput: document.getElementById('rpm') as HTMLSpanElement,
  speedOutput: document.getElementById('speed') as HTMLSpanElement,
  fileInput: document.getElementById('file-input') as HTMLInputElement,
  imgElement: document.getElementById('image') as HTMLImageElement,
};

export default EL;
