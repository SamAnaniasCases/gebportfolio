---
title: Cloud Compute Scheduler
summary: An intelligent scheduling system built to optimize server usage and reduce cloud hosting costs without sacrificing reliability.
role: Systems Designer
dates: 2026 - Present
status: active
featured: true
stackRefs:
  - kubernetes
  - typescript
tags:
  - Cloud
  - Automation
  - Optimization
links:
  - label: Demo Platform
    url: https://github.com
outcomes:
  - Cut server infrastructure costs by over 35% through smarter resource allocation.
  - Automated workload placement to maintain high system reliability and uptime.
seo:
  title: Cloud Compute Scheduler Project Details
  description: Kubernetes container scheduler optimizer focusing on resource bin-packing density.
---

Standard Kubernetes scheduling rules focus primarily on resource request limits, which frequently results in hardware over-provisioning. Our scheduler dynamically monitors real-time CPU/memory utilization and historical preemption signals to place containers intelligently.

### Visual Workflow

By clustering low-priority microservices on low-cost spot instances while keeping database instances on stable, reserved nodes, we cut cloud computing spend by over 35% without violating SLA guarantees.
