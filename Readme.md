# query kibana easily with sql
modify the query, :w to fire query

Im going to add some more fanciness when i next need to find something in kibana. i want the data table to be sortable and have basic fuzzy filtering.

# to run
```
docker run --init -p 9090:9090 -p 8010:8010 -e KIBANA_URI=http://kibana7.nsone.co:5601 anabik
```
then go to localhost:9090. should work in chrome and firefox.
