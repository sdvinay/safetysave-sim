This is a project to simulate TTO's persistence mechanisms.

The idea is to simulate each moving part in the chain independently,
and configure each, and then look at the impact on each part.  For
example, as we change the TTO taxapp safety-save frequency, what are
the impacts on downstream components.

Eventually, it will be possible to change the configurations in real
time, and see the impact of config changes (spikes, waves, etc).

These are the components to model
* Phase 1 (TTO side in detail, CFP as monolothic sink)
  * User
  * Taxapp
  * Tomcat cache (including the cache crawler)
  * Return Logic stub (e.g., don't do anything but count the metrics)
* Phase 2 (CFP side in detail)
  * Return Logic impl
  * SP-Caching
  * Couchbase
  * Couchbase crawler
  * DP
