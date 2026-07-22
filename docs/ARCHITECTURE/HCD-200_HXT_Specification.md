# Halisako Experience Timeline (HXT) Specification

**Document ID:** HAD-201

**Version:** 1.0

**Status:** Draft

**Repository:** halisako

**Last Updated:** July 2026

---

# 1. Purpose

The Halisako Experience Timeline (HXT) is the canonical intermediate representation used by every product built on the Halisako platform.

Rather than allowing each AI model or product to communicate using its own format, Halisako converts every input into a common experience description before rendering.

The HXT separates **understanding and planning** from **execution**.

This ensures that AI models remain interchangeable while preserving a consistent creative workflow.

---

# 2. Core Principle

Every Halisako product follows the same pipeline:

```text
Input
    ↓
Understanding
    ↓
Planning
    ↓
HXT
    ↓
Rendering
    ↓
Experience
```

The HXT is the output of the planning phase and the input to the rendering phase.

---

# 3. Design Goals

The HXT must be:

* Human-readable
* Machine-readable
* Versioned
* Extensible
* Renderer-agnostic
* Product-agnostic
* Deterministic where possible

It should describe **what should happen**, not **how a renderer implements it**.

---

# 4. High-Level Structure

Every HXT consists of:

```text
Metadata
Timeline
Actors
Scenes
Environment
Camera
Audio
Effects
Transitions
Rendering Hints
```

---

# 5. Metadata

Describes the experience itself.

Example fields:

```json
{
  "version": "1.0",
  "experience_type": "chess2fight",
  "duration_seconds": 94,
  "created_at": "...",
  "planning_engine": "v1",
  "source": "PGN"
}
```

---

# 6. Actors

Actors represent entities participating in the experience.

Examples:

* White Player
* Black Player
* Dancer
* Backup Dancers
* Narrator
* Camera Drone

Each actor has:

* ID
* Role
* Appearance
* Style
* Motion Profile
* Emotional Profile

Actors are persistent across the entire experience.

---

# 7. Scenes

Experiences are divided into scenes.

Each scene contains:

* Start time
* End time
* Environment
* Active actors
* Scene objective

Example:

```text
Scene 1

Opening

0–18s

Objective:
Introduce fighters.
```

---

# 8. Timeline Events

The timeline is an ordered sequence of events.

Each event includes:

* Timestamp
* Actor
* Action
* Target
* Emotion
* Camera instruction
* Environment changes
* Audio synchronization
* Transition

Example:

```json
{
  "time": 12.3,
  "actor": "white",
  "action": "advance",
  "emotion": "confident",
  "camera": "medium_shot"
}
```

---

# 9. Actions

Actions describe meaningful motion.

Examples:

Chess2Fight:

* Advance
* Strike
* Block
* Counter
* Dodge
* Charge
* SpecialAttack
* Defeat

Song2Dance:

* Step
* Spin
* Jump
* Slide
* Pose
* FormationChange
* Solo
* Synchronize

Future products may introduce additional action sets while remaining compatible with the HXT structure.

---

# 10. Emotion Layer

Every event may contain emotional intent.

Examples:

* Calm
* Focused
* Aggressive
* Joyful
* Triumphant
* Fearful
* Confident

Emotion influences rendering but does not prescribe a specific animation.

---

# 11. Camera Layer

Camera instructions remain abstract.

Examples:

* Wide Shot
* Close Up
* Tracking
* Orbit
* Overhead
* Slow Zoom
* Dramatic Reveal

Individual renderers determine the exact implementation.

---

# 12. Environment Layer

Defines the world in which the experience occurs.

Examples:

* Arena
* City
* Forest
* Concert Stage
* Space
* Temple

Environment changes are represented as timeline events.

---

# 13. Audio Layer

Coordinates music and sound.

Examples:

* Beat markers
* Chorus
* Verse
* Crescendo
* Silence
* Impact
* Crowd reaction

For music-driven products, this layer provides synchronization points for choreography and visual effects.

---

# 14. Effects Layer

Effects enrich the experience without changing its core logic.

Examples:

* Sparks
* Energy burst
* Smoke
* Rain
* Explosion
* Motion blur
* Lighting pulse

Effects are optional and renderer-specific.

---

# 15. Rendering Hints

Rendering hints provide guidance to execution engines without dictating implementation.

Examples:

* Cinematic
* Anime
* Realistic
* Stylized
* Slow Motion
* High Energy
* Minimal Camera Motion

Renderers may ignore unsupported hints.

---

# 16. Versioning

The HXT is versioned independently of products.

Major versions introduce breaking changes.

Minor versions add backward-compatible capabilities.

Every HXT document must declare its version.

---

# 17. Product Mapping

Every product transforms its input into an HXT.

Examples:

```text
Chess PGN
    ↓
Chess Analyzer
    ↓
HXT
    ↓
Renderer
```

```text
Song
    ↓
Music Analyzer
    ↓
HXT
    ↓
Renderer
```

This common representation enables shared infrastructure across products.

---

# 18. Extensibility

The HXT is designed to evolve.

New fields should be additive where possible.

Unknown fields should be safely ignored by older renderers.

---

# 19. Example Workflow

A simplified Chess2Fight workflow:

```text
PGN Upload
    ↓
Stockfish Analysis
    ↓
Move Classification
    ↓
Planning Engine
    ↓
HXT
    ↓
Renderer
    ↓
Video Output
```

A simplified Song2Dance workflow:

```text
Song Upload
    ↓
Music Analysis
    ↓
Beat & Structure Detection
    ↓
Planning Engine
    ↓
HXT
    ↓
Renderer
    ↓
Video Output
```

---

# 20. Guiding Principle

The Halisako Experience Timeline is not an animation format, a rendering format, or a video format.

It is a planning language.

Its purpose is to describe the intended experience in a way that can be understood by humans, AI models, and rendering systems alike.

By establishing a common language for creative orchestration, the HXT enables Halisako to support many creative domains while remaining independent of specific AI models or rendering technologies.

---

**End of Document**
