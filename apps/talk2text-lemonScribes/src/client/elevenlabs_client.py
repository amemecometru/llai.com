"""
ElevenLabs client initialization.

Creates and configures the ElevenLabs SDK client with API key
authentication and optional environment/timeout settings.
"""

import logging
import os
from typing import Optional

from elevenlabs import ElevenLabs

logger = logging.getLogger(__name__)


def create_client(
    api_key: Optional[str] = None,
    timeout: Optional[float] = 240,
) -> ElevenLabs:
    """
    Create an authenticated ElevenLabs client.

    The client provides access to both batch speech-to-text (via
    ``client.speech_to_text.convert()``) and real-time streaming
    transcription (via ``client.speech_to_text.realtime.connect()``).

    Args:
        api_key: ElevenLabs API key. Falls back to the
            ``ELEVENLABS_API_KEY`` environment variable if not provided.
        timeout: HTTP request timeout in seconds. Defaults to 240.

    Returns:
        An authenticated ``ElevenLabs`` client instance.

    Raises:
        ValueError: If no API key is found.

    Example:
        >>> client = create_client()
        >>> client = create_client(api_key="sk-...")
    """
    resolved_key = api_key or os.getenv("ELEVENLABS_API_KEY")
    if not resolved_key:
        raise ValueError(
            "An ElevenLabs API key is required. Pass it via the 'api_key' "
            "parameter or set the ELEVENLABS_API_KEY environment variable."
        )

    client = ElevenLabs(api_key=resolved_key, timeout=timeout)
    logger.info("ElevenLabs client initialized successfully.")
    return client
