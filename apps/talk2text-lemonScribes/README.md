# logiclemonai.com speech-to-text

> Convert audio into text using batch file transcription or real-time WebSocket streaming with the ElevenLabs Scribe API.

## Overview

### What is this?

A ready-to-use workflow for transcribing spoken audio into text using ElevenLabs. It wraps the ElevenLabs Python SDK to provide two transcription modes: **batch** (upload a file, get back a complete transcript) and **real-time** (stream audio over a WebSocket and receive live transcripts as words are spoken).

### Why use this?

Building speech-to-text into an application means handling API authentication, audio format negotiation, WebSocket lifecycle management, and result parsing. This workflow encapsulates all of that into simple function calls so you can focus on what to do with the transcript, not how to get it.

### When to use this?

Use **batch mode** when you have a pre-recorded audio file (interview, podcast episode, meeting recording, voicemail) and want a complete transcript with word-level timestamps and optional speaker labels.

Use **real-time mode** when you need live transcription of streaming audio — live events, phone calls, real-time captions, or any scenario where you need text as the audio plays.

**Example use cases:**
- Transcribing meeting recordings with speaker identification
- Adding subtitles to video content using word-level timestamps
- Live captioning of a streaming audio feed
- Indexing podcast episodes for search
## Quick Start

### Prerequisites

- Python 3.10+
- An [ElevenLabs API key](https://elevenlabs.io/app/settings/api-keys)
- `ffmpeg` installed on your system (only needed for real-time URL streaming)

### Installation

```bash
git clone https://github.com/leeroopedia/workflow-elevenlabs-elevenlabs-python-speech-to-text-transcription.git
cd workflow-elevenlabs-elevenlabs-python-speech-to-text-transcription
pip install -r requirements.txt
```

Set your API key:

```bash
export ELEVENLABS_API_KEY="your-api-key-here"
```

### Basic Usage

**Transcribe a local file:**

```bash
python scripts/transcribe_file.py recording.mp3
```

**Transcribe from a URL:**

```bash
python scripts/transcribe_url.py https://example.com/audio.mp3
```

**Real-time transcription from a live stream:**

```bash
python scripts/transcribe_realtime.py --url https://stream.example.com/live.mp3
```

---

## Project Structure

```
workflow-elevenlabs-elevenlabs-python-speech-to-text-transcription/
├── README.md
├── requirements.txt
├── .gitignore
├── config/
│   └── default.yaml              # Default model and format settings
├── src/
│   ├── __init__.py
│   ├── client/
│   │   ├── __init__.py
│   │   └── elevenlabs_client.py  # API client initialization
│   ├── transcription/
│   │   ├── __init__.py
│   │   └── batch.py              # Batch file/URL transcription
│   ├── realtime/
│   │   ├── __init__.py
│   │   └── streaming.py          # WebSocket real-time transcription
│   └── utils/
│       ├── __init__.py
│       └── formatting.py         # Transcript formatting helpers
├── scripts/
│   ├── transcribe_file.py        # CLI: transcribe a local file
│   ├── transcribe_url.py         # CLI: transcribe from a URL
│   └── transcribe_realtime.py    # CLI: real-time streaming transcription
└── examples/
    ├── batch_transcribe.py       # Example: batch with diarization
    └── realtime_transcribe.py    # Example: real-time from URL
```

**Why this structure?** The workflow has two distinct transcription paths (batch and real-time) that share a common client and output format. Separating them into `src/transcription/` and `src/realtime/` keeps each mode self-contained, while `src/client/` and `src/utils/` hold shared concerns. The `scripts/` directory provides ready-to-run CLIs, and `examples/` shows programmatic usage.

---

## Configuration

### Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `ELEVENLABS_API_KEY` | Your ElevenLabs API key | Yes (or pass via `--api-key`) |

### Default Settings (`config/default.yaml`)

| Parameter | Description | Default |
|-----------|-------------|---------|
| `batch.model_id` | Model for batch transcription | `scribe_v1` |
| `batch.language_code` | Language hint (null = auto-detect) | `null` |
| `batch.diarize` | Enable speaker diarization | `false` |
| `batch.timestamps_granularity` | Word or character timestamps | `word` |
| `realtime.model_id` | Model for real-time transcription | `scribe_v2_realtime` |
| `realtime.audio_format` | Audio encoding | `pcm_16000` |
| `realtime.sample_rate` | Sample rate in Hz | `16000` |
| `realtime.commit_strategy` | `vad` (auto) or `manual` | `vad` |

---

## Detailed Usage

### Batch Transcription

Transcribe a local file with speaker diarization and word timestamps:

```bash
python scripts/transcribe_file.py interview.mp3 \
    --diarize \
    --num-speakers 2 \
    --timestamps word \
    --show-timestamps
```

Transcribe from a cloud URL and output raw JSON:

```bash
python scripts/transcribe_url.py https://bucket.s3.amazonaws.com/meeting.wav \
    --diarize \
    --json
```

### Real-time Transcription

Stream from a live URL for 60 seconds:

```bash
python scripts/transcribe_realtime.py \
    --url https://stream.example.com/live.mp3 \
    --duration 60
```

Send a local PCM file as real-time chunks:

```bash
python scripts/transcribe_realtime.py \
    --file recording.raw \
    --audio-format pcm_16000 \
    --sample-rate 16000
```
### Programmatic Usage

```python
from src.client import create_client
from src.transcription import transcribe_file

client = create_client()
result = transcribe_file(client, "audio.mp3", diarize=True)
print(result["text"])
```

```python
import asyncio
from src.client import create_client
from src.realtime import connect_realtime_url

async def main():
    client = create_client()
    conn = await connect_realtime_url(
        client,
        "https://stream.example.com/audio.mp3",
        on_committed=lambda d: print(d["transcript"]),
    )
    await asyncio.sleep(30)
    await conn.close()

asyncio.run(main())
```

### CLI Options

All scripts support `--help` for full option details:

```bash
python scripts/transcribe_file.py --help
python scripts/transcribe_url.py --help
python scripts/transcribe_realtime.py --help
```

---

## References

- [ElevenLabs Python SDK](https://github.com/elevenlabs/elevenlabs-python)
- [ElevenLabs Speech-to-Text API docs](https://elevenlabs.io/docs/api-reference/speech-to-text)
- [Scribe model documentation](https://elevenlabs.io/docs/capabilities/speech-to-text)

---

## License

MIT
