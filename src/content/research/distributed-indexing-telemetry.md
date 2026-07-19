---
title: Distributed Ingestion and Indexing of Network Telemetry
abstract: This paper presents a high-throughput network telemetry indexing architecture. By mapping raw network packets directly to zero-copy ring buffers and using index partition arrays, we achieve sub-millisecond query retrieval times across multi-node clusters.
status: published
date: 2026-04-10
collaborators:
  - Dr. Aris Thorne
publicationLinks:
  - label: IEEE Xplore
    url: https://ieeexplore.ieee.org
---

Network virtualization and cluster orchestration demand granular monitoring systems that process millions of events per second per host. Legacy ingestion utilities frequently bottleneck at the kernel-user space boundary or buffer allocations.

### Telemetry Pipeline

Our proposed telemetry engine bypasses the typical network stack bottleneck using a kernel-bypass driver that copies packets from network card DMA rings directly into a ring buffer mapped in the user space. Indices are partitioned into time-slice segments that optimize cache line hits during query loops.

### BibTeX Citation

```bibtex
@article{ananias2026telemetry,
  title={Distributed Ingestion and Indexing of Network Telemetry},
  author={Ananias, Sam and Thorne, Aris},
  journal={IEEE Journal of Systems and Software},
  volume={142},
  pages={112--128},
  year={2026}
}
```
