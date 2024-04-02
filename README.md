This is the codebase used for EITI-NL dataportaal. Another version is being used to update open data dashboard for Institute Mijnbouwschade Groningen. 
At present there is no boilerplate version. If you would like to re-use the codebase, do contact me at joera@joeramulders.com. I would be happy to help strip it down and make a more generic version.

The codebase can be seen as a wrapper around d3.js, with added functionality based on best practices and other lessons learned over the years. 
These learnings mainly involve accessibility for the visually impaired, as well as a large group of people whom prefer to read numbers in tables rather than interprete graphs. 
When you are reading this there is a good chance that you like or love (making) beautiful and complex graphs. The hard truth is that few people do. 

### Pages
The dashboard/dataportal is a single page app, that can run inside another html page, needing a html element and a script tag linking to a file of compiled typescript. 
Navigation between pages works through url query strings. The code related to the form of the dashboard and navigation can be found under (/src/browser/dashboard)[https://github.com/Joera/EITI-Dashboard/tree/master/src/browser/dashboard].

Each page has a configuration in a ts object that could potentially be json output from a cms. [example](https://github.com/Joera/EITI-Dashboard/blob/master/src/pages/payments/config.ts) The generic [page.controller](https://github.com/Joera/EITI-Dashboard/blob/master/src/pages/shared/page.controller.ts) interpretes the page configuration and scaffolds html and ts objects for groups and graphs.  

### Groups 
A page consists of groups. Each group corresponds to a single data table (also downloadable) and a set of definitions exlaining all parameters, and ideally a single endpoint queriable in a swagger interface. I have learned this helps me focus on the message. A group may contain one or more graphs. One such graph can also consist of many small multiples. But, one table, one set of definitions, one endpoint. Groups are also accompanied by a title and text field for an explanation or of textual context. 

An important part of the group controller is to reformat the data from the endpoint into data-objects for graphs and table/download. [Example](https://github.com/Joera/EITI-Dashboard/blob/55aea751ac179ec98059a53251ac3a2344fc925c/src/pages/payments/groups/payments-group-v1.ts#L36). This tends to be most of the work. I do try generic types. (example)[https://github.com/Joera/EITI-Dashboard/blob/55aea751ac179ec98059a53251ac3a2344fc925c/src/pages/payments/groups/payments-group-v1.ts]





