#!/usr/bin/env python3
"""
Real-time speech-to-text transcription via WebSocket.

Supports two modes:
  1. URL mode  – stream audio from a URL (requires ffmpeg).
  2. File mode – read a local file and send chunks over the connection.

Usage:
    python scripts/transcribe_realtime.py --url https://stream.example.com/live.mp3
    python scripts/transcribe_realtime.py --file recording.wav
    python scripts/transcribe_realtime.py --help
"""

import argparse
import asyncio
import base64
import logging
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.client import create_client
from src.realtime import connect_realtime_audio, connect_realtime_url

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)


def _on_partial(data: dict) -> None:
    transcript = data.get("transcript", "")
    if transcript.strip():
        print(f"  [partial] {transcript}", end="\r", flush=True)


def _on_committed(data: dict) -> None:
    transcript = data.get("transcript", "")
    print(f"  [final]   {transcript}")


def _on_error(data: dict) -> None:
    logger.error("Realtime error: %s", data)


async def run_url_mode(
    api_key: str | None,
    url: str,
    model_id: str,
    language: str | None,
    duration: int,
) -> None:
    """Stream from a URL and print transcripts for a given duration."""
    client = create_client(api_key=api_key)

    connection = await connect_realtime_url(
        client,
        url,
        model_id=model_id,
        language_code=language,
        on_partial=_on_partial,
        on_committed=_on_committed,
        on_error=_on_error,
    )

    logger.info("Streaming for %d seconds...", duration)
    await asyncio.sleep(duration)

    logger.info("Closing connection.")
    await connection.close()


async def run_file_mode(
    api_key: str | None,
    file_path: str,
    model_id: str,
    language: str | None,
    audio_format: str,
    sample_rate: int,
) -> None:
    """Read a local file and send audio chunks over the real-time connection."""
    client = create_client(api_key=api_key)

    connection = await connect_realtime_audio(
        client,
        model_id=model_id,
        audio_format=audio_format,
        sample_rate=sample_rate,
        language_code=language,
        on_partial=_on_partial,
        on_committed=_on_committed,
        on_error=_on_error,
    )

    path = Path(file_path)
    if not path.exists():
        logger.error("File not found: %s", file_path)
        await connection.close()
        return

    chunk_size = sample_rate * 2  # 1 second of 16-bit PCM
    logger.info("Sending audio from %s in %d-byte chunks...", path.name, chunk_size)

    with open(path, "rb") as f:
        while True:
            chunk = f.read(chunk_size)
            if not chunk:
                break
            encoded = base64.b64encode(chunk).decode("utf-8")
            await connection.send({"audio_base_64": encoded})
            # Pace sending to approximate real-time
            await asyncio.sleep(0.5)

    # Allow time for final transcripts to arrive
    await asyncio.sleep(3)

    logger.info("Closing connection.")
    await connection.close()


def main() -> None:
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    source = parser.add_mutually_exclusive_group(required=True)
    source.add_argument("--url", help="HTTPS URL of a live audio stream")
    source.add_argument("--file", help="Local audio file to stream (raw PCM recommended)")

    parser.add_argument(
        "--model",
        default="scribe_v2_realtime",
        help="Real-time model ID (default: scribe_v2_realtime)",
    )
    parser.add_argument("--language", default=None, help="ISO-639 language code hint")
    parser.add_argument(
        "--duration",
        type=int,
        default=30,
        help="Seconds to stream in URL mode (default: 30)",
    )
    parser.add_argument(
        "--audio-format",
        default="pcm_16000",
        help="Audio format for file mode (default: pcm_16000)",
    )
    parser.add_argument(
        "--sample-rate",
        type=int,
        default=16000,
        help="Sample rate in Hz for file mode (default: 16000)",
    )
    parser.add_argument("--api-key", default=None, help="ElevenLabs API key")
    args = parser.parse_args()

    if args.url:
        asyncio.run(
            run_url_mode(args.api_key, args.url, args.model, args.language, args.duration)
        )
    else:
        asyncio.run(
            run_file_mode(
                args.api_key, args.file, args.model, args.language, args.audio_format, args.sample_rate
            )
        )


if __name__ == "__main__":
    main()
