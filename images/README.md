# Image Asset Manifest

This document maps every image slot used in the site to its source photo
or placeholder status. Update this file whenever you add or replace photos.

## Current Status

### Leadership (Age 13 — Training Camp)
- `leadership/training-camp-wide.jpg` — REAL PHOTO. Source: `IMG_4282.JPG` from `个人网站素材/13岁主办培训/`. Wide stage shot of the training camp audience.
- `leadership/training-camp-stage.jpg` — REAL PHOTO. Source: `387f470571d8df539ad861eb7b8077f1 2.JPG` from `个人网站素材/13岁主办培训/`.

### Leadership (Age 14 — Forum)
- `leadership/forum-poster.jpg` — REAL PHOTO. Source: `65916c94eec77b8e999aed1f2286aa75.jpg` from `个人网站素材/14岁承办论坛/`. Poster showing Yuan Qianming as Forum General Coordinator.
- `leadership/forum-scene.jpg` — REAL PHOTO. Source: `6dc1c2a55045ae0d2bc9c8de7e742592.jpg` from `个人网站素材/14岁承办论坛/`.

### Nature Photography (Biology Timeline — Stage 1)
- `nature/nature-1.jpg` — REAL PHOTO. Source: `e42ac963ec57e210014f211b2c331fc5.jpg` from `个人网站素材/自然摄影/`. Bird on a perch.
- `nature/nature-2.jpg` — REAL PHOTO. Source: `fcb8c8046cdf4358ac4efc0afb22f6eb.jpg` from `个人网站素材/自然摄影/`.
- `nature/nature-3.jpg` — REAL PHOTO. Source: `d393f62ae08674d331ca123f207e3349.jpg` from `个人网站素材/自然摄影/`.

### IPF Workflow
- `ipf/workflow-diagram.svg` — NOT USED as external file. The workflow is rendered as an inline React component (`IPFWorkflowDiagram` in `src/components/Sections.jsx`) for crisp rendering at any size. The original high-res PNG (`Figure1A_workflow_300dpi_highres_131.png`, 3.8MB) is kept in `个人网站素材/15岁IPF项目/` as a downloadable source. To embed the original PNG instead, drop it at `public/images/ipf/workflow-original.png` and update the component.

### Robot Dog (Learning Agility)
- `robot-dog/project-photo-1.jpg` — PLACEHOLDER. No photo available in the materials folder. The source folder `个人网站素材/15岁机器狗项目/` only contains `LIO-SAM.pptx`. Drop a real photo here when available.
- `robot-dog/system-architecture.svg` — PLACEHOLDER. Draw an inline SVG architecture diagram in the component, or drop a real diagram here.

### Singapore (Independent Growth)
- `singapore/campus.jpg` — PLACEHOLDER. No photo provided. Drop a campus or city photo here when available.
- `singapore/study-desk.jpg` — PLACEHOLDER. No photo provided. Drop a study-desk or daily-life photo here when available.

### Hero Portrait
- `portrait.jpg` — NOT IN PUBLIC FOLDER. The Hero currently renders an inline SVG monogram (YQ initials) as a placeholder. To use a real portrait, save it at `public/images/portrait.jpg` and update the Hero component in `src/components/Sections.jsx` to reference `/images/portrait.jpg`.

## How to Replace Placeholders

1. Save the real photo at the listed path under `public/images/...`.
2. Keep file sizes under 500KB — resize with `sips -Z 1600 <input> --out <output> -s format jpeg -s formatOptions 82` on macOS.
3. The site will automatically pick up the new photo on next dev reload; no code change needed for `PhotoSlot` references.

## Optimization Notes

All real photos were resized from their original 3-5MB sizes to 142-376KB
using `sips` with max dimension 1600px (leadership) or 1200px (nature) and
JPEG quality 80-82. This keeps Lighthouse performance score high.
