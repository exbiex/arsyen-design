# ARSYEN WORKFLOW & CANVAS SYSTEM REARCHITECTURE

## Context

We already have a working UI implementation.

The current implementation should NOT be treated as incorrect.

Instead, treat it as a baseline implementation currently achieving approximately 4/10 of the intended vision.

The objective is NOT to redesign from scratch.

The objective is to evolve the existing architecture, interactions, workflows, and systems into a coherent 10/10 creative operating system experience.

When proposing changes:

* Preserve existing strengths.
* Preserve the current visual language direction.
* Preserve the panel-based workflow philosophy.
* Improve information architecture.
* Improve interaction design.
* Improve scalability.
* Improve creative workflows.
* Improve storytelling capabilities.
* Improve long-term platform extensibility.

Think like a Principal Product Designer, Creative Tools Architect, and Systems Designer simultaneously.

---

# Core Product Philosophy

Arsyen is NOT:

* Project Management Software
* Task Management Software
* Productivity Software

Arsyen is:

> A Creative Operating System for Artists, Filmmakers, Designers, Writers, Musicians, and Creative Teams.

The platform should feel closer to:

* Figma
* Notion
* Framer
* Arc Browser
* Apple Product Storytelling

than:

* Asana
* Monday
* Trello

---

# Workflow Philosophy

The platform is workflow-driven.

Each workflow may have a completely different layout structure.

There is NO global requirement that all workflows share identical panel layouts.

The only persistent shell elements are:

* Bottom Dock / Taskbar
* Global Search
* Notifications
* Profile
* Shared Design Language

Everything else is workflow-specific.

---

# Rename Projects Workflow

Current:

Projects

New:

Work

The Work workflow becomes the primary creation environment.

---

# Work Workflow

Work is not a single feature.

Work is a container for active creative work.

Initially the following categories should live under Work:

## Core

* Projects
* Notes
* Tasks
* Ideas

## Creative Resources

* References
* Moodboards
* Assets

## Professional Growth

* Contacts
* Opportunities

## Planning

* Calendar

Additional categories may be added later.

Do not overcomplicate V1.

However, architect the system so categories can eventually graduate into dedicated workflows.

Example future direction:

Work
Library
Growth

without requiring major rewrites.

---

# Work Workflow Layout

Current structure is conceptually correct.

## Left Panel

This is NOT navigation.

This is the active Work object/category selector.

Examples:

Projects
Notes
Tasks
Ideas
Moodboards
Assets
etc.

The panel contains collections of work objects.

---

## Right Panel

This is the workspace.

The workspace loads the selected object.

Examples:

Project
Note
Moodboard
Asset Collection
Contact
Opportunity

The right panel is not a page replacement system.

It is a persistent workspace.

---

# Interaction Philosophy

The user should remain within context.

Avoid excessive page transitions.

Avoid deep navigation trees.

Avoid route explosion.

The user should always know:

"I am currently inside Project X."

Example:

Project Selected

Workspace Displays:

* Overview
* Board
* Action Plans
* Files
* Activity
* Settings

These are views of the Project object.

They are NOT separate pages.

---

# Context Preservation

Example Flow

User opens:

Project A

Inside workspace:

Board Section

User clicks Task

Instead of:

Project Page
→ Task Page

The system should preserve context.

Possible approaches:

* Scroll to Task Detail Section
* Expand Task Detail Region
* Open contextual detail surface

The Project context remains visible.

The user never loses orientation.

---

# Synchronized Views

Example:

Action Plans contain Tasks.

Board contains Tasks.

Timeline contains Tasks.

All represent the same underlying objects.

Selecting a task in one view should synchronize with other views.

Example:

Action Plan Task Selected

↓

Board Automatically Focuses Same Task

↓

Task Details Open

This creates object continuity.

---

# Fullscreen Mode

Current concept is correct.

Needs refinement.

Normal Mode:

Left Work Panel Visible

Right Workspace Visible

Fullscreen Mode:

Left Panel Hides

Workspace Expands

Workspace Centers

Additional width is gained

Distractions are removed

Important:

Fullscreen is a focus mode.

It is NOT a page transition.

It is NOT a new route.

It is a workspace state.

---

# Universal Canvas System

One of the most important systems in Arsyen.

The Canvas is NOT a Project feature.

The Canvas is a platform primitive.

