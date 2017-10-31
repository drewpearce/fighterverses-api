# fighterverses-api

This is a set of scripts for use in a [DreamFactory](http://dreamfactory.com) instance. The intention is to create an api for the [Fighter Verses](http:/fighterverses.com) Bible memorization program. This will facilitate programmatic access to the program.

These scripts assume you have downloaded the csv from [here](https://fighterverses.com/the-verses/fighter-verses/) and imported it into a db service in DreamFactory called verses, table name `verses`.

This script also assumes you have added the [bibles.org api](http://bibles.org/pages/api) as a DF Remote HTTP Service named `bibles_org`. You will need to register for an API Key.

## future development
This first release simply fetches the current week's verse and nothing else. Future development should include the ability to browse other weeks as well as search for topics.
