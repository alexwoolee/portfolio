---
title: Desktop Pet
date: 2024-12-01
tags: [nextjs, blog]
---

# How I Made the BEST "Desktop Pet" 
During a hackathon, me and a couple buddies decided 
to create a pet that would roam around your desktop 
as a sort of companion. The main problem we wanted 
to tackle through this virtual pet was to aid people
who struggle with ADHD or people who have trouble
focusing on a task. We'll get to more later.

Firstly, we had to decide a game engine. We chose Godot cause we're collectively new to making games (I
ve personally never made a game before) and thought that it had a good balance of tools to work with. 

## Phase One
Now when making a virtual desktop pet, the first problem we needed to solve was that the window must be transparent or else the immersion is ruined. 
To do this, we need to tell Godot to render the background as transparent glass as follows through their default settings: 
1. Click project -> project settings
2. Toggle advanced settings (top right of the project settings window)
3. Go to Display > Window and change these: 
    - Size > Viewport Width/Height: Set this to your monitor resolution (e.g., 1920 x 1080).
    - Size > Transparent: ON
    - Size > Always On Top: ON
    - Size > Borderless: ON
    - Per Pixel Transparency > Allowed: ON
4. important! Go to Display > Window > Mouse Passthrough

## Phase Two 
The Scene Tree



