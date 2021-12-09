

int melody[] = {

  // Happy Birthday

  NOTE_C4,
  4,
  NOTE_C4,
  8,
  NOTE_D4,
  -4,
  NOTE_C4,
  -4,
  NOTE_F4,
  -4,
  NOTE_E4,
  -2,
  NOTE_C4,
  4,
  NOTE_C4,
  8,
  NOTE_D4,
  -4,
  NOTE_C4,
  -4,
  NOTE_G4,
  -4,
  NOTE_F4,
  -2,
  NOTE_C4,
  4,
  NOTE_C4,
  8,

  NOTE_C5,
  -4,
  NOTE_A4,
  -4,
  NOTE_F4,
  -4,
  NOTE_E4,
  -4,
  NOTE_D4,
  -4,
  NOTE_AS4,
  4,
  NOTE_AS4,
  8,
  NOTE_A4,
  -4,
  NOTE_F4,
  -4,
  NOTE_G4,
  -4,
  NOTE_F4,
  -2,

};

MelodyPlayer::play_melody(int tempo, int* melody) {
  int notes = sizeof(melody) / sizeof(melody[0]) / 2;
  int wholenote = (60000 * 4) / tempo;
  int divider = 0, noteDuration = 0;

  for (int thisNote = 0; thisNote < notes * 2; thisNote = thisNote + 2) {

    // calculates the duration of each note
    divider = melody[thisNote + 1];
    if (divider > 0) {
      // regular note, just proceed
      noteDuration = (wholenote) / divider;
    } else if (divider < 0) {
      // dotted notes are represented with negative durations!!
      noteDuration = (wholenote) / abs(divider);
      noteDuration *= 1.5;  // increases the duration in half for dotted notes
    }

    // we only play the note for 90% of the duration, leaving 10% as a pause
    tone(buzzer, melody[thisNote], noteDuration * 0.9);

    // Wait for the specief duration before playing the next note.
    delay(noteDuration);

    // stop the waveform generation before the next note.
    noTone(buzzer);
  }
}
