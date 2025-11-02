"""
Fetches and embeds the latest current-affairs items (e.g. PIB releases).
Replace the sample data with a real API/RSS feed pull and summarisation.
"""

from .rag_pipeline_upsc import embed_material

async def ingest_latest_news() -> int:
    sample_news = [
        ("pib-2025-11-01", "Government launches scheme X to boost rural economy."),
    ]
    for doc_id, text in sample_news:
        await embed_material(doc_id, text)
    return len(sample_news)
