##### Debugging Inf-IT frontend
Since default flow uses FE resources bundling and grains cannot be changed in runtime - we need something more direct:
1. Don't use `vagrant-spk dev`
1. cd .sandstorm && vagrant ssh -c "sudo /opt/app/.sandstorm/debug.sh \[caldav|carddav\]" (defaults to caldav)
1. access [http://192.168.55.4:8000/] (notice how this is not using any grains, so the storage is /var/lib/radicale directly in vagrant)
1. _Note_: if you want to debug sandstorm interaction like sharing or API sync, you still need to use `vagrant-spk dev`

##### Building
1. `vagrant-spk dev`, so that build.sh is called without a --debug flag to re-build FE resources in production mode
1. `vagrant-spk build radicale-sandstorm-$(