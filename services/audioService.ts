
const SOUNDS = {
  pop: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', // Soft click
  sweep: 'https://assets.mixkit.co/active_storage/sfx/1105/1105-preview.mp3', // Clear/Eraser
  chime: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3', // Reward/Finish stroke
  sparkle: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3' // Navigation
};

class AudioService {
  private cache: Record<string, HTMLAudioElement> = {};

  private getAudio(type: keyof typeof SOUNDS) {
    if (!this.cache[type]) {
      this.cache[type] = new Audio(SOUNDS[type]);
      this.cache[type].volume = 0.4;
    }
    return this.cache[type];
  }

  play(type: keyof typeof SOUNDS) {
    const audio = this.getAudio(type);
    audio.currentTime = 0;
    audio.play().catch(e => console.log('Audio play blocked:', e));
  }
}

export const audioService = new AudioService();
