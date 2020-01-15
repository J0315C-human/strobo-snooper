import EL from './elements';

class Thumbs {
  presets = [
    document.getElementById('preset0') as HTMLImageElement,
    document.getElementById('preset1') as HTMLImageElement,
    document.getElementById('preset2') as HTMLImageElement,
    document.getElementById('preset3') as HTMLImageElement,
    document.getElementById('preset4') as HTMLImageElement,
    document.getElementById('preset5') as HTMLImageElement,
    document.getElementById('preset6') as HTMLImageElement,
  ];
  outerElement = document.getElementById('thumbs') as HTMLDivElement;
  onChangeImage: () => void;

  constructor(onChangeImage: () => void) {
    this.onChangeImage = onChangeImage;
    this.setClickHandlers();
  }

  setClickHandlers = () => {
    this.presets.forEach(preset => {
      preset.onclick = () => {
        EL.imgElement.src = preset.src;
        setTimeout(() => {
          this.onChangeImage();
        }, 100);
      };
    });
  };

  addPreset = () => {
    const file = EL.fileInput.files[0];
    if (!file) return;
    const newPreset = document.createElement('img');
    newPreset.src = EL.imgElement.src;
    newPreset.className = 'preset';
    this.outerElement.appendChild(newPreset);
    this.presets.push(newPreset);
    this.setClickHandlers();
  };
}

export default Thumbs;
