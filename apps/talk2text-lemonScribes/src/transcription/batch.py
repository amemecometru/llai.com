"""
Batch speech-to-text transcription.

Transcribes pre-recorded audio files or cloud-hosted audio URLs using
the ElevenLabs ``speech_to_text.convert()`` endpoint (Scribe model).
Returns complete transcripts with word-level timestamps, confidence
scores, and optional speaker diarization.
"""

import logging
from pathlib import Path
from typing import Any, Dict, List, Optional

from elevenlabs import ElevenLabs

logger = logging.getLogger(__name__)


def transcribe_file(
    client: ElevenLabs,
    file_path: str,
    *,
    model_id: str = "scribe_v1",
    language_code: Optional[str] = None,
    diarize: bool = False,
    num_speakers: Optional[int] = None,
    tag_audio_events: bool = False,
    timestamps_granularity: Optional[str] = None,
    keyterms: Optional[List[str]] = None,
) -> Dict[str, Any]:
    """
    Transcribe a local audio file.

    Args:
        client: Authenticated ElevenLabs client.
        file_path: Path to the audio file (MP3, WAV, FLAC, etc.).
        model_id: Transcription model identifier.
        language_code: ISO-639 language code hint (auto-detected if None).
        diarize: Enable speaker diarization.
        num_speakers: Expected number of speakers (max 32).
        tag_audio_events: Tag events like laughter, applause, etc.
        timestamps_granularity: ``"word"`` or ``"character"`` level timestamps.
        keyterms: Words/phrases to bias transcription toward.

    Returns:
        Dictionary with transcript text, words, and metadata.

    Raises:
        FileNotFoundError: If the audio file does not exist.

    Example:
        >>> result = transcribe_file(client, "interview.mp3", diarize=True)
        >>> print(result["text"])
    """
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"Audio file not found: {file_path}")

    logger.info("Transcribing file: %s (model=%s)", path.name, model_id)

    kwargs: Dict[str, Any] = {
        "model_id": model_id,
        "file": open(path, "rb"),
    }
    if language_code is not None:
        kwargs["language_code"] = language_code
    if diarize:
        kwargs["diarize"] = True
    if num_speakers is not None:
        kwargs["num_speakers"] = num_speakers
    if tag_audio_events:
        kwargs["tag_audio_events"] = True
    if timestamps_granularity is not None:
        kwargs["timestamps_granularity"] = timestamps_granularity
    if keyterms is not None:
        kwargs["keyterms"] = keyterms

    response = client.speech_to_text.convert(**kwargs)

    result = _response_to_dict(response)
    logger.info(
        "Transcription complete: %d characters, %d words",
        len(result.get("text", "")),
        len(result.get("words", [])),
    )
    return result


def transcribe_url(
    client: ElevenLabs,
    cloud_storage_url: str,
    *,
    model_id: str = "scribe_v1",
    language_code: Optional[str] = None,
    diarize: bool = False,
    num_speakers: Optional[int] = None,
    tag_audio_events: bool = False,
    timestamps_granularity: Optional[str] = None,
    keyterms: Optional[List[str]] = None,
) -> Dict[str, Any]:
    """
    Transcribe audio from a cloud storage URL.

    Accepts any HTTPS URL (S3, GCS, CDN, etc.) pointing to an audio
    file up to 2 GB.

    Args:
        client: Authenticated ElevenLabs client.
        cloud_storage_url: HTTPS URL of the audio file.
        model_id: Transcription model identifier.
        language_code: ISO-639 language code hint.
        diarize: Enable speaker diarization.
        num_speakers: Expected number of speakers.
        tag_audio_events: Tag audio events in transcription.
        timestamps_granularity: ``"word"`` or ``"character"`` level.
        keyterms: Words/phrases to bias transcription toward.

    Returns:
        Dictionary with transcript text, words, and metadata.

    Example:
        >>> result = transcribe_url(client, "https://bucket.s3.amazonaws.com/audio.mp3")
        >>> print(result["text"])
    """
    logger.info("Transcribing URL: %s (model=%s)", cloud_storage_url, model_id)

    kwargs: Dict[str, Any] = {
        "model_id": model_id,
        "cloud_storage_url": cloud_storage_url,
    }
    if language_code is not None:
        kwargs["language_code"] = language_code
    if diarize:
        kwargs["diarize"] = True
    if num_speakers is not None:
        kwargs["num_speakers"] = num_speakers
    if tag_audio_events:
        kwargs["tag_audio_events"] = True
    if timestamps_granularity is not None:
        kwargs["timestamps_granularity"] = timestamps_granularity
    if keyterms is not None:
        kwargs["keyterms"] = keyterms

    response = client.speech_to_text.convert(**kwargs)

    result = _response_to_dict(response)
    logger.info(
        "Transcription complete: %d characters, %d words",
        len(result.get("text", "")),
        len(result.get("words", [])),
    )
    return result


def _response_to_dict(response: Any) -> Dict[str, Any]:
    """Convert the SDK response object into a plain dictionary."""
    if hasattr(response, "model_dump"):
        return response.model_dump()
    if hasattr(response, "dict"):
        return response.dict()
    if hasattr(response, "__dict__"):
        return {
            k: v for k, v in response.__dict__.items() if not k.startswith("_")
        }
    return {"text": str(response)}
