---
layout: post
title: Evolving ECS Usage - Splitting Clusters
---

When we started building Fanatical Support for AWS, we decided to build on top of Amazon ECS. In hindsight, this was a fortuitous decision -- it has been enabled us to quickly build out a series of microservices with very little operational overhead. However, over time, the ECS feature set has expanded, our use cases have expanded, and we've learned way to better use ECS.

This series of posts explores...

## Starting Simple, TODO: i don't like this title

We started by deploying a single ECS cluster with a single workload but that didn't last long. Over the next XXXXX months, we deployed XXXX microservices with XXXX total tasks and XXXX different containers. 

## From One to Many Clusters

As the number of workloads increased, we identified to major pain points:

- task networking
- IAM policies

what are the side effects: increasing management overhead, decreased density

## Collapsing Clusters Again

two phases: 

- iam policies allow us to collapse the vast majority of clusters
- task networking let us tackle the remaining

## Next Time

Migration to ALBs?