Everything should be built on top of the same Canvas Engine.

---

# Canvas Use Cases

Projects > Canvas

Portfolio Pages

Blogs

Moodboards

Color Boards

Idea Boards

Pitch Decks

Creative Briefs

Personal Websites

Research Documents

Story Worlds

Future Experiences

All should use the same underlying engine.

---

# Canvas Definition

A Canvas is:

A scrollable visual document composed of sections, components, assets, interactions, and motion.

Think:

Notion Page

*

Framer

*

Apple Storytelling

*

Creative Portfolio Builder

---

# Canvas Architecture

Canvas

→ Sections

→ Components

→ Assets

→ Motion

→ Interactions

→ Behaviors

---

# Components

Examples:

Text

Heading

Paragraph

Image

Video

Gallery

Quote

Divider

Button

Embed

Table

List

Timeline

Audio

Color Palette

Moodboard Grid

Film Strip

Character Card

Reference Card

Gallery Stack

Etc.

System must be extensible.

---

# Layout System

Avoid completely freeform positioning.

Do NOT build Photoshop.

Do NOT build Figma.

Prefer:

Sections

Containers

Columns

Stacks

Grids

Responsive Layout Blocks

Structured creative freedom.

---

# Motion System

Motion is NOT decoration.

Motion is storytelling.

Motion should be a first-class system.

---

# Scroll Narrative Engine

Apple-style storytelling interactions are extremely important.

This should become a dedicated subsystem.

Examples:

## Reveal

Fade In

Slide Up

Scale In

Progressive Reveal

---

## Sticky Narrative

Pinned Sections

Changing Content While Scrolling

Product Storytelling

Film Storytelling

Portfolio Storytelling

---

## Scroll Transformations

Scale

Blur

Mask

Morph

Rotation

Depth

Parallax

---

## Scroll Chapters

Narrative Sections

Chapter-Based Experiences

Guided Storytelling

---

## Horizontal Experiences

Horizontal Galleries

Film Strips

Reference Boards

Visual Timelines

---

## Scroll Sequences

Frame-by-frame storytelling

Storyboard progression

Animation sequences

Product reveals

---

# Motion Profiles

Do NOT hardcode Apple-specific templates.

Instead create reusable Motion Profiles.

Examples:

Static

Editorial

Cinematic

Product Reveal

Narrative

Parallax

Story Scroll

Future Profiles

Any Canvas Section should be able to use a Motion Profile.

---

# Template System

Canvas Templates should exist.

Examples:

Portfolio

Filmmaker Portfolio

Designer Portfolio

Creative Studio

Film Pitch Deck

Moodboard

Blog

Color Board

Project Canvas

Creative Resume

Personal Website

Research Report

Etc.

---

# Experience Templates

Templates should contain more than layout.

A Template may include:

Layout

Components

Motion

Interactions

Behaviors

Storytelling Structure

Think:

Experience Templates

not merely

Page Templates

---

# Bring Your Own Design (BYOD)

This should become a major differentiator.

Users should be able to provide:

HTML

Tailwind Pages

Website Exports

Landing Pages

Design References

Potentially Screenshots in the future

Potentially Figma Imports in the future

---

# Generative Template Pipeline

User Provides Design

↓

Arsyen Parsing Service

↓

Structural Analysis

↓

Canvas Schema Generation

↓

Editable Template Creation

↓

Template Library

The generated result should become a native Arsyen Canvas Template.

---

# Critical Architecture Rule

Uploaded HTML must NOT become source of truth.

Source of Truth:

Canvas Schema

HTML is merely an import format.

Canvas Schema generates HTML.

Never the opposite.

This preserves:

Editability

AI Generation

Versioning

Migration

Reusability

Template Evolution

---

# Long-Term Vision

Canvas should become one of the core primitives of the platform.

Core Platform Primitives:

Identity

Work

Assets

Canvas

AI

Community

The Canvas Engine should eventually power almost every user-facing surface inside Arsyen.

---

# Deliverables

Review current implementation.

Identify strengths worth preserving.

Identify architectural weaknesses.

Propose improved information architecture.

Propose improved interaction models.

Design the Work workflow evolution.

Design the Universal Canvas Engine.

Design the Motion & Scroll Narrative Engine.

Design the Template System.

Design the BYOD Pipeline.

Think beyond immediate implementation.

Design for a platform that can scale for years.
