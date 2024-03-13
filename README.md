# ScoreSight

ScoreSight is a web app that aims to provide similar functionality to [Gradescope](https://www.gradescope.com/). It allows instructors to easily manage and grade assignments, and students to submit their work and view their grades. This project is designed primarily as a way to practice skills relating to full-stack web development, rather than a tool to be used in the real world.

## Design Document

- name
  - derived from a synonym for "grade" and a synonym for "scope"
  - capitalizing both words for legibility, but not adding a space in between
- brand guidelines
  - display font: [Madimi One](https://fonts.google.com/specimen/Madimi+One), with [Fugaz One](https://fonts.google.com/specimen/Fugaz+One) as a backup for a different vibe
  - paragraph font: something simple like the system font or [Inter](https://fonts.google.com/specimen/Inter)
- language
  - "instructor" to refer to teachers, professors, TAs, etc that have the ability to manage classes
  - "owner" to refer to an instructor that manages the class
  - "student" to refer to a person in a class
  - these roles aren't exclusive to one account, but on a class basis
    - i.e. a TA can be an instructor for one class and student for another
- mvp features
  - create homework assignments _(instructor)_
  - upload pdf to a homework assignment _(student)_
  - assign pages to assignment questions _(student)_
  - view and grade student homeworks _(instructor)_
  - receive feedback on graded assignment _(student)_
- extra features
  - add and set roles for extra instructors on a class _(instructor)_
  - upload images to an assignment _(student)_
  - create non-homework assignments, like quizzes and exams _(instructor)_
    - students don't need to upload documents themselves
  - upload bulk pdfs to an assignment _(instructor)_
- tech stack
  - [next.js](https://nextjs.org/) as the full-stack framework
    - _(probably)_ vercel for hosting
  - [pocketbase](https://pocketbase.io/) as the database and file store
    - _(probably)_ run on one of my machines, behind cloudflare tunnel
    - can use [pocketbase-typegen](https://github.com/patmood/pocketbase-typegen) to generate types for typescript
- urls
  - `scoresight.app` for main app
  - `db.scoresight.app` _(probably)_ for proxy to pocketbase
  - some other redirects to main url, such as _(possibly)_ `scoresight.zsrobinson.com` or `scoresight.vercel.app`

## Database Schema _(TBD)_

```
     ┏━━━━━━━━━━━━━━━━━━━┓       ┏━━━━━━━━━━━━━━━━━━━┓       ┏━━━━━━━━━━━━━━━━━━━┓
     ┃    Assignments    ┃       ┃      Classes      ┃       ┃       Users       ┃
     ┗━━━━━━━━━━━━━━━━━━━┛       ┗━━━━━━━━━━━━━━━━━━━┛       ┗━━━━━━━━━━━━━━━━━━━┛
┌ ─ ▶│ id                │    ─ ▶│ id                │    ─ ▶│ id                │
     ├───────────────────┤   │   ├───────────────────┤   │   ├───────────────────┤
│    │ name (text)       │       │ name (text)       │       │ name (text)       │
     ├───────────────────┤   │   ├───────────────────┤   │   ├───────────────────┤
│    │ type (enum)       │       │ owner (key)       │─ ─    │ settings (json)   │
     ├───────────────────┤   │   ├───────────────────┤   │   └───────────────────┘
│    │ class (key)       │─ ─    │ instructors (key) │─ ─
     └───────────────────┘       ├───────────────────┤   │
│                                │ students (key)    │─ ─
 ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐   └───────────────────┘   │

     ┏━━━━━━━━━━━━━━━━━━━┓   │                           │
     ┃    Submissions    ┃
     ┗━━━━━━━━━━━━━━━━━━━┛   │                           │
     │ id                │
     ├───────────────────┤   │                           │
     │ user (key)        │─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
     ├───────────────────┤   │
     │ assignment (key)  │─ ─
     ├───────────────────┤
     │ file (blob)       │
     ├───────────────────┤
     │ feedback (json)   │
     └───────────────────┘
```
