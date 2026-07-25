---
title: Biometrics Integrated Timekeeping System (BITS)
summary: A full-stack attendance management platform with biometric device integration, automated shift calculations, and role-based adjustment workflows.
role: Lead Full-Stack Developer
dates: 2025 - 2026
status: completed
featured: true
chessPiece: king
category: web
heroImage: /images/projects/bits/dashboard.png
keyTakeaway: "Key decision: Architect containerized Express.js hardware listeners connecting physical biometric hardware to PostgreSQL audit logs via Prisma ORM."
chessRoleReason: "BITS is my signature full-stack enterprise project—demonstrating real-world hardware integration, complex database schema design, and production microservice deployment."
stackRefs:
  - typescript
tags:
  - Next.js
  - Express.js
  - PostgreSQL
  - Docker
  - Prisma ORM
links:
  - label: GitHub Repository
    url: https://github.com/avegabros/bits
outcomes:
  - Integrated biometric hardware devices for real-time check-in and check-out tracking.
  - Built automated attendance calculation engines for night-shift differentials, undertime, and overtime approvals.
  - Implemented full employee lifecycle management across Active, Staged, Inactive, and Terminated states.
  - Containerized full application stack with Docker Compose for seamless environment portability.
seo:
  title: BITS — Biometric Integrated Timekeeping System
  description: Full-stack attendance management platform with biometric device integration built with Next.js, Express.js, PostgreSQL, and Docker.
---

### Project Overview

**BITS (Biometrics Integrated Timekeeping System)** is a production-grade full-stack attendance management platform designed to automate employee attendance logging, biometric hardware synchronization, shift calculations, and overtime approval workflows.

![BITS Dashboard Overview](/images/projects/bits/dashboard.png)

Built as a multi-container microservice system using **Next.js** for the frontend dashboard, **Express.js** for the backend API, **PostgreSQL** with **Prisma ORM** for relational data persistence, and **Docker** for containerization.

### Core System Features

- **Biometric Hardware Listener**: Listens to raw events from physical biometric check-in devices and synchronizes logs directly to backend database records.
- **Automated Timekeeping Engine**: Calculates late arrivals, undertime, overtime, break minutes, and night-shift differentials in real time.
- **Employee Lifecycle Management**: Tracks employees across stages (`ACTIVE` → `STAGED` → `INACTIVE` → `TERMINATED`) with contact info, profile imagery, and badge IDs.
- **Approval Workflows**: Employee-submitted overtime requests and attendance adjustments undergo manager review with audit trails.

![BITS Biometric Device Management](/images/projects/bits/devices.png)

### Tech Stack & Architecture

- **Frontend**: Next.js, React, Tailwind CSS, TypeScript
- **Backend API**: Node.js, Express.js, Prisma ORM
- **Database**: PostgreSQL
- **DevOps**: Docker, Docker Compose, `.env` environment isolation
