/**
 * Audio / Speech Service for Listening Practice
 * Supports simulated spoken dialog playback using browser Web Speech API,
 * as well as handling placeholder audio states ("AUDIO_SOURCE_REQUIRED").
 */

class TtsService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public isSupported(): boolean {
    return !!this.synth;
  }

  public speak(
    text: string,
    options?: {
      voiceGender?: 'male' | 'female';
      rate?: number;
      onEnd?: () => void;
      onError?: (err: any) => void;
    }
  ): void {
    if (!this.synth) return;

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options?.rate || 0.95; // realistic natural conversational speed
    utterance.pitch = options?.voiceGender === 'female' ? 1.1 : 0.95;

    const voices = this.synth.getVoices();
    if (voices.length > 0) {
      const enVoices = voices.filter((v) => v.lang.startsWith('en'));
      if (enVoices.length > 0) {
        if (options?.voiceGender === 'female') {
          const female = enVoices.find((v) =>
            /female|samantha|victoria|zira|karen|susan|moira/i.test(v.name)
          );
          utterance.voice = female || enVoices[0];
        } else {
          const male = enVoices.find((v) =>
            /male|alex|david|daniel|george|tom|fred/i.test(v.name)
          );
          utterance.voice = male || enVoices[enVoices.length - 1];
        }
      }
    }

    if (options?.onEnd) {
      utterance.onend = () => options.onEnd?.();
    }
    if (options?.onError) {
      utterance.onerror = (e) => options.onError?.(e);
    }

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
    this.currentUtterance = null;
  }

  public pause(): void {
    if (this.synth) {
      this.synth.pause();
    }
  }

  public resume(): void {
    if (this.synth) {
      this.synth.resume();
    }
  }
}

export const ttsService = new TtsService();
