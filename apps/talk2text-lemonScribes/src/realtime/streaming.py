"""
Real-time speech-to-text streaming via WebSocket.

Opens a WebSocket connection to the ElevenLabs Scribe real-time API
and streams audio for live transcription. Supports two modes:

* **Audio chunk mode** – your application sends PCM audio data manually.
* **URL mode** – the API streams audio from a provided URL (requires
  ``ffmpeg`` on the host machine).

Event callbacks are registered on the returned ``RealtimeConnection``
object to receive partial and committed transcripts.
"""

import asyncio
import logging
from typing import Any, Callable, Dict, Optional

from elevenlabs import ElevenLabs

logger = logging.getLogger(__name__)


async def connect_realtime_audio(
    client: ElevenLabs,
    *,
    model_id: str = "scribe_v2_realtime",
    audio_format: str = "pcm_16000",
    sample_rate: int = 16000,
    commit_strategy: str = "vad",
    language_code: Optional[str] = None,
    on_partial: Optional[Callable[[Dict[str, Any]], None]] = None,
    on_committed: Optional[Callable[[Dict[str, Any]], None]] = None,
    on_error: Optional[Callable[[Dict[str, Any]], None]] = None,
) -> Any:
    """
    Open a real-time transcription connection for manual audio chunks.

    Use this when your application captures audio (e.g. from a
    microphone) and wants to send PCM chunks directly.

    Args:
        client: Authenticated ElevenLabs client.
        model_id: Real-time transcription model.
        audio_format: Audio encoding (e.g. ``"pcm_16000"``).
        sample_rate: Sample rate in Hz matching the audio format.
        commit_strategy: ``"vad"`` (auto-commit on silence) or
            ``"manual"`` (call ``connection.commit()`` yourself).
        language_code: ISO-639 language hint.
        on_partial: Callback for partial (interim) transcripts.
        on_committed: Callback for committed (final) transcripts.
        on_error: Callback for error events.

    Returns:
        A ``RealtimeConnection`` instance. Use ``connection.send()``
        to stream audio and ``connection.close()`` when done.

    Example:
        >>> async def main():
        ...     conn = await connect_realtime_audio(
        ...         client,
        ...         on_committed=lambda d: print(d["transcript"]),
        ...     )
        ...     await conn.send({"audio_base_64": chunk_b64})
        ...     await conn.close()
    """
    from elevenlabs.realtime.scribe import AudioFormat, CommitStrategy

    format_map = {fmt.value: fmt for fmt in AudioFormat}
    strategy_map = {s.value: s for s in CommitStrategy}

    resolved_format = format_map.get(audio_format)
    if resolved_format is None:
        raise ValueError(
            f"Unknown audio_format '{audio_format}'. "
            f"Choose from: {list(format_map.keys())}"
        )

    resolved_strategy = strategy_map.get(commit_strategy, CommitStrategy.VAD)

    options: Dict[str, Any] = {
        "model_id": model_id,
        "audio_format": resolved_format,
        "sample_rate": sample_rate,
        "commit_strategy": resolved_strategy,
    }
    if language_code is not None:
        options["language_code"] = language_code

    logger.info(
        "Connecting real-time STT (audio mode, model=%s, format=%s, rate=%d)",
        model_id,
        audio_format,
        sample_rate,
    )

    connection = await client.speech_to_text.realtime.connect(options)

    _register_callbacks(connection, on_partial, on_committed, on_error)

    logger.info("Real-time connection established.")
    return connection


async def connect_realtime_url(
    client: ElevenLabs,
    url: str,
    *,
    model_id: str = "scribe_v2_realtime",
    commit_strategy: str = "vad",
    language_code: Optional[str] = None,
    on_partial: Optional[Callable[[Dict[str, Any]], None]] = None,
    on_committed: Optional[Callable[[Dict[str, Any]], None]] = None,
    on_error: Optional[Callable[[Dict[str, Any]], None]] = None,
) -> Any:
    """
    Open a real-time transcription connection for a URL audio source.

    The ElevenLabs API uses ``ffmpeg`` to fetch and convert the audio
    stream into PCM before transcribing.

    Args:
        client: Authenticated ElevenLabs client.
        url: HTTPS URL of the live audio stream.
        model_id: Real-time transcription model.
        commit_strategy: ``"vad"`` or ``"manual"``.
        language_code: ISO-639 language hint.
        on_partial: Callback for partial transcripts.
        on_committed: Callback for committed transcripts.
        on_error: Callback for error events.

    Returns:
        A ``RealtimeConnection`` instance.

    Example:
        >>> async def main():
        ...     conn = await connect_realtime_url(
        ...         client,
        ...         "https://stream.example.com/live.mp3",
        ...         on_committed=lambda d: print(d["transcript"]),
        ...     )
        ...     await asyncio.sleep(30)
        ...     await conn.close()
    """
    from elevenlabs.realtime.scribe import CommitStrategy

    strategy_map = {s.value: s for s in CommitStrategy}
    resolved_strategy = strategy_map.get(commit_strategy, CommitStrategy.VAD)

    options: Dict[str, Any] = {
        "model_id": model_id,
        "url": url,
        "commit_strategy": resolved_strategy,
    }
    if language_code is not None:
        options["language_code"] = language_code

    logger.info(
        "Connecting real-time STT (URL mode, model=%s, url=%s)",
        model_id,
        url,
    )

    connection = await client.speech_to_text.realtime.connect(options)

    _register_callbacks(connection, on_partial, on_committed, on_error)

    logger.info("Real-time URL connection established.")
    return connection


def _register_callbacks(
    connection: Any,
    on_partial: Optional[Callable] = None,
    on_committed: Optional[Callable] = None,
    on_error: Optional[Callable] = None,
) -> None:
    """Attach event callbacks to the real-time connection."""
    from elevenlabs.realtime.connection import RealtimeEvents

    if on_partial:
        connection.on(RealtimeEvents.PARTIAL_TRANSCRIPT, on_partial)
    if on_committed:
        connection.on(RealtimeEvents.COMMITTED_TRANSCRIPT, on_committed)
    if on_error:
        connection.on(RealtimeEvents.ERROR, on_error)
