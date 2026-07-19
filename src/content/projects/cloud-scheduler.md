---
title: Cloud Compute Scheduler
summary: An intelligent container scheduling agent designed to optimize bin-packing density of spot instances inside large-scale Kubernetes clusters.
role: Systems Designer
dates: 2026 - Present
status: active
featured: false
stackRefs:
  - kubernetes
  - typescript
tags:
  - Cloud
  - Automation
  - Go
links:
  - label: Demo Platform
    url: https://github.com
outcomes:
  - Developed customized bin-packing algorithms achieving 92% average hardware utilization.
  - Mitigated spot instance preemption impacts using predictive machine learning hooks.
seo:
  title: Cloud Compute Scheduler Project Details
  description: Kubernetes container scheduler optimizer focusing on resource bin-packing density.
---

Standard Kubernetes scheduling rules focus primarily on resource request limits, which frequently results in hardware over-provisioning. Our scheduler dynamically monitors real-time CPU/memory utilization and historical preemption signals to place containers intelligently.

### Visual Workflow

By clustering low-priority microservices on low-cost spot instances while keeping database instances on stable, reserved nodes, we cut cloud computing spend by over 35% without violating SLA guarantees.
