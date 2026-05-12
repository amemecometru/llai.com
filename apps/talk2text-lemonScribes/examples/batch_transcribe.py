#!/usr/bin/env python3
"""
Example: Batch transcription with speaker diarization.

Transcribes a local audio file and prints speaker-labelled output.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.client import create_client
from src.transcription import transcribe_file
from src.utils.formatting import format_transcript, format_word_timestamps


def main() -> None:
    client = create_client()  # uses ELEVENLABS_API_KEY env var

    result = transcribe_file(
        client,
        "path/to/your/audio.mp3",
        diarize=True,
        num_speakers=2,
        timestamps_granularity="word",
    )

    print("=== Transcript with speakers ===")
    print(format_transcript(result, show_speakers=True))

    print("\n=== Word timestamps ===")
    print(format_word_timestamps(result))


if __name__ == "__main__":
    main()
