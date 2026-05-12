"""
Transcript formatting utilities.

Helpers for pretty-printing transcription results, generating
SRT-style subtitle entries, and extracting speaker segments.
"""

from typing import Any, Dict, List


def format_transcript(result: Dict[str, Any], show_speakers: bool = False) -> str:
    """
    Format a batch transcription result as readable text.

    Args:
        result: Dictionary returned by ``transcribe_file`` or ``transcribe_url``.
        show_speakers: Prefix each segment with the speaker label when
            diarization data is available.

    Returns:
        Formatted transcript string.

    Example:
        >>> text = format_transcript(result, show_speakers=True)
        >>> print(text)
        [Speaker 0] Hello, welcome to the meeting.
        [Speaker 1] Thanks for having me.
    """
    text = result.get("text", "")
    if not show_speakers:
        return text

    words = result.get("words", [])
    if not words:
        return text

    segments: List[str] = []
    current_speaker = None
    current_words: List[str] = []

    for word_info in words:
        speaker = word_info.get("speaker_id") or word_info.get("speaker")
        word = word_info.get("text", word_info.get("word", ""))

        if speaker != current_speaker:
            if current_words:
                label = f"[Speaker {current_speaker}] " if current_speaker is not None else ""
                segments.append(f"{label}{''.join(current_words).strip()}")
            current_speaker = speaker
            current_words = [word]
        else:
            current_words.append(word)

    if current_words:
        label = f"[Speaker {current_speaker}] " if current_speaker is not None else ""
        segments.append(f"{label}{''.join(current_words).strip()}")

    return "\n".join(segments)


def format_word_timestamps(result: Dict[str, Any]) -> str:
    """
    Format word-level timestamps as an aligned table.

    Args:
        result: Transcription result dictionary.

    Returns:
        A multi-line string with columns: start, end, word, confidence.

    Example:
        >>> print(format_word_timestamps(result))
        0.000 -  0.450  Hello      0.98
        0.450 -  0.900  world      0.95
    """
    words = result.get("words", [])
    if not words:
        return "(no word-level timestamps available)"

    lines = []
    for w in words:
        start = w.get("start", w.get("start_time", 0.0))
        end = w.get("end", w.get("end_time", 0.0))
        text = w.get("text", w.get("word", ""))
        confidence = w.get("confidence", None)

        conf_str = f"  {confidence:.2f}" if confidence is not None else ""
        lines.append(f"{start:7.3f} - {end:7.3f}  {text:<20}{conf_str}")

    return "\n".join(lines)
