# ScoreSight

> [!WARNING]  
> This project is a current work in progress.

ScoreSight is a full-stack web app that aims to provide similar functionality to [Gradescope](https://www.gradescope.com/). It allows instructors to easily manage and grade assignments, and students to submit their work and view their grades. This project is designed primarily as a way to practice skills relating to full-stack web development, rather than a tool to be used in the real world.

## Design Document

### Brand

Subject to change, just trying to get something down so that I don't have to worry about it while doing the project.

- name derived from a synonym for "grade" and a synonym for "scope"
  - capitalizing both words for legibility, but not adding a space in between
- display font: [Madimi One](https://fonts.google.com/specimen/Madimi+One), with [Fugaz One](https://fonts.google.com/specimen/Fugaz+One) as a backup for a different vibe
- paragraph font: something simple like the system font or [Inter](https://fonts.google.com/specimen/Inter)
- pretty much just stick to default [shadcn/ui](https://ui.shadcn.com/) theming and monochrome colors
  - can change things around later, but want to keep it simple
- language around user roles
  - "instructor" to refer to teachers, professors, TAs, etc that have the ability to manage classes
  - "owner" to refer to an instructor that manages the class
  - "student" to refer to a person in a class
  - these roles aren't exclusive to one account, but on a class basis
    - i.e. a TA can be an instructor for one class and student for another

### Scope

I'd like to stay focused on implementing the MVP features before trying to attempt anything else. I'm really just trying to make sure I don't drift to working on things that aren't essential to the core of the app.

#### MVP Features

- [ ] create homework assignments _(instructor)_
- [ ] upload pdf to a homework assignment _(student)_
- [ ] assign pages to assignment questions _(student)_
- [ ] view and grade student homeworks _(instructor)_
- [ ] receive feedback on graded assignment _(student)_

#### Reach Features

- [ ] add and set roles for extra instructors on a class _(instructor)_
- [ ] upload images to an assignment _(student)_
- [ ] create non-homework assignments, like quizzes and exams _(instructor)_
  - students don't need to upload documents themselves
- [ ] upload bulk pdfs to an assignment _(instructor)_
- [ ] implement features from other education sites, like [Kahoot](https://kahoot.com/) or [Quizlet](https://quizlet.com/)

### Tech

- [next.js](https://nextjs.org/) as the full-stack framework
  - _(probably)_ vercel for hosting
- [pocketbase](https://pocketbase.io/) as the database and file store
  - _(probably)_ run on one of my machines, behind cloudflare tunnel
- two competing patterns for data fetching and mutations:
  1. login with user account from client, basically client side render everything
     - might be more "direct" and almost seems intended by the pocketbase client api
  2. login with admin account from next.js, basically server side render everything
     - would be neat to take full advantage of the new next.js 13 patterns
     - _(probably)_ going to do this, plus a mix of the other pattern if I need to do real time update stuff
- `scoresight.app` for main app, `db.scoresight.app` _(probably)_ for proxy to pocketbase
  - some other redirects to main url, such as _(possibly)_ `scoresight.zsrobinson.com` or `scoresight.vercel.app`
- other libraries:
  - [shadcn/ui](https://ui.shadcn.com/) _(as mentioned)_ for ui components
  - [wojtekmaj/react-pdf](https://projects.wojtekmaj.pl/react-pdf/) _(probably)_ to display documents
  - [pocketbase/js-sdk](https://github.com/pocketbase/js-sdk) for accessing the database
  - [patmood/pocketbase-typegen](https://github.com/patmood/pocketbase-typegen) for typescript things

#### Mock Database Schema [_(via MonoSketch)_](https://monosketch.io/)

```
    ┏━━━━━━━━━━━━━━━━━━━┓       ┏━━━━━━━━━━━━━━━━━━━┓       ┏━━━━━━━━━━━━━━━━━━━┓
    ┃    Assignments    ┃       ┃      Classes      ┃       ┃       Users       ┃
    ┗━━━━━━━━━━━━━━━━━━━┛       ┗━━━━━━━━━━━━━━━━━━━┛       ┗━━━━━━━━━━━━━━━━━━━┛
 ─ ▶│ id                │    ─ ▶│ id                │    ─ ▶│ id                │
│   ├───────────────────┤   │   ├───────────────────┤   │   ├───────────────────┤
    │ name (text)       │       │ name (text)       │       │ name (text)       │
│   ├───────────────────┤   │   ├───────────────────┤   │   ├───────────────────┤
    │ type (enum)       │       │ owner (key)       │─ ─    │ settings (json)   │
│   ├───────────────────┤   │   ├───────────────────┤   │   └───────────────────┘
    │ class (key)       │─ ─    │ instructors (key) │─ ─                         
│   └───────────────────┘       ├───────────────────┤   │                        
                                │ students (key)    │─ ─                         
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐   └───────────────────┘   │                        
                                                                                 
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
