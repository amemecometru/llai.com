#!/usr/bin/env python3
"""
Batch transcription of audio from a cloud URL.

Usage:
    python scripts/transcribe_url.py https://example.com/audio.mp3
    python scripts/transcribe_url.py https://bucket.s3.amazonaws.com/call.wav --diarize
    python scripts/transcribe_url.py --help
"""

import argparse
import json
import logging
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.client import create_client
from src.transcription import transcribe_url
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
    parser.add_argument("url", help="HTTPS URL of the audio file to transcribe")
    parser.add_argument(
        "--model",
        default="scribe_v1",
        help="Transcription model ID (default: scribe_v1)",
    )
    parser.add_argument("--language", default=None, help="ISO-639 language code hint")
    parser.add_argument("--diarize", action="store_true", help="Enable speaker diarization")
    parser.add_argument("--num-speakers", type=int, default=None, help="Expected speaker count")
    parser.add_argument("--tag-events", action="store_true", help="Tag audio events")
    parser.add_argument(
        "--timestamps",
        choices=["word", "character"],
        default=None,
        help="Timestamp granularity",
    )
    parser.add_argument("--json", action="store_true", dest="output_json", help="Output raw JSON")
    parser.add_argument("--show-timestamps", action="store_true", help="Show word-level timestamps")
    parser.add_argument("--api-key", default=None, help="ElevenLabs API key")
    args = parser.parse_args()

    client = create_client(api_key=args.api_key)

    logger.info("Starting batch transcription of URL: %s", args.url)

    result = transcribe_url(
        client,
        args.url,
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
