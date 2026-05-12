#!/usr/bin/env python3
"""
Example: Real-time transcription from a URL stream.

Connects to a live audio stream and prints transcripts as they arrive.
"""

import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.client import create_client
from src.realtime import connect_realtime_url


async def main() -> None:
    client = create_client()  # uses ELEVENLABS_API_KEY env var

    print("Connecting to real-time transcription...")

    connection = await connect_realtime_url(
        client,
        "https://stream.example.com/live-audio.mp3",
        model_id="scribe_v2_realtime",
        on_partial=lambda data: print(f"  [partial] {data.get('transcript', '')}", end="\r"),
        on_committed=lambda data: print(f"  [final]   {data.get('transcript', '')}"),
        on_error=lambda data: print(f"  [error]   {data}"),
    )

    print("Streaming for 60 seconds...")
    await asyncio.sleep(60)

    await connection.close()
    print("Done.")


if __name__ == "__main__":
    asyncio.run(main())
