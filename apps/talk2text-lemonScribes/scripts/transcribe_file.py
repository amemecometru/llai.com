#!/usr/bin/env python3
"""
Batch transcription of a local audio file.

Usage:
    python scripts/transcribe_file.py audio.mp3
    python scripts/transcribe_file.py audio.wav --language en --diarize
    python scripts/transcribe_file.py meeting.mp3 --diarize --num-speakers 3
    python scripts/transcribe_file.py --help
"""

import argparse
import json
import logging
import sys
from pathlib import Path

# Allow running from the repo root without installing as a package
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.client import create_client
from src.transcription import transcribe_file
from src.utils.formatting import format_transcript, format_word_timestamps

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)


def main() -> None:
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("file", help="Path to the audio file to transcribe")
    parser.add_argument(
        "--model",
        default="scribe_v1",
        help="Transcription model ID (default: scribe_v1)",
    )
    parser.add_argument(
        "--language",
        default=None,
        help="ISO-639 language code hint (auto-detected if omitted)",
    )
    parser.add_argument(
        "--diarize",
        action="store_true",
        help="Enable speaker diarization",
    )
    parser.add_argument(
        "--num-speakers",
        type=int,
        default=None,
        help="Expected number of speakers (max 32)",
    )
    parser.add_argument(
        "--tag-events",
        action="store_true",
        help="Tag audio events (laughter, music, etc.)",
    )
    parser.add_argument(
        "--timestamps",
        choices=["word", "character"],
        default=None,
        help="Timestamp granularity",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        dest="output_json",
        help="Output raw JSON instead of formatted text",
    )
    parser.add_argument(
        "--show-timestamps",
        action="store_true",
        help="Show word-level timestamps in text output",
    )
    parser.add_argument(
        "--api-key",
        default=None,
        help="ElevenLabs API key (or set ELEVENLABS_API_KEY env var)",
    )
    args = parser.parse_args()

    client = create_client(api_key=args.api_key)

    logger.info("Starting batch transcription of: %s", args.file)

    result = transcribe_file(
        client,
        args.file,
        model_id=args.model,
        language_code=args.language,
        diarize=args.diarize,
        num_speakers=args.num_speakers,
        tag_audio_events=args.tag_events,
        timestamps_granularity=args.timestamps,
    )

    if args.output_json:
        print(json.dumps(result, indent=2, default=str))
    else:
        print("\n--- Transcript ---\n")
        print(format_transcript(result, show_speakers=args.diarize))

        if args.show_timestamps:
            print("\n--- Word Timestamps ---\n")
            print(format_word_timestamps(result))

    logger.info("Transcription complete.")


if __name__ == "__main__":
    main()